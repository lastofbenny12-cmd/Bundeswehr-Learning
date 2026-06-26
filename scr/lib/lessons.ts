export type Question = {
  q: string;
  options: string[];
  answer: number; // index
  hint?: string;
};

export type Lesson = {
  id: string;
  title: string;
  kind: "quiz" | "memory";
  xp: number;
  questions?: Question[];
  pairs?: { a: string; b: string }[];
};

export type Module = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
};

export const MODULES: Module[] = [
  {
    id: "dienstgrade",
    code: "MODUL 01",
    title: "Dienstgrade & Abzeichen",
    subtitle: "Mannschaften bis Generale erkennen",
    lessons: [
      {
        id: "d1",
        title: "Mannschaften",
        kind: "quiz",
        xp: 10,
        questions: [
          { q: "Welcher Dienstgrad ist der niedrigste?", options: ["Gefreiter", "Schütze", "Obergefreiter", "Hauptgefreiter"], answer: 1 },
          { q: "Was steht über dem Gefreiten?", options: ["Schütze", "Obergefreiter", "Stabsgefreiter", "Korporal"], answer: 1 },
          { q: "Wie viele Winkel hat das Abzeichen eines Hauptgefreiten?", options: ["Einer", "Zwei", "Drei", "Vier"], answer: 2 },
          { q: "Welcher Dienstgrad ist KEIN Mannschaftsdienstgrad?", options: ["Gefreiter", "Obergefreiter", "Unteroffizier", "Stabsgefreiter"], answer: 2 },
        ],
      },
      {
        id: "d2",
        title: "Unteroffiziere",
        kind: "quiz",
        xp: 15,
        questions: [
          { q: "Was steht über dem Unteroffizier?", options: ["Stabsunteroffizier", "Feldwebel", "Oberfeldwebel", "Stabsfeldwebel"], answer: 0 },
          { q: "Welcher Dienstgrad gehört zu den Feldwebeln?", options: ["Korporal", "Hauptfeldwebel", "Hauptgefreiter", "Leutnant"], answer: 1 },
          { q: "Höchster Unteroffiziersdienstgrad?", options: ["Stabsfeldwebel", "Oberstabsfeldwebel", "Hauptfeldwebel", "Oberfeldwebel"], answer: 1 },
        ],
      },
      {
        id: "d3",
        title: "Memory: Rang & Abzeichen",
        kind: "memory",
        xp: 20,
        pairs: [
          { a: "Gefreiter", b: "1 Winkel" },
          { a: "Obergefreiter", b: "2 Winkel" },
          { a: "Hauptgefreiter", b: "3 Winkel" },
          { a: "Stabsgefreiter", b: "4 Winkel" },
          { a: "Unteroffizier", b: "Litze + 1 Stern" },
          { a: "Feldwebel", b: "Litze + 2 Sterne" },
        ],
      },
      {
        id: "d4",
        title: "Offiziere",
        kind: "quiz",
        xp: 20,
        questions: [
          { q: "Niedrigster Offiziersdienstgrad?", options: ["Hauptmann", "Leutnant", "Oberleutnant", "Major"], answer: 1 },
          { q: "Was steht zwischen Major und Oberst?", options: ["Oberstleutnant", "Hauptmann", "General", "Brigadegeneral"], answer: 0 },
          { q: "Höchster Generalsdienstgrad in Friedenszeiten?", options: ["Brigadegeneral", "Generalmajor", "General", "Generalleutnant"], answer: 2 },
          { q: "Welches Abzeichen trägt ein Hauptmann?", options: ["1 Stern", "2 Sterne", "3 Sterne", "4 Sterne"], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "abc",
    code: "MODUL 02",
    title: "ABC-Schutz",
    subtitle: "Atomare, biologische, chemische Gefahren",
    lessons: [
      {
        id: "a1",
        title: "Grundbegriffe",
        kind: "quiz",
        xp: 15,
        questions: [
          { q: "Wofür steht ABC?", options: ["Atomar, biologisch, chemisch", "Allgemein, biologisch, chemisch", "Atomar, bakteriell, civil", "Air, bio, chem"], answer: 0 },
          { q: "Welches Schutzgerät schützt die Atemwege?", options: ["Helm", "Schutzmaske", "Schutzanzug", "Handschuhe"], answer: 1 },
          { q: "Wie lange darf die Schutzmaske maximal anlegt werden im Notfall?", options: ["2 Sekunden", "9 Sekunden", "30 Sekunden", "1 Minute"], answer: 1 },
        ],
      },
      {
        id: "a2",
        title: "Schutzmaske anlegen",
        kind: "quiz",
        xp: 20,
        questions: [
          { q: "Erster Schritt beim Anlegen?", options: ["Helm absetzen", "Luft anhalten", "Augen schließen", "Brille abnehmen"], answer: 1 },
          { q: "Wie wird die Dichtheit geprüft?", options: ["Atemzug halten", "Filter abdecken und einatmen", "Wasser einfüllen", "Gar nicht"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "ersthilfe",
    code: "MODUL 03",
    title: "Erste Hilfe",
    subtitle: "Lebensrettende Sofortmaßnahmen",
    lessons: [
      {
        id: "e1",
        title: "Notruf & Rettungskette",
        kind: "quiz",
        xp: 15,
        questions: [
          { q: "Militärische Notrufnummer im Inland?", options: ["110", "112", "0800-1100", "Sanitäter über Funk"], answer: 1 },
          { q: "Wie lautet das Schema der 5 W-Fragen NICHT?", options: ["Wo", "Was", "Wer", "Warum"], answer: 3 },
        ],
      },
      {
        id: "e2",
        title: "Stabile Seitenlage",
        kind: "quiz",
        xp: 15,
        questions: [
          { q: "Wann stabile Seitenlage?", options: ["Bewusstlos & atmet", "Bewusstlos & atmet nicht", "Stark blutend", "Verbrennung"], answer: 0 },
          { q: "Was wird kontrolliert nach Lagerung?", options: ["Puls am Hals", "Atmung", "Reflexe", "Hautfarbe"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "waffen",
    code: "MODUL 04",
    title: "Waffen- & Schießausbildung",
    subtitle: "G36, Sicherheitsregeln, Pflege",
    lessons: [
      {
        id: "w1",
        title: "Sicherheitsregeln",
        kind: "quiz",
        xp: 20,
        questions: [
          { q: "Erste Sicherheitsregel?", options: ["Jede Waffe ist als geladen zu betrachten", "Finger weg vom Abzug", "Immer absichern", "Niemals auf Personen richten"], answer: 0 },
          { q: "Wann wird die Waffe entladen geprüft?", options: ["Bei Übernahme", "Nach jedem Schuss", "Nur abends", "Nie"], answer: 0 },
        ],
      },
      {
        id: "w2",
        title: "Sturmgewehr G36",
        kind: "quiz",
        xp: 25,
        questions: [
          { q: "Kaliber des G36?", options: ["7,62×51 mm", "5,56×45 mm", "9×19 mm", "5,45×39 mm"], answer: 1 },
          { q: "Magazinkapazität (Standard)?", options: ["20", "25", "30", "40"], answer: 2 },
          { q: "Maximale Kampfentfernung G36 (ungefähr)?", options: ["200 m", "400 m", "600 m", "800 m"], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "innere",
    code: "MODUL 05",
    title: "Innere Führung",
    subtitle: "Staatsbürger in Uniform",
    lessons: [
      {
        id: "i1",
        title: "Grundwerte",
        kind: "quiz",
        xp: 20,
        questions: [
          { q: "Leitbild der Bundeswehr?", options: ["Soldat als Befehlsempfänger", "Staatsbürger in Uniform", "Krieger im Dienst", "Beamter mit Waffe"], answer: 1 },
          { q: "Höchstes Rechtsgut nach GG?", options: ["Eigentum", "Menschenwürde", "Sicherheit", "Freiheit"], answer: 1 },
          { q: "Wann darf ein Befehl verweigert werden?", options: ["Nie", "Bei Müdigkeit", "Wenn er gegen die Menschenwürde verstößt", "Auf Wunsch"], answer: 2 },
        ],
      },
    ],
  },
];

export const RANKS = [
  { code: "S", name: "Schütze", xp: 0 },
  { code: "G", name: "Gefreiter", xp: 100 },
  { code: "OG", name: "Obergefreiter", xp: 250 },
  { code: "HG", name: "Hauptgefreiter", xp: 500 },
  { code: "SG", name: "Stabsgefreiter", xp: 800 },
  { code: "U", name: "Unteroffizier", xp: 1200 },
  { code: "SU", name: "Stabsunteroffizier", xp: 1700 },
  { code: "F", name: "Feldwebel", xp: 2300 },
  { code: "OF", name: "Oberfeldwebel", xp: 3000 },
  { code: "HF", name: "Hauptfeldwebel", xp: 4000 },
  { code: "L", name: "Leutnant", xp: 5500 },
  { code: "OL", name: "Oberleutnant", xp: 7500 },
  { code: "H", name: "Hauptmann", xp: 10000 },
];

export function getRank(xp: number) {
  let current = RANKS[0];
  let next = RANKS[1];
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].xp) {
      current = RANKS[i];
      next = RANKS[i + 1] ?? RANKS[i];
    }
  }
  return { current, next };
}

export const ALL_LESSONS = MODULES.flatMap((m) => m.lessons.map((l) => ({ moduleId: m.id, ...l })));
