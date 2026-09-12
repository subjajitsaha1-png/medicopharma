import { useMemo, useState } from "react";
import { FileText, Microscope, Eye, MessageCircleQuestion } from "lucide-react";
import { TOPICS } from "@/data/facts";
import { PRESCRIPTION_TOPICS, CAL_EXPERIMENTS, SPOTTERS, VIVA_TOPICS } from "@/data/practical-viva";
import { TOPIC_PALETTE, type PaletteColor } from "@/lib/palette";
import { topicColor } from "@/lib/topic-color";
import { Button } from "@/components/ui/button";
import { BoxedSection, SectionHeader, SectionBody } from "@/components/section-block";

type SubTab = "prescriptions" | "cal" | "spotters" | "viva";

const PRESCRIPTION_COLOR = TOPIC_PALETTE[8]!;
const CAL_COLOR = TOPIC_PALETTE[9]!;
const SPOTTER_COLOR = TOPIC_PALETTE[10]!;

function SubTabButton({ active, onClick, icon, label, count }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count: number }) {
  return (
    <Button variant="tab" active={active} onClick={onClick} aria-pressed={active} className={`min-w-0 gap-1.5 rounded-lg ${active ? "text-primary shadow-sm" : ""}`}>
      {icon}
      <span className="text-xs font-semibold sm:text-sm">{label}</span>
      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">{count}</span>
    </Button>
  );
}

function PrescriptionList() {
  return (
    <BoxedSection icon={<FileText size={15} />} label="Prescription-Writing Cases" color={PRESCRIPTION_COLOR}>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Classic case-based prescription topics. For each, practice writing a complete prescription — patient details, superscription (Rx), drug name/dose/route/frequency/duration, and signature — plus be ready to justify the choice.
      </p>
      <ol className="mt-3 space-y-3">
        {PRESCRIPTION_TOPICS.map((p, i) => (
          <li key={p.id} className="rounded-lg border border-border bg-muted/20 p-3.5">
            <div className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-card-foreground">{p.condition}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-card-foreground">Write for:</span> {p.drugsToWrite}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-card-foreground">Examiner's angle:</span> {p.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </BoxedSection>
  );
}

function CalList() {
  return (
    <BoxedSection icon={<Microscope size={15} />} label="CAL Experiments" color={CAL_COLOR}>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Since live animal experiments were replaced by Computer-Assisted Learning (CAL) modules and pre-recorded tracings in Indian MBBS pharmacology practicals, these are the standard experiments you'll be shown and questioned on.
      </p>
      <ol className="mt-3 space-y-3">
        {CAL_EXPERIMENTS.map((c, i) => (
          <li key={c.id} className="rounded-lg border border-border bg-muted/20 p-3.5">
            <div className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-card-foreground">{c.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-card-foreground">What it shows:</span> {c.whatItShows}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-card-foreground">Likely viva question:</span> {c.vivaPoint}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </BoxedSection>
  );
}

function SpotterGrid() {
  return (
    <BoxedSection icon={<Eye size={15} />} label="Spotter Identification" color={SPOTTER_COLOR}>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Common spotters shown for identification — practice naming the item, describing its correct use, and answering the one-line viva point.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {SPOTTERS.map((s) => (
          <div key={s.id} className="rounded-lg border border-border bg-muted/20 p-3.5">
            <p className="text-sm font-bold text-card-foreground">{s.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-card-foreground">Identify by:</span> {s.identifyBy}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-card-foreground">Viva point:</span> {s.vivaPoint}</p>
          </div>
        ))}
      </div>
    </BoxedSection>
  );
}

function VivaByUnit() {
  const [unitFilter, setUnitFilter] = useState<string | "all">("all");
  const groups = useMemo(() => VIVA_TOPICS.filter((g) => unitFilter === "all" || g.topicId === unitFilter), [unitFilter]);
  const totalQuestions = VIVA_TOPICS.reduce((sum, g) => sum + g.questions.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {totalQuestions} common viva-voce questions, grouped by unit — the same "why", not just "what", style examiners favor.
        </p>
        <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)} className="min-h-9 shrink-0 rounded-lg border border-input bg-card px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="all">All units</option>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className="space-y-4">
        {groups.map((g) => {
          const topic = TOPICS.find((t) => t.id === g.topicId);
          const color: PaletteColor = topicColor(g.topicId);
          if (!topic) return null;
          return (
            <div key={g.topicId} className="overflow-hidden rounded-xl shadow-sm">
              <SectionHeader icon={<MessageCircleQuestion size={14} />} label={topic.name} sublabel={`${g.questions.length} questions`} color={color} />
              <SectionBody>
                <ol className="space-y-2">
                  {g.questions.map((q, i) => (
                    <li key={i} className="flex gap-3 rounded-lg border border-border bg-muted/20 p-3 text-sm leading-relaxed text-card-foreground">
                      <span className="shrink-0 text-xs font-bold text-muted-foreground">{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ol>
              </SectionBody>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PracticalViva() {
  const [sub, setSub] = useState<SubTab>("prescriptions");
  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Practical exam + viva voce</p>
        <h2 className="mt-1 font-display text-3xl text-foreground">Practical & Viva</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Prescription writing, CAL experiments, spotter identification, and viva-voce questions — matched to how Indian MBBS pharmacology practicals are actually conducted.
        </p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1 sm:grid-cols-4">
        <SubTabButton active={sub === "prescriptions"} onClick={() => setSub("prescriptions")} icon={<FileText size={15} />} label="Prescriptions" count={PRESCRIPTION_TOPICS.length} />
        <SubTabButton active={sub === "cal"} onClick={() => setSub("cal")} icon={<Microscope size={15} />} label="CAL" count={CAL_EXPERIMENTS.length} />
        <SubTabButton active={sub === "spotters"} onClick={() => setSub("spotters")} icon={<Eye size={15} />} label="Spotters" count={SPOTTERS.length} />
        <SubTabButton active={sub === "viva"} onClick={() => setSub("viva")} icon={<MessageCircleQuestion size={15} />} label="Viva" count={VIVA_TOPICS.reduce((s, g) => s + g.questions.length, 0)} />
      </div>
      {sub === "prescriptions" && <PrescriptionList />}
      {sub === "cal" && <CalList />}
      {sub === "spotters" && <SpotterGrid />}
      {sub === "viva" && <VivaByUnit />}
    </section>
  );
}
