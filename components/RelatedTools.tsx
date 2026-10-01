import Link from "next/link";
import {
  ArrowsLeftRight,
  BookOpenText,
  GridFour,
  Package,
  Ruler,
} from "@phosphor-icons/react/dist/ssr";

const TOOLS = [
  {
    href: "/",
    title: "Square Footage Calculator",
    text: "Rooms, L-shapes, circles and triangles — add as many areas as you need.",
    Icon: Ruler,
  },
  {
    href: "/flooring-calculator",
    title: "Flooring Calculator",
    text: "Boxes of laminate, vinyl or hardwood with waste and total cost.",
    Icon: Package,
  },
  {
    href: "/tile-calculator",
    title: "Tile Calculator",
    text: "How many tiles and boxes you need for a floor or wall.",
    Icon: GridFour,
  },
  {
    href: "/square-feet-to-square-meters",
    title: "Sq Ft to Sq M Converter",
    text: "Convert square feet, meters, yards and acres instantly.",
    Icon: ArrowsLeftRight,
  },
  {
    href: "/how-to-calculate-square-footage",
    title: "How to Calculate Square Footage",
    text: "Formulas and worked examples for every room shape.",
    Icon: BookOpenText,
  },
];

export function RelatedTools({ exclude }: { exclude: string }) {
  return (
    <section>
      <h2>More calculators</h2>
      <ul className="related">
        {TOOLS.filter((t) => t.href !== exclude).map(({ href, title, text, Icon }) => (
          <li key={href}>
            <Link href={href}>
              <span className="related-icon">
                <Icon size={22} aria-hidden />
              </span>
              <strong>{title}</strong>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
