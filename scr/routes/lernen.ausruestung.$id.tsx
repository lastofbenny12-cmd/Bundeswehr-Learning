import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { equipmentById } from "@/lib/data/equipment";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/lernen/ausruestung/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${equipmentById(params.id)?.name ?? "Ausrüstung"} — AGA Trainer` }],
  }),
  component: EquipmentDetail,
  notFoundComponent: () => (
    <AppShell>
      <SubBar title="Ausrüstung" back="/lernen/ausruestung" />
      <p className="p-6 text-center text-ink-mute">Nicht gefunden.</p>
    </AppShell>
  ),
});

function EquipmentDetail() {
  const { id } = Route.useParams();
  const item = equipmentById(id);
  const mark = useStore((s) => s.markEquipmentViewed);

  useEffect(() => {
    if (item) mark(item.id);
  }, [item, mark]);

  if (!item) throw notFound();
  const Icon = item.icon;

  return (
    <AppShell>
      <SubBar title={item.name} back={{ to: "/lernen/ausruestung", label: "Ausrüstung" }} />
      <div className="px-5 pt-5 space-y-4">
        <Card className="p-6 flex flex-col items-center text-center">
          <div className="size-20 rounded-2xl bg-mil-pale grid place-items-center text-mil mb-3">
            <Icon className="size-10" strokeWidth={1.6} />
          </div>
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p className="text-sm text-ink-mute mt-1">{item.short}</p>
        </Card>

        <Card className="p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-2">
            Beschreibung
          </h3>
          <p className="text-sm text-ink-soft leading-relaxed">{item.description}</p>
        </Card>

        <Card className="p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-2">
            Verwendung
          </h3>
          <p className="text-sm text-ink-soft leading-relaxed">{item.usage}</p>
        </Card>

        <Card className="p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-mil mb-2">
            Hinweise
          </h3>
          <ul className="text-sm text-ink-soft space-y-2 list-disc pl-5">
            {item.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
