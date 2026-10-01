import type { Metadata } from "next";
import Link from "next/link";
import { Faq, type FaqItem } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { TileCalculator } from "@/components/TileCalculator";

export const metadata: Metadata = {
  title: "Tile Calculator — How Many Tiles Do I Need?",
  description:
    "Free tile calculator for floors, walls and backsplashes. Enter the area and tile size to get the number of tiles, boxes and cost, including waste.",
  alternates: { canonical: "/tile-calculator" },
};

const faq: FaqItem[] = [
  {
    q: "How do I calculate how many tiles I need?",
    a: "Find the area in square feet, add waste, then divide by the area of one tile in square feet (tile width × tile length in inches ÷ 144). Round up. 100 sq ft with 10% waste using 12″ × 12″ tiles needs 110 tiles.",
  },
  {
    q: "How much extra tile should I buy?",
    a: "Buy 10% extra for straight layouts and 15% for diagonal or herringbone patterns. Large-format tiles over 24″ may need 15% because each broken tile costs more coverage.",
  },
  {
    q: "Does grout width change the number of tiles?",
    a: "Slightly — grout lines make each tile cover a bit more area, so ignoring them gives a small safety margin. For standard 1/16″–1/8″ joints the difference is under 2%.",
  },
  {
    q: "How many 12x24 tiles are in a box?",
    a: "Most boxes of 12″ × 24″ tile contain 6–8 tiles covering 12–16 sq ft. Check the carton and enter tiles per box to get the box count.",
  },
];

const sizes = [
  { size: "4″ × 4″", sqft: 4 * 4 / 144 },
  { size: "6″ × 6″", sqft: 6 * 6 / 144 },
  { size: "12″ × 12″", sqft: 1 },
  { size: "12″ × 24″", sqft: 2 },
  { size: "18″ × 18″", sqft: 2.25 },
  { size: "24″ × 24″", sqft: 4 },
  { size: "3″ × 6″ subway", sqft: 18 / 144 },
];

export default function TilePage() {
  return (
    <>
      <h1>Tile Calculator</h1>
      <p className="lead">
        Enter the floor or wall size and your tile dimensions. The calculator returns how many tiles
        to buy with waste included, plus boxes and cost if you add them.
      </p>

      <TileCalculator />

      <h2>Tiles needed per 100 sq ft by tile size</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tile size</th>
              <th>Sq ft per tile</th>
              <th>Tiles per 100 sq ft (no waste)</th>
              <th>With 10% waste</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s.size}>
                <td>{s.size}</td>
                <td>{s.sqft.toFixed(3)}</td>
                <td>{Math.ceil(100 / s.sqft - 1e-9)}</td>
                <td>{Math.ceil(110 / s.sqft - 1e-9)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Tile layout tips that affect quantity</h2>
      <h3>Floors</h3>
      <p>
        Measure wall to wall and ignore baseboards. Exclude permanent fixtures like kitchen islands
        and tubs.
      </p>
      <h3>Walls and backsplashes</h3>
      <p>
        Measure the height and width of each wall section and subtract windows and doors larger
        than about 4 sq ft. Use the <Link href="/">square footage calculator</Link> to add several wall
        sections together.
      </p>

      <Faq items={faq} />
      <RelatedTools exclude="/tile-calculator" />
    </>
  );
}
