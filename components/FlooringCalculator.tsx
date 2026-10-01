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
import { NumberField, SelectField, parseNum } from "./NumberField";
import { ResultPanel, type Stat } from "./ResultPanel";

export function FlooringCalculator() {
  const [unit, setUnit] = useState<LengthUnit>("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [perBox, setPerBox] = useState("20");
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("");

  const area = shapeAreaSqFt(
    "rectangle",
    { length: parseNum(length), width: parseNum(width) },
    unit,
  );
  const wastePct = parseNum(waste);
  const boxes = boxesNeeded(area, parseNum(perBox), wastePct);
  const purchased = boxes * parseNum(perBox);
  const pricePerSqFt = parseNum(price);

  const stats: Stat[] = [
    { label: "Room area", value: `${formatNumber(area)} sq ft` },
    {
      label: `Needed with ${formatNumber(wastePct)}% waste`,
      value: `${formatNumber(withWaste(area, wastePct))} sq ft`,
    },
    { label: "Flooring purchased", value: `${formatNumber(purchased)} sq ft` },
  ];
  if (pricePerSqFt > 0) {
    stats.push({
      label: "Estimated cost",
      value: formatCurrency(purchased * pricePerSqFt),
      highlight: true,
    });
  }

  return (
    <div className="calc-layout">
      <div className="calc-inputs">
        <fieldset className="fieldset">
          <legend className="fieldset-title">Room size</legend>
          <div className="fields">
            <NumberField label="Length" suffix={unit} value={length} onChange={setLength} />
            <NumberField label="Width" suffix={unit} value={width} onChange={setWidth} />
            <SelectField label="Unit" value={unit} onChange={setUnit} options={LENGTH_LABELS} />
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-title">Flooring</legend>
          <div className="fields">
            <NumberField
              label="Coverage per box"
              suffix="ft²"
              value={perBox}
              onChange={setPerBox}
            />
            <NumberField label="Waste" suffix="%" value={waste} onChange={setWaste} step="1" />
            <NumberField
              label="Price per sq ft"
              suffix="$"
              value={price}
              onChange={setPrice}
              placeholder="2.99"
            />
          </div>
        </fieldset>
      </div>
      <ResultPanel
        label="Boxes to buy"
        value={String(boxes)}
        unit={boxes === 1 ? "box" : "boxes"}
        stats={stats}
        note="Keep one spare box for future repairs."
      />
    </div>
  );
}
