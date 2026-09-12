import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BookOpen, ArrowLeft, ClipboardList, Download, ExternalLink, FlaskConical, GraduationCap, Layers3, ListTree, Moon, Pill, Search, Star, Sun, Upload, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FACTS, TOPICS, type FactItem } from "@/data/facts";
import { MCQS, type McqItem } from "@/data/mcqs";
import { DRUG_REFERENCE } from "@/data/drug-reference";
import { TOPIC_OVERVIEWS } from "@/data/topic-overviews";
import { TopicOverviewSection } from "@/components/topic-overview";
import { PracticalViva } from "@/components/practical-viva";
import { DrugClassification } from "@/components/drug-classification";
import { TOPIC_PALETTE } from "@/lib/palette";
import {
  exportProgress,
  getOrInitCard,
  importProgress,
  isDue,
  loadBookmarks,
  loadSrsState,
  reviewCard,
  saveBookmarks,
  saveSrsState,
  type Grade,
} from "@/lib/srs";
import {
  DoseResponseDiagram,
  HalfLifeDiagram,
  Cyp450Diagram,
  AutonomicReceptorDiagram,
  RaasDiagram,
  AntiarrhythmicDiagram,
  CoagulationDiagram,
  OpioidDiagram,
  AntibioticMechanismDiagram,
  InsulinSignalingDiagram,
  CellCycleDiagram,
  GanglionTransmissionDiagram,
  IonChannelGatingDiagram,
  FirstPassMetabolismDiagram,
  KineticsOrderDiagram,
  PlasmaConcentrationTimeDiagram,
  ReceptorBindingDiagram,
  GabaReceptorDiagram,
  NephronDiureticDiagram,
  ArachidonicAcidDiagram,
  GastricAcidDiagram,
  HivReplicationDiagram,
  GpcrSignalingDiagram,
} from "@/components/pathway-diagrams";

type Tab = "sheets" | "flashcards" | "diagrams" | "reference" | "practical" | "classification";
const THEME_KEY = "pharmacology-theme";

function topicColor(topicId: string) {
  const index = TOPICS.findIndex((t) => t.id === topicId);
  return TOPIC_PALETTE[(index < 0 ? 0 : index) % TOPIC_PALETTE.length]!;
}

function useDarkMode() {
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      window.localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      // ignore
    }
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-1 font-display text-3xl text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return (
    <Button variant="tab" active={active} onClick={onClick} aria-pressed={active} className={`min-w-0 rounded-lg px-2 transition sm:px-3 ${active ? "text-primary shadow-sm" : ""}`}>
      {icon}
      <span className="hidden text-xs sm:inline sm:text-sm">{label}</span>
    </Button>
  );
}

function ClinicalPearl({ text, color }: { text: string; color: { bg: string; fg: string } }) {
  return (
    <div style={{ backgroundColor: color.bg }} className="mt-3 rounded-lg p-3 text-left">
      <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: color.fg }}>Clinical pearl</p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: color.fg }}>{text}</p>
    </div>
  );
}

function FurtherReading({ topicName, color }: { topicName: string; color: { bg: string; fg: string } }) {
  const q = encodeURIComponent(topicName);
  const links = [
    { label: "Wikipedia", sub: "quick overview & references", href: `https://en.wikipedia.org/wiki/Special:Search?search=${q}&go=Go` },
    { label: "NCBI Bookshelf", sub: "free full-text pharmacology textbooks", href: `https://www.ncbi.nlm.nih.gov/books/?term=${q}` },
    { label: "DrugBank", sub: "open drug/mechanism database", href: `https://go.drugbank.com/unearth/q?searcher=drugs&query=${q}` },
  ];
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Want the full text? Read further, free</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ borderTopColor: color.fg }} className="group flex flex-col gap-1 rounded-lg border border-border border-t-4 bg-muted/40 p-3 text-sm transition hover:brightness-95">
            <span className="flex items-center gap-1.5 font-bold text-card-foreground">{link.label}<ExternalLink size={12} className="opacity-60" /></span>
            <span className="text-xs leading-snug text-muted-foreground">{link.sub}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const TOPIC_PEARLS: Record<string, string> = {
  general: "Enzyme inhibition acts within a dose or two, while enzyme induction takes 1-3 weeks — a frequent way examiners test drug-interaction timing.",
  ans: "Atropine treats only the muscarinic effects of organophosphate poisoning; pralidoxime is needed to address nicotinic effects like muscle weakness.",
  cvs: "ACE inhibitors cause a dry cough via bradykinin accumulation — ARBs block the angiotensin receptor directly and largely avoid this side effect.",
  cns: "Barbiturates increase the duration of GABA-A channel opening (and can act GABA-independently at high dose), making them far more dangerous in overdose than benzodiazepines.",
  analgesics: "Aspirin's antiplatelet effect outlasts its plasma half-life because it irreversibly acetylates COX-1 in anucleate platelets, which cannot make new enzyme.",
  antimicrobial: "Aminoglycoside uptake into bacteria is oxygen-dependent, which is exactly why they don't work against anaerobes.",
  antiviral: "Acyclovir's selectivity for infected cells comes from needing viral (not human) thymidine kinase for its first phosphorylation step.",
  endocrine: "Metformin lowers glucose by reducing hepatic gluconeogenesis rather than boosting insulin release — which is why it rarely causes hypoglycemia alone.",
  "gi-resp": "Long-acting beta-2 agonists must never be used alone in asthma — without an inhaled corticosteroid, LABA monotherapy raises asthma mortality.",
  chemo: "Mesna is given with cyclophosphamide specifically to neutralize acrolein in the bladder and prevent hemorrhagic cystitis.",
  toxicology: "Activated charcoal doesn't bind iron, lithium, alcohols, or corrosives well — a classic 'exception list' examiners love to test.",
};

const DIAGRAMS: { topicId: string; title: string; description: string; pearl: string; Component: () => ReactNode }[] = [
  { topicId: "general", title: "Dose-Response & Antagonism", description: "Agonist curves, and how competitive vs non-competitive antagonists reshape them.", pearl: "A competitive antagonist is surmountable — enough extra agonist restores full effect. A non-competitive antagonist permanently lowers the ceiling.", Component: DoseResponseDiagram },
  { topicId: "general", title: "Receptor Binding: Agonist vs Antagonist", description: "How a competitive (same-site) antagonist differs from a non-competitive (allosteric) one at the receptor level.", pearl: "Same binding site = surmountable by more agonist. Different (allosteric) site = the maximum effect is capped no matter how much agonist you add.", Component: ReceptorBindingDiagram },
  { topicId: "general", title: "First-Order Elimination & Half-Life", description: "Why ~4-5 half-lives are needed to reach (or clear) steady state.", pearl: "Loading doses skip the wait for steady state — useful for drugs like digoxin where you can't afford to wait 4-5 half-lives for a therapeutic level.", Component: HalfLifeDiagram },
  { topicId: "general", title: "Zero-Order vs First-Order Kinetics", description: "Constant fraction vs constant amount eliminated per unit time — and why only one gives a fixed half-life.", pearl: "A small dose increase causing a disproportionately large rise in plasma level is the classic sign of saturable (zero-order) kinetics, as with phenytoin near the therapeutic range.", Component: KineticsOrderDiagram },
  { topicId: "general", title: "Plasma Concentration-Time Curve", description: "Cmax, Tmax, AUC, and the therapeutic window on a single-dose curve.", pearl: "A drug can be both sub-therapeutic and toxic within the same dosing interval if the therapeutic window is narrow — this is exactly why drugs like digoxin and phenytoin need level monitoring.", Component: PlasmaConcentrationTimeDiagram },
  { topicId: "general", title: "Oral Absorption & First-Pass Metabolism", description: "Why an oral dose reaching the liver before systemic circulation can lose much of its bioavailability, unlike IV.", pearl: "High first-pass drugs (e.g. propranolol, lidocaine, GTN) need much higher oral doses than IV doses to reach the same systemic exposure — or bypass the gut entirely (sublingual GTN).", Component: FirstPassMetabolismDiagram },
  { topicId: "general", title: "GPCR Signaling: Gq, Gs, Gi", description: "The same agonist-receptor logic behind alpha, beta, and muscarinic effects — which G-protein predicts which effect.", pearl: "This one diagram explains alpha-1 vasoconstriction, beta-1 tachycardia, beta-2 bronchodilation, and alpha-2/M2 presynaptic inhibition — all from the same three G-protein pathways.", Component: GpcrSignalingDiagram },
  { topicId: "general", title: "CYP450 Induction vs Inhibition", description: "Why inhibition acts fast and induction acts slow — and what that means for dosing.", pearl: "Stopping an enzyme inducer is just as risky as starting one — substrate drug levels can suddenly rise once induction wears off over 1-3 weeks.", Component: Cyp450Diagram },
  { topicId: "ans", title: "Autonomic Receptor Map", description: "Sympathetic and parasympathetic pathways from ganglion to effector receptor.", pearl: "Nicotinic receptors sit at every autonomic ganglion (both sympathetic and parasympathetic) — a favorite site to test where a drug like nicotine or a ganglion blocker acts.", Component: AutonomicReceptorDiagram },
  { topicId: "ans", title: "Ganglionic Transmission (Nicotinic ACh)", description: "How acetylcholine crosses the ganglionic synapse via nicotinic receptors, and where ganglion blockers intervene.", pearl: "Because nicotinic ganglion receptors sit on BOTH sympathetic and parasympathetic pathways, a ganglion blocker produces a mixed, hard-to-predict picture of effects — one reason they're rarely used today.", Component: GanglionTransmissionDiagram },
  { topicId: "cvs", title: "RAAS Pathway & Drug Targets", description: "Where ACE inhibitors, ARBs, and aldosterone antagonists intervene.", pearl: "Direct renin inhibitors (aliskiren) act one step earlier than ACE inhibitors — blocking the very first step of the whole cascade.", Component: RaasDiagram },
  { topicId: "cvs", title: "Antiarrhythmics on the Action Potential", description: "Mapping Vaughan-Williams classes onto the phases they block.", pearl: "Class IB agents (lidocaine) preferentially act on ischemic/depolarized tissue, making them useful specifically for ventricular arrhythmias after MI.", Component: AntiarrhythmicDiagram },
  { topicId: "cvs", title: "Coagulation Cascade & Anticoagulants", description: "Intrinsic and extrinsic pathways converging on the common pathway, with heparin, warfarin, and DOAC sites of action marked directly on the cascade.", pearl: "Direct oral anticoagulants (rivaroxaban, apixaban) skip antithrombin entirely and directly inhibit factor Xa — no routine monitoring needed, unlike warfarin.", Component: CoagulationDiagram },
  { topicId: "cvs", title: "Diuretic Sites Along the Nephron", description: "Where loop diuretics, thiazides, potassium-sparing agents, and carbonic anhydrase inhibitors each act.", pearl: "Loop diuretics act at the thick ascending limb, where up to 25% of filtered Na+ is normally reabsorbed — that's why they're the most potent diuretic class.", Component: NephronDiureticDiagram },
  { topicId: "cns", title: "Na+ Channel Gating & Antiepileptic Block", description: "Resting, open, and inactivated channel states — and why antiepileptics target the inactivated state specifically.", pearl: "Use-dependent block means these drugs preferentially block neurons firing rapidly and repetitively (as in a seizure focus) while sparing normal, slower firing — a key reason for their selectivity.", Component: IonChannelGatingDiagram },
  { topicId: "cns", title: "GABA-A Receptor: Benzodiazepine vs Barbiturate", description: "The chloride channel both drug classes modulate — and why one is far safer in overdose than the other.", pearl: "Flumazenil only blocks the benzodiazepine site — it does nothing for a barbiturate overdose, which has no specific antidote.", Component: GabaReceptorDiagram },
  { topicId: "analgesics", title: "Opioid Mechanism & Analgesic Ladder", description: "Mu-receptor signaling, and the WHO stepwise approach to pain management.", pearl: "Tramadol is unusual — it's a weak mu-opioid agonist AND inhibits serotonin/norepinephrine reuptake, so combining it with an SSRI raises serotonin syndrome risk.", Component: OpioidDiagram },
  { topicId: "analgesics", title: "Arachidonic Acid Cascade", description: "Where corticosteroids, NSAIDs, and coxibs each interrupt the pathway from membrane phospholipids to prostaglandins and leukotrienes.", pearl: "Corticosteroids block phospholipase A2 — one step earlier than NSAIDs — which is why they suppress both the COX (prostaglandin) and LOX (leukotriene) branches at once.", Component: ArachidonicAcidDiagram },
  { topicId: "antimicrobial", title: "Antibiotic Mechanism Sites", description: "Cell wall, ribosome, folate synthesis, and DNA/RNA targets at a glance.", pearl: "Bacteriostatic drugs that block protein synthesis (macrolides, tetracyclines, clindamycin) can antagonize bactericidal cell-wall agents by slowing bacterial growth — a classic combination pitfall.", Component: AntibioticMechanismDiagram },
  { topicId: "antiviral", title: "HIV Replication Cycle & ART Targets", description: "The five stages of HIV replication, mapped to entry inhibitors, NRTIs/NNRTIs, integrase inhibitors, and protease inhibitors.", pearl: "Combination ART deliberately hits multiple independent steps at once — a mutation that defeats one drug class rarely defeats all of them simultaneously.", Component: HivReplicationDiagram },
  { topicId: "endocrine", title: "Insulin Signaling & Antidiabetic Targets", description: "Where sulfonylureas, metformin, and SGLT2 inhibitors each intervene.", pearl: "SGLT2 inhibitors work independent of insulin secretion or sensitivity entirely — which is why they can be added at almost any stage of type 2 diabetes management.", Component: InsulinSignalingDiagram },
  { topicId: "gi-resp", title: "Gastric Acid Secretion & Antiulcer Targets", description: "How acetylcholine, gastrin, and histamine converge on the parietal cell's proton pump — and why PPIs suppress acid more completely than H2 blockers.", pearl: "Blocking any single input (say, histamine with an H2 blocker) still leaves the other two driving acid secretion — blocking the pump itself, as PPIs do, shuts down all three at once.", Component: GastricAcidDiagram },
  { topicId: "chemo", title: "Cell Cycle & Chemotherapy Targets", description: "Cell-cycle-specific vs non-specific agents, mapped onto the cycle they interrupt.", pearl: "Cell-cycle non-specific agents (alkylators, platinum compounds) are especially useful for slow-growing tumors with a low growth fraction, where cycle-specific drugs have less to work with.", Component: CellCycleDiagram },
];

function DiagramCard({ title, description, pearl, color, onExpand, children }: { title: string; description: string; pearl: string; color: { bg: string; fg: string; ring: string }; onExpand: () => void; children: ReactNode }) {
  return (
    <div style={{ borderTopColor: color.ring }} className="rounded-xl border border-border border-t-4 bg-card p-4 shadow-sm sm:p-6">
      <h3 className="font-display text-xl text-card-foreground">{title}</h3>
      <p className="mt-1 mb-4 text-sm text-muted-foreground">{description}</p>
      <button type="button" onClick={onExpand} aria-label={`Enlarge ${title} diagram`} className="group relative w-full overflow-x-auto rounded-lg bg-muted/40 p-3 text-left transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]">
        {children}
        <span style={{ backgroundColor: color.bg, color: color.fg }} className="pointer-events-none absolute bottom-2 right-2 rounded-full px-2 py-1 text-[10px] font-bold opacity-0 shadow-sm transition group-hover:opacity-100">Tap to enlarge</span>
      </button>
      <ClinicalPearl text={pearl} color={color} />
    </div>
  );
}

function Modal({ title, color, onClose, children }: { title: string; color: { bg: string; fg: string; ring: string }; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={title} onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} style={{ borderTopColor: color.ring }} className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-t-4 border-border bg-card p-6 text-center shadow-xl">
        {children}
        <Button variant="secondary" onClick={onClose} className="mt-5 rounded-lg">Close</Button>
      </div>
    </div>
  );
}

function Diagrams() {
  const units = Array.from(new Set(TOPICS.map((t) => t.unit)));
  const [openDiagram, setOpenDiagram] = useState<(typeof DIAGRAMS)[number] | null>(null);
  return (
    <section>
      <SectionIntro eyebrow={`${DIAGRAMS.length} animated diagrams`} title="See the mechanisms move" description="Original diagrams grouped by unit, each with a clinical pearl. Tap any diagram to enlarge it." />
      <div className="space-y-10">
        {units.map((unit) => {
          const unitTopicIds = new Set(TOPICS.filter((t) => t.unit === unit).map((t) => t.id));
          const diagramsInUnit = DIAGRAMS.filter((d) => unitTopicIds.has(d.topicId));
          if (diagramsInUnit.length === 0) return null;
          return (
            <div key={unit}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{unit}</h3>
              <div className="grid gap-4 lg:grid-cols-2">
                {diagramsInUnit.map((d, i) => {
                  const color = topicColor(d.topicId);
                  const D = d.Component;
                  return (
                    <DiagramCard key={unit + d.title + i} title={d.title} description={d.description} pearl={d.pearl} color={color} onExpand={() => setOpenDiagram(d)}>
                      <D />
                    </DiagramCard>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">All pathway diagrams are original artwork made for this app.</p>
      {openDiagram && (
        <Modal title={openDiagram.title} color={topicColor(openDiagram.topicId)} onClose={() => setOpenDiagram(null)}>
          <p className="mb-3 text-left font-display text-xl text-card-foreground sm:text-2xl">{openDiagram.title}</p>
          <div className="rounded-lg bg-muted/40 p-4"><openDiagram.Component /></div>
          <ClinicalPearl text={openDiagram.pearl} color={topicColor(openDiagram.topicId)} />
        </Modal>
      )}
    </section>
  );
}

function FactSheets() {
  const [topicId, setTopicId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => new Set());
  useEffect(() => setBookmarks(loadBookmarks()), []);

  function toggleBookmark(id: string) {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveBookmarks(next);
      return next;
    });
  }

  if (!topicId) {
    const units = Array.from(new Set(TOPICS.map((t) => t.unit)));
    return (
      <section>
        <SectionIntro eyebrow={`${FACTS.length} high-yield facts`} title="Choose a system" description="Organized by unit — the sequence most Indian MBBS pharmacology courses teach from." />
        {bookmarks.size > 0 && (
          <button type="button" onClick={() => setTopicId("__bookmarks__")} className="mb-6 flex items-center gap-2 rounded-xl border border-border border-t-4 bg-card px-4 py-3 text-sm font-bold text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" style={{ borderTopColor: TOPIC_PALETTE[2]!.ring }}>
            <Star size={16} className="fill-current" style={{ color: TOPIC_PALETTE[2]!.fg }} /> {bookmarks.size} bookmarked fact{bookmarks.size === 1 ? "" : "s"} — review starred
          </button>
        )}
        <div className="space-y-8">
          {units.map((unit) => (
            <div key={unit}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{unit}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {TOPICS.filter((t) => t.unit === unit).map((topic) => {
                  const count = FACTS.filter((f) => f.topicId === topic.id).length;
                  const color = topicColor(topic.id);
                  return (
                    <button key={topic.id} onClick={() => setTopicId(topic.id)} style={{ borderTopColor: color.ring }} className="group min-h-36 rounded-xl border border-border border-t-4 bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-xl leading-tight text-card-foreground">{topic.name}</h3>
                        <span style={{ backgroundColor: color.bg, color: color.fg }} className="shrink-0 rounded-full px-2 py-1 text-[11px] font-bold">{count} facts</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.blurb}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const isBookmarkView = topicId === "__bookmarks__";
  const topic = TOPICS.find((t) => t.id === topicId);
  if (!isBookmarkView && !topic) return null;
  const facts = isBookmarkView ? FACTS.filter((f) => bookmarks.has(f.id)) : FACTS.filter((f) => f.topicId === topicId);
  const color = isBookmarkView ? TOPIC_PALETTE[2]! : topicColor(topicId!);
  return (
    <section>
      <Button variant="ghost" onClick={() => setTopicId(null)} className="mb-4 -ml-3"><ArrowLeft size={16} />All systems</Button>
      <SectionIntro eyebrow={`${facts.length} high-yield facts`} title={isBookmarkView ? "Bookmarked facts" : topic!.name} description={isBookmarkView ? "Facts you've starred for quick review." : topic!.blurb} />
      {!isBookmarkView && TOPIC_OVERVIEWS[topicId!] && <TopicOverviewSection overview={TOPIC_OVERVIEWS[topicId!]!} color={color} />}
      {!isBookmarkView && !TOPIC_OVERVIEWS[topicId!] && TOPIC_PEARLS[topicId!] && <ClinicalPearl text={TOPIC_PEARLS[topicId!]!} color={color} />}
      {!isBookmarkView && (
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">One-fact revision list</p>
      )}
      <ol className="mt-4 space-y-3">
        {facts.map((fact, index) => (
          <li key={fact.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <span style={{ backgroundColor: color.bg, color: color.fg }} className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">{index + 1}</span>
            <p className="flex-1 text-sm leading-7 text-card-foreground">{fact.fact}</p>
            <button type="button" onClick={() => toggleBookmark(fact.id)} aria-label={bookmarks.has(fact.id) ? "Remove bookmark" : "Bookmark this fact"} aria-pressed={bookmarks.has(fact.id)} className="shrink-0 self-start rounded-full p-1.5 text-muted-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Star size={16} className={bookmarks.has(fact.id) ? "fill-current" : ""} style={bookmarks.has(fact.id) ? { color: TOPIC_PALETTE[2]!.fg } : undefined} />
            </button>
          </li>
        ))}
        {facts.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No bookmarks yet — tap the star on any fact to save it here.</p>}
      </ol>
      {!isBookmarkView && <FurtherReading topicName={topic!.name} color={color} />}
    </section>
  );
}

function GradeButton({ variant, label, sub, onClick }: { variant: "again" | "hard" | "good" | "easy"; label: string; sub: string; onClick: () => void }) {
  return <Button variant={variant} onClick={onClick} className="h-16 flex-col gap-0 rounded-xl"><span>{label}</span><span className="text-[10px] font-medium opacity-75">{sub}</span></Button>;
}

function FlashcardMode() {
  const [srs, setSrs] = useState<Record<string, ReturnType<typeof getOrInitCard>>>({});
  const [ready, setReady] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string | "all">("all");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSrs(loadSrsState());
    setReady(true);
  }, []);

  const pool = useMemo(() => FACTS.filter((f) => topicFilter === "all" || f.topicId === topicFilter), [topicFilter]);
  const queue = useMemo(() => {
    const due = pool.filter((f) => isDue(getOrInitCard(srs, f.id)));
    return due.length > 0 ? due : pool;
  }, [pool, srs]);
  const current: FactItem | undefined = queue[index % Math.max(queue.length, 1)];
  const dueCount = pool.filter((f) => isDue(getOrInitCard(srs, f.id))).length;

  function changeTopic(value: string) {
    setTopicFilter(value);
    setIndex(0);
    setFlipped(false);
  }

  function grade(value: Grade) {
    if (!current) return;
    const next = { ...srs, [current.id]: reviewCard(getOrInitCard(srs, current.id), value) };
    setSrs(next);
    saveSrsState(next);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  function doExport() {
    const blob = new Blob([exportProgress(srs)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pharmacology-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function doImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imported = importProgress(String(reader.result));
      if (imported) {
        setSrs(imported);
        saveSrsState(imported);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="topic-filter">Filter flashcards by system</label>
        <select id="topic-filter" value={topicFilter} onChange={(e) => changeTopic(e.target.value)} className="min-h-10 rounded-xl border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="all">All systems ({FACTS.length})</option>
          {Array.from(new Set(TOPICS.map((t) => t.unit))).map((unit) => (
            <optgroup key={unit} label={unit}>
              {TOPICS.filter((t) => t.unit === unit).map((t) => (
                <option key={t.id} value={t.id}>{t.name} ({FACTS.filter((f) => f.topicId === t.id).length})</option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">{ready ? `${dueCount} due for review` : "Loading review schedule"}</span>
          <Button variant="ghost" onClick={doExport} className="h-8 px-2 text-xs" aria-label="Export study progress"><Download size={14} />Export</Button>
          <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <Upload size={14} />Import
            <input type="file" accept="application/json" className="hidden" onChange={doImport} />
          </label>
        </div>
      </div>
      {current ? (
        <>
          <button onClick={() => setFlipped((v) => !v)} style={{ borderTopColor: topicColor(current.topicId).ring }} className="flex min-h-72 w-full items-center justify-center rounded-2xl border border-border border-t-4 bg-card p-7 text-center shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-80 sm:p-12" aria-label={flipped ? "Show question" : "Reveal answer"}>
            <div className="max-w-2xl">
              <span style={{ backgroundColor: topicColor(current.topicId).bg, color: topicColor(current.topicId).fg }} className="mb-5 inline-block rounded-full px-3 py-1 text-xs font-bold">{flipped ? "Answer" : "Question"}</span>
              <p className="font-display text-2xl leading-relaxed text-card-foreground sm:text-3xl">{flipped ? current.answer : current.question}</p>
            </div>
          </button>
          <p className="mt-3 text-center text-xs font-medium text-muted-foreground">{flipped ? "How well did you remember?" : "Tap the card to reveal the answer"}</p>
          {flipped && (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <GradeButton variant="again" label="Again" sub="Review tomorrow" onClick={() => grade(1)} />
              <GradeButton variant="hard" label="Hard" sub="1 day" onClick={() => grade(3)} />
              <GradeButton variant="good" label="Good" sub="Up to 6 days" onClick={() => grade(4)} />
              <GradeButton variant="easy" label="Easy" sub="Longer interval" onClick={() => grade(5)} />
            </div>
          )}
        </>
      ) : <p className="py-16 text-center text-muted-foreground">No cards in this system yet.</p>}
    </div>
  );
}

function McqPractice() {
  const [topicFilter, setTopicFilter] = useState<string | "all">("all");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const pool = useMemo(() => MCQS.filter((q) => topicFilter === "all" || q.topicId === topicFilter), [topicFilter]);
  const current: McqItem | undefined = pool[index % Math.max(pool.length, 1)];

  function changeTopic(value: string) {
    setTopicFilter(value);
    setIndex(0);
    setSelected(null);
    setScore({ correct: 0, attempted: 0 });
  }
  function choose(optionId: string) {
    if (selected || !current) return;
    setSelected(optionId);
    setScore((s) => ({ correct: s.correct + (optionId === current.correctOptionId ? 1 : 0), attempted: s.attempted + 1 }));
  }
  function next() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  if (!current) return <p className="py-16 text-center text-muted-foreground">No MCQs in this system yet.</p>;
  const color = topicColor(current.topicId);
  const topic = TOPICS.find((t) => t.id === current.topicId);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="mcq-topic-filter">Filter MCQs by system</label>
        <select id="mcq-topic-filter" value={topicFilter} onChange={(e) => changeTopic(e.target.value)} className="min-h-10 rounded-xl border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="all">All systems ({MCQS.length})</option>
          {Array.from(new Set(TOPICS.map((t) => t.unit))).map((unit) => (
            <optgroup key={unit} label={unit}>
              {TOPICS.filter((t) => t.unit === unit && MCQS.some((q) => q.topicId === t.id)).map((t) => (
                <option key={t.id} value={t.id}>{t.name} ({MCQS.filter((q) => q.topicId === t.id).length})</option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="text-xs font-semibold text-muted-foreground">Score: {score.correct}/{score.attempted}</span>
      </div>
      <div style={{ borderTopColor: color.ring }} className="rounded-2xl border border-border border-t-4 bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <span style={{ backgroundColor: color.bg, color: color.fg }} className="inline-block rounded-full px-3 py-1 text-xs font-bold">{topic?.name}</span>
          <span className="text-xs font-medium text-muted-foreground">Q{(index % pool.length) + 1} of {pool.length}</span>
        </div>
        <p className="mt-4 font-display text-xl leading-relaxed text-card-foreground sm:text-2xl">{current.question}</p>
        <div className="mt-5 space-y-2">
          {current.options.map((opt) => {
            const isCorrect = opt.id === current.correctOptionId;
            const isSelected = opt.id === selected;
            let stateClasses = "border-border bg-card hover:bg-muted/50";
            if (selected) {
              if (isCorrect) stateClasses = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
              else if (isSelected) stateClasses = "border-rose-500 bg-rose-50 dark:bg-rose-950/40";
            }
            return (
              <button key={opt.id} type="button" onClick={() => choose(opt.id)} disabled={!!selected} className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition ${stateClasses} disabled:cursor-default`}>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold uppercase">{opt.id}</span>
                <span className="text-card-foreground">{opt.text}</span>
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="mt-5 rounded-lg p-4" style={{ backgroundColor: color.bg }}>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: color.fg }}>{selected === current.correctOptionId ? "Correct" : "Not quite"}</p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: color.fg }}>{current.explanation}</p>
          </div>
        )}
        <div className="mt-5 flex justify-end"><Button onClick={next} disabled={!selected} className="rounded-lg">Next question →</Button></div>
      </div>
    </div>
  );
}

function Flashcards() {
  const [mode, setMode] = useState<"cards" | "mcq">("cards");
  return (
    <section>
      <SectionIntro eyebrow="Spaced repetition + NEET PG practice" title="Recall, then reveal" description="Review due cards, or switch to timed multiple-choice practice." />
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1 sm:w-80">
        <Button variant="tab" active={mode === "cards"} onClick={() => setMode("cards")} className={mode === "cards" ? "text-primary shadow-sm" : ""}><Layers3 size={16} /> Flashcards</Button>
        <Button variant="tab" active={mode === "mcq"} onClick={() => setMode("mcq")} className={mode === "mcq" ? "text-primary shadow-sm" : ""}><ClipboardList size={16} /> MCQ Practice</Button>
      </div>
      {mode === "cards" ? <FlashcardMode /> : <McqPractice />}
    </section>
  );
}

function DrugReference() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DRUG_REFERENCE;
    return DRUG_REFERENCE.filter((v) => v.parameter.toLowerCase().includes(q) || v.value.toLowerCase().includes(q) || v.note.toLowerCase().includes(q));
  }, [query]);
  const [openValue, setOpenValue] = useState<(typeof DRUG_REFERENCE)[number] | null>(null);

  return (
    <section>
      <SectionIntro eyebrow={`${DRUG_REFERENCE.length} drugs`} title="Drug Quick Reference" description="Searchable by drug name, mechanism, or keyword. Tap any card for the full exam note." />
      <div className="relative mb-3">
        <Search aria-hidden="true" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <label className="sr-only" htmlFor="drug-search">Search drug reference</label>
        <input id="drug-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search warfarin, beta blocker, MRSA…" className="min-h-12 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" />
      </div>
      <p aria-live="polite" className="mb-4 text-xs font-medium text-muted-foreground">Showing {results.length} of {DRUG_REFERENCE.length} drugs</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {results.map((v) => {
          const color = topicColor(v.topicId);
          return (
            <button key={v.id} type="button" onClick={() => setOpenValue(v)} style={{ borderTopColor: color.ring }} className="group rounded-xl border border-border border-t-4 bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-bold text-card-foreground">{v.parameter}</h3>
              </div>
              <p style={{ backgroundColor: color.bg, color: color.fg }} className="mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-semibold">{v.value}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-snug text-muted-foreground">{v.note}</p>
            </button>
          );
        })}
        {results.length === 0 && <p className="col-span-2 py-12 text-center text-sm text-muted-foreground">No drug matches "{query}".</p>}
      </div>
      {openValue && (
        <Modal title={openValue.parameter} color={topicColor(openValue.topicId)} onClose={() => setOpenValue(null)}>
          <p className="text-left font-display text-2xl text-card-foreground">{openValue.parameter}</p>
          <p style={{ backgroundColor: topicColor(openValue.topicId).bg, color: topicColor(openValue.topicId).fg }} className="mt-3 inline-block rounded-md px-3 py-1 text-sm font-semibold">{openValue.value}</p>
          <div style={{ borderLeftColor: topicColor(openValue.topicId).ring, borderLeftWidth: 4 }} className="mt-4 rounded-lg border border-border bg-muted/30 p-3.5 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Exam note</p>
            <p className="mt-1 text-sm leading-relaxed text-card-foreground">{openValue.note}</p>
          </div>
          <FurtherReading topicName={openValue.parameter} color={topicColor(openValue.topicId)} />
        </Modal>
      )}
    </section>
  );
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition hover:text-foreground">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function LandingPage({ onEnter, dark, onToggleDark }: { onEnter: (tab: Tab) => void; dark: boolean; onToggleDark: () => void }) {
  const stats = [
    { label: "Systems", value: "11" },
    { label: "High-yield facts", value: `${FACTS.length}+` },
    { label: "Mechanism diagrams", value: `${DIAGRAMS.length}` },
    { label: "Drug reference entries", value: `${DRUG_REFERENCE.length}` },
  ];
  const features: { tab: Tab; title: string; description: string; icon: ReactNode; color: { bg: string; fg: string; ring: string } }[] = [
    { tab: "sheets", title: "Fact Sheets", description: "Concise, system-by-system drug facts with clinical pearls, further reading, and bookmarking.", icon: <BookOpen size={22} />, color: TOPIC_PALETTE[0]! },
    { tab: "flashcards", title: "Flashcards + MCQs", description: "Spaced-repetition review and NEET PG-style MCQ practice, with progress export/import.", icon: <Layers3 size={22} />, color: TOPIC_PALETTE[2]! },
    { tab: "diagrams", title: "Mechanism Diagrams", description: "Animated pharmacology diagrams you can tap to enlarge, grouped by system.", icon: <Waypoints size={22} />, color: TOPIC_PALETTE[4]! },
    { tab: "reference", title: "Drug Quick Reference", description: "Searchable reference of drug classes, mechanisms, and key exam points.", icon: <FlaskConical size={22} />, color: TOPIC_PALETTE[6]! },
    { tab: "practical", title: "Practical & Viva", description: "Prescription-writing cases, CAL experiments, spotters, and viva-voce questions by unit.", icon: <GraduationCap size={22} />, color: TOPIC_PALETTE[8]! },
    { tab: "classification", title: "Drug Classification", description: "Searchable classification trees for every drug class, organized by mechanism or site of action.", icon: <ListTree size={22} />, color: TOPIC_PALETTE[10]! },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,oklch(0.48_0.11_195),oklch(0.55_0.13_155),oklch(0.62_0.14_75),oklch(0.55_0.19_300),oklch(0.58_0.19_15))]" />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex justify-end"><ThemeToggle dark={dark} onToggle={onToggleDark} /></div>
        <div className="relative mt-4 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,oklch(0.93_0.06_195),oklch(0.94_0.08_155)_45%,oklch(0.94_0.1_85))] p-6 text-center shadow-sm dark:bg-[linear-gradient(135deg,oklch(0.3_0.05_195),oklch(0.28_0.04_160)_45%,oklch(0.3_0.05_85))] sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/30 blur-2xl dark:bg-white/5" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 size-48 rounded-full bg-white/30 blur-2xl dark:bg-white/5" />
          <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl text-primary-foreground shadow-md bg-[linear-gradient(135deg,oklch(0.48_0.11_195),oklch(0.55_0.13_155))] sm:size-20">
            <Pill aria-hidden="true" size={34} />
          </div>
          <h1 className="relative mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl">Pharmacology High-Yield</h1>
          <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Fact sheets, flashcards, animated mechanism diagrams, MCQ practice, and a drug quick-reference — chaptered the way Indian MBBS students study, with clinical pearls throughout.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/70 px-4 py-2 text-center shadow-sm backdrop-blur dark:bg-black/20">
                <p className="font-display text-xl text-foreground sm:text-2xl">{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <Button onClick={() => onEnter("sheets")} className="relative mt-8 h-12 rounded-xl px-8 text-base shadow-md">Start Studying</Button>
        </div>
        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
          {features.map((f) => (
            <button key={f.tab} type="button" onClick={() => onEnter(f.tab)} style={{ borderTopColor: f.color.ring }} className="group rounded-xl border border-border border-t-4 bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div style={{ backgroundColor: f.color.bg, color: f.color.fg }} className="flex size-11 items-center justify-center rounded-xl">{f.icon}</div>
              <h3 className="mt-3 font-display text-xl text-card-foreground">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              <span className="mt-3 inline-block text-xs font-bold" style={{ color: f.color.fg }}>Explore →</span>
            </button>
          ))}
        </div>
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs leading-relaxed text-muted-foreground">
        High-yield facts are original summaries for exam revision. Always cross-check your course material and current prescribing references.
      </footer>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("sheets");
  const [entered, setEntered] = useState(false);
  const { dark, toggle } = useDarkMode();

  if (!entered) return <LandingPage onEnter={(t) => { setTab(t); setEntered(true); }} dark={dark} onToggleDark={toggle} />;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,oklch(0.48_0.11_195),oklch(0.55_0.13_155),oklch(0.62_0.14_75),oklch(0.55_0.19_300),oklch(0.58_0.19_15))]" />
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setEntered(false)} className="flex size-10 items-center justify-center rounded-xl text-primary-foreground shadow-sm bg-[linear-gradient(135deg,oklch(0.48_0.11_195),oklch(0.55_0.13_155))]" aria-label="Back to home">
              <Pill aria-hidden="true" size={21} />
            </button>
            <div>
              <h1 className="font-display text-2xl leading-none text-foreground">Pharmacology High-Yield</h1>
              <p className="mt-1 text-xs font-medium text-muted-foreground">Focused exam revision</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <nav aria-label="Study modes" className="grid grid-cols-6 rounded-xl bg-muted p-1">
              <TabButton active={tab === "sheets"} onClick={() => setTab("sheets")} icon={<BookOpen size={16} />} label="Fact Sheets" />
              <TabButton active={tab === "flashcards"} onClick={() => setTab("flashcards")} icon={<Layers3 size={16} />} label="Flashcards" />
              <TabButton active={tab === "diagrams"} onClick={() => setTab("diagrams")} icon={<Waypoints size={16} />} label="Diagrams" />
              <TabButton active={tab === "reference"} onClick={() => setTab("reference")} icon={<FlaskConical size={16} />} label="Drug Reference" />
              <TabButton active={tab === "practical"} onClick={() => setTab("practical")} icon={<GraduationCap size={16} />} label="Practical & Viva" />
              <TabButton active={tab === "classification"} onClick={() => setTab("classification")} icon={<ListTree size={16} />} label="Classification" />
            </nav>
            <ThemeToggle dark={dark} onToggle={toggle} />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-7 sm:px-6 sm:py-10">
        {tab === "sheets" && <FactSheets />}
        {tab === "flashcards" && <Flashcards />}
        {tab === "diagrams" && <Diagrams />}
        {tab === "reference" && <DrugReference />}
        {tab === "practical" && <PracticalViva />}
        {tab === "classification" && <DrugClassification />}
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs leading-relaxed text-muted-foreground">
        High-yield facts are original summaries for exam revision. Always cross-check your course material and current prescribing references.
      </footer>
    </div>
  );
}
