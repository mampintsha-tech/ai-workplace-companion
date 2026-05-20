type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function PageHeader({ title, subtitle, action }: Props) {
  return (
    <header className="h-auto md:h-16 border-b border-border bg-surface flex flex-col md:flex-row md:items-center justify-between gap-2 px-6 md:px-8 py-4 md:py-0 sticky top-0 z-10">
      <div>
        <h1 className="font-semibold text-slate-800 text-base">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
