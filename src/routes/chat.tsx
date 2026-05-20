import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { mockChat } from "@/lib/mockAi";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({
    meta: [
      { title: "AI Chat — Lumina AI" },
      { name: "description", content: "Conversational AI copilot for any workplace task." },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };

const initial: Msg[] = [
  {
    role: "assistant",
    content:
      "Hi, I'm Lumina. Ask me to draft an email, summarize a meeting, plan your day, or research a topic.",
  },
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    const reply = await mockChat(text);
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="AI Chat" subtitle="Conversational copilot — ask anything" />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`size-8 rounded-lg shrink-0 grid place-items-center text-xs font-bold ${
                  m.role === "assistant"
                    ? "bg-brand/10 text-brand"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {m.role === "assistant" ? <Sparkles className="size-4" /> : "U"}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap max-w-[80%] ${
                  m.role === "assistant"
                    ? "bg-surface border border-border text-slate-800"
                    : "bg-brand text-brand-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="size-8 rounded-lg bg-brand/10 text-brand grid place-items-center">
                <Sparkles className="size-4 animate-pulse" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-surface border border-border text-sm text-muted-foreground">
                Thinking…
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-surface">
        <form onSubmit={send} className="max-w-3xl mx-auto p-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Lumina…"
            className="flex-1 bg-slate-50 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-brand text-brand-foreground rounded-lg font-medium text-sm inline-flex items-center gap-2 hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            <Send className="size-4" />
            Send
          </button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center pb-3 px-4">
          Responsible AI: Lumina can make mistakes. Verify important information before acting on it.
        </p>
      </div>
    </div>
  );
}
