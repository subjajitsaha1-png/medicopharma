// Original structured "teaching layer" content, one entry per topic.
// Organizing pattern (CONCEPT -> MECHANISM -> CONSEQUENCE -> CLINICAL USE -> ADVERSE EFFECTS -> EXAM APPLICATION)
// is a generic pedagogical sequence used across pharmacology education; all wording,
// examples, tables and flowcharts below are original and independently written for
// this app — none of it is copied from any textbook, including Lippincott Illustrated
// Reviews: Pharmacology, which was consulted only for general sequencing ideas.

export interface SimpleTable {
  headers: string[];
  rows: string[][];
}

export interface ClinicalCorrelation {
  scenario: string;
  mechanism: string;
  effect: string;
  adverseEffect: string;
  examClue: string;
}

export interface ConfusionPair {
  left: string;
  right: string;
  explanation: string;
}

export interface TopicOverview {
  whyItMatters: string;
  coreIdea: string;
  classification?: SimpleTable;
  mechanismTitle?: string;
  mechanismSteps?: string[];
  clinicalCorrelation?: ClinicalCorrelation;
  highYield: string[];
  examTraps?: string[];
  quickTable?: SimpleTable;
  confusionPairs?: ConfusionPair[];
}

export const TOPIC_OVERVIEWS: Record<string, TopicOverview> = {
  general: {
    whyItMatters:
      "Every other unit in pharmacology is an application of these rules. Once you understand how a drug moves through the body and how it produces an effect, drug-specific facts stop being isolated trivia and start being predictable consequences.",
    coreIdea:
      "Pharmacokinetics is what the body does to the drug (ADME). Pharmacodynamics is what the drug does to the body (receptor binding -> effect). Almost every exam question is really asking which of these two buckets a fact belongs to.",
    classification: {
      headers: ["Kinetic order", "What stays constant", "Half-life", "Example"],
      rows: [
        ["First-order", "A constant fraction is cleared per unit time", "Fixed, dose-independent", "Most drugs at therapeutic doses"],
        ["Zero-order", "A constant amount is cleared per unit time", "Not fixed — rises with dose", "Ethanol, phenytoin (high dose), aspirin (overdose)"],
      ],
    },
    mechanismTitle: "Pharmacokinetic pathway",
    mechanismSteps: [
      "Administration (route chosen)",
      "Absorption (crossing membranes into blood)",
      "Distribution (protein binding, Vd, tissue penetration)",
      "Metabolism (mostly hepatic — Phase I oxidation, Phase II conjugation)",
      "Elimination (mostly renal, some biliary/pulmonary)",
    ],
    clinicalCorrelation: {
      scenario: "A patient on phenytoin has their dose increased slightly and develops toxicity out of proportion to the dose change.",
      mechanism: "Phenytoin metabolism becomes saturated near therapeutic levels and switches from first-order to zero-order kinetics.",
      effect: "A small dose increase can produce a disproportionately large rise in plasma concentration.",
      adverseEffect: "Nystagmus, ataxia, and sedation as levels climb — classic phenytoin toxicity signs.",
      examClue: "\"Small dose change, big level change\" almost always points to zero-order/saturable kinetics.",
    },
    highYield: [
      "Loading dose depends on volume of distribution (Vd); maintenance dose depends on clearance.",
      "It takes about 4-5 half-lives to reach steady state — and the same 4-5 half-lives to fully clear a drug.",
      "Enzyme inhibition acts within a dose or two (existing enzyme is blocked immediately).",
      "Enzyme induction takes 1-3 weeks (new enzyme protein has to be synthesized).",
      "Weak acids are trapped/excreted faster in alkaline urine; weak bases in acidic urine (ion trapping) — the basis of urinary alkalinization in aspirin overdose.",
      "Bioavailability (F) of an IV drug is 1 by definition; oral F is reduced mainly by first-pass hepatic metabolism.",
      "A competitive antagonist shifts the agonist dose-response curve right without changing maximum efficacy (surmountable). A non-competitive antagonist lowers the maximum (not surmountable by more agonist).",
    ],
    examTraps: [
      "\"Potency\" (dose needed for effect) is not the same as \"efficacy\" (maximum effect achievable) — a drug can be more potent but less efficacious than another.",
      "Therapeutic index (TD50/ED50) being large means a wide safety margin, not a stronger drug.",
      "Stopping an enzyme inducer is just as risky as starting one — levels of the substrate drug can rise sharply once induction wears off.",
    ],
    quickTable: {
      headers: ["Concept", "One-line definition", "Why it's tested"],
      rows: [
        ["Bioavailability (F)", "Fraction of dose reaching systemic circulation unchanged", "Explains why oral and IV doses differ"],
        ["Vd", "Apparent volume drug would occupy at plasma concentration", "High Vd = drug is tissue-bound, hard to dialyze"],
        ["Clearance", "Volume of plasma cleared of drug per unit time", "Sets the maintenance dose"],
        ["Half-life (t1/2)", "Time for plasma concentration to fall by 50%", "Sets dosing interval and time to steady state"],
      ],
    },
    confusionPairs: [
      { left: "Potency", right: "Efficacy", explanation: "Potency = how little drug you need. Efficacy = how much effect the drug can ever produce, even at maximal dose." },
      { left: "Side effect", right: "Adverse drug reaction (ADR)", explanation: "A side effect is any predictable, non-therapeutic effect at normal dose (may be harmless). An ADR is specifically a harmful, unintended response." },
      { left: "Pharmacokinetics", right: "Pharmacodynamics", explanation: "Kinetics = drug concentration over time (ADME). Dynamics = concentration-to-effect relationship at the receptor." },
      { left: "Tolerance", right: "Tachyphylaxis", explanation: "Tolerance develops over days-to-weeks with repeated dosing. Tachyphylaxis is a rapid drop in response after just one or a few doses." },
    ],
  },

  ans: {
    whyItMatters:
      "The autonomic nervous system is the single most \"drawable\" system in pharmacology — almost every drug in this unit can be placed on one diagram, and once you know the receptor a drug hits, its effects and side effects become predictable rather than memorized.",
    coreIdea:
      "Every autonomic drug acts at one of a small number of receptor types (muscarinic, nicotinic, alpha, beta, dopamine). Learn the second messenger and tissue response for each receptor once, and every drug fact becomes a consequence of that receptor logic.",
    classification: {
      headers: ["Receptor", "G-protein / channel", "Key effect"],
      rows: [
        ["Alpha-1", "Gq -> IP3/DAG -> Ca2+", "Vascular smooth muscle contraction (vasoconstriction)"],
        ["Alpha-2", "Gi -> down cAMP", "Presynaptic feedback inhibition of NE release"],
        ["Beta-1", "Gs -> up cAMP", "Up heart rate and contractility (mainly cardiac)"],
        ["Beta-2", "Gs -> up cAMP", "Smooth muscle relaxation (bronchi, vessels, uterus)"],
        ["Muscarinic (M3)", "Gq -> IP3/DAG -> Ca2+", "Glandular secretion, smooth muscle contraction (gut, bladder), miosis"],
        ["Nicotinic (N)", "Ligand-gated Na+/K+ channel", "Fast synaptic transmission at all autonomic ganglia and skeletal NMJ"],
      ],
    },
    mechanismTitle: "Sympathetic effector pathway (example: alpha-1)",
    mechanismSteps: [
      "Norepinephrine released from sympathetic nerve terminal",
      "Binds alpha-1 receptor on vascular smooth muscle",
      "Couples to Gq protein",
      "IP3/DAG generated -> intracellular Ca2+ rises",
      "Smooth muscle contracts",
      "Net effect: vasoconstriction, raised blood pressure",
    ],
    clinicalCorrelation: {
      scenario: "A farmer is brought to the emergency department with excessive salivation, sweating, miosis, bradycardia, and muscle fasciculations after organophosphate pesticide exposure.",
      mechanism: "Organophosphates inhibit acetylcholinesterase, so acetylcholine accumulates at both muscarinic and nicotinic sites.",
      effect: "Muscarinic overactivity causes the \"wet\" secretory symptoms and bradycardia; nicotinic overactivity causes fasciculations and later weakness.",
      adverseEffect: "Untreated, respiratory muscle weakness and bronchorrhea can be fatal.",
      examClue: "Atropine reverses only the muscarinic symptoms — pralidoxime (2-PAM) is required to regenerate acetylcholinesterase and address the nicotinic (motor) effects.",
    },
    highYield: [
      "Atropine treats only the muscarinic effects of organophosphate poisoning — pralidoxime is needed for nicotinic (neuromuscular) effects.",
      "Nicotinic receptors sit at every autonomic ganglion — both sympathetic and parasympathetic — plus the skeletal neuromuscular junction.",
      "Non-selective beta-blockers can precipitate bronchospasm in asthmatics (beta-2 blockade) and mask hypoglycemia's tachycardia warning sign in diabetics.",
      "Phenylephrine (pure alpha-1 agonist) can cause reflex bradycardia through the baroreceptor reflex — no direct cardiac action needed.",
      "Physostigmine (crosses blood-brain barrier) is used for anticholinergic (antimuscarinic) toxicity; neostigmine (does not cross) is used for myasthenia gravis and to reverse neuromuscular blockade.",
    ],
    examTraps: [
      "Dobutamine is a relatively selective beta-1 agonist used in cardiogenic shock — do not confuse with dopamine, which is dose-dependent (D1 at low dose, beta-1 at moderate dose, alpha-1 at high dose).",
      "Alpha-2 agonists (clonidine) LOWER blood pressure centrally by reducing sympathetic outflow, despite alpha-1 causing vasoconstriction — the receptor subtype changes the direction of the effect.",
      "Not all antimuscarinics are equal: ipratropium is quaternary and stays in the lung (minimal systemic absorption); atropine is tertiary and crosses freely, producing systemic and CNS effects.",
    ],
    quickTable: {
      headers: ["Drug", "Receptor action", "Key clinical use"],
      rows: [
        ["Atropine", "Muscarinic antagonist", "Organophosphate poisoning, bradycardia"],
        ["Salbutamol", "Selective beta-2 agonist", "Acute asthma/bronchospasm"],
        ["Propranolol", "Non-selective beta blocker", "Hypertension, arrhythmia, tremor, thyrotoxicosis"],
        ["Phenylephrine", "Selective alpha-1 agonist", "Nasal decongestion, hypotension"],
        ["Neostigmine", "Acetylcholinesterase inhibitor", "Myasthenia gravis, reversing neuromuscular blockade"],
      ],
    },
    confusionPairs: [
      { left: "Muscarinic receptor", right: "Nicotinic receptor", explanation: "Muscarinic = G-protein-coupled, blocked by atropine, found on smooth muscle/glands. Nicotinic = ligand-gated ion channel, found at ganglia and NMJ, not blocked by atropine." },
      { left: "Direct agonist", right: "Indirect agonist", explanation: "Direct agonists bind the receptor themselves (salbutamol on beta-2). Indirect agonists raise the natural neurotransmitter's level (neostigmine raises ACh by blocking its breakdown)." },
    ],
  },

  cvs: {
    whyItMatters:
      "Cardiovascular drugs are tested heavily because the same physiological pathway (RAAS, the cardiac action potential, or the coagulation cascade) hosts several drug classes at different steps — once you have the pathway, the whole drug list falls into place.",
    coreIdea:
      "Most cardiovascular drug classes act by interrupting one physiological cascade at a specific step: RAAS for blood pressure, the action potential for rhythm, or the coagulation cascade for clotting. Locate the step, and the drug's effects and side effects follow logically.",
    classification: {
      headers: ["Class", "Site of diuretic/antihypertensive action", "Key side effect"],
      rows: [
        ["Loop diuretics", "Na-K-2Cl symporter, thick ascending limb", "Hypokalemia, ototoxicity"],
        ["Thiazides", "Na-Cl symporter, distal convoluted tubule", "Hypokalemia, hyperglycemia, hypercalcemia"],
        ["K+-sparing (spironolactone)", "Aldosterone receptor / ENaC, collecting duct", "Hyperkalemia, gynecomastia"],
        ["ACE inhibitors", "Angiotensin-converting enzyme", "Dry cough, angioedema, hyperkalemia"],
        ["ARBs", "AT1 receptor", "Hyperkalemia (no cough — bradykinin unaffected)"],
      ],
    },
    mechanismTitle: "RAAS pathway and drug targets",
    mechanismSteps: [
      "Renin released from kidney (triggered by low renal perfusion)",
      "Angiotensinogen -> Angiotensin I (via renin)",
      "Angiotensin I -> Angiotensin II (via ACE) -- blocked by ACE inhibitors",
      "Angiotensin II binds AT1 receptor -- blocked by ARBs",
      "Vasoconstriction + aldosterone release",
      "Aldosterone acts on collecting duct -- blocked by spironolactone",
      "Net effect: raised blood pressure and Na+/water retention",
    ],
    clinicalCorrelation: {
      scenario: "A patient started on an ACE inhibitor for hypertension returns after two weeks complaining of a persistent dry cough.",
      mechanism: "ACE normally also breaks down bradykinin; blocking ACE lets bradykinin accumulate in the airway.",
      effect: "Bradykinin accumulation irritates airway sensory nerves, producing a dry, non-productive cough.",
      adverseEffect: "The same bradykinin pathway can cause angioedema, which is a medical emergency if it involves the airway.",
      examClue: "Switching from an ACE inhibitor to an ARB removes the cough because ARBs act downstream of ACE and don't affect bradykinin.",
    },
    highYield: [
      "ACE inhibitors cause a dry cough via bradykinin accumulation — ARBs block the angiotensin receptor directly and largely avoid this side effect.",
      "Direct oral anticoagulants (rivaroxaban, apixaban) skip antithrombin and directly inhibit factor Xa — no routine coagulation monitoring needed, unlike warfarin.",
      "Class IB antiarrhythmics (lidocaine) preferentially act on ischemic/depolarized tissue, making them useful for post-MI ventricular arrhythmias.",
      "Loop diuretics cause hypokalemia AND ototoxicity; thiazides cause hypokalemia but also hypercalcemia (opposite of loops, which cause hypocalcemia).",
      "Digoxin toxicity is worsened by hypokalemia because K+ and digoxin compete for the same binding site on Na+/K+-ATPase.",
      "Statins are most effective at night for drugs with short half-lives (cholesterol synthesis peaks overnight), though newer statins with long half-lives can be dosed any time.",
    ],
    examTraps: [
      "Verapamil (non-dihydropyridine CCB) combined with a beta-blocker risks severe bradycardia/heart block — dihydropyridines (amlodipine) are safer to combine with beta-blockers.",
      "Amiodarone is technically Class III but also has Class I, II, and IV actions — do not answer \"pure potassium channel blocker\" on an exam.",
      "Spironolactone causes gynecomastia through anti-androgen activity, not through its aldosterone-blocking action — a frequently tested distractor.",
    ],
    quickTable: {
      headers: ["Diuretic class", "Prototype", "Ca2+ effect", "K+ effect"],
      rows: [
        ["Loop", "Furosemide", "Decreases (loses Ca2+)", "Decreases"],
        ["Thiazide", "Hydrochlorothiazide", "Increases (retains Ca2+)", "Decreases"],
        ["K+-sparing", "Spironolactone", "Minimal", "Increases"],
      ],
    },
    confusionPairs: [
      { left: "ACE inhibitors", right: "ARBs", explanation: "Both lower angiotensin II activity, but only ACE inhibitors raise bradykinin (causing cough/angioedema) because ARBs act at the receptor, downstream of ACE." },
      { left: "Loop diuretics", right: "Thiazide diuretics", explanation: "Both cause hypokalemia, but loops lower serum calcium while thiazides raise it — opposite calcium effects at different nephron sites." },
      { left: "Bactericidal antiplatelet (aspirin)", right: "Anticoagulant (heparin/warfarin)", explanation: "Antiplatelets stop platelet aggregation (arterial clots); anticoagulants block the clotting cascade (venous clots) — different targets for different clot types." },
    ],
  },

  cns: {
    whyItMatters:
      "CNS drugs are grouped by the receptor/channel they modulate (GABA-A, dopamine, serotonin, NMDA), and most of the classic \"which drug for which condition\" exam questions reduce to knowing which receptor a class prefers and what that implies about safety in overdose.",
    coreIdea:
      "Sedative-hypnotics act mainly through GABA-A; antipsychotics through dopamine D2; antidepressants through monoamine reuptake or breakdown; and antiepileptics through Na+/Ca2+ channel block or GABA enhancement. Overdose safety usually tracks how \"permissive\" the drug's action is.",
    classification: {
      headers: ["Class", "Prototype", "Primary target"],
      rows: [
        ["Benzodiazepines", "Diazepam", "GABA-A (increase frequency of Cl- channel opening)"],
        ["Barbiturates", "Phenobarbital", "GABA-A (increase duration of Cl- channel opening)"],
        ["Typical antipsychotics", "Haloperidol", "D2 receptor antagonist"],
        ["Atypical antipsychotics", "Clozapine, olanzapine", "D2 + 5-HT2A antagonist"],
        ["SSRIs", "Fluoxetine", "Serotonin reuptake transporter"],
      ],
    },
    mechanismTitle: "GABA-A channel modulation",
    mechanismSteps: [
      "GABA released at inhibitory synapse",
      "Binds GABA-A receptor (a Cl- channel)",
      "Benzodiazepines increase FREQUENCY of channel opening (need GABA present)",
      "Barbiturates increase DURATION of channel opening (can act even without GABA at high dose)",
      "Cl- influx -> neuronal hyperpolarization",
      "Net effect: CNS depression (sedation, anxiolysis, anticonvulsant effect)",
    ],
    clinicalCorrelation: {
      scenario: "Two patients take an overdose of their prescribed CNS depressant — one on diazepam, one on phenobarbital.",
      mechanism: "Benzodiazepines cannot open the GABA-A channel without GABA being present, capping how much depression they can cause. Barbiturates can open the channel directly at high concentration.",
      effect: "The barbiturate overdose is far more likely to cause fatal respiratory depression.",
      adverseEffect: "Benzodiazepine overdose is comparatively safe and is reversible with flumazenil; barbiturate overdose has no specific antidote.",
      examClue: "\"Ceiling effect on respiratory depression\" = benzodiazepine; \"no ceiling, GABA-independent at high dose\" = barbiturate.",
    },
    highYield: [
      "Barbiturates increase the DURATION of GABA-A channel opening (and act GABA-independently at high dose), making them far more dangerous in overdose than benzodiazepines, which only increase FREQUENCY.",
      "Flumazenil reverses benzodiazepines but can precipitate seizures in a chronic benzodiazepine user or if a pro-convulsant was co-ingested.",
      "Extrapyramidal symptoms and tardive dyskinesia are far more common with typical (D2-heavy) antipsychotics than atypicals.",
      "Clozapine's agranulocytosis risk means mandatory blood count monitoring — it's reserved for treatment-resistant schizophrenia.",
      "Valproate is teratogenic (neural tube defects) and hepatotoxic — avoided in pregnancy when possible despite being broad-spectrum.",
      "SSRIs combined with MAOIs (or other serotonergic drugs, including tramadol) risk serotonin syndrome — a 2-week washout is needed when switching from an MAOI.",
    ],
    examTraps: [
      "Ketamine (NMDA antagonist) raises intracranial and intraocular pressure — avoid in head injury or open-eye injury despite its favorable airway-preserving profile.",
      "Phenytoin follows first-order kinetics at low doses but switches to zero-order (saturable metabolism) near the therapeutic range.",
      "Lithium has a very narrow therapeutic index; dehydration and thiazide diuretics both increase renal lithium reabsorption and risk toxicity.",
    ],
    quickTable: {
      headers: ["Drug", "Class", "Distinguishing feature"],
      rows: [
        ["Diazepam", "Benzodiazepine", "Reversed by flumazenil; safer in overdose"],
        ["Phenobarbital", "Barbiturate", "No ceiling effect; dangerous in overdose"],
        ["Haloperidol", "Typical antipsychotic", "High EPS/tardive dyskinesia risk"],
        ["Clozapine", "Atypical antipsychotic", "Agranulocytosis — needs blood monitoring"],
        ["Ketamine", "Dissociative anesthetic", "Raises ICP/IOP; preserves airway reflexes"],
      ],
    },
    confusionPairs: [
      { left: "Benzodiazepines", right: "Barbiturates", explanation: "Both enhance GABA-A, but benzodiazepines increase channel-opening frequency (safer) while barbiturates increase channel-opening duration and can act without GABA (more dangerous)." },
      { left: "Typical antipsychotics", right: "Atypical antipsychotics", explanation: "Typicals block D2 strongly (more EPS/tardive dyskinesia). Atypicals block D2 and 5-HT2A together (less EPS, more metabolic side effects)." },
    ],
  },

  analgesics: {
    whyItMatters:
      "Pain management drugs are grouped by where they act on the pain pathway — peripherally (NSAIDs, at the site of tissue injury) or centrally (opioids, at the spinal cord and brain). Knowing the site of action predicts both the therapeutic benefit and the class-specific toxicity.",
    coreIdea:
      "NSAIDs work by inhibiting cyclooxygenase (COX) to reduce prostaglandin-mediated inflammation and pain peripherally. Opioids work by activating mu-opioid receptors centrally to reduce pain perception. Local anesthetics work by blocking Na+ channels to stop nerve conduction at a specific site.",
    classification: {
      headers: ["Step (WHO ladder)", "Drug example", "Typical pain level"],
      rows: [
        ["Step 1", "Paracetamol / NSAID", "Mild pain"],
        ["Step 2", "Codeine / tramadol (+/- Step 1 drug)", "Mild-moderate pain"],
        ["Step 3", "Morphine / fentanyl", "Moderate-severe pain"],
      ],
    },
    mechanismTitle: "Opioid analgesic pathway",
    mechanismSteps: [
      "Opioid binds mu-receptor (Gi-coupled) on presynaptic/postsynaptic neurons",
      "Adenylyl cyclase inhibited -> cAMP falls",
      "Presynaptic Ca2+ influx reduced -> less neurotransmitter release",
      "Postsynaptic K+ efflux increased -> hyperpolarization",
      "Reduced ascending pain signal transmission",
      "Net effect: analgesia (plus respiratory depression, constipation, euphoria via the same receptor elsewhere)",
    ],
    clinicalCorrelation: {
      scenario: "A patient on chronic low-dose aspirin for cardioprotection asks whether stopping it for a week before minor surgery will restore normal clotting quickly.",
      mechanism: "Aspirin irreversibly acetylates COX-1 in platelets, which are anucleate and cannot synthesize new enzyme.",
      effect: "The antiplatelet effect lasts the lifespan of the affected platelets (about 7-10 days), not just the drug's plasma half-life.",
      adverseEffect: "Stopping aspirin even a day or two before surgery is not enough — clinically, about a week is needed for platelet turnover to restore normal function.",
      examClue: "\"Irreversible\" + \"anucleate cell\" is the combination that produces an effect outlasting the drug's own half-life — a classic exam pairing.",
    },
    highYield: [
      "Aspirin's antiplatelet effect outlasts its plasma half-life because it irreversibly acetylates COX-1 in platelets, which cannot make new enzyme.",
      "Paracetamol has minimal anti-inflammatory action (weak peripheral COX inhibition) but is an effective antipyretic/analgesic — it is not an NSAID in the classic sense.",
      "Tramadol is unusual: it's a weak mu-agonist AND inhibits serotonin/norepinephrine reuptake, raising serotonin syndrome risk when combined with SSRIs.",
      "NSAID-induced renal impairment happens because prostaglandins normally dilate the afferent arteriole — blocking them reduces renal blood flow, especially in volume-depleted patients.",
      "Local anesthetics block small, myelinated fibers (pain, temperature) before large fibers (motor, touch) — explaining why pain relief precedes motor block onset.",
      "Naloxone's short half-life means re-sedation is possible after reversing a longer-acting opioid — repeat dosing or infusion may be needed.",
    ],
    examTraps: [
      "Aspirin in children with a viral illness risks Reye syndrome — paracetamol is preferred for pediatric fever/pain.",
      "COX-2 selective inhibitors (celecoxib) spare the GI mucosa but do not spare cardiovascular risk — they can still increase thrombotic events.",
      "Meperidine (pethidine) is avoided in renal impairment because its metabolite normeperidine accumulates and causes seizures.",
    ],
    quickTable: {
      headers: ["Drug", "Class", "Key toxicity"],
      rows: [
        ["Aspirin", "Irreversible COX-1/2 inhibitor", "GI ulceration, Reye syndrome in children"],
        ["Paracetamol", "Weak/central COX inhibitor", "Hepatotoxicity in overdose (NAPQI)"],
        ["Morphine", "Mu-opioid agonist", "Respiratory depression"],
        ["Diclofenac", "Non-selective NSAID", "GI ulceration, renal impairment"],
        ["Lidocaine", "Amide local anesthetic (Na+ blocker)", "CNS excitation then cardiac depression in toxicity"],
      ],
    },
    confusionPairs: [
      { left: "Side effect", right: "Toxicity", explanation: "Constipation from morphine is an expected, dose-related side effect at therapeutic doses. Respiratory depression at high dose is toxicity." },
      { left: "NSAIDs", right: "Paracetamol", explanation: "NSAIDs have meaningful peripheral anti-inflammatory action (COX inhibition at the injury site). Paracetamol acts more centrally and has little anti-inflammatory effect." },
    ],
  },

  antimicrobial: {
    whyItMatters:
      "Antibiotic classes map cleanly onto four bacterial targets (cell wall, ribosome, DNA/RNA machinery, folate synthesis). Once you place a drug on that map, its spectrum, common resistance mechanism, and typical toxicity all become predictable rather than memorized separately.",
    coreIdea:
      "Bactericidal drugs kill bacteria outright (useful in severe infection or immunocompromised hosts); bacteriostatic drugs only stop growth, relying on the host immune system to clear the organism. Combining a bacteriostatic protein-synthesis inhibitor with a bactericidal cell-wall agent can be antagonistic, because cell-wall drugs need actively dividing bacteria to work.",
    classification: {
      headers: ["Target", "Class example", "Cidal/static"],
      rows: [
        ["Cell wall synthesis", "Penicillins, cephalosporins, vancomycin", "Bactericidal"],
        ["30S ribosome", "Aminoglycosides, tetracyclines", "Cidal (aminoglycosides) / static (tetracyclines)"],
        ["50S ribosome", "Macrolides, clindamycin, chloramphenicol", "Mostly bacteriostatic"],
        ["DNA gyrase/topoisomerase", "Fluoroquinolones", "Bactericidal"],
        ["Folate synthesis", "Sulfonamides + trimethoprim", "Bacteriostatic alone, bactericidal together"],
      ],
    },
    mechanismTitle: "Antibiotic mechanism map",
    mechanismSteps: [
      "Beta-lactams bind penicillin-binding proteins -> block cell wall cross-linking -> bacterial lysis",
      "Aminoglycosides enter via oxygen-dependent transport -> bind 30S -> misread mRNA -> bactericidal",
      "Macrolides bind 50S -> block translocation -> bacteriostatic",
      "Fluoroquinolones inhibit DNA gyrase/topoisomerase IV -> block DNA supercoiling -> bactericidal",
      "Sulfonamides block PABA-to-folate step; trimethoprim blocks the next step -> sequential blockade is synergistic",
    ],
    clinicalCorrelation: {
      scenario: "A patient with a severe anaerobic abdominal abscess is not improving on an aminoglycoside despite a susceptible organism on culture.",
      mechanism: "Aminoglycoside uptake into bacteria requires an oxygen-dependent active transport step.",
      effect: "In the anaerobic, low-oxygen environment of an abscess, the drug cannot be taken up efficiently.",
      adverseEffect: "Continuing an ineffective aminoglycoside also exposes the patient to needless nephrotoxicity/ototoxicity risk.",
      examClue: "\"Aminoglycosides don't work against anaerobes\" is explained by this oxygen-dependent uptake step, not by the ribosome target itself.",
    },
    highYield: [
      "Aminoglycoside uptake into bacteria is oxygen-dependent — this is exactly why they don't work against anaerobes.",
      "Bacteriostatic protein-synthesis inhibitors (macrolides, tetracyclines, clindamycin) can antagonize bactericidal cell-wall agents by slowing bacterial growth, since cell-wall drugs need actively dividing organisms.",
      "Vancomycin is reserved for MRSA and serious beta-lactam-resistant Gram-positive infections; rapid infusion causes \"red man syndrome\" (a histamine reaction, not a true allergy).",
      "Fluoroquinolones are avoided in children and pregnancy due to cartilage toxicity risk in animal studies, and carry a tendon-rupture warning.",
      "Metronidazole causes a disulfiram-like reaction with alcohol and is effective against anaerobes and protozoa (Giardia, Entamoeba, Trichomonas) via free-radical DNA damage.",
      "Co-trimoxazole (trimethoprim-sulfamethoxazole) blocks two sequential steps of bacterial folate synthesis, making the bactericidal combination synergistic even though each drug alone is bacteriostatic.",
    ],
    examTraps: [
      "Penicillin allergy is IgE-mediated and can cross-react with cephalosporins (low but real risk) — always ask about the type/severity of a prior reaction.",
      "Tetracyclines chelate calcium and are avoided in children and pregnancy (tooth discoloration, bone growth effects) — take on an empty stomach, away from dairy/antacids.",
      "\"Static vs cidal\" is host-dependent in some cases (e.g., chloramphenicol is cidal against H. influenzae but static against most other organisms) — don't treat the classification as absolute.",
    ],
    quickTable: {
      headers: ["Drug", "Mechanism", "Signature toxicity"],
      rows: [
        ["Penicillin", "Binds penicillin-binding proteins", "Anaphylaxis (IgE-mediated)"],
        ["Gentamicin", "30S ribosome inhibitor", "Nephrotoxicity, ototoxicity"],
        ["Ciprofloxacin", "DNA gyrase/topoisomerase inhibitor", "Tendon rupture, cartilage risk in children"],
        ["Vancomycin", "Blocks D-Ala-D-Ala cell wall precursor", "Red man syndrome, nephrotoxicity"],
        ["Metronidazole", "DNA-damaging free radicals (anaerobes)", "Disulfiram-like reaction with alcohol"],
      ],
    },
    confusionPairs: [
      { left: "Bactericidal", right: "Bacteriostatic", explanation: "Bactericidal drugs kill bacteria outright. Bacteriostatic drugs only arrest growth — the host immune system must clear the organism, so they're avoided as monotherapy in immunocompromised or severe infection." },
      { left: "Intrinsic resistance", right: "Acquired resistance", explanation: "Intrinsic resistance is a natural, permanent trait of a species (e.g., Gram-negatives intrinsically resist vancomycin's large molecule). Acquired resistance develops via mutation or gene transfer." },
    ],
  },

  antiviral: {
    whyItMatters:
      "Selective toxicity is the theme of this unit — the best antimicrobial and antiparasitic drugs work by exploiting a biochemical step present in the pathogen but absent (or very different) in the human host, minimizing harm to the patient.",
    coreIdea:
      "Antivirals mostly target viral enzymes required for genome replication (thymidine kinase, reverse transcriptase, neuraminidase). Antifungals exploit differences between fungal ergosterol and human cholesterol in the cell membrane. Antiparasitics exploit unique parasite biochemistry (heme detoxification, folate pathways).",
    classification: {
      headers: ["Class", "Prototype", "Selective target"],
      rows: [
        ["Nucleoside analogues (antiviral)", "Acyclovir", "Needs viral thymidine kinase for first phosphorylation"],
        ["Neuraminidase inhibitors", "Oseltamivir", "Blocks viral release from infected cells"],
        ["Polyene antifungals", "Amphotericin B", "Binds ergosterol, forms membrane pores"],
        ["Azole antifungals", "Fluconazole", "Inhibits fungal CYP450 lanosterol demethylase"],
        ["4-aminoquinolines", "Chloroquine", "Blocks parasite heme detoxification"],
      ],
    },
    mechanismTitle: "Acyclovir selectivity",
    mechanismSteps: [
      "Acyclovir enters both infected and uninfected cells",
      "Only HSV/VZV-infected cells express viral thymidine kinase",
      "Viral thymidine kinase performs the first phosphorylation (human kinases do this poorly)",
      "Host kinases complete phosphorylation to the active triphosphate",
      "Active drug incorporated into viral DNA -> chain termination",
      "Net effect: drug concentrates its action almost entirely in infected cells",
    ],
    clinicalCorrelation: {
      scenario: "A patient receiving rapid IV acyclovir for HSV encephalitis develops a rise in serum creatinine.",
      mechanism: "Acyclovir has poor water solubility and can crystallize in renal tubules, especially with rapid infusion and inadequate hydration.",
      effect: "Crystal formation causes obstructive (crystalline) nephropathy.",
      adverseEffect: "Slow infusion and adequate IV hydration reduce this risk.",
      examClue: "\"Nephrotoxicity with rapid IV infusion, crystalluria\" is the acyclovir toxicity pattern — distinct from the selective-toxicity mechanism that makes it effective.",
    },
    highYield: [
      "Acyclovir's selectivity for infected cells comes from needing viral (not human) thymidine kinase for its first phosphorylation step.",
      "Oseltamivir is most effective when started within 48 hours of influenza symptom onset — late initiation offers little benefit.",
      "Amphotericin B (\"ampho-terrible\") causes significant nephrotoxicity and infusion-related fever/chills/rigors.",
      "Fluconazole has fewer drug interactions than ketoconazole (less human CYP450 inhibition) and penetrates the CNS well, making it useful for cryptococcal meningitis.",
      "Chloroquine resistance is widespread in P. falciparum in many regions, arising mainly from reduced drug accumulation in the parasite's food vacuole.",
      "Grapefruit juice-type food interactions aside, azoles are a classic drug-interaction source because of hepatic CYP450 inhibition — always check a patient's other medications.",
    ],
    examTraps: [
      "Aciclovir-resistant HSV strains typically arise from a deficient or altered viral thymidine kinase, not from a change in the human host enzyme.",
      "Chloroquine retinopathy is a chronic, cumulative-dose toxicity — routine ophthalmologic monitoring is required for long-term users (e.g., in rheumatoid arthritis, not just malaria).",
      "\"Selective toxicity\" does not mean zero host toxicity — it means the drug preferentially affects the pathogen far more than host cells.",
    ],
    quickTable: {
      headers: ["Drug", "Pathogen class", "Signature toxicity"],
      rows: [
        ["Acyclovir", "HSV/VZV (antiviral)", "Nephrotoxicity with rapid IV infusion"],
        ["Oseltamivir", "Influenza (antiviral)", "GI upset; must start early to help"],
        ["Amphotericin B", "Systemic fungal infection", "Nephrotoxicity, infusion reactions"],
        ["Fluconazole", "Fungal infection, cryptococcal meningitis", "Fewer interactions than ketoconazole"],
        ["Chloroquine", "Malaria (P. vivax/ovale/falciparum)", "Retinopathy with chronic use"],
      ],
    },
    confusionPairs: [
      { left: "Amphotericin B", right: "Fluconazole", explanation: "Amphotericin binds ergosterol directly and punches membrane pores (broad-spectrum, very toxic). Fluconazole blocks ergosterol synthesis via CYP450 inhibition (narrower spectrum, better tolerated)." },
      { left: "Virustatic (most antivirals)", right: "Virucidal", explanation: "Most antivirals only suppress replication in actively infected cells; they don't eliminate latent virus (e.g., acyclovir doesn't cure latent HSV in ganglia)." },
    ],
  },

  endocrine: {
    whyItMatters:
      "Endocrine pharmacology exam questions usually hinge on one discriminating fact per drug class — whether it depends on functioning beta cells, whether it works independent of insulin, or whether a hormone receptor's tissue-specific behavior explains an unexpected side effect.",
    coreIdea:
      "Antidiabetic drugs are grouped by whether they stimulate insulin release (sulfonylureas — need functioning beta cells), reduce hepatic glucose output (metformin), or act independent of insulin entirely (SGLT2 inhibitors). This single distinction predicts hypoglycemia risk and use in type 1 diabetes.",
    classification: {
      headers: ["Drug class", "Mechanism", "Hypoglycemia risk"],
      rows: [
        ["Sulfonylureas", "Close K-ATP channels on beta cells -> insulin release", "Yes — requires functioning beta cells"],
        ["Metformin", "Reduces hepatic gluconeogenesis", "No, when used alone"],
        ["SGLT2 inhibitors", "Block renal glucose reabsorption -> glucosuria", "No — insulin-independent mechanism"],
        ["Insulin", "Replaces/supplements endogenous insulin", "Yes — highest risk"],
      ],
    },
    mechanismTitle: "Sulfonylurea insulin release pathway",
    mechanismSteps: [
      "Sulfonylurea binds SUR1 subunit of K-ATP channel on pancreatic beta cell",
      "K-ATP channel closes",
      "Membrane depolarizes",
      "Voltage-gated Ca2+ channels open -> Ca2+ influx",
      "Insulin granules released by exocytosis",
      "Net effect: lowered blood glucose (requires functioning beta cells)",
    ],
    clinicalCorrelation: {
      scenario: "A patient with newly diagnosed type 1 diabetes is mistakenly started on a sulfonylurea instead of insulin.",
      mechanism: "Sulfonylureas only stimulate release of endogenous insulin — they add no exogenous insulin of their own.",
      effect: "With little or no functioning beta-cell mass (type 1 diabetes), there is nothing for the drug to stimulate.",
      adverseEffect: "Blood glucose remains uncontrolled, risking diabetic ketoacidosis.",
      examClue: "\"Requires functioning beta cells\" is the phrase that should immediately rule out sulfonylureas for type 1 diabetes.",
    },
    highYield: [
      "Metformin lowers glucose mainly by reducing hepatic gluconeogenesis rather than boosting insulin release — this is why it rarely causes hypoglycemia when used alone.",
      "Sulfonylureas require functioning beta cells and are ineffective (and inappropriate) in type 1 diabetes.",
      "SGLT2 inhibitors work independent of insulin secretion or sensitivity, so they can be added at almost any stage of type 2 diabetes management, but carry risk of genital mycotic infection and euglycemic DKA.",
      "Levothyroxine (T4) is preferred over T3 for chronic hypothyroidism because its long half-life gives stable levels with once-daily dosing.",
      "Long-term systemic corticosteroids suppress the hypothalamic-pituitary-adrenal axis — abrupt discontinuation risks acute adrenal insufficiency, so doses must be tapered.",
      "Tamoxifen behaves as an estrogen antagonist in breast tissue (treating ER-positive cancer) but as a partial agonist in the endometrium (raising endometrial cancer risk) — a single drug, two opposite receptor behaviors.",
    ],
    examTraps: [
      "Metformin carries a rare but real risk of lactic acidosis, particularly with renal impairment — it's usually held before iodinated contrast studies.",
      "\"Euglycemic DKA\" with SGLT2 inhibitors means ketoacidosis can occur even with a near-normal glucose — don't rule out DKA just because the sugar looks fine.",
      "Levothyroxine should be taken on an empty stomach — food, calcium, and iron supplements reduce its absorption.",
    ],
    quickTable: {
      headers: ["Drug", "Class", "Key distinguishing fact"],
      rows: [
        ["Metformin", "Biguanide", "First-line T2DM; lactic acidosis risk in renal impairment"],
        ["Glimepiride", "Sulfonylurea", "Needs functioning beta cells; hypoglycemia risk"],
        ["Empagliflozin", "SGLT2 inhibitor", "Insulin-independent; euglycemic DKA risk"],
        ["Levothyroxine", "Synthetic T4", "Once-daily; take on empty stomach"],
        ["Tamoxifen", "SERM", "Antagonist in breast, agonist in endometrium"],
      ],
    },
    confusionPairs: [
      { left: "Sulfonylureas", right: "Metformin", explanation: "Sulfonylureas stimulate insulin release (hypoglycemia risk, needs beta cells). Metformin reduces hepatic glucose output (no hypoglycemia alone, works even without functioning beta cells)." },
      { left: "Agonist", right: "SERM (selective estrogen receptor modulator)", explanation: "A pure agonist activates a receptor in every tissue the same way. A SERM like tamoxifen can be an agonist in one tissue and an antagonist in another." },
    ],
  },

  "gi-resp": {
    whyItMatters:
      "GI and respiratory drugs are grouped by receptor target (H2, proton pump, 5-HT3, beta-2, muscarinic) the same way autonomic drugs are — the underlying logic you already learned for the ANS explains most of the mechanisms and side effects here too.",
    coreIdea:
      "Acid-suppressing drugs act at different points of the same pathway — PPIs block the final common enzyme (H+/K+-ATPase) irreversibly, while H2 blockers only block one of several stimuli reversibly, which is why PPIs generally suppress acid more completely.",
    classification: {
      headers: ["Class", "Prototype", "Target"],
      rows: [
        ["Proton pump inhibitors", "Omeprazole", "H+/K+-ATPase (irreversible)"],
        ["H2 receptor antagonists", "Famotidine", "Histamine H2 receptor (reversible)"],
        ["5-HT3 antagonists", "Ondansetron", "Serotonin receptors (gut + CTZ)"],
        ["Short-acting beta-2 agonists", "Salbutamol", "Bronchial smooth muscle beta-2"],
        ["Inhaled antimuscarinics", "Ipratropium", "Muscarinic receptors, airway smooth muscle"],
      ],
    },
    mechanismTitle: "Gastric acid secretion and drug targets",
    mechanismSteps: [
      "Histamine, gastrin, and acetylcholine each stimulate the parietal cell via separate receptors",
      "All three pathways converge on the H+/K+-ATPase (proton pump)",
      "H2 blockers interrupt only the histamine pathway (reversible)",
      "PPIs irreversibly inhibit the shared final pump itself",
      "Net effect: PPIs achieve deeper, longer-lasting acid suppression than H2 blockers",
    ],
    clinicalCorrelation: {
      scenario: "A patient with COPD is switched from albuterol as-needed to regular ipratropium, with better symptom control than a similar asthmatic patient on the same drug.",
      mechanism: "Cholinergic (vagal) tone contributes proportionally more to airway obstruction in COPD than in asthma, where inflammation dominates.",
      effect: "Blocking muscarinic-mediated bronchoconstriction is therefore more effective in COPD.",
      adverseEffect: "Ipratropium has minimal systemic absorption, so systemic antimuscarinic side effects are rare at inhaled doses.",
      examClue: "\"More useful in COPD than asthma\" for an inhaled antimuscarinic is explained by the relative contribution of cholinergic tone in each disease.",
    },
    highYield: [
      "PPIs irreversibly inhibit the H+/K+-ATPase pump itself, producing more complete acid suppression than H2 blockers, which only reversibly block one stimulatory pathway (histamine).",
      "Ondansetron blocks 5-HT3 receptors both peripherally (vagal gut afferents) and centrally (chemoreceptor trigger zone), making it effective for chemotherapy-induced and postoperative nausea; it can prolong the QT interval.",
      "Long-acting beta-2 agonists (salmeterol, formoterol) must never be used alone in asthma — without an inhaled corticosteroid, LABA monotherapy raises asthma mortality.",
      "Ipratropium is particularly useful in COPD, where cholinergic tone contributes more to airway obstruction than in asthma.",
      "Loperamide is a peripherally-acting mu-opioid agonist that does not cross the blood-brain barrier appreciably at normal doses, so it lacks morphine's central analgesic/euphoric/respiratory-depressant effects.",
    ],
    examTraps: [
      "Long-term PPI use is linked to hypomagnesemia and vitamin B12 deficiency — worth remembering for chronic-use patients presenting with unexplained fatigue or arrhythmia.",
      "Ondansetron's QT-prolonging effect matters most when combined with other QT-prolonging drugs — check the medication list before assuming it's \"safe\" antiemetic.",
      "Bronchodilator selection differs by disease: short-acting beta-2 agonists for acute relief in both asthma/COPD, but maintenance strategy differs (ICS-based in asthma, LAMA/LABA-based in COPD).",
    ],
    quickTable: {
      headers: ["Drug", "Class", "Key point"],
      rows: [
        ["Omeprazole", "PPI", "Irreversible; long-term B12/Mg2+ deficiency risk"],
        ["Famotidine", "H2 blocker", "Reversible; less complete acid suppression than PPI"],
        ["Ondansetron", "5-HT3 antagonist", "QT prolongation risk"],
        ["Salmeterol", "LABA", "Never use without inhaled corticosteroid in asthma"],
        ["Loperamide", "Peripheral mu-opioid agonist", "No central opioid effects at normal dose"],
      ],
    },
    confusionPairs: [
      { left: "PPI", right: "H2 blocker", explanation: "PPIs act irreversibly on the final shared proton pump (stronger, longer suppression). H2 blockers act reversibly on just one of the three stimulatory pathways to that pump." },
      { left: "SABA (salbutamol)", right: "LABA (salmeterol)", explanation: "SABAs are for acute rescue. LABAs are for maintenance only and must always be paired with an inhaled corticosteroid in asthma." },
    ],
  },

  chemo: {
    whyItMatters:
      "Anticancer drugs are grouped by whether they need actively dividing cells (cell-cycle-specific) or not (cell-cycle non-specific), and each class has one classic, testable, dose-limiting toxicity plus — often — a specific rescue or preventive strategy.",
    coreIdea:
      "Cell-cycle-specific drugs (antimetabolites, vinca alkaloids) only kill cells actively going through division and work best against fast-growing tumors. Cell-cycle non-specific drugs (alkylators, platinum compounds) can kill resting cells too, making them useful even against slow-growing tumors with a low growth fraction.",
    classification: {
      headers: ["Class", "Prototype", "Cell-cycle specificity"],
      rows: [
        ["Antimetabolites", "Methotrexate", "S-phase specific"],
        ["Vinca alkaloids", "Vincristine", "M-phase specific"],
        ["Alkylating agents", "Cyclophosphamide", "Non-specific"],
        ["Platinum compounds", "Cisplatin", "Non-specific"],
        ["Anthracyclines", "Doxorubicin", "Largely non-specific"],
        ["Tyrosine kinase inhibitors", "Imatinib", "Targeted (not classic cytotoxic)"],
      ],
    },
    mechanismTitle: "Methotrexate mechanism and rescue",
    mechanismSteps: [
      "Methotrexate inhibits dihydrofolate reductase",
      "Dihydrofolate cannot be converted to active tetrahydrofolate",
      "Purine and pyrimidine synthesis blocked (S-phase specific)",
      "Rapidly dividing cells (tumor and normal marrow/mucosa) are affected",
      "Leucovorin (folinic acid) supplies reduced folate directly, bypassing the blocked enzyme",
      "Net effect: normal cells are 'rescued' while tumor exposure time still achieves cytotoxicity",
    ],
    clinicalCorrelation: {
      scenario: "A patient receiving high-dose methotrexate for lymphoma is given leucovorin on a strict schedule starting 24 hours after the methotrexate infusion.",
      mechanism: "Leucovorin bypasses the dihydrofolate reductase step that methotrexate blocks, restoring folate availability to normal cells.",
      effect: "Normal, rapidly-dividing tissue (marrow, GI mucosa) is protected from lethal toxicity.",
      adverseEffect: "Giving leucovorin too early would rescue the tumor cells as well, defeating the purpose of treatment — timing is critical.",
      examClue: "\"Rescue therapy\" + methotrexate = leucovorin, and the timing detail (delayed administration) is a frequent exam distractor.",
    },
    highYield: [
      "Methotrexate inhibits dihydrofolate reductase and is S-phase specific; leucovorin (folinic acid) rescues normal cells by bypassing the blocked enzyme.",
      "Vincristine's dose-limiting toxicity is peripheral neuropathy, while vinblastine's is myelosuppression — same drug class, different limiting toxicity.",
      "Doxorubicin's dose-limiting, irreversible toxicity is cumulative-dose-dependent cardiomyopathy, monitored with echocardiography/ejection fraction.",
      "Cyclophosphamide's toxic metabolite acrolein causes hemorrhagic cystitis, prevented by co-administering mesna, which binds and inactivates acrolein in the urine.",
      "Cisplatin's major dose-limiting toxicities are nephrotoxicity (mitigated by aggressive IV hydration) and significant nausea/vomiting, plus ototoxicity and peripheral neuropathy.",
      "Imatinib targets the BCR-ABL fusion protein in CML — targeted molecular therapy with a generally more favorable side-effect profile than classic cytotoxic chemotherapy.",
    ],
    examTraps: [
      "Cell-cycle non-specific agents (alkylators, platinum) are especially useful for slow-growing tumors with a low growth fraction, where cycle-specific drugs have less actively-dividing tissue to act on.",
      "Doxorubicin cardiotoxicity is cumulative and largely irreversible — unlike most acute chemo toxicities, it doesn't resolve simply by stopping the drug.",
      "Mesna protects against cyclophosphamide's bladder toxicity specifically — it does not protect against myelosuppression or other cyclophosphamide effects.",
    ],
    quickTable: {
      headers: ["Drug", "Dose-limiting toxicity", "Prevention/rescue"],
      rows: [
        ["Methotrexate", "Mucositis, myelosuppression", "Leucovorin rescue"],
        ["Doxorubicin", "Cardiomyopathy", "Monitor ejection fraction; cumulative dose limits"],
        ["Cyclophosphamide", "Hemorrhagic cystitis", "Mesna"],
        ["Cisplatin", "Nephrotoxicity", "Aggressive IV hydration"],
        ["Vincristine", "Peripheral neuropathy", "Dose capping"],
      ],
    },
    confusionPairs: [
      { left: "Cell-cycle specific", right: "Cell-cycle non-specific", explanation: "Specific agents only kill actively dividing cells (good for fast-growing tumors). Non-specific agents can kill resting cells too (useful even for slow-growing, low-growth-fraction tumors)." },
      { left: "Vincristine", right: "Vinblastine", explanation: "Same vinca alkaloid class and mechanism, but vincristine's dose-limiting toxicity is neuropathy while vinblastine's is myelosuppression." },
    ],
  },

  toxicology: {
    whyItMatters:
      "Toxicology exam questions are pattern-recognition questions — a specific antidote pairs with a specific poison, and specific symptom clusters (toxidromes) point to a specific drug class. Learning the pairs is higher yield than re-deriving mechanisms from scratch.",
    coreIdea:
      "Most poisoning management follows the same three steps: prevent further absorption (e.g., activated charcoal, if appropriate), give a specific antidote if one exists, and provide supportive care. Not every poison has an antidote, and not every poison responds to charcoal.",
    classification: {
      headers: ["Poison/drug", "Antidote", "Mechanism of antidote"],
      rows: [
        ["Paracetamol", "N-acetylcysteine", "Replenishes glutathione to detoxify NAPQI"],
        ["Opioids", "Naloxone", "Competitive mu-receptor antagonist"],
        ["Benzodiazepines", "Flumazenil", "Competitive GABA-A/benzodiazepine site antagonist"],
        ["Methanol/ethylene glycol", "Fomepizole", "Blocks alcohol dehydrogenase"],
        ["Digoxin", "Digoxin-specific antibody (Fab)", "Binds and sequesters free digoxin"],
        ["Heparin", "Protamine sulfate", "Forms an inactive complex with heparin"],
      ],
    },
    mechanismTitle: "General approach to acute poisoning",
    mechanismSteps: [
      "Assess and stabilize airway, breathing, circulation",
      "Identify the poison and time since exposure",
      "Prevent further absorption if appropriate (e.g., activated charcoal within ~1 hour)",
      "Give a specific antidote if one exists",
      "Enhance elimination if indicated (e.g., urinary alkalinization for aspirin)",
      "Provide supportive/organ-protective care",
    ],
    clinicalCorrelation: {
      scenario: "A patient with severe salicylate (aspirin) overdose is treated with IV sodium bicarbonate to alkalinize the urine.",
      mechanism: "Aspirin is a weak acid; in alkaline urine it stays ionized and cannot be reabsorbed by renal tubules.",
      effect: "Ion trapping increases urinary excretion of the drug, speeding elimination.",
      adverseEffect: "This strategy is specific to weak acids — it would not work for a weak base like amphetamine, which would instead be trapped by acidifying the urine.",
      examClue: "\"Alkalinize urine to trap a weak acid\" and \"acidify urine to trap a weak base\" are the two mirror-image ion-trapping facts most commonly tested.",
    },
    highYield: [
      "Activated charcoal is most effective within about 1 hour of ingestion; it is ineffective for alcohols, iron, lithium, and corrosive/caustic ingestions.",
      "N-acetylcysteine (paracetamol), naloxone (opioids), flumazenil (benzodiazepines), fomepizole/ethanol (methanol/ethylene glycol), and digoxin-specific antibody fragments (digoxin) are the classic drug-antidote pairs to memorize cold.",
      "US FDA pregnancy category X drugs (historical system) — isotretinoin, warfarin, methotrexate, most statins — have documented fetal risk outweighing any benefit and are contraindicated in pregnancy.",
      "Grapefruit juice inhibits intestinal (not hepatic) CYP3A4, raising oral bioavailability of certain statins, calcium channel blockers, and cyclosporine.",
      "Serotonin syndrome (clonus/hyperreflexia, agitation, hyperthermia) and neuroleptic malignant syndrome (severe 'lead-pipe' rigidity, hyperthermia, altered consciousness from dopamine blockade) are both hyperthermic emergencies but are distinguished by clonus/hyperreflexia versus rigidity.",
    ],
    examTraps: [
      "Protamine sulfate reverses unfractionated heparin fully but only partially reverses low-molecular-weight heparin — a frequently tested nuance.",
      "Flumazenil can precipitate seizures in a chronic benzodiazepine user or when a pro-convulsant was co-ingested — it isn't automatically safe to give.",
      "Fomepizole (or ethanol as a competitive substrate) works by blocking alcohol dehydrogenase before methanol/ethylene glycol can be converted into their genuinely toxic metabolites.",
    ],
    quickTable: {
      headers: ["Toxidrome/feature", "Likely cause"],
      rows: [
        ["Clonus, hyperreflexia, hyperthermia, agitation", "Serotonin syndrome"],
        ["Lead-pipe rigidity, hyperthermia, altered mental status", "Neuroleptic malignant syndrome"],
        ["Miosis, salivation, bradycardia, fasciculations", "Organophosphate/cholinergic toxicity"],
        ["Tinnitus, tachypnea, metabolic acidosis + respiratory alkalosis", "Salicylate (aspirin) toxicity"],
      ],
    },
    confusionPairs: [
      { left: "Serotonin syndrome", right: "Neuroleptic malignant syndrome", explanation: "Both cause hyperthermia. Serotonin syndrome features clonus/hyperreflexia (too much serotonin). NMS features severe lead-pipe rigidity with normal/reduced reflexes (too little dopamine activity)." },
      { left: "Fomepizole", right: "Ethanol (as antidote)", explanation: "Both block alcohol dehydrogenase to prevent toxic methanol/ethylene glycol metabolites, but fomepizole is preferred clinically — more predictable dosing, no added intoxication or hypoglycemia risk." },
    ],
  },
};
