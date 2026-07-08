export type FaqItem = { q: string; a: string };

/**
 * FAQPage 構造化データ（schema.org）を出力する。
 * 表示用の Q&A と同じ配列を渡すことで、表示とスキーマの二重管理を防ぐ。
 */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
