"use client";

import { useState } from "react";
import {
  LENGTH_LABELS,
  formatCurrency,
  formatNumber,
  shapeAreaSqFt,
  tilesNeeded,
  type LengthUnit,
} from "@/lib/area";
import { NumberField, SelectField, parseNum } from "./NumberField";
import { ResultPanel, type Stat } from "./ResultPanel";

export function TileCalculator() {
  const [unit, setUnit] = useState<LengthUnit>("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileW, setTileW] = useState("12");
  const [tileL, setTileL] = useState("12");
  const [waste, setWaste] = useState("10");
  const [perBox, setPerBox] = useState("");
  const [pricePerTile, setPricePerTile] = useState("");

  const area = shapeAreaSqFt(
    "rectangle",
    { length: parseNum(length), width: parseNum(width) },
    unit,
  );
  const tiles = tilesNeeded(area, parseNum(tileW), parseNum(tileL), parseNum(waste));
  const tilesPerBox = parseNum(perBox);
  const boxes = tilesPerBox > 0 ? Math.ceil(tiles / tilesPerBox) : 0;
  const price = parseNum(pricePerTile);

  const stats: Stat[] = [
    { label: "Surface area", value: `${formatNumber(area)} sq ft` },
    {
      label: "Tile size",
      value: `${formatNumber(parseNum(tileW))}″ × ${formatNumber(parseNum(tileL))}″`,
    },
  ];
  if (boxes > 0) stats.push({ label: "Boxes", value: String(boxes) });
  if (price > 0) {
    stats.push({ label: "Estimated cost", value: formatCurrency(tiles * price), highlight: true });
  }

  return (
    <div className="calc-layout">
      <div className="calc-inputs">
        <fieldset className="fieldset">
          <legend className="fieldset-title">Surface size</legend>
          <div className="fields">
            <NumberField label="Length" suffix={unit} value={length} onChange={setLength} />
            <NumberField label="Width" suffix={unit} value={width} onChange={setWidth} />
            <SelectField label="Unit" value={unit} onChange={setUnit} options={LENGTH_LABELS} />
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-title">Tile</legend>
          <div className="fields">
            <NumberField label="Tile width" suffix="in" value={tileW} onChange={setTileW} />
            <NumberField label="Tile length" suffix="in" value={tileL} onChange={setTileL} />
            <NumberField label="Waste" suffix="%" value={waste} onChange={setWaste} step="1" />
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-title">Boxes &amp; cost (optional)</legend>
          <div className="fields">
            <NumberField
              label="Tiles per box"
              value={perBox}
              onChange={setPerBox}
              step="1"
              placeholder="10"
            />
            <NumberField
              label="Price per tile"
              suffix="$"
              value={pricePerTile}
              onChange={setPricePerTile}
              placeholder="1.25"
            />
          </div>
        </fieldset>
      </div>
      <ResultPanel
        label={`Tiles needed (incl. ${formatNumber(parseNum(waste))}% waste)`}
        value={formatNumber(tiles, 0)}
        unit={tiles === 1 ? "tile" : "tiles"}
        stats={stats}
      />
    </div>
  );
}
