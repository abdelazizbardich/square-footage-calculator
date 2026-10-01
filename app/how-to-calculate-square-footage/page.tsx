import type { Metadata } from "next";
import Link from "next/link";
import { Faq, type FaqItem } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { RelatedTools } from "@/components/RelatedTools";
import { SquareFootageCalculator } from "@/components/SquareFootageCalculator";

export const metadata: Metadata = {
  title: "How to Calculate Square Footage (Formulas + Examples)",
  description:
    "Step-by-step guide to calculating square footage for rectangles, L-shaped rooms, circles, triangles and whole houses, with worked examples.",
  alternates: { canonical: "/how-to-calculate-square-footage" },
};

const faq: FaqItem[] = [
  {
    q: "What is the formula for square footage?",
    a: "Square footage = length (ft) × width (ft) for any rectangle or square. Other shapes use their own area formulas, and irregular spaces are split into simple shapes and added together.",
  },
  {
    q: "How do I calculate the square footage of a house?",
    a: "Measure each room and hallway, calculate length × width for each, and add them. Real-estate square footage usually counts only finished, heated living space and excludes garages and unfinished basements.",
  },
  {
    q: "How do I convert feet and inches to decimal feet?",
    a: "Divide the inches by 12 and add to the feet. 10 ft 6 in = 10 + 6/12 = 10.5 ft.",
  },
  {
    q: "How do I find square footage if I only know the perimeter?",
    a: "You can't get an exact area from perimeter alone unless the room is a perfect square. For a square, divide the perimeter by 4 to get a side, then multiply the side by itself.",
  },
];

export default function GuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Guide"
        title="How to Calculate Square Footage"
        lead="Square footage is length × width in feet. Below are the formulas for every common shape, worked examples, and how to handle irregular rooms."
        badges={["Formulas for 5 shapes", "Worked examples", "Built-in calculator"]}
      />

      <div className="container tool-shell">
        <div className="intro-card">
          <section className="prose">
            <h2>The basic formula</h2>
            <p className="formula">Square feet = Length (ft) × Width (ft)</p>
            <p>
              A bedroom 12 ft long and 11 ft wide: 12 × 11 = <strong>132 sq ft</strong>.
            </p>
          </section>
        </div>
      </div>

      <div className="container content">
        <section>
          <h2>Step-by-step: measuring a room</h2>
          <ol className="steps">
            <li>
              <h3>Measure length and width</h3>
              <p>
                Measure along the floor from wall to wall. Record feet and inches, e.g. 12 ft 4 in.
              </p>
            </li>
            <li>
              <h3>Convert to decimal feet</h3>
              <p>
                Divide inches by 12: 12 ft 4 in = 12 + 4/12 = 12.33 ft. Or measure in inches and
                divide the final result by 144.
              </p>
            </li>
            <li>
              <h3>Multiply</h3>
              <p>12.33 ft × 10.5 ft = 129.5 sq ft.</p>
            </li>
            <li>
              <h3>Add waste for materials</h3>
              <p>Multiply by 1.10 to add 10% for cuts: 129.5 × 1.10 = 142.4 sq ft to buy.</p>
            </li>
          </ol>
        </section>

        <section>
          <h2>Formulas for other shapes</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Shape</th>
                  <th>Formula</th>
                  <th>Worked example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Square</td>
                  <td>Side × Side</td>
                  <td>15 × 15 = 225 sq ft</td>
                </tr>
                <tr>
                  <td>Rectangle</td>
                  <td>Length × Width</td>
                  <td>20 × 14 = 280 sq ft</td>
                </tr>
                <tr>
                  <td>Triangle</td>
                  <td>½ × Base × Height</td>
                  <td>½ × 12 × 8 = 48 sq ft</td>
                </tr>
                <tr>
                  <td>Circle</td>
                  <td>π × Radius²</td>
                  <td>3.1416 × 6² = 113.1 sq ft</td>
                </tr>
                <tr>
                  <td>Trapezoid</td>
                  <td>½ × (Side A + Side B) × Height</td>
                  <td>½ × (10 + 16) × 9 = 117 sq ft</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="prose">
          <h2>Irregular and L-shaped rooms</h2>
          <p>
            Divide the room into rectangles that don&apos;t overlap. An L-shaped living room with
            one section 18 × 12 ft and another 10 × 8 ft: (18 × 12) + (10 × 8) = 216 + 80 ={" "}
            <strong>296 sq ft</strong>.
          </p>
          <p>
            For a bay window or curved wall, measure the main rectangle first, then add the bump-out
            as a trapezoid or half circle.
          </p>
        </section>

        <section>
          <h2>Try it: calculate your space</h2>
          <SquareFootageCalculator />
          <p className="lead" style={{ marginTop: "var(--space-6)" }}>
            Ordering materials? Use the <Link href="/flooring-calculator">flooring calculator</Link>{" "}
            or the <Link href="/tile-calculator">tile calculator</Link> to turn square footage into
            boxes.
          </p>
        </section>

        <Faq items={faq} />
        <RelatedTools exclude="/how-to-calculate-square-footage" />
      </div>
    </>
  );
}
