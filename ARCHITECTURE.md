# アーキテクチャドキュメント

## 1. 全体構成

```
[ユーザー(ブラウザ)]
        |
        v
[Webフロント Next.js on Vercel]
        |
        +---> [Google Maps URLs / Embed API] (フェーズ0〜)
        |
        +---> [Backend (Supabase)]
        |        - Postgres + PostGIS
        |        - Auth
        |        - Storage(写真)
        |
        +---> [Google Routes API] (フェーズ2〜、ルート照合用)
```

## 2. 技術スタック

### フロントエンド
- Next.js 15 + TypeScript
- Tailwind CSS
- Google Places Autocomplete(住所補完)
- Google Maps Embed API(地図表示、無料無制限)
- Vercel(無料デプロイ)

### バックエンド
- Supabase
  - Postgres + PostGIS拡張(地理空間検索)
  - Auth(Google・X等のソーシャルログイン)
  - Storage(投稿写真)
- 無料枠で月5万MAUまで対応可能

### 地図・ルーティング
- フェーズ0: Google Maps URLs(無料、リンク生成のみ)
- フェーズ1: Google Maps Embed API(無料無制限、ピン表示用)
- フェーズ2: Google Routes API(有料、$5/1,000リクエスト)

### Google Maps料金体系の整理(2025年3月以降)

- 月200ドルクレジット制は廃止、SKUごとの無料枠に変更
- Maps Embed APIは無料無制限(地図埋め込みに最適)
- Map Tiles APIは月10万イベント無料
- Dynamic Mapsは月28,500マップロード無料、超過は$7/1,000
- Routes APIは課金対象だが、月数千ユーザー規模なら数千円程度

このプロジェクトの想定では、フェーズ0〜1は完全無料、フェーズ2でも月数百〜数千円で運営可能と見込む。

## 3. データモデル

### 主要テーブル(初期案)

```sql
-- 車種定義
create type vehicle_class as enum ('genki1', 'genki2', 'normal');
-- genki1 = 原付一種(50cc相当), genki2 = 原付二種(125cc以下), normal = 普通二輪以上

-- 禁止区間
create table restricted_segments (
  id uuid primary key default gen_random_uuid(),
  source text not null, -- 'jmpsa', 'mlit', 'osm', 'user'
  source_ref text, -- 元データの参照ID
  license text, -- 'jmpsa-nc' (非商用限定), 'cc-by', 'odbl', 'cc-by-nc' 等
  applies_to vehicle_class[] not null, -- どの車種に適用される禁止か
  road_name text, -- 道路名
  start_point geography(Point, 4326) not null,
  end_point geography(Point, 4326) not null,
  geometry geography(LineString, 4326), -- 区間の線データ(あれば)
  description text,
  status text default 'pending', -- 'pending', 'verified', 'rejected'
  verification_count int default 0,
  created_by uuid references auth.users,
  created_at timestamptz default now(),
  verified_at timestamptz
);

create index idx_restricted_segments_geom on restricted_segments using gist(geometry);

-- 投稿写真
create table segment_photos (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid references restricted_segments on delete cascade,
  storage_path text not null,
  caption text,
  uploaded_by uuid references auth.users,
  created_at timestamptz default now()
);

-- 確認票
create table verifications (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid references restricted_segments on delete cascade,
  user_id uuid references auth.users,
  vote text check (vote in ('confirm', 'dispute')),
  comment text,
  created_at timestamptz default now(),
  unique(segment_id, user_id)
);
```

### 承認フロー

1. ユーザーが投稿(写真必須)
2. status = 'pending' で登録
3. 他ユーザーが確認票を投じる(confirm / dispute)
4. confirm 票が一定数(初期は3票)に達したら status = 'verified'
5. dispute 票が confirm 票を上回ったら 'rejected'
6. 'verified' のものだけアプリ表示にデフォルト含める(設定で 'pending' 含めも可)

JMPSAや国土数値情報からの自動取り込みデータは、source識別子で区別し、初期から 'verified' 扱いとする。

## 4. ルーティングと禁止区間照合のロジック(フェーズ2)

```
1. ユーザーが出発地・目的地・車種を入力
2. Google Routes API でルート計算(車種に応じたavoidをリクエスト)
3. レスポンスのpolylineをデコード(LineString化)
4. PostgreSQL で空間照合:
   SELECT * FROM restricted_segments
   WHERE applies_to @> ARRAY[vehicle_class]::vehicle_class[]
     AND status = 'verified'
     AND ST_Intersects(geometry, polyline_from_route);
5. 交差区間があれば警告表示、迂回ルートを再計算(avoid変更や経由地追加)
6. OKなルートになったらGoogle Mapsで開く
```

## 5. データ統合パイプライン

3層のデータソースを統一フォーマットでDBに格納する。

```
JMPSA(スクレイピング) → 正規化 → restricted_segments(source='jmpsa', license='jmpsa-nc')
国土数値情報(GeoJSON/Shapefile) → 抽出 → restricted_segments(source='mlit')
OpenStreetMap(Overpass API) → フィルタ → restricted_segments(source='osm')
ユーザー投稿 → 承認後 → restricted_segments(source='user')
```

各ソースは定期的に再取得して最新化する。JMPSAの規制解除情報や国土数値情報の更新を反映するため、月次でバッチ処理を回す。

### JMPSAデータ取り扱いの注意

- **本プロジェクトは非商用条件でJMPSAより利用を許諾された**(2026年5月確認)
- アプリ内・データレコード・READMEのどこかに出典(日本二輪車普及安全協会)を明記する
- スクレイピング時はサーバー負荷を考慮(レートリミット・キャッシュ・再取得は月次程度)
- データレコードに `source='jmpsa'` を保持することで、将来そのデータを取り外す派生(例: 有料版)を作る場合に分離可能な設計とする
- 派生プロジェクトを作る第三者によるJMPSAデータの利用時も、非商用制約を継承するよう推奨ライセンスで明示

## 6. デプロイ構成

| 環境 | 用途 | サービス |
|---|---|---|
| Production | 本番(将来公開時) | Vercel(フロント) + Supabase(BE) |
| Preview | PR毎の自動デプロイ | Vercel Preview |
| Local | 開発 | Next.js dev + Supabase local CLI |

## 7. セキュリティ・プライバシー

- 投稿者のメールアドレス等の個人情報は表示しない(投稿者表示は任意のハンドルネーム)
- 写真のEXIFはアップロード時にクライアント側で除去(位置情報漏洩防止)
- API Keyはサーバー側で保持、フロントには公開しない
- Routes APIのレート制限を実装(1ユーザー1分あたり10回まで等)

## 8. パフォーマンス・スケール

- フロントは静的生成可能な部分はSSG、動的部分はSSR
- 禁止区間データはCDNキャッシュ(1日)、ユーザー投稿は無効化
- PostGISの空間インデックスで照合を高速化
- 月数千〜数万ユーザー規模までは無料枠で対応

## 9. 監視・運用

- Vercelの組み込みアナリティクス
- Supabaseのダッシュボードでクエリ監視
- 投稿モニタリング: 一定の投稿数を超えたら通知(Discord webhook等)
- エラー監視: Sentry(無料枠)

## 10. ライセンス・運用上の制約

### 非商用限定

JMPSAデータの利用許諾が非商用に限られるため、本プロジェクト全体を非商用として運営する。これは技術設計にも影響する。

- 広告タグの組み込みを行わない(Google AdSense等)
- 課金機能・サブスクリプション機能は実装しない
- APIを提供する場合も非商用利用に限定する

### コードとデータのライセンス分離(案)

コード自体は再利用しやすくしたいが、データは非商用制約を継承させる必要があるため:

- **コード**: 非商用ライセンス(例: PolyForm Noncommercial License 1.0.0)
- **データ(投稿・JMPSAとりこみデータ)**: Creative Commons BY-NC 4.0
- **設計ドキュメント**: Creative Commons BY 4.0

派生プロジェクトを作る第三者が、JMPSAデータを含む状態での商用利用は不可とする推奨ライセンスで明示する。

### 将来の有料化可能性

将来本格的に有料展開したい場合の布石として:

- `source` カラムでデータの由来を区別
- `license` カラムで各レコードの利用条件を追跡
- JMPSAデータを除外するクエリで動作する形（レイヤー1を抜いても稼働する構造）
- ユーザー自前データ(レイヤー3)を強化して代替できるようにする

データソースの3層構造は、この「将来の選択肢」を残す意味でも有効。

## 11. 将来の拡張ポイント

- 二段階右折回避ルートの提案(原付一種向け)
- 二人乗り規制の警告(126cc以上の高速利用時)
- 走行ログ機能(完走したルートの保存)
- ライダー同士のルート共有機能
- ネイティブアプリ化(オフライン対応・常時案内が必要になった時)
