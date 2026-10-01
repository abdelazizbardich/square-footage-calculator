export type Stat = { label: string; value: string; highlight?: boolean };

type Props = {
  label: string;
  value: string;
  unit: string;
  stats: Stat[];
  note?: string;
};

export function ResultPanel({ label, value, unit, stats, note }: Props) {
  return (
    <aside className="result-panel" aria-live="polite" aria-label="Results">
      <div>
        <p className="result-label">{label}</p>
        <p className="result-value">
          {value}
          <span className="result-unit">{unit}</span>
        </p>
      </div>
      <dl className="result-stats">
        {stats.map((s) => (
          <div key={s.label} className={s.highlight ? "is-highlight" : undefined}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="result-note">{note}</p>}
    </aside>
  );
}
