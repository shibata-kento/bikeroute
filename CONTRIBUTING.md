# BikeRoute への貢献ガイド

ご協力ありがとうございます。貢献の種類に応じて以下を参照してください。

---

## 貢献の種類

### 1. 通行禁止区間データの投稿

アプリの「区間を投稿」フォームから直接投稿できます。コードの変更は不要です。

投稿時のお願い:
- 写真（道路標識）を添付してください
- 禁止対象の車種を正確に選択してください（50cc以下 / 125cc以下 / 全二輪）
- 投稿データは [ODbL 1.0](https://opendatacommons.org/licenses/odbl/) で提供されるものとして扱います

### 2. バグ報告・機能要望

[GitHub Issues](https://github.com/shibata-kento/bikeroute/issues) に投稿してください。

バグ報告には以下を含めると助かります:
- 再現手順
- 期待する動作と実際の動作
- 使用デバイス・ブラウザ

### 3. コードへの貢献

---

## 開発環境セットアップ

### 必要なもの

- Node.js 20+
- npm
- Supabase アカウント（または Supabase CLI でローカル起動）

### 手順

```bash
git clone https://github.com/shibata-kento/bikeroute.git
cd bikeroute
npm install
cp .env.example .env.local
# .env.local を編集して各キーを設定
npm run dev   # http://localhost:3000
```

環境変数の取得先は [README.md](./README.md#1-環境変数) を参照してください。

---

## Pull Request の流れ

1. `main` ブランチから作業ブランチを作成する
   ```bash
   git checkout -b fix/your-topic
   ```
2. 変更を加える
3. 以下がすべてパスすることを確認する
   ```bash
   npm run lint       # ESLint
   npm run typecheck  # 型チェック
   npm run build      # 本番ビルド確認
   ```
4. PR を作成する（日本語・英語どちらでも可）

---

## コーディング規約

- **言語**: TypeScript（型を省略しない）
- **フォーマット**: ESLint の設定に従う（`npm run lint` でチェック）
- **コンポーネント**: Next.js App Router の Server / Client Component を適切に使い分ける
- **コメント**: 自明でない理由・制約がある場合のみ記述する

### DB マイグレーション

`supabase/migrations/` にファイルを追加する場合は、既存のナンバリング（`0001_`, `0002_`, ...）に続く番号を使用してください。

---

## ライセンス

- コード貢献: [MIT License](./LICENSE) に従います
- データ貢献: [ODbL 1.0](https://opendatacommons.org/licenses/odbl/) に従います
