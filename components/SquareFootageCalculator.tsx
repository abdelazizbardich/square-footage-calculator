"use client";

import { useState } from "react";
import {
  LENGTH_LABELS,
  SHAPE_FIELDS,
  SHAPE_LABELS,
  convertArea,
  formatCurrency,
  formatNumber,
  shapeAreaSqFt,
  withWaste,
  type LengthUnit,
  type Shape,
} from "@/lib/area";
import { NumberField, parseNum } from "./NumberField";

type AreaRow = {
  id: number;
  name: string;
  shape: Shape;
  unit: LengthUnit;
  dims: Record<string, string>;
};

let nextId = 2;

function rowArea(row: AreaRow): number {
  const dims = Object.fromEntries(
    Object.entries(row.dims).map(([k, v]) => [k, parseNum(v)]),
  );
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
      { id, name: `Area ${rs.length + 1}`, shape: "rectangle", unit: rs.at(-1)?.unit ?? "ft", dims: {} },
    ]);
  };

  const total = rows.reduce((sum, r) => sum + rowArea(r), 0);
  const totalWithWaste = withWaste(total, parseNum(waste));
  const pricePerSqFt = parseNum(price);

  return (
    <div className="card calc">
      {rows.map((row) => (
        <div className="area-row" key={row.id}>
          <div className="area-row-head">
            <input
              aria-label="Area name"
              value={row.name}
              onChange={(e) => update(row.id, { name: e.target.value })}
              style={{ maxWidth: 220, fontWeight: 600 }}
            />
            <span className="row-area">{formatNumber(rowArea(row))} sq ft</span>
            {rows.length > 1 && (
              <button
                type="button"
                className="btn btn-ghost btn-small"
                onClick={() => setRows((rs) => rs.filter((r) => r.id !== row.id))}
              >
                Remove
              </button>
            )}
          </div>
          <div className="fields">
            <label>
              Shape
              <select
                value={row.shape}
                onChange={(e) => update(row.id, { shape: e.target.value as Shape, dims: {} })}
              >
                {(Object.keys(SHAPE_LABELS) as Shape[]).map((s) => (
                  <option key={s} value={s}>
                    {SHAPE_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Unit
              <select
                value={row.unit}
                onChange={(e) => update(row.id, { unit: e.target.value as LengthUnit })}
              >
                {(Object.keys(LENGTH_LABELS) as LengthUnit[]).map((u) => (
                  <option key={u} value={u}>
                    {LENGTH_LABELS[u]}
                  </option>
                ))}
              </select>
            </label>
            {SHAPE_FIELDS[row.shape].map((f) => (
              <NumberField
                key={f.key}
                label={`${f.label} (${row.unit})`}
                value={row.dims[f.key] ?? ""}
                onChange={(v) => update(row.id, { dims: { ...row.dims, [f.key]: v } })}
              />
            ))}
          </div>
        </div>
      ))}

      <div>
        <button type="button" className="btn btn-ghost" onClick={addRow}>
          + Add another area
        </button>
      </div>

      <div className="fields">
        <NumberField label="Waste / overage (%)" value={waste} onChange={setWaste} step="1" />
        <NumberField
          label="Price per sq ft ($, optional)"
          value={price}
          onChange={setPrice}
          placeholder="e.g. 3.50"
        />
      </div>

      <div className="results" aria-live="polite">
        <p className="results-main">{formatNumber(totalWithWaste)} sq ft</p>
        <div className="results-grid">
          <div>
            <span>Measured area</span>
            <strong>{formatNumber(total)} sq ft</strong>
          </div>
          <div>
            <span>Square meters</span>
            <strong>{formatNumber(convertArea(totalWithWaste, "sqft", "sqm"))} m²</strong>
          </div>
          <div>
            <span>Square yards</span>
            <strong>{formatNumber(convertArea(totalWithWaste, "sqft", "sqyd"))} yd²</strong>
          </div>
          <div>
            <span>Acres</span>
            <strong>{formatNumber(convertArea(totalWithWaste, "sqft", "acre"), 4)}</strong>
          </div>
          {pricePerSqFt > 0 && (
            <div>
              <span>Estimated cost</span>
              <strong>{formatCurrency(totalWithWaste * pricePerSqFt)}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
