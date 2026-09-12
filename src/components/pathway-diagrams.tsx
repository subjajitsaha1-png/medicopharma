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

