import { DemoScenario } from "../types/lifebridge";

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "medical-history",
    title: "Messy Medical History & Polypharmacy",
    category: "Medical",
    badge: "Clinical Triage",
    iconName: "Stethoscope",
    description:
      "Stack of handwritten notes, prescription photos, and conflicting symptoms converted into an ICU-ready handover with lethal drug interaction warnings.",
    sampleText:
      "Patient 68M found disoriented on kitchen floor. Daughter reports history of T2D, atrial fib on Warfarin 5mg daily. Recently prescribed Cipro 500mg BD for UTI 3 days ago by walk-in clinic. BP 88/54, pulse 118 irregular. Daughter found spilled pills, unknown if extra dose taken. Visible subcutaneous hematomas on forearms. No fever, pupils reactive.",
    imagePreviewUrl: "/samples/medical_notes_demo_1792732840937.jpg",
    mockResult: {
      severity: "CRITICAL",
      severityReason:
        "Severe hypotension (88/54) with altered mental status and dangerous drug interaction: Ciprofloxacin inhibits Warfarin metabolism, causing acute coagulopathy risk.",
      detectedLanguage: "en",
      locationIdentified: "Unknown / Residence (Immediate dispatch required)",
      understandPhase: {
        coreIntent:
          "Emergency geriatric medical stabilization for collapse with acute hypotension, active anticoagulation, and high-risk antibiotic drug interaction.",
        rawInputSummary:
          "68-year-old male with Atrial Fibrillation and Type 2 Diabetes found collapsed and disoriented. Hypotensive (88/54) and tachycardic (118 bpm). Co-prescribed Warfarin and Ciprofloxacin with forearm hematomas.",
        extractedEntities: [
          { name: "68M Patient", category: "PERSON", details: "Elderly male, collapsed, disoriented, hypotensive" },
          { name: "Warfarin 5mg", category: "MEDICATION", details: "Oral anticoagulant for Atrial Fibrillation; high bleed risk" },
          { name: "Ciprofloxacin 500mg", category: "MEDICATION", details: "Fluoroquinolone antibiotic for UTI, potent CYP1A2/CYP2C9 inhibitor" },
          { name: "Atrial Fibrillation", category: "CONDITION", details: "Cardiac arrhythmia, presenting with irregular pulse 118" },
          { name: "Blood Pressure 88/54", category: "SYMPTOM", details: "Severe systemic hypotension / impending shock" },
          { name: "Forearm Hematomas", category: "SYMPTOM", details: "Subcutaneous bleeding; sign of supratherapeutic INR" },
        ],
        keyFacts: [
          "Patient has altered mental status with profound hypotension.",
          "Ciprofloxacin + Warfarin interaction dramatically elevates INR, multiplying internal hemorrhage hazard.",
          "Potential accidental overdose indicated by spilled pill bottles.",
          "Tachycardia with irregular pulse indicates decompensated cardiac output.",
        ],
      },
      verifyPhase: {
        overallConfidence: 96,
        groundingAssessment:
          "Cross-checked pharmacovigilance databases and emergency clinical guidelines: Cipro-Warfarin interaction is a verified FDA Black Box category interaction causing spontaneous hemorrhage.",
        claims: [
          {
            claim: "Ciprofloxacin strongly potentiates Warfarin anticoagulant activity.",
            status: "VERIFIED",
            confidence: 99,
            sourceOrReason: "Verified clinical pharmacokinetics: CYP2C9 inhibition impairs S-warfarin clearance.",
          },
          {
            claim: "Patient has suffered acute stroke or sepsis.",
            status: "UNVERIFIED",
            confidence: 45,
            sourceOrReason: "No fever noted; hypovolemic/hemorrhagic shock or cardiac syncope is more probable.",
          },
          {
            claim: "BP 88/54 is within acceptable elderly baseline.",
            status: "CONTRADICTED",
            confidence: 98,
            sourceOrReason: "Mean Arterial Pressure (MAP) is 65 mmHg, representing hypoperfusion shock threshold.",
          },
        ],
        contradictions: [
          "Prescribing Ciprofloxacin concurrently with Warfarin without INR monitoring contradicts standard safety protocols.",
        ],
      },
      actionPlan: {
        immediateSteps: [
          {
            order: 1,
            action: "Dial 112 / 911 for Urgent Paramedic Response",
            detail: "Request Advanced Life Support (ALS) for elderly male in decompensated shock with active anticoagulant bleed risk.",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 2,
            action: "Place in Supine Position with Legs Elevated",
            detail: "Keep patient flat on back and elevate legs 12 inches to promote venous return; do not offer water or food.",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 3,
            action: "Bag All Medication Bottles for Ambulance Crew",
            detail: "Collect Warfarin and Ciprofloxacin bottles including spilled pills to calculate exact overdose timing.",
            urgencyLevel: "WITHIN_HOUR",
          },
          {
            order: 4,
            action: "Alert Hospital to Prepare Anticoagulant Reversal",
            detail: "Emergency Department must prepare Vitamin K, 4-Factor Prothrombin Complex Concentrate (PCC), and stat INR/CBC.",
            urgencyLevel: "WITHIN_HOUR",
          },
        ],
        operatorScript:
          "Emergency! My 68-year-old father has collapsed and is disoriented. His blood pressure is 88 over 54 and pulse 118 irregular. He takes Warfarin for Atrial Fibrillation and was started on Ciprofloxacin 3 days ago. He has severe bruising and suspected internal bleeding or overdose. We need an Advanced Life Support ambulance immediately.",
      },
      emergencyContacts: [
        { serviceName: "Emergency Ambulance (ALS)", number: "112 / 108", recommendedAction: "Call immediately; notify of anticoagulant shock" },
        { serviceName: "National Poison Control Center", number: "1800-116-117", recommendedAction: "Consult regarding potential acute Warfarin toxicity" },
        { serviceName: "Nearest Trauma & Cardiac Center", number: "Local ER Direct", recommendedAction: "Request urgent bed with INR reversal capability" },
      ],
      professionalHandover: {
        headline: "CRITICAL CLINICAL HANDOVER: 68M SYNCOPE & COAGULOPATHY SHOCK",
        subject: "68yo Male, Atrial Fibrillation, High-Risk Warfarin-Ciprofloxacin Interaction",
        timeline: [
          { timeOrPeriod: "3 Days Prior", event: "Walk-in clinic initiated Ciprofloxacin 500mg BID for urinary tract infection." },
          { timeOrPeriod: "Morning (T-2h)", event: "Spilled medication containers observed by family member." },
          { timeOrPeriod: "Arrival (T-0)", event: "Patient found disoriented on kitchen floor. BP 88/54, HR 118 irregular, forearm hematomas." },
        ],
        allergies: ["No known drug allergies recorded"],
        medications: ["Warfarin 5mg daily (Oral)", "Ciprofloxacin 500mg BID (Oral)", "Metformin (T2DM baseline)"],
        conditions: ["Atrial Fibrillation", "Type 2 Diabetes Mellitus", "Recent UTI"],
        redFlags: [
          "MAP 65 mmHg - Decompensated hypoperfusion shock",
          "High mortality drug interaction: Fluoroquinolone + Coumarin derivative",
          "Subcutaneous bruising suggests active hemorrhagic diathesis",
          "Potential pill overdose / accidental ingestion",
        ],
        clinicalOrOfficialNotes:
          "Priority orders: Stat Stat Venous Access x2 18G, Stat STAT INR, PT/PTT, Type & Screen, Trop-I, Point of Care Glucose, and consideration of 4F-PCC (Kcentra) + IV Vitamin K 10mg.",
      },
      missingInfoQuestions: [
        { question: "Did the patient hit his head during the fall?", impactOnAction: "If yes, immediate non-contrast head CT is required to rule out intracranial hemorrhage." },
        { question: "When was his last meal or water intake?", impactOnAction: "Determines aspiration risk during airway management." },
      ],
      safetyDisclaimer:
        "Emergency advisory only. Does not replace professional in-person medical diagnosis. Call emergency services immediately.",
      meta: {
        latencyMs: 820,
        modelUsed: "gemini-2.5-flash",
        isMockFallback: false,
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: "flood-disaster",
    title: "Disaster Alert & Flood Misinformation",
    category: "Disaster",
    badge: "Civil Defense",
    iconName: "ShieldAlert",
    description:
      "Contradictory social media panic rumors, official meteorological data, and river telemetry converted into verified evacuation corridors.",
    sampleText:
      "WhatsApp viral forward claims Khadakwasla Dam gates have failed and water will submerge Deccan Gymkhana by 2 PM! But IMD bulletin reports 140mm rainfall in catchment with controlled release of 28,000 cusecs. Shivaji Bridge has 2.5 feet waterlogging and traffic police reported a tree fall. 5 families trapped in ground floor near Riverside Road with rising water. Power supply cutoff in sector 4.",
    imagePreviewUrl: "/samples/flood_alert_demo_1792732861838.jpg",
    mockResult: {
      severity: "URGENT",
      severityReason:
        "Active localized inundation of residential ground floors and road blockages; viral rumor of catastrophic dam failure debunked to prevent deadly stampede.",
      detectedLanguage: "en",
      locationIdentified: "Pune, Maharashtra (Deccan / Riverside Road Corridor)",
      understandPhase: {
        coreIntent:
          "Civil defense rescue coordination, safe evacuation route guidance, and urgent debunking of viral panic rumors regarding dam failure.",
        rawInputSummary:
          "Conflicting reports during extreme rainfall: Viral claim of dam breach contrasted with official 28k cusec discharge. Ground floor homes inundated on Riverside Road; Shivaji Bridge impassable.",
        extractedEntities: [
          { name: "Khadakwasla Dam", category: "LOCATION", details: "Controlled water discharge ongoing at 28,000 cusecs; structure intact" },
          { name: "Riverside Road", category: "LOCATION", details: "Severe water level rise, 5 families stranded in ground floor" },
          { name: "Shivaji Bridge", category: "LOCATION", details: "Impassable due to 2.5ft floodwaters and fallen tree obstruction" },
          { name: "Sector 4", category: "LOCATION", details: "Electrical grid de-energized for public safety" },
          { name: "Deccan Gymkhana", category: "LOCATION", details: "Low-lying zone vulnerable to backwater inundation" },
        ],
        keyFacts: [
          "Viral rumor of dam gate failure is FALSE and creating hazardous panic.",
          "Controlled discharge is 28,000 cusecs, not an uncontrolled flood breach.",
          "Shivaji Bridge is completely blocked; alternate higher elevation transit required.",
          "5 residential families require vertical evacuation immediately.",
        ],
      },
      verifyPhase: {
        overallConfidence: 94,
        groundingAssessment:
          "Cross-referenced with Irrigation Department telemetry and Municipal Disaster Management updates: Dam structural integrity is 100% verified intact. Localized waterlogging verified.",
        claims: [
          {
            claim: "Khadakwasla Dam has suffered structural failure or breach.",
            status: "CONTRADICTED",
            confidence: 99,
            sourceOrReason: "Irrigation Dept & District Collector verified dam gates functioning normally under controlled discharge.",
          },
          {
            claim: "Controlled release of 28,000 cusecs underway.",
            status: "VERIFIED",
            confidence: 95,
            sourceOrReason: "Official hydrological release bulletin confirmed at 11:30 AM.",
          },
          {
            claim: "Shivaji Bridge is impassable for vehicular traffic.",
            status: "VERIFIED",
            confidence: 92,
            sourceOrReason: "Traffic control cameras and field reports show 2.5ft inundation and fallen tree.",
          },
        ],
        contradictions: [
          "Viral social media claim contradicts official civic telemetry by claiming a dam breach.",
        ],
      },
      actionPlan: {
        immediateSteps: [
          {
            order: 1,
            action: "Execute Vertical Evacuation to 2nd Floor or Terrace",
            detail: "Instruct the 5 ground-floor families to move immediately to higher floors with drinking water and phone powerbanks.",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 2,
            action: "Do NOT Attempt to Cross Shivaji Bridge or Riverbank Road",
            detail: "Barricade access; reroute all traffic via higher arterial roads (Senapati Bapat Road / Law College Hill corridor).",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 3,
            action: "Dispatch NDRF Inflatable Dinghy Team to Riverside Road",
            detail: "Coordinate with Fire & Disaster Control Room for boat extraction of elderly/children before dusk.",
            urgencyLevel: "WITHIN_HOUR",
          },
          {
            order: 4,
            action: "Broadcast Public Anti-Rumor Advisory via PA System",
            detail: "Announce: 'Khadakwasla Dam is safe and intact. Do not panic. Avoid riverbanks and stay on upper floors.'",
            urgencyLevel: "WITHIN_HOUR",
          },
        ],
        operatorScript:
          "Disaster Control Room, this is an urgent report from Riverside Road near Deccan Gymkhana. 5 families are stranded on ground floors due to backwater flooding. Khadakwasla dam is intact at 28,000 cusecs, but Shivaji Bridge is blocked by tree fall and water. Please dispatch boat rescue and clear traffic away from the riverbank.",
      },
      emergencyContacts: [
        { serviceName: "Disaster Management Cell", number: "1077 / 020-25501269", recommendedAction: "Dispatch swift-water rescue team" },
        { serviceName: "Fire & Rescue Department", number: "101", recommendedAction: "Deploy inflatable boat and tree clearing unit" },
        { serviceName: "MSEDCL Electricity Emergency", number: "1912", recommendedAction: "Confirm localized feeder shutdown to prevent electrocution" },
      ],
      professionalHandover: {
        headline: "CIVIL DEFENSE SITUATION REPORT: RIVERBANK INUNDATION & MISINFORMATION CONTAINMENT",
        subject: "Monsoon Surge Event - Deccan/Riverside Sector",
        timeline: [
          { timeOrPeriod: "09:00 AM", event: "Catchment received 140mm intense downpour." },
          { timeOrPeriod: "11:00 AM", event: "Irrigation department scaled discharge to 28,000 cusecs." },
          { timeOrPeriod: "11:45 AM", event: "Viral rumor of dam breach caused traffic gridlock." },
          { timeOrPeriod: "12:15 PM", event: "Shivaji bridge closed due to tree fall & water level; 5 families trapped." },
        ],
        allergies: [],
        medications: [],
        conditions: ["Urban flash flooding", "Power grid outage", "Bridge disruption"],
        redFlags: [
          "Rising river backflow threatening ground floor occupants",
          "Risk of stampede due to unverified social media dam collapse claims",
          "Submerged electrical junction boxes hazard",
        ],
        clinicalOrOfficialNotes:
          "Shelter camp activated at nearby Municipal School #14 on elevated ground. Medical team deployed with oral rehydration, tetanus shots, and first aid.",
      },
      missingInfoQuestions: [
        { question: "Are there any bedridden patients or infants among the stranded families?", impactOnAction: "Prioritizes immediate boat extraction." },
        { question: "Is the municipal potable water supply contaminated in this sector?", impactOnAction: "Triggers emergency water tanker dispatch." },
      ],
      safetyDisclaimer:
        "Advisory based on current civil feeds. Follow official instructions from local municipal authorities and NDRF.",
      meta: {
        latencyMs: 760,
        modelUsed: "gemini-2.5-flash",
        isMockFallback: false,
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: "cardiac-emergency",
    title: "Frantic Voice Call: Sudden Cardiac Collapse",
    category: "Emergency",
    badge: "911 / 112 Dispatch",
    iconName: "HeartPulse",
    description:
      "Panicked audio stream with gasping agonal respirations translated into instant bystander CPR guide and verbatim operator call transcript.",
    sampleText:
      "[PANICKED AUDIO TRANSCRIPT]: Dad just made a weird groan and fell backwards off the sofa! He is on the carpet, his eyes are rolled back and he is making terrible snoring, gasping sounds every 10 seconds. He won't wake up when I shake him! His lips look bluish grey. We are at 42 Greenfield Avenue, 2nd floor, Apartment 204. My mother is hyperventilating. Please tell me what to do right now!!",
    mockResult: {
      severity: "CRITICAL",
      severityReason:
        "Sudden loss of consciousness with agonal breathing (gasping/snoring sounds) and cyanosis represents Out-of-Hospital Cardiac Arrest (OHCA). Immediate CPR required.",
      detectedLanguage: "en",
      locationIdentified: "42 Greenfield Avenue, Apt 204, 2nd Floor",
      understandPhase: {
        coreIntent:
          "Immediate life support dispatch and bystander CPR coaching for acute adult cardiac arrest.",
        rawInputSummary:
          "Unresponsive adult male collapsed from couch. Agonal 'snoring/gasping' breathing with peripheral cyanosis (blue lips). Bystanders present at residential apartment.",
        extractedEntities: [
          { name: "Father (Adult Male)", category: "PERSON", details: "Unresponsive, agonal respirations, cyanotic lips" },
          { name: "42 Greenfield Ave, Apt 204", category: "LOCATION", details: "Second floor apartment, exact address identified" },
          { name: "Agonal Breathing", category: "SYMPTOM", details: "Reflex gasping; sign of cardiac arrest, NOT effective breathing" },
          { name: "Mother", category: "PERSON", details: "Distressed bystander requiring calm, direct delegation" },
        ],
        keyFacts: [
          "Patient is in cardiac arrest. Agonal breathing is a critical sign to start CPR immediately.",
          "Every minute without CPR reduces survival by 7-10%.",
          "Address is confirmed on second floor; door must be unlocked for EMS.",
        ],
      },
      verifyPhase: {
        overallConfidence: 98,
        groundingAssessment:
          "AHA / ERC 2025 Guidelines for Cardiopulmonary Resuscitation: Snoring/gasping sounds in an unresponsive individual must be treated as cardiac arrest, not normal breathing.",
        claims: [
          {
            claim: "Patient is breathing normally because he is making sounds.",
            status: "CONTRADICTED",
            confidence: 99,
            sourceOrReason: "Snoring/gasping sounds are agonal respirations indicating brainstem hypoxia, not viable respiration.",
          },
          {
            claim: "Immediate chest compressions are required before EMS arrival.",
            status: "VERIFIED",
            confidence: 100,
            sourceOrReason: "Hands-only CPR doubles or triples victim survival chance.",
          },
        ],
        contradictions: [
          "Misinterpreting agonal breathing as sleep or seizure delay life-saving compressions.",
        ],
      },
      actionPlan: {
        immediateSteps: [
          {
            order: 1,
            action: "Call 112 / 911 on Speakerphone Immediately",
            detail: "Keep phone on speaker beside you so dispatcher can hear and coach you while hands remain free.",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 2,
            action: "Begin Hands-Only Chest Compressions NOW",
            detail: "Place heel of hand in exact center of chest. Interlock other hand. Push down 2 inches hard and fast at 100-120 beats/min (to the beat of 'Stayin Alive').",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 3,
            action: "Instruct Mother to Unlock Apartment Door",
            detail: "Tell mother firmly: 'Mom, go unlock the front apartment door right now and come back so paramedics can enter directly.'",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 4,
            action: "Check for Automated External Defibrillator (AED)",
            detail: "If building or adjacent lobby has an AED, send someone to fetch it immediately without stopping compressions.",
            urgencyLevel: "WITHIN_HOUR",
          },
        ],
        operatorScript:
          "My father has collapsed and is in cardiac arrest. He is unresponsive and has agonal breathing with blue lips. We are at 42 Greenfield Avenue, Apartment 204 on the second floor. I am starting chest compressions right now. Please dispatch an Advanced Life Support ambulance and AED immediately!",
      },
      emergencyContacts: [
        { serviceName: "Emergency Medical Services", number: "112 / 911", recommendedAction: "Dial immediately on speakerphone; state 'cardiac arrest in progress'" },
        { serviceName: "Building Security / Concierge", number: "Intercom #0", recommendedAction: "Instruct to hold elevator and retrieve building AED" },
      ],
      professionalHandover: {
        headline: "OUT-OF-HOSPITAL CARDIAC ARREST (OHCA) - ACTIVE RESUSCITATION",
        subject: "Adult Male, Witnessed Collapse, Sudden Cardiac Arrest",
        timeline: [
          { timeOrPeriod: "T-0 min", event: "Witnessed collapse from sitting position on sofa." },
          { timeOrPeriod: "T+1 min", event: "Onset of agonal gasping and cyanosis identified." },
          { timeOrPeriod: "T+2 min", event: "Bystander CPR initiated with phone dispatch on speaker." },
        ],
        allergies: ["Unknown"],
        medications: ["Unknown"],
        conditions: ["Suspected Acute Myocardial Infarction / Ventricular Fibrillation"],
        redFlags: [
          "Zero spontaneous pulse",
          "Agonal gasping",
          "Time elapsed without defibrillation: Critical window",
        ],
        clinicalOrOfficialNotes:
          "ALS team en route. Defibrillator pads to be applied immediately upon entry. High-performance CPR with minimal pauses recommended.",
      },
      missingInfoQuestions: [
        { question: "Did the patient have any prior cardiac history or pacemaker?", impactOnAction: "Informs defibrillator pad placement and cardiology team." },
      ],
      safetyDisclaimer:
        "Emergency instructions. Continue chest compressions continuously until paramedics physically take over.",
      meta: {
        latencyMs: 640,
        modelUsed: "gemini-2.5-flash",
        isMockFallback: false,
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: "insurance-bureaucracy",
    title: "Insurance Denial & Relief Form Deadlock",
    category: "Bureaucracy",
    badge: "Patient Rights",
    iconName: "FileText",
    description:
      "Dense, threatening legal denial letter deconstructed into strict countdown deadlines, missing proof checklists, and a 1-click appeal handover.",
    sampleText:
      "Notice of Adverse Benefit Determination: Claim #NY-88219-H for inpatient emergency cardiac catheterization & drug-eluting stent. Status: DENIED. Reason Code 42-NC: 'Lack of pre-authorization documentation submitted within 72 hours of admission pursuant to Section 4.2 of Policy'. Total disputed amount: $46,800.00. The insured has until Nov 2nd, 2026, 5:00 PM EST to submit an expedited Level-1 Appeal with attending physician clinical peer-to-peer certification, or claim will be permanently marked patient responsibility.",
    imagePreviewUrl: "/samples/insurance_form_demo_1792732881463.jpg",
    mockResult: {
      severity: "IMPORTANT",
      severityReason:
        "Financial and legal urgency: $46,800 wrongful denial on emergency procedure with strict 10-day appeal deadline requiring physician peer-to-peer certification.",
      detectedLanguage: "en",
      locationIdentified: "New York, USA",
      understandPhase: {
        coreIntent:
          "Overturn illegal emergency care insurance denial under Federal No Surprises Act & Emergency Care regulations.",
        rawInputSummary:
          "Insurer denied $46,800 claim for emergency cardiac stent citing missing 'pre-authorization', which is legally prohibited for acute emergency admissions.",
        extractedEntities: [
          { name: "Claim #NY-88219-H", category: "OTHER", details: "Disputed insurance file reference number" },
          { name: "$46,800.00", category: "OTHER", details: "Total balance billed directly to the patient" },
          { name: "Cardiac Catheterization & Stent", category: "CONDITION", details: "Emergency life-saving procedure performed in hospital" },
          { name: "Nov 2nd, 2026, 5:00 PM EST", category: "DEADLINE", details: "Strict cutoff for Level-1 Expedited Appeal filing" },
          { name: "Section 4.2 Pre-auth Clause", category: "OTHER", details: "Insurer clause overridden by federal emergency care statutes" },
        ],
        keyFacts: [
          "Emergency cardiac catheterization cannot be denied for lack of prior authorization under Federal law (ACA & No Surprises Act).",
          "Insurer is attempting to pass $46,800 liability to patient via improper procedural code 42-NC.",
          "Strict deadline to file Expedited Level-1 Appeal is Nov 2nd, 2026 at 5:00 PM EST.",
        ],
      },
      verifyPhase: {
        overallConfidence: 95,
        groundingAssessment:
          "Verified against ACA Section 2719A and CMS Emergency Services Mandates: Emergency medical conditions do NOT require prior authorization regardless of in-network or out-of-network status.",
        claims: [
          {
            claim: "Insurer can lawfully deny emergency cardiac stent for lack of prior authorization.",
            status: "CONTRADICTED",
            confidence: 99,
            sourceOrReason: "Federal law strictly prohibits prior authorization requirements for emergency medical triage and stabilization.",
          },
          {
            claim: "Patient has until Nov 2nd 2026 to submit Level-1 appeal.",
            status: "VERIFIED",
            confidence: 96,
            sourceOrReason: "Confirmed from written adverse determination notice timetable.",
          },
        ],
        contradictions: [
          "The insurer's reason code 42-NC violates Emergency Medical Treatment & Labor Act (EMTALA) and Federal ACA protections.",
        ],
      },
      actionPlan: {
        immediateSteps: [
          {
            order: 1,
            action: "Contact Hospital Billing & Attending Cardiologist Office",
            detail: "Request the cardiologist's office coordinator immediately schedule an 'Expedited Peer-to-Peer Review' citing emergency stabilization under ACA 2719A.",
            urgencyLevel: "DO_NOW",
          },
          {
            order: 2,
            action: "Submit Written Notice of Expedited Level-1 Appeal",
            detail: "Deliver certified appeal letter with Claim #NY-88219-H explicitly invoking statutory emergency rights before the Nov 2nd deadline.",
            urgencyLevel: "WITHIN_HOUR",
          },
          {
            order: 3,
            action: "File Complaint with State Department of Financial Services",
            detail: "Notify the State Insurance Bureau of improper emergency pre-auth denial to compel external oversight.",
            urgencyLevel: "TODAY",
          },
        ],
        operatorScript:
          "Hello, I am calling regarding Claim NY-88219-H for emergency cardiac stent placement. This was an acute, life-threatening emergency procedure. Under Federal law and Section 2719A, emergency care is exempt from pre-authorization. I am requesting an immediate Expedited Peer-to-Peer review with our attending physician today.",
      },
      emergencyContacts: [
        { serviceName: "Hospital Patient Financial Advocate", number: "Hospital Billing Extension", recommendedAction: "Request hold on collection activity pending dispute" },
        { serviceName: "State Insurance Commissioner Hotline", number: "1-800-342-3736", recommendedAction: "File formal complaint for statutory violation" },
        { serviceName: "Patient Advocate Foundation", number: "1-800-532-5274", recommendedAction: "Free case manager assistance for medical debt appeals" },
      ],
      professionalHandover: {
        headline: "LEGAL & CLINICAL APPEAL PACKET: UNLAWFUL EMERGENCY PRE-AUTH DENIAL",
        subject: "Claim #NY-88219-H ($46,800.00) - Inpatient Emergency Stent",
        timeline: [
          { timeOrPeriod: "Admission Date", event: "Patient presented with acute coronary syndrome requiring emergent cardiac catheterization." },
          { timeOrPeriod: "Post-Discharge", event: "Insurer issued adverse determination letter under Code 42-NC." },
          { timeOrPeriod: "Nov 2, 2026", event: "Hard deadline for Level-1 Expedited Grievance submission." },
        ],
        allergies: [],
        medications: [],
        conditions: ["Acute Coronary Syndrome", "Cardiac Stent Placement"],
        redFlags: [
          "$46,800 wrongful bill sent to patient in recovery",
          "Imminent Nov 2nd deadline for administrative exhaustion",
          "Insurer violation of Federal No Surprises Act",
        ],
        clinicalOrOfficialNotes:
          "Include Hospital Admission Face Sheet, Cath Lab Operative Note, and Physician Certification of Emergency Condition with appeal filing.",
      },
      missingInfoQuestions: [
        { question: "Do you have the operative report from the cardiac catheterization lab?", impactOnAction: "Provides mandatory clinical proof of emergency necessity for the appeal packet." },
      ],
      safetyDisclaimer:
        "Legal information only. Consult an attorney or certified patient advocate for formal representation.",
      meta: {
        latencyMs: 710,
        modelUsed: "gemini-2.5-flash",
        isMockFallback: false,
        timestamp: new Date().toISOString(),
      },
    },
  },
];
