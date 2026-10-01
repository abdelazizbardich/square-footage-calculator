"use client";

import { useState } from "react";
import { AREA_LABELS, convertArea, formatNumber, type AreaUnit } from "@/lib/area";
import { NumberField, SelectField, parseNum } from "./NumberField";
import { ResultPanel } from "./ResultPanel";

const UNITS = Object.keys(AREA_LABELS) as AreaUnit[];

export function AreaConverter() {
  const [value, setValue] = useState("100");
  const [from, setFrom] = useState<AreaUnit>("sqft");
  const amount = parseNum(value);
  const primary: AreaUnit = from === "sqm" ? "sqft" : "sqm";

  return (
    <div className="calc-layout">
      <div className="calc-inputs">
        <fieldset className="fieldset">
          <legend className="fieldset-title">Convert</legend>
          <div className="fields">
            <NumberField
              label="Area"
              suffix={AREA_LABELS[from]}
              value={value}
              onChange={setValue}
            />
            <SelectField label="From unit" value={from} onChange={setFrom} options={AREA_LABELS} />
          </div>
        </fieldset>
      </div>
      <ResultPanel
        label={`${formatNumber(amount, 4)} ${AREA_LABELS[from]} equals`}
        value={formatNumber(convertArea(amount, from, primary), 4)}
        unit={AREA_LABELS[primary]}
        stats={UNITS.filter((u) => u !== from && u !== primary).map((u) => ({
          label: AREA_LABELS[u],
          value: formatNumber(convertArea(amount, from, u), u === "acre" ? 6 : 4),
        }))}
      />
    </div>
  );
}
