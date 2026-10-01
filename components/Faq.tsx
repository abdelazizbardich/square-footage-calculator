import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="faq">
      <h2>Frequently asked questions</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q}>
            <summary>
              {item.q}
              <CaretDown size={18} aria-hidden />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
