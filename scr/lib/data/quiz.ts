import { RANKS, rankById } from "./ranks";
import { EQUIPMENT } from "./equipment";

export type QuizQuestion =
  | {
      id: string;
      type: "mc";
      topic: QuizTopicId;
      prompt: string;
      options: string[];
      answer: number;
      explanation?: string;
    }
  | {
      id: string;
      type: "tf";
      topic: QuizTopicId;
      prompt: string;
      answer: boolean;
      explanation?: string;
    }
  | {
      id: string;
      type: "image"; // identify rank by badge
      topic: QuizTopicId;
      rankId: string;
      prompt: string;
      options: string[]; // rank names
      answer: number;
      explanation?: string;
    }
  | {
      id: string;
      type: "order"; // sort ranks low → high
      topic: QuizTopicId;
      prompt: string;
      items: string[]; // rank ids
      explanation?: string;
    }
  | {
      id: string;
      type: "match"; // map A → B
      topic: QuizTopicId;
      prompt: string;
      pairs: { a: string; b: string }[];
      explanation?: string;
    };

export type QuizTopic = {
  id: QuizTopicId;
  label: string;
  description: string;
  questions: QuizQuestion[];
};

export type QuizTopicId =
  | "dienstgrade-mannschaften"
  | "dienstgrade-unteroffiziere"
  | "dienstgrade-offiziere"
  | "dienstgrade-mix"
  | "ausruestung"
  | "regeln";

function pickWrong(correctId: string, n: number): string[] {
  const wrong = RANKS.filter((r) => r.id !== correctId);
  const out: string[] = [];
  while (out.length < n && wrong.length) {
    const idx = Math.floor(Math.random() * wrong.length);
    out.push(wrong.splice(idx, 1)[0].name);
  }
  return out;
}

function imgQ(rankId: string, prompt = "Welcher Dienstgrad ist abgebildet?"): QuizQuestion {
  const rank = rankById(rankId)!;
  const wrong = pickWrong(rankId, 3);
  const opts = [rank.name, ...wrong].sort(() => Math.random() - 0.5);
  return {
    id: `img-${rankId}`,
    type: "image",
    topic: "dienstgrade-mix",
    rankId,
    prompt,
    options: opts,
    answer: opts.indexOf(rank.name),
  };
}

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: "dienstgrade-mannschaften",
    label: "Dienstgrade — Mannschaften",
    description: "Schütze bis Oberstabsgefreiter",
    questions: [
      {
        id: "m1",
        type: "mc",
        topic: "dienstgrade-mannschaften",
        prompt: "Wie viele Winkel trägt ein Obergefreiter?",
        options: ["Einen", "Zwei", "Drei", "Vier"],
        answer: 1,
      },
      {
        id: "m2",
        type: "mc",
        topic: "dienstgrade-mannschaften",
        prompt: "Welche Anrede ist für einen Gefreiten korrekt?",
        options: ["Mein Gefreiter", "Herr Gefreiter", "Soldat", "Kamerad Gefreiter"],
        answer: 1,
        explanation: "Anrede mit 'Herr/Frau' + Dienstgradname.",
      },
      {
        id: "m3",
        type: "mc",
        topic: "dienstgrade-mannschaften",
        prompt: "Welcher Dienstgrad ist höher?",
        options: ["Hauptgefreiter", "Stabsgefreiter", "Obergefreiter", "Gefreiter"],
        answer: 1,
      },
      {
        id: "m4",
        type: "tf",
        topic: "dienstgrade-mannschaften",
        prompt: "Der Schütze ist der niedrigste Dienstgrad der Bundeswehr.",
        answer: true,
      },
      {
        id: "m5",
        type: "order",
        topic: "dienstgrade-mannschaften",
        prompt: "Sortiere von niedrig nach hoch.",
        items: ["schuetze", "gefreiter", "obergefreiter", "hauptgefreiter"],
      },
    ],
  },
  {
    id: "dienstgrade-unteroffiziere",
    label: "Dienstgrade — Unteroffiziere & Feldwebel",
    description: "Unteroffizier bis Oberstabsfeldwebel",
    questions: [
      {
        id: "u1",
        type: "mc",
        topic: "dienstgrade-unteroffiziere",
        prompt: "Welcher Dienstgrad ist der erste mit Portepee?",
        options: ["Stabsunteroffizier", "Feldwebel", "Hauptfeldwebel", "Unteroffizier"],
        answer: 1,
      },
      {
        id: "u2",
        type: "mc",
        topic: "dienstgrade-unteroffiziere",
        prompt: "Höchster Feldwebeldienstgrad?",
        options: ["Stabsfeldwebel", "Oberstabsfeldwebel", "Hauptfeldwebel", "Oberfeldwebel"],
        answer: 1,
      },
      {
        id: "u3",
        type: "match",
        topic: "dienstgrade-unteroffiziere",
        prompt: "Ordne den Dienstgrad der Laufbahngruppe zu.",
        pairs: [
          { a: "Unteroffizier", b: "ohne Portepee" },
          { a: "Feldwebel", b: "mit Portepee" },
          { a: "Leutnant", b: "Offizier" },
          { a: "Major", b: "Stabsoffizier" },
        ],
      },
      {
        id: "u4",
        type: "tf",
        topic: "dienstgrade-unteroffiziere",
        prompt: "Ein Stabsunteroffizier ist höher als ein Feldwebel.",
        answer: false,
        explanation: "Der Feldwebel ist höher.",
      },
    ],
  },
  {
    id: "dienstgrade-offiziere",
    label: "Dienstgrade — Offiziere & Generale",
    description: "Leutnant bis General",
    questions: [
      {
        id: "o1",
        type: "mc",
        topic: "dienstgrade-offiziere",
        prompt: "Niedrigster Offiziersdienstgrad?",
        options: ["Hauptmann", "Leutnant", "Oberleutnant", "Major"],
        answer: 1,
      },
      {
        id: "o2",
        type: "mc",
        topic: "dienstgrade-offiziere",
        prompt: "Welcher Dienstgrad steht zwischen Major und Oberst?",
        options: ["Hauptmann", "Oberstleutnant", "Brigadegeneral", "Oberleutnant"],
        answer: 1,
      },
      {
        id: "o3",
        type: "mc",
        topic: "dienstgrade-offiziere",
        prompt: "Anrede für einen Brigadegeneral?",
        options: ["Herr Brigadegeneral", "Herr General", "Mein General", "Herr Brigade"],
        answer: 1,
        explanation: "Generale werden mit 'Herr General' angesprochen.",
      },
      {
        id: "o4",
        type: "order",
        topic: "dienstgrade-offiziere",
        prompt: "Sortiere von niedrig nach hoch.",
        items: ["leutnant", "hauptmann", "major", "oberst"],
      },
      {
        id: "o5",
        type: "tf",
        topic: "dienstgrade-offiziere",
        prompt: "Ein Hauptmann ist ein Stabsoffizier.",
        answer: false,
        explanation: "Der Hauptmann zählt zu den Offizieren, nicht zu den Stabsoffizieren.",
      },
    ],
  },
  {
    id: "dienstgrade-mix",
    label: "Bild erkennen",
    description: "Abzeichen identifizieren",
    questions: [
      imgQ("gefreiter"),
      imgQ("hauptgefreiter"),
      imgQ("feldwebel"),
      imgQ("oberfeldwebel"),
      imgQ("leutnant"),
      imgQ("hauptmann"),
      imgQ("oberstleutnant"),
      imgQ("brigadegeneral"),
    ],
  },
  {
    id: "ausruestung",
    label: "Ausrüstung",
    description: "Kampfrucksack, ABC-Schutz, Feldausrüstung",
    questions: [
      {
        id: "a1",
        type: "mc",
        topic: "ausruestung",
        prompt: "Wie lange darf das Anlegen der ABC-Schutzmaske maximal dauern?",
        options: ["3 Sekunden", "9 Sekunden", "15 Sekunden", "30 Sekunden"],
        answer: 1,
      },
      {
        id: "a2",
        type: "mc",
        topic: "ausruestung",
        prompt: "Wo wird der Schlafsack im Kampfrucksack verstaut?",
        options: ["Im Deckelfach", "Ganz unten", "Außen am Rucksack", "Im obersten Drittel"],
        answer: 1,
      },
      {
        id: "a3",
        type: "tf",
        topic: "ausruestung",
        prompt: "Schweres Material gehört nah an den Rücken auf Schulterhöhe.",
        answer: true,
      },
      {
        id: "a4",
        type: "mc",
        topic: "ausruestung",
        prompt: "Was gehört NICHT in ein NATO-Päckchen?",
        options: ["Zahnbürste", "Unterhemd", "Schlafsack", "Socken"],
        answer: 2,
      },
      {
        id: "a5",
        type: "tf",
        topic: "ausruestung",
        prompt: "Der Gefechtshelm darf ohne Tarnbezug getragen werden.",
        answer: false,
      },
    ],
  },
  {
    id: "regeln",
    label: "Allgemeine Regeln",
    description: "Auftreten, Meldewesen, Sicherheit",
    questions: [
      {
        id: "r1",
        type: "mc",
        topic: "regeln",
        prompt: "Wie wird ein Befehl bestätigt?",
        options: ["'Verstanden.'", "'OK.'", "'Jawohl.'", "Mit einem Nicken."],
        answer: 2,
      },
      {
        id: "r2",
        type: "mc",
        topic: "regeln",
        prompt: "Welche der folgenden Aussagen ist eine Grundregel im Umgang mit Waffen?",
        options: [
          "Nur entladene Waffen sind sicher.",
          "Jede Waffe ist als geladen zu behandeln.",
          "Bei Üben Sicherung egal.",
          "Munition immer im Lauf.",
        ],
        answer: 1,
      },
      {
        id: "r3",
        type: "tf",
        topic: "regeln",
        prompt: "Pünktlich heißt: 5 Minuten vor dem befohlenen Zeitpunkt angetreten.",
        answer: true,
      },
      {
        id: "r4",
        type: "mc",
        topic: "regeln",
        prompt: "Was gehört zur korrekten Meldung?",
        options: [
          "Nur der Anlass.",
          "Dienstgrad, Name, Anlass.",
          "Nur der Name.",
          "Anrede und Anlass.",
        ],
        answer: 1,
      },
      {
        id: "r5",
        type: "match",
        topic: "regeln",
        prompt: "Ordne den Begriff der richtigen Bedeutung zu.",
        pairs: [
          { a: "Befehlsausgabe", b: "Auftragsverteilung" },
          { a: "Antreten", b: "Aufstellen in Formation" },
          { a: "Wegtreten", b: "Auflösen der Formation" },
          { a: "Meldung", b: "Förmliche Mitteilung" },
        ],
      },
    ],
  },
];

export const ALL_QUESTIONS: QuizQuestion[] = QUIZ_TOPICS.flatMap((t) => t.questions);

export function topicById(id: string) {
  return QUIZ_TOPICS.find((t) => t.id === id);
}

// Build an exam set: pick N random unique questions across topics.
export function buildExam(count = 20): QuizQuestion[] {
  const pool = [...ALL_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export const _EQUIP = EQUIPMENT; // re-export marker so tree-shaker keeps the data import alive when imported elsewhere
