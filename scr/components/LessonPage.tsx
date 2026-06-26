import { notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Lightbulb, PlayCircle } from "lucide-react";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { LESSONS } from "@/lib/data/lessons";
import { useStore } from "@/lib/store";

function ytId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
  return m ? m[1] : null;
}

function LessonPage({ id }: { id: keyof typeof LESSONS }) {
  const lesson = LESSONS[id];
  const mark = useStore((s) => s.markLessonVisited);
  useEffect(() => {
    if (lesson) mark(lesson.id);
  }, [lesson, mark]);
  if (!lesson) throw notFound();

  const videoId = lesson.videoUrl ? ytId(lesson.videoUrl) : null;

  return (
    <AppShell>
      <SubBar title={lesson.title} back={{ to: "/lernen", label: "Lernen" }} />
      <div className="px-5 pt-5 space-y-4">
        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-1">
            {lesson.subtitle}
          </p>
          <p className="text-sm text-ink-soft leading-relaxed">{lesson.intro}</p>
        </Card>

        {videoId && (
          <Card className="overflow-hidden">
            <div className="px-4 pt-3 pb-2 flex items-center gap-2">
              <PlayCircle className="size-4 text-mil" />
              <p className="text-xs font-semibold uppercase tracking-wider text-mil">
                Video-Erklärung
              </p>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </Card>
        )}

        {lesson.sections.map((s, i) => (
          <Card key={i} className="p-5">
            <h3 className="text-base font-bold text-ink mb-3">{s.heading}</h3>
            {s.body && <p className="text-sm text-ink-soft leading-relaxed mb-3">{s.body}</p>}
            {s.bullets && (
              <ul className="text-sm text-ink-soft space-y-2 list-disc pl-5">
                {s.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
            {s.steps && (
              <ol className="space-y-3">
                {s.steps.map((st, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="size-7 shrink-0 grid place-items-center rounded-lg bg-mil text-white text-xs font-bold">
                      {j + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{st.title}</p>
                      <p className="text-sm text-ink-soft">{st.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        ))}

        {lesson.checklist && (
          <Card className="p-5 bg-mil-pale border-mil/20">
            <h3 className="text-base font-bold text-ink mb-3 flex items-center gap-2">
              <CheckCircle2 className="size-5 text-mil" /> Checkliste
            </h3>
            <ul className="space-y-2">
              {lesson.checklist.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span className="size-4 shrink-0 rounded border-2 border-mil/50 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {lesson.tips && (
          <Card className="p-5">
            <h3 className="text-base font-bold text-ink mb-3 flex items-center gap-2">
              <Lightbulb className="size-5 text-warn" /> Tipps
            </h3>
            <ul className="text-sm text-ink-soft space-y-2 list-disc pl-5">
              {lesson.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </AppShell>
  );
}

export { LessonPage };
