"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowsLeftRight,
  BookOpenText,
  GridFour,
  Package,
  Ruler,
  type Icon,
} from "@phosphor-icons/react";
import { NAV } from "@/lib/site";

const ICONS: Record<(typeof NAV)[number]["href"], Icon> = {
  "/": Ruler,
  "/flooring-calculator": Package,
  "/tile-calculator": GridFour,
  "/square-feet-to-square-meters": ArrowsLeftRight,
  "/how-to-calculate-square-footage": BookOpenText,
};

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="nav">
        {NAV.map((item) => {
          const ItemIcon = ICONS[item.href];
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                <ItemIcon size={18} aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
