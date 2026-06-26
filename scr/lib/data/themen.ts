export type Thema = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

export type ThemenKategorie = {
  id: string;
  title: string;
  subtitle: string;
  themen: Thema[];
};

export const THEMEN_KATEGORIEN: ThemenKategorie[] = [
  {
    id: "recht",
    title: "Recht & Soldatische Pflichten",
    subtitle: "SG, VorgV, WDO, WBO, Völkerrecht",
    themen: [
      {
        id: "sg-7",
        title: "SG § 7 — Treues Dienen",
        summary: "Pflicht zum treuen Dienen.",
        detail:
          "Soldaten müssen der Bundesrepublik Deutschland treu dienen und das Recht sowie die Freiheit des deutschen Volkes tapfer verteidigen.",
      },
      {
        id: "sg-11",
        title: "SG § 11 — Gehorsam",
        summary: "Pflicht zum Gehorsam.",
        detail:
          "Soldaten müssen Befehle der Vorgesetzten nach besten Kräften vollständig, gewissenhaft und unverzüglich ausführen, solange diese nicht die Menschenwürde verletzen oder Straftaten fordern.",
      },
      {
        id: "sg-12",
        title: "SG § 12 — Kameradschaft",
        summary: "Pflicht zur Kameradschaft.",
        detail:
          "Verpflichtet alle Soldaten, die Würde, Ehre und Rechte des anderen zu achten und sich in Not und Gefahr beizustehen.",
      },
      {
        id: "sg-17",
        title: "SG § 17 — Verschwiegenheit",
        summary: "Pflicht zur Verschwiegenheit.",
        detail:
          "Dienstliche Angelegenheiten, die als geheim oder vertraulich eingestuft sind, dürfen auch nach dem Dienstzeitende nicht an Dritte weitergegeben werden.",
      },
      {
        id: "vorgv",
        title: "Vorgesetztenverordnung (VorgV)",
        summary: "Regelung der Befehlsbefugnis.",
        detail:
          "Bestimmt genau, wer wem gegenüber Befehle erteilen darf — durch Dienstgrad, Dienststellung oder besondere Anordnung.",
      },
      {
        id: "wdo",
        title: "Wehrdisziplinarordnung (WDO)",
        summary: "Disziplinarrecht der Bundeswehr.",
        detail:
          "Regelt das Verfahren bei Dienstvergehen, die Ahndung durch Disziplinarmaßnahmen (z. B. Verweis, Geldbuße, Arrest) und die Rechte des Soldaten im Verfahren.",
      },
      {
        id: "wbo",
        title: "Wehrbeschwerdeordnung (WBO)",
        summary: "Beschwerderecht für Soldaten.",
        detail:
          "Jeder Soldat hat das Recht, sich über erlittenes Unrecht oder unzweckmäßige Maßnahmen zu beschweren, sofern der Dienstweg eingehalten wird.",
      },
      {
        id: "voelkerrecht",
        title: "Humanitäres Völkerrecht",
        summary: "Regeln für bewaffnete Konflikte.",
        detail:
          "Dazu gehören die Genfer Konventionen, der Schutz von Zivilisten, der Umgang mit Kriegsgefangenen und das Verbot bestimmter Waffen.",
      },
    ],
  },
  {
    id: "sani",
    title: "Sanitätsdienstliche Ausbildung",
    subtitle: "Einsatzersthelfer Alpha (EHA)",
    themen: [
      {
        id: "rettungskette",
        title: "Rettungskette im Einsatz",
        summary: "Feste Abfolge der Hilfeleistung.",
        detail:
          "Von Selbst- und Kameradenhilfe unter Beschuss (Care under Fire) über die Versorgung im sicheren Bereich (Tactical Field Care) bis zum Abtransport.",
      },
      {
        id: "tourniquet",
        title: "Tourniquet",
        summary: "Abbindesystem zur Blutstillung.",
        detail:
          "Mechanisches Band zur Staubindung. Bei lebensbedrohlichen Blutungen an Extremitäten so eng drehen, bis die Blutung stoppt.",
      },
      {
        id: "emergency-bandage",
        title: "Emergency Bandage (Israeli Bandage)",
        summary: "Multifunktionaler Notverband.",
        detail:
          "Hochentwickelter Druckverband mit eingebauter Druckspange, um starke Wundblutungen schnell und komprimiert zu versorgen.",
      },
      {
        id: "chest-seal",
        title: "Chest Seal (Brustsiegel)",
        summary: "Belüfteter Klebeverband für Thoraxwunden.",
        detail:
          "Verhindert bei offenen Brustkorbverletzungen (z. B. durch Schüsse), dass Luft in den Pleuraraum strömt und die Lunge kollabiert (Spannungspneumothorax).",
      },
      {
        id: "schock",
        title: "Schockbekämpfung",
        summary: "Maßnahmen bei Volumenmangelschock.",
        detail:
          "Blutung stillen, Patient mit Rettungsdecke wärmen und richtige Lagerung (z. B. Schocklagerung) herstellen.",
      },
      {
        id: "seitenlage-feld",
        title: "Stabile Seitenlage im Feld",
        summary: "Sichern der Atemwege.",
        detail:
          "Bei bewusstlosen Soldaten mit vorhandener Atmung. Verhindert Ersticken durch Erbrochenes oder erschlaffte Zunge.",
      },
      {
        id: "brandverletzungen",
        title: "Brandverletzungen",
        summary: "Erstversorgung von Verbrennungen.",
        detail:
          "Kühlen kleinflächiger Verbrennungen mit Wasser, steriles Abdecken der Wunden und Schutz vor Auskühlen.",
      },
    ],
  },
  {
    id: "waffen",
    title: "Waffen- & Schießausbildung",
    subtitle: "G36, P8, MG5, DM51",
    themen: [
      {
        id: "sicherheit",
        title: "Sicherheitsbestimmungen",
        summary: "Vier Grundregeln der Waffensicherheit.",
        detail:
          "1) Jede Waffe ist als geladen zu betrachten. 2) Mündung zeigt nie auf etwas, das nicht bekämpft werden soll. 3) Finger erst beim Visieren am Abzug. 4) Ziel muss klar identifiziert sein.",
      },
      {
        id: "g36-baugruppen",
        title: "G36 — Hauptbaugruppen",
        summary: "Zerlegung der Standardwaffe.",
        detail:
          "Gehäuse mit Rohr, Gehäuseoberteil mit Visierung, Handschutz, Bodenstück mit Schulterstütze, Verschlussträger mit Verschluss, Abzugsgruppe und Magazin.",
      },
      {
        id: "g36-laden",
        title: "G36 — Ladetätigkeiten",
        summary: "Befehlsabfolge beim Schießen.",
        detail:
          "‚Laden‘: Magazin einführen, durchladen, sichern. ‚Feuer frei‘: entsichern und Feuerkampf aufnehmen.",
      },
      {
        id: "g36-stoerung",
        title: "G36 — Störungsbeseitigung",
        summary: "Verhalten bei Ladehemmung.",
        detail:
          "Sofortmaßnahmen: Sichern → Magazin raus → Durchladen → Sichtprüfung → Magazin rein → Durchladen → Weiterkämpfen.",
      },
      {
        id: "p8",
        title: "Pistole P8",
        summary: "Sekundärwaffe — Funktion & Handhabung.",
        detail:
          "Teilgeladene vs. fertiggeladene Waffe, Funktion des Sicherungs-/Entspannhebels und korrektes Visierbild.",
      },
      {
        id: "mg5",
        title: "Maschinengewehr MG5",
        summary: "Schwere Gruppenwaffe — Grundlagen.",
        detail:
          "Funktionsweise des Gasdruckladers, Zuführen der Gurtmunition und Aufgaben des Richtschützen.",
      },
      {
        id: "dm51",
        title: "Handgranate DM51",
        summary: "Aufbau & Handhabung.",
        detail:
          "Abreißzünder, Sicherheitszeit ca. 4–5 Sekunden. Unterschied zwischen Offensiv- und Defensivsplitterkörper.",
      },
    ],
  },
  {
    id: "gefecht",
    title: "Gefechtsdienst aller Truppen",
    subtitle: "Infantristische Grundlagen",
    themen: [
      {
        id: "tarnen",
        title: "Tarnen & Täuschen",
        summary: "Anpassen an die Umgebung.",
        detail:
          "Nutzen von natürlichem Material und Tarnschminke, um Konturen, Spiegelungen, Schatten, Formen und Farben des Körpers und der Ausrüstung zu verwischen.",
      },
      {
        id: "bewegung",
        title: "Bewegungsarten im Gelände",
        summary: "Taktische Fortbewegung.",
        detail:
          "Kriechen (unauffällig), Sprung (schnell von Deckung zu Deckung) und gebückter Gang.",
      },
      {
        id: "lenda",
        title: "LENDA-Meldung",
        summary: "Strukturierte Meldung im Gefecht.",
        detail:
          "L = Lage, E = Eigene Absicht, N = Nächste Schritte, D = Dringlichkeit, A = Anforderungen.",
      },
      {
        id: "alarmposten",
        title: "Alarmposten-Verfahren",
        summary: "Sicherung des eigenen Bereichs.",
        detail:
          "Aufgaben des Alarmpostens, Nutzung von Seh- und Hörzeichen, Alarmieren der Gruppe und Verhalten bei Annäherung des Feindes.",
      },
      {
        id: "schussfeld",
        title: "Sicherungsbereich & Schussfeld",
        summary: "Zuweisung von Sektoren.",
        detail:
          "Jeder Soldat und jede Gruppe bekommt einen festen Beobachtungs- und Wirkungsbereich — verhindert Lücken in der Verteidigung.",
      },
      {
        id: "patrouille",
        title: "Streifendrepp (Patrouille)",
        summary: "Bewegung in feindgefährdetem Gebiet.",
        detail:
          "Formationen (Schützenreihe, Schützenkette), Verteilung der Sicherungsrichtungen und Verhalten bei Hinterhalt.",
      },
      {
        id: "abc-alarm",
        title: "Verhalten bei ABC-Alarm",
        summary: "Schutz vor ABC-Waffen.",
        detail:
          "Schutzmaske innerhalb von 9 Sekunden aufsetzen, vollen Schutzzustand (Overgarment) herstellen und Deckung aufsuchen.",
      },
      {
        id: "handzeichen",
        title: "Handzeichen im Gefecht",
        summary: "Lautlose Kommunikation.",
        detail:
          "Sichtzeichen für ‚Sammeln‘, ‚Marsch‘, ‚Halt‘, ‚Feind gesichtet‘ oder Richtungsangaben ohne Funk oder Sprache.",
      },
    ],
  },
  {
    id: "fernmelde",
    title: "Fernmeldedienst & Orientierung",
    subtitle: "Funk, Karte, Kompass",
    themen: [
      {
        id: "nato-alphabet",
        title: "NATO-Funkalphabet",
        summary: "Standardisierte Buchstabierweise.",
        detail:
          "Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-Ray, Yankee, Zulu.",
      },
      {
        id: "funkdisziplin",
        title: "Funkdisziplin",
        summary: "Regeln im Äther.",
        detail:
          "Kurze, präzise Funksprüche. Betriebswörter (‚Kommen‘, ‚Ende‘, ‚Verstanden‘). Keine Klarnamen oder Geheimsachen im offenen Funk.",
      },
      {
        id: "karte-kompass",
        title: "Karte & Kompass (Breithaupt)",
        summary: "Grundlagen der Navigation.",
        detail:
          "Karte einnorden, Marschrichtungszahl (MRZ) bestimmen, Nadelabweichung berücksichtigen, Geländeformen anhand von Höhenlinien erkennen.",
      },
      {
        id: "bezugspunkt",
        title: "Bezugspunktverfahren",
        summary: "Schnelle Zielansprache im Gelände.",
        detail:
          "Markanten Punkt festlegen (z. B. ‚Große Eiche‘), von dem aus Entfernungen und Richtungen zu neuen Objekten angesagt werden.",
      },
    ],
  },
  {
    id: "innere",
    title: "Innere Führung & Wehrdienstalltag",
    subtitle: "Leitbild, Gruß, Meldung, Dienstplan",
    themen: [
      {
        id: "leitbild",
        title: "Staatsbürger in Uniform",
        summary: "Leitbild der Inneren Führung.",
        detail:
          "Soldaten besitzen die gleichen Grundrechte wie alle Bürger, nehmen aktiv am gesellschaftlichen Leben teil und verteidigen die Demokratie als bewusste Entscheidung.",
      },
      {
        id: "gruss",
        title: "Militärischer Gruß",
        summary: "Erweisen der Ehrenbezeigung.",
        detail:
          "Dienstgradniedrigere grüßen zuerst. Rechte Hand an die Kopfbedeckung. Im Gefecht oder bei der Arbeit entfällt der Gruß.",
      },
      {
        id: "meldung-vorgesetzter",
        title: "Meldung beim Vorgesetzten",
        summary: "Formeller Ablauf im Dienstzimmer.",
        detail:
          "Anklopfen, Eintreten, Achtungstellung einnehmen. Meldeformel: ‚Herr Hauptmann, Flieger Schmidt meldet sich wie befohlen.‘",
      },
      {
        id: "stube",
        title: "Stuben- & Revierreinigung",
        summary: "Ordnung im Alltag.",
        detail:
          "Sauberkeit in den Unterkünften, richtiges Lüften, Mülltrennung und Vorbereitung der Stube für den täglichen Stubendurchgang.",
      },
      {
        id: "dienstplan",
        title: "Der Dienstplan",
        summary: "Aufbau & Verbindlichkeit.",
        detail:
          "Zentrales Dokument für Tages- und Wochenablauf. Regelt Dienstantritt, Ausbildungsinhalte, Pausen, Dienstzeitende und Sonderdienste (z. B. Wache).",
      },
    ],
  },
];

export const THEMEN_BY_ID: Record<string, ThemenKategorie> = Object.fromEntries(
  THEMEN_KATEGORIEN.map((k) => [k.id, k]),
);
