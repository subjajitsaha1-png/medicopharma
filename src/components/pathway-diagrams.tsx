// Original animated diagrams for pharmacology study reference.
// Hand-built for this app — not sourced or traced from any textbook.
// Motion (traveling-dash flow along arrows, path-length draw-in for curves,
// staggered fade/rise entrance for step boxes) uses generic, widely-known
// SVG/CSS animation techniques common across open-source svg-animation
// projects (e.g. animated stroke-dashoffset for path "drawing", CSS
// keyframe entrance animation) — implemented independently here in plain
// CSS with no added dependency; see the .pathway-* classes in index.css.
import { violet, teal, amber, rose, emerald, blue, magenta, lime } from "@/lib/palette";

function Step({ x, y, w = 110, h = 42, label, sub, color }: { x: number; y: number; w?: number; h?: number; label: string; sub?: string; color: { bg: string; fg: string } }) {
  return (
    <g className="pathway-step-enter">
      <rect x={x} y={y} width={w} height={h} rx={10} fill={color.bg} stroke={color.fg} strokeOpacity={0.25} />
      <text x={x + w / 2} y={y + (sub ? 18 : 25)} textAnchor="middle" fontSize="12" fontWeight={700} fill={color.fg}>{label}</text>
      {sub && (
        <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize="9.5" fill={color.fg} opacity={0.85}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-muted-foreground)" strokeWidth={1.6} markerEnd="url(#arrowhead)" opacity={0.55} className="pathway-arrow-flow" />;
}

/** A small red "blocked here" no-entry marker for labeling a drug's exact
    site of action on a pathway. label may be one string or several lines.
    center=true stacks the label centered below the marker instead of to
    one side — used when boxes sit side by side and a sideways label
    would collide with a neighboring box. */
function BlockMarker({ x, y, label, labelDx = 12, center = false, color = rose }: { x: number; y: number; label: string | string[]; labelDx?: number; center?: boolean; color?: { fg: string } }) {
  const lines = Array.isArray(label) ? label : [label];
  if (center) {
    return (
      <g>
        <circle cx={x} cy={y} r={7} fill="var(--color-card)" stroke={color.fg} strokeWidth={2} />
        <line x1={x - 4.2} y1={y - 4.2} x2={x + 4.2} y2={y + 4.2} stroke={color.fg} strokeWidth={2} />
        <text x={x} fontSize="7.5" fontWeight={700} fill={color.fg} textAnchor="middle">
          {lines.map((line, i) => (
            <tspan key={i} x={x} y={y + 16 + i * 11}>{line}</tspan>
          ))}
        </text>
      </g>
    );
  }
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill="var(--color-card)" stroke={color.fg} strokeWidth={2} />
      <line x1={x - 4.2} y1={y - 4.2} x2={x + 4.2} y2={y + 4.2} stroke={color.fg} strokeWidth={2} />
      <text x={x + labelDx} y={y - 4 + (lines.length > 1 ? 0 : 3)} fontSize="7.5" fontWeight={700} fill={color.fg} textAnchor={labelDx < 0 ? "end" : "start"}>
        {lines.map((line, i) => (
          <tspan key={i} x={x + labelDx} dy={i === 0 ? 0 : 9}>{line}</tspan>
        ))}
      </text>
    </g>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-muted-foreground)" opacity={0.7} />
      </marker>
    </defs>
  );
}

// 1. Dose-response / agonist-antagonist curves
export function DoseResponseDiagram() {
  const agonist = "M 30 160 C 60 158, 90 150, 110 120 C 130 90, 145 40, 260 32";
  const competitive = "M 30 165 C 80 163, 130 158, 170 130 C 210 100, 230 45, 290 33";
  const nonCompetitive = "M 30 165 C 90 163, 150 158, 200 120 C 230 95, 250 90, 320 88";
  return (
    <svg viewBox="0 0 340 190" className="w-full" role="img" aria-label="Dose-response curve diagram showing agonist, competitive antagonist, and non-competitive antagonist effects">
      <ArrowDefs />
      <line x1="30" y1="170" x2="330" y2="170" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <line x1="30" y1="170" x2="30" y2="15" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <text x="180" y="186" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Log [Drug] →</text>
      <text x="10" y="90" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)" transform="rotate(-90 10 90)">Effect →</text>
      <path d={agonist} fill="none" stroke={violet.fg} strokeWidth={2.5} pathLength={1} strokeDasharray={1} className="pathway-curve-draw" />
      <path d={competitive} fill="none" stroke={amber.fg} strokeWidth={2.5} strokeDasharray="5 4" />
      <path d={nonCompetitive} fill="none" stroke={rose.fg} strokeWidth={2.5} strokeDasharray="2 3" />
      <text x="205" y="28" fontSize="9" fontWeight={700} fill={violet.fg}>Agonist alone</text>
      <text x="235" y="46" fontSize="9" fontWeight={700} fill={amber.fg}>+ Competitive antagonist</text>
      <text x="200" y="103" fontSize="9" fontWeight={700} fill={rose.fg}>+ Non-competitive antagonist</text>
      <text x="40" y="35" fontSize="8.5" fill="var(--color-muted-foreground)">Same max, shifted right = competitive (surmountable)</text>
      <text x="40" y="120" fontSize="8.5" fill="var(--color-muted-foreground)">Lower max = non-competitive (insurmountable)</text>
    </svg>
  );
}

// 2. First-order elimination / half-life
export function HalfLifeDiagram() {
  const points = [
    { x: 30, y: 20 }, { x: 90, y: 55 }, { x: 150, y: 87.5 }, { x: 210, y: 103.75 }, { x: 270, y: 111.9 }, { x: 330, y: 116 },
  ];
  const path = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  return (
    <svg viewBox="0 0 360 170" className="w-full" role="img" aria-label="First-order elimination half-life diagram">
      <ArrowDefs />
      <line x1="30" y1="150" x2="350" y2="150" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <line x1="30" y1="150" x2="30" y2="15" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <text x="190" y="166" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Time (each interval = 1 half-life) →</text>
      <text x="10" y="85" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)" transform="rotate(-90 10 85)">Plasma concentration →</text>
      <path d={path} fill="none" stroke={teal.fg} strokeWidth={2.5} pathLength={1} strokeDasharray={1} className="pathway-curve-draw" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={3.5} fill={teal.fg} />
          <line x1={p.x} y1="150" x2={p.x} y2={p.y} stroke={teal.fg} strokeOpacity={0.2} strokeDasharray="2 3" />
          <text x={p.x} y="163" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">{i}t½</text>
        </g>
      ))}
      <text x="230" y="35" fontSize="9" fontWeight={700} fill={amber.fg}>~50% remaining each half-life</text>
      <text x="230" y="48" fontSize="8.5" fill="var(--color-muted-foreground)">4-5 half-lives → steady state</text>
    </svg>
  );
}

// 3. CYP450 induction vs inhibition timeline
export function Cyp450Diagram() {
  return (
    <svg viewBox="0 0 380 190" className="w-full" role="img" aria-label="Cytochrome P450 induction versus inhibition diagram">
      <ArrowDefs />
      <Step x={20} y={20} w={130} label="Substrate drug" sub="e.g. warfarin" color={violet} />
      <Arrow x1={150} y1={41} x2={195} y2={41} />
      <Step x={200} y={20} w={160} label="Hepatic CYP450" sub="metabolizes substrate" color={teal} />

      <Arrow x1={280} y1={62} x2={280} y2={95} />
      <Step x={20} y={100} w={160} label="Enzyme inducer" sub="rifampicin, phenytoin, carbamazepine" color={amber} />
      <text x="200" y="118" fontSize="9" fontWeight={700} fill={amber.fg}>↑ enzyme amount</text>
      <text x="200" y="130" fontSize="8.5" fill="var(--color-muted-foreground)">(takes 1-3 weeks) → ↓ substrate levels</text>

      <Step x={20} y={150} w={160} label="Enzyme inhibitor" sub="ketoconazole, cimetidine, macrolides" color={rose} />
      <text x="200" y="168" fontSize="9" fontWeight={700} fill={rose.fg}>↓ enzyme activity</text>
      <text x="200" y="180" fontSize="8.5" fill="var(--color-muted-foreground)">(within 1-2 doses) → ↑ substrate levels, toxicity</text>
    </svg>
  );
}

// 4. Autonomic receptor map
export function AutonomicReceptorDiagram() {
  return (
    <svg viewBox="0 0 420 260" className="w-full" role="img" aria-label="Autonomic nervous system receptor map">
      <ArrowDefs />
      <Step x={20} y={10} w={150} label="Preganglionic neuron" sub="releases ACh (nicotinic)" color={teal} />
      <Arrow x1={170} y1={31} x2={210} y2={31} />
      <Step x={215} y={10} w={185} label="Autonomic ganglion" sub="Nₙ nicotinic receptor" color={emerald} />

      <Arrow x1={95} y1={52} x2={95} y2={85} />
      <Step x={20} y={90} w={150} label="Sympathetic postganglionic" sub="releases norepinephrine" color={violet} />
      <Arrow x1={95} y1={132} x2={95} y2={165} />
      <Step x={20} y={170} w={150} label="Alpha-1 / Beta-1 / Beta-2" sub="vasoconstriction, ↑HR, bronchodilation" color={violet} />

      <Arrow x1={307} y1={52} x2={307} y2={85} />
      <Step x={230} y={90} w={170} label="Parasympathetic postganglionic" sub="releases acetylcholine" color={rose} />
      <Arrow x1={307} y1={132} x2={307} y2={165} />
      <Step x={230} y={170} w={170} label="M1-M5 muscarinic receptors" sub="↓HR, ↑secretions, bronchoconstriction" color={rose} />

      <text x="20" y="230" fontSize="8.5" fill="var(--color-muted-foreground)">Atropine blocks muscarinic receptors · Propranolol blocks beta receptors · Phenylephrine activates alpha-1</text>
    </svg>
  );
}

// 5. RAAS cascade with ACE inhibitor / ARB / direct renin inhibitor sites
export function RaasDiagram() {
  return (
    <svg viewBox="0 0 460 352" className="w-full" role="img" aria-label="Renin-angiotensin-aldosterone cascade with direct renin inhibitor, ACE inhibitor, and ARB sites of action marked">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Renin release" sub="from JG cells — low renal perfusion" color={teal} />
      <BlockMarker x={145} y={28} labelDx={-12} label={["Aliskiren blocks", "renin directly"]} />

      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Angiotensinogen → Angiotensin I" color={teal} />

      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Angiotensin I → II" sub="via ACE" color={amber} />
      <BlockMarker x={315} y={152} labelDx={12} label={["ACE inhibitors", "(enalapril, ramipril)"]} />

      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={145} y={194} w={170} h={40} label="Angiotensin II binds AT1" color={rose} />
      <BlockMarker x={315} y={214} labelDx={12} label={["ARBs", "(losartan, telmisartan)"]} />

      <Arrow x1={190} y1={234} x2={110} y2={270} />
      <Step x={30} y={270} w={160} h={40} label="Vasoconstriction" sub="↑ blood pressure" color={rose} />

      <Arrow x1={270} y1={234} x2={350} y2={270} />
      <Step x={270} y={270} w={160} h={40} label="Aldosterone release" sub="Na+/H2O retention" color={magenta} />

      <text x="230" y="322" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Aliskiren, ACE inhibitors, and ARBs act at three different steps of the same cascade</text>
      <text x="230" y="336" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Only ACE inhibitors raise bradykinin (dry cough/angioedema) — ARBs act downstream and largely avoid this</text>
    </svg>
  );
}

// 6. Antiarrhythmic classes on the cardiac action potential
export function AntiarrhythmicDiagram() {
  const curve = "M 20 130 L 60 130 L 75 20 L 110 25 C 150 30, 170 60, 190 95 L 240 105 L 300 130 L 380 130";
  return (
    <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Antiarrhythmic drug classes mapped onto the cardiac action potential">
      <ArrowDefs />
      <line x1="20" y1="150" x2="390" y2="150" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <path d={curve} fill="none" stroke={blue.fg} strokeWidth={2.5} pathLength={1} strokeDasharray={1} className="pathway-curve-draw" />
      <text x="55" y="15" fontSize="9" fontWeight={700} fill={violet.fg}>Phase 0</text>
      <text x="30" y="27" fontSize="8" fill="var(--color-muted-foreground)">Class I: ↓ Na+ influx</text>
      <text x="150" y="45" fontSize="9" fontWeight={700} fill={amber.fg}>Phase 2 (plateau)</text>
      <text x="140" y="57" fontSize="8" fill="var(--color-muted-foreground)">Class IV: ↓ Ca2+ influx (AV node)</text>
      <text x="220" y="90" fontSize="9" fontWeight={700} fill={rose.fg}>Phase 3</text>
      <text x="190" y="102" fontSize="8" fill="var(--color-muted-foreground)">Class III: ↓ K+ efflux (prolongs QT)</text>
      <text x="270" y="145" fontSize="9" fontWeight={700} fill={emerald.fg}>SA/AV node automaticity</text>
      <text x="255" y="157" fontSize="8" fill="var(--color-muted-foreground)">Class II (beta-blockers): ↓ rate</text>
    </svg>
  );
}

// 6. Coagulation cascade: intrinsic/extrinsic → common pathway, with anticoagulant sites
export function CoagulationDiagram() {
  return (
    <svg viewBox="0 0 460 320" className="w-full" role="img" aria-label="Coagulation cascade from intrinsic and extrinsic pathways through the common pathway, with heparin, warfarin, and DOAC sites of action marked">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Liver" sub="vitamin K–dependent synthesis: II, VII, IX, X" color={blue} />
      <BlockMarker x={145} y={28} labelDx={-12} label={["Warfarin blocks", "hepatic synthesis"]} />

      <Arrow x1={200} y1={48} x2={115} y2={64} />
      <Arrow x1={260} y1={48} x2={345} y2={64} />
      <Step x={10} y={66} w={170} h={42} label="Intrinsic pathway" sub="XII → XI → IX → VIIIa" color={teal} />
      <Step x={280} y={66} w={170} h={42} label="Extrinsic pathway" sub="Tissue factor + VIIa" color={amber} />

      <Arrow x1={95} y1={108} x2={190} y2={140} />
      <Arrow x1={365} y1={108} x2={270} y2={140} />
      <Step x={145} y={140} w={170} h={42} label="Factor X → Xa" sub="common pathway begins" color={rose} />
      <BlockMarker x={315} y={161} labelDx={12} label={["Heparin/LMWH", "(via antithrombin)"]} />
      <BlockMarker x={145} y={161} labelDx={-12} label={["DOAC: rivaroxaban,", "apixaban (direct)"]} />

      <Arrow x1={230} y1={182} x2={230} y2={206} />
      <Step x={145} y={206} w={170} h={42} label="Prothrombin (II) → Thrombin (IIa)" color={rose} />
      <BlockMarker x={315} y={227} labelDx={12} label={["Heparin/LMWH", "(via antithrombin)"]} />
      <BlockMarker x={145} y={227} labelDx={-12} label={["DOAC: dabigatran", "(direct thrombin)"]} />

      <Arrow x1={230} y1={248} x2={230} y2={272} />
      <Step x={145} y={272} w={170} h={36} label="Fibrinogen → Fibrin" sub="stable clot" color={violet} />

      <text x="230" y="314" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Heparin works indirectly via antithrombin III (needs monitoring); DOACs act directly on one factor; warfarin blocks synthesis of four factors upstream</text>
    </svg>
  );
}

// 6b. Antiplatelet mechanisms on one platelet activation diagram
export function PlateletActivationDiagram() {
  return (
    <svg viewBox="0 0 460 364" className="w-full" role="img" aria-label="Platelet activation pathway with aspirin, clopidogrel, and GPIIb/IIIa inhibitor sites of action">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={36} label="Platelet activation" sub="triggered by vessel injury" color={violet} />
      <Arrow x1={200} y1={44} x2={170} y2={70} />
      <Arrow x1={260} y1={44} x2={290} y2={70} />

      <Step x={15} y={70} w={190} h={44} label="Arachidonic acid → COX-1" sub="→ Thromboxane A2 (TXA2)" color={amber} />
      <BlockMarker x={110} y={132} center label={["Aspirin blocks COX-1", "irreversibly — lasts a platelet's", "lifespan (~7–10 days)"]} />

      <Step x={255} y={70} w={190} h={44} label="ADP release" sub="→ P2Y12 receptor" color={rose} />
      <BlockMarker x={350} y={132} center label={["Clopidogrel blocks P2Y12", "irreversibly — a prodrug", "needing CYP2C19 activation"]} />

      <Arrow x1={170} y1={114} x2={190} y2={180} />
      <Arrow x1={290} y1={114} x2={270} y2={180} />
      <Step x={145} y={180} w={170} h={40} label="GPIIb/IIIa activation" sub="conformational change" color={emerald} />
      <BlockMarker x={230} y={238} center label={["Abciximab, tirofiban, eptifibatide", "block GPIIb/IIIa directly —", "the final common pathway"]} />

      <Arrow x1={230} y1={220} x2={230} y2={286} />
      <Step x={110} y={286} w={240} h={40} label="Fibrinogen cross-links platelets" sub="stable aggregate" color={violet} />

      <text x="230" y="344" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">GPIIb/IIIa blockade works regardless of what triggered activation — the true final common step</text>
    </svg>
  );
}
// 8. Opioid receptor mechanism & analgesic ladder
export function OpioidDiagram() {
  return (
    <svg viewBox="0 0 420 230" className="w-full" role="img" aria-label="Opioid receptor mechanism and WHO analgesic ladder">
      <ArrowDefs />
      <Step x={20} y={15} w={170} label="Opioid binds mu-receptor" sub="presynaptic neuron" color={violet} />
      <Arrow x1={105} y1={57} x2={105} y2={85} />
      <Step x={20} y={90} w={170} label="↓ Ca2+ influx → ↓ neurotransmitter release" color={violet} />
      <Arrow x1={105} y1={132} x2={105} y2={160} />
      <Step x={20} y={165} w={170} label="↑ K+ efflux → hyperpolarization" sub="↓ pain signal transmission" color={violet} />

      <Step x={230} y={15} w={170} label="Step 1: Non-opioid" sub="paracetamol / NSAID" color={emerald} />
      <Arrow x1={315} y1={57} x2={315} y2={85} />
      <Step x={230} y={90} w={170} label="Step 2: Weak opioid" sub="+ codeine / tramadol" color={amber} />
      <Arrow x1={315} y1={132} x2={315} y2={160} />
      <Step x={230} y={165} w={170} label="Step 3: Strong opioid" sub="+ morphine, for severe pain" color={rose} />
      <text x="230" y="215" fontSize="8.5" fill="var(--color-muted-foreground)">WHO analgesic ladder — escalate stepwise as pain increases</text>
    </svg>
  );
}

// 8b. Opioid mu-receptor signaling cascade (GPCR -> Gi -> cAMP -> effects)
export function OpioidSignalingDiagram() {
  return (
    <svg viewBox="0 0 460 336" className="w-full" role="img" aria-label="Opioid mu-receptor GPCR signaling cascade through Gi protein, decreased cAMP, to decreased neurotransmitter release and hyperpolarization">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Opioid binds mu-receptor" sub="Gi-coupled GPCR" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />

      <Step x={145} y={70} w={170} h={40} label="Gi protein activated" sub="inhibits adenylyl cyclase" color={violet} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />

      <Step x={145} y={132} w={170} h={36} label="↓ cAMP" sub="↓ PKA activity" color={violet} />
      <Arrow x1={190} y1={168} x2={130} y2={190} />
      <Arrow x1={270} y1={168} x2={330} y2={190} />

      <Step x={15} y={190} w={190} h={40} label="↓ Ca2+ influx" sub="presynaptic terminal" color={amber} />
      <Step x={255} y={190} w={190} h={40} label="↑ K+ efflux" sub="postsynaptic membrane" color={rose} />

      <Arrow x1={110} y1={230} x2={170} y2={250} />
      <Arrow x1={350} y1={230} x2={290} y2={250} />
      <Step x={105} y={250} w={250} h={44} label="↓ Neurotransmitter release + hyperpolarization" sub="↓ pain signal transmission = analgesia" color={emerald} />

      <text x="230" y="316" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Naloxone competitively displaces opioid from the mu-receptor, reversing this entire cascade</text>
    </svg>
  );
}

// 9. Antibiotic mechanism sites
export function AntibioticMechanismDiagram() {
  return (
    <svg viewBox="0 0 420 230" className="w-full" role="img" aria-label="Antibiotic mechanism of action sites in a bacterial cell">
      <ArrowDefs />
      <rect x={40} y={20} width={340} height={180} rx={16} fill="none" stroke="var(--color-muted-foreground)" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="6 4" />
      <text x="210" y="14" textAnchor="middle" fontSize="9" fontWeight={700} fill="var(--color-muted-foreground)">Bacterial cell</text>

      <Step x={60} y={35} w={140} label="Cell wall" color={teal} />
      <text x="65" y="90" fontSize="8" fill={teal.fg} fontWeight={700}>Beta-lactams, vancomycin</text>

      <Step x={220} y={35} w={150} label="Folate synthesis" color={amber} />
      <text x="225" y="90" fontSize="8" fill={amber.fg} fontWeight={700}>Sulfonamides, trimethoprim</text>

      <Step x={60} y={110} w={140} label="30S / 50S ribosome" color={rose} />
      <text x="65" y="165" fontSize="8" fill={rose.fg} fontWeight={700}>Aminoglycosides, macrolides,</text>
      <text x="65" y="176" fontSize="8" fill={rose.fg} fontWeight={700}>tetracyclines, chloramphenicol</text>

      <Step x={220} y={110} w={150} label="DNA gyrase / RNA polymerase" color={violet} />
      <text x="225" y="165" fontSize="8" fill={violet.fg} fontWeight={700}>Fluoroquinolones, rifampicin</text>
    </svg>
  );
}

// 9b. Beta-lactam mechanism: PBP/transpeptidation inhibition and beta-lactamase resistance
export function BetaLactamDiagram() {
  return (
    <svg viewBox="0 0 460 280" className="w-full" role="img" aria-label="Beta-lactam mechanism showing PBP transpeptidation inhibition and beta-lactamase resistance">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="PBP (transpeptidase)" sub="cross-links peptidoglycan (D-Ala-D-Ala)" color={teal} />
      <Arrow x1={190} y1={48} x2={150} y2={70} />
      <Arrow x1={270} y1={48} x2={310} y2={70} />

      <Step x={15} y={70} w={200} h={40} label="Beta-lactam binds PBP" sub="structural mimic of D-Ala-D-Ala" color={amber} />
      <Arrow x1={115} y1={110} x2={115} y2={126} />
      <Step x={15} y={126} w={200} h={44} label="PBP irreversibly acylated" sub="cross-linking blocked" color={rose} />
      <Arrow x1={115} y1={170} x2={115} y2={186} />
      <Step x={15} y={186} w={200} h={40} label="Cell wall weakens" sub="osmotic lysis — bactericidal" color={rose} />

      <Step x={245} y={70} w={200} h={40} label="Bacterial beta-lactamase" sub="hydrolyzes the beta-lactam ring" color={violet} />
      <BlockMarker x={345} y={132} center label={["Clavulanate / sulbactam /", "tazobactam block this enzyme"]} />
      <Arrow x1={290} y1={110} x2={290} y2={180} />
      <Step x={245} y={180} w={200} h={40} label="Beta-lactam destroyed" sub="PBP never inhibited — resistance" color={violet} />

      <text x="230" y="252" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Beta-lactams only work if they reach an intact PBP before beta-lactamase destroys them</text>
      <text x="230" y="264" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Pairing with a beta-lactamase inhibitor restores activity against beta-lactamase-producing strains</text>
    </svg>
  );
}

// 10. Insulin signaling & antidiabetic drug targets
export function InsulinSignalingDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="w-full" role="img" aria-label="Insulin signaling pathway with antidiabetic drug targets">
      <ArrowDefs />
      <Step x={20} y={15} w={160} label="Pancreatic beta cell" sub="K-ATP channel closes → insulin release" color={teal} />
      <text x="190" y="30" fontSize="8.5" fontWeight={700} fill={amber.fg}>Sulfonylureas act here</text>
      <Arrow x1={100} y1={57} x2={100} y2={85} />
      <Step x={20} y={90} w={160} label="Insulin binds receptor" sub="on liver, muscle, fat" color={violet} />
      <Arrow x1={100} y1={132} x2={100} y2={160} />
      <Step x={20} y={165} w={160} label="GLUT4 translocation" sub="↑ glucose uptake into cells" color={emerald} />

      <Step x={230} y={15} w={170} label="Liver gluconeogenesis" color={rose} />
      <text x="235" y="30" fontSize="8.5" fontWeight={700} fill={rose.fg}>Metformin ↓ this pathway</text>
      <Step x={230} y={90} w={170} label="Renal proximal tubule" sub="SGLT2 reabsorbs glucose" color={magenta} />
      <text x="235" y="145" fontSize="8.5" fontWeight={700} fill={magenta.fg}>SGLT2 inhibitors block reabsorption</text>
      <text x="235" y="157" fontSize="8" fill="var(--color-muted-foreground)">→ glucosuria</text>
    </svg>
  );
}

// 11. Cell cycle & chemotherapy drug targets
export function CellCycleDiagram() {
  const cx = 150, cy = 105, r = 85;
  const phases = [
    { label: "G1", angle: -90, color: teal },
    { label: "S", angle: 0, color: violet },
    { label: "G2", angle: 90, color: amber },
    { label: "M", angle: 180, color: rose },
  ];
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Cell cycle diagram with chemotherapy drug targets">
      <ArrowDefs />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-muted-foreground)" strokeOpacity={0.4} strokeWidth={2} />
      {phases.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        return (
          <g key={p.label}>
            <circle cx={x} cy={y} r={22} fill={p.color.bg} stroke={p.color.fg} strokeOpacity={0.3} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight={700} fill={p.color.fg}>{p.label}</text>
          </g>
        );
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight={700} fill="var(--color-muted-foreground)">Mitosis</text>
      <text x="250" y="30" fontSize="9" fontWeight={700} fill={violet.fg}>S-phase specific:</text>
      <text x="250" y="42" fontSize="8.5" fill="var(--color-muted-foreground)">Methotrexate, 5-FU, cytarabine</text>
      <text x="250" y="65" fontSize="9" fontWeight={700} fill={rose.fg}>M-phase specific:</text>
      <text x="250" y="77" fontSize="8.5" fill="var(--color-muted-foreground)">Vincristine, paclitaxel</text>
      <text x="250" y="100" fontSize="9" fontWeight={700} fill={lime.fg}>Cell-cycle non-specific:</text>
      <text x="250" y="112" fontSize="8.5" fill="var(--color-muted-foreground)">Alkylating agents (cyclophosphamide),</text>
      <text x="250" y="124" fontSize="8.5" fill="var(--color-muted-foreground)">cisplatin, doxorubicin</text>
    </svg>
  );
}

// 12. Autonomic ganglionic transmission (nicotinic ACh)
export function GanglionTransmissionDiagram() {
  return (
    <svg viewBox="0 0 380 190" className="w-full" role="img" aria-label="Autonomic ganglionic transmission diagram showing acetylcholine acting on nicotinic receptors">
      <ArrowDefs />
      <Step x={10} y={30} w={100} h={44} label="Preganglionic" sub="neuron terminal" color={teal} />
      <Arrow x1={110} y1={52} x2={150} y2={52} />
      <circle cx={130} cy={52} r={5} fill={amber.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "0px", ["--ly0" as string]: "0px", ["--lx1" as string]: "28px", ["--ly1" as string]: "0px" }} />
      <Step x={150} y={30} w={110} h={44} label="Nicotinic (N) receptor" sub="ganglion synapse" color={amber} />
      <Arrow x1={260} y1={52} x2={300} y2={52} />
      <Step x={300} y={30} w={70} h={44} label="Postganglionic" color={teal} />
      <Arrow x1={205} y1={74} x2={205} y2={110} />
      <Step x={150} y={112} w={110} h={44} label="Effector organ" sub="smooth muscle / gland" color={emerald} />
      <text x="10" y="150" fontSize="8.5" fill="var(--color-muted-foreground)">Nicotinic receptors sit at EVERY autonomic ganglion — both</text>
      <text x="10" y="162" fontSize="8.5" fill="var(--color-muted-foreground)">sympathetic and parasympathetic — plus the skeletal NMJ.</text>
      <text x="150" y="182" textAnchor="middle" fontSize="8.5" fontWeight={700} fill={rose.fg}>Ganglion blockers (hexamethonium, trimethaphan) act here</text>
    </svg>
  );
}

// 12b. Neuromuscular junction: depolarizing vs non-depolarizing blockade
export function NmjBlockadeDiagram() {
  return (
    <svg viewBox="0 0 460 290" className="w-full" role="img" aria-label="Neuromuscular junction transmission with depolarizing and non-depolarizing blocking drugs compared">
      <ArrowDefs />
      <Step x={105} y={8} w={250} h={40} label="Motor neuron releases ACh" sub="binds Nm receptor at the motor end plate" color={teal} />
      <Arrow x1={170} y1={48} x2={140} y2={70} />
      <Arrow x1={290} y1={48} x2={320} y2={70} />

      <Step x={15} y={70} w={200} h={40} label="Succinylcholine" sub="mimics ACh — binds Nm receptor" color={amber} />
      <Arrow x1={115} y1={110} x2={115} y2={126} />
      <Step x={15} y={126} w={200} h={44} label="Sustained depolarization" sub="brief fasciculations, then flaccid paralysis" color={amber} />
      <BlockMarker x={115} y={188} center label={["Not hydrolyzed by AChE —", "metabolized by plasma", "pseudocholinesterase instead"]} />
      <text x={115} y="252" textAnchor="middle" fontSize="7.5" fontWeight={700} fill={rose.fg}>Neostigmine WORSENS this block</text>

      <Step x={245} y={70} w={200} h={40} label="Vecuronium / atracurium" sub="competes with ACh at Nm receptor" color={rose} />
      <Arrow x1={345} y1={110} x2={345} y2={126} />
      <Step x={245} y={126} w={200} h={44} label="Receptor blocked, channel shut" sub="flaccid paralysis, no fasciculations" color={rose} />
      <BlockMarker x={345} y={188} center label={["Competitive antagonist —", "surmountable by raising", "ACh at the synapse"]} />
      <text x={345} y="252" textAnchor="middle" fontSize="7.5" fontWeight={700} fill={emerald.fg}>Neostigmine REVERSES this block</text>

      <text x="230" y="274" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Same receptor, opposite drug behavior — one is an agonist that desensitizes it, the other a competitive blocker</text>
    </svg>
  );
}

// 13. Na+ channel gating and antiepileptic use-dependent block
export function IonChannelGatingDiagram() {
  const states = [
    { label: "Resting", sub: "closed, ready", color: teal },
    { label: "Open", sub: "Na+ influx", color: amber },
    { label: "Inactivated", sub: "refractory", color: rose },
  ];
  return (
    <svg viewBox="0 0 380 190" className="w-full" role="img" aria-label="Sodium channel gating states and antiepileptic drug action">
      <ArrowDefs />
      {states.map((s, i) => (
        <Step key={s.label} x={20 + i * 125} y={30} w={100} h={50} label={s.label} sub={s.sub} color={s.color} />
      ))}
      <Arrow x1={120} y1={55} x2={145} y2={55} />
      <Arrow x1={245} y1={55} x2={270} y2={55} />
      <path d="M 320 55 C 360 55, 360 130, 190 130 C 60 130, 40 100, 70 60" fill="none" stroke="var(--color-muted-foreground)" strokeWidth={1.4} strokeDasharray="3 3" opacity={0.5} markerEnd="url(#arrowhead)" />
      <text x="190" y="145" textAnchor="middle" fontSize="8.5" fill="var(--color-muted-foreground)">returns to resting after the refractory period</text>
      <circle cx={70} cy={55} r={4.5} fill={amber.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "0px", ["--ly0" as string]: "0px", ["--lx1" as string]: "230px", ["--ly1" as string]: "0px" }} />
      <text x="190" y="170" textAnchor="middle" fontSize="9" fontWeight={700} fill={rose.fg}>Phenytoin/carbamazepine bind the INACTIVATED state preferentially</text>
      <text x="190" y="184" textAnchor="middle" fontSize="8.5" fill="var(--color-muted-foreground)">— prolonging it, producing use-dependent block of rapidly firing neurons</text>
    </svg>
  );
}

// 13b. Local anesthetic use-dependent Na+ channel block (parallel to the antiepileptic diagram above)
export function LocalAnestheticBlockDiagram() {
  const states = [
    { label: "Resting", sub: "closed, ready", color: teal },
    { label: "Open", sub: "Na+ influx", color: amber },
    { label: "Inactivated", sub: "refractory", color: rose },
  ];
  return (
    <svg viewBox="0 0 380 214" className="w-full" role="img" aria-label="Local anesthetic use-dependent sodium channel block in a peripheral nerve axon, with differential fiber blockade">
      <ArrowDefs />
      {states.map((s, i) => (
        <Step key={s.label} x={20 + i * 125} y={30} w={100} h={50} label={s.label} sub={s.sub} color={s.color} />
      ))}
      <Arrow x1={120} y1={55} x2={145} y2={55} />
      <Arrow x1={245} y1={55} x2={270} y2={55} />
      <path d="M 320 55 C 360 55, 360 130, 190 130 C 60 130, 40 100, 70 60" fill="none" stroke="var(--color-muted-foreground)" strokeWidth={1.4} strokeDasharray="3 3" opacity={0.5} markerEnd="url(#arrowhead)" />
      <text x="190" y="145" textAnchor="middle" fontSize="8.5" fill="var(--color-muted-foreground)">peripheral nerve axon — not a CNS neuron</text>
      <circle cx={70} cy={55} r={4.5} fill={amber.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "0px", ["--ly0" as string]: "0px", ["--lx1" as string]: "230px", ["--ly1" as string]: "0px" }} />
      <text x="190" y="168" textAnchor="middle" fontSize="9" fontWeight={700} fill={rose.fg}>Local anesthetics bind OPEN & INACTIVATED states from inside the axon</text>
      <text x="190" y="182" textAnchor="middle" fontSize="8.5" fill="var(--color-muted-foreground)">— same use-dependent mechanism as antiepileptics, here blocking a nerve axon</text>
      <text x="190" y="200" textAnchor="middle" fontSize="8.5" fontWeight={700} fill={emerald.fg}>Small, rapidly-firing pain fibers (Aδ, C) block first — large myelinated motor fibers (Aα) block last</text>
    </svg>
  );
}

// 14. Oral absorption and hepatic first-pass metabolism vs IV
export function FirstPassMetabolismDiagram() {
  return (
    <svg viewBox="0 0 380 200" className="w-full" role="img" aria-label="Oral first-pass metabolism compared with intravenous administration">
      <ArrowDefs />
      <text x="10" y="16" fontSize="9" fontWeight={700} fill={teal.fg}>Oral route</text>
      <Step x={10} y={24} w={80} h={40} label="Oral dose" color={teal} />
      <Arrow x1={90} y1={44} x2={118} y2={44} />
      <Step x={118} y={24} w={80} h={40} label="GI absorption" color={teal} />
      <Arrow x1={198} y1={44} x2={226} y2={44} />
      <Step x={226} y={24} w={70} h={40} label="Portal vein" color={teal} />
      <Arrow x1={296} y1={44} x2={296} y2={44} />
      <Arrow x1={261} y1={64} x2={261} y2={90} />
      <Step x={196} y={92} w={130} h={46} label="Liver — CYP450" sub="first-pass metabolism" color={amber} />
      <circle cx={40} cy={44} r={4.5} fill={emerald.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "0px", ["--ly0" as string]: "0px", ["--lx1" as string]: "220px", ["--ly1" as string]: "70px" }} />
      <Arrow x1={261} y1={138} x2={261} y2={160} />
      <Step x={166} y={162} w={190} h={34} label="Reduced fraction reaches systemic circulation" color={rose} />
      <text x="10" y="180" fontSize="9" fontWeight={700} fill={emerald.fg}>IV route (bypasses first pass)</text>
      <path d="M 55 24 L 55 4 L 340 4 L 340 178" fill="none" stroke={emerald.fg} strokeWidth={1.6} strokeDasharray="4 3" opacity={0.6} markerEnd="url(#arrowhead)" />
      <text x="345" y="183" fontSize="8.5" fontWeight={700} fill={emerald.fg}>F = 1</text>
    </svg>
  );
}

// 15. Zero-order vs first-order elimination kinetics
export function KineticsOrderDiagram() {
  const t = [0, 1, 2, 3, 4, 5];
  const firstOrderY = t.map((x) => 140 - 120 * Math.pow(0.5, x));
  const firstOrderPath = t.map((x, i) => `${i === 0 ? "M" : "L"} ${40 + x * 55} ${firstOrderY[i]}`).join(" ");
  const zeroOrderPath = "M 40 20 L 260 140";
  return (
    <svg viewBox="0 0 340 190" className="w-full" role="img" aria-label="Zero-order versus first-order elimination kinetics">
      <ArrowDefs />
      <line x1="30" y1="150" x2="320" y2="150" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <line x1="30" y1="150" x2="30" y2="10" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <text x="175" y="168" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Time →</text>
      <text x="10" y="80" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)" transform="rotate(-90 10 80)">Plasma concentration →</text>
      <path d={firstOrderPath} fill="none" stroke={teal.fg} strokeWidth={2.5} pathLength={1} strokeDasharray={1} className="pathway-curve-draw" />
      <path d={zeroOrderPath} fill="none" stroke={rose.fg} strokeWidth={2.5} pathLength={1} strokeDasharray={1} className="pathway-curve-draw" />
      <text x="230" y="42" fontSize="9" fontWeight={700} fill={teal.fg}>First-order</text>
      <text x="200" y="54" fontSize="8" fill="var(--color-muted-foreground)">constant FRACTION/time; fixed t½</text>
      <text x="150" y="30" fontSize="9" fontWeight={700} fill={rose.fg}>Zero-order</text>
      <text x="130" y="14" fontSize="8" fill="var(--color-muted-foreground)">constant AMOUNT/time; t½ not fixed</text>
      <text x="35" y="165" fontSize="7.5" fill="var(--color-muted-foreground)">most drugs</text>
      <text x="35" y="176" fontSize="7.5" fill="var(--color-muted-foreground)">ethanol, phenytoin (high dose), aspirin (overdose)</text>
    </svg>
  );
}

// 16. Single-dose plasma concentration-time curve and therapeutic window
export function PlasmaConcentrationTimeDiagram() {
  const curve = "M 30 145 C 50 95, 75 35, 110 30 C 150 25, 200 55, 240 90 C 270 115, 300 130, 330 138";
  return (
    <svg viewBox="0 0 350 190" className="w-full" role="img" aria-label="Plasma concentration-time curve with therapeutic window">
      <ArrowDefs />
      <rect x="30" y="55" width="300" height="35" fill={emerald.bg} opacity={0.5} />
      <line x1="30" y1="55" x2="330" y2="55" stroke={rose.fg} strokeOpacity={0.5} strokeWidth={1.2} strokeDasharray="3 3" />
      <line x1="30" y1="90" x2="330" y2="90" stroke={emerald.fg} strokeOpacity={0.5} strokeWidth={1.2} strokeDasharray="3 3" />
      <text x="335" y="58" fontSize="7.5" fill={rose.fg}>MTC</text>
      <text x="335" y="93" fontSize="7.5" fill={emerald.fg}>MEC</text>
      <text x="70" y="70" fontSize="8" fontWeight={700} fill={emerald.fg}>Therapeutic window</text>
      <line x1="30" y1="150" x2="330" y2="150" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <line x1="30" y1="150" x2="30" y2="10" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <text x="180" y="168" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Time →</text>
      <text x="10" y="90" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)" transform="rotate(-90 10 90)">Plasma concentration →</text>
      <path d={curve} fill="none" stroke={violet.fg} strokeWidth={2.5} pathLength={1} strokeDasharray={1} className="pathway-curve-draw" />
      <line x1="110" y1="30" x2="110" y2="150" stroke={violet.fg} strokeOpacity={0.35} strokeDasharray="2 3" />
      <text x="110" y="22" textAnchor="middle" fontSize="8" fontWeight={700} fill={violet.fg}>Cmax</text>
      <text x="55" y="160" fontSize="7.5" fill="var(--color-muted-foreground)">absorption phase</text>
      <text x="230" y="160" fontSize="7.5" fill="var(--color-muted-foreground)">elimination phase</text>
      <text x="90" y="185" textAnchor="middle" fontSize="7.5" fill="var(--color-muted-foreground)">Tmax = time to peak concentration · AUC reflects total drug exposure</text>
    </svg>
  );
}

// 17. Receptor binding — agonist vs competitive vs non-competitive antagonist
export function ReceptorBindingDiagram() {
  return (
    <svg viewBox="0 0 380 210" className="w-full" role="img" aria-label="Agonist, competitive antagonist, and non-competitive antagonist receptor binding">
      <ArrowDefs />
      <text x="10" y="16" fontSize="9" fontWeight={700} fill={teal.fg}>Agonist alone</text>
      <rect x="10" y="24" width="90" height="40" rx="10" fill={teal.bg} stroke={teal.fg} strokeOpacity={0.3} />
      <text x="55" y="48" textAnchor="middle" fontSize="9" fontWeight={700} fill={teal.fg}>Receptor</text>
      <circle cx={30} cy={44} r={5} fill={violet.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "-40px", ["--ly0" as string]: "0px", ["--lx1" as string]: "0px", ["--ly1" as string]: "0px" }} />
      <Arrow x1={100} y1={44} x2={130} y2={44} />
      <Step x={130} y={24} w={90} h={40} label="Signal ON" sub="conformational change" color={emerald} />

      <text x="10" y="90" fontSize="9" fontWeight={700} fill={amber.fg}>+ Competitive antagonist (same site)</text>
      <rect x="10" y="98" width="90" height="40" rx="10" fill={amber.bg} stroke={amber.fg} strokeOpacity={0.3} />
      <text x="55" y="122" textAnchor="middle" fontSize="9" fontWeight={700} fill={amber.fg}>Receptor</text>
      <circle cx={30} cy={118} r={5} fill={amber.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "-40px", ["--ly0" as string]: "0px", ["--lx1" as string]: "0px", ["--ly1" as string]: "0px" }} />
      <Arrow x1={100} y1={118} x2={130} y2={118} />
      <Step x={130} y={98} w={90} h={40} label="Signal weak" sub="surmountable ↑agonist" color={amber} />

      <text x="10" y="164" fontSize="9" fontWeight={700} fill={rose.fg}>+ Non-competitive (allosteric site)</text>
      <rect x="10" y="172" width="90" height="40" rx="10" fill={rose.bg} stroke={rose.fg} strokeOpacity={0.3} />
      <text x="55" y="196" textAnchor="middle" fontSize="9" fontWeight={700} fill={rose.fg}>Receptor</text>
      <circle cx={30} cy={192} r={5} fill={teal.fg} />
      <circle cx={78} cy={182} r={4} fill={rose.fg} />
      <Arrow x1={100} y1={192} x2={130} y2={192} />
      <Step x={130} y={172} w={90} h={40} label="Signal OFF" sub="insurmountable" color={rose} />

      <text x="235" y="95" fontSize="8" fill="var(--color-muted-foreground)" style={{ maxWidth: 100 }}>Same-site competitor</text>
      <text x="235" y="107" fontSize="8" fill="var(--color-muted-foreground)">lowers apparent potency,</text>
      <text x="235" y="119" fontSize="8" fill="var(--color-muted-foreground)">not maximum effect.</text>
      <text x="235" y="169" fontSize="8" fill="var(--color-muted-foreground)">Allosteric binder lowers</text>
      <text x="235" y="181" fontSize="8" fill="var(--color-muted-foreground)">the maximum effect even</text>
      <text x="235" y="193" fontSize="8" fill="var(--color-muted-foreground)">with agonist still bound.</text>
    </svg>
  );
}

// 18. GABA-A receptor: benzodiazepine vs barbiturate site
export function GabaReceptorDiagram() {
  return (
    <svg viewBox="0 0 360 200" className="w-full" role="img" aria-label="GABA-A receptor chloride channel with benzodiazepine and barbiturate binding sites">
      <ArrowDefs />
      <rect x={130} y={30} width={100} height={110} rx={16} fill={teal.bg} stroke={teal.fg} strokeOpacity={0.35} strokeWidth={2} />
      <text x={180} y={22} textAnchor="middle" fontSize="9" fontWeight={700} fill={teal.fg}>GABA-A receptor (Cl- channel)</text>
      <circle cx={180} cy={85} r={16} fill="none" stroke={teal.fg} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="3 3" />
      <text x={180} y={89} textAnchor="middle" fontSize="8" fill={teal.fg}>Cl-</text>
      <circle cx={180} cy={40} r={5} fill={emerald.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "0px", ["--ly0" as string]: "0px", ["--lx1" as string]: "0px", ["--ly1" as string]: "35px" }} />
      <text x={180} y={30} textAnchor="middle" fontSize="7.5" fill={emerald.fg}>GABA</text>
      <Arrow x1={70} y1={60} x2={128} y2={60} />
      <Step x={10} y={38} w={95} h={44} label="Benzodiazepine" sub="↑ frequency of opening" color={amber} />
      <Arrow x1={70} y1={140} x2={128} y2={110} />
      <Step x={10} y={118} w={95} h={44} label="Barbiturate" sub="↑ duration; GABA-independent at high dose" color={rose} />
      <text x="250" y="45" fontSize="8" fill="var(--color-muted-foreground)">Needs GABA present</text>
      <text x="250" y="57" fontSize="8" fill="var(--color-muted-foreground)">→ ceiling effect, safer</text>
      <text x="250" y="120" fontSize="8" fill="var(--color-muted-foreground)">Can open channel alone</text>
      <text x="250" y="132" fontSize="8" fill="var(--color-muted-foreground)">at high dose → no ceiling,</text>
      <text x="250" y="144" fontSize="8" fill="var(--color-muted-foreground)">dangerous in overdose</text>
      <text x="180" y="175" textAnchor="middle" fontSize="8.5" fontWeight={700} fill={rose.fg}>Flumazenil blocks the benzodiazepine site only</text>
    </svg>
  );
}

// 19. Diuretic sites of action along the nephron
export function NephronDiureticDiagram() {
  return (
    <svg viewBox="0 0 460 336" className="w-full" role="img" aria-label="Diuretic drug classes mapped onto their nephron sites of action, from the proximal tubule to the collecting duct">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={36} label="Glomerulus" sub="filtration begins" color={blue} />
      <Arrow x1={230} y1={44} x2={230} y2={54} />

      <Step x={145} y={54} w={170} h={36} label="Proximal tubule" sub="~65% of Na+/HCO3- reabsorbed" color={teal} />
      <BlockMarker x={145} y={72} labelDx={-12} label={["Acetazolamide", "↓ HCO3- reabsorption"]} />
      <BlockMarker x={315} y={72} labelDx={12} label={["Mannitol (osmotic) —", "↓ water reabsorption"]} />
      <Arrow x1={230} y1={90} x2={230} y2={110} />

      <Step x={145} y={110} w={170} h={36} label="Descending thin limb" sub="water reabsorbed, no Na+ transport" color={violet} />
      <Arrow x1={230} y1={146} x2={230} y2={156} />

      <Step x={145} y={156} w={170} h={36} label="Thick ascending limb" sub="Na-K-2Cl symporter" color={rose} />
      <BlockMarker x={315} y={174} labelDx={12} label={["Loop diuretics", "(furosemide, bumetanide)"]} />
      <Arrow x1={230} y1={192} x2={230} y2={202} />

      <Step x={145} y={202} w={170} h={36} label="Distal convoluted tubule" sub="Na-Cl symporter" color={amber} />
      <BlockMarker x={315} y={220} labelDx={12} label={["Thiazides", "(hydrochlorothiazide)"]} />
      <Arrow x1={230} y1={238} x2={230} y2={248} />

      <Step x={145} y={248} w={170} h={36} label="Collecting duct" sub="ENaC, aldosterone-sensitive" color={emerald} />
      <BlockMarker x={315} y={266} labelDx={12} label={["K+-sparing agents", "(spironolactone, amiloride)"]} />

      <text x="230" y="306" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Loop diuretics act where the most Na+ is normally reabsorbed (~25%) — the most potent class</text>
      <text x="230" y="318" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Mannitol works osmotically, without blocking any specific transporter</text>
    </svg>
  );
}

// 20. Arachidonic acid cascade and NSAID / corticosteroid targets
export function ArachidonicAcidDiagram() {
  return (
    <svg viewBox="0 0 380 210" className="w-full" role="img" aria-label="Arachidonic acid cascade showing NSAID and corticosteroid drug targets">
      <ArrowDefs />
      <Step x={140} y={10} w={110} h={38} label="Membrane phospholipids" color={teal} />
      <Arrow x1={195} y1={48} x2={195} y2={72} />
      <Step x={140} y={74} w={110} h={38} label="Arachidonic acid" color={teal} />
      <Step x={10} y={10} w={110} h={36} label="Corticosteroids" sub="inhibit phospholipase A2" color={rose} />
      <Arrow x1={65} y1={46} x2={140} y2={45} />

      <Arrow x1={195} y1={112} x2={100} y2={140} />
      <Arrow x1={195} y1={112} x2={290} y2={140} />
      <Step x={20} y={142} w={130} h={42} label="COX pathway" sub="prostaglandins, thromboxane" color={amber} />
      <Step x={230} y={142} w={140} h={42} label="LOX pathway" sub="leukotrienes" color={violet} />

      <text x={85} y={200} textAnchor="middle" fontSize="8" fontWeight={700} fill={amber.fg}>NSAIDs / coxibs block COX here</text>
      <circle cx={20} cy={163} r={4.5} fill={amber.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "0px", ["--ly0" as string]: "0px", ["--lx1" as string]: "125px", ["--ly1" as string]: "0px" }} />
      <text x={300} y={200} textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Leukotrienes drive bronchospasm — montelukast blocks their receptor</text>
    </svg>
  );
}

// 21. Gastric acid secretion and antiulcer drug targets
export function GastricAcidDiagram() {
  return (
    <svg viewBox="0 0 380 210" className="w-full" role="img" aria-label="Gastric parietal cell acid secretion pathway with antiulcer drug targets">
      <ArrowDefs />
      <Step x={10} y={14} w={95} h={38} label="Acetylcholine" sub="vagal (M3)" color={teal} />
      <Step x={10} y={62} w={95} h={38} label="Gastrin" sub="(CCK-B)" color={amber} />
      <Step x={10} y={110} w={95} h={38} label="Histamine" sub="(H2)" color={rose} />
      <Arrow x1={105} y1={33} x2={150} y2={70} />
      <Arrow x1={105} y1={81} x2={150} y2={80} />
      <Arrow x1={105} y1={129} x2={150} y2={90} />
      <Step x={150} y={62} w={110} h={44} label="Parietal cell" sub="H+/K+-ATPase (proton pump)" color={violet} />
      <Arrow x1={260} y1={84} x2={300} y2={84} />
      <Step x={300} y={62} w={70} h={44} label="H+ into lumen" sub="gastric acid" color={violet} />
      <circle cx={195} cy={84} r={5} fill={violet.fg} className="pathway-ligand" style={{ ["--lx0" as string]: "0px", ["--ly0" as string]: "0px", ["--lx1" as string]: "90px", ["--ly1" as string]: "0px" }} />
      <text x="10" y="175" fontSize="8.5" fontWeight={700} fill={violet.fg}>PPIs (omeprazole) irreversibly block the pump itself —</text>
      <text x="10" y="187" fontSize="8.5" fill="var(--color-muted-foreground)">deeper, longer-lasting suppression than blocking any single input.</text>
      <text x="10" y="200" fontSize="8.5" fill="var(--color-muted-foreground)">H2 blockers (famotidine) only block the histamine input.</text>
    </svg>
  );
}

// 22. HIV replication cycle and antiretroviral drug classes
export function HivReplicationDiagram() {
  const steps = [
    { label: "Entry / fusion", sub: "CD4 + co-receptor", color: teal },
    { label: "Reverse transcription", sub: "RNA → DNA", color: amber },
    { label: "Integration", sub: "viral DNA → host genome", color: rose },
    { label: "Transcription / translation", sub: "viral proteins made", color: violet },
    { label: "Assembly & maturation", sub: "protease cleaves precursors", color: emerald },
  ];
  return (
    <svg viewBox="0 0 380 230" className="w-full" role="img" aria-label="HIV replication cycle with antiretroviral drug class targets">
      <ArrowDefs />
      {steps.map((s, i) => (
        <g key={s.label}>
          <Step x={10} y={10 + i * 40} w={220} h={32} label={s.label} sub={s.sub} color={s.color} />
          {i < steps.length - 1 && <Arrow x1={120} y1={42 + i * 40} x2={120} y2={50 + i * 40} />}
        </g>
      ))}
      <text x="245" y="26" fontSize="8" fontWeight={700} fill={teal.fg}>Entry/fusion inhibitors</text>
      <text x="245" y="38" fontSize="7.5" fill="var(--color-muted-foreground)">maraviroc, enfuvirtide</text>
      <text x="245" y="66" fontSize="8" fontWeight={700} fill={amber.fg}>NRTIs / NNRTIs</text>
      <text x="245" y="78" fontSize="7.5" fill="var(--color-muted-foreground)">tenofovir, efavirenz</text>
      <text x="245" y="106" fontSize="8" fontWeight={700} fill={rose.fg}>Integrase inhibitors</text>
      <text x="245" y="118" fontSize="7.5" fill="var(--color-muted-foreground)">dolutegravir, raltegravir</text>
      <text x="245" y="186" fontSize="8" fontWeight={700} fill={emerald.fg}>Protease inhibitors</text>
      <text x="245" y="198" fontSize="7.5" fill="var(--color-muted-foreground)">lopinavir/ritonavir, atazanavir</text>
      <text x="120" y="222" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Combination ART targets multiple steps at once to minimize resistance</text>
    </svg>
  );
}

// 23. GPCR second-messenger signaling (Gq, Gs, Gi)
export function GpcrSignalingDiagram() {
  const branches = [
    { label: "Gq", sub: "↑ IP3/DAG → ↑ Ca2+", effect: "smooth muscle contraction (α1, M3)", color: rose, y: 20 },
    { label: "Gs", sub: "↑ adenylyl cyclase → ↑ cAMP", effect: "↑ heart rate/contractility (β1); relaxation (β2)", color: teal, y: 80 },
    { label: "Gi", sub: "↓ adenylyl cyclase → ↓ cAMP", effect: "presynaptic inhibition (α2, M2)", color: amber, y: 140 },
  ];
  return (
    <svg viewBox="0 0 380 200" className="w-full" role="img" aria-label="G-protein coupled receptor signaling through Gq, Gs, and Gi pathways">
      <ArrowDefs />
      <Step x={10} y={80} w={90} h={40} label="Agonist binds" sub="GPCR" color={violet} />
      {branches.map((b) => (
        <g key={b.label}>
          <Arrow x1={100} y1={100} x2={140} y2={b.y + 20} />
          <Step x={140} y={b.y} w={90} h={40} label={b.label} sub={b.sub} color={b.color} />
          <Arrow x1={230} y1={b.y + 20} x2={260} y2={b.y + 20} />
          <text x={265} y={b.y + 12} fontSize="7.5" fill="var(--color-muted-foreground)">{b.effect.split("; ")[0]}</text>
          {b.effect.includes(";") && <text x={265} y={b.y + 24} fontSize="7.5" fill="var(--color-muted-foreground)">{b.effect.split("; ")[1]}</text>}
        </g>
      ))}
      <text x="190" y="190" textAnchor="middle" fontSize="8.5" fontWeight={700} fill="var(--color-muted-foreground)">Same receptor family, three different G-proteins — knowing the G-protein predicts the effect</text>
    </svg>
  );
}

// 24. Parkinson's disease: nigrostriatal dopamine deficit and drug targets
export function ParkinsonDiagram() {
  return (
    <svg viewBox="0 0 460 344" className="w-full" role="img" aria-label="Parkinson's disease nigrostriatal dopamine pathway with levodopa, dopamine agonist, and MAO-B inhibitor sites of action">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Substantia nigra" sub="dopaminergic neurons degenerate in PD" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Dopamine synthesis ↓" sub="tyrosine → L-dopa → dopamine" color={amber} />
      <BlockMarker x={145} y={90} labelDx={-12} label={["Levodopa + carbidopa", "replace dopamine (precursor)"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Dopamine released in striatum" sub="binds D2 receptors" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Dopamine agonists", "(pramipexole, ropinirole)", "directly stimulate D2"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={145} y={194} w={170} h={40} label="Dopamine broken down" sub="by MAO-B" color={rose} />
      <BlockMarker x={145} y={214} labelDx={-12} label={["MAO-B inhibitors", "(selegiline) block breakdown"]} />
      <Arrow x1={230} y1={234} x2={230} y2={256} />
      <Step x={105} y={256} w={250} h={40} label="Restored striatal dopamine tone" sub="↓ bradykinesia, rigidity, tremor" color={emerald} />

      <text x="230" y="316" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Carbidopa prevents peripheral conversion of levodopa to dopamine</text>
      <text x="230" y="328" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">— reducing nausea and allowing more levodopa to reach the brain</text>
    </svg>
  );
}

// 25. Migraine pharmacology: trigeminovascular activation and triptan mechanism
export function MigraineDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Trigeminovascular migraine mechanism with triptan sites of action">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Trigeminal nerve activation" sub="trigeminovascular system" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="CGRP + serotonin release" sub="meningeal vasodilation" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Triptans (5-HT1B/1D agonists)", "cause vasoconstriction &", "↓ CGRP release"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Pain via trigeminal nucleus" sub="neurogenic inflammation" color={rose} />
      <BlockMarker x={145} y={152} labelDx={-12} label={["Triptans also block pain", "transmission centrally"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Migraine headache" sub="throbbing, unilateral, photophobia" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Triptans are contraindicated in coronary artery disease — the same</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">vasoconstriction relieving migraine can worsen cardiac ischemia</text>
    </svg>
  );
}

// 26. Alcohol metabolism and disulfiram's ALDH block
export function AlcoholMetabolismDiagram() {
  return (
    <svg viewBox="0 0 460 222" className="w-full" role="img" aria-label="Alcohol metabolism pathway with disulfiram blocking aldehyde dehydrogenase">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Ethanol" color={teal} />
      <text x="245" y="60" fontSize="7.5" fontWeight={700} fill="var(--color-muted-foreground)">ADH</text>
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Acetaldehyde" sub="toxic intermediate" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Disulfiram blocks ALDH here", "→ acetaldehyde accumulates", "→ flushing, tachycardia, nausea"]} />
      <text x="245" y="122" fontSize="7.5" fontWeight={700} fill="var(--color-muted-foreground)">ALDH</text>
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Acetate" sub="harmless, further metabolized" color={emerald} />

      <text x="230" y="192" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">This is the basis of disulfiram aversive therapy for alcohol dependence</text>
      <text x="230" y="204" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">— drinking while on it causes an immediate, unpleasant reaction</text>
    </svg>
  );
}

// 27. Organophosphate poisoning and antidote mechanism
export function OrganophosphateDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Organophosphate poisoning mechanism with atropine and pralidoxime antidote sites of action">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Organophosphate exposure" sub="pesticide, nerve agent" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Acetylcholinesterase inhibited" sub="irreversibly (until 'aging')" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Pralidoxime (2-PAM) reactivates", "AChE — must be given before", "the enzyme-OP bond 'ages'"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="ACh accumulates" sub="muscarinic + nicotinic overactivity" color={rose} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Salivation, miosis, bradycardia" sub="+ fasciculations, weakness, resp. failure" color={emerald} />
      <BlockMarker x={105} y={214} labelDx={-12} label={["Atropine blocks only the", "muscarinic effects"]} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Atropine alone does not fix the nicotinic (motor) weakness</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">— pralidoxime is essential for that, and both are given together</text>
    </svg>
  );
}

// 28. Opioid overdose reversal by naloxone
export function NaloxoneReversalDiagram() {
  return (
    <svg viewBox="0 0 460 222" className="w-full" role="img" aria-label="Naloxone competitive displacement of opioid at the mu receptor in overdose reversal">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Opioid overdose" sub="excess mu-receptor activation" color={rose} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Naloxone administered" sub="high-affinity competitive antagonist" color={teal} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Displaces opioid from the", "mu-receptor by competition"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={105} y={132} w={250} h={40} label="Receptor blocked, effect reversed" sub="breathing restored" color={emerald} />

      <text x="230" y="192" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Naloxone's short half-life means re-sedation is possible after reversing</text>
      <text x="230" y="204" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">a longer-acting opioid — repeat dosing or an infusion may be needed</text>
    </svg>
  );
}

// 29. Vitamin K cycle and warfarin mechanism
export function VitaminKCycleDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Vitamin K cycle with warfarin blocking vitamin K epoxide reductase">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Vitamin K (reduced form)" color={teal} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Carboxylates factors II, VII, IX, X" sub="via vitamin K-dependent carboxylase" color={amber} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Vitamin K epoxide" sub="oxidized byproduct" color={violet} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Warfarin blocks vitamin K", "epoxide reductase (VKORC1)", "— stops K regeneration"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Clotting factor synthesis falls" sub="without regenerated vitamin K" color={rose} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Effect is delayed 2-3 days until existing factors degrade —</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">reversed with vitamin K or fresh frozen plasma/PCC in emergencies</text>
    </svg>
  );
}

// 30. Histamine H1-mediated allergic response and antihistamine site of action
export function HistamineAllergyDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Histamine H1-mediated allergic response with antihistamine site of action">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Allergen exposure" sub="IgE-mediated mast cell degranulation" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Histamine released" sub="binds H1 receptors" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Antihistamines (cetirizine,", "diphenhydramine) block H1"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="H1 activation" sub="vasodilation, ↑permeability, itching" color={rose} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Urticaria, rhinitis, itching" sub="allergic symptoms" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">First-generation antihistamines (diphenhydramine) cross the</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">blood-brain barrier and sedate; second-generation agents largely don't</text>
    </svg>
  );
}

// 31. Serotonin syndrome mechanism from combined serotonergic drugs
export function SerotoninSyndromeDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Serotonin syndrome mechanism from combined serotonergic drug use">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Serotonergic drug combo" sub="e.g. SSRI + MAOI or + tramadol" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Excess synaptic 5-HT" sub="↓ reuptake AND ↓ breakdown at once" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["SSRI blocks reuptake;", "MAOI blocks breakdown —", "together they compound"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="5-HT1A/2A overactivation" color={rose} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Serotonin syndrome" sub="hyperthermia, clonus, agitation" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Clonus/hyperreflexia (too much serotonin) distinguishes this from</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">neuroleptic malignant syndrome, which features rigidity instead</text>
    </svg>
  );
}

// 32. Uterine smooth muscle: oxytocin vs tocolytics
export function UterineMuscleDiagram() {
  return (
    <svg viewBox="0 0 460 150" className="w-full" role="img" aria-label="Uterine smooth muscle pharmacology comparing oxytocin activation with tocolytic relaxation">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Uterine smooth muscle" sub="myometrium" color={violet} />
      <BlockMarker x={145} y={28} labelDx={-12} label={["Oxytocin → ↑ intracellular Ca2+", "→ contraction (induction/", "augmentation, PPH prevention)"]} />
      <BlockMarker x={315} y={28} labelDx={12} label={["Tocolytics relax the muscle:", "nifedipine blocks Ca2+ entry;", "beta-2 agonists ↑ cAMP"]} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Opposite clinical uses" sub="induction vs delaying preterm labor" color={emerald} />

      <text x="230" y="130" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Same muscle, opposite pharmacology depending on the clinical goal</text>
    </svg>
  );
}

// 33. Antitubercular drug targets on one mycobacterial cell diagram
export function AntitubercularDiagram() {
  return (
    <svg viewBox="0 0 460 344" className="w-full" role="img" aria-label="Antitubercular drug targets on the mycobacterial cell — isoniazid, rifampin, ethambutol, and pyrazinamide">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Mycobacterium tuberculosis" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Mycolic acid synthesis" sub="cell wall component" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Isoniazid blocks", "mycolic acid synthesis"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Bacterial RNA synthesis" sub="RNA polymerase" color={rose} />
      <BlockMarker x={145} y={152} labelDx={-12} label={["Rifampin blocks bacterial", "RNA polymerase"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={145} y={194} w={170} h={40} label="Arabinogalactan synthesis" sub="cell wall component" color={teal} />
      <BlockMarker x={315} y={214} labelDx={12} label={["Ethambutol blocks", "arabinosyl transferase"]} />
      <Arrow x1={230} y1={234} x2={230} y2={256} />
      <Step x={145} y={256} w={170} h={40} label="Metabolism in acidic phagosome" color={emerald} />
      <BlockMarker x={145} y={276} labelDx={-12} label={["Pyrazinamide active here —", "exact mechanism unclear"]} />

      <text x="230" y="316" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Four drugs hit four independent targets simultaneously —</text>
      <text x="230" y="328" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">this multi-drug regimen is exactly what prevents resistance from emerging</text>
    </svg>
  );
}

// 34. Antifungal mechanisms: azoles, polyenes, echinocandins
export function AntifungalDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Antifungal drug mechanisms at three independent fungal cell targets">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Ergosterol synthesis" sub="fungal CYP450 (lanosterol demethylase)" color={amber} />
      <BlockMarker x={315} y={28} labelDx={12} label={["Azoles (fluconazole) inhibit", "this enzyme"]} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Ergosterol in cell membrane" sub="maintains membrane integrity" color={teal} />
      <BlockMarker x={145} y={90} labelDx={-12} label={["Polyenes (amphotericin B)", "bind ergosterol, forming pores"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Beta-glucan synthase" sub="fungal cell wall component" color={rose} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Echinocandins (caspofungin)", "inhibit beta-glucan synthesis"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Membrane/wall disruption" sub="fungal cell death" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Selective toxicity comes from targeting ergosterol/fungal wall components</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">that human cells (which use cholesterol, not ergosterol) simply don't have</text>
    </svg>
  );
}

// 35. Antimalarial mechanisms by parasite life-cycle stage
export function AntimalarialDiagram() {
  return (
    <svg viewBox="0 0 460 344" className="w-full" role="img" aria-label="Antimalarial drug mechanisms mapped to the parasite life cycle stage each one targets">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Mosquito bite → sporozoites" sub="liver stage begins" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Liver (exo-erythrocytic) stage" sub="hypnozoites form in P. vivax/ovale" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Primaquine kills hypnozoites", "— the only 'radical cure' drug"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Blood (erythrocytic) stage" sub="merozoites invade RBCs — symptoms begin" color={teal} />
      <BlockMarker x={145} y={152} labelDx={-12} label={["Chloroquine blocks heme", "polymerization to hemozoin"]} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Artemisinin generates", "free radicals in the parasite"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={145} y={194} w={170} h={40} label="Gametocytes form" sub="the transmission stage" color={rose} />
      <BlockMarker x={315} y={214} labelDx={12} label={["Primaquine also kills", "gametocytes — blocks transmission"]} />
      <Arrow x1={230} y1={234} x2={230} y2={256} />
      <Step x={105} y={256} w={250} h={40} label="Clinical cure vs transmission block" sub="different drugs for different jobs" color={emerald} />

      <text x="230" y="316" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Chloroquine/artemisinin treat the acute illness; only primaquine reaches</text>
      <text x="230" y="328" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">the dormant liver hypnozoites — screen for G6PD deficiency before giving it</text>
    </svg>
  );
}

// 36. Anthelmintic mechanisms: albendazole vs ivermectin
export function AnthelminticDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Anthelmintic drug mechanisms comparing microtubule inhibition with glutamate-gated chloride channel activation">
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Helminth microtubules" sub="cytoskeleton, glucose uptake" color={amber} />
      <BlockMarker x={315} y={28} labelDx={12} label={["Albendazole/mebendazole block", "tubulin polymerization"]} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Glucose uptake fails" sub="parasite starves, immobilized" color={amber} />

      <Step x={145} y={132} w={170} h={40} label="Glutamate-gated Cl- channels" sub="invertebrate-specific" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Ivermectin opens these", "channels → paralysis"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Parasite paralysis/death, expelled" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Glutamate-gated Cl- channels don't exist in mammals — ivermectin's</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">selective toxicity depends on this, plus limited CNS entry via P-glycoprotein</text>
    </svg>
  );
}

// 37. Cancer immunotherapy: PD-1/PD-L1 and CTLA-4 checkpoint blockade
export function CheckpointBlockadeDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Cancer immunotherapy checkpoint blockade restoring T-cell activity against tumor cells" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="T-cell recognizes tumor antigen" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="PD-1 (T cell) binds PD-L1" sub="tumor cell's inhibitory signal" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Pembrolizumab / nivolumab", "block PD-1"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="CTLA-4 outcompetes CD28" sub="for B7 costimulatory signal" color={rose} />
      <BlockMarker x={145} y={152} labelDx={-12} label={["Ipilimumab blocks", "CTLA-4"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="T-cell activation restored" sub="→ tumor cell killing" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">The trade-off: releasing the brakes on T-cells can also unleash them on</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">healthy tissue — immune-related adverse effects like colitis, pneumonitis</text>
    </svg>
  );
}

// 38. P-glycoprotein efflux pump: drug resistance and interactions
export function PgpEffluxDiagram() {
  return (
    <svg viewBox="0 0 460 222" className="w-full" role="img" aria-label="P-glycoprotein efflux pump mechanism and its role in drug interactions" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Drug crosses a barrier" sub="gut epithelium, BBB, renal tubule" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="P-glycoprotein (ABC pump)" sub="actively pumps drug back out" color={amber} />
      <BlockMarker x={145} y={90} labelDx={-12} label={["Inhibitors (verapamil,", "ketoconazole) ↑ substrate levels"]} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Inducers (rifampin)", "↓ substrate levels"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={105} y={132} w={250} h={40} label="Altered absorption / CNS entry / resistance" color={rose} />

      <text x="230" y="192" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Digoxin is the classic P-gp substrate — this is exactly why verapamil</text>
      <text x="230" y="204" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">and other P-gp inhibitors can precipitate digoxin toxicity</text>
    </svg>
  );
}

// 39. Renal tubular ion trapping (pH-dependent reabsorption/excretion)
export function IonTrappingDiagram() {
  return (
    <svg viewBox="0 0 460 150" className="w-full" role="img" aria-label="Renal tubular ion trapping showing pH-dependent excretion of weak acids and weak bases" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Drug filtered into renal tubule" sub="urine pH determines ionization" color={violet} />
      <BlockMarker x={145} y={28} labelDx={-12} label={["Alkaline urine traps weak ACIDS", "(aspirin) — ionized, can't be", "reabsorbed, excreted faster"]} />
      <BlockMarker x={315} y={28} labelDx={12} label={["Acidic urine traps weak BASES", "(amphetamine) — ionized, can't", "be reabsorbed, excreted faster"]} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Ion trapping used therapeutically" sub="e.g. urinary alkalinization in ASA overdose" color={emerald} />

      <text x="230" y="130" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Only the un-ionized (uncharged) form crosses tubular membrane to be reabsorbed</text>
    </svg>
  );
}

// 40. Beta-blocker cardiac mechanism
export function BetaBlockerDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Beta-blocker cardiac mechanism, cardioselective versus non-selective" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Beta-1 receptor" sub="SA node, AV node, myocardium" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Beta-blocker occupies receptor" sub="competitive antagonist" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Cardioselective (atenolol,", "metoprolol) vs non-selective", "(propranolol, also blocks β2)"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="↓ cAMP → ↓ Ca2+ handling" color={teal} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="↓ rate, ↓ contractility, ↓ AV conduction" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Non-selective agents also block beta-2 — bronchospasm risk in asthma,</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">and masking of tachycardia, a key hypoglycemia warning sign, in diabetics</text>
    </svg>
  );
}

// 41. Calcium channel blocker mechanism: dihydropyridine vs non-dihydropyridine
export function CalciumChannelBlockerDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Calcium channel blocker mechanism comparing dihydropyridine vascular selectivity with non-dihydropyridine cardiac selectivity" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="L-type Ca2+ channels" sub="vascular smooth muscle & cardiac tissue" color={violet} />
      <Arrow x1={190} y1={48} x2={150} y2={70} />
      <Arrow x1={270} y1={48} x2={310} y2={70} />
      <Step x={15} y={70} w={200} h={40} label="Dihydropyridines" sub="amlodipine, nifedipine" color={amber} />
      <BlockMarker x={110} y={132} center label={["Mainly vascular smooth", "muscle → vasodilation,", "minimal cardiac effect"]} />
      <Step x={245} y={70} w={200} h={40} label="Non-dihydropyridines" sub="verapamil, diltiazem" color={rose} />
      <BlockMarker x={350} y={132} center label={["Mainly cardiac tissue →", "↓ rate, ↓ contractility,", "↓ AV conduction"]} />

      <text x="230" y="190" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Combining a non-DHP with a beta-blocker risks severe bradycardia/heart block —</text>
      <text x="230" y="202" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">dihydropyridines are the safer pairing with a beta-blocker</text>
    </svg>
  );
}

// 42. Nitrate mechanism: NO/cGMP pathway
export function NitrateDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Organic nitrate nitric oxide cGMP pathway causing venodilation and reduced preload" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Organic nitrate" sub="glyceryl trinitrate, isosorbide" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Converted to nitric oxide (NO)" sub="in vascular smooth muscle" color={amber} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Activates guanylyl cyclase" sub="↑ cGMP" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Sildenafil also ↑ cGMP —", "combined use → severe hypotension"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Venodilation → ↓ preload" sub="↓ myocardial O2 demand" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Nitrates and PDE5 inhibitors (sildenafil) are an absolute combination —</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">both raise cGMP through different mechanisms, risking dangerous hypotension</text>
    </svg>
  );
}

// 43. Statin mechanism: HMG-CoA reductase inhibition and LDL receptor upregulation
export function StatinDiagram() {
  return (
    <svg viewBox="0 0 460 344" className="w-full" role="img" aria-label="Statin mechanism of HMG-CoA reductase inhibition leading to LDL receptor upregulation" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Hepatocyte cholesterol synthesis" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="HMG-CoA reductase" sub="rate-limiting enzyme" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Statins competitively", "inhibit this enzyme"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="↓ Intracellular cholesterol" sub="compensatory response triggered" color={teal} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={145} y={194} w={170} h={40} label="↑ LDL receptor expression" sub="on the hepatocyte surface" color={rose} />
      <Arrow x1={230} y1={234} x2={230} y2={256} />
      <Step x={105} y={256} w={250} h={40} label="↑ LDL uptake from blood" sub="↓ serum LDL cholesterol" color={emerald} />

      <text x="230" y="316" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Myopathy/rhabdomyolysis risk rises when statins are combined with fibrates</text>
      <text x="230" y="328" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">or CYP3A4 inhibitors, which raise statin plasma levels</text>
    </svg>
  );
}

// 44. Antiemetic mechanisms at the CTZ and vomiting center
export function AntiemeticDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Antiemetic mechanisms at the chemoreceptor trigger zone and vomiting center" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Emetic stimulus" sub="chemo, motion, post-op, GI irritation" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Chemoreceptor trigger zone" sub="outside the blood-brain barrier" color={amber} />
      <BlockMarker x={145} y={90} labelDx={-12} label={["5-HT3 antagonists", "(ondansetron) block here"]} />
      <BlockMarker x={315} y={90} labelDx={12} label={["D2 antagonists", "(metoclopramide) block here"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Vomiting center activated" sub="medulla" color={rose} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Nausea and vomiting" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Ondansetron can prolong the QT interval — worth checking other</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">QT-prolonging drugs before adding it</text>
    </svg>
  );
}

// 45. Laxative mechanisms compared: bulk-forming, osmotic, stimulant
export function LaxativeDiagram() {
  return (
    <svg viewBox="0 0 460 254" className="w-full" role="img" aria-label="Laxative mechanisms compared: bulk-forming, osmotic, and stimulant action in the colon" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Colon" color={violet} />
      <BlockMarker x={145} y={28} labelDx={-12} label={["Bulk-forming (psyllium) —", "absorbs water, ↑ stool mass"]} />
      <BlockMarker x={315} y={28} labelDx={12} label={["Osmotic (lactulose, PEG) —", "retains water in the lumen"]} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Stimulant laxatives" sub="bisacodyl, senna" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Directly stimulate enteric", "nerves → ↑ motility"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={105} y={132} w={250} h={40} label="↑ Stool water content + motility" sub="→ defecation" color={emerald} />

      <text x="230" y="192" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Bulk-forming agents need adequate fluid intake to work — without it,</text>
      <text x="230" y="204" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">they can worsen obstruction instead of relieving constipation</text>
    </svg>
  );
}

// 46. Opioid tolerance and dependence: receptor downregulation and desensitization
export function OpioidToleranceDiagram() {
  return (
    <svg viewBox="0 0 460 344" className="w-full" role="img" aria-label="Opioid tolerance and dependence mechanism through receptor desensitization and downregulation" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Chronic opioid exposure" sub="repeated mu-receptor activation" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Receptor desensitization" sub="uncouples from G-protein" color={amber} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Receptor downregulation" sub="↓ receptor number at the membrane" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Higher doses now needed for", "the same effect = tolerance"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={145} y={194} w={170} h={40} label="Compensatory cAMP upregulation" sub="opposes chronic Gi inhibition" color={rose} />
      <BlockMarker x={145} y={214} labelDx={-12} label={["Abrupt cessation → cAMP", "rebound = withdrawal syndrome"]} />
      <Arrow x1={230} y1={234} x2={230} y2={256} />
      <Step x={105} y={256} w={250} h={40} label="Tolerance + physical dependence" color={emerald} />

      <text x="230" y="316" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Tolerance to analgesia develops faster than tolerance to respiratory</text>
      <text x="230" y="328" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">depression — a key reason escalating opioid doses can become dangerous</text>
    </svg>
  );
}

// 47. Gout pharmacology: xanthine oxidase, colchicine, uricosurics
export function GoutDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Gout pharmacology showing xanthine oxidase inhibition, colchicine, and uricosuric drug sites" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Purine metabolism → uric acid" sub="via xanthine oxidase" color={violet} />
      <BlockMarker x={315} y={28} labelDx={12} label={["Allopurinol/febuxostat inhibit", "xanthine oxidase"]} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Urate crystal deposition" sub="neutrophil-mediated inflammation" color={amber} />
      <BlockMarker x={145} y={90} labelDx={-12} label={["Colchicine blocks neutrophil", "microtubules/migration"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Renal urate handling" sub="reabsorption vs excretion" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Probenecid inhibits urate", "reabsorption (uricosuric)"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="↓ Urate burden, ↓ acute inflammation" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Allopurinol is never started during an acute attack — mobilizing</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">urate stores can actually worsen the flare</text>
    </svg>
  );
}

// 48. Calcineurin inhibitor immunosuppression
export function CalcineurinInhibitorDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Calcineurin inhibitor mechanism blocking IL-2 gene transcription in T cells" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="T-cell receptor activation" sub="antigen recognition" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Calcineurin (phosphatase)" sub="dephosphorylates NFAT" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Cyclosporine / tacrolimus", "block calcineurin"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="NFAT enters nucleus" sub="activates IL-2 gene transcription" color={teal} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="↓ IL-2 → ↓ T-cell proliferation" sub="immunosuppression" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Nephrotoxicity is the major dose-limiting toxicity for both</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">cyclosporine and tacrolimus — levels are monitored closely</text>
    </svg>
  );
}

// 49. Acyclovir nucleoside analog mechanism
export function AcyclovirMechanismDiagram() {
  return (
    <svg viewBox="0 0 460 344" className="w-full" role="img" aria-label="Acyclovir nucleoside analog activation by viral thymidine kinase and DNA chain termination" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Acyclovir enters the cell" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Viral thymidine kinase" sub="first phosphorylation step" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Only HSV/VZV-infected cells", "have this enzyme — selective"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Host kinases complete phosphorylation" sub="→ acyclovir triphosphate" color={teal} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={145} y={194} w={170} h={40} label="Incorporated into viral DNA" sub="by viral DNA polymerase" color={rose} />
      <BlockMarker x={145} y={214} labelDx={-12} label={["Chain termination — no further", "DNA synthesis possible"]} />
      <Arrow x1={230} y1={234} x2={230} y2={256} />
      <Step x={105} y={256} w={250} h={40} label="Viral replication halted" color={emerald} />

      <text x="230" y="316" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">This selectivity — needing a viral enzyme for the first step — is why</text>
      <text x="230" y="328" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">acyclovir has such a wide safety margin in uninfected cells</text>
    </svg>
  );
}

// 50. Neuraminidase inhibitor mechanism
export function NeuraminidaseInhibitorDiagram() {
  return (
    <svg viewBox="0 0 460 222" className="w-full" role="img" aria-label="Neuraminidase inhibitor mechanism blocking influenza viral release from infected cells" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Influenza buds from infected cell" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Neuraminidase" sub="cleaves sialic acid, releasing virions" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Oseltamivir/zanamivir", "block neuraminidase"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={105} y={132} w={250} h={40} label="Virions clump, can't infect new cells" sub="↓ viral spread" color={emerald} />

      <text x="230" y="192" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Most effective when started within 48 hours of symptom onset —</text>
      <text x="230" y="204" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">late initiation offers little benefit</text>
    </svg>
  );
}

// 51. Epinephrine in anaphylaxis: combined alpha-1, beta-1, beta-2 action
export function EpinephrineAnaphylaxisDiagram() {
  return (
    <svg viewBox="0 0 460 344" className="w-full" role="img" aria-label="Epinephrine's combined alpha-1, beta-1, and beta-2 actions in reversing anaphylaxis" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Epinephrine (IM, anterolateral thigh)" sub="non-selective adrenergic agonist" color={violet} />
      <Arrow x1={190} y1={48} x2={150} y2={70} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Arrow x1={270} y1={48} x2={310} y2={70} />

      <Step x={15} y={70} w={130} h={44} label="Alpha-1" sub="vasoconstriction" color={amber} />
      <BlockMarker x={80} y={132} center label={["↑ BP, ↓ mucosal", "edema/angioedema"]} />

      <Step x={165} y={70} w={130} h={44} label="Beta-1" sub="↑ HR, ↑ contractility" color={teal} />
      <BlockMarker x={230} y={132} center label={["Reverses", "hypotension/shock"]} />

      <Step x={315} y={70} w={130} h={44} label="Beta-2" sub="bronchodilation" color={rose} />
      <BlockMarker x={380} y={132} center label={["Relieves bronchospasm,", "↓ mediator release"]} />

      <Arrow x1={80} y1={168} x2={190} y2={200} />
      <Arrow x1={230} y1={168} x2={230} y2={200} />
      <Arrow x1={380} y1={168} x2={270} y2={200} />
      <Step x={105} y={200} w={250} h={40} label="Anaphylactic shock reversed" color={emerald} />

      <text x="230" y="264" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Epinephrine is first-line and given BEFORE antihistamines or</text>
      <text x="230" y="276" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">steroids — those don't act fast enough for the acute reaction</text>
    </svg>
  );
}

// 52. PDE5 inhibitor mechanism in corpus cavernosum
export function Pde5InhibitorDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="PDE5 inhibitor mechanism in the NO-cGMP pathway of corpus cavernosum smooth muscle" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Sexual stimulation → NO release" sub="in corpus cavernosum" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Guanylyl cyclase activated" sub="↑ cGMP" color={amber} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="PDE5" sub="normally breaks down cGMP" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Sildenafil/tadalafil inhibit", "PDE5 — cGMP persists"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Smooth muscle relaxation → erection" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Never combine with nitrates — both raise cGMP through different</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">mechanisms, risking severe, potentially fatal hypotension</text>
    </svg>
  );
}

// 53. Antitussive mechanism at the medullary cough center
export function AntitussiveDiagram() {
  return (
    <svg viewBox="0 0 460 222" className="w-full" role="img" aria-label="Antitussive mechanism suppressing the medullary cough center" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Airway irritation" sub="cough reflex triggered" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Afferent signal to medulla" sub="cough center" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Dextromethorphan/codeine", "suppress the cough center"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={105} y={132} w={250} h={40} label="↓ Cough reflex" color={emerald} />

      <text x="230" y="192" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Dextromethorphan has minimal analgesic/addictive potential —</text>
      <text x="230" y="204" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">codeine, a weak opioid, carries more of both</text>
    </svg>
  );
}

// 54. Centrally-acting skeletal muscle relaxants: baclofen vs diazepam
export function MuscleRelaxantDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Centrally-acting skeletal muscle relaxant mechanisms comparing baclofen's GABA-B action with diazepam's GABA-A action" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Spinal motor neuron excitability" color={violet} />
      <Arrow x1={190} y1={48} x2={150} y2={70} />
      <Arrow x1={270} y1={48} x2={310} y2={70} />
      <Step x={15} y={70} w={200} h={40} label="GABA-B receptor" sub="presynaptic, spinal cord" color={amber} />
      <BlockMarker x={110} y={132} center label={["Baclofen agonist here →", "↓ excitatory transmitter release"]} />
      <Step x={245} y={70} w={200} h={40} label="GABA-A receptor" sub="postsynaptic Cl- channel" color={rose} />
      <BlockMarker x={350} y={132} center label={["Diazepam enhances here →", "↑ inhibitory tone"]} />

      <text x="230" y="190" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Both reduce muscle spasticity/spasm, but baclofen carries far less</text>
      <text x="230" y="202" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">sedation and dependence risk than diazepam at typical doses</text>
    </svg>
  );
}

// 55. Anxiolytic mechanism comparison: buspirone vs benzodiazepine
export function AnxiolyticComparisonDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Anxiolytic mechanism comparison between buspirone 5-HT1A partial agonism and benzodiazepine GABA-A modulation" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Anxiety symptoms" color={violet} />
      <Arrow x1={190} y1={48} x2={150} y2={70} />
      <Arrow x1={270} y1={48} x2={310} y2={70} />
      <Step x={15} y={70} w={200} h={40} label="5-HT1A receptor" sub="presynaptic autoreceptor" color={amber} />
      <BlockMarker x={110} y={132} center label={["Buspirone: partial agonist,", "slow onset (2-4 weeks),", "no sedation/dependence"]} />
      <Step x={245} y={70} w={200} h={40} label="GABA-A receptor" sub="chloride channel" color={rose} />
      <BlockMarker x={350} y={132} center label={["Benzodiazepine: allosteric", "modulator, rapid onset,", "sedation/dependence risk"]} />

      <text x="230" y="200" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Buspirone suits chronic/generalized anxiety; benzodiazepines</text>
      <text x="230" y="212" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">are reserved for acute, short-term relief</text>
    </svg>
  );
}

// 56. Iron absorption and anemia pharmacology
export function IronAbsorptionDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Duodenal iron absorption via ferroportin, hepcidin regulation, and oral iron therapy" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Dietary iron in duodenum" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Absorbed into enterocyte" sub="via DMT1 (ferrous form)" color={amber} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Ferroportin" sub="exports iron into blood" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Hepcidin (↑ in inflammation)", "degrades ferroportin → anemia", "of chronic disease"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Iron-transferrin → bone marrow" sub="oral iron corrects true deficiency" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Take oral iron on an empty stomach or with vitamin C for better</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">absorption; avoid taking it with antacids or dairy</text>
    </svg>
  );
}

// 57. Vitamin B12/folate metabolism and megaloblastic anemia
export function B12FolateDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Vitamin B12 and folate metabolism through methylmalonyl-CoA and homocysteine pathways" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Vitamin B12 (cobalamin)" sub="needs intrinsic factor for absorption" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Methylmalonyl-CoA → succinyl-CoA" sub="B12-dependent" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["B12 deficiency → methylmalonic", "acid accumulates (neuro symptoms)"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Homocysteine → methionine" sub="needs BOTH B12 and folate" color={teal} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Megaloblastic anemia if either is low" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Giving folate alone in B12 deficiency corrects the anemia but MASKS</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">progression of neurologic damage — a classic exam trap</text>
    </svg>
  );
}

// 58. Heparin-induced thrombocytopenia (HIT) mechanism
export function HitDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Heparin-induced thrombocytopenia mechanism through PF4-heparin antibody complexes activating platelets" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Heparin binds platelet factor 4 (PF4)" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="IgG antibody forms" sub="against the PF4-heparin complex" color={amber} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Complex binds platelet Fc receptors" color={teal} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Platelet activation → thrombosis" sub="paradoxically LOW platelets, HIGH clot risk" color={rose} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--color-muted-foreground)">Stop heparin immediately and switch to a non-heparin anticoagulant</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">(argatroban) — never just switch to LMWH, which cross-reacts</text>
    </svg>
  );
}

// 59. Phase I vs Phase II drug metabolism
export function MetabolismPhasesDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Phase I oxidation versus Phase II conjugation drug metabolism reactions" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Parent drug" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Phase I: oxidation/reduction" sub="mainly CYP450" color={amber} />
      <BlockMarker x={315} y={90} labelDx={12} label={["Often activates a prodrug", "(e.g. codeine → morphine)"]} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Phase II: conjugation" sub="glucuronidation, sulfation, acetylation" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["Makes the molecule more", "water-soluble for excretion"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="Excreted (renal / biliary)" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Some drugs (e.g. lorazepam) skip Phase I entirely — useful in liver</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">disease, since Phase II capacity is often preserved longer than Phase I</text>
    </svg>
  );
}

// 60. Blood-brain barrier drug permeability
export function BbbPermeabilityDiagram() {
  return (
    <svg viewBox="0 0 460 282" className="w-full" role="img" aria-label="Blood-brain barrier drug permeability determined by tight junctions, lipophilicity, and P-glycoprotein efflux" >
      <ArrowDefs />
      <Step x={145} y={8} w={170} h={40} label="Brain capillary" sub="tight junctions between endothelial cells" color={violet} />
      <Arrow x1={230} y1={48} x2={230} y2={70} />
      <Step x={145} y={70} w={170} h={40} label="Lipophilic, small, un-ionized drugs" sub="cross the BBB easily" color={amber} />
      <Arrow x1={230} y1={110} x2={230} y2={132} />
      <Step x={145} y={132} w={170} h={40} label="Polar / ionized / large molecules" sub="blocked by tight junctions" color={teal} />
      <BlockMarker x={315} y={152} labelDx={12} label={["P-glycoprotein actively pumps", "some lipophilic drugs back out"]} />
      <Arrow x1={230} y1={172} x2={230} y2={194} />
      <Step x={105} y={194} w={250} h={40} label="CNS entry depends on all three factors" color={emerald} />

      <text x="230" y="254" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">Inflammation (e.g. meningitis) disrupts the BBB, letting normally-</text>
      <text x="230" y="266" textAnchor="middle" fontSize="8" fill="var(--color-muted-foreground)">excluded antibiotics like penicillin penetrate far better</text>
    </svg>
  );
}
