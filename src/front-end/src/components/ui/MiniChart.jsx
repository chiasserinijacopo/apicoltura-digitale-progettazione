export default function MiniChart({ points = [5, 20, 12, 28, 18, 35], height = 90 }) {
  const w = 240;
  const h = height;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const safeRange = max - min || 1;

  const stepX = w / (points.length - 1);

  const coords = points.map((v, i) => {
    const x = i * stepX;
    const y = h - ((v - min) / safeRange) * (h - 10) - 5;
    return [x, y];
  });

  const line = coords.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;

  return (
    <svg className="chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopOpacity="0.35" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polyline className="chartArea" points={area} />
      <polyline className="chartLine" points={line} />

      {coords.map(([x, y], idx) => (
        <circle key={idx} className="chartDot" cx={x} cy={y} r={idx === coords.length - 1 ? 2.8 : 2.2} />
      ))}
    </svg>
  );
}
