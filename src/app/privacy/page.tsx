import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | BikeRoute",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-black text-gray-900">プライバシーポリシー</h1>

      <div className="space-y-6 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 font-bold text-gray-900">1. 収集する情報</h2>
          <p>
            BikeRoute（以下「本サービス」）は、Google アカウントでログインする際に
            メールアドレスを取得します。メールアドレスは管理者の識別にのみ使用し、
            第三者に提供しません。
          </p>
          <p className="mt-2">
            ユーザーが投稿した通行禁止区間データ（位置情報・説明文・写真）は
            データベースに保存されます。投稿データは <a
              href="https://opendatacommons.org/licenses/odbl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >ODbL 1.0</a> ライセンスのもとで公開されます。
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-gray-900">2. 利用目的</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>本サービスの提供・改善</li>
            <li>管理者機能（投稿審査）のアクセス制御</li>
            <li>不正利用の防止</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-gray-900">3. 利用する外部サービス</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Supabase</strong> — データベース・認証（
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                プライバシーポリシー
              </a>）
            </li>
            <li>
              <strong>Vercel</strong> — ホスティング（
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                プライバシーポリシー
              </a>）
            </li>
            <li>
              <strong>Google</strong> — ログイン認証・ルート計算（
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                プライバシーポリシー
              </a>）
            </li>
            <li>
              <strong>Google AdSense</strong>（導入予定）— 広告配信のために Cookie を使用します。
              Cookie の使用をオプトアウトするには
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                Google 広告設定
              </a>
              をご利用ください。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-gray-900">4. Cookie</h2>
          <p>
            本サービスはログイン状態の維持にセッション Cookie を使用します。
            ブラウザの設定で Cookie を無効にすると、ログインが必要な機能が使えなくなる場合があります。
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-gray-900">5. 情報の開示・削除</h2>
          <p>
            ご自身の情報の開示・訂正・削除をご希望の場合は、下記お問い合わせ先までご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-gray-900">6. ポリシーの変更</h2>
          <p>
            本ポリシーは予告なく変更する場合があります。変更後の内容はこのページに掲載します。
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-gray-900">7. お問い合わせ</h2>
          <p>
            本サービスに関するお問い合わせは{" "}
            <a
              href="https://github.com/shibata-kento/bikeroute/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >
              GitHub Issues
            </a>{" "}
            までお願いします。
          </p>
        </section>

        <p className="text-xs text-gray-400">最終更新: 2026年6月2日</p>
      </div>
    </main>
  );
}
