import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { NAV, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Square Footage Calculator — Free Sq Ft Calculator for Any Room",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free square footage calculator. Measure rooms, L-shapes, circles and triangles in feet, inches or meters, add multiple areas, and estimate material cost.",
  openGraph: { siteName: SITE_NAME, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="logo">
              <span className="logo-mark" aria-hidden>
                ▦
              </span>
              {SITE_NAME}
            </Link>
            <nav aria-label="Main">
              <ul className="nav">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <nav aria-label="Footer">
              <ul className="footer-links">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p>
              © {new Date().getFullYear()} {SITE_NAME}. Results are estimates — confirm
              measurements before ordering materials.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
