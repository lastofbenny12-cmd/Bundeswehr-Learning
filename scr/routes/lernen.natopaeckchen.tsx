import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "@/components/LessonPage";

export const Route = createFileRoute("/lernen/natopaeckchen")({
  head: () => ({ meta: [{ title: "NATO-Päckchen — AGA Trainer" }] }),
  component: () => <LessonPage id="natopaeckchen" />,
});
