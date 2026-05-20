import { createFileRoute } from "@tanstack/react-router";
import { ListTodo } from "lucide-react";
import { Workbench } from "@/components/Workbench";
import { mockTasks } from "@/lib/mockAi";

export const Route = createFileRoute("/tasks")({
  component: () => (
    <Workbench
      title="AI Task Planner"
      subtitle="Turn your goals into a prioritized action plan"
      icon={ListTodo}
      inputLabel="Goals for the day / week"
      inputPlaceholder="e.g. Ship the Q3 report, prep board deck, review hiring loop…"
      outputLabel="Prioritized Plan (Editable)"
      ctaLabel="Plan My Day"
      generate={mockTasks}
      rows={8}
    />
  ),
  head: () => ({
    meta: [
      { title: "AI Task Planner — Lumina AI" },
      { name: "description", content: "Prioritize tasks and plan focused time blocks with AI." },
    ],
  }),
});
