import {
  Backpack,
  HardHat,
  Droplet,
  Utensils,
  Moon,
  CloudRain,
  ShieldAlert,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Equipment = {
  id: string;
  name: string;
  short: string;
  icon: LucideIcon;
  description: string;
  usage: string;
  notes: string[];
};

export const EQUIPMENT: Equipment[] = [
  {
    id: "kampfrucksack",
    name: "Kampfrucksack",
    short: "Marschgepäck für Übungen und Einsatz",
    icon: Backpack,
    description:
      "Tragesystem für persönliche Ausrüstung und Versorgungsmittel. Standard sind ca. 75–100 Liter Volumen.",
    usage:
      "Wird im Marsch, bei Übungen und im Einsatz getragen. Aufnahme von NATO-Päckchen, Nässeschutz, Verpflegung, Wasser und Sanitätsmaterial.",
    notes: [
      "Gewicht eng am Körper und nah am Rücken halten.",
      "Schweres Material mittig auf Schulterhöhe packen.",
      "Häufig benötigte Teile in obere Fächer.",
    ],
  },
  {
    id: "gefechtshelm",
    name: "Gefechtshelm",
    short: "Schutz von Kopf und Hör­bereich",
    icon: HardHat,
    description:
      "Aramid- oder Composite-Helm mit Innenausstattung, Kinnriemen und Tarnbezug. Schützt vor Splittern und mechanischen Einwirkungen.",
    usage: "Wird im Gefechtsdienst, bei Übungen und stets bei scharfem Schuss getragen.",
    notes: [
      "Kinnriemen straff anlegen, Verschluss links.",
      "Sitz vor jeder Übung prüfen.",
      "Nicht ohne Tarnbezug tragen.",
    ],
  },
  {
    id: "feldflasche",
    name: "Feldflasche",
    short: "Wasserversorgung im Einsatz",
    icon: Droplet,
    description:
      "Kunststoff-Feldflasche, ca. 1 Liter, mit Trageschlaufe oder Trinkbecher. Teil der Grundausstattung.",
    usage: "Wasserversorgung bei Marsch und Übung. Mindestens eine Feldflasche immer mitführen.",
    notes: [
      "Vor und nach Übung gründlich reinigen.",
      "Bei Frost umgedreht im Köcher tragen.",
    ],
  },
  {
    id: "kochgeschirr",
    name: "Kochgeschirr",
    short: "Geschirr für EPa und Heißgetränke",
    icon: Utensils,
    description:
      "Mehrteiliges Kochgeschirr aus Aluminium. Topf, Pfanne/Deckel, Einsatz; teilweise mit Tasse.",
    usage: "Zubereitung von Einmannpackungen (EPa), Heißgetränken; auch als Essgeschirr.",
    notes: [
      "Nach jedem Gebrauch reinigen.",
      "Nicht über offenes Feuer ohne Aufsicht.",
    ],
  },
  {
    id: "schlafsack",
    name: "Schlafsack",
    short: "Wärmeerhalt bei Biwak",
    icon: Moon,
    description:
      "Modular aufgebauter Schlafsack (Innen-/Außensack). Zugelassen für unterschiedliche Temperaturbereiche.",
    usage: "Biwak, mehrtägige Übungen, Feldlager. Mit Nässeschutz koppelbar.",
    notes: [
      "Trocken halten — Feuchtigkeit zerstört die Isolation.",
      "Innenseiteumstülpen und lüften nach Gebrauch.",
    ],
  },
  {
    id: "naesseschutz",
    name: "Nässeschutz",
    short: "Jacke, Hose, Überzug",
    icon: CloudRain,
    description:
      "Wasserabweisende Zusatzbekleidung — Jacke, Hose, ggf. Rucksacküberzug.",
    usage: "Bei Niederschlag oder Schnee. Über Felddienstanzug zu tragen.",
    notes: ["Imprägnierung regelmäßig prüfen.", "Reißverschlüsse und Klett offen lagern."],
  },
  {
    id: "abc-schutzmaske",
    name: "ABC-Schutzmaske",
    short: "Atemschutz vor atomaren, biologischen, chemischen Gefahren",
    icon: ShieldAlert,
    description:
      "Vollsicht-Schutzmaske mit Filteranschluss. Schützt Atemwege, Augen und Gesicht.",
    usage:
      "Sofortiges Anlegen auf das Kommando 'ABC-Alarm' (Schutzzeit: 9 Sekunden). Wird immer am Körper getragen.",
    notes: [
      "Dichtsitz vor jedem Tragen prüfen.",
      "Filter trocken und stoßgeschützt lagern.",
      "Verfallsdatum des Filters beachten.",
    ],
  },
  {
    id: "persoenliche-ausruestung",
    name: "Persönliche Ausrüstung",
    short: "Multitool, Stirnlampe, Erkennungsmarke",
    icon: Wrench,
    description:
      "Sammelbegriff für individuelle Ausrüstungsteile: Erkennungsmarke, Stirnlampe, Multitool, Notizblock, Karten, Kompass.",
    usage: "Ergänzt die ausgegebene Standardausrüstung. Stets am Mann.",
    notes: ["Erkennungsmarke immer tragen.", "Stirnlampe mit Rotlicht-Modus bevorzugen."],
  },
];

export function equipmentById(id: string) {
  return EQUIPMENT.find((e) => e.id === id);
}
