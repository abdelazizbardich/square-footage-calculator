export type LengthUnit = "ft" | "in" | "yd" | "m" | "cm";
export type AreaUnit = "sqft" | "sqm" | "sqyd" | "acre" | "sqin";
export type Shape = "rectangle" | "circle" | "triangle" | "trapezoid" | "lshape";

export const LENGTH_TO_FT: Record<LengthUnit, number> = {
  ft: 1,
  in: 1 / 12,
  yd: 3,
  m: 3.28084,
  cm: 0.0328084,
};

export const SQFT_PER: Record<AreaUnit, number> = {
  sqft: 1,
  sqm: 10.7639104,
  sqyd: 9,
  acre: 43560,
  sqin: 1 / 144,
};

export const LENGTH_LABELS: Record<LengthUnit, string> = {
  ft: "feet",
  in: "inches",
  yd: "yards",
  m: "meters",
  cm: "centimeters",
};

export const AREA_LABELS: Record<AreaUnit, string> = {
  sqft: "sq ft",
  sqm: "sq m",
  sqyd: "sq yd",
  acre: "acres",
  sqin: "sq in",
};

export const SHAPE_FIELDS: Record<Shape, { key: string; label: string }[]> = {
  rectangle: [
    { key: "length", label: "Length" },
    { key: "width", label: "Width" },
  ],
  circle: [{ key: "diameter", label: "Diameter" }],
  triangle: [
    { key: "base", label: "Base" },
    { key: "height", label: "Height" },
  ],
  trapezoid: [
    { key: "sideA", label: "Top side" },
    { key: "sideB", label: "Bottom side" },
    { key: "height", label: "Height" },
  ],
  lshape: [
    { key: "length1", label: "Section 1 length" },
    { key: "width1", label: "Section 1 width" },
    { key: "length2", label: "Section 2 length" },
    { key: "width2", label: "Section 2 width" },
  ],
};

export const SHAPE_LABELS: Record<Shape, string> = {
  rectangle: "Rectangle / square",
  circle: "Circle",
  triangle: "Triangle",
  trapezoid: "Trapezoid",
  lshape: "L-shape (two rectangles)",
};

export function toFeet(value: number, unit: LengthUnit): number {
  return value * LENGTH_TO_FT[unit];
}

/** Area of a shape in square feet. Dimensions are in `unit`; missing or negative values count as 0. */
export function shapeAreaSqFt(
  shape: Shape,
  dims: Record<string, number>,
  unit: LengthUnit,
): number {
  const d = (key: string) => {
    const v = dims[key];
    return Number.isFinite(v) && v > 0 ? toFeet(v, unit) : 0;
  };
  switch (shape) {
    case "rectangle":
      return d("length") * d("width");
    case "circle":
      return Math.PI * (d("diameter") / 2) ** 2;
    case "triangle":
      return (d("base") * d("height")) / 2;
    case "trapezoid":
      return ((d("sideA") + d("sideB")) / 2) * d("height");
    case "lshape":
      return d("length1") * d("width1") + d("length2") * d("width2");
  }
}

export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  return (value * SQFT_PER[from]) / SQFT_PER[to];
}

export function withWaste(areaSqFt: number, wastePct: number): number {
  return areaSqFt * (1 + Math.max(0, wastePct) / 100);
}

/** Number of tiles needed (rounded up) for an area, including waste. Tile sides in inches. */
export function tilesNeeded(
  areaSqFt: number,
  tileWidthIn: number,
  tileLengthIn: number,
  wastePct: number,
): number {
  if (tileWidthIn <= 0 || tileLengthIn <= 0 || areaSqFt <= 0) return 0;
  const tileSqFt = (tileWidthIn * tileLengthIn) / 144;
  return Math.ceil(withWaste(areaSqFt, wastePct) / tileSqFt - 1e-9);
}

/** Number of flooring boxes (rounded up) for an area, including waste. */
export function boxesNeeded(areaSqFt: number, sqFtPerBox: number, wastePct: number): number {
  if (sqFtPerBox <= 0 || areaSqFt <= 0) return 0;
  return Math.ceil(withWaste(areaSqFt, wastePct) / sqFtPerBox - 1e-9);
}

export function formatNumber(value: number, maxDecimals = 2): string {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("en-US", { maximumFractionDigits: maxDecimals });
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
