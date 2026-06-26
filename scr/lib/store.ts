import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QuizResult = {
  topicId: string;
  topicLabel: string;
  total: number;
  correct: number;
  dateISO: string;
};

export type ExamResult = {
  total: number;
  correct: number;
  durationSec: number;
  passed: boolean;
  dateISO: string;
};

type Activity = {
  id: string;
  kind: "lesson" | "quiz" | "exam";
  label: string;
  href?: string;
  dateISO: string;
  meta?: string;
};

type State = {
  userName: string;
  onboarded: boolean;
  visitedLessons: string[];
  viewedRanks: string[];
  viewedEquipment: string[];
  quizResults: QuizResult[];
  examResults: ExamResult[];
  wrongAnswerIds: string[];
  recent: Activity[];

  setUserName: (name: string) => void;
  markLessonVisited: (id: string) => void;
  markRankViewed: (id: string) => void;
  markEquipmentViewed: (id: string) => void;
  recordQuiz: (r: QuizResult, wrongIds: string[]) => void;
  recordExam: (r: ExamResult) => void;
  pushActivity: (a: Omit<Activity, "id" | "dateISO">) => void;
  reset: () => void;
};

const nowISO = () => new Date().toISOString();

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      userName: "",
      onboarded: false,
      visitedLessons: [],
      viewedRanks: [],
      viewedEquipment: [],
      quizResults: [],
      examResults: [],
      wrongAnswerIds: [],
      recent: [],

      setUserName: (name) =>
        set({ userName: name.trim().toUpperCase().slice(0, 20), onboarded: true }),
      markLessonVisited: (id) =>
        set({ visitedLessons: Array.from(new Set([...get().visitedLessons, id])) }),
      markRankViewed: (id) =>
        set({ viewedRanks: Array.from(new Set([...get().viewedRanks, id])) }),
      markEquipmentViewed: (id) =>
        set({ viewedEquipment: Array.from(new Set([...get().viewedEquipment, id])) }),
      recordQuiz: (r, wrongIds) => {
        set({
          quizResults: [r, ...get().quizResults].slice(0, 50),
          wrongAnswerIds: Array.from(new Set([...get().wrongAnswerIds, ...wrongIds])),
        });
        get().pushActivity({
          kind: "quiz",
          label: r.topicLabel,
          href: `/quiz`,
          meta: `${r.correct}/${r.total} richtig`,
        });
      },
      recordExam: (r) => {
        set({ examResults: [r, ...get().examResults].slice(0, 50) });
        get().pushActivity({
          kind: "exam",
          label: r.passed ? "Prüfung bestanden" : "Prüfung nicht bestanden",
          href: `/pruefung`,
          meta: `${Math.round((r.correct / r.total) * 100)} %`,
        });
      },
      pushActivity: (a) =>
        set({
          recent: [
            { ...a, id: crypto.randomUUID(), dateISO: nowISO() },
            ...get().recent,
          ].slice(0, 20),
        }),
      reset: () =>
        set({
          userName: "",
          onboarded: false,
          visitedLessons: [],
          viewedRanks: [],
          viewedEquipment: [],
          quizResults: [],
          examResults: [],
          wrongAnswerIds: [],
          recent: [],
        }),
    }),
    { name: "aga-trainer-v1" },
  ),
);
