import { useState } from "react";
import { Sparkles, Copy, RotateCcw, Check } from "lucide-react";

type Props = {
  label?: string;
  initial?: string;
  onGenerate?: () => Promise<string> | string;
  className?: string;
};

export function EditableOutput({
  label = "AI Output (Editable)",
  initial = "",
  onGenerate,
  className = "",
}: Props) {
  const [value, setValue] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!onGenerate) return;
    setLoading(true);
    try {
      const next = await onGenerate();
      setValue(next);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-brand uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
          {onGenerate && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-1 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <RotateCcw className={`size-3 ${loading ? "animate-spin" : ""}`} />
              Regenerate
            </button>
          )}
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full min-h-[280px] p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 text-sm text-slate-800 leading-relaxed outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/40 transition-all font-sans resize-y whitespace-pre-wrap"
        placeholder="Generated output will appear here. You can edit it freely."
      />
      <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
        <Sparkles className="size-3" /> AI-generated. Review before use.
      </p>
    </div>
  );
}
