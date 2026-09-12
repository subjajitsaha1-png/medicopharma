// Original reference lists covering the practical/viva component of Indian MBBS
// pharmacology — prescription writing, the CAL (computer-assisted learning)
// experiments that replaced live animal experiments after the 2012 CPCSEA/MCI
// directive, spotter identification, and viva-voce topics by unit. All wording
// is original; nothing here is copied from any textbook or manual.

export interface PrescriptionTopic {
  id: string;
  condition: string;
  drugsToWrite: string;
  note: string;
}

export interface CalExperiment {
  id: string;
  title: string;
  whatItShows: string;
  vivaPoint: string;
}

export interface Spotter {
  id: string;
  name: string;
  identifyBy: string;
  vivaPoint: string;
}

export interface VivaTopicGroup {
  topicId: string;
  questions: string[];
}

export const PRESCRIPTION_TOPICS: PrescriptionTopic[] = [
  { id: "rx-1", condition: "Acute bronchial asthma (attack)", drugsToWrite: "Nebulized salbutamol + ipratropium, IV/oral corticosteroid", note: "Mention route, frequency, and when to step down to a maintenance inhaler." },
  { id: "rx-2", condition: "Essential hypertension (newly diagnosed, uncomplicated)", drugsToWrite: "Amlodipine or an ACE inhibitor/ARB, once daily", note: "State why a fixed-dose combination is avoided as first-line in a treatment-naive patient." },
  { id: "rx-3", condition: "Type 2 diabetes mellitus (newly diagnosed)", drugsToWrite: "Metformin, with lifestyle advice", note: "Justify metformin as first-line and note the renal function check before starting." },
  { id: "rx-4", condition: "Peptic ulcer disease / GERD", drugsToWrite: "PPI (omeprazole) + antacid if needed; H. pylori regimen if indicated", note: "Be ready to write the full H. pylori triple therapy if the case specifies a positive test." },
  { id: "rx-5", condition: "Community-acquired pneumonia (outpatient, uncomplicated)", drugsToWrite: "Oral amoxicillin or a macrolide", note: "Justify empirical choice and mention when to escalate to inpatient IV therapy." },
  { id: "rx-6", condition: "Acute migraine attack", drugsToWrite: "NSAID or triptan, with an antiemetic", note: "Distinguish acute abortive therapy from prophylactic therapy (propranolol, amitriptyline)." },
  { id: "rx-7", condition: "Major depressive disorder", drugsToWrite: "SSRI (e.g. sertraline), once daily", note: "Mention the delayed onset of therapeutic effect (2-4 weeks) and initial anxiety/activation." },
  { id: "rx-8", condition: "Generalized tonic-clonic seizure disorder", drugsToWrite: "Sodium valproate or levetiracetam", note: "Justify choice with attention to the patient's sex/pregnancy potential (valproate's teratogenicity)." },
  { id: "rx-9", condition: "Rheumatoid arthritis (active disease)", drugsToWrite: "Methotrexate (DMARD) + short-term NSAID/low-dose steroid bridge", note: "Mention folic acid supplementation alongside methotrexate." },
  { id: "rx-10", condition: "Acute gout attack", drugsToWrite: "NSAID (or colchicine), not a urate-lowering drug", note: "Explain why allopurinol is never started during an acute attack." },
  { id: "rx-11", condition: "Iron deficiency anemia (pregnant patient)", drugsToWrite: "Oral ferrous salt + folic acid", note: "Mention counseling on GI side effects and taking on an empty stomach or with vitamin C." },
  { id: "rx-12", condition: "Acute diarrhea (adult, non-bloody)", drugsToWrite: "ORS + zinc (if pediatric) + loperamide only if appropriate", note: "State when antibiotics are and are not indicated." },
  { id: "rx-13", condition: "Urinary tract infection (uncomplicated, outpatient)", drugsToWrite: "Nitrofurantoin or a fluoroquinolone per local sensitivity pattern", note: "Mention duration of therapy and hydration advice." },
  { id: "rx-14", condition: "Postoperative pain (moderate, day 1)", drugsToWrite: "IV/oral paracetamol + NSAID; opioid only if severe", note: "Demonstrate multimodal analgesia reasoning, not opioid-first prescribing." },
  { id: "rx-15", condition: "Allergic rhinitis", drugsToWrite: "Second-generation oral antihistamine (cetirizine/levocetirizine)", note: "Explain why a second-generation agent is preferred over a first-generation one (sedation)." },
];

export const CAL_EXPERIMENTS: CalExperiment[] = [
  { id: "cal-1", title: "Bioassay of acetylcholine on frog rectus abdominis muscle", whatItShows: "Dose-dependent contraction of skeletal muscle by ACh acting on nicotinic receptors, demonstrated via a matching bioassay against a standard.", vivaPoint: "Explain the 3-bracketing (or 4-bracketing) matching method used to estimate an unknown drug's concentration against a known standard." },
  { id: "cal-2", title: "Bioassay of histamine on guinea pig ileum", whatItShows: "Smooth muscle contraction via H1 receptor activation, and how a specific antagonist shifts the dose-response curve.", vivaPoint: "Distinguish a competitive antagonist's parallel rightward shift from a non-competitive antagonist's reduced maximum response on the same tissue." },
  { id: "cal-3", title: "Effect of drugs on rabbit's isolated intestine / rat ileum", whatItShows: "Direct comparison of agonist and antagonist effects on smooth muscle tone and motility.", vivaPoint: "Be ready to identify which drug class (parasympathomimetic vs parasympatholytic) was applied from the tracing shape alone." },
  { id: "cal-4", title: "Dose-response curve construction and ED50 determination", whatItShows: "How graded responses to increasing drug concentration are plotted, and how ED50 is read off the curve.", vivaPoint: "Explain why a log-dose axis is used instead of a linear one, and how potency is compared between two curves." },
  { id: "cal-5", title: "Effect of local anesthetics on frog sciatic nerve-gastrocnemius preparation", whatItShows: "Progressive nerve conduction block with increasing local anesthetic exposure.", vivaPoint: "Explain the order in which nerve fiber types (small myelinated pain fibers first) are blocked." },
  { id: "cal-6", title: "Bioassay of oxytocin on isolated rat/guinea pig uterus", whatItShows: "Dose-dependent uterine smooth muscle contraction, used historically to standardize oxytocin preparations.", vivaPoint: "State the clinical uses of oxytocin (labor induction/augmentation, PPH prevention) and its key caution (uterine hyperstimulation)." },
  { id: "cal-7", title: "Effect of digitalis on frog heart (kymograph tracing)", whatItShows: "Positive inotropic effect at therapeutic concentration, progressing to arrhythmia and arrest ('digitalis toxicity') at higher concentration.", vivaPoint: "Correlate the tracing changes with the Na+/K+-ATPase mechanism and explain why hypokalemia worsens toxicity." },
  { id: "cal-8", title: "Clark's/Finney's collection of standard bioassay graphs (spotter-style)", whatItShows: "Reading and interpreting a pre-recorded dose-response tracing rather than running the experiment live.", vivaPoint: "Practice reading an unlabeled tracing and stating which drug/antagonist combination it most likely represents." },
];

export const SPOTTERS: Spotter[] = [
  { id: "sp-1", name: "Metered-dose inhaler (MDI) with spacer", identifyBy: "Small pressurized canister in a plastic actuator, often shown with a spacer device attached.", vivaPoint: "Explain correct MDI technique and why a spacer improves lung deposition and reduces oral candidiasis risk with inhaled steroids." },
  { id: "sp-2", name: "Dry powder inhaler (DPI, e.g. rotahaler/diskus type)", identifyBy: "No propellant canister; requires a forceful inhalation to disperse the powder dose.", vivaPoint: "Contrast the inhalation technique with an MDI — DPIs need a fast, deep inhalation rather than a slow one." },
  { id: "sp-3", name: "Insulin syringe / insulin pen", identifyBy: "Fine, short needle; syringe barrel marked in units, not mL.", vivaPoint: "State why insulin is dosed in units and never interchanged with a standard mL-marked syringe." },
  { id: "sp-4", name: "Nebulizer set (mask, mouthpiece, tubing)", identifyBy: "Mask/mouthpiece connected to corrugated tubing and a medication chamber.", vivaPoint: "Identify situations where nebulization is preferred over an MDI (severe attack, young children, altered consciousness)." },
  { id: "sp-5", name: "Oral rehydration salts (ORS) sachet", identifyBy: "Labeled powder sachet for reconstitution in a specified volume of water.", vivaPoint: "State the WHO-recommended reduced-osmolarity ORS composition rationale and correct reconstitution volume." },
  { id: "sp-6", name: "Ampoule vs vial (single-dose vs multi-dose)", identifyBy: "Ampoule: sealed glass, snap-open, single use. Vial: rubber-stoppered, can be multi-dose.", vivaPoint: "Explain why a multi-dose vial typically contains a preservative and an ampoule does not." },
  { id: "sp-7", name: "Auto-injector (e.g. epinephrine auto-injector type device)", identifyBy: "Pen-shaped device with a spring-loaded needle mechanism and a safety cap.", vivaPoint: "State the indication (anaphylaxis), correct injection site (anterolateral thigh), and why IM (not IV) is used first-line." },
  { id: "sp-8", name: "Oxygen mask types (simple, non-rebreather, Venturi)", identifyBy: "Distinguished by the presence/absence of a reservoir bag and color-coded Venturi valve.", vivaPoint: "Match each mask type to the approximate FiO2 range it delivers and when each is clinically preferred." },
  { id: "sp-9", name: "IV cannula / branula", identifyBy: "Color-coded hub indicating gauge size.", vivaPoint: "State the standard color-gauge correspondence and when a larger-bore cannula is chosen (e.g. rapid transfusion)." },
  { id: "sp-10", name: "Tablet vs enteric-coated vs sustained-release formulation (as shown/described)", identifyBy: "Described by coating and disintegration behavior rather than appearance alone.", vivaPoint: "Explain why an enteric-coated tablet should not be crushed, and how a sustained-release formulation changes dosing frequency." },
];

export const VIVA_TOPICS: VivaTopicGroup[] = [
  { topicId: "general", questions: [
    "Define bioavailability and list two factors that reduce it for an oral drug.",
    "What is the difference between zero-order and first-order kinetics? Give one example drug for each.",
    "Define therapeutic index and explain its clinical significance.",
    "Differentiate a competitive from a non-competitive antagonist using a dose-response curve.",
    "What is enzyme induction, and why does its onset differ from enzyme inhibition?",
  ]},
  { topicId: "ans", questions: [
    "List the receptors activated by acetylcholine and their locations.",
    "What is the antidote for organophosphate poisoning, and why are two drugs needed?",
    "Why is a non-selective beta-blocker used cautiously in an asthmatic patient?",
    "Differentiate atropine from ipratropium in terms of systemic absorption and use.",
    "What is the mechanism of action of neostigmine, and name one contraindication.",
  ]},
  { topicId: "cvs", questions: [
    "Why do ACE inhibitors cause a dry cough but ARBs do not?",
    "Classify antiarrhythmic drugs by the Vaughan-Williams system with one example each.",
    "Compare the electrolyte effects of loop and thiazide diuretics.",
    "What is the antidote for digoxin toxicity, and what factor predisposes to it?",
    "Why are direct oral anticoagulants not routinely monitored like warfarin?",
  ]},
  { topicId: "cns", questions: [
    "Compare the mechanism of benzodiazepines and barbiturates at the GABA-A receptor.",
    "Why is clozapine reserved for treatment-resistant schizophrenia?",
    "What is serotonin syndrome, and which two drug classes most commonly cause it together?",
    "Why is valproate avoided in a woman of childbearing potential when alternatives exist?",
    "State the mechanism and one important adverse effect of ketamine.",
  ]},
  { topicId: "analgesics", questions: [
    "Why does aspirin's antiplatelet effect outlast its plasma half-life?",
    "Differentiate paracetamol from a classic NSAID in terms of anti-inflammatory action.",
    "What is the mechanism and antidote for paracetamol overdose?",
    "Explain the WHO analgesic ladder with one drug example per step.",
    "Why does NSAID use risk renal impairment in a volume-depleted patient?",
  ]},
  { topicId: "antimicrobial", questions: [
    "Why are aminoglycosides ineffective against anaerobic organisms?",
    "Differentiate a bactericidal from a bacteriostatic drug, with one example each.",
    "Why is vancomycin reserved for MRSA and not used as first-line therapy?",
    "Explain the synergistic mechanism of co-trimoxazole.",
    "Why are fluoroquinolones used cautiously in children?",
  ]},
  { topicId: "antiviral", questions: [
    "Explain why acyclovir selectively affects HSV/VZV-infected cells over normal cells.",
    "What is the mechanism of action of oseltamivir, and when should it be started for best effect?",
    "Compare the mechanisms of amphotericin B and fluconazole.",
    "Explain how chloroquine kills the malaria parasite.",
  ]},
  { topicId: "endocrine", questions: [
    "Why does metformin rarely cause hypoglycemia when used alone?",
    "Why are sulfonylureas ineffective in type 1 diabetes?",
    "Explain the mechanism and a key risk of SGLT2 inhibitors.",
    "Why must chronic systemic corticosteroids be tapered rather than stopped abruptly?",
    "Explain tamoxifen's tissue-selective estrogen receptor activity.",
  ]},
  { topicId: "gi-resp", questions: [
    "Why do PPIs achieve more complete acid suppression than H2 blockers?",
    "Why should long-acting beta-2 agonists never be used alone in asthma?",
    "Explain the mechanism of ondansetron and one important adverse effect.",
    "Why is ipratropium particularly useful in COPD?",
  ]},
  { topicId: "chemo", questions: [
    "How does leucovorin rescue normal cells from methotrexate toxicity?",
    "What is the dose-limiting toxicity of doxorubicin, and how is it monitored?",
    "Why is mesna given with cyclophosphamide?",
    "Differentiate cell-cycle-specific from cell-cycle-non-specific anticancer drugs.",
  ]},
  { topicId: "toxicology", questions: [
    "List five classic drug-antidote pairs.",
    "Why is activated charcoal ineffective for iron, lithium, and alcohol poisoning?",
    "Differentiate serotonin syndrome from neuroleptic malignant syndrome.",
    "Explain the principle of ion trapping in salicylate poisoning management.",
  ]},
];
