import Link from "next/link";

const TOOLS = [
  {
    href: "/",
    title: "Square Footage Calculator",
    text: "Rooms, L-shapes, circles and triangles — add as many areas as you need.",
  },
  {
    href: "/flooring-calculator",
    title: "Flooring Calculator",
    text: "Boxes of laminate, vinyl or hardwood with waste and total cost.",
  },
  {
    href: "/tile-calculator",
    title: "Tile Calculator",
    text: "How many tiles and boxes you need for a floor or wall.",
  },
  {
    href: "/square-feet-to-square-meters",
    title: "Sq Ft to Sq M Converter",
    text: "Convert square feet, meters, yards and acres instantly.",
  },
  {
    href: "/how-to-calculate-square-footage",
    title: "How to Calculate Square Footage",
    text: "Formulas and worked examples for every room shape.",
  },
];

export function RelatedTools({ exclude }: { exclude: string }) {
  return (
    <section>
      <h2>Related calculators</h2>
      <ul className="related">
        {TOOLS.filter((t) => t.href !== exclude).map((t) => (
          <li key={t.href}>
            <Link href={t.href}>
              <strong>{t.title}</strong>
              {t.text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
