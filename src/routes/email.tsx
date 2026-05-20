import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EditableOutput } from "@/components/EditableOutput";
import { mockEmail } from "@/lib/mockAi";

export const Route = createFileRoute("/email")({
  component: EmailPage,
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Lumina AI" },
      { name: "description", content: "Draft polished, on-brand emails in seconds." },
    ],
  }),
});

const tones = ["Professional", "Friendly", "Concise", "Persuasive", "Urgent"];

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const text = await mockEmail({ recipient, tone, goal, context });
    setOutput(text);
    setLoading(false);
    return text;
  };

  return (
    <>
      <PageHeader title="Smart Email Generator" subtitle="Structured prompt → editable draft" />
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <section className="bg-surface rounded-2xl border border-border shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-3 pb-1">
              <div className="size-10 rounded-xl bg-brand/10 text-brand grid place-items-center">
                <Mail className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Compose</h2>
                <p className="text-xs text-muted-foreground">Tell Lumina what to write.</p>
              </div>
            </div>

            <Field label="Recipient">
              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Sarah, Head of Design"
                className="input"
              />
            </Field>

            <Field label="Tone">
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                      tone === t
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white border-border text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Goal">
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Reschedule Thursday's review"
                className="input"
              />
            </Field>

            <Field label="Context / key points">
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={5}
                placeholder="Background info, names, dates, the outcome you want…"
                className="input resize-y"
              />
            </Field>

            <button
              type="button"
              onClick={generate}
              disabled={loading}
              className="w-full py-2.5 bg-brand text-brand-foreground rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors disabled:opacity-60"
            >
              <Wand2 className="size-4" />
              {loading ? "Drafting…" : "Generate Email"}
            </button>
          </section>

          {/* Output */}
          <section className="bg-surface rounded-2xl border border-border shadow-sm p-6">
            <EditableOutput
              label="Email Draft (Editable)"
              initial={output}
              key={output}
              onGenerate={generate}
            />
          </section>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: white;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.15s;
        }
        .input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 18%, transparent);
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
