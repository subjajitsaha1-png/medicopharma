import { AlertTriangle, ArrowDown, Lightbulb, Sparkles, Stethoscope } from "lucide-react";
import type { PaletteColor } from "@/lib/palette";
import type { ClinicalCorrelation, ConfusionPair, SimpleTable, TopicOverview } from "@/data/topic-overviews";

function ScrollTable({ table }: { table: SimpleTable }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[520px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-muted/60">
            {table.headers.map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2 font-bold text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top leading-relaxed text-card-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MechanismFlow({ title, steps, color }: { title?: string; steps: string[]; color: PaletteColor }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      {title && <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</p>}
      <div className="flex flex-col items-start gap-0.5">
        {steps.map((step, i) => (
          <div key={i} className="w-full">
            <div style={{ borderColor: color.ring, color: color.fg, backgroundColor: color.bg }} className="w-full rounded-md border px-3 py-2 text-xs font-medium leading-relaxed">
              {step}
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-0.5">
                <ArrowDown size={14} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClinicalCorrelationBox({ correlation, color }: { correlation: ClinicalCorrelation; color: PaletteColor }) {
  const rows: { label: string; value: string }[] = [
    { label: "Scenario", value: correlation.scenario },
    { label: "Mechanism", value: correlation.mechanism },
    { label: "Expected effect", value: correlation.effect },
    { label: "Important adverse effect", value: correlation.adverseEffect },
    { label: "Exam clue", value: correlation.examClue },
  ];
  return (
    <div style={{ borderTopColor: color.ring }} className="rounded-lg border border-border border-t-4 bg-card p-4">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <Stethoscope size={14} />
        Clinical correlation
      </p>
      <dl className="mt-2 space-y-2">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[10px] font-bold uppercase tracking-wide" style={{ color: color.fg }}>{r.label}</dt>
            <dd className="text-xs leading-relaxed text-card-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ConfusionPairsList({ pairs }: { pairs: ConfusionPair[] }) {
  return (
    <div className="space-y-2">
      {pairs.map((p, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs font-bold text-card-foreground">
            {p.left} <span className="font-normal text-muted-foreground">vs</span> {p.right}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.explanation}</p>
        </div>
      ))}
    </div>
  );
}

export function TopicOverviewSection({ overview, color }: { overview: TopicOverview; color: PaletteColor }) {
  return (
    <div className="mb-8 space-y-5">
      <div style={{ borderTopColor: color.ring }} className="rounded-xl border border-border border-t-4 bg-card p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Why this matters</p>
        <p className="mt-1 text-sm leading-relaxed text-card-foreground">{overview.whyItMatters}</p>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Core idea</p>
        <p className="mt-1 text-sm leading-relaxed text-card-foreground">{overview.coreIdea}</p>
      </div>

      {overview.classification && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Classification</p>
          <ScrollTable table={overview.classification} />
        </div>
      )}

      {overview.mechanismSteps && overview.mechanismSteps.length > 0 && (
        <MechanismFlow title={overview.mechanismTitle} steps={overview.mechanismSteps} color={color} />
      )}

      {overview.clinicalCorrelation && <ClinicalCorrelationBox correlation={overview.clinicalCorrelation} color={color} />}

      {overview.highYield.length > 0 && (
        <div style={{ backgroundColor: color.bg }} className="rounded-lg p-3">
          <p style={{ color: color.fg }} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide">
            <Sparkles size={12} />
            High-yield
          </p>
          <ul className="mt-2 space-y-1.5">
            {overview.highYield.map((point, i) => (
              <li key={i} style={{ color: color.fg }} className="flex gap-2 text-xs leading-relaxed">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {overview.examTraps && overview.examTraps.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            <AlertTriangle size={12} />
            Exam traps
          </p>
          <ul className="mt-2 space-y-1.5">
            {overview.examTraps.map((point, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed text-card-foreground">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {overview.confusionPairs && overview.confusionPairs.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            <Lightbulb size={14} />
            Confusion pairs
          </p>
          <ConfusionPairsList pairs={overview.confusionPairs} />
        </div>
      )}

      {overview.quickTable && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Quick revision table</p>
          <ScrollTable table={overview.quickTable} />
        </div>
      )}
    </div>
  );
}
