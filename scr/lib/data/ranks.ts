export type RankCategory =
  | "mannschaften"
  | "unteroffiziere"
  | "feldwebel"
  | "leutnante"
  | "stabsoffiziere"
  | "generale"
  | "sanitaet";

export type Rank = {
  id: string;
  name: string;
  short: string;
  anrede: string;
  laufbahn: string;
  category: RankCategory;
  order: number; // hierarchy index
  description: string;
  notes?: string[];
  badge: {
    bg: "olive" | "silver" | "gold" | "darkgreen";
    chevrons?: number; // for Mannschaften
    stars?: number; // Offiziere
    pips?: number; // Feldwebel diamonds
    bar?: number; // Generale crossed batons
    laced?: boolean; // Portepee laces (Feldwebel)
  };
};

export const RANK_CATEGORIES: { id: RankCategory; label: string; sub: string }[] = [
  { id: "mannschaften", label: "Mannschaften", sub: "Schütze bis Oberstabsgefreiter" },
  { id: "unteroffiziere", label: "Unteroffiziere o. P.", sub: "Unteroffizier, Stabsunteroffizier" },
  { id: "feldwebel", label: "Feldwebel", sub: "Feldwebel bis Oberstabsfeldwebel" },
  { id: "leutnante", label: "Leutnante", sub: "Leutnant, Oberleutnant" },
  { id: "stabsoffiziere", label: "Hauptleute & Stabsoffiziere", sub: "Hauptmann bis Oberst" },
  { id: "generale", label: "Generale", sub: "Brigadegeneral bis General" },
  { id: "sanitaet", label: "Sanitätsdienst", sub: "Ärztliche Dienstgrade" },
];

export const RANKS: Rank[] = [
  // Mannschaften
  {
    id: "schuetze",
    name: "Schütze",
    short: "Schtz",
    anrede: "Soldat / Schütze",
    laufbahn: "Mannschaften",
    category: "mannschaften",
    order: 1,
    description:
      "Niedrigster Dienstgrad der Bundeswehr. Der Schütze ist Soldat in der Allgemeinen Grundausbildung oder im ersten Verwendungsabschnitt.",
    notes: ["Truppengattungsbezogen auch: Funker, Pionier, Jäger, Kanonier, Panzerschütze."],
    badge: { bg: "olive" },
  },
  {
    id: "gefreiter",
    name: "Gefreiter",
    short: "Gefr",
    anrede: "Herr Gefreiter / Frau Gefreite",
    laufbahn: "Mannschaften",
    category: "mannschaften",
    order: 2,
    description: "Erster Beförderungsdienstgrad nach dem Schützen.",
    badge: { bg: "olive", chevrons: 1 },
  },
  {
    id: "obergefreiter",
    name: "Obergefreiter",
    short: "OGefr",
    anrede: "Herr Obergefreiter",
    laufbahn: "Mannschaften",
    category: "mannschaften",
    order: 3,
    description: "Mannschaftsdienstgrad mit zwei Winkeln.",
    badge: { bg: "olive", chevrons: 2 },
  },
  {
    id: "hauptgefreiter",
    name: "Hauptgefreiter",
    short: "HGefr",
    anrede: "Herr Hauptgefreiter",
    laufbahn: "Mannschaften",
    category: "mannschaften",
    order: 4,
    description: "Mannschaftsdienstgrad mit drei Winkeln.",
    badge: { bg: "olive", chevrons: 3 },
  },
  {
    id: "stabsgefreiter",
    name: "Stabsgefreiter",
    short: "StGefr",
    anrede: "Herr Stabsgefreiter",
    laufbahn: "Mannschaften",
    category: "mannschaften",
    order: 5,
    description: "Höherer Mannschaftsdienstgrad mit vier Winkeln.",
    badge: { bg: "olive", chevrons: 4 },
  },
  {
    id: "oberstabsgefreiter",
    name: "Oberstabsgefreiter",
    short: "OStGefr",
    anrede: "Herr Oberstabsgefreiter",
    laufbahn: "Mannschaften",
    category: "mannschaften",
    order: 6,
    description: "Höchster Mannschaftsdienstgrad. Erfahrener Soldat in spezialisierter Verwendung.",
    badge: { bg: "olive", chevrons: 5 },
  },

  // Unteroffiziere
  {
    id: "unteroffizier",
    name: "Unteroffizier",
    short: "Uffz",
    anrede: "Herr Unteroffizier",
    laufbahn: "Unteroffiziere ohne Portepee",
    category: "unteroffiziere",
    order: 7,
    description: "Erster Unteroffiziersdienstgrad. Übernimmt erste Führungsaufgaben.",
    badge: { bg: "silver", chevrons: 1 },
  },
  {
    id: "stabsunteroffizier",
    name: "Stabsunteroffizier",
    short: "StUffz",
    anrede: "Herr Stabsunteroffizier",
    laufbahn: "Unteroffiziere ohne Portepee",
    category: "unteroffiziere",
    order: 8,
    description: "Höherer Unteroffizier ohne Portepee.",
    badge: { bg: "silver", chevrons: 2 },
  },

  // Feldwebel
  {
    id: "feldwebel",
    name: "Feldwebel",
    short: "Fw",
    anrede: "Herr Feldwebel",
    laufbahn: "Unteroffiziere mit Portepee",
    category: "feldwebel",
    order: 9,
    description: "Erster Feldwebeldienstgrad mit Portepee. Truppführer, Ausbilder.",
    badge: { bg: "silver", pips: 1, laced: true },
  },
  {
    id: "oberfeldwebel",
    name: "Oberfeldwebel",
    short: "OFw",
    anrede: "Herr Oberfeldwebel",
    laufbahn: "Unteroffiziere mit Portepee",
    category: "feldwebel",
    order: 10,
    description: "Erfahrener Truppführer in Zug oder Gruppe.",
    badge: { bg: "silver", pips: 2, laced: true },
  },
  {
    id: "hauptfeldwebel",
    name: "Hauptfeldwebel",
    short: "HFw",
    anrede: "Herr Hauptfeldwebel",
    laufbahn: "Unteroffiziere mit Portepee",
    category: "feldwebel",
    order: 11,
    description: "Erfüllt anspruchsvolle Führungs- und Ausbildungsaufgaben.",
    badge: { bg: "silver", pips: 3, laced: true },
  },
  {
    id: "stabsfeldwebel",
    name: "Stabsfeldwebel",
    short: "StFw",
    anrede: "Herr Stabsfeldwebel",
    laufbahn: "Unteroffiziere mit Portepee",
    category: "feldwebel",
    order: 12,
    description: "Erfahrener Feldwebel in herausgehobener Verwendung.",
    badge: { bg: "silver", pips: 4, laced: true },
  },
  {
    id: "oberstabsfeldwebel",
    name: "Oberstabsfeldwebel",
    short: "OStFw",
    anrede: "Herr Oberstabsfeldwebel",
    laufbahn: "Unteroffiziere mit Portepee",
    category: "feldwebel",
    order: 13,
    description: "Höchster Feldwebeldienstgrad.",
    badge: { bg: "silver", pips: 5, laced: true },
  },

  // Leutnante
  {
    id: "leutnant",
    name: "Leutnant",
    short: "Lt",
    anrede: "Herr Leutnant",
    laufbahn: "Offiziere",
    category: "leutnante",
    order: 14,
    description: "Erster Offiziersdienstgrad. Zugführer in der Truppe.",
    badge: { bg: "gold", stars: 1 },
  },
  {
    id: "oberleutnant",
    name: "Oberleutnant",
    short: "OLt",
    anrede: "Herr Oberleutnant",
    laufbahn: "Offiziere",
    category: "leutnante",
    order: 15,
    description: "Offizier mit Erfahrung als Zug- oder stellvertretender Kompaniechef.",
    badge: { bg: "gold", stars: 2 },
  },

  // Hauptleute & Stabsoffiziere
  {
    id: "hauptmann",
    name: "Hauptmann",
    short: "Hptm",
    anrede: "Herr Hauptmann",
    laufbahn: "Offiziere",
    category: "stabsoffiziere",
    order: 16,
    description: "In der Regel Kompaniechef. Erster Stabsoffiziersanwärterdienstgrad.",
    badge: { bg: "gold", stars: 3 },
  },
  {
    id: "major",
    name: "Major",
    short: "Maj",
    anrede: "Herr Major",
    laufbahn: "Stabsoffiziere",
    category: "stabsoffiziere",
    order: 17,
    description: "Erster Stabsoffiziersdienstgrad.",
    badge: { bg: "gold", stars: 1, laced: true },
  },
  {
    id: "oberstleutnant",
    name: "Oberstleutnant",
    short: "OTL",
    anrede: "Herr Oberstleutnant",
    laufbahn: "Stabsoffiziere",
    category: "stabsoffiziere",
    order: 18,
    description: "Bataillonskommandeur oder Dezernent im Stab.",
    badge: { bg: "gold", stars: 2, laced: true },
  },
  {
    id: "oberst",
    name: "Oberst",
    short: "O",
    anrede: "Herr Oberst",
    laufbahn: "Stabsoffiziere",
    category: "stabsoffiziere",
    order: 19,
    description: "Regiments- oder Brigadekommandeur, Stabsabteilungsleiter.",
    badge: { bg: "gold", stars: 3, laced: true },
  },

  // Generale
  {
    id: "brigadegeneral",
    name: "Brigadegeneral",
    short: "BrigGen",
    anrede: "Herr General",
    laufbahn: "Generale",
    category: "generale",
    order: 20,
    description: "Erster Generalsdienstgrad. Brigadekommandeur oder Abteilungsleiter.",
    badge: { bg: "gold", stars: 1, bar: 2 },
  },
  {
    id: "generalmajor",
    name: "Generalmajor",
    short: "GenMaj",
    anrede: "Herr General",
    laufbahn: "Generale",
    category: "generale",
    order: 21,
    description: "Divisionskommandeur oder vergleichbare Verwendung.",
    badge: { bg: "gold", stars: 2, bar: 2 },
  },
  {
    id: "generalleutnant",
    name: "Generalleutnant",
    short: "GenLt",
    anrede: "Herr General",
    laufbahn: "Generale",
    category: "generale",
    order: 22,
    description: "Korpskommandeur, Inspekteur einer Teilstreitkraft.",
    badge: { bg: "gold", stars: 3, bar: 2 },
  },
  {
    id: "general",
    name: "General",
    short: "Gen",
    anrede: "Herr General",
    laufbahn: "Generale",
    category: "generale",
    order: 23,
    description: "Höchster Generalsdienstgrad. Generalinspekteur oder vergleichbare Funktion.",
    badge: { bg: "gold", stars: 4, bar: 2 },
  },

  // Sanität (Auswahl)
  {
    id: "stabsarzt",
    name: "Stabsarzt",
    short: "StArzt",
    anrede: "Herr Stabsarzt",
    laufbahn: "Sanitätsdienst",
    category: "sanitaet",
    order: 24,
    description: "Approbierter Arzt im Sanitätsdienst, entspricht dem Hauptmann.",
    badge: { bg: "darkgreen", stars: 3 },
  },
  {
    id: "oberstabsarzt",
    name: "Oberstabsarzt",
    short: "OStArzt",
    anrede: "Herr Oberstabsarzt",
    laufbahn: "Sanitätsdienst",
    category: "sanitaet",
    order: 25,
    description: "Erfahrener Sanitätsoffizier, entspricht dem Major.",
    badge: { bg: "darkgreen", stars: 1, laced: true },
  },
];

export function rankById(id: string) {
  return RANKS.find((r) => r.id === id);
}

export function ranksByCategory(cat: RankCategory) {
  return RANKS.filter((r) => r.category === cat).sort((a, b) => a.order - b.order);
}
