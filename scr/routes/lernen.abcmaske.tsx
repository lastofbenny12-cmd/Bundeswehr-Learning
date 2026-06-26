import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "@/components/LessonPage";

export const Route = createFileRoute("/lernen/abcmaske")({
  head: () => ({ meta: [{ title: "ABC-Schutzmaske — AGA Trainer" }] }),
  component: () => <LessonPage id="abcmaske" />,
});
