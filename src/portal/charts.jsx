/** Lightweight SVG charts — no chart library dependency */

export function Sparkline({ data = [], width = 120, height = 36, stroke = 'var(--forest)' }) {
  if (!data.length) return null;
  const values = data.map((d) => d.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1 || 1)) * width;
      const y = height - ((v - min) / span) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg className="pc-spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={pts} />
    </svg>
  );
}

export function AreaChart({
  data = [],
  width = 560,
  height = 180,
  stroke = 'var(--forest)',
  fill = 'rgba(45, 90, 61, 0.14)',
  formatY = (v) => String(v),
}) {
  if (!data.length) return null;
  const pad = { t: 12, r: 12, b: 28, l: 36 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const values = data.map((d) => d.v);
  const min = Math.min(...values) * 0.98;
  const max = Math.max(...values) * 1.02;
  const span = max - min || 1;
  const xy = values.map((v, i) => {
    const x = pad.l + (i / (values.length - 1 || 1)) * w;
    const y = pad.t + h - ((v - min) / span) * h;
    return [x, y];
  });
  const line = xy.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `${pad.l},${pad.t + h} ${line} ${pad.l + w},${pad.t + h}`;
  const yTicks = [min, (min + max) / 2, max];

  return (
    <svg className="pc-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend chart">
      {yTicks.map((t) => {
        const y = pad.t + h - ((t - min) / span) * h;
        return (
          <g key={t}>
            <line x1={pad.l} x2={pad.l + w} y1={y} y2={y} stroke="rgba(31,26,22,0.08)" />
            <text x={pad.l - 8} y={y + 4} textAnchor="end" className="pc-chart__tick">
              {formatY(Math.round(t * 10) / 10)}
            </text>
          </g>
        );
      })}
      <polygon points={area} fill={fill} />
      <polyline points={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={xy[xy.length - 1][0]} cy={xy[xy.length - 1][1]} r="4" fill={stroke} />
    </svg>
  );
}

export function DualLineChart({
  data = [],
  width = 560,
  height = 180,
  aKey = 'v',
  bKey = 'diastolic',
  aLabel = 'Systolic',
  bLabel = 'Diastolic',
}) {
  if (!data.length) return null;
  const pad = { t: 16, r: 12, b: 28, l: 36 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const all = data.flatMap((d) => [d[aKey], d[bKey]]);
  const min = Math.min(...all) - 4;
  const max = Math.max(...all) + 4;
  const span = max - min || 1;
  const path = (key, color) => {
    const pts = data
      .map((d, i) => {
        const x = pad.l + (i / (data.length - 1 || 1)) * w;
        const y = pad.t + h - ((d[key] - min) / span) * h;
        return `${x},${y}`;
      })
      .join(' ');
    return <polyline key={key} points={pts} fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />;
  };
  return (
    <div className="pc-chart-wrap">
      <svg className="pc-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Blood pressure chart">
        {path(aKey, 'var(--forest)')}
        {path(bKey, 'var(--terracotta)')}
      </svg>
      <div className="pc-legend">
        <span><i style={{ background: 'var(--forest)' }} />{aLabel}</span>
        <span><i style={{ background: 'var(--terracotta)' }} />{bLabel}</span>
      </div>
    </div>
  );
}

export function ProgressRing({ value = 0, size = 88, stroke = 8, color = 'var(--forest)' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <svg className="pc-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(31,26,22,0.08)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="pc-ring__val">
        {value}
      </text>
    </svg>
  );
}

export function BarRow({ label, value, max = 100, tone = 'teal' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="pc-bar-row">
      <div className="pc-bar-row__meta">
        <span>{label}</span>
        <strong>{value}{typeof max === 'number' && max === 100 ? '%' : ''}</strong>
      </div>
      <div className="pc-bar-row__track">
        <div className={`pc-bar-row__fill pc-bar-row__fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
