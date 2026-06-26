import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "@/components/LessonPage";

export const Route = createFileRoute("/lernen/kampfrucksack")({
  head: () => ({ meta: [{ title: "Kampfrucksack — AGA Trainer" }] }),
  component: () => <LessonPage id="kampfrucksack" />,
});
