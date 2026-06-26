import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Award, RotateCcw } from "lucide-react";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { QuizRunner } from "@/components/QuizRunner";
import { topicById } from "@/lib/data/quiz";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/quiz/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Quiz: ${params.id} — AGA Trainer` }],
  }),
  component: QuizSession,
  notFoundComponent: () => (
    <AppShell>
      <SubBar title="Quiz" back="/quiz" />
      <p className="px-5 py-10 text-center text-ink-mute">Thema nicht gefunden.</p>
    </AppShell>
  ),
});

function QuizSession() {
  const { id } = Route.useParams();
  const topic = topicById(id);
  if (!topic) throw notFound();

  const recordQuiz = useStore((s) => s.recordQuiz);
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState<{ correct: number; total: number } | null>(null);

  return (
    <AppShell>
      <SubBar title={topic.label} back="/quiz" />
      {!done ? (
        <QuizRunner
          key={attempt}
          questions={topic.questions}
          onDone={(r) => {
            recordQuiz(
              {
                topicId: topic.id,
                topicLabel: topic.label,
                correct: r.correct,
                total: r.total,
                dateISO: new Date().toISOString(),
              },
              r.wrongIds,
            );
            setDone({ correct: r.correct, total: r.total });
          }}
        />
      ) : (
        <div className="px-5 pt-8 space-y-5">
          <Card className="p-6 text-center">
            <Award className="size-12 text-mil mx-auto mb-3" strokeWidth={1.6} />
            <p className="text-sm text-ink-mute mb-1">Ergebnis</p>
            <p className="text-4xl font-bold text-ink tabular-nums">
              {done.correct} / {done.total}
            </p>
            <p className="text-sm text-mil font-semibold mt-1">
              {Math.round((done.correct / done.total) * 100)} % richtig
            </p>
          </Card>
          <button
            onClick={() => {
              setDone(null);
              setAttempt((a) => a + 1);
            }}
            className="press w-full h-12 rounded-xl bg-mil text-white font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="size-4" /> Erneut versuchen
          </button>
          <Link
            to="/quiz"
            className="press w-full h-12 rounded-xl border border-line text-ink font-semibold grid place-items-center"
          >
            Zurück zur Themenübersicht
          </Link>
        </div>
      )}
    </AppShell>
  );
}
