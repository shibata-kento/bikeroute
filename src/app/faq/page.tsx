import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "よくある質問 (FAQ)",
  description:
    "BikeRouteに関するよくある質問をまとめました。原付・125cc・二輪の車種区分、通行禁止区間の確認方法、データの信頼性などについて解説します。",
};

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "BikeRouteとは何ですか？",
    a: "バイクの車種（原付一種・原付二種・普通二輪以上）ごとに、通行できない道路が含まれていないかを事前に確認できるWebサービスです。出発地と目的地を入力すると、その車種では通れない区間がルート上にないかをチェックできます。",
  },
  {
    q: "リアルタイムナビゲーションに使えますか？",
    a: "いいえ。BikeRouteは走行前の事前確認ツールです。実際の走行中のナビには、Google マップなどの専用アプリをご利用ください。",
  },
  {
    q: "対応している車種を教えてください。",
    a: (
      <div className="space-y-2">
        <p>以下の3区分に対応しています。</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>原付一種（50cc以下・新基準原付）</strong>
            ：自動車専用道路・高速道路・有料道路・フェリー区間を回避します。
          </li>
          <li>
            <strong>原付二種（51〜125cc）</strong>
            ：自動車専用道路・高速道路・有料道路を回避します（一般道のバイパスは通行可）。
          </li>
          <li>
            <strong>普通二輪以上（126cc〜）</strong>
            ：法律上の通行制限はほぼありません。ただし「二輪通行禁止」に指定された区間は警告します。
          </li>
        </ul>
      </div>
    ),
  },
  {
    q: "原付一種と原付二種の違いは何ですか？",
    a: (
      <div className="space-y-2">
        <p>
          <strong>原付一種（第一種原動機付自転車）</strong>は排気量50cc以下（または2025年11月以降の新基準原付）で、
          法定速度30km/h・二段階右折の義務があります。自動車専用道路・高速道路は通行できません。
        </p>
        <p>
          <strong>原付二種（第二種原動機付自転車）</strong>は排気量51〜125ccで、
          法定速度60km/h・二段階右折不要です。高速道路は通行できませんが、
          自動車専用指定のないバイパスは通行可能です。
        </p>
      </div>
    ),
  },
  {
    q: "通行禁止区間のデータはどこから取得していますか？",
    a: (
      <div className="space-y-2">
        <p>
          主にOpenStreetMap（OSM）のデータをもとに、二輪車・原付の通行禁止情報を収録しています（
          <a
            href="https://opendatacommons.org/licenses/odbl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            ODbL 1.0ライセンス
          </a>）。
        </p>
        <p>
          また、ユーザーが写真付きで投稿した情報も収録しています。投稿は他のユーザーの確認投票を経て公開されます。
        </p>
      </div>
    ),
  },
  {
    q: "データの信頼性はどの程度ですか？",
    a: "OpenStreetMapのデータは世界中のボランティアが更新しており、一般的に精度は高いですが、最新の規制変更が反映されていない場合があります。実際の走行前には現地の標識を必ず確認してください。",
  },
  {
    q: "通行禁止区間を投稿・報告できますか？",
    a: (
      <span>
        はい。Googleアカウントでログインすると、通行禁止区間を投稿できます。
        投稿には写真（標識・現地の様子）の添付を推奨しています。
        投稿内容は他のユーザーによる確認投票を経て公開されます。
        詳しくは{" "}
        <Link href="/segments" className="text-orange-600 underline">
          禁止区間ページ
        </Link>{" "}
        をご覧ください。
      </span>
    ),
  },
  {
    q: "「警告」が出たときはどうすればいいですか？",
    a: "ルート上に通行禁止区間が含まれている可能性があります。Google マップのリンクを開き、手動で迂回路を設定するか、ルート上の該当区間を避けるよう出発地・目的地・経由地を調整してください。",
  },
  {
    q: "ログインは必須ですか？",
    a: "ルート確認・通行禁止区間の閲覧はログイン不要で利用できます。ログインが必要なのは、区間の投稿と確認投票のみです。",
  },
  {
    q: "スマートフォンで使えますか？",
    a: "はい。BikeRouteはモバイル対応のWebアプリです。iPhoneやAndroidのブラウザからそのままご利用いただけます。アプリのインストールは不要です。",
  },
  {
    q: "利用料金はかかりますか？",
    a: "無料でご利用いただけます。サービスの維持費用は広告収入で賄っています。",
  },
  {
    q: "バグや誤情報を見つけた場合はどこに報告すればいいですか？",
    a: (
      <span>
        <a
          href="https://github.com/shibata-kento/bikeroute/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 underline"
        >
          GitHub Issues
        </a>{" "}
        にてご報告ください。データの誤りは投稿フォームからも報告できます。
      </span>
    ),
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-black text-gray-900">よくある質問</h1>
      <p className="mb-8 text-sm text-gray-500">FAQ</p>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-100 pb-6">
            <h2 className="mb-2 font-bold text-gray-900">
              <span className="mr-2 text-orange-500">Q.</span>
              {faq.q}
            </h2>
            <div className="text-sm leading-relaxed text-gray-700 pl-5">
              {faq.a}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg bg-orange-50 p-4 text-sm text-gray-700">
        <p className="font-bold text-gray-900 mb-1">解決しない場合は</p>
        <p>
          <a
            href="https://github.com/shibata-kento/bikeroute/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            GitHub Issues
          </a>{" "}
          までお気軽にご質問ください。
        </p>
      </div>
    </main>
  );
}
