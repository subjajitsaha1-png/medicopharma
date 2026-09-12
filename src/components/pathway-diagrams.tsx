// Original animated diagrams for pharmacology study reference.
// Hand-built for this app — not sourced or traced from any textbook.
import { violet, teal, amber, rose, emerald, blue, magenta, lime } from "@/lib/palette";

function Step({ x, y, w = 110, h = 42, label, sub, color }: { x: number; y: number; w?: number; h?: number; label: string; sub?: string; color: { bg: string; fg: string } }) {
  return (
    <g>
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-muted-foreground)" strokeWidth={1.6} markerEnd="url(#arrowhead)" opacity={0.55} />;
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
      <path d={agonist} fill="none" stroke={violet.fg} strokeWidth={2.5} />
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
      <path d={path} fill="none" stroke={teal.fg} strokeWidth={2.5} />
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

// 5. RAAS pathway with drug targets
export function RaasDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="w-full" role="img" aria-label="Renin-angiotensin-aldosterone pathway with drug targets">
      <ArrowDefs />
      <Step x={20} y={15} w={130} label="Renin" sub="from JG cells" color={teal} />
      <Arrow x1={150} y1={36} x2={190} y2={36} />
      <Step x={195} y={15} w={130} label="Angiotensinogen → I" color={teal} />
      <Arrow x1={260} y1={57} x2={260} y2={85} />
      <Step x={195} y={90} w={130} label="Angiotensin I" color={amber} />
      <text x="330" y="80" fontSize="9" fontWeight={700} fill={rose.fg}>ACE inhibitors block here</text>
      <Arrow x1={260} y1={132} x2={260} y2={160} />
      <Step x={195} y={165} w={130} label="Angiotensin II" color={rose} />
      <text x="330" y="155" fontSize="9" fontWeight={700} fill={violet.fg}>ARBs block AT1 receptor</text>

      <Arrow x1={195} y1={186} x2={50} y2={186} />
      <Step x={20} y={165} w={130} label="Vasoconstriction" sub="↑ blood pressure" color={rose} />

      <Arrow x1={325} y1={186} x2={370} y2={186} />
      <Step x={330} y={165} w={80} h={42} label="Aldosterone" sub="Na+/H2O retention" color={magenta} />
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
      <path d={curve} fill="none" stroke={blue.fg} strokeWidth={2.5} />
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
export function CoagulationDiagram() {
  return (
    <svg viewBox="0 0 420 230" className="w-full" role="img" aria-label="Coagulation cascade with anticoagulant drug sites">
      <ArrowDefs />
      <Step x={20} y={15} w={160} label="Intrinsic pathway" sub="XII → XI → IX" color={teal} />
      <Step x={230} y={15} w={160} label="Extrinsic pathway" sub="Tissue factor → VII" color={amber} />
      <text x="20" y="55" fontSize="8.5" fill="var(--color-muted-foreground)">Heparin ↑ antithrombin III → inhibits IIa & Xa</text>
      <Arrow x1={100} y1={57} x2={165} y2={90} />
      <Arrow x1={310} y1={57} x2={245} y2={90} />
      <Step x={155} y={95} w={110} label="Factor X → Xa" sub="common pathway" color={rose} />
      <Arrow x1={210} y1={137} x2={210} y2={165} />
      <Step x={155} y={170} w={110} label="Prothrombin (II) → Thrombin (IIa)" color={rose} />
      <text x="30" y="185" fontSize="8.5" fill="var(--color-muted-foreground)">Warfarin blocks synthesis of II, VII, IX, X (vitamin K–dependent)</text>
      <Arrow x1={155} y1={191} x2={20} y2={191} />
      <Step x={280} y={95} w={130} label="Fibrinogen → Fibrin" sub="stable clot" color={violet} />
      <Arrow x1={265} y1={116} x2={280} y2={116} />
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
