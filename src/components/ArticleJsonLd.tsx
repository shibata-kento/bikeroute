const BASE_URL = "https://www.bikeroutemap.com";
const ORG = { "@type": "Organization", name: "BikeRoute", url: BASE_URL } as const;

type Props = {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
};

export function ArticleJsonLd({ headline, description, slug, datePublished }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified: datePublished,
    author: ORG,
    publisher: ORG,
    url: `${BASE_URL}/articles/${slug}`,
    inLanguage: "ja",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
