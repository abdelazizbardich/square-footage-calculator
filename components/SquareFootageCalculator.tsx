"use client";

import { useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import {
  LENGTH_LABELS,
  SHAPE_FIELDS,
  convertArea,
  formatCurrency,
  formatNumber,
  shapeAreaSqFt,
  withWaste,
  type LengthUnit,
  type Shape,
} from "@/lib/area";
import { NumberField, SelectField, parseNum } from "./NumberField";
import { ResultPanel, type Stat } from "./ResultPanel";
import { ShapeIcon } from "./ShapeIcon";

const SHAPES: { value: Shape; label: string }[] = [
  { value: "rectangle", label: "Rectangle" },
  { value: "lshape", label: "L-shape" },
  { value: "circle", label: "Circle" },
  { value: "triangle", label: "Triangle" },
  { value: "trapezoid", label: "Trapezoid" },
];

type AreaRow = {
  id: number;
  name: string;
  shape: Shape;
  unit: LengthUnit;
  dims: Record<string, string>;
};

let nextId = 2;

function rowArea(row: AreaRow): number {
  const dims = Object.fromEntries(Object.entries(row.dims).map(([k, v]) => [k, parseNum(v)]));
  return shapeAreaSqFt(row.shape, dims, row.unit);
}

export function SquareFootageCalculator() {
  const [rows, setRows] = useState<AreaRow[]>([
    { id: 1, name: "Area 1", shape: "rectangle", unit: "ft", dims: {} },
  ]);
  const [waste, setWaste] = useState("0");
  const [price, setPrice] = useState("");

  const update = (id: number, patch: Partial<AreaRow>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addRow = () => {
    const id = nextId++;
    setRows((rs) => [
      ...rs,
      {
        id,
        name: `Area ${rs.length + 1}`,
        shape: "rectangle",
        unit: rs.at(-1)?.unit ?? "ft",
        dims: {},
      },
    ]);
  };

  const total = rows.reduce((sum, r) => sum + rowArea(r), 0);
  const wastePct = parseNum(waste);
  const totalWithWaste = withWaste(total, wastePct);
  const pricePerSqFt = parseNum(price);

  const stats: Stat[] = [
    {
      label: "Square meters",
      value: `${formatNumber(convertArea(totalWithWaste, "sqft", "sqm"))} m²`,
    },
    {
      label: "Square yards",
      value: `${formatNumber(convertArea(totalWithWaste, "sqft", "sqyd"))} yd²`,
    },
    { label: "Acres", value: formatNumber(convertArea(totalWithWaste, "sqft", "acre"), 4) },
  ];
  if (wastePct > 0)
    stats.unshift({ label: "Measured area", value: `${formatNumber(total)} sq ft` });
  if (pricePerSqFt > 0) {
    stats.push({
      label: "Estimated cost",
      value: formatCurrency(totalWithWaste * pricePerSqFt),
      highlight: true,
    });
  }

  return (
    <div className="calc-layout">
      <div className="calc-inputs">
        {rows.map((row) => (
          <fieldset className="area-row" key={row.id}>
            <legend className="sr-only">{row.name}</legend>
            <div className="area-row-head">
              <input
                className="area-name"
                aria-label="Area name"
                value={row.name}
                onChange={(e) => update(row.id, { name: e.target.value })}
              />
              <span className="row-area">{formatNumber(rowArea(row))} sq ft</span>
              {rows.length > 1 && (
                <button
                  type="button"
                  className="btn btn-icon"
                  aria-label={`Remove ${row.name}`}
                  onClick={() => setRows((rs) => rs.filter((r) => r.id !== row.id))}
                >
                  <Trash size={18} aria-hidden />
                </button>
              )}
            </div>

            <div className="shape-picker" role="radiogroup" aria-label={`${row.name} shape`}>
              {SHAPES.map((s) => (
                <label className="shape-option" key={s.value}>
                  <input
                    type="radio"
                    name={`shape-${row.id}`}
                    value={s.value}
                    checked={row.shape === s.value}
                    onChange={() => update(row.id, { shape: s.value, dims: {} })}
                  />
                  <span>
                    <ShapeIcon shape={s.value} />
                    {s.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="fields">
              {SHAPE_FIELDS[row.shape].map((f) => (
                <NumberField
                  key={f.key}
                  label={f.label}
                  suffix={row.unit}
                  value={row.dims[f.key] ?? ""}
                  onChange={(v) => update(row.id, { dims: { ...row.dims, [f.key]: v } })}
                />
              ))}
              <SelectField
                label="Unit"
                value={row.unit}
                onChange={(unit) => update(row.id, { unit })}
                options={LENGTH_LABELS}
              />
            </div>
          </fieldset>
        ))}

        <button type="button" className="btn btn-outline" onClick={addRow}>
          <Plus size={18} aria-hidden />
          Add another area
        </button>

        <fieldset className="fieldset">
          <legend className="fieldset-title">Materials &amp; cost (optional)</legend>
          <div className="fields">
            <NumberField
              label="Waste / overage"
              suffix="%"
              value={waste}
              onChange={setWaste}
              step="1"
            />
            <NumberField
              label="Price per sq ft"
              suffix="$"
              value={price}
              onChange={setPrice}
              placeholder="3.50"
            />
          </div>
        </fieldset>
      </div>

      <ResultPanel
        label={wastePct > 0 ? `Total area + ${formatNumber(wastePct)}% waste` : "Total area"}
        value={formatNumber(totalWithWaste)}
        unit="sq ft"
        stats={stats}
        note={rows.length > 1 ? `Sum of ${rows.length} areas.` : undefined}
      />
    </div>
  );
}
