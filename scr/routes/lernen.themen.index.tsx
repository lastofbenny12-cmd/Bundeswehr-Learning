import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, BookMarked } from "lucide-react";
import { AppShell, TopBar } from "@/components/AppShell";
import { Card, SectionHeader } from "@/components/ui-bits";
import { THEMEN_KATEGORIEN } from "@/lib/data/themen";

export const Route = createFileRoute("/lernen/themen/")({
  head: () => ({
    meta: [
      { title: "Themen — AGA Trainer" },
      { name: "description", content: "Themenbereiche der AGA: Recht, Sanitätsdienst, Waffen, Gefechtsdienst, Fernmelde, Innere Führung." },
    ],
  }),
  component: ThemenIndex,
});

function ThemenIndex() {
  return (
    <AppShell>
      <TopBar title="Themen" subtitle="Lehrinhalte der Allgemeinen Grundausbildung" />
      <div className="px-5 pt-5 space-y-3">
        <SectionHeader title="Themenbereiche" />
        {THEMEN_KATEGORIEN.map((k) => (
          <Link
            key={k.id}
            to="/lernen/themen/$id"
            params={{ id: k.id }}
            className="press block"
          >
            <Card className="p-4 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-mil-pale grid place-items-center text-mil shrink-0">
                <BookMarked className="size-6" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{k.title}</p>
                <p className="text-xs text-ink-mute truncate">{k.subtitle}</p>
              </div>
              <span className="text-[11px] font-mono text-mil bg-mil-pale px-2 py-1 rounded shrink-0">
                {k.themen.length}
              </span>
              <ChevronRight className="size-5 text-ink-mute shrink-0" />
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
