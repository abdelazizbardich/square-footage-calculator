import type { Metadata } from "next";
import Link from "next/link";
import { Faq, type FaqItem } from "@/components/Faq";
import { FlooringCalculator } from "@/components/FlooringCalculator";
import { PageHero } from "@/components/PageHero";
import { RelatedTools } from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "Flooring Calculator — How Many Boxes of Flooring Do I Need?",
  description:
    "Free flooring calculator for laminate, vinyl plank, hardwood and engineered wood. Get square footage, boxes needed with waste, and total cost.",
  alternates: { canonical: "/flooring-calculator" },
};

const faq: FaqItem[] = [
  {
    q: "How many boxes of flooring do I need?",
    a: "Divide the room's square footage (plus waste) by the square feet per box printed on the carton, then round up. A 200 sq ft room with 10% waste needs 220 sq ft; at 20 sq ft per box that is 11 boxes.",
  },
  {
    q: "How much waste should I add for laminate or vinyl plank?",
    a: "Add 10% for a straight lay in a regular room. Use 12–15% for diagonal layouts, herringbone, or rooms with many doorways and corners.",
  },
  {
    q: "Should I buy an extra box of flooring?",
    a: "Yes. Keep at least one unopened box for future repairs — dye lots change, and matching flooring years later is difficult.",
  },
  {
    q: "Do I measure under cabinets and appliances?",
    a: "Floating floors (laminate, click vinyl) normally stop at cabinets, so exclude them. Include space under freestanding appliances like refrigerators and ranges.",
  },
];

export default function FlooringPage() {
  return (
    <>
      <PageHero
        eyebrow="Laminate · Vinyl · Hardwood"
        title="Flooring Calculator"
        lead="Enter the room size and the coverage per box from the carton. You get the boxes to buy, the total square footage purchased, and the cost."
      />

      <div className="container tool-shell">
        <FlooringCalculator />
      </div>

      <div className="container content">
        <section>
          <h2>Recommended waste by flooring type</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Flooring</th>
                  <th>Typical sq ft per box</th>
                  <th>Straight lay waste</th>
                  <th>Diagonal / pattern waste</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Laminate</td>
                  <td>18–25</td>
                  <td>10%</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>Luxury vinyl plank</td>
                  <td>20–30</td>
                  <td>10%</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>Solid hardwood</td>
                  <td>18–24</td>
                  <td>10%</td>
                  <td>15–20%</td>
                </tr>
                <tr>
                  <td>Engineered wood</td>
                  <td>20–30</td>
                  <td>8–10%</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>Carpet tiles</td>
                  <td>20–50</td>
                  <td>5%</td>
                  <td>10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="prose">
          <h2>How to estimate flooring for multiple rooms</h2>
          <h3>Measure each room separately</h3>
          <p>
            Get length × width for every room, then add them. Use the{" "}
            <Link href="/">square footage calculator</Link> to total several rooms or L-shaped
            spaces, and enter the total here as one room (for example, length = total, width = 1).
          </p>
          <h3>Check the flooring direction</h3>
          <p>
            Planks running continuously through doorways reduce transition strips but increase cuts.
            Lean toward the higher waste figure when rooms connect.
          </p>
        </section>

        <Faq items={faq} />
        <RelatedTools exclude="/flooring-calculator" />
      </div>
    </>
  );
}
