import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
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
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-gray-900">4. 広告の配信および Cookie（クッキー）について</h2>
          <p>
            本サービスでは、第三者配信事業者（Google AdSense を含む）による広告配信サービスを利用しています。
          </p>
          <p className="mt-2">
            第三者配信事業者は Cookie を使用して、ユーザーが当サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信します。
            Google が広告 Cookie を使用することにより、ユーザーが当サイトや他のサイトにアクセスした情報に基づいて、Google やそのパートナーが適切な広告をユーザーに表示できます。
          </p>
          <p className="mt-2">
            ユーザーは、
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >
              Google 広告設定
            </a>
            にてパーソナライズ広告を無効にできます。また、
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >
              www.aboutads.info
            </a>
            にアクセスすることで、第三者配信事業者がパーソナライズ広告のために使用する Cookie を無効にすることもできます。
          </p>
          <p className="mt-2">
            その他、本サービスではログイン状態の維持にセッション Cookie を使用します。ブラウザの設定で Cookie を無効にすると、一部の機能が正常に動作しない場合があります。
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
            本サービスに関するお問い合わせ・データの誤り報告・ご意見は{" "}
            <Link
              href="/contact"
              className="text-orange-600 underline font-medium"
            >
              お問い合わせフォーム
            </Link>{" "}
            よりお送りください。
          </p>
          <p className="mt-1 text-xs text-gray-500">
            ※技術的な課題・不具合報告は{" "}
            <a
              href="https://github.com/shibata-kento/bikeroute/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >
              GitHub Issues
            </a>{" "}
            もご利用いただけます。
          </p>
        </section>

        <p className="text-xs text-gray-400">最終更新: 2026年8月8日</p>
      </div>
    </main>
  );
}
