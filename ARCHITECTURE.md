# アーキテクチャ

## 全体構成

```
[ブラウザ]
    |
    v
[Next.js on Vercel]
    |
    +---> [Supabase]
    |       - Postgres + PostGIS（禁止区間DB・空間照合）
    |       - Auth（Google ソーシャルログイン）
    |
    +---> [Google Routes API]（ルート計算）
    |
    +---> [Leaflet + OpenStreetMap tiles]（地図表示）
```

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | Next.js 15 + TypeScript + Tailwind CSS |
| 地図 | Leaflet + OpenStreetMap タイル |
| バックエンド | Supabase（Postgres + PostGIS + Auth） |
| ルーティング | Google Routes API |
| デプロイ | Vercel |

## 車種区分と avoid 設定

| 内部ID | 表示名 | Google Routes API avoid |
|---|---|---|
| `genki1` | 原付一種（50cc・新基準原付） | highways, tolls, ferries |
| `genki2` | 原付二種（125cc以下） | highways, tolls |
| `normal` | 普通二輪以上（126cc〜） | なし |

## データモデル

### restricted_segments（通行禁止区間）

```sql
create table restricted_segments (
  id                  uuid primary key default gen_random_uuid(),
  source              text not null,           -- 'osm' | 'user'
  source_ref          text,
  license             text,                    -- 'odbl'
  restriction_tag     text,                    -- 'motorway' | 'motorroad' | 'motorcycle_no' | 'moped_no'
  applies_to          vehicle_class[] not null,
  road_name           text,
  prefecture          text,
  description         text,
  status              text default 'pending',  -- 'pending' | 'verified' | 'rejected'
  verification_count  int default 0,
  coordinate_accuracy text,                    -- 'exact' | 'municipality'
  start_point         geography(Point, 4326) not null,
  end_point           geography(Point, 4326) not null,
  geometry            geography(LineString, 4326),
  created_by          uuid references auth.users,
  created_at          timestamptz default now()
);
```

### restriction_tag の意味

| 値 | 元タグ | 適用車種 |
|---|---|---|
| `motorway` | highway=motorway/link | genki1, genki2 |
| `motorroad` | motorroad=yes | genki1, genki2 |
| `motorcycle_no` | motorcycle=no | genki1, genki2, normal |
| `moped_no` | moped=no | genki1 |

## ルーティングと禁止区間照合（Phase 2）

```
1. ユーザーが出発地・目的地・車種を入力
2. Google Routes API でルート計算（車種に応じた avoid を指定）
3. レスポンスの encoded polyline をデコードして LineString に変換
4. PostGIS で空間照合:
     ST_Intersects(geometry, decoded_route)
     AND applies_to @> ARRAY[vehicle_class]
     AND status = 'verified'
5. 交差区間があれば警告表示
6. Google マップで開く
```

## データソース

**OSM（Overpass API）**
- `motorcycle=no` → 二輪通行禁止（全車種）
- `moped=no` → 原付通行禁止（genki1）
- `motorroad=yes` → 自動車専用道路（genki1, genki2）
- 取込スクリプト: `scripts/import-osm.ts`

**ユーザー投稿**
- 写真付き投稿 → `status='pending'`
- 他ユーザーの confirm 票 3件以上で `status='verified'`
- dispute 票が confirm を上回ると `rejected`

## ユーザー投稿の承認フロー

```
投稿 → pending → (confirm 3票) → verified
                → (dispute > confirm) → rejected
```

管理者（`ADMIN_EMAIL` 環境変数で指定）は `/admin` ページから直接承認・却下が可能。

## セキュリティ

- Google API キーはサーバー側のみ（クライアントに非公開）
- Routes API にレート制限（10 req / ユーザー / 分）
- 投稿写真の EXIF はクライアント側でアップロード前に除去
- RLS（Row Level Security）で認証ユーザーのみ投稿可能

## デプロイ構成

| 環境 | 用途 |
|---|---|
| Production | Vercel + Supabase 本番 |
| Preview | Vercel（PR 毎に自動デプロイ） |
| Local | `npm run dev` + Supabase local CLI |
