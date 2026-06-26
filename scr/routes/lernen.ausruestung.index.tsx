import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { EQUIPMENT } from "@/lib/data/equipment";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/lernen/ausruestung/")({
  head: () => ({ meta: [{ title: "Ausrüstung — AGA Trainer" }] }),
  component: AusruestungIndex,
});

function AusruestungIndex() {
  const viewed = useStore((s) => s.viewedEquipment);
  return (
    <AppShell>
      <SubBar title="Ausrüstung" back={{ to: "/lernen", label: "Lernen" }} />
      <div className="px-5 pt-4 space-y-3">
        {EQUIPMENT.map((e) => (
          <Link key={e.id} to="/lernen/ausruestung/$id" params={{ id: e.id }} className="press block">
            <Card className="p-4 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-mil-pale grid place-items-center text-mil shrink-0">
                <e.icon className="size-6" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink text-sm">{e.name}</p>
                <p className="text-xs text-ink-mute truncate">{e.short}</p>
              </div>
              {viewed.includes(e.id) && (
                <span className="text-[10px] font-mono text-mil bg-mil-pale px-1.5 py-0.5 rounded">
                  ✓
                </span>
              )}
              <ChevronRight className="size-4 text-ink-mute" />
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
