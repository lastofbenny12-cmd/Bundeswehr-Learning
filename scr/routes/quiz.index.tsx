import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ClipboardList } from "lucide-react";
import { AppShell, TopBar } from "@/components/AppShell";
import { Card, SectionHeader } from "@/components/ui-bits";
import { QUIZ_TOPICS } from "@/lib/data/quiz";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/quiz/")({
  head: () => ({
    meta: [
      { title: "Quiz — AGA Trainer" },
      { name: "description", content: "Quizthemen zur Allgemeinen Grundausbildung." },
    ],
  }),
  component: QuizIndex,
});

function QuizIndex() {
  const results = useStore((s) => s.quizResults);
  return (
    <AppShell>
      <TopBar title="Quiz" subtitle="Wähle ein Thema zum Üben" />
      <div className="px-5 pt-5 space-y-3">
        <SectionHeader title="Themen" />
        {QUIZ_TOPICS.map((t) => {
          const last = results.find((r) => r.topicId === t.id);
          return (
            <Link key={t.id} to="/quiz/$id" params={{ id: t.id }} className="press block">
              <Card className="p-4 flex items-center gap-4">
                <div className="size-12 rounded-xl bg-mil-pale grid place-items-center text-mil shrink-0">
                  <ClipboardList className="size-6" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{t.label}</p>
                  <p className="text-xs text-ink-mute truncate">{t.description}</p>
                  <p className="text-[11px] text-mil mt-1">
                    {t.questions.length} Fragen
                    {last && ` · Letzt: ${last.correct}/${last.total}`}
                  </p>
                </div>
                <ChevronRight className="size-5 text-ink-mute shrink-0" />
              </Card>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
