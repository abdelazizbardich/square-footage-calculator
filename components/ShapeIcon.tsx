import type { Shape } from "@/lib/area";

const PATHS: Record<Shape, React.ReactNode> = {
  rectangle: <rect x="3" y="6" width="18" height="12" rx="1" />,
  circle: <circle cx="12" cy="12" r="8" />,
  triangle: <path d="M12 4 21 19H3Z" />,
  trapezoid: <path d="M7 6h10l4 12H3Z" />,
  lshape: <path d="M4 4h7v9h9v7H4Z" />,
};

export function ShapeIcon({ shape }: { shape: Shape }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[shape]}
    </svg>
  );
}
