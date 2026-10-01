import type { Metadata } from "next";
import Link from "next/link";
import { Faq, type FaqItem } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { SquareFootageCalculator } from "@/components/SquareFootageCalculator";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Square Footage Calculator — Free Sq Ft Calculator for Any Room" },
  description:
    "Free square footage calculator. Measure rectangles, L-shaped rooms, circles and triangles in feet, inches or meters, total multiple rooms, add waste and estimate cost.",
  alternates: { canonical: "/" },
};

const faq: FaqItem[] = [
  {
    q: "How do I calculate square footage?",
    a: "Multiply the length by the width, both measured in feet. A room 12 ft long and 10 ft wide is 12 × 10 = 120 square feet. For irregular rooms, split the space into rectangles, calculate each one, and add them together.",
  },
  {
    q: "How do I calculate square footage in inches?",
    a: "Multiply length × width in inches, then divide by 144 (the number of square inches in one square foot). For example, 144 in × 120 in = 17,280 sq in ÷ 144 = 120 sq ft. The calculator does this automatically when you choose inches.",
  },
  {
    q: "How do I calculate the square footage of an L-shaped room?",
    a: "Split the L into two rectangles that do not overlap. Calculate length × width for each and add the results. Choose the L-shape option above and enter both sections.",
  },
  {
    q: "How much extra material should I add for waste?",
    a: "Add 5–10% for straight layouts and 10–15% for diagonal, herringbone or rooms with many corners. Enter the percentage in the waste field to see the adjusted total.",
  },
  {
    q: "How many square feet are in a square meter?",
    a: "One square meter equals 10.764 square feet. One square foot equals 0.0929 square meters.",
  },
  {
    q: "Does square footage include closets and hallways?",
    a: "For flooring or paint estimates, measure every space that receives the material, including closets. For real-estate listings, finished living area usually excludes garages, unfinished basements and exterior spaces.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Square Footage Calculator",
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function Home() {
  return (
    <>
      <h1>Square Footage Calculator</h1>
      <p className="lead">
        Enter your room dimensions in feet, inches, yards or meters. Add as many areas as you need —
        the total updates instantly with square meters, square yards, acres and an optional cost
        estimate.
      </p>

      <SquareFootageCalculator />

      <h2>Square footage formulas by shape</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Shape</th>
              <th>Formula</th>
              <th>Example</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rectangle / square</td>
              <td>Length × Width</td>
              <td>12 ft × 10 ft</td>
              <td>120 sq ft</td>
            </tr>
            <tr>
              <td>Circle</td>
              <td>π × (Diameter ÷ 2)²</td>
              <td>10 ft diameter</td>
              <td>78.54 sq ft</td>
            </tr>
            <tr>
              <td>Triangle</td>
              <td>(Base × Height) ÷ 2</td>
              <td>10 ft × 6 ft</td>
              <td>30 sq ft</td>
            </tr>
            <tr>
              <td>Trapezoid</td>
              <td>((Side A + Side B) ÷ 2) × Height</td>
              <td>(8 + 12) ÷ 2 × 5 ft</td>
              <td>50 sq ft</td>
            </tr>
            <tr>
              <td>L-shape</td>
              <td>(L₁ × W₁) + (L₂ × W₂)</td>
              <td>(10 × 10) + (5 × 4)</td>
              <td>120 sq ft</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to measure a room for square footage</h2>
      <h3>1. Sketch the floor plan</h3>
      <p>
        Draw a rough outline and split any irregular space into rectangles, triangles or circles.
        Each piece becomes one row in the calculator.
      </p>
      <h3>2. Measure wall to wall</h3>
      <p>
        Use a tape measure or laser measure along the floor, from the base of one wall to the
        opposite wall. Round to the nearest inch. Measure in the same unit for every piece.
      </p>
      <h3>3. Add the pieces and include waste</h3>
      <p>
        The calculator sums every area. Add 5–10% waste for flooring, tile or sod so you do not
        run short on cuts. For a step-by-step walkthrough, read{" "}
        <Link href="/how-to-calculate-square-footage">how to calculate square footage</Link>.
      </p>

      <h2>Common room sizes in square feet</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Typical dimensions</th>
              <th>Square feet</th>
              <th>Square meters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Small bedroom</td>
              <td>10 × 10 ft</td>
              <td>100</td>
              <td>9.29</td>
            </tr>
            <tr>
              <td>Primary bedroom</td>
              <td>14 × 16 ft</td>
              <td>224</td>
              <td>20.81</td>
            </tr>
            <tr>
              <td>Living room</td>
              <td>16 × 20 ft</td>
              <td>320</td>
              <td>29.73</td>
            </tr>
            <tr>
              <td>Kitchen</td>
              <td>10 × 15 ft</td>
              <td>150</td>
              <td>13.94</td>
            </tr>
            <tr>
              <td>Bathroom</td>
              <td>5 × 8 ft</td>
              <td>40</td>
              <td>3.72</td>
            </tr>
            <tr>
              <td>Two-car garage</td>
              <td>20 × 20 ft</td>
              <td>400</td>
              <td>37.16</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Faq items={faq} />
      <RelatedTools exclude="/" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
    </>
  );
}
