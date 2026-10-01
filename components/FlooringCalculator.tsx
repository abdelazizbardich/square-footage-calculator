"use client";

import { useState } from "react";
import {
  LENGTH_LABELS,
  boxesNeeded,
  formatCurrency,
  formatNumber,
  shapeAreaSqFt,
  withWaste,
  type LengthUnit,
} from "@/lib/area";
import { NumberField, parseNum } from "./NumberField";

export function FlooringCalculator() {
  const [unit, setUnit] = useState<LengthUnit>("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [perBox, setPerBox] = useState("20");
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("");

  const area = shapeAreaSqFt("rectangle", { length: parseNum(length), width: parseNum(width) }, unit);
  const wastePct = parseNum(waste);
  const needed = withWaste(area, wastePct);
  const boxes = boxesNeeded(area, parseNum(perBox), wastePct);
  const purchased = boxes * parseNum(perBox);
  const pricePerSqFt = parseNum(price);

  return (
    <div className="card calc">
      <div className="fields">
        <label>
          Unit
          <select value={unit} onChange={(e) => setUnit(e.target.value as LengthUnit)}>
            {(Object.keys(LENGTH_LABELS) as LengthUnit[]).map((u) => (
              <option key={u} value={u}>
                {LENGTH_LABELS[u]}
              </option>
            ))}
          </select>
        </label>
        <NumberField label={`Room length (${unit})`} value={length} onChange={setLength} />
        <NumberField label={`Room width (${unit})`} value={width} onChange={setWidth} />
      </div>
      <div className="fields">
        <NumberField label="Sq ft per box" value={perBox} onChange={setPerBox} />
        <NumberField label="Waste (%)" value={waste} onChange={setWaste} step="1" />
        <NumberField
          label="Price per sq ft ($, optional)"
          value={price}
          onChange={setPrice}
          placeholder="e.g. 2.99"
        />
      </div>
      <div className="results" aria-live="polite">
        <p className="results-main">{boxes} boxes</p>
        <div className="results-grid">
          <div>
            <span>Room area</span>
            <strong>{formatNumber(area)} sq ft</strong>
          </div>
          <div>
            <span>Needed with waste</span>
            <strong>{formatNumber(needed)} sq ft</strong>
          </div>
          <div>
            <span>Flooring purchased</span>
            <strong>{formatNumber(purchased)} sq ft</strong>
          </div>
          {pricePerSqFt > 0 && (
            <div>
              <span>Estimated cost</span>
              <strong>{formatCurrency(purchased * pricePerSqFt)}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
