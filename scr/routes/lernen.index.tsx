import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Backpack, Package, ScrollText, ChevronRight, BookOpen, Shield, Crosshair, BookMarked } from "lucide-react";
import { AppShell, TopBar } from "@/components/AppShell";
import { Card, SectionHeader } from "@/components/ui-bits";
import { useStore } from "@/lib/store";
import { RANKS } from "@/lib/data/ranks";
import { EQUIPMENT } from "@/lib/data/equipment";

export const Route = createFileRoute("/lernen/")({
  head: () => ({
    meta: [
      { title: "Lernen — AGA Trainer" },
      { name: "description", content: "Lerninhalte zur Allgemeinen Grundausbildung: Dienstgrade, Ausrüstung, Regeln." },
    ],
  }),
  component: LernenIndex,
});

function LernenIndex() {
  const viewedRanks = useStore((s) => s.viewedRanks);
  const viewedEquipment = useStore((s) => s.viewedEquipment);

  const topics = [
    {
      to: "/lernen/themen",
      icon: BookMarked,
      title: "Themen der AGA",
      hint: "Recht, Sanitätsdienst, Waffen, Gefechtsdienst, Fernmelde, Innere Führung",
    },
    {
      to: "/lernen/dienstgrade",
      icon: Award,
      title: "Dienstgrade",
      hint: "Mannschaften, Unteroffiziere, Offiziere, Generale",
      progress: `${viewedRanks.length} / ${RANKS.length}`,
    },
    {
      to: "/lernen/ausruestung",
      icon: Backpack,
      title: "Ausrüstung",
      hint: "Kampfrucksack, Helm, ABC-Schutz, mehr",
      progress: `${viewedEquipment.length} / ${EQUIPMENT.length}`,
    },
    {
      to: "/lernen/kampfrucksack",
      icon: Package,
      title: "Kampfrucksack packen",
      hint: "Packreihenfolge, Gewichtsverteilung",
    },
    {
      to: "/lernen/natopaeckchen",
      icon: BookOpen,
      title: "NATO-Päckchen",
      hint: "Inhalt, Aufbau, Vorbereitung",
    },
    {
      to: "/lernen/abcmaske",
      icon: Shield,
      title: "ABC-Schutzmaske",
      hint: "Anlegen in unter 9 Sekunden — mit Video",
    },
    {
      to: "/lernen/regeln",
      icon: ScrollText,
      title: "Allgemeine Regeln",
      hint: "Meldewesen, Auftreten, Sicherheit",
    },
    {
      to: "/rechner",
      icon: Crosshair,
      title: "Ballistik-Rechner",
      hint: "Kaliber, Distanz, Wind, Neigung",
    },
  ];

  return (
    <AppShell>
      <TopBar title="Lernen" subtitle="Themen der Allgemeinen Grundausbildung" />
      <div className="px-5 pt-5 space-y-3">
        <SectionHeader title="Themenbereiche" />
        {topics.map((t) => (
          <Link key={t.to} to={t.to} className="press block">
            <Card className="p-4 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-mil-pale grid place-items-center text-mil shrink-0">
                <t.icon className="size-6" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{t.title}</p>
                <p className="text-xs text-ink-mute truncate">{t.hint}</p>
              </div>
              {t.progress && (
                <span className="text-[11px] font-mono text-mil bg-mil-pale px-2 py-1 rounded shrink-0">
                  {t.progress}
                </span>
              )}
              <ChevronRight className="size-5 text-ink-mute shrink-0" />
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
