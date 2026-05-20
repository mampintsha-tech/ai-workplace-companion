import { useState } from "react";
import { Wand2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EditableOutput } from "@/components/EditableOutput";

type Props = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  ctaLabel: string;
  generate: (input: string) => Promise<string>;
  rows?: number;
};

export function Workbench({
  title,
  subtitle,
  icon: Icon,
  inputLabel,
  inputPlaceholder,
  outputLabel,
  ctaLabel,
  generate,
  rows = 10,
}: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const text = await generate(input);
    setOutput(text);
    setLoading(false);
    return text;
  };

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-surface rounded-2xl border border-border shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-brand/10 text-brand grid place-items-center">
                <Icon className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">{inputLabel}</h2>
                <p className="text-xs text-muted-foreground">Structured prompt</p>
              </div>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={rows}
              placeholder={inputPlaceholder}
              className="w-full bg-white border border-border rounded-lg p-3 text-sm font-mono leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-y"
            />

            <button
              type="button"
              onClick={run}
              disabled={loading}
              className="w-full py-2.5 bg-brand text-brand-foreground rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors disabled:opacity-60"
            >
              <Wand2 className="size-4" />
              {loading ? "Working…" : ctaLabel}
            </button>
          </section>

          <section className="bg-surface rounded-2xl border border-border shadow-sm p-6">
            <EditableOutput
              label={outputLabel}
              initial={output}
              key={output}
              onGenerate={() => run()}
            />
          </section>
        </div>
      </div>
    </>
  );
}
