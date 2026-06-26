import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { RankBadge } from "@/components/RankBadge";
import { RANKS, RANK_CATEGORIES, ranksByCategory } from "@/lib/data/ranks";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/lernen/dienstgrade/")({
  head: () => ({ meta: [{ title: "Dienstgrade — AGA Trainer" }] }),
  component: DienstgradeIndex,
});

function DienstgradeIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const viewed = useStore((s) => s.viewedRanks);

  const filtered = RANKS.filter((r) => {
    if (cat !== "all" && r.category !== cat) return false;
    if (q && !r.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <AppShell>
      <SubBar title="Dienstgrade" back={{ to: "/lernen", label: "Lernen" }} />
      <div className="px-5 pt-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="size-4 text-ink-mute absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Dienstgrad suchen…"
            className="w-full bg-surface border border-line rounded-xl pl-10 pr-4 py-3 text-sm focus:border-mil focus:outline-none"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")}>
            Alle
          </FilterChip>
          {RANK_CATEGORIES.map((c) => (
            <FilterChip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </FilterChip>
          ))}
        </div>

        {/* By category */}
        {cat === "all" && q === "" ? (
          <div className="space-y-6">
            {RANK_CATEGORIES.map((c) => {
              const ranks = ranksByCategory(c.id);
              if (ranks.length === 0) return null;
              return (
                <section key={c.id}>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-mil mb-2">
                    {c.label}
                  </h2>
                  <Card className="divide-y divide-line">
                    {ranks.map((r) => (
                      <RankRow key={r.id} rank={r} viewed={viewed.includes(r.id)} />
                    ))}
                  </Card>
                </section>
              );
            })}
          </div>
        ) : (
          <Card className="divide-y divide-line">
            {filtered.length === 0 ? (
              <p className="p-6 text-center text-sm text-ink-mute">Keine Treffer.</p>
            ) : (
              filtered.map((r) => <RankRow key={r.id} rank={r} viewed={viewed.includes(r.id)} />)
            )}
          </Card>
        )}
      </div>
    </AppShell>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`press shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
        active
          ? "bg-mil text-white border-mil"
          : "bg-surface text-ink-soft border-line hover:border-mil/40"
      }`}
    >
      {children}
    </button>
  );
}

function RankRow({ rank, viewed }: { rank: (typeof RANKS)[number]; viewed: boolean }) {
  return (
    <Link
      to="/lernen/dienstgrade/$id"
      params={{ id: rank.id }}
      className="press flex items-center gap-3 p-3"
    >
      <RankBadge rank={rank} size={36} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink text-sm truncate">{rank.name}</p>
        <p className="text-[11px] text-ink-mute truncate">{rank.laufbahn}</p>
      </div>
      {viewed && (
        <span className="text-[10px] font-mono text-mil bg-mil-pale px-1.5 py-0.5 rounded">
          ✓
        </span>
      )}
      <ChevronRight className="size-4 text-ink-mute" />
    </Link>
  );
}
