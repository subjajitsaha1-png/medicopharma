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

// 7. Coagulation cascade & anticoagulant sites
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

