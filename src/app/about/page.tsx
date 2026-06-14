import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報・BikeRouteについて",
  description:
    "BikeRouteの運営者情報、サービス概要、データソース、お問い合わせ先をご案内します。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
          ← トップに戻る
        </Link>
      </div>

      <h1 className="text-2xl font-black text-gray-900 mb-8">BikeRouteについて</h1>

      <div className="space-y-10 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">サービス概要</h2>
          <p className="mb-3">
            BikeRoute（バイクルート）は、原付一種（50cc以下・新基準原付）・原付二種（125cc以下）・
            普通二輪以上（126cc〜）の各車種に対応した通行禁止区間チェックWebアプリです。
          </p>
          <p className="mb-3">
            Google マップをはじめとする一般的なナビゲーションサービスは、バイクの車種（排気量・法律区分）を
            考慮したルート案内に対応していません。そのため、原付一種のライダーが自動車専用道路や
            高速道路へ誘導されてしまうケースがあります。
          </p>
          <p>
            BikeRoute では出発地・目的地・車種を入力するだけで、ルート上に通行禁止区間が含まれていないかを
            自動判定し、安全なルート計画をサポートします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">運営者</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
            <div className="flex gap-3 text-sm">
              <span className="text-gray-500 w-24 shrink-0">運営形態</span>
              <span>個人開発・運営</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-gray-500 w-24 shrink-0">開発者</span>
              <span>shibata-kento</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-gray-500 w-24 shrink-0">公開開始</span>
              <span>2026年</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-gray-500 w-24 shrink-0">ライセンス</span>
              <span>MIT License / データ: ODbL 1.0</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">データソース</h2>
          <p className="mb-3">
            通行禁止区間データは以下のソースをもとに構成されています。
          </p>
          <ul className="space-y-2">
            {[
              {
                name: "JMPSA（日本二輪車普及安全協会）",
                desc: "全国約500箇所の通行禁止区間データ（検証済み）",
              },
              {
                name: "国土交通省 国土数値情報",
                desc: "高速自動車国道・自動車専用道路の路線データ",
              },
              {
                name: "OpenStreetMap（ODbL 1.0）",
                desc: "motorroad=yes タグの付いた自動車専用道路区間",
              },
              {
                name: "ユーザー投稿",
                desc: "写真証拠付きで投稿・確認投票を経て承認された区間",
              },
            ].map(({ name, desc }) => (
              <li key={name} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                <p className="font-medium text-gray-900 text-sm">{name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            掲載情報は参考情報です。道路状況は変更されることがあります。走行時は必ず現地の道路標識を確認してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">免責事項</h2>
          <p className="mb-2">
            BikeRoute が提供する通行可否情報は参考情報であり、正確性・完全性を保証するものではありません。
            道路の通行可否は道路標識が最終判断基準となります。
          </p>
          <p>
            本サービスの利用によって生じた損害について、運営者は責任を負いかねます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">お問い合わせ</h2>
          <p className="mb-3">
            バグ報告・機能要望・通行禁止区間の誤りは GitHub Issues からご連絡ください。
          </p>
          <a
            href="https://github.com/shibata-kento/bikeroute/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            GitHub Issues を開く →
          </a>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連ページ</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/privacy" className="text-sm text-orange-600 underline hover:text-orange-800">
              プライバシーポリシー
            </Link>
            <Link href="/faq" className="text-sm text-orange-600 underline hover:text-orange-800">
              よくある質問（FAQ）
            </Link>
            <Link href="/guide" className="text-sm text-orange-600 underline hover:text-orange-800">
              使い方ガイド
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
