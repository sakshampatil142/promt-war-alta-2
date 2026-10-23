/**
 * LifeBridge Type Definitions & Data Contracts
 * Defines strict TypeScript interfaces for multimodal triage, entity extraction,
 * verification grounding, and professional handover generation.
 */

/**
 * Triage urgency classification level following Emergency Severity Index (ESI) standards.
 */
export type TriageSeverity = "CRITICAL" | "URGENT" | "IMPORTANT" | "ROUTINE";

/**
 * Standardized semantic entity categories extracted from unstructured human text/speech.
 */
export type EntityCategory =
  | "PERSON"
  | "MEDICATION"
  | "SYMPTOM"
  | "LOCATION"
  | "ORGANIZATION"
  | "CONDITION"
  | "DEADLINE"
  | "OTHER";

/**
 * Structured entity extracted during Stage 1 (Understand).
 */
export interface ExtractedEntity {
  /** The identified entity name (e.g. "Warfarin 5mg") */
  name: string;
  /** The assigned semantic category */
  category: EntityCategory;
  /** Clinical or contextual details regarding the entity */
  details: string;
}

/**
 * Fact-checking verification claim checked in Stage 2 (Verify).
 */
export interface FactClaim {
  /** The statement or assumption evaluated */
  claim: string;
  /** Grounded verification status */
  status: "VERIFIED" | "UNVERIFIED" | "CONTRADICTED";
  /** Confidence score ranging from 0 to 100 */
  confidence: number;
  /** Clinical guideline citation or grounding reasoning */
  sourceOrReason: string;
}

/**
 * Prioritized directive generated in Stage 3 (Act).
 */
export interface ActionStep {
  /** Sequential execution order (1, 2, 3...) */
  order: number;
  /** Core directive title */
  action: string;
  /** In-depth instruction details */
  detail: string;
  /** Time-sensitivity urgency level */
  urgencyLevel: "DO_NOW" | "WITHIN_HOUR" | "TODAY" | "NEXT_DAYS";
}

/**
 * Emergency contact service entry tailored to jurisdiction.
 */
export interface EmergencyContact {
  /** Name of the response organization (e.g. "Ambulance ALS") */
  serviceName: string;
  /** Telephone dispatch number */
  number: string;
  /** Guidance on what to request when connected */
  recommendedAction: string;
}

/**
 * Chronological event entry in an incident timeline.
 */
export interface TimelineEntry {
  /** Timestamp or relative period */
  timeOrPeriod: string;
  /** Description of the occurrence */
  event: string;
}

/**
 * Comprehensive clinical or civil defense handover report.
 */
export interface ProfessionalHandover {
  /** Formatted headline for medical dispatchers */
  headline: string;
  /** Primary subject or patient profile */
  subject: string;
  /** Chronological event progression */
  timeline: TimelineEntry[];
  /** Documented drug or environmental allergies */
  allergies: string[];
  /** Active pharmaceutical regimens */
  medications: string[];
  /** Diagnosed baseline conditions */
  conditions: string[];
  /** Red-flag contraindications and acute threats */
  redFlags: string[];
  /** Attending physician or coordinator directives */
  clinicalOrOfficialNotes?: string;
}

/**
 * Clarifying inquiry to resolve diagnostic ambiguities.
 */
export interface MissingInfoQuestion {
  /** The clarifying question */
  question: string;
  /** How the answer impacts triage directives */
  impactOnAction: string;
}

/**
 * Master output object produced by the Gemini Universal Bridge engine.
 */
export interface LifeBridgeOutput {
  /** Triage severity verdict */
  severity: TriageSeverity;
  /** Concise justification for the severity rating */
  severityReason: string;
  /** ISO language code detected in input */
  detectedLanguage: string;
  /** Geographic location identified or inferred */
  locationIdentified: string;
  /** Stage 1: Deconstructed intent and extracted entities */
  understandPhase: {
    coreIntent: string;
    rawInputSummary: string;
    extractedEntities: ExtractedEntity[];
    keyFacts: string[];
  };
  /** Stage 2: Cross-verification, contradiction detection, and grounding */
  verifyPhase: {
    overallConfidence: number; // 0-100
    groundingAssessment: string;
    claims: FactClaim[];
    contradictions?: string[];
  };
  /** Stage 3: Directives, operator read-aloud script, and contacts */
  actionPlan: {
    immediateSteps: ActionStep[];
    operatorScript: string;
  };
  /** Localized emergency dispatch contacts */
  emergencyContacts: EmergencyContact[];
  /** Official clinical handover report */
  professionalHandover: ProfessionalHandover;
  /** Targeted follow-up inquiries */
  missingInfoQuestions: MissingInfoQuestion[];
  /** Legal and clinical safety disclaimer */
  safetyDisclaimer: string;
  /** Execution diagnostics and telemetry */
  meta?: {
    latencyMs: number;
    modelUsed: string;
    isMockFallback: boolean;
    timestamp: string;
    groundingSourceCount?: number;
  };
}

/**
 * Preloaded test scenario definition for evaluations.
 */
export interface DemoScenario {
  id: string;
  title: string;
  category: "Medical" | "Disaster" | "Emergency" | "Bureaucracy";
  badge: string;
  iconName: string;
  description: string;
  sampleText: string;
  imagePreviewUrl?: string;
  mockResult: LifeBridgeOutput;
}
