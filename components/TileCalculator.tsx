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
import { NumberField, parseNum } from "./NumberField";

export function TileCalculator() {
  const [unit, setUnit] = useState<LengthUnit>("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileW, setTileW] = useState("12");
  const [tileL, setTileL] = useState("12");
  const [waste, setWaste] = useState("10");
  const [perBox, setPerBox] = useState("");
  const [pricePerTile, setPricePerTile] = useState("");

  const area = shapeAreaSqFt("rectangle", { length: parseNum(length), width: parseNum(width) }, unit);
  const tiles = tilesNeeded(area, parseNum(tileW), parseNum(tileL), parseNum(waste));
  const tilesPerBox = parseNum(perBox);
  const boxes = tilesPerBox > 0 ? Math.ceil(tiles / tilesPerBox) : 0;
  const price = parseNum(pricePerTile);

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
        <NumberField label={`Surface length (${unit})`} value={length} onChange={setLength} />
        <NumberField label={`Surface width (${unit})`} value={width} onChange={setWidth} />
      </div>
      <div className="fields">
        <NumberField label="Tile width (in)" value={tileW} onChange={setTileW} />
        <NumberField label="Tile length (in)" value={tileL} onChange={setTileL} />
        <NumberField label="Waste (%)" value={waste} onChange={setWaste} step="1" />
        <NumberField
          label="Tiles per box (optional)"
          value={perBox}
          onChange={setPerBox}
          step="1"
          placeholder="e.g. 10"
        />
        <NumberField
          label="Price per tile ($, optional)"
          value={pricePerTile}
          onChange={setPricePerTile}
          placeholder="e.g. 1.25"
        />
      </div>
      <div className="results" aria-live="polite">
        <p className="results-main">{formatNumber(tiles, 0)} tiles</p>
        <div className="results-grid">
          <div>
            <span>Surface area</span>
            <strong>{formatNumber(area)} sq ft</strong>
          </div>
          <div>
            <span>Tile size</span>
            <strong>
              {formatNumber(parseNum(tileW))}″ × {formatNumber(parseNum(tileL))}″
            </strong>
          </div>
          {boxes > 0 && (
            <div>
              <span>Boxes</span>
              <strong>{boxes}</strong>
            </div>
          )}
          {price > 0 && (
            <div>
              <span>Estimated cost</span>
              <strong>{formatCurrency(tiles * price)}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
