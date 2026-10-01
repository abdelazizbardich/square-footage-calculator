export const SITE_NAME = "SquareFootage.tools";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const NAV = [
  { href: "/", label: "Square Footage" },
  { href: "/flooring-calculator", label: "Flooring" },
  { href: "/tile-calculator", label: "Tile" },
  { href: "/square-feet-to-square-meters", label: "Sq Ft to Sq M" },
  { href: "/how-to-calculate-square-footage", label: "How-To Guide" },
] as const;
