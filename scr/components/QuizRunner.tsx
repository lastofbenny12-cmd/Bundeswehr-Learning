import { useMemo, useState } from "react";
import { Check, X, ChevronRight } from "lucide-react";
import type { QuizQuestion } from "@/lib/data/quiz";
import { Card, ProgressBar } from "@/components/ui-bits";
import { RankBadge } from "@/components/RankBadge";
import { rankById, RANKS } from "@/lib/data/ranks";
import { cn } from "@/lib/utils";

type Result = { correct: number; total: number; wrongIds: string[] };

export function QuizRunner({
  questions,
  onDone,
}: {
  questions: QuizQuestion[];
  onDone: (r: Result) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);

  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  function submit(ok: boolean) {
    if (answered) return;
    setAnswered(true);
    setIsCorrect(ok);
    if (ok) setCorrect((c) => c + 1);
    else setWrong((w) => [...w, q.id]);
  }

  function next() {
    if (isLast) {
      onDone({ correct, total: questions.length, wrongIds: wrong });
      return;
    }
    setIdx((i) => i + 1);
    setAnswered(false);
    setIsCorrect(false);
  }

  return (
    <div className="px-5 pt-4 pb-8 space-y-5">
      <div>
        <div className="flex items-center justify-between text-xs text-ink-mute mb-2">
          <span className="font-mono">
            Frage {idx + 1} / {questions.length}
          </span>
          <span className="font-mono">{correct} richtig</span>
        </div>
        <ProgressBar value={((idx + (answered ? 1 : 0)) / questions.length) * 100} />
      </div>

      <Card className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-2">
          {labelFor(q.type)}
        </p>
        <p className="text-base font-semibold text-ink leading-snug">{q.prompt}</p>
      </Card>

      <QuestionBody q={q} answered={answered} onAnswer={submit} />

      {answered && (
        <Card
          className={cn(
            "p-4 border",
            isCorrect ? "bg-mil-pale border-mil/30" : "bg-danger/10 border-danger/30",
          )}
        >
          <p className="flex items-center gap-2 font-semibold text-sm">
            {isCorrect ? (
              <>
                <Check className="size-5 text-mil" /> Richtig!
              </>
            ) : (
              <>
                <X className="size-5 text-danger" /> Nicht ganz.
              </>
            )}
          </p>
          {q.explanation && (
            <p className="text-sm text-ink-soft mt-2">{q.explanation}</p>
          )}
        </Card>
      )}

      <button
        type="button"
        disabled={!answered}
        onClick={next}
        className={cn(
          "press w-full h-12 rounded-xl font-semibold text-white flex items-center justify-center gap-2",
          answered ? "bg-mil" : "bg-surface-2 text-ink-mute cursor-not-allowed",
        )}
      >
        {isLast ? "Auswerten" : "Weiter"} <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

function labelFor(t: QuizQuestion["type"]) {
  return {
    mc: "Multiple Choice",
    tf: "Richtig oder Falsch",
    image: "Abzeichen erkennen",
    order: "Reihenfolge",
    match: "Zuordnung",
  }[t];
}

function QuestionBody({
  q,
  answered,
  onAnswer,
}: {
  q: QuizQuestion;
  answered: boolean;
  onAnswer: (ok: boolean) => void;
}) {
  if (q.type === "mc") {
    return <ChoiceList options={q.options} answer={q.answer} answered={answered} onPick={onAnswer} />;
  }
  if (q.type === "tf") {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Richtig", v: true },
          { label: "Falsch", v: false },
        ].map((o) => (
          <button
            key={o.label}
            disabled={answered}
            onClick={() => onAnswer(o.v === q.answer)}
            className="press h-14 rounded-xl bg-surface border border-line font-semibold text-ink hover:border-mil"
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }
  if (q.type === "image") {
    const rank = rankById(q.rankId);
    return (
      <div className="space-y-4">
        <Card className="p-6 flex items-center justify-center bg-surface-2">
          {rank && <RankBadge rank={rank} size={96} />}
        </Card>
        <ChoiceList options={q.options} answer={q.answer} answered={answered} onPick={onAnswer} />
      </div>
    );
  }
  if (q.type === "order") {
    return <OrderQuestion items={q.items} answered={answered} onAnswer={onAnswer} />;
  }
  return <MatchQuestion pairs={q.pairs} answered={answered} onAnswer={onAnswer} />;
}

function ChoiceList({
  options,
  answer,
  answered,
  onPick,
}: {
  options: string[];
  answer: number;
  answered: boolean;
  onPick: (ok: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {options.map((opt, i) => {
        const isPicked = picked === i;
        const showCorrect = answered && i === answer;
        const showWrong = answered && isPicked && i !== answer;
        return (
          <button
            key={i}
            disabled={answered}
            onClick={() => {
              setPicked(i);
              onPick(i === answer);
            }}
            className={cn(
              "press w-full text-left p-4 rounded-xl border bg-surface text-ink font-medium flex items-center gap-3",
              !answered && "hover:border-mil",
              showCorrect && "border-mil bg-mil-pale",
              showWrong && "border-danger bg-danger/10",
              !showCorrect && !showWrong && "border-line",
            )}
          >
            <span className="size-6 rounded-md bg-surface-2 grid place-items-center text-xs font-mono shrink-0">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function OrderQuestion({
  items,
  answered,
  onAnswer,
}: {
  items: string[];
  answered: boolean;
  onAnswer: (ok: boolean) => void;
}) {
  const correctOrder = items;
  const shuffled = useMemo(() => [...items].sort(() => Math.random() - 0.5), [items]);
  const [picks, setPicks] = useState<string[]>([]);

  function pick(id: string) {
    if (picks.includes(id) || answered) return;
    const next = [...picks, id];
    setPicks(next);
    if (next.length === correctOrder.length) {
      const ok = next.every((id, i) => id === correctOrder[i]);
      onAnswer(ok);
    }
  }

  return (
    <div className="space-y-3">
      <Card className="p-3 min-h-[64px] bg-surface-2">
        <div className="flex flex-wrap gap-2">
          {picks.map((id, i) => (
            <span
              key={id}
              className="px-3 py-1.5 rounded-lg bg-mil text-white text-sm font-medium"
            >
              {i + 1}. {rankById(id)?.name ?? id}
            </span>
          ))}
          {picks.length === 0 && (
            <p className="text-xs text-ink-mute">Tippe in der korrekten Reihenfolge (niedrig → hoch).</p>
          )}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        {shuffled.map((id) => {
          const used = picks.includes(id);
          return (
            <button
              key={id}
              disabled={used || answered}
              onClick={() => pick(id)}
              className={cn(
                "press p-3 rounded-xl border text-sm font-medium",
                used
                  ? "bg-surface-2 text-ink-mute border-line opacity-50"
                  : "bg-surface text-ink border-line hover:border-mil",
              )}
            >
              {rankById(id)?.name ?? id}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchQuestion({
  pairs,
  answered,
  onAnswer,
}: {
  pairs: { a: string; b: string }[];
  answered: boolean;
  onAnswer: (ok: boolean) => void;
}) {
  const bOptions = useMemo(() => [...pairs.map((p) => p.b)].sort(() => Math.random() - 0.5), [pairs]);
  const [picks, setPicks] = useState<Record<string, string>>({});

  function set(a: string, b: string) {
    if (answered) return;
    const next = { ...picks, [a]: b };
    setPicks(next);
    if (Object.keys(next).length === pairs.length) {
      const ok = pairs.every((p) => next[p.a] === p.b);
      onAnswer(ok);
    }
  }

  return (
    <div className="space-y-2">
      {pairs.map((p) => (
        <Card key={p.a} className="p-3 flex items-center gap-3">
          <span className="text-sm font-semibold text-ink flex-1">{p.a}</span>
          <select
            disabled={answered}
            value={picks[p.a] ?? ""}
            onChange={(e) => set(p.a, e.target.value)}
            className="bg-surface-2 border border-line rounded-lg px-2 py-2 text-sm text-ink"
          >
            <option value="">—</option>
            {bOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Card>
      ))}
    </div>
  );
}

export { RANKS };
