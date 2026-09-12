import { AlertTriangle, BookOpen, GitBranch, Lightbulb, Sparkles, Stethoscope, Table2 } from "lucide-react";
import type { PaletteColor } from "@/lib/palette";
import type { ClinicalCorrelation, ConfusionPair, SimpleTable, TopicOverview } from "@/data/topic-overviews";
import { BoxedSection, CalloutBox } from "@/components/section-block";

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
            <tr key={i} className={`border-t border-border ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
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

function MechanismFlow({ steps, color }: { steps: string[]; color: PaletteColor }) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      {steps.map((step, i) => (
        <div key={i} className="w-full">
          <div style={{ borderColor: color.ring, color: color.fg, backgroundColor: color.bg }} className="w-full rounded-md border px-3 py-2 text-xs font-medium leading-relaxed">
            <span className="mr-1.5 font-bold" style={{ color: color.ring }}>{i + 1}.</span>
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: color.ring }}>
                <path d="M12 4v14m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ClinicalCorrelationBody({ correlation }: { correlation: ClinicalCorrelation }) {
  const rows: { label: string; value: string }[] = [
    { label: "Scenario", value: correlation.scenario },
    { label: "Mechanism", value: correlation.mechanism },
    { label: "Expected effect", value: correlation.effect },
    { label: "Important adverse effect", value: correlation.adverseEffect },
    { label: "Exam clue", value: correlation.examClue },
  ];
  return (
    <dl className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label}>
          <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{r.label}</dt>
          <dd className="text-xs leading-relaxed text-card-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ConfusionPairsList({ pairs }: { pairs: ConfusionPair[] }) {
  return (
    <div className="space-y-2">
      {pairs.map((p, i) => (
        <div key={i} className="rounded-lg border border-border bg-muted/30 p-3">
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
    <div className="mb-8 space-y-4">
      <BoxedSection numeral={0} icon={<BookOpen size={15} />} label="Overview" color={color}>
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Why this matters</p>
        <p className="mt-1 text-sm leading-relaxed text-card-foreground">{overview.whyItMatters}</p>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Core idea</p>
        <p className="mt-1 text-sm leading-relaxed text-card-foreground">{overview.coreIdea}</p>
      </BoxedSection>

      {overview.classification && (
        <BoxedSection numeral={1} icon={<Table2 size={15} />} label="Classification" color={color}>
          <ScrollTable table={overview.classification} />
        </BoxedSection>
      )}

      {overview.mechanismSteps && overview.mechanismSteps.length > 0 && (
        <BoxedSection numeral={2} icon={<GitBranch size={15} />} label="Mechanism" sublabel={overview.mechanismTitle} color={color}>
          <MechanismFlow steps={overview.mechanismSteps} color={color} />
        </BoxedSection>
      )}

      {overview.clinicalCorrelation && (
        <BoxedSection numeral={3} icon={<Stethoscope size={15} />} label="Clinical Application" color={color}>
          <ClinicalCorrelationBody correlation={overview.clinicalCorrelation} />
        </BoxedSection>
      )}

      {overview.highYield.length > 0 && (
        <CalloutBox icon={<Sparkles size={12} />} label="High-Yield Summary" color={color} tone="tint">
          <ul className="space-y-1.5">
            {overview.highYield.map((point, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CalloutBox>
      )}

      {overview.examTraps && overview.examTraps.length > 0 && (
        <CalloutBox icon={<AlertTriangle size={12} />} label="Exam Traps" color={{ bg: "oklch(0.94 0.08 45)", fg: "oklch(0.38 0.13 45)", ring: "oklch(0.62 0.17 45)" }} tone="tint">
          <ul className="space-y-1.5">
            {overview.examTraps.map((point, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CalloutBox>
      )}

      {overview.confusionPairs && overview.confusionPairs.length > 0 && (
        <CalloutBox icon={<Lightbulb size={12} />} label="Confusion Pairs" color={color} tone="outline">
          <ConfusionPairsList pairs={overview.confusionPairs} />
        </CalloutBox>
      )}

      {overview.quickTable && (
        <BoxedSection numeral={4} icon={<Table2 size={15} />} label="Quick Reference" color={color}>
          <ScrollTable table={overview.quickTable} />
        </BoxedSection>
      )}
    </div>
  );
}
