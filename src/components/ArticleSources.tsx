/**
 * 記事末尾の「参考・出典」ブロック。
 * 情報の根拠（法令・公的機関・道路管理者）を明示し、E-E-A-T（専門性・信頼性）を高める。
 */
export function ArticleSources() {
  return (
    <section className="border-t border-gray-100 pt-6">
      <h2 className="text-base font-bold text-gray-900 mb-2">参考・出典</h2>
      <ul className="list-disc pl-5 space-y-1 text-xs text-gray-500 leading-relaxed">
        <li>道路交通法（昭和35年法律第105号）</li>
        <li>道路標識、区画線及び道路標示に関する命令（標識令）</li>
        <li>国土交通省 — 道路の区分・自動車専用道路の指定に関する情報</li>
        <li>各道路管理者（NEXCO東日本・中日本・西日本、首都高速道路、阪神高速道路、各都市高速 等）が公表する通行規制情報</li>
        <li>日本二輪車普及安全協会（JMPSA）／ OpenStreetMap（ODbL）</li>
      </ul>
      <p className="mt-3 text-xs text-gray-400 leading-relaxed">
        本記事は上記の公的情報・法令をもとに編集しています。通行規制は改正・変更される場合があります。
        走行時は必ず現地の道路標識と各道路管理者の最新情報をご確認ください。
        内容の誤りは{" "}
        <a
          href="https://github.com/shibata-kento/bikeroute/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          GitHub Issues
        </a>{" "}
        または お問い合わせ からご報告いただけます。
      </p>
    </section>
  );
}
