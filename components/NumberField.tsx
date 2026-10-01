"use client";

import { useId } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  placeholder?: string;
  step?: string;
};

export function NumberField({
  label,
  value,
  onChange,
  suffix,
  placeholder = "0",
  step = "any",
}: Props) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && (
          <span className="input-suffix" aria-hidden>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

type SelectProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Record<T, string>;
};

export function SelectField<T extends string>({ label, value, onChange, options }: SelectProps<T>) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {(Object.keys(options) as T[]).map((k) => (
          <option key={k} value={k}>
            {options[k]}
          </option>
        ))}
      </select>
    </div>
  );
}

export function parseNum(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}
