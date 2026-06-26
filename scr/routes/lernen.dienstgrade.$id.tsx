import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { RankBadge } from "@/components/RankBadge";
import { rankById, RANKS } from "@/lib/data/ranks";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/lernen/dienstgrade/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${rankById(params.id)?.name ?? "Dienstgrad"} — AGA Trainer` }],
  }),
  component: DienstgradDetail,
  notFoundComponent: () => (
    <AppShell>
      <SubBar title="Dienstgrad" back="/lernen/dienstgrade" />
      <p className="p-6 text-center text-ink-mute">Nicht gefunden.</p>
    </AppShell>
  ),
});

function DienstgradDetail() {
  const { id } = Route.useParams();
  const rank = rankById(id);
  const markRankViewed = useStore((s) => s.markRankViewed);
  const pushActivity = useStore((s) => s.pushActivity);

  useEffect(() => {
    if (rank) {
      markRankViewed(rank.id);
      pushActivity({ kind: "lesson", label: rank.name, href: `/lernen/dienstgrade/${rank.id}`, meta: "Dienstgrad angesehen" });
    }
  }, [rank, markRankViewed, pushActivity]);

  if (!rank) throw notFound();

  const next = RANKS.find((r) => r.order === rank.order + 1);
  const prev = RANKS.find((r) => r.order === rank.order - 1);

  return (
    <AppShell>
      <SubBar title={rank.name} back={{ to: "/lernen/dienstgrade", label: "Dienstgrade" }} />
      <div className="px-5 pt-5 space-y-5">
        <Card className="p-6 flex flex-col items-center text-center">
          <RankBadge rank={rank} size={88} />
          <h2 className="mt-4 text-2xl font-bold text-ink">{rank.name}</h2>
          <p className="text-xs text-ink-mute mt-1 font-mono">{rank.short}</p>
        </Card>

        <Card className="p-5 space-y-4">
          <Field label="Korrekte Anrede" value={rank.anrede} />
          <Field label="Laufbahngruppe" value={rank.laufbahn} />
          <Field label="Hierarchie-Stufe" value={`#${rank.order} in der Reihenfolge`} />
        </Card>

        <Card className="p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-2">
            Beschreibung
          </h3>
          <p className="text-sm text-ink-soft leading-relaxed">{rank.description}</p>
        </Card>

        {rank.notes && rank.notes.length > 0 && (
          <Card className="p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-2">
              Zusatzinformationen
            </h3>
            <ul className="text-sm text-ink-soft space-y-2 list-disc pl-5">
              {rank.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </Card>
        )}

        <div className="flex gap-3">
          {prev && (
            <Link
              to="/lernen/dienstgrade/$id"
              params={{ id: prev.id }}
              className="press flex-1"
            >
              <Card className="p-3 flex items-center gap-2">
                <ChevronRight className="size-4 text-ink-mute rotate-180" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-ink-mute">Niedriger</p>
                  <p className="text-xs font-semibold truncate">{prev.name}</p>
                </div>
              </Card>
            </Link>
          )}
          {next && (
            <Link
              to="/lernen/dienstgrade/$id"
              params={{ id: next.id }}
              className="press flex-1"
            >
              <Card className="p-3 flex items-center gap-2 justify-end text-right">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-ink-mute">Höher</p>
                  <p className="text-xs font-semibold truncate">{next.name}</p>
                </div>
                <ChevronRight className="size-4 text-ink-mute" />
              </Card>
            </Link>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-mute">{label}</p>
      <p className="text-sm font-medium text-ink mt-0.5">{value}</p>
    </div>
  );
}
