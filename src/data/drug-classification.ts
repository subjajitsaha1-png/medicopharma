// Classification-chart data: the kind of "Classification of ___ drugs" tree every
// Indian MBBS pharmacology chapter opens with. Organizing drug classes by mechanism
// or site of action is a generic, decades-old teaching convention used across every
// pharmacology textbook (Lippincott, KD Tripathi, Goodman & Gilman, etc.) — it is not
// original to any one book. The specific class names below, the tree structure, the
// grouping choices, and every prototype-drug list were independently written for this
// app. No text, table, or figure was copied from Lippincott Illustrated Reviews or
// KD Tripathi's Essentials of Pharmacology; both were only a general reference for
// which classes are worth covering at MBBS level.

export interface ClassNode {
  label: string;
  examples?: string; // prototype/representative drugs, comma-separated
  children?: ClassNode[];
}

export interface ClassificationSection {
  id: string;
  title: string;
  tree: ClassNode[];
}

export interface UnitClassification {
  topicId: string;
  sections: ClassificationSection[];
}

export const DRUG_CLASSIFICATION: UnitClassification[] = [
  {
    topicId: "general",
    sections: [
      {
        id: "gen-routes",
        title: "Routes of drug administration",
        tree: [
          { label: "Local routes", children: [
            { label: "Topical", examples: "skin/mucosal creams, eye/ear drops" },
            { label: "Deeper tissue", examples: "intra-articular, intrathecal" },
          ]},
          { label: "Systemic — enteral", children: [
            { label: "Oral" }, { label: "Sublingual/buccal" }, { label: "Rectal" },
          ]},
          { label: "Systemic — parenteral", children: [
            { label: "Intravenous" }, { label: "Intramuscular" }, { label: "Subcutaneous" },
            { label: "Inhalational" }, { label: "Transdermal" },
          ]},
        ],
      },
      {
        id: "gen-cyp",
        title: "CYP450-interacting drugs (selected)",
        tree: [
          { label: "Enzyme inducers", examples: "rifampicin, phenytoin, carbamazepine, phenobarbital" },
          { label: "Enzyme inhibitors", examples: "cimetidine, ketoconazole, erythromycin, ciprofloxacin, grapefruit juice (intestinal CYP3A4 only)" },
        ],
      },
    ],
  },

  {
    topicId: "ans",
    sections: [
      {
        id: "ans-cholinergic",
        title: "Cholinergic (parasympathomimetic) drugs",
        tree: [
          { label: "Direct-acting agonists", children: [
            { label: "Choline esters", examples: "acetylcholine, carbachol, bethanechol" },
            { label: "Alkaloids", examples: "pilocarpine, muscarine" },
          ]},
          { label: "Indirect-acting (anticholinesterases)", children: [
            { label: "Reversible", examples: "physostigmine, neostigmine, pyridostigmine, edrophonium, donepezil" },
            { label: "Irreversible", examples: "organophosphates (malathion, parathion), echothiophate" },
          ]},
        ],
      },
      {
        id: "ans-anticholinergic",
        title: "Anticholinergic (parasympatholytic) drugs",
        tree: [
          { label: "Antimuscarinics — natural/systemic", examples: "atropine, hyoscine (scopolamine)" },
          { label: "Antimuscarinics — quaternary/inhaled", examples: "ipratropium, tiotropium, glycopyrrolate" },
          { label: "Antimuscarinics — GI/GU selective", examples: "dicyclomine, oxybutynin, tolterodine" },
          { label: "Ganglion blockers", examples: "hexamethonium, trimethaphan (largely historical)" },
        ],
      },
      {
        id: "ans-adrenergic-agonist",
        title: "Adrenergic agonists (sympathomimetics)",
        tree: [
          { label: "Alpha-1 selective", examples: "phenylephrine, methoxamine" },
          { label: "Alpha-2 selective", examples: "clonidine, methyldopa, dexmedetomidine" },
          { label: "Beta-1 selective", examples: "dobutamine" },
          { label: "Beta-2 selective", examples: "salbutamol, terbutaline, salmeterol, formoterol" },
          { label: "Non-selective / mixed", examples: "adrenaline (alpha+beta), noradrenaline (alpha1+beta1), dopamine (dose-dependent), ephedrine (mixed direct+indirect)" },
        ],
      },
      {
        id: "ans-adrenergic-antagonist",
        title: "Adrenergic antagonists",
        tree: [
          { label: "Alpha blockers", children: [
            { label: "Non-selective", examples: "phenoxybenzamine, phentolamine" },
            { label: "Alpha-1 selective", examples: "prazosin, doxazosin, tamsulosin" },
          ]},
          { label: "Beta blockers", children: [
            { label: "Non-selective", examples: "propranolol, timolol, nadolol" },
            { label: "Beta-1 selective (cardioselective)", examples: "atenolol, metoprolol, bisoprolol" },
            { label: "With additional alpha-blocking activity", examples: "carvedilol, labetalol" },
            { label: "With intrinsic sympathomimetic activity", examples: "pindolol, acebutolol" },
          ]},
        ],
      },
    ],
  },

  {
    topicId: "cvs",
    sections: [
      {
        id: "cvs-antihtn",
        title: "Antihypertensive drugs",
        tree: [
          { label: "Diuretics", examples: "hydrochlorothiazide, furosemide, spironolactone" },
          { label: "RAAS blockers", children: [
            { label: "ACE inhibitors", examples: "enalapril, ramipril, lisinopril" },
            { label: "ARBs", examples: "losartan, telmisartan, valsartan" },
            { label: "Direct renin inhibitor", examples: "aliskiren" },
          ]},
          { label: "Calcium channel blockers", children: [
            { label: "Dihydropyridines", examples: "amlodipine, nifedipine" },
            { label: "Non-dihydropyridines", examples: "verapamil, diltiazem" },
          ]},
          { label: "Beta blockers", examples: "atenolol, metoprolol, bisoprolol" },
          { label: "Centrally acting", examples: "methyldopa, clonidine" },
          { label: "Direct vasodilators", examples: "hydralazine, sodium nitroprusside, minoxidil" },
          { label: "Alpha-1 blockers", examples: "prazosin, doxazosin" },
        ],
      },
      {
        id: "cvs-antianginal",
        title: "Antianginal drugs",
        tree: [
          { label: "Nitrates", examples: "glyceryl trinitrate, isosorbide dinitrate/mononitrate" },
          { label: "Beta blockers", examples: "atenolol, metoprolol" },
          { label: "Calcium channel blockers", examples: "amlodipine, diltiazem, verapamil" },
          { label: "Other", examples: "ranolazine (late Na+ current inhibitor), ivabradine (If channel inhibitor), nicorandil (K-ATP opener + nitrate)" },
        ],
      },
      {
        id: "cvs-antiarrhythmic",
        title: "Antiarrhythmic drugs (Vaughan-Williams)",
        tree: [
          { label: "Class I — Na+ channel blockers", children: [
            { label: "IA", examples: "quinidine, procainamide, disopyramide" },
            { label: "IB", examples: "lidocaine, mexiletine" },
            { label: "IC", examples: "flecainide, propafenone" },
          ]},
          { label: "Class II — beta blockers", examples: "propranolol, esmolol" },
          { label: "Class III — K+ channel blockers", examples: "amiodarone, sotalol, dofetilide" },
          { label: "Class IV — Ca2+ channel blockers", examples: "verapamil, diltiazem" },
          { label: "Other", examples: "adenosine, digoxin, magnesium sulfate" },
        ],
      },
      {
        id: "cvs-diuretics",
        title: "Diuretics",
        tree: [
          { label: "Loop diuretics", examples: "furosemide, bumetanide, torsemide" },
          { label: "Thiazide / thiazide-like", examples: "hydrochlorothiazide, chlorthalidone, indapamide" },
          { label: "Potassium-sparing", children: [
            { label: "Aldosterone antagonists", examples: "spironolactone, eplerenone" },
            { label: "ENaC blockers", examples: "amiloride, triamterene" },
          ]},
          { label: "Carbonic anhydrase inhibitors", examples: "acetazolamide" },
          { label: "Osmotic diuretics", examples: "mannitol" },
        ],
      },
      {
        id: "cvs-lipid",
        title: "Antihyperlipidemic drugs",
        tree: [
          { label: "Statins (HMG-CoA reductase inhibitors)", examples: "atorvastatin, rosuvastatin, simvastatin" },
          { label: "Fibrates (PPAR-alpha agonists)", examples: "fenofibrate, gemfibrozil" },
          { label: "Bile acid sequestrants", examples: "cholestyramine, colestipol" },
          { label: "Cholesterol absorption inhibitor", examples: "ezetimibe" },
          { label: "PCSK9 inhibitors", examples: "evolocumab, alirocumab" },
          { label: "Niacin" },
        ],
      },
      {
        id: "cvs-clot",
        title: "Antiplatelet, anticoagulant & thrombolytic drugs",
        tree: [
          { label: "Antiplatelets", children: [
            { label: "COX inhibitor", examples: "aspirin (low dose)" },
            { label: "ADP (P2Y12) receptor blockers", examples: "clopidogrel, ticagrelor, prasugrel" },
            { label: "GP IIb/IIIa inhibitors", examples: "abciximab, tirofiban" },
          ]},
          { label: "Anticoagulants", children: [
            { label: "Indirect — antithrombin-dependent", examples: "unfractionated heparin, LMWH (enoxaparin), fondaparinux" },
            { label: "Vitamin K antagonist", examples: "warfarin" },
            { label: "Direct oral anticoagulants", examples: "rivaroxaban, apixaban (factor Xa), dabigatran (thrombin)" },
          ]},
          { label: "Thrombolytics (fibrinolytics)", examples: "streptokinase, alteplase, tenecteplase" },
        ],
      },
      {
        id: "cvs-hf",
        title: "Drugs for heart failure",
        tree: [
          { label: "Diuretics", examples: "furosemide, spironolactone" },
          { label: "RAAS blockers", examples: "ACE inhibitors, ARBs, ARNI (sacubitril-valsartan)" },
          { label: "Beta blockers (evidence-based)", examples: "bisoprolol, carvedilol, metoprolol succinate" },
          { label: "Mineralocorticoid receptor antagonists", examples: "spironolactone, eplerenone" },
          { label: "SGLT2 inhibitors", examples: "dapagliflozin, empagliflozin" },
          { label: "Other", examples: "digoxin, ivabradine, hydralazine + nitrate combination" },
        ],
      },
    ],
  },

  {
    topicId: "cns",
    sections: [
      {
        id: "cns-sedative",
        title: "Sedative-hypnotics",
        tree: [
          { label: "Benzodiazepines", examples: "diazepam, lorazepam, alprazolam, midazolam" },
          { label: "Barbiturates", examples: "phenobarbital, thiopental" },
          { label: "Non-benzodiazepine \"Z-drugs\"", examples: "zolpidem, zaleplon, eszopiclone" },
          { label: "Other", examples: "melatonin agonists (ramelteon), orexin antagonists (suvorexant), chloral hydrate" },
        ],
      },
      {
        id: "cns-antiepileptic",
        title: "Antiepileptic drugs",
        tree: [
          { label: "Na+ channel blockers", examples: "phenytoin, carbamazepine, lamotrigine, oxcarbazepine" },
          { label: "GABA enhancers", examples: "benzodiazepines, barbiturates, vigabatrin, tiagabine" },
          { label: "Ca2+ channel modulators", examples: "ethosuximide (T-type), gabapentin/pregabalin (alpha-2-delta subunit)" },
          { label: "Broad-spectrum / multiple mechanisms", examples: "sodium valproate, topiramate, levetiracetam" },
        ],
      },
      {
        id: "cns-antipsychotic",
        title: "Antipsychotic drugs",
        tree: [
          { label: "Typical (first-generation, D2-predominant)", children: [
            { label: "High potency", examples: "haloperidol, trifluoperazine" },
            { label: "Low potency", examples: "chlorpromazine" },
          ]},
          { label: "Atypical (second-generation, D2 + 5-HT2A)", examples: "risperidone, olanzapine, quetiapine, aripiprazole (partial D2 agonist), clozapine" },
        ],
      },
      {
        id: "cns-antidepressant",
        title: "Antidepressant drugs",
        tree: [
          { label: "SSRIs", examples: "fluoxetine, sertraline, escitalopram" },
          { label: "SNRIs", examples: "venlafaxine, duloxetine" },
          { label: "Tricyclic antidepressants", examples: "amitriptyline, imipramine, clomipramine" },
          { label: "MAO inhibitors", examples: "phenelzine, tranylcypromine, selegiline (MAO-B selective)" },
          { label: "Atypical", examples: "mirtazapine, bupropion, trazodone" },
        ],
      },
      {
        id: "cns-anesthetic",
        title: "Anesthetics",
        tree: [
          { label: "General — inhalational", examples: "halothane, isoflurane, sevoflurane, nitrous oxide" },
          { label: "General — intravenous", examples: "thiopental, propofol, ketamine, etomidate" },
          { label: "Local anesthetics", children: [
            { label: "Esters", examples: "procaine, cocaine, benzocaine" },
            { label: "Amides", examples: "lidocaine, bupivacaine, ropivacaine" },
          ]},
        ],
      },
      {
        id: "cns-opioid",
        title: "Opioid analgesics (by receptor activity)",
        tree: [
          { label: "Strong agonists", examples: "morphine, fentanyl, methadone" },
          { label: "Moderate agonists", examples: "codeine, tramadol" },
          { label: "Partial agonists", examples: "buprenorphine" },
          { label: "Mixed agonist-antagonists", examples: "pentazocine, nalbuphine" },
          { label: "Antagonists", examples: "naloxone, naltrexone" },
        ],
      },
      {
        id: "cns-parkinson",
        title: "Anti-Parkinsonian drugs",
        tree: [
          { label: "Dopamine precursor", examples: "levodopa (with carbidopa)" },
          { label: "Dopamine agonists", examples: "pramipexole, ropinirole, bromocriptine" },
          { label: "MAO-B inhibitors", examples: "selegiline, rasagiline" },
          { label: "COMT inhibitors", examples: "entacapone, tolcapone" },
          { label: "Anticholinergics", examples: "trihexyphenidyl, benztropine" },
          { label: "Other", examples: "amantadine (dopamine release + NMDA antagonist)" },
        ],
      },
    ],
  },

  {
    topicId: "analgesics",
    sections: [
      {
        id: "an-nsaid",
        title: "NSAIDs and antipyretic-analgesics",
        tree: [
          { label: "Non-selective COX inhibitors", examples: "aspirin, ibuprofen, diclofenac, naproxen, indomethacin" },
          { label: "Preferential COX-2", examples: "nimesulide, meloxicam" },
          { label: "Selective COX-2 inhibitors", examples: "celecoxib, etoricoxib" },
          { label: "Antipyretic-analgesic (weak COX action)", examples: "paracetamol" },
        ],
      },
      {
        id: "an-local",
        title: "Local anesthetics",
        tree: [
          { label: "Esters", examples: "procaine, benzocaine" },
          { label: "Amides", examples: "lidocaine, bupivacaine, ropivacaine" },
        ],
      },
    ],
  },

  {
    topicId: "antimicrobial",
    sections: [
      {
        id: "am-cellwall",
        title: "Cell-wall synthesis inhibitors",
        tree: [
          { label: "Penicillins", examples: "benzylpenicillin, amoxicillin, piperacillin (+ beta-lactamase inhibitors: clavulanate, sulbactam, tazobactam)" },
          { label: "Cephalosporins", examples: "gen 1 (cefazolin), gen 2 (cefuroxime), gen 3 (ceftriaxone, ceftazidime), gen 4 (cefepime), gen 5 (ceftaroline)" },
          { label: "Carbapenems", examples: "imipenem, meropenem, ertapenem" },
          { label: "Monobactams", examples: "aztreonam" },
          { label: "Glycopeptides", examples: "vancomycin, teicoplanin" },
        ],
      },
      {
        id: "am-protein",
        title: "Protein synthesis inhibitors",
        tree: [
          { label: "30S inhibitors", examples: "aminoglycosides (gentamicin, amikacin), tetracyclines (doxycycline), glycylcyclines (tigecycline)" },
          { label: "50S inhibitors", examples: "macrolides (erythromycin, azithromycin), lincosamides (clindamycin), chloramphenicol, oxazolidinones (linezolid)" },
        ],
      },
      {
        id: "am-nucleic",
        title: "Nucleic acid / DNA-RNA-targeting drugs",
        tree: [
          { label: "Fluoroquinolones", examples: "ciprofloxacin, levofloxacin, moxifloxacin" },
          { label: "Nitroimidazoles", examples: "metronidazole, tinidazole" },
          { label: "Rifamycins", examples: "rifampicin" },
        ],
      },
      {
        id: "am-folate",
        title: "Folate synthesis inhibitors",
        tree: [
          { label: "Sulfonamides", examples: "sulfamethoxazole" },
          { label: "DHFR inhibitor", examples: "trimethoprim" },
          { label: "Combination", examples: "co-trimoxazole" },
        ],
      },
      {
        id: "am-membrane",
        title: "Cell membrane-acting agents",
        tree: [
          { label: "Polymyxins", examples: "colistin, polymyxin B" },
          { label: "Daptomycin (lipopeptide)" },
        ],
      },
      {
        id: "am-tb",
        title: "Anti-tuberculosis drugs",
        tree: [
          { label: "First-line", examples: "isoniazid, rifampicin, pyrazinamide, ethambutol" },
          { label: "Second-line / drug-resistant TB", examples: "levofloxacin, bedaquiline, linezolid, cycloserine, ethionamide" },
        ],
      },
      {
        id: "am-leprosy",
        title: "Antileprotic drugs",
        tree: [
          { label: "Standard MDT components", examples: "dapsone, rifampicin, clofazimine" },
        ],
      },
    ],
  },

  {
    topicId: "antiviral",
    sections: [
      {
        id: "av-herpes",
        title: "Anti-herpes / anti-CMV agents",
        tree: [
          { label: "Anti-HSV/VZV", examples: "acyclovir, valacyclovir, famciclovir" },
          { label: "Anti-CMV", examples: "ganciclovir, valganciclovir, foscarnet" },
        ],
      },
      {
        id: "av-influenza",
        title: "Anti-influenza agents",
        tree: [
          { label: "Neuraminidase inhibitors", examples: "oseltamivir, zanamivir" },
          { label: "Cap-dependent endonuclease inhibitor", examples: "baloxavir" },
        ],
      },
      {
        id: "av-arv",
        title: "Antiretroviral drugs (HIV)",
        tree: [
          { label: "NRTIs", examples: "tenofovir, lamivudine, zidovudine" },
          { label: "NNRTIs", examples: "efavirenz, nevirapine" },
          { label: "Protease inhibitors", examples: "lopinavir/ritonavir, atazanavir" },
          { label: "Integrase strand transfer inhibitors", examples: "dolutegravir, raltegravir" },
          { label: "Entry/fusion inhibitors", examples: "maraviroc, enfuvirtide" },
        ],
      },
      {
        id: "av-antifungal",
        title: "Antifungal drugs",
        tree: [
          { label: "Polyenes", examples: "amphotericin B, nystatin" },
          { label: "Azoles", examples: "fluconazole, itraconazole, voriconazole, ketoconazole" },
          { label: "Echinocandins", examples: "caspofungin, micafungin" },
          { label: "Allylamines", examples: "terbinafine" },
          { label: "Other", examples: "griseofulvin, flucytosine" },
        ],
      },
      {
        id: "av-antimalarial",
        title: "Antimalarial drugs (by stage targeted)",
        tree: [
          { label: "Blood schizonticides", examples: "chloroquine, artemisinin derivatives, quinine, mefloquine" },
          { label: "Tissue schizonticides (radical cure)", examples: "primaquine" },
          { label: "Gametocytocides", examples: "primaquine" },
          { label: "Chemoprophylaxis", examples: "doxycycline, mefloquine, atovaquone-proguanil" },
        ],
      },
      {
        id: "av-antiamoebic",
        title: "Antiamoebic / antiprotozoal drugs",
        tree: [
          { label: "Tissue + luminal amoebicides", examples: "metronidazole, tinidazole" },
          { label: "Luminal amoebicides only", examples: "diloxanide furoate" },
          { label: "Antigiardial/antitrichomonal", examples: "metronidazole, tinidazole" },
        ],
      },
      {
        id: "av-anthelmintic",
        title: "Anthelmintic drugs",
        tree: [
          { label: "Benzimidazoles", examples: "albendazole, mebendazole" },
          { label: "Other", examples: "ivermectin, praziquantel (cestodes/trematodes), diethylcarbamazine (filariasis)" },
        ],
      },
    ],
  },

  {
    topicId: "endocrine",
    sections: [
      {
        id: "en-diabetes",
        title: "Antidiabetic drugs",
        tree: [
          { label: "Insulin", examples: "rapid-acting (lispro), short-acting (regular), intermediate (NPH), long-acting (glargine, detemir)" },
          { label: "Biguanides", examples: "metformin" },
          { label: "Sulfonylureas", examples: "glimepiride, glipizide, glibenclamide" },
          { label: "Meglitinides", examples: "repaglinide, nateglinide" },
          { label: "Thiazolidinediones", examples: "pioglitazone" },
          { label: "DPP-4 inhibitors", examples: "sitagliptin, vildagliptin" },
          { label: "GLP-1 receptor agonists", examples: "liraglutide, semaglutide" },
          { label: "SGLT2 inhibitors", examples: "empagliflozin, dapagliflozin" },
          { label: "Alpha-glucosidase inhibitors", examples: "acarbose" },
        ],
      },
      {
        id: "en-thyroid",
        title: "Thyroid-related drugs",
        tree: [
          { label: "Thyroid hormone replacement", examples: "levothyroxine (T4), liothyronine (T3)" },
          { label: "Antithyroid — thioamides", examples: "carbimazole, methimazole, propylthiouracil" },
          { label: "Antithyroid — iodides/radioiodine", examples: "Lugol's iodine, radioactive iodine (131I)" },
          { label: "Adjunct (symptom control)", examples: "propranolol" },
        ],
      },
      {
        id: "en-steroid",
        title: "Corticosteroids",
        tree: [
          { label: "Short-acting glucocorticoids", examples: "hydrocortisone" },
          { label: "Intermediate-acting", examples: "prednisolone, methylprednisolone" },
          { label: "Long-acting", examples: "dexamethasone, betamethasone" },
          { label: "Mineralocorticoid", examples: "fludrocortisone" },
        ],
      },
      {
        id: "en-hormones",
        title: "Sex hormones and related drugs",
        tree: [
          { label: "Estrogens", examples: "ethinylestradiol, conjugated estrogens" },
          { label: "Progestins", examples: "medroxyprogesterone, norethisterone" },
          { label: "SERMs", examples: "tamoxifen, raloxifene" },
          { label: "Anti-estrogens / aromatase inhibitors", examples: "clomiphene, anastrozole, letrozole" },
          { label: "Androgens", examples: "testosterone" },
          { label: "Anti-androgens", examples: "finasteride, flutamide, spironolactone" },
          { label: "Hormonal contraceptives", examples: "combined OCPs, progestin-only pills, depot medroxyprogesterone" },
        ],
      },
      {
        id: "en-bone",
        title: "Drugs for osteoporosis / bone disorders",
        tree: [
          { label: "Bisphosphonates", examples: "alendronate, zoledronic acid" },
          { label: "SERM", examples: "raloxifene" },
          { label: "RANKL inhibitor", examples: "denosumab" },
          { label: "Anabolic", examples: "teriparatide" },
          { label: "Other", examples: "calcitonin, calcium + vitamin D" },
        ],
      },
    ],
  },

  {
    topicId: "gi-resp",
    sections: [
      {
        id: "gi-antiulcer",
        title: "Antiulcer / acid-suppressant drugs",
        tree: [
          { label: "Proton pump inhibitors", examples: "omeprazole, pantoprazole, esomeprazole" },
          { label: "H2 receptor antagonists", examples: "ranitidine, famotidine" },
          { label: "Antacids", examples: "aluminium hydroxide, magnesium hydroxide" },
          { label: "Mucosal protectants", examples: "sucralfate, bismuth compounds" },
          { label: "Prostaglandin analogue", examples: "misoprostol" },
        ],
      },
      {
        id: "gi-antiemetic",
        title: "Antiemetic drugs",
        tree: [
          { label: "5-HT3 antagonists", examples: "ondansetron, granisetron" },
          { label: "D2 antagonists", examples: "metoclopramide, domperidone" },
          { label: "H1 antihistamines", examples: "promethazine, diphenhydramine" },
          { label: "Anticholinergics", examples: "hyoscine" },
          { label: "NK1 antagonists", examples: "aprepitant" },
          { label: "Cannabinoids", examples: "dronabinol" },
        ],
      },
      {
        id: "gi-laxative",
        title: "Laxatives and antidiarrheals",
        tree: [
          { label: "Bulk-forming laxatives", examples: "psyllium, ispaghula" },
          { label: "Osmotic laxatives", examples: "lactulose, polyethylene glycol, magnesium salts" },
          { label: "Stimulant laxatives", examples: "bisacodyl, senna" },
          { label: "Stool softeners", examples: "docusate" },
          { label: "Antidiarrheals", examples: "loperamide, ORS, racecadotril" },
        ],
      },
      {
        id: "resp-broncho",
        title: "Bronchodilators",
        tree: [
          { label: "Beta-2 agonists", children: [
            { label: "Short-acting (SABA)", examples: "salbutamol, terbutaline" },
            { label: "Long-acting (LABA)", examples: "salmeterol, formoterol" },
          ]},
          { label: "Anticholinergics", children: [
            { label: "Short-acting (SAMA)", examples: "ipratropium" },
            { label: "Long-acting (LAMA)", examples: "tiotropium" },
          ]},
          { label: "Methylxanthines", examples: "theophylline, aminophylline" },
        ],
      },
      {
        id: "resp-antiinflam",
        title: "Anti-inflammatory respiratory drugs",
        tree: [
          { label: "Inhaled corticosteroids", examples: "budesonide, fluticasone" },
          { label: "Leukotriene receptor antagonists", examples: "montelukast" },
          { label: "Mast cell stabilizers", examples: "sodium cromoglycate" },
          { label: "Anti-IgE monoclonal", examples: "omalizumab" },
        ],
      },
    ],
  },

  {
    topicId: "chemo",
    sections: [
      {
        id: "ch-alkylating",
        title: "Alkylating agents",
        tree: [
          { label: "Nitrogen mustards", examples: "cyclophosphamide, chlorambucil" },
          { label: "Platinum compounds", examples: "cisplatin, carboplatin, oxaliplatin" },
          { label: "Other", examples: "busulfan, dacarbazine" },
        ],
      },
      {
        id: "ch-antimetabolite",
        title: "Antimetabolites",
        tree: [
          { label: "Folate antagonists", examples: "methotrexate" },
          { label: "Pyrimidine analogues", examples: "5-fluorouracil, cytarabine" },
          { label: "Purine analogues", examples: "6-mercaptopurine, azathioprine" },
        ],
      },
      {
        id: "ch-natural",
        title: "Natural product / cytotoxic antibiotics",
        tree: [
          { label: "Vinca alkaloids", examples: "vincristine, vinblastine" },
          { label: "Taxanes", examples: "paclitaxel, docetaxel" },
          { label: "Topoisomerase inhibitors", examples: "etoposide (II), irinotecan/topotecan (I)" },
          { label: "Anthracyclines", examples: "doxorubicin, daunorubicin" },
        ],
      },
      {
        id: "ch-hormonal",
        title: "Hormonal anticancer agents",
        tree: [
          { label: "Anti-estrogens", examples: "tamoxifen" },
          { label: "Aromatase inhibitors", examples: "letrozole, anastrozole" },
          { label: "Anti-androgens", examples: "flutamide, bicalutamide" },
          { label: "GnRH analogues", examples: "leuprolide, goserelin" },
        ],
      },
      {
        id: "ch-targeted",
        title: "Targeted therapy and immunotherapy",
        tree: [
          { label: "Tyrosine kinase inhibitors", examples: "imatinib (BCR-ABL), erlotinib (EGFR)" },
          { label: "Monoclonal antibodies", examples: "trastuzumab (HER2), rituximab (CD20), bevacizumab (VEGF)" },
          { label: "Immune checkpoint inhibitors", examples: "pembrolizumab, nivolumab (PD-1), ipilimumab (CTLA-4)" },
        ],
      },
    ],
  },

  {
    topicId: "toxicology",
    sections: [
      {
        id: "tx-chelators",
        title: "Chelating agents (heavy metal antidotes)",
        tree: [
          { label: "Dimercaprol (BAL)", examples: "arsenic, mercury, lead (with EDTA)" },
          { label: "EDTA (calcium disodium edetate)", examples: "lead" },
          { label: "D-penicillamine", examples: "copper (Wilson disease), lead" },
          { label: "Deferoxamine / deferasirox", examples: "iron overload" },
          { label: "Succimer (DMSA)", examples: "lead, mercury, arsenic (oral option)" },
        ],
      },
      {
        id: "tx-antidote-pairs",
        title: "Common poison-antidote pairs",
        tree: [
          { label: "Paracetamol", examples: "N-acetylcysteine" },
          { label: "Opioids", examples: "naloxone" },
          { label: "Benzodiazepines", examples: "flumazenil" },
          { label: "Methanol / ethylene glycol", examples: "fomepizole, ethanol" },
          { label: "Digoxin", examples: "digoxin-specific antibody (Fab)" },
          { label: "Heparin", examples: "protamine sulfate" },
          { label: "Warfarin", examples: "vitamin K, fresh frozen plasma" },
          { label: "Organophosphates", examples: "atropine + pralidoxime" },
        ],
      },
    ],
  },
];
