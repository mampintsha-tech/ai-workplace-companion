import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Workbench } from "@/components/Workbench";
import { mockSummary } from "@/lib/mockAi";

export const Route = createFileRoute("/meetings")({
  component: () => (
    <Workbench
      title="Meeting Notes Summarizer"
      subtitle="Paste a transcript, get takeaways and action items"
      icon={FileText}
      inputLabel="Transcript"
      inputPlaceholder="Paste your meeting transcript or notes here…"
      outputLabel="Summary (Editable)"
      ctaLabel="Summarize Meeting"
      generate={mockSummary}
      rows={14}
    />
  ),
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Lumina AI" },
      { name: "description", content: "Turn meeting transcripts into clear takeaways and action items." },
    ],
  }),
});
