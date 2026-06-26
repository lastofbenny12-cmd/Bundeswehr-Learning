import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Award, GraduationCap, Timer } from "lucide-react";
import { AppShell, TopBar } from "@/components/AppShell";
import { Card, StatCard } from "@/components/ui-bits";
import { QuizRunner } from "@/components/QuizRunner";
import { buildExam } from "@/lib/data/quiz";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/pruefung")({
  head: () => ({
    meta: [
      { title: "Prüfung — AGA Trainer" },
      { name: "description", content: "Prüfungsmodus mit Zeit und Auswertung." },
    ],
  }),
  component: Pruefung,
});

const EXAM_SIZE = 20;
const PASS_PCT = 75;

function Pruefung() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState(() => buildExam(EXAM_SIZE));
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [result, setResult] = useState<{ correct: number; total: number; durationSec: number; passed: boolean } | null>(null);
  const recordExam = useStore((s) => s.recordExam);
  const lastExams = useStore((s) => s.examResults);

  useEffect(() => {
    if (!started || result) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [started, result]);

  const elapsed = started ? Math.floor((now - startedAt) / 1000) : 0;
  const passed = useMemo(() => result?.passed ?? false, [result]);

  function start() {
    setQuestions(buildExam(EXAM_SIZE));
    setStartedAt(Date.now());
    setNow(Date.now());
    setStarted(true);
    setResult(null);
  }

  if (!started) {
    return (
      <AppShell>
        <TopBar title="Prüfung" subtitle="Realistischer Test mit Zeit & Auswertung" />
        <div className="px-5 pt-5 space-y-4">
          <Card className="p-5">
            <GraduationCap className="size-8 text-mil mb-3" strokeWidth={1.6} />
            <h2 className="text-lg font-bold text-ink mb-1">Prüfungsmodus</h2>
            <p className="text-sm text-ink-soft">
              {EXAM_SIZE} zufällige Fragen aus allen Themenbereichen. Bestehensgrenze: {PASS_PCT} %.
            </p>
          </Card>
          {lastExams.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Letzte Prüfung"
                value={`${lastExams[0].correct}/${lastExams[0].total}`}
                hint={lastExams[0].passed ? "Bestanden" : "Nicht bestanden"}
                tone={lastExams[0].passed ? "mil" : "default"}
              />
              <StatCard
                label="Versuche"
                value={lastExams.length}
                hint={`${lastExams.filter((e) => e.passed).length} bestanden`}
              />
            </div>
          )}
          <button
            onClick={start}
            className="press w-full h-12 rounded-xl bg-mil text-white font-semibold"
          >
            Prüfung starten
          </button>
        </div>
      </AppShell>
    );
  }

  if (result) {
    return (
      <AppShell>
        <TopBar title="Ergebnis" subtitle={passed ? "Bestanden" : "Nicht bestanden"} />
        <div className="px-5 pt-5 space-y-4">
          <Card className={`p-6 text-center ${passed ? "bg-mil-pale border-mil/30" : ""}`}>
            <Award className={`size-12 mx-auto mb-3 ${passed ? "text-mil" : "text-ink-mute"}`} strokeWidth={1.6} />
            <p className="text-sm text-ink-mute mb-1">Ergebnis</p>
            <p className="text-4xl font-bold text-ink tabular-nums">
              {result.correct} / {result.total}
            </p>
            <p className="text-sm font-semibold mt-1 text-mil">
              {Math.round((result.correct / result.total) * 100)} %
            </p>
            <p className="text-xs text-ink-mute mt-2">Dauer: {formatTime(result.durationSec)}</p>
          </Card>
          <button
            onClick={start}
            className="press w-full h-12 rounded-xl bg-mil text-white font-semibold"
          >
            Neue Prüfung starten
          </button>
          <Link
            to="/"
            className="press w-full h-12 rounded-xl border border-line text-ink font-semibold grid place-items-center"
          >
            Zum Dashboard
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="sticky top-0 z-30 bg-bg/90 backdrop-blur-md border-b border-line px-5 py-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Prüfung läuft</p>
        <span className="flex items-center gap-1.5 text-sm font-mono text-mil tabular-nums">
          <Timer className="size-4" /> {formatTime(elapsed)}
        </span>
      </div>
      <QuizRunner
        questions={questions}
        onDone={(r) => {
          const durationSec = Math.floor((Date.now() - startedAt) / 1000);
          const pct = (r.correct / r.total) * 100;
          const passed = pct >= PASS_PCT;
          recordExam({
            total: r.total,
            correct: r.correct,
            durationSec,
            passed,
            dateISO: new Date().toISOString(),
          });
          setResult({ correct: r.correct, total: r.total, durationSec, passed });
        }}
      />
    </AppShell>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
