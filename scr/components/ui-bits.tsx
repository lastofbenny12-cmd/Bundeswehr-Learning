import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  className,
  tone = "mil",
}: {
  value: number;
  max?: number;
  className?: string;
  tone?: "mil" | "warn" | "danger";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === "warn" ? "bg-warn" : tone === "danger" ? "bg-danger" : "bg-mil";
  return (
    <div
      className={cn("h-2 w-full rounded-full bg-surface-2 overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
    >
      <div className={cn("h-full transition-all duration-500", fill)} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As
      className={cn(
        "block bg-surface rounded-2xl border border-line shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: "default" | "mil" | "warn";
}) {
  return (
    <Card
      className={cn(
        "p-4",
        tone === "mil" && "bg-mil text-white border-mil-dark",
        tone === "warn" && "bg-warn/10 border-warn/30",
      )}
    >
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-wider",
          tone === "mil" ? "text-white/70" : "text-ink-mute",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "text-2xl font-bold mt-1 tabular-nums",
          tone === "mil" ? "text-white" : "text-ink",
        )}
      >
        {value}
      </p>
      {hint && (
        <p
          className={cn(
            "text-xs mt-1",
            tone === "mil" ? "text-white/70" : "text-ink-mute",
          )}
        >
          {hint}
        </p>
      )}
    </Card>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-3">
      <h2 className="text-base font-bold text-ink">{title}</h2>
      {action}
    </div>
  );
}
