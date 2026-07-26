import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ArticleSources } from "@/components/ArticleSources";
import { TagPills } from "@/components/TagPills";
import { PREFECTURES } from "@/lib/prefectures";
import { buildGoogleMapsUrl } from "@/lib/vehicle";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/michinoeki-touring-route" },
  title: "原付・125ccで下道だけで巡る 道の駅ツーリングルートの作り方【県別】",
  description:
    "高速に乗れない原付・125ccでも、道の駅を下道でつないでいけば無理なくロングツーリングが楽しめます。ルート設計の3ステップに加え、愛知・神奈川・大阪・静岡・広島・兵庫・北海道・埼玉の県庁所在地の駅から行ける道の駅への下道ルートを、原付向けのGoogleマップリンク付きで掲載します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "原付・125ccで下道だけで巡る 道の駅ツーリングルートの作り方【県別】",
  description:
    "高速に乗れない原付・125ccが道の駅を下道でつないで巡るためのルート設計3ステップと、需要の高い8県の県庁所在地の駅から行ける道の駅への下道ルート集を掲載。",
  datePublished: "2026-07-26",
  dateModified: "2026-07-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/michinoeki-touring-route",
  inLanguage: "ja",
};

// 都道府県を地域ごとにまとめる（PREFECTURES は地理順で並んでいるため出現順で地域も正しく並ぶ）
const prefecturesByRegion = PREFECTURES.reduce<Record<string, typeof PREFECTURES>>((acc, p) => {
  (acc[p.region] ??= []).push(p);
  return acc;
}, {});

// 検索需要の高い8県について、県庁所在地の主要駅から下道で行ける実在の道の駅ルート。
// 道の駅はすべて実在する国交省登録施設。距離は下道での概算。
// ルートリンクは buildGoogleMapsUrl で原付二種（125cc / 高速・有料回避）向けに生成する。
type MichinoekiRoute = { eki: string; road: string; dist: string; note: string };
const ROUTES: { pref: string; from: string; items: MichinoekiRoute[] }[] = [
  {
    pref: "愛知", from: "名古屋駅", items: [
      { eki: "道の駅 藤川宿", road: "国道1号（旧東海道）", dist: "約40km", note: "岡崎の東の玄関口。むらさき麦うどん・八丁味噌。24時間トイレあり。" },
      { eki: "道の駅 もっくる新城", road: "国道151号", dist: "約65km", note: "新城の玄関口。足湯と特大五平餅で有名なライダー人気スポット。" },
    ],
  },
  {
    pref: "神奈川", from: "横浜駅", items: [
      { eki: "道の駅 清川", road: "県道60号ほか", dist: "約40km", note: "神奈川唯一の村。宮ヶ瀬・丹沢方面の入口。" },
      { eki: "道の駅 湘南ちがさき", road: "国道134号ほか", dist: "約25km", note: "湘南の海沿いを走って到着。海岸線ツーリングの休憩に。" },
    ],
  },
  {
    pref: "大阪", from: "大阪駅", items: [
      { eki: "道の駅 しらとりの郷・羽曳野", road: "国道170号ほか", dist: "約25km", note: "新鮮野菜が安い。市街から近く初回に行きやすい。" },
      { eki: "道の駅 ちはやあかさか", road: "府道705号ほか", dist: "約35km", note: "大阪唯一の村・千早赤阪村。金剛山麓の“日本一かわいい道の駅”。" },
    ],
  },
  {
    pref: "静岡", from: "静岡駅", items: [
      { eki: "道の駅 宇津ノ谷峠", road: "国道1号（旧東海道）", dist: "約12km", note: "市街から近い峠の駅。お茶・みかんなど地場品。" },
      { eki: "道の駅 富士川楽座", road: "国道1号ほか", dist: "約35km", note: "富士山ビューの大型館。一般道からもアクセス可。" },
    ],
  },
  {
    pref: "広島", from: "広島駅", items: [
      { eki: "道の駅 湖畔の里福富", road: "国道375号", dist: "約40km", note: "福富ダム湖畔。広島県最大級の複合施設。市街から北へ。" },
    ],
  },
  {
    pref: "兵庫", from: "三ノ宮駅", items: [
      { eki: "道の駅 神戸フルーツ・フラワーパーク大沢", road: "県道38号ほか", dist: "約20km", note: "北神戸の花と果実のテーマパーク。西日本最大級。" },
    ],
  },
  {
    pref: "北海道", from: "札幌駅", items: [
      { eki: "道の駅 サーモンパーク千歳", road: "国道36号・337号", dist: "約45km", note: "サケの水族館併設。新千歳空港も近い。" },
      { eki: "道の駅 望羊中山", road: "国道230号", dist: "約50km", note: "中山峠の“あげいも”が名物。羊蹄山ビュー。" },
    ],
  },
  {
    pref: "埼玉", from: "大宮駅", items: [
      { eki: "道の駅 果樹公園あしがくぼ", road: "国道299号ほか", dist: "約60km", note: "秩父の玄関口。バイク駐輪スペース多数のライダー人気駅。" },
    ],
  },
];

export default function MichinoekiTouringRoutePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "道の駅ツーリングルートの作り方", path: "/articles/michinoeki-touring-route" },
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
        <TagPills tags={["道の駅", "ツーリング", "下道"]} />
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        原付・125ccで下道だけで巡る 道の駅ツーリングルートの作り方【県別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            高速道路・自動車専用道路に乗れない原付・125ccにとって、
            <strong>道の駅は下道ツーリングの理想的な中継地点</strong>です。
            トイレ・休憩・食事・地域情報がそろい、多くは幹線道路沿いにあるので下道ルートに組み込みやすい。
            この記事では、<strong>道の駅を「点」でつないで下道ルートを組む方法</strong>を、
            原付・125cc特有の注意点（自動車専用バイパスの回避）とあわせて解説します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">なぜ原付・125ccと道の駅は相性がいいのか</h2>
          <p className="mb-3">
            道の駅は国土交通省に登録された休憩施設で、全国に1,200か所以上あります。
            高速を使わない原付・125ccツーリングと相性がいい理由は次のとおりです。
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>下道沿いにある：</strong>道の駅は一般国道・県道など下道沿いに設置されるため、原付でも必ず立ち寄れる。</li>
            <li><strong>休憩間隔の目安になる：</strong>「次の道の駅まで」を区切りにすると、給油・休憩のペース配分がしやすい。</li>
            <li><strong>給油・食事・情報が集まる：</strong>山間部でも比較的スタンドや飲食、地域の道路情報にアクセスしやすい。</li>
            <li><strong>目的地そのものになる：</strong>スタンプラリーや地場グルメなど、道の駅巡り自体がツーリングの目的になる。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">下道で道の駅をつなぐルート設計 3ステップ</h2>
          <div className="space-y-3">
            {[
              {
                t: "STEP 1 ── 立ち寄る道の駅を「点」で決める",
                b: "まず地図上で、行きたい道の駅を2〜4か所ピックアップします。欲張らず、1日で無理なく回れる数に絞るのがコツ。原付・125ccは高速でショートカットできないぶん、点と点の距離が総走行時間に直結します。",
              },
              {
                t: "STEP 2 ── 点と点を「下道」でつなぐ",
                b: "道の駅どうしを一般道でつなぎます。このとき最大の注意点が、区間に高速・自動車専用道路（自専バイパス）が混ざらないこと。地図アプリは排気量を考慮せず自専道へ誘導することがあるため、ルート候補は必ず一般道優先で組みます。",
              },
              {
                t: "STEP 3 ── 出発前にルートの通行可否を判定",
                b: "組んだルートに原付・125ccが通れない区間が含まれていないかを、車種を選んで事前チェック。入口での引き返しを防げます。BikeRoute なら出発地・目的地・車種を入れるだけで自動判定できます。",
              },
            ].map((s, i) => (
              <div key={s.t} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-black">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{s.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-1">県庁所在地の駅から行く 道の駅 下道ルート集</h2>
          <p className="text-xs text-gray-500 mb-3">検索需要の高い8県をピックアップ</p>
          <p className="mb-4">
            「まずどこへ行こう？」の一歩目に。各県の<strong>県庁所在地の主要駅から下道で行ける実在の道の駅</strong>への
            モデルルートです。ルートリンクは<strong>125cc（原付二種）向けに高速・有料道路を回避</strong>したGoogleマップを開きます。
          </p>
          <div className="space-y-4">
            {ROUTES.map(({ pref, from, items }) => (
              <div key={pref} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-bold text-gray-900 text-sm mb-3">
                  {pref}
                  <span className="ml-1 font-normal text-xs text-gray-400">（{from} 発）</span>
                </p>
                <div className="space-y-3">
                  {items.map((r) => (
                    <div key={r.eki} className="border-t border-gray-100 pt-3 first:border-t-0 first:pt-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold text-gray-800 text-sm">{r.eki}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {r.road} ／ 下道 {r.dist}（概算）
                          </p>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{r.note}</p>
                        </div>
                        <a
                          href={buildGoogleMapsUrl({ origin: from, destination: r.eki, vehicleClass: "genki2" })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-600"
                        >
                          ルート →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            ※道の駅はすべて実在する国土交通省登録施設です。距離は下道での概算で、実際の所要は交通状況により変わります。
            50cc（原付一種）はフェリーも回避対象になるため、
            出発前に{" "}
            <Link href="/" className="text-orange-600 underline">BikeRoute で車種を選んでルート判定</Link>
            {" "}するのが確実です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付・125ccで道の駅を巡るときの注意点</h2>
          <div className="space-y-2">
            {[
              ["幹線沿いの道の駅ほど“自専バイパス”が近い", "道の駅は交通量の多い幹線沿いに多く、その幹線が自動車専用バイパスになっている・接続していることがあります。道の駅を出た直後の合流でうっかり進入しないよう、側道（原付が通れる道）を事前に確認しておきましょう。"],
              ["給油は「早め」が鉄則", "道の駅はあってもガソリンスタンドが近くにあるとは限りません。特に山間部・郊外はスタンドが少なく営業時間も短め。燃料計が半分を切ったら給油、を基本に。"],
              ["日没から逆算して計画", "下道は街灯の少ない区間が多く、夜間は視認性が落ちます。最後の道の駅を出る時刻を日没から逆算して決めておくと安心です。"],
              ["スタンプ・営業時間・定休日を確認", "スタンプ設置場所や施設の営業時間・定休日は道の駅ごとに異なります。スタンプラリー目的なら、押印可能な時間帯も含めて計画に入れておきましょう。"],
            ].map(([t, b]) => (
              <div key={t} className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
                <p className="font-bold text-yellow-800 text-sm">{t}</p>
                <p className="text-xs text-yellow-700 mt-0.5">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            自動車専用バイパスの見分け方・回避のコツは{" "}
            <Link href="/articles/michinoeki-bypass-caution" className="text-orange-600 underline">
              道の駅へ向かう“うっかり自動車専用バイパス”注意マップ
            </Link>
            {" "}で詳しく解説しています。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">組んだルート、原付で本当に通れる？</p>
          <p className="text-sm text-gray-700 mb-3">
            道の駅どうしをつないだルートに、原付・125ccが通れない自動車専用区間が混ざっていないかを、
            車種を選ぶだけで自動チェック。出発前に引き返しリスクをつぶせます。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">県別に通行禁止区間をチェックしてルートを組む</h2>
          <p className="mb-4 text-sm">
            道の駅ルートを組む前に、まず走る予定の都道府県で
            <strong>原付・125ccが通れない区間</strong>を把握しておくと安全です。
            各県のページで、県内の自動車専用道路・通行禁止区間を地図と一覧で確認できます。
          </p>
          <div className="space-y-4">
            {Object.entries(prefecturesByRegion).map(([region, prefs]) => (
              <div key={region}>
                <p className="text-xs font-bold text-gray-500 mb-1.5">{region}</p>
                <div className="flex flex-wrap gap-1.5">
                  {prefs.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/prefectures/${p.slug}`}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:border-orange-300 hover:text-orange-600"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            全国の通行禁止区間を地図でまとめて見るなら{" "}
            <Link href="/segments" className="text-orange-600 underline">
              50cc・125cc通行禁止区間マップ
            </Link>
            {" "}へ。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事</h2>
          <ul className="space-y-2">
            <li><Link href="/articles/michinoeki-bypass-caution" className="text-orange-600 underline text-sm">道の駅へ向かう“うっかり自動車専用バイパス”注意マップ</Link></li>
            <li><Link href="/articles/125cc-touring-guide" className="text-orange-600 underline text-sm">原付二種で行く「下道ロングツーリング」術</Link></li>
            <li><Link href="/articles/pre-ride-checklist" className="text-orange-600 underline text-sm">ツーリング前チェックリスト（引き返さないための準備）</Link></li>
            <li><Link href="/articles/bike-passage-chart" className="text-orange-600 underline text-sm">バイク・原付の通行区分 完全早見表【保存版】</Link></li>
          </ul>
        </section>

        <ArticleSources />

      </div>
    </main>
  );
}
