import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Workbench } from "@/components/Workbench";
import { mockResearch } from "@/lib/mockAi";

export const Route = createFileRoute("/research")({
  component: () => (
    <Workbench
      title="AI Research Assistant"
      subtitle="Brief any topic into a structured one-pager"
      icon={Search}
      inputLabel="Topic / question"
      inputPlaceholder="e.g. The state of AI productivity tools in enterprise"
      outputLabel="Research Brief (Editable)"
      ctaLabel="Generate Brief"
      generate={mockResearch}
      rows={5}
    />
  ),
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Lumina AI" },
      { name: "description", content: "Get a structured research brief on any topic." },
    ],
  }),
});
