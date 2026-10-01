"use client";

import { useState } from "react";
import { AREA_LABELS, convertArea, formatNumber, type AreaUnit } from "@/lib/area";
import { NumberField, parseNum } from "./NumberField";

const UNITS = Object.keys(AREA_LABELS) as AreaUnit[];

export function AreaConverter() {
  const [value, setValue] = useState("100");
  const [from, setFrom] = useState<AreaUnit>("sqft");
  const amount = parseNum(value);

  return (
    <div className="card calc">
      <div className="fields">
        <NumberField label="Area" value={value} onChange={setValue} />
        <label>
          From
          <select value={from} onChange={(e) => setFrom(e.target.value as AreaUnit)}>
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {AREA_LABELS[u]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="results" aria-live="polite">
        <p className="results-main">
          {formatNumber(convertArea(amount, from, from === "sqm" ? "sqft" : "sqm"), 4)}{" "}
          {from === "sqm" ? "sq ft" : "sq m"}
        </p>
        <div className="results-grid">
          {UNITS.filter((u) => u !== from).map((u) => (
            <div key={u}>
              <span>{AREA_LABELS[u]}</span>
              <strong>{formatNumber(convertArea(amount, from, u), u === "acre" ? 6 : 4)}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
