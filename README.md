# BikeRoute

> バイクの車種に応じた通行制限を考慮したGoogleマップ連携アプリ

## これは何?

50cc・125ccのバイクライダーが、自分のバイクで通れる道路だけを使ったルート案内を受け取れるWebアプリです。

Googleマップには「自動車専用道路を回避する」設定がないため、原付ライダーが知らずに進入禁止の道路に誘導される問題があります。このアプリは出発地・目的地と車種を入力するだけで、そのルートに通行禁止区間が含まれないかを事前に確認できます。問題がなければ、そのまま Google マップで案内を開けます。

主な利用シーンは「ツーリング前の下調べ」です。

## 対象ユーザー

| 車種 | 制限 |
|---|---|
| 50cc（原付一種・新基準原付） | 自動車専用道路NG、高速道路NG、フェリーNG |
| 125cc（原付二種） | 自動車専用道路NG、高速道路NG |
| 126cc以上（普通二輪以上） | 二輪車通行禁止区間のみ注意 |

## 技術スタック

- **フロントエンド**: Next.js 15 + TypeScript + Tailwind CSS（Vercel）
- **バックエンド**: Supabase（Postgres + PostGIS + Auth）
- **地図**: Leaflet + OpenStreetMap（通行禁止区間・ルート表示）
- **ルーティング**: Google Routes API

## セットアップ

### 1. 環境変数

```bash
cp .env.example .env.local
# .env.local を編集して各キーを設定
```

| 変数 | 取得先 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `GOOGLE_MAPS_API_KEY` | Google Cloud Console（Routes API を有効化） |
| `ADMIN_EMAIL` | 管理画面へのアクセスを許可するメールアドレス |

### 2. DBマイグレーション

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

### 3. Google ログイン設定

Supabase Dashboard → Authentication → Providers → Google を有効化し、Google Cloud Console で OAuth クライアントを作成してください。詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照。

### 4. ローカル開発

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # 本番ビルド
npm run lint      # ESLint
npm run typecheck # 型チェック
npm test          # Vitest
```

### 5. 通行規制区間データ取込

```bash
npm run import:osm   # OSM データ取込（motorcycle=no / moped=no / motorroad=yes）
```

## データソース

- **OpenStreetMap** — `motorcycle=no` / `moped=no` / `motorroad=yes` タグ付き区間
  - ライセンス: [ODbL 1.0](https://opendatacommons.org/licenses/odbl/) / © OpenStreetMap contributors
- **ユーザー投稿** — 写真付き・承認制（ODbL 1.0 で提供されたものとして扱います）

## 免責事項

このアプリが提供する情報は参考情報です。**走行時は必ず実際の道路標識を確認し、最新の交通規則に従ってください。** アプリの案内に起因する違反・事故等について、本プロジェクトは一切の責任を負いません。

## 貢献について

OSSプロジェクトとして開発しています。バグ報告・機能要望・コード貢献を歓迎します。詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## ライセンス

- **コード**: [MIT License](./LICENSE)
- **通行禁止区間データ**: [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/)
- **ドキュメント**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
