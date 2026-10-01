import type { Metadata } from "next";
import { AreaConverter } from "@/components/AreaConverter";
import { Faq, type FaqItem } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "Square Feet to Square Meters Converter (sq ft to m²)",
  description:
    "Convert square feet to square meters, square yards, acres and back. 1 sq ft = 0.0929 m². Includes a quick conversion table.",
  alternates: { canonical: "/square-feet-to-square-meters" },
};

const faq: FaqItem[] = [
  {
    q: "How do I convert square feet to square meters?",
    a: "Multiply square feet by 0.092903. For example, 500 sq ft × 0.092903 = 46.45 m².",
  },
  {
    q: "How do I convert square meters to square feet?",
    a: "Multiply square meters by 10.7639. For example, 50 m² × 10.7639 = 538.2 sq ft.",
  },
  {
    q: "How many square feet are in an acre?",
    a: "One acre is 43,560 square feet, or about 4,047 square meters.",
  },
  {
    q: "How many square feet are in a square yard?",
    a: "One square yard is 9 square feet (3 ft × 3 ft). Carpet is often priced per square yard.",
  },
];

const rows = [10, 50, 100, 200, 500, 1000, 1500, 2000, 2500, 5000];

export default function ConverterPage() {
  return (
    <>
      <h1>Square Feet to Square Meters Converter</h1>
      <p className="lead">
        Type an area and pick the unit. All other units update instantly: square feet, square
        meters, square yards, square inches and acres.
      </p>

      <AreaConverter />

      <h2>Conversion formulas</h2>
      <p className="formula">m² = sq ft × 0.092903</p>
      <p className="formula">sq ft = m² × 10.7639</p>

      <h2>Square feet to square meters table</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Square feet</th>
              <th>Square meters</th>
              <th>Square yards</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((ft) => (
              <tr key={ft}>
                <td>{ft.toLocaleString("en-US")} sq ft</td>
                <td>{(ft * 0.09290304).toLocaleString("en-US", { maximumFractionDigits: 2 })} m²</td>
                <td>{(ft / 9).toLocaleString("en-US", { maximumFractionDigits: 2 })} yd²</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Faq items={faq} />
      <RelatedTools exclude="/square-feet-to-square-meters" />
    </>
  );
}
