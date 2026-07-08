import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/guide" },
  title: "使い方ガイド",
  description:
    "BikeRouteの使い方を解説します。ルート確認の手順、車種の選び方、通行禁止区間の見方、投稿方法などを画面例つきで説明します。",
};

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "使い方ガイド", path: "/guide" },
      ]} />
      <h1 className="mb-2 text-2xl font-black text-gray-900">使い方ガイド</h1>
      <p className="mb-6 text-sm text-gray-500">
        BikeRouteの基本的な使い方を解説します。
      </p>

      {/* 背景知識：なぜ必要か */}
      <section className="mb-10 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-base font-bold text-gray-900 mb-3">バイクのルート確認が必要な理由</h2>
        <div className="space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            日本では道路交通法により、原動機付自転車（原付）は<strong>自動車専用道路・高速道路</strong>を通行できません。
            これは排気量に関係なく原付一種（50cc以下）・原付二種（125cc以下）の両方に適用されます。
          </p>
          <p>
            問題は、Google マップをはじめとする一般的なナビアプリが<strong>バイクの車種区分を考慮しない</strong>点です。
            自動車向けに最短ルートを案内するため、原付が通れない首都高速・阪神高速・自動車専用バイパスを経由するルートを
            提示することがあります。
          </p>
          <p>
            また、トンネルや橋梁の一部には「<strong>二輪車通行禁止</strong>」の規制がかかっており、
            126cc以上の普通二輪・大型二輪でも通行できない区間が全国に存在します。
            これらはナビでは判別できません。
          </p>
          <p>
            BikeRouteはこのギャップを埋めるためのツールです。車種を選ぶだけで通行禁止区間を自動チェックし、
            問題があれば出発前に警告します。
          </p>
        </div>
      </section>

      {/* Step 1 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
            1
          </span>
          <h2 className="text-lg font-bold text-gray-900">車種を選ぶ</h2>
        </div>
        <div className="pl-11 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            トップページを開き、お使いのバイクの車種を選択してください。
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">原付一種</span>
              <span className="text-xs text-gray-600">50cc以下・新基準原付 — 高速道路・有料道路・フェリーを回避</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">原付二種</span>
              <span className="text-xs text-gray-600">51〜125cc — 高速道路・有料道路を回避</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">普通二輪以上</span>
              <span className="text-xs text-gray-600">126cc〜 — 通行制限なし（二輪通行禁止区間のみ確認）</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            ※ 2025年11月以降の「新基準原付」（125ccまでの電動・モデルチェンジ車）は「原付一種」を選択してください。
          </p>
        </div>
      </section>

      {/* Step 2 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
            2
          </span>
          <h2 className="text-lg font-bold text-gray-900">出発地・目的地を入力する</h2>
        </div>
        <div className="pl-11 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            「出発地」と「目的地」のフィールドに住所・地名・施設名などを入力します。
            Google マップと同じ形式で入力できます。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>例：「東京駅」「横浜市港北区日吉」「道の駅 富士川楽座」</li>
            <li>緯度経度（例：35.6812, 139.7671）での入力も可能です</li>
          </ul>
        </div>
      </section>

      {/* Step 3 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
            3
          </span>
          <h2 className="text-lg font-bold text-gray-900">ルートをチェックする</h2>
        </div>
        <div className="pl-11 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            「ルートをチェック」ボタンを押すと、選択した車種に適した設定でルートを計算し、
            通行禁止区間が含まれていないかを確認します。
          </p>
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="font-bold text-green-800 text-xs mb-1">問題なし（緑）</p>
            <p className="text-xs text-green-700">
              ルート上に通行禁止区間は見つかりませんでした。「Google マップで開く」ボタンからそのままナビを起動できます。
            </p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="font-bold text-red-800 text-xs mb-1">警告（赤）</p>
            <p className="text-xs text-red-700">
              ルート上に通行禁止の可能性がある区間が見つかりました。
              Google マップで迂回路を手動で設定してください。
            </p>
          </div>
        </div>
      </section>

      {/* Step 4 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
            4
          </span>
          <h2 className="text-lg font-bold text-gray-900">Google マップでナビを起動する</h2>
        </div>
        <div className="pl-11 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            「Google マップで開く」ボタンをタップすると、車種に合った回避設定が自動で適用された状態で
            Google マップが起動します。そのままナビとしてご利用ください。
          </p>
          <p className="text-xs text-gray-500">
            ※ BikeRoute はあくまで事前確認ツールです。走行中は Google マップ等のナビアプリをご使用ください。
          </p>
        </div>
      </section>

      {/* 禁止区間リスト */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-3">通行禁止区間リストを確認する</h2>
        <div className="text-sm leading-relaxed text-gray-700 space-y-3">
          <p>
            <Link href="/segments" className="text-orange-600 underline">禁止区間ページ</Link>
            では、登録されているすべての通行禁止区間を車種別に絞り込んで確認できます。
            お住まいの地域や走行予定エリアの禁止区間を事前に把握しておくのに便利です。
          </p>
        </div>
      </section>

      {/* 投稿 */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-3">通行禁止区間を投稿する</h2>
        <div className="text-sm leading-relaxed text-gray-700 space-y-3">
          <p>
            Googleアカウントでログインすると、地図上で見つけた通行禁止区間を投稿できます。
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>ナビ右上の「ログイン」からGoogleアカウントでサインイン</li>
            <li>
              <Link href="/segments" className="text-orange-600 underline">禁止区間ページ</Link>
              の「投稿する」ボタンをクリック
            </li>
            <li>地図上で通行禁止区間の始点と終点を指定</li>
            <li>車種・道路名・標識の写真などを入力して送信</li>
          </ol>
          <p className="text-xs text-gray-500">
            投稿内容は他のユーザーによる確認投票（3票以上）を経て公開されます。
          </p>
        </div>
      </section>

      <div className="rounded-lg bg-orange-50 p-4 text-sm text-gray-700">
        <p className="font-bold text-gray-900 mb-1">ご不明な点は</p>
        <p>
          <Link href="/faq" className="text-orange-600 underline">よくある質問（FAQ）</Link>
          もあわせてご覧ください。解決しない場合は{" "}
          <a
            href="https://github.com/shibata-kento/bikeroute/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            GitHub Issues
          </a>{" "}
          までお気軽にどうぞ。
        </p>
      </div>
    </main>
  );
}
