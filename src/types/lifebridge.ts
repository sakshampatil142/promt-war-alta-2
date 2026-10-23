export type TriageSeverity = "CRITICAL" | "URGENT" | "IMPORTANT" | "ROUTINE";

export type EntityCategory =
  | "PERSON"
  | "MEDICATION"
  | "SYMPTOM"
  | "LOCATION"
  | "ORGANIZATION"
  | "CONDITION"
  | "DEADLINE"
  | "OTHER";

export interface ExtractedEntity {
  name: string;
  category: EntityCategory;
  details: string;
}

export interface FactClaim {
  claim: string;
  status: "VERIFIED" | "UNVERIFIED" | "CONTRADICTED";
  confidence: number; // 0-100
  sourceOrReason: string;
}

export interface ActionStep {
  order: number;
  action: string;
  detail: string;
  urgencyLevel: "DO_NOW" | "WITHIN_HOUR" | "TODAY" | "NEXT_DAYS";
}

export interface EmergencyContact {
  serviceName: string;
  number: string;
  recommendedAction: string;
}

export interface TimelineEntry {
  timeOrPeriod: string;
  event: string;
}

export interface ProfessionalHandover {
  headline: string;
  subject: string;
  timeline: TimelineEntry[];
  allergies: string[];
  medications: string[];
  conditions: string[];
  redFlags: string[];
  clinicalOrOfficialNotes?: string;
}

export interface MissingInfoQuestion {
  question: string;
  impactOnAction: string;
}

export interface LifeBridgeOutput {
  severity: TriageSeverity;
  severityReason: string;
  detectedLanguage: string;
  locationIdentified: string;
  understandPhase: {
    coreIntent: string;
    rawInputSummary: string;
    extractedEntities: ExtractedEntity[];
    keyFacts: string[];
  };
  verifyPhase: {
    overallConfidence: number; // 0-100
    groundingAssessment: string;
    claims: FactClaim[];
    contradictions?: string[];
  };
  actionPlan: {
    immediateSteps: ActionStep[];
    operatorScript: string;
  };
  emergencyContacts: EmergencyContact[];
  professionalHandover: ProfessionalHandover;
  missingInfoQuestions: MissingInfoQuestion[];
  safetyDisclaimer: string;
  meta?: {
    latencyMs: number;
    modelUsed: string;
    isMockFallback: boolean;
    timestamp: string;
    groundingSourceCount?: number;
  };
}

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
