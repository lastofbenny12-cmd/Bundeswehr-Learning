import type { Rank } from "@/lib/data/ranks";
import { cn } from "@/lib/utils";

const palette: Record<Rank["badge"]["bg"], { bg: string; fg: string; accent: string }> = {
  olive: { bg: "#3d4a26", fg: "#e6d99b", accent: "#c8b772" },
  silver: { bg: "#2a3a30", fg: "#dbe2dd", accent: "#b8c0bb" },
  gold: { bg: "#2a3a30", fg: "#f0c860", accent: "#e0b84a" },
  darkgreen: { bg: "#1f3a26", fg: "#f0c860", accent: "#e0b84a" },
};

export function RankBadge({
  rank,
  size = 64,
  className,
}: {
  rank: Rank;
  size?: number;
  className?: string;
}) {
  const { badge } = rank;
  const c = palette[badge.bg];
  const w = size;
  const h = size * 1.4; // tall shoulder strap shape

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={cn("shrink-0 rounded-md", className)}
      role="img"
      aria-label={`Abzeichen ${rank.name}`}
    >
      {/* strap */}
      <defs>
        <linearGradient id={`grad-${rank.id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={c.bg} stopOpacity="0.95" />
          <stop offset="100%" stopColor={c.bg} stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect
        x={1}
        y={1}
        width={w - 2}
        height={h - 2}
        rx={6}
        fill={`url(#grad-${rank.id})`}
        stroke="rgba(0,0,0,0.25)"
      />

      {/* Portepee laced edge */}
      {badge.laced && (
        <>
          <rect x={3} y={3} width={w - 6} height={3} fill={c.accent} opacity="0.9" />
          <rect x={3} y={h - 6} width={w - 6} height={3} fill={c.accent} opacity="0.9" />
        </>
      )}

      {/* Mannschaften chevrons */}
      {badge.chevrons
        ? Array.from({ length: badge.chevrons }).map((_, i) => {
            const y = h - 12 - i * 10;
            return (
              <polyline
                key={i}
                points={`${w * 0.2},${y} ${w * 0.5},${y - 8} ${w * 0.8},${y}`}
                stroke={c.fg}
                strokeWidth={2.2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })
        : null}

      {/* Feldwebel diamonds */}
      {badge.pips
        ? Array.from({ length: badge.pips }).map((_, i) => {
            const cy = h / 2 + (i - (badge.pips! - 1) / 2) * 12;
            return (
              <g key={i} transform={`translate(${w / 2}, ${cy}) rotate(45)`}>
                <rect x={-4} y={-4} width={8} height={8} fill={c.fg} />
              </g>
            );
          })
        : null}

      {/* Offizier stars */}
      {badge.stars
        ? Array.from({ length: badge.stars }).map((_, i) => {
            const cy = h / 2 + (i - (badge.stars! - 1) / 2) * 14 + (badge.bar ? -6 : 0);
            return <Star key={i} cx={w / 2} cy={cy} r={5} fill={c.fg} />;
          })
        : null}

      {/* Generale crossed batons */}
      {badge.bar && (
        <g transform={`translate(${w / 2}, ${h - 14})`}>
          <line x1={-10} y1={-4} x2={10} y2={4} stroke={c.fg} strokeWidth={2.5} strokeLinecap="round" />
          <line x1={-10} y1={4} x2={10} y2={-4} stroke={c.fg} strokeWidth={2.5} strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.45;
    points.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return <polygon points={points.join(" ")} fill={fill} />;
}
