import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Outfit, Work_Sans } from "next/font/google";
import { Logo } from "@/components/Logo";
import { MainNav } from "@/components/MainNav";
import { NAV, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });

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
  themeColor: "#1e3a5f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${workSans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to calculator
        </a>
        <header className="site-header">
          <div className="container header-inner">
            <Logo />
            <MainNav />
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <Logo />
                <p>
                  Free calculators for measuring rooms and estimating flooring, tile and other
                  materials. Everything runs in your browser — nothing is uploaded or stored.
                </p>
              </div>
              <nav aria-label="Footer">
                <ul className="footer-links">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <p className="footer-bottom">
              © {new Date().getFullYear()} {SITE_NAME}. Results are estimates — confirm measurements
              before ordering materials.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
