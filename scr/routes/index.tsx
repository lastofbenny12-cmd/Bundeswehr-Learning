import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Backpack,
  BookOpen,
  ChevronRight,
  ClipboardList,
  Crosshair,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { AppShell, TopBar } from "@/components/AppShell";
import { Card, ProgressBar, StatCard, SectionHeader } from "@/components/ui-bits";
import { useStore } from "@/lib/store";
import { RANKS } from "@/lib/data/ranks";
import { EQUIPMENT } from "@/lib/data/equipment";
import { LESSONS } from "@/lib/data/lessons";
import { ALL_QUESTIONS } from "@/lib/data/quiz";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AGA Trainer — Dashboard" },
      {
        name: "description",
        content:
          "Lernbegleiter für die Allgemeine Grundausbildung der Bundeswehr. Dienstgrade, Ausrüstung, Regeln und Prüfung üben.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const userName = useStore((s) => s.userName);
  const viewedRanks = useStore((s) => s.viewedRanks);
  const viewedEquipment = useStore((s) => s.viewedEquipment);
  const visitedLessons = useStore((s) => s.visitedLessons);
  const quizResults = useStore((s) => s.quizResults);
  const examResults = useStore((s) => s.examResults);
  const recent = useStore((s) => s.recent);

  const totalTopics = RANKS.length + EQUIPMENT.length + Object.keys(LESSONS).length;
  const learnedTopics = viewedRanks.length + viewedEquipment.length + visitedLessons.length;
  const learnPct = totalTopics > 0 ? (learnedTopics / totalTopics) * 100 : 0;

  const totalQ = ALL_QUESTIONS.length;
  const answeredCorrect = quizResults.reduce((sum, r) => sum + r.correct, 0);
  const lastQuiz = quizResults[0];
  const lastExam = examResults[0];

  const recommended = mounted
    ? RANKS.find((r) => !viewedRanks.includes(r.id)) ?? RANKS[0]
    : RANKS[0];

  return (
    <AppShell>
      <TopBar title={userName ? `Willkommen, ${userName}` : "Willkommen zurück"} subtitle="Dein Lernfortschritt im Überblick" />

      <div className="px-5 pt-5 space-y-6">
        {/* Progress card */}
        <Card className="p-5">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-sm font-semibold text-ink">Gesamtfortschritt</p>
            <p className="text-sm font-mono font-bold text-mil tabular-nums">
              {Math.round(learnPct)} %
            </p>
          </div>
          <ProgressBar value={learnPct} />
          <p className="text-xs text-ink-mute mt-2">
            {learnedTopics} von {totalTopics} Themen angesehen
          </p>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Gelernte Themen"
            value={learnedTopics}
            hint={`von ${totalTopics}`}
          />
          <StatCard
            label="Quiz-Ergebnisse"
            value={quizResults.length}
            hint={lastQuiz ? `Letzt: ${lastQuiz.correct}/${lastQuiz.total}` : "noch keine"}
          />
          <StatCard
            label="Richtige Antworten"
            value={answeredCorrect}
            hint="gesamt"
          />
          <StatCard
            label="Prüfungen"
            value={examResults.length}
            hint={lastExam ? (lastExam.passed ? "Bestanden" : "Nicht bestanden") : "noch keine"}
            tone={lastExam?.passed ? "mil" : "default"}
          />
        </div>

        {/* Quick access */}
        <section>
          <SectionHeader title="Schnellzugriff" />
          <div className="grid grid-cols-2 gap-3">
            <QuickTile
              to="/lernen/dienstgrade"
              icon={Award}
              title="Dienstgrade"
              hint={`${viewedRanks.length}/${RANKS.length}`}
            />
            <QuickTile
              to="/lernen/ausruestung"
              icon={Backpack}
              title="Ausrüstung"
              hint={`${viewedEquipment.length}/${EQUIPMENT.length}`}
            />
            <QuickTile to="/quiz" icon={ClipboardList} title="Quiz starten" hint={`${totalQ} Fragen`} />
            <QuickTile to="/pruefung" icon={GraduationCap} title="Prüfung" hint="20 Fragen" />
            <QuickTile to="/rechner" icon={Crosshair} title="Ballistik-Rechner" hint="Kaliber & Distanz" />
          </div>
        </section>

        {/* Recommended */}
        <section>
          <SectionHeader title="Empfohlen für dich" />
          <Link
            to="/lernen/dienstgrade/$id"
            params={{ id: recommended.id }}
            className="press block"
          >
            <Card className="p-4 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-mil-pale grid place-items-center text-mil">
                <Sparkles className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mil">
                  Dienstgrad
                </p>
                <p className="font-bold text-ink truncate">{recommended.name}</p>
                <p className="text-xs text-ink-mute truncate">{recommended.laufbahn}</p>
              </div>
              <ChevronRight className="size-5 text-ink-mute" />
            </Card>
          </Link>
        </section>

        {/* Recent activity */}
        <section>
          <SectionHeader title="Letzte Aktivität" />
          {recent.length === 0 ? (
            <Card className="p-6 text-center">
              <BookOpen className="size-8 mx-auto text-ink-mute mb-2" />
              <p className="text-sm text-ink-mute">
                Noch keine Aktivität. Beginne mit einem Lernthema oder Quiz.
              </p>
            </Card>
          ) : (
            <Card className="divide-y divide-line">
              {recent.slice(0, 5).map((a) => (
                <div key={a.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{a.label}</p>
                    <p className="text-xs text-ink-mute">{a.meta}</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-mil bg-mil-pale px-2 py-0.5 rounded shrink-0">
                    {a.kind}
                  </span>
                </div>
              ))}
            </Card>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function QuickTile({
  to,
  icon: Icon,
  title,
  hint,
}: {
  to: string;
  icon: typeof Sparkles;
  title: string;
  hint?: string;
}) {
  return (
    <Link to={to} className="press">
      <Card className="p-4 h-full">
        <Icon className="size-6 text-mil mb-3" strokeWidth={1.8} />
        <p className="font-semibold text-ink text-sm">{title}</p>
        {hint && <p className="text-xs text-ink-mute mt-0.5">{hint}</p>}
      </Card>
    </Link>
  );
}
