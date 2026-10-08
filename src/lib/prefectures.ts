export const PREFECTURES: { slug: string; name: string; region: string }[] = [
  { slug: "hokkaido", name: "北海道", region: "北海道" },
  { slug: "aomori", name: "青森県", region: "東北" },
  { slug: "iwate", name: "岩手県", region: "東北" },
  { slug: "miyagi", name: "宮城県", region: "東北" },
  { slug: "akita", name: "秋田県", region: "東北" },
  { slug: "yamagata", name: "山形県", region: "東北" },
  { slug: "fukushima", name: "福島県", region: "東北" },
  { slug: "ibaraki", name: "茨城県", region: "関東" },
  { slug: "tochigi", name: "栃木県", region: "関東" },
  { slug: "gunma", name: "群馬県", region: "関東" },
  { slug: "saitama", name: "埼玉県", region: "関東" },
  { slug: "chiba", name: "千葉県", region: "関東" },
  { slug: "tokyo", name: "東京都", region: "関東" },
  { slug: "kanagawa", name: "神奈川県", region: "関東" },
  { slug: "niigata", name: "新潟県", region: "中部" },
  { slug: "toyama", name: "富山県", region: "中部" },
  { slug: "ishikawa", name: "石川県", region: "中部" },
  { slug: "fukui", name: "福井県", region: "中部" },
  { slug: "yamanashi", name: "山梨県", region: "中部" },
  { slug: "nagano", name: "長野県", region: "中部" },
  { slug: "shizuoka", name: "静岡県", region: "中部" },
  { slug: "aichi", name: "愛知県", region: "中部" },
  { slug: "gifu", name: "岐阜県", region: "中部" },
  { slug: "mie", name: "三重県", region: "近畿" },
  { slug: "shiga", name: "滋賀県", region: "近畿" },
  { slug: "kyoto", name: "京都府", region: "近畿" },
  { slug: "osaka", name: "大阪府", region: "近畿" },
  { slug: "hyogo", name: "兵庫県", region: "近畿" },
  { slug: "nara", name: "奈良県", region: "近畿" },
  { slug: "wakayama", name: "和歌山県", region: "近畿" },
  { slug: "tottori", name: "鳥取県", region: "中国" },
  { slug: "shimane", name: "島根県", region: "中国" },
  { slug: "okayama", name: "岡山県", region: "中国" },
  { slug: "hiroshima", name: "広島県", region: "中国" },
  { slug: "yamaguchi", name: "山口県", region: "中国" },
  { slug: "tokushima", name: "徳島県", region: "四国" },
  { slug: "kagawa", name: "香川県", region: "四国" },
  { slug: "ehime", name: "愛媛県", region: "四国" },
  { slug: "kochi", name: "高知県", region: "四国" },
  { slug: "fukuoka", name: "福岡県", region: "九州" },
  { slug: "saga", name: "佐賀県", region: "九州" },
  { slug: "nagasaki", name: "長崎県", region: "九州" },
  { slug: "kumamoto", name: "熊本県", region: "九州" },
  { slug: "oita", name: "大分県", region: "九州" },
  { slug: "miyazaki", name: "宮崎県", region: "九州" },
  { slug: "kagoshima", name: "鹿児島県", region: "九州" },
  { slug: "okinawa", name: "沖縄県", region: "沖縄" },
];

export const slugToName = (slug: string): string | undefined =>
  PREFECTURES.find((p) => p.slug === slug)?.name;

export const nameToSlug = (name: string): string | undefined =>
  PREFECTURES.find((p) => p.name === name)?.slug;

export type PrefectureInfo = {
  summary: string;
  roads: { name: string; note: string }[];
  articleHref?: string;
  articleLabel?: string;
};

// 都道府県ページに載せる固有情報。ここに載っている都道府県は
// 区間データが0件でも index 対象になる（sitemap.ts / prefectures/[slug] が参照）。
export const PREFECTURE_INFO: Record<string, PrefectureInfo> = {
  tokyo: {
    summary: "東京都内では首都高速道路（全線）が自動車専用道路に指定されており、原付一種・原付二種は通行できません。また、C2中央環状線の山手トンネルは普通二輪以上も通行禁止です。",
    roads: [
      { name: "首都高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "C2山手トンネル", note: "二輪車全車種 通行禁止" },
      { name: "東京外環自動車道", note: "原付一種・二種 通行禁止" },
    ],
    articleHref: "/articles/shutoko-bike-restriction",
    articleLabel: "首都高バイク通行禁止区間まとめ",
  },
  kanagawa: {
    summary: "神奈川県では首都高速神奈川線（横羽線・湾岸線）・第三京浜・横浜横須賀道路・横浜新道・小田原厚木道路などが自動車専用道路に指定されており、原付は通行できません。",
    roads: [
      { name: "首都高 横羽線（K1）", note: "原付一種・二種 通行禁止" },
      { name: "首都高 湾岸線（K3・K5）", note: "原付一種・二種 通行禁止" },
      { name: "第三京浜道路", note: "原付一種・二種 通行禁止" },
      { name: "横浜横須賀道路", note: "原付一種・二種 通行禁止" },
    ],
    articleHref: "/articles/kanagawa-bike-restriction",
    articleLabel: "神奈川のバイク通行禁止区間まとめ",
  },
  osaka: {
    summary: "大阪府では阪神高速道路（全線）が自動車専用道路に指定されており、原付一種・原付二種は通行できません。大阪港トンネルは二輪車全車種が通行禁止です。",
    roads: [
      { name: "阪神高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "大阪港トンネル", note: "二輪車全車種 通行禁止" },
      { name: "夢咲トンネル", note: "125cc以下 通行禁止（126cc以上は通行可能）" },
      { name: "近畿自動車道", note: "原付一種・二種 通行禁止" },
    ],
    articleHref: "/articles/osaka-bike-restriction",
    articleLabel: "大阪のバイク通行禁止区間まとめ",
  },
  aichi: {
    summary: "愛知県では名古屋高速道路（全線）・東名高速・新東名高速・伊勢湾岸自動車道などが自動車専用道路に指定されており、原付一種・原付二種は通行できません。",
    roads: [
      { name: "名古屋高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "東名高速道路", note: "原付一種・二種 通行禁止" },
      { name: "伊勢湾岸自動車道", note: "原付一種・二種 通行禁止" },
    ],
  },
  fukuoka: {
    summary: "福岡県では福岡都市高速道路（全線）が自動車専用道路に指定されています。また若戸トンネルは126cc以上の二輪車も通行禁止となる区間として知られています。",
    roads: [
      { name: "福岡都市高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "若戸トンネル", note: "二輪車全車種 通行禁止" },
      { name: "九州自動車道", note: "原付一種・二種 通行禁止" },
    ],
  },
  hyogo: {
    summary: "兵庫県では阪神高速道路（全線）と播但連絡道路・姫路バイパスなどが自動車専用道路に指定されており、原付は通行できません。",
    roads: [
      { name: "阪神高速道路（神戸線・湾岸線）", note: "原付一種・二種 通行禁止" },
      { name: "播但連絡道路", note: "原付一種・二種 通行禁止" },
      { name: "姫路バイパス（自動車専用区間）", note: "原付一種・二種 通行禁止" },
    ],
  },
};
