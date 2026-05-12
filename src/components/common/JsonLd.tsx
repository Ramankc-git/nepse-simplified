interface JsonLdProps {
  data: Record<string, string | number | boolean | object | null | undefined>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schema helpers
export function WebsiteJsonLd({ url, name, description }: { url: string; name: string; description: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        url,
        description,
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  publisherName,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        image,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Person",
          name: authorName || "NEPSE SIMPLIFIED",
        },
        publisher: {
          "@type": "Organization",
          name: publisherName || "NEPSE SIMPLIFIED",
          logo: {
            "@type": "ImageObject",
            url: "https://nepsesimplified.com/logo.jpg",
          },
        },
      }}
    />
  );
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  description,
  sameAs,
}: {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: name || "NEPSE SIMPLIFIED",
        url: url || "https://nepsesimplified.com",
        logo: logo || "https://nepsesimplified.com/logo.jpg",
        description:
          description ||
          "Your go-to source for Nepal Stock Exchange (NEPSE) market analysis, tutorials, and investment insights.",
        sameAs: sameAs || [],
      }}
    />
  );
}
