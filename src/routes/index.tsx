import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListTodo, Search, MessageSquare, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Lumina AI" },
      { name: "description", content: "Your AI workplace command center: emails, meetings, tasks, research, and chat." },
    ],
  }),
});

const modules = [
  { to: "/email", label: "Smart Email Generator", desc: "Draft polished emails in your voice.", icon: Mail },
  { to: "/meetings", label: "Meeting Notes Summarizer", desc: "Turn transcripts into key takeaways.", icon: FileText },
  { to: "/tasks", label: "AI Task Planner", desc: "Convert goals into prioritized actions.", icon: ListTodo },
  { to: "/research", label: "AI Research Assistant", desc: "Brief any topic in seconds.", icon: Search },
  { to: "/chat", label: "AI Chatbot", desc: "Conversational copilot for any workflow.", icon: MessageSquare },
] as const;

const stats = [
  { label: "Drafts this week", value: "24", icon: Sparkles },
  { label: "Hours saved", value: "18.4", icon: Zap },
  { label: "Items reviewed", value: "97%", icon: Shield },
];

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Your AI workspace overview"
        action={
          <Link
            to="/chat"
            className="px-4 py-2 bg-brand text-brand-foreground text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare className="size-4" />
            Ask Lumina
          </Link>
        }
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        {/* Hero */}
        <section className="rounded-2xl bg-brand text-brand-foreground p-8 shadow-brand relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-widest text-indigo-200 font-bold mb-3">
              Good morning, Alex
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight max-w-xl">
              Let's automate the busywork. What are we shipping today?
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/email"
                className="px-4 py-2 bg-white text-brand text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                Draft an email
              </Link>
              <Link
                to="/tasks"
                className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                Plan my day
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface rounded-2xl border border-border p-5 shadow-sm">
              <s.icon className="size-4 text-brand mb-3" />
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Modules */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            AI Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="group bg-surface rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-brand/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-xl bg-brand/10 text-brand grid place-items-center">
                    <m.icon className="size-5" />
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="font-semibold text-sm">{m.label}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="text-center text-[11px] text-muted-foreground py-6 border-t border-border">
          Responsible AI: All outputs are model-generated. Verify facts and tone before use.
        </footer>
      </div>
    </>
  );
}
