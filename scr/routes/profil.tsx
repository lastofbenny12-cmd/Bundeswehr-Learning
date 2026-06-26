import { createFileRoute } from "@tanstack/react-router";

import { Trash2, User } from "lucide-react";
import { AppShell, TopBar } from "@/components/AppShell";
import { Card, SectionHeader, StatCard } from "@/components/ui-bits";
import { useStore } from "@/lib/store";
import { RANKS } from "@/lib/data/ranks";
import { EQUIPMENT } from "@/lib/data/equipment";
import { ALL_QUESTIONS } from "@/lib/data/quiz";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profil — AGA Trainer" },
      { name: "description", content: "Persönlicher Fortschritt und Statistiken." },
    ],
  }),
  component: Profil,
});

function Profil() {

  const viewedRanks = useStore((s) => s.viewedRanks);
  const viewedEquipment = useStore((s) => s.viewedEquipment);
  const visitedLessons = useStore((s) => s.visitedLessons);
  const quizResults = useStore((s) => s.quizResults);
  const examResults = useStore((s) => s.examResults);
  const recent = useStore((s) => s.recent);
  const reset = useStore((s) => s.reset);

  const totalQ = quizResults.reduce((s, r) => s + r.total, 0);
  const correctQ = quizResults.reduce((s, r) => s + r.correct, 0);
  const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;

  return (
    <AppShell>
      <TopBar title="Profil" subtitle="Dein Fortschritt & Statistiken" />
      <div className="px-5 pt-5 space-y-5">
        <Card className="p-5 flex items-center gap-4">
          <div className="size-14 rounded-full bg-mil-pale grid place-items-center text-mil">
            <User className="size-7" strokeWidth={1.6} />
          </div>
          <div>
            <p className="font-bold text-ink">Rekrut</p>
            <p className="text-xs text-ink-mute">Lokales Profil · Lernfortschritt gespeichert</p>
          </div>
        </Card>

        <section>
          <SectionHeader title="Statistiken" />
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Dienstgrade" value={`${viewedRanks.length}/${RANKS.length}`} hint="angesehen" />
            <StatCard label="Ausrüstung" value={`${viewedEquipment.length}/${EQUIPMENT.length}`} hint="angesehen" />
            <StatCard label="Lerntexte" value={visitedLessons.length} hint="besucht" />
            <StatCard label="Trefferquote" value={`${accuracy} %`} hint={`${correctQ}/${totalQ}`} />
            <StatCard label="Quiz" value={quizResults.length} hint="abgeschlossen" />
            <StatCard
              label="Prüfungen"
              value={examResults.length}
              hint={`${examResults.filter((e) => e.passed).length} bestanden`}
            />
          </div>
        </section>

        <section>
          <SectionHeader title="Lernhistorie" />
          {recent.length === 0 ? (
            <Card className="p-6 text-center text-sm text-ink-mute">
              Noch keine Aktivität.
            </Card>
          ) : (
            <Card className="divide-y divide-line">
              {recent.slice(0, 10).map((a) => (
                <div key={a.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{a.label}</p>
                    <p className="text-xs text-ink-mute">
                      {a.meta} · {new Date(a.dateISO).toLocaleString("de-DE")}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-mil bg-mil-pale px-2 py-0.5 rounded shrink-0">
                    {a.kind}
                  </span>
                </div>
              ))}
            </Card>
          )}
        </section>

        <section>
          <SectionHeader title="Daten" />
          <button
            onClick={() => {
              if (confirm("Allen Fortschritt zurücksetzen?")) reset();
            }}
            className="press w-full h-12 rounded-xl border border-danger/30 text-danger font-semibold flex items-center justify-center gap-2"
          >
            <Trash2 className="size-4" /> Fortschritt zurücksetzen
          </button>
          <p className="text-[11px] text-ink-mute mt-2 text-center">
            Insgesamt {ALL_QUESTIONS.length} Fragen verfügbar · lokal gespeichert
          </p>
        </section>
      </div>
    </AppShell>
  );
}
