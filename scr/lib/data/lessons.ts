export type LessonSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  steps?: { title: string; text: string }[];
};

export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  videoUrl?: string;
  sections: LessonSection[];
  checklist?: string[];
  tips?: string[];
};

export const LESSONS: Record<string, Lesson> = {
  kampfrucksack: {
    id: "kampfrucksack",
    title: "Kampfrucksack packen",
    subtitle: "Packreihenfolge, Gewichtsverteilung, häufige Fehler",
    intro:
      "Ein korrekt gepackter Rucksack entscheidet im Marsch über Leistungsfähigkeit und Schonung des Bewegungsapparats. Die folgende Reihenfolge ist die in der Truppe übliche Faustregel.",
    videoUrl: "https://youtu.be/YrSzW62JKc0",
    sections: [
      {
        heading: "Grundregeln",
        bullets: [
          "Schweres nah am Rücken, mittig auf Schulterhöhe.",
          "Leichtes voluminöses Material (Schlafsack) nach unten.",
          "Häufig benötigtes Material nach oben oder in Außentaschen.",
          "Wasser-/Nässeschutz immer griffbereit halten.",
        ],
      },
      {
        heading: "Packreihenfolge",
        steps: [
          { title: "1. Schlafsack", text: "Im Packsack ganz unten im Rucksack verstauen." },
          { title: "2. Wechselbekleidung & Wäsche", text: "In wasserdichten Tüten über dem Schlafsack lagern." },
          { title: "3. NATO-Päckchen / Hygiene", text: "Zentral und gut erreichbar packen." },
          { title: "4. Verpflegung (EPa)", text: "Im mittleren Bereich, körpernah und stabil." },
          { title: "5. Nässeschutz", text: "Im oberen Bereich oder Deckelfach — sofort greifbar." },
          { title: "6. Kleinteile", text: "Stirnlampe, Multitool, Notizmaterial in die Außenfächer." },
        ],
      },
      {
        heading: "Häufige Fehler",
        bullets: [
          "Schweres unten und außen → Rucksack zieht nach hinten.",
          "Nässeschutz tief vergraben → bei Regen nicht erreichbar.",
          "Lose Riemen → Material schlägt, Schwerpunkt wandert.",
          "Überladen über das vorgegebene Gewicht hinaus.",
        ],
      },
    ],
    checklist: [
      "Schlafsack unten",
      "Wechselwäsche wasserdicht verpackt",
      "Verpflegung mittig",
      "Nässeschutz oben/außen",
      "Alle Riemen festgezogen",
      "Erkennungsmarke und Ausweis am Mann",
    ],
    tips: [
      "Vor dem Marsch 5 Minuten Probetragen — Sitz korrigieren.",
      "Im Zweifel: weglassen statt mitschleppen.",
    ],
  },
  natopaeckchen: {
    id: "natopaeckchen",
    title: "NATO-Päckchen",
    subtitle: "Bedeutung, Inhalt, Vorbereitung",
    intro:
      "Das 'NATO-Päckchen' ist ein einsatzbereit gerolltes Set persönlicher Hygiene- und Wäscheartikel. Es ermöglicht eine schnelle Übergabe und einheitliche Vorzeigbarkeit beim Antreten.",
    videoUrl: "https://youtu.be/Ln2v-0vM3k0",
    sections: [
      {
        heading: "Standardinhalt",
        bullets: [
          "1 Garnitur Unterwäsche",
          "1 Paar Socken",
          "1 Unterhemd",
          "Waschlappen, Seife, Zahnbürste, Zahnpasta",
          "Handtuch (klein) als äußere Rolle",
        ],
      },
      {
        heading: "Aufbau",
        steps: [
          { title: "1. Auslegen", text: "Handtuch quer auf glatter Fläche ausbreiten." },
          { title: "2. Wäsche schichten", text: "Unterhemd, Unterhose, Socken plan auflegen." },
          { title: "3. Hygiene mittig", text: "Waschlappen mit Seife und Zahnpflege mittig platzieren." },
          { title: "4. Straff rollen", text: "Von einer Schmalseite straff aufrollen — keine Falten." },
          { title: "5. Sichern", text: "Mit Gummi oder Schnur fixieren. Maße: kompakt, ca. 25–30 cm." },
        ],
      },
      {
        heading: "Verwendung",
        body:
          "Beim Antreten zur Stubenkontrolle, im Marschgepäck oder zur kurzfristigen Übergabe — wer ein sauber gerolltes NATO-Päckchen führt, ist marschbereit.",
      },
    ],
    checklist: [
      "Inhalt vollständig und sauber",
      "Straff gerollt, keine sichtbaren Falten",
      "Mit Gummi/Schnur gesichert",
      "Maximalgröße eingehalten",
    ],
    tips: [
      "Zweites Päckchen einsatzbereit im Spind halten.",
      "Verschmutzte Wäsche niemals einrollen.",
    ],
  },
  abcmaske: {
    id: "abcmaske",
    title: "ABC-Schutzmaske anlegen",
    subtitle: "Sitz, Dichtprobe, Atmung",
    intro:
      "Die ABC-Schutzmaske gehört zur persönlichen Schutzausrüstung. Das korrekte Anlegen in unter 9 Sekunden ist Prüfungsbestandteil der AGA.",
    videoUrl: "https://youtu.be/lJMIGIHmJN0",
    sections: [
      {
        heading: "Anlegen in Sekunden",
        steps: [
          { title: "1. Luft anhalten & Augen schließen", text: "Vor dem Aufsetzen Atem anhalten." },
          { title: "2. Kopfbedeckung ab", text: "Helm/Mütze absetzen, in der Achsel klemmen." },
          { title: "3. Maske greifen", text: "Mit beiden Händen an den Bändern aus der Tasche ziehen." },
          { title: "4. Kinn zuerst", text: "Kinn in die Maske, Tragebänder über den Kopf streifen." },
          { title: "5. Dichtprobe", text: "Filteröffnung verschließen, einatmen — Maske muss sich anlegen." },
          { title: "6. Ausblasen & freigeben", text: "Kräftig ausatmen, Filter freigeben, Helm wieder auf." },
        ],
      },
      {
        heading: "Sitz prüfen",
        bullets: [
          "Keine Haare oder Stoff unter der Dichtlippe.",
          "Bänder gleichmäßig stramm.",
          "Brille mit Spezialhalterung — keine normale Brille.",
          "Sichtscheiben frei von Beschlag.",
        ],
      },
    ],
    checklist: [
      "Maske einsatzbereit in der Tasche",
      "Filter geprüft und unbenutzt",
      "Dichtprobe erfolgreich",
      "Maskentasche korrekt am Koppel",
    ],
    tips: [
      "Übe das Anlegen täglich — Routine entscheidet im Ernstfall.",
      "Filterwechsel nach Vorschrift, nie improvisieren.",
    ],
  },
  regeln: {
    id: "regeln",
    title: "Allgemeine Regeln & Innerer Dienst",
    subtitle: "Auftreten, Meldewesen, Verhalten gegenüber Vorgesetzten",
    intro:
      "Disziplin, Pünktlichkeit und ein klares Auftreten sind Grundlagen des soldatischen Dienstes. Die folgenden Regeln gelten vom ersten Tag der AGA an.",
    sections: [
      {
        heading: "Verhalten gegenüber Vorgesetzten",
        bullets: [
          "Beim Eintreten in einen Raum mit Vorgesetzten: Grußpflicht beachten.",
          "Außerhalb geschlossener Räume: Militärischer Gruß durch Anlegen der rechten Hand an die Kopfbedeckung.",
          "Beim Sprechen mit Vorgesetzten: Anrede mit Dienstgrad ('Herr/Frau …').",
          "Befehle werden mit 'Jawohl' bestätigt; Rückfragen sind erlaubt und erwünscht.",
        ],
      },
      {
        heading: "Meldewesen",
        body:
          "Eine Meldung besteht aus: Anrede, eigenem Dienstgrad und Namen, Anlass. Beispiel: 'Herr Hauptmann, Gefreiter Müller meldet sich zum Dienst.'",
        bullets: [
          "Kurz, sachlich, vollständig.",
          "Im Stehen, in Grundstellung.",
          "Abmeldung nach gleichem Schema.",
        ],
      },
      {
        heading: "Auftreten & Uniform",
        bullets: [
          "Uniform sauber, vollständig, ordnungsgemäß.",
          "Schuhwerk geputzt, Schnürsenkel ordentlich.",
          "Haare gemäß Haar- und Barterlass.",
          "Erkennungsmarke immer getragen.",
        ],
      },
      {
        heading: "Sicherheitsregeln",
        bullets: [
          "Jede Waffe ist grundsätzlich als geladen zu behandeln.",
          "Niemals den Lauf in unsichere Richtungen.",
          "Finger gerade am Abzugsbügel, bis das Ziel im Visier ist.",
          "Erkennen, was vor und hinter dem Ziel liegt.",
        ],
      },
    ],
    tips: [
      "Im Zweifel: höflich nachfragen statt raten.",
      "Kameradschaft schlägt Ellenbogen — Erfolge gehören dem Team.",
    ],
  },
};
