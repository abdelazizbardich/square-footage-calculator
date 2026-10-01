import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo-mark" aria-hidden>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
          <path d="M3.5 12h8.5V3.5M12 12v8.5" />
        </svg>
      </span>
      <span>
        SquareFootage<span className="logo-tld">.tools</span>
      </span>
    </Link>
  );
}
