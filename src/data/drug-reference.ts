export interface DrugRefItem {
  id: string;
  topicId: string;
  parameter: string; // drug or drug class name
  value: string; // mechanism / class tag shown as a chip
  note: string; // key exam point
}

export const DRUG_REFERENCE: DrugRefItem[] = [
  // General Pharmacology
  { id: "dr-01", topicId: "general", parameter: "Warfarin", value: "Vitamin K epoxide reductase inhibitor", note: "Delayed onset (days); monitored with PT/INR; reversed with vitamin K or FFP/PCC." },
  { id: "dr-02", topicId: "general", parameter: "Rifampicin", value: "CYP450 inducer", note: "Reduces levels of oral contraceptives, warfarin, and many other CYP substrates." },
  { id: "dr-03", topicId: "general", parameter: "Cimetidine", value: "CYP450 inhibitor", note: "Also an H2 blocker; raises levels of warfarin, phenytoin, theophylline." },
  { id: "dr-04", topicId: "general", parameter: "Grapefruit juice", value: "Intestinal CYP3A4 inhibitor", note: "Raises bioavailability of some statins, CCBs, and cyclosporine." },

  // Autonomic
  { id: "dr-05", topicId: "ans", parameter: "Atropine", value: "Muscarinic antagonist", note: "Antidote for organophosphate/muscarinic toxicity; causes anticholinergic toxidrome in overdose." },
  { id: "dr-06", topicId: "ans", parameter: "Pralidoxime (2-PAM)", value: "Acetylcholinesterase reactivator", note: "Given with atropine in organophosphate poisoning; must be started before 'aging' of the enzyme occurs." },
  { id: "dr-07", topicId: "ans", parameter: "Phenylephrine", value: "Selective alpha-1 agonist", note: "Nasal decongestant; treats hypotension; reflex bradycardia at high dose." },
  { id: "dr-08", topicId: "ans", parameter: "Salbutamol", value: "Selective beta-2 agonist", note: "First-line reliever in acute asthma/bronchospasm; tremor and tachycardia at high dose." },
  { id: "dr-09", topicId: "ans", parameter: "Propranolol", value: "Non-selective beta blocker", note: "Caution in asthma (beta-2 blockade) and in diabetics (masks hypoglycemia symptoms)." },

  // Cardiovascular
  { id: "dr-10", topicId: "cvs", parameter: "Enalapril / ACE inhibitors", value: "Blocks angiotensin-converting enzyme", note: "Dry cough and angioedema via bradykinin accumulation; avoid in pregnancy." },
  { id: "dr-11", topicId: "cvs", parameter: "Losartan / ARBs", value: "Angiotensin II receptor (AT1) blocker", note: "Alternative to ACEI when cough is intolerable; no bradykinin effect." },
  { id: "dr-12", topicId: "cvs", parameter: "Amiodarone", value: "Class III antiarrhythmic (K+ channel block)", note: "Also has class I, II, IV actions; causes thyroid dysfunction and pulmonary fibrosis with chronic use." },
  { id: "dr-13", topicId: "cvs", parameter: "Verapamil", value: "Non-dihydropyridine CCB", note: "Avoid combining with beta-blockers — risk of heart block/severe bradycardia." },
  { id: "dr-14", topicId: "cvs", parameter: "Heparin", value: "Activates antithrombin III", note: "Immediate onset; monitored with aPTT; reversed with protamine sulfate." },
  { id: "dr-15", topicId: "cvs", parameter: "Atorvastatin / statins", value: "HMG-CoA reductase inhibitor", note: "Risk of myopathy/rhabdomyolysis, increased with fibrates or CYP3A4 inhibitors." },
  { id: "dr-16", topicId: "cvs", parameter: "Digoxin", value: "Na+/K+-ATPase inhibitor", note: "Narrow therapeutic index; hypokalemia predisposes to toxicity; antidote is digoxin-specific antibody (Fab) fragments." },
  { id: "dr-17", topicId: "cvs", parameter: "Furosemide", value: "Loop diuretic (Na-K-2Cl blocker)", note: "Ototoxicity and hypokalemia are key adverse effects." },
  { id: "dr-18", topicId: "cvs", parameter: "Hydrochlorothiazide", value: "Thiazide diuretic (Na-Cl blocker, DCT)", note: "Causes hypercalcemia (unlike loops) and hyperglycemia/hyperuricemia." },
  { id: "dr-19", topicId: "cvs", parameter: "Spironolactone", value: "Aldosterone receptor antagonist", note: "Potassium-sparing; causes gynecomastia via anti-androgenic effect." },

  // CNS
  { id: "dr-20", topicId: "cns", parameter: "Diazepam", value: "Benzodiazepine (GABA-A modulator)", note: "Increases frequency of Cl- channel opening; reversed by flumazenil." },
  { id: "dr-21", topicId: "cns", parameter: "Phenytoin", value: "Voltage-gated Na+ channel blocker", note: "Zero-order kinetics near therapeutic range; causes gingival hyperplasia, hirsutism." },
  { id: "dr-22", topicId: "cns", parameter: "Valproate", value: "Broad-spectrum antiepileptic", note: "Teratogenic (neural tube defects) and hepatotoxic; avoid in pregnancy when possible." },
  { id: "dr-23", topicId: "cns", parameter: "Haloperidol", value: "Typical antipsychotic (D2 blocker)", note: "High risk of extrapyramidal symptoms and tardive dyskinesia." },
  { id: "dr-24", topicId: "cns", parameter: "Clozapine", value: "Atypical antipsychotic", note: "Reserved for resistant schizophrenia due to agranulocytosis risk; mandatory blood monitoring." },
  { id: "dr-25", topicId: "cns", parameter: "Fluoxetine", value: "SSRI", note: "First-line for depression; risk of serotonin syndrome with MAOIs." },
  { id: "dr-26", topicId: "cns", parameter: "Lithium", value: "Mood stabilizer (mechanism not fully defined)", note: "Narrow therapeutic index; nephrogenic diabetes insipidus and hypothyroidism with chronic use; toxicity worsened by dehydration/thiazides." },
  { id: "dr-27", topicId: "cns", parameter: "Ketamine", value: "NMDA receptor antagonist", note: "'Dissociative anesthesia'; preserves airway reflexes; raises ICP/IOP." },

  // Analgesics
  { id: "dr-28", topicId: "analgesics", parameter: "Aspirin", value: "Irreversible COX-1/COX-2 inhibitor", note: "Low-dose antiplatelet effect lasts a platelet lifespan (~7-10 days); Reye syndrome risk in children with viral illness." },
  { id: "dr-29", topicId: "analgesics", parameter: "Paracetamol", value: "Weak/central COX inhibitor", note: "Minimal anti-inflammatory effect; hepatotoxic in overdose via NAPQI; antidote N-acetylcysteine." },
  { id: "dr-30", topicId: "analgesics", parameter: "Morphine", value: "Mu-opioid receptor agonist", note: "Respiratory depression is the cause of death in overdose; reversed by naloxone." },
  { id: "dr-31", topicId: "analgesics", parameter: "Lidocaine", value: "Local anesthetic (Na+ channel blocker)", note: "Blocks small/myelinated fibers first; systemic toxicity causes CNS excitation then cardiac depression." },
  { id: "dr-32", topicId: "analgesics", parameter: "Diclofenac / NSAIDs", value: "Non-selective COX inhibitor", note: "GI ulceration (COX-1) and renal impairment via reduced prostaglandin-mediated afferent arteriolar dilation." },

  // Antimicrobial
  { id: "dr-33", topicId: "antimicrobial", parameter: "Penicillin / beta-lactams", value: "Cell wall synthesis inhibitor", note: "Binds penicillin-binding proteins; bactericidal; risk of immediate hypersensitivity/anaphylaxis." },
  { id: "dr-34", topicId: "antimicrobial", parameter: "Gentamicin", value: "30S ribosome inhibitor (aminoglycoside)", note: "Nephrotoxic and ototoxic; requires oxygen-dependent uptake, ineffective vs anaerobes." },
  { id: "dr-35", topicId: "antimicrobial", parameter: "Azithromycin", value: "50S ribosome inhibitor (macrolide)", note: "Good for atypical pneumonia; can prolong QT interval." },
  { id: "dr-36", topicId: "antimicrobial", parameter: "Ciprofloxacin", value: "DNA gyrase / topoisomerase IV inhibitor", note: "Avoid in children/pregnancy (cartilage risk); tendon rupture risk." },
  { id: "dr-37", topicId: "antimicrobial", parameter: "Vancomycin", value: "Cell wall synthesis inhibitor (D-Ala-D-Ala binding)", note: "Reserved for MRSA and beta-lactam-resistant Gram-positives; 'red man syndrome' with rapid infusion." },
  { id: "dr-38", topicId: "antimicrobial", parameter: "Co-trimoxazole", value: "Sequential folate synthesis blockade", note: "Trimethoprim + sulfamethoxazole; synergistic bactericidal combination." },
  { id: "dr-39", topicId: "antimicrobial", parameter: "Metronidazole", value: "DNA-damaging free radical generator (anaerobes)", note: "Disulfiram-like reaction with alcohol; effective vs Giardia, Entamoeba, Trichomonas." },

  // Antiviral/antifungal/antiparasitic
  { id: "dr-40", topicId: "antiviral", parameter: "Acyclovir", value: "Viral thymidine-kinase-activated DNA chain terminator", note: "Selective for HSV/VZV-infected cells; nephrotoxic with rapid IV infusion (crystalluria)." },
  { id: "dr-41", topicId: "antiviral", parameter: "Oseltamivir", value: "Neuraminidase inhibitor", note: "Most effective if started within 48 hours of influenza symptom onset." },
  { id: "dr-42", topicId: "antiviral", parameter: "Amphotericin B", value: "Binds ergosterol, forms membrane pores", note: "'Ampho-terrible' — significant nephrotoxicity and infusion-related fever/chills." },
  { id: "dr-43", topicId: "antiviral", parameter: "Fluconazole", value: "Fungal CYP450 (14-alpha-demethylase) inhibitor", note: "Fewer drug interactions than ketoconazole; good CNS penetration (cryptococcal meningitis)." },
  { id: "dr-44", topicId: "antiviral", parameter: "Chloroquine", value: "Blocks heme detoxification in malaria parasite", note: "Resistance widespread in P. falciparum in many regions; retinopathy with long-term use." },

  // Endocrine
  { id: "dr-45", topicId: "endocrine", parameter: "Metformin", value: "Reduces hepatic gluconeogenesis", note: "First-line for T2DM; rare risk of lactic acidosis, especially with renal impairment." },
  { id: "dr-46", topicId: "endocrine", parameter: "Glimepiride / sulfonylureas", value: "Closes pancreatic beta-cell K-ATP channels", note: "Stimulates insulin release; risk of hypoglycemia and weight gain." },
  { id: "dr-47", topicId: "endocrine", parameter: "Empagliflozin", value: "SGLT2 inhibitor", note: "Causes glucosuria; cardiorenal benefit; risk of genital mycotic infection and euglycemic DKA." },
  { id: "dr-48", topicId: "endocrine", parameter: "Levothyroxine", value: "Synthetic T4", note: "Once-daily dosing; take on empty stomach for consistent absorption." },
  { id: "dr-49", topicId: "endocrine", parameter: "Tamoxifen", value: "Selective estrogen receptor modulator", note: "Antagonist in breast, agonist in endometrium — risk of endometrial cancer." },

  // GI/Respiratory
  { id: "dr-50", topicId: "gi-resp", parameter: "Omeprazole", value: "Irreversible H+/K+-ATPase inhibitor (PPI)", note: "Long-term use linked to hypomagnesemia and B12 deficiency." },
  { id: "dr-51", topicId: "gi-resp", parameter: "Ondansetron", value: "5-HT3 receptor antagonist", note: "First-line for chemotherapy-induced nausea/vomiting; can prolong QT." },
  { id: "dr-52", topicId: "gi-resp", parameter: "Ipratropium", value: "Inhaled muscarinic antagonist", note: "Especially useful in COPD; minimal systemic absorption." },
  { id: "dr-53", topicId: "gi-resp", parameter: "Loperamide", value: "Peripheral mu-opioid agonist (gut)", note: "Does not cross blood-brain barrier at normal doses; no central opioid effects." },

  // Chemotherapy
  { id: "dr-54", topicId: "chemo", parameter: "Methotrexate", value: "Dihydrofolate reductase inhibitor", note: "S-phase specific; toxicity rescued by leucovorin (folinic acid)." },
  { id: "dr-55", topicId: "chemo", parameter: "Doxorubicin", value: "Topoisomerase II inhibitor / DNA intercalator", note: "Cumulative dose-dependent cardiotoxicity; monitor ejection fraction." },
  { id: "dr-56", topicId: "chemo", parameter: "Cyclophosphamide", value: "Alkylating agent (DNA cross-linker)", note: "Hemorrhagic cystitis from acrolein metabolite, prevented by mesna." },
  { id: "dr-57", topicId: "chemo", parameter: "Cisplatin", value: "Platinum DNA cross-linker", note: "Nephrotoxic (hydrate aggressively), highly emetogenic, ototoxic." },
  { id: "dr-58", topicId: "chemo", parameter: "Imatinib", value: "BCR-ABL tyrosine kinase inhibitor", note: "Targeted therapy for CML; generally better tolerated than cytotoxic chemotherapy." },

  // Toxicology
  { id: "dr-59", topicId: "toxicology", parameter: "N-acetylcysteine", value: "Antidote — paracetamol", note: "Replenishes glutathione to detoxify NAPQI." },
  { id: "dr-60", topicId: "toxicology", parameter: "Naloxone", value: "Antidote — opioids", note: "Short half-life; re-sedation possible after reversal of long-acting opioids." },
  { id: "dr-61", topicId: "toxicology", parameter: "Flumazenil", value: "Antidote — benzodiazepines", note: "Can precipitate seizures in dependent users or with co-ingested pro-convulsants." },
  { id: "dr-62", topicId: "toxicology", parameter: "Fomepizole", value: "Antidote — methanol/ethylene glycol", note: "Blocks alcohol dehydrogenase, preventing formation of toxic metabolites." },
  { id: "dr-63", topicId: "toxicology", parameter: "Digoxin-specific antibody (Fab)", value: "Antidote — digoxin", note: "Binds free digoxin, used in severe/life-threatening digoxin toxicity." },
  { id: "dr-64", topicId: "toxicology", parameter: "Protamine sulfate", value: "Antidote — heparin", note: "Forms a stable complex with heparin, neutralizing its anticoagulant activity." },
];
