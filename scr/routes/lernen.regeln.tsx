import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "@/components/LessonPage";

export const Route = createFileRoute("/lernen/regeln")({
  head: () => ({ meta: [{ title: "Allgemeine Regeln — AGA Trainer" }] }),
  component: () => <LessonPage id="regeln" />,
});
