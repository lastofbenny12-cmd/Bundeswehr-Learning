import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { THEMEN_BY_ID } from "@/lib/data/themen";

export const Route = createFileRoute("/lernen/themen/$id")({
  head: ({ params }) => {
    const k = THEMEN_BY_ID[params.id];
    return {
      meta: [
        { title: `${k?.title ?? "Thema"} — AGA Trainer` },
        { name: "description", content: k?.subtitle ?? "Themenbereich der AGA." },
      ],
    };
  },
  component: ThemenDetail,
});

function ThemenDetail() {
  const { id } = Route.useParams();
  const k = THEMEN_BY_ID[id];
  if (!k) throw notFound();

  return (
    <AppShell>
      <SubBar title={k.title} back={{ to: "/lernen/themen", label: "Themen" }} />
      <div className="px-5 pt-5 space-y-3">
        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-1">
            {k.subtitle}
          </p>
          <p className="text-sm text-ink-soft">
            {k.themen.length} Lehrinhalte zum Durcharbeiten.
          </p>
        </Card>

        {k.themen.map((t) => (
          <Card key={t.id} className="p-5">
            <h3 className="text-base font-bold text-ink mb-1">{t.title}</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-mil mb-2">
              {t.summary}
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">{t.detail}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
