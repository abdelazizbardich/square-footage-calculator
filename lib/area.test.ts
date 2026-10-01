import { describe, expect, it } from "vitest";
import {
  boxesNeeded,
  convertArea,
  shapeAreaSqFt,
  tilesNeeded,
  toFeet,
  withWaste,
} from "./area";

describe("shapeAreaSqFt", () => {
  it("rectangle in feet", () => {
    expect(shapeAreaSqFt("rectangle", { length: 12, width: 10 }, "ft")).toBe(120);
  });

  it("rectangle in inches", () => {
    expect(shapeAreaSqFt("rectangle", { length: 144, width: 120 }, "in")).toBeCloseTo(120);
  });

  it("rectangle in meters", () => {
    expect(shapeAreaSqFt("rectangle", { length: 1, width: 1 }, "m")).toBeCloseTo(10.7639, 3);
  });

  it("circle", () => {
    expect(shapeAreaSqFt("circle", { diameter: 10 }, "ft")).toBeCloseTo(78.54, 2);
  });

  it("triangle", () => {
    expect(shapeAreaSqFt("triangle", { base: 10, height: 6 }, "ft")).toBe(30);
  });

  it("trapezoid", () => {
    expect(shapeAreaSqFt("trapezoid", { sideA: 8, sideB: 12, height: 5 }, "ft")).toBe(50);
  });

  it("L-shape", () => {
    expect(
      shapeAreaSqFt("lshape", { length1: 10, width1: 10, length2: 5, width2: 4 }, "ft"),
    ).toBe(120);
  });

  it("treats missing and negative dimensions as zero", () => {
    expect(shapeAreaSqFt("rectangle", { length: 10 }, "ft")).toBe(0);
    expect(shapeAreaSqFt("rectangle", { length: -10, width: 5 }, "ft")).toBe(0);
  });
});

describe("conversions", () => {
  it("toFeet", () => {
    expect(toFeet(3, "yd")).toBe(9);
    expect(toFeet(24, "in")).toBe(2);
  });

  it("square feet to square meters", () => {
    expect(convertArea(100, "sqft", "sqm")).toBeCloseTo(9.2903, 4);
  });

  it("acres to square feet", () => {
    expect(convertArea(1, "acre", "sqft")).toBe(43560);
  });

  it("square yards to square feet", () => {
    expect(convertArea(2, "sqyd", "sqft")).toBe(18);
  });
});

describe("materials", () => {
  it("adds waste", () => {
    expect(withWaste(100, 10)).toBeCloseTo(110);
    expect(withWaste(100, -5)).toBe(100);
  });

  it("tiles needed for 12x12 tiles", () => {
    expect(tilesNeeded(100, 12, 12, 10)).toBe(110);
  });

  it("tiles round up", () => {
    expect(tilesNeeded(10, 12, 24, 0)).toBe(5);
    expect(tilesNeeded(10.1, 12, 24, 0)).toBe(6);
  });

  it("flooring boxes", () => {
    expect(boxesNeeded(200, 20, 10)).toBe(11);
    expect(boxesNeeded(0, 20, 10)).toBe(0);
  });
});
