import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ArticleSources } from "@/components/ArticleSources";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/michinoeki-bypass-caution" },
  title: "道の駅へ向かう“うっかり自動車専用バイパス”注意マップ【原付・125cc】",
  description:
    "道の駅は幹線道路沿いに多く、その幹線が「自動車専用バイパス」になっていることがあります。無料でも原付・125ccは通れません。うっかり進入しやすい理由と見分け方3サイン、愛知・神奈川・大阪・静岡など主要8県の注意ポイント、実際の通行禁止区間を地図で確認する方法を解説します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "道の駅へ向かう“うっかり自動車専用バイパス”注意マップ【原付・125cc】",
  description:
    "道の駅近くの自動車専用バイパスに原付・125ccがうっかり進入する理由と見分け方3サイン、実際の通行禁止区間を地図で確認する方法を解説。",
  datePublished: "2026-07-26",
  dateModified: "2026-07-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/michinoeki-bypass-caution",
  inLanguage: "ja",
};

// 道の駅ルート集（記事①）と対になる、需要トップ8県の「向かう途中の要注意ポイント」。
// note は各県の公開済み記事で出典明記済みの検証済み事実のみを要約。個別地点は県ページ/地図に委ねる。
type PrefHazard = { pref: string; article: string; prefSlug: string; note: string };
const PREF_HAZARDS: PrefHazard[] = [
  { pref: "愛知", article: "nagoya-bike-restriction", prefSlug: "aichi", note: "名古屋高速が原付の全線禁止。伊勢湾岸道・名二環などの自動車専用道への合流にも注意。" },
  { pref: "神奈川", article: "kanagawa-bike-restriction", prefSlug: "kanagawa", note: "横羽線・湾岸線・第三京浜・横浜横須賀道路が原付禁止。海沿い・丹沢方面で自専道への流入に注意。" },
  { pref: "大阪", article: "osaka-bike-restriction", prefSlug: "osaka", note: "阪神高速が全線禁止。大阪港トンネル・夢咲トンネルは126cc以上でも通行禁止。" },
  { pref: "静岡", article: "shizuoka-bike-restriction", prefSlug: "shizuoka", note: "新東名・東名が原付禁止。伊豆方面は伊豆縦貫道の一部が自動車専用区間なので要注意。" },
  { pref: "広島", article: "hiroshima-bike-restriction", prefSlug: "hiroshima", note: "広島高速が原付禁止。しまなみ海道は本線ではなく橋の側道（原付道）を利用する。" },
  { pref: "兵庫", article: "hyogo-bike-restriction", prefSlug: "hyogo", note: "阪神高速神戸線・第二神明が原付禁止。淡路島へは原付で明石海峡大橋を渡れないためフェリーを利用。" },
  { pref: "北海道", article: "hokkaido-bike-restriction", prefSlug: "hokkaido", note: "道央道・道東道など高速は原付禁止。無料の自動車専用道も禁止対象で“無料だから”では判断できない。" },
  { pref: "埼玉", article: "saitama-bike-restriction", prefSlug: "saitama", note: "首都高・外環道・関越・東北道が原付禁止。秩父方面へは国道299号など一般道で。" },
];

export default function MichinoekiBypassCautionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "道の駅へ向かう自動車専用バイパス注意マップ", path: "/articles/michinoeki-bypass-caution" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">
          ← 解説記事一覧
        </Link>
      </div>

      <div className="mb-2">
        <TagPills tags={["道の駅", "自動車専用道路", "うっかり進入"]} />
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        道の駅へ向かう“うっかり自動車専用バイパス”注意マップ【原付・125cc】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            道の駅ツーリングで意外な落とし穴が、
            <strong>道の駅の近くを通る「自動車専用バイパス」への うっかり進入</strong>です。
            道の駅は交通量の多い幹線道路沿いに多く、その幹線が自動車専用道路になっていることがあります。
            自動車専用道路は<strong>無料であっても原付・125ccは通行できません</strong>。
            この記事では、なぜ道の駅の近くで進入が起きやすいのか、どう見分けて避けるのか、
            そして<strong>実際の通行禁止区間を地図で確認する方法</strong>までまとめます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">なぜ道の駅の近くで“うっかり進入”が起きるのか</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>道の駅は幹線・バイパス沿いに設置されやすい：</strong>
              集客と交通の便から、交通量の多い幹線道路沿いに道の駅が置かれます。その幹線が自動車専用バイパスのことがあります。
            </li>
            <li>
              <strong>無料でも“自動車専用”は原付NG：</strong>
              「有料＝原付ダメ」という誤解が根強いですが、判断基準は料金ではなく<strong>「自動車専用」の指定があるかどうか</strong>。
              無料の自動車専用バイパスは全国にあり、原付・125ccは通れません。
            </li>
            <li>
              <strong>ナビが排気量を無視する：</strong>
              地図アプリ・カーナビは車種の排気量を考慮せず、最短の自専道へ案内することがあります。案内どおり進むと入口に吸い込まれます。
            </li>
            <li>
              <strong>道の駅を出た直後の合流で判断が遅れる：</strong>
              休憩後の発進直後は標識の確認が甘くなりがち。合流部でそのまま本線（自専道）へ入ってしまうケースがあります。
            </li>
          </ul>
          <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-800">
            <strong className="block mb-1">実例：無料でも原付が通れない自動車専用道路</strong>
            たとえば石川県の「のと里山海道」は<strong>無料</strong>ですが自動車専用道路のため、原付・125ccは通行できません。
            このように「無料だから大丈夫」は通用しない区間が各地にあります（
            <Link href="/articles/ishikawa-bike-restriction" className="underline">石川県の通行禁止区間まとめ</Link>
            も参照）。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">自動車専用バイパスの見分け方 3つのサイン</h2>
          <div className="space-y-3">
            {[
              {
                n: "1",
                t: "入口の青地「自動車専用（325）」標識",
                b: "最も確実な判断材料。青地に自動車と道路を描いた四角い標識があれば、そこから先は原付・125cc進入禁止です。道の駅を出て幹線に合流する手前で、この標識の有無を必ず確認します。",
              },
              {
                n: "2",
                t: "ランプ（立体的な合流路）の形状",
                b: "信号のない立体的なランプで本線に合流する構造は、自動車専用道路の典型。平面交差点ではなく“流入路で加速して合流”する形なら要警戒です。",
              },
              {
                n: "3",
                t: "「◯◯バイパス」「◯◯道路」の名称に惑わされない",
                b: "名前だけでは判断できません。同じ『バイパス』でも自動車専用のものと、原付も通れる一般道のものがあります。最終判断は名称ではなく現地の標識で行います。",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-black">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{s.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            標識そのものの見分け方は{" "}
            <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline">二輪通行禁止の標識の見分け方</Link>
            {" "}で図解しています。「有料でも原付が通れる／無料でも通れない」の理由は{" "}
            <Link href="/articles/moped-expressway-reason" className="text-orange-600 underline">こちら</Link>
            {" "}へ。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">うっかり進入しやすい 3つの類型</h2>
          <div className="space-y-2">
            {[
              ["無料の自動車専用バイパス", "料金所がないぶん「普通の道」と勘違いしやすい。無料でも青い『自動車専用』標識があれば原付・125ccは不可。"],
              ["道の駅を出た直後の本線合流", "休憩後の発進直後は標識確認が甘くなりがち。合流部で側道（原付が通れる道）と本線（自専道）の分岐を見落とさない。"],
              ["側道を見落として本線へ", "自専バイパスには原付が通れる並行の側道（旧道・側道）があることが多い。ナビが本線を案内しても、側道の存在を疑って標識を確認する。"],
            ].map(([t, b]) => (
              <div key={t} className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
                <p className="font-bold text-yellow-800 text-sm">{t}</p>
                <p className="text-xs text-yellow-700 mt-0.5">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-1">県別 うっかり注意ポイント</h2>
          <p className="text-xs text-gray-500 mb-3">検索需要の高い8県</p>
          <p className="mb-4">
            道の駅ツーリングでよく走られる8県について、<strong>向かう途中で原付・125ccがうっかり進入しやすい自専道</strong>を
            県別にまとめました。各県の詳細と地図はリンク先で確認できます。
            行き方のモデルルートは{" "}
            <Link href="/articles/michinoeki-touring-route" className="text-orange-600 underline">道の駅 下道ルート集</Link>
            {" "}と対で見ると便利です。
          </p>
          <div className="space-y-3">
            {PREF_HAZARDS.map((h) => (
              <div key={h.pref} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-bold text-gray-900 text-sm mb-1">{h.pref}</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{h.note}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <Link href={`/articles/${h.article}`} className="text-orange-600 underline">
                    → 禁止区間まとめ
                  </Link>
                  <Link href={`/prefectures/${h.prefSlug}`} className="text-orange-600 underline">
                    → 地図で確認
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">実際の通行禁止区間を地図で確認する</h2>
          <p className="mb-3">
            「この道の駅の近くのバイパスは通れる？」を確実に判断するには、
            <strong>実際の通行禁止区間データを地図で確認する</strong>のが一番です。
            BikeRoute は、公的情報・道路管理者情報・現地確認をもとにした
            <strong>原付・125ccが通れない区間のデータベース</strong>を地図で公開しています。
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/segments" className="text-orange-600 underline">
                  → 全国の50cc・125cc通行禁止区間マップ（地図で確認）
                </Link>
              </li>
              <li className="text-xs text-gray-500">
                都道府県ごとに絞って見るなら、各県ページ（例：{" "}
                <Link href="/prefectures/ishikawa" className="text-orange-600 underline">石川県</Link>
                {" ・ "}
                <Link href="/prefectures/kanagawa" className="text-orange-600 underline">神奈川県</Link>
                {" ・ "}
                <Link href="/prefectures/shizuoka" className="text-orange-600 underline">静岡県</Link>
                ）からも確認できます。
              </li>
            </ul>
          </div>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">道の駅ルートに“自専バイパス”が混ざっていないか自動判定</p>
          <p className="text-sm text-gray-700 mb-3">
            出発地・目的地・車種を入れるだけで、ルート上に原付・125ccが通れない自動車専用区間が
            含まれていないかを自動でチェック。うっかり進入を出発前に防げます。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">もし進入しかけたら</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>入口手前で気づいたら、無理な転回はせず、安全に停止できる場所で一旦停まって側道・迂回路を探す。</li>
            <li>本線に入ってしまったら、慌てず次の出口・インターで速やかに一般道へ降りる。逆走やその場でのUターンは絶対にしない。</li>
            <li>迂回に迷ったら、事前に組んだ下道ルートや地図アプリの「一般道優先」で再検索する。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事</h2>
          <ul className="space-y-2">
            <li><Link href="/articles/michinoeki-touring-route" className="text-orange-600 underline text-sm">原付・125ccで下道だけで巡る 道の駅ツーリングルートの作り方</Link></li>
            <li><Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline text-sm">二輪通行禁止の標識の見分け方</Link></li>
            <li><Link href="/articles/moped-expressway-reason" className="text-orange-600 underline text-sm">有料道路・バイパスで原付が通れない理由</Link></li>
            <li><Link href="/articles/pre-ride-checklist" className="text-orange-600 underline text-sm">ツーリング前チェックリスト（引き返さないための準備）</Link></li>
          </ul>
        </section>

        <ArticleSources />

      </div>
    </main>
  );
}
