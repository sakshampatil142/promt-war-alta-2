# LifeBridge: Gemini Universal Emergency & Intent Dispatch

> **Built for PromptWars x Alta School of Technology Hackathon**  
> **Track:** Societal Benefit — *Universal Bridge Between Human Intent and Complex Systems*

[![Gemini 2.5 Flash](https://img.shields.io/badge/Gemini-2.5%20Flash-rose?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎯 The Challenge & Problem Statement

In life-or-death situations, human beings do not communicate in clean JSON or database queries. They scream into phones with panicking voices, upload illegible handwritten doctor prescriptions, share contradictory viral flood rumors, or stare helplessly at 20-page legal insurance denial letters.

**LifeBridge** solves this societal crisis by acting as a **universal multimodal bridge**:
It ingests messy, chaotic, unstructured real-world inputs (**panicked audio, blurry handwritten notes, disaster news alerts, medical records**) and converts them in **sub-second latency** into structured, cross-verified, life-saving actions.

---

## 🏗️ 3-Stage Pipeline Architecture

```
                                  [ Chaotic Real-World Input ]
                      (Voice Dispatch, Handwritten Notes, Flood Rumors, Claims)
                                                │
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ 🧠 STAGE 1: UNDERSTAND (Deconstruct Human Intent)                                      │
│ • Natural Language Intent Synthesis                                                    │
│ • Urgency Triage Classification (CRITICAL / URGENT / IMPORTANT / ROUTINE)               │
│ • Multimodal Entity Extraction (Medications, Symptoms, Locations, Deadlines, Patients) │
└───────────────────────────────────────────────┬─────────────────────────────────────────┘
                                                │
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ STAGE 2: VERIFY (Cross-Check & Anti-Hallucination Grounding)                         │
│ • Clinical Pharmacological Interaction Checks (e.g. Warfarin + Cipro bleeding hazard)   │
│ • Civic & Meteorological Fact-Checking (Debunking viral dam collapse hoaxes)            │
│ • Claim Consistency Tagging (VERIFIED / UNVERIFIED / CONTRADICTED)                      │
│ • Overall Reliability & Confidence Score (0 - 100%)                                     │
└───────────────────────────────────────────────┬─────────────────────────────────────────┘
                                                │
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ ⚡ STAGE 3: ACT (Life-Saving Execution Protocol)                                         │
│ • Prioritized "Do This Now" Action Plan (DO_NOW, WITHIN_HOUR, TODAY)                    │
│ • 1-Click Dispatch Read-Aloud Script (with Web Speech Audio Voice Playback)            │
│ • Localized Emergency Quick-Dials (112, 108, 911, Poison Control, Disaster Cells)       │
│ • ICU-Ready Clinical Handover Sheet (Print-optimized, Markdown, & JSON export)         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 4 Preloaded High-Impact Demo Scenarios

LifeBridge comes preloaded with four realistic, end-to-end scenarios testable in 1 click:

1. **🩺 Messy Medical History & Polypharmacy**
   - *Input:* Collapsed elderly patient with handwritten prescription notes (Warfarin + Ciprofloxacin).
   - *Gemini Action:* Detects lethal CYP2C9 drug interaction causing severe internal hemorrhage risk, assigns `CRITICAL TRIAGE`, orders immediate INR/reversal agents, and drafts paramedic handover sheet.

2. **🌊 Disaster Alert & Flood Misinformation**
   - *Input:* WhatsApp viral panic rumor claiming a major dam has collapsed vs. official meteorological bulletin.
   - *Gemini Action:* Flags dam collapse claim as `CONTRADICTED` to prevent fatal stampedes, verifies 28,000 cusec controlled release, routes evacuation away from inundated bridges, and dispatches boat rescue.

3. **🚨 Frantic Voice Call: Sudden Cardiac Arrest**
   - *Input:* Panicked audio transcript of family member describing gasping "snoring sounds" and cyanotic lips.
   - *Gemini Action:* Identifies agonal breathing as Out-of-Hospital Cardiac Arrest, delivers immediate 100–120 bpm CPR guidance, instructs bystander to unlock doors, and provides a verbatim 112/911 operator speech.

4. **📋 Insurance Denial & Emergency Relief Deadline**
   - *Input:* Threatening legal denial letter for $46,800 emergency cardiac stent citing missing "pre-authorization".
   - *Gemini Action:* Flags Emergency Medical Treatment (EMTALA & ACA 2719A) statutory violations, starts a countdown to the Nov 2nd appeal deadline, and generates a physician peer-to-peer appeal packet.

---

## 🛠️ Tech Stack & Key Features

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **AI Engine:** Google Gemini 2.5 Flash with strict JSON Schema output (`responseSchema`) and multimodal vision/audio comprehension.
- **Audio & Voice:** Browser `MediaRecorder` API with live Web Audio API frequency visualizer, browser speech-to-text, and Web Speech API Text-to-Speech read-aloud player.
- **Export & Handover:** Print-optimized CSS (`@media print`) clinical sheet, Markdown copy to clipboard, and JSON download.
- **Zero-Friction Offline Fallback:** Works seamlessly with or without a `GEMINI_API_KEY`. An in-browser modal lets evaluators supply a live Google AI Studio key on the fly.

---

## 🚦 Getting Started Locally

### 1. Clone & Install
```bash
git clone <repo-url>
cd "promt war alta 2"
npm install
```

### 2. Configure Environment (Optional)
Create `.env.local` if you wish to use a live Gemini API key:
```env
GEMINI_API_KEY="your-google-ai-studio-key"
```
*(Note: If no key is provided, LifeBridge automatically uses its comprehensive, pre-verified simulation engine.)*

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`) in your browser to experience LifeBridge!

---

## 🏆 Societal Benefit Impact Summary

| Problem | Traditional System | LifeBridge with Gemini |
|---|---|---|
| **Emergency Calls** | 2–5 minutes spent calming panicking callers | **Sub-second structured 112 script with read-aloud voice** |
| **Medical Errors** | Drug interactions overlooked in messy paper charts | **Instant pharmacological interaction check & red flag warnings** |
| **Disasters** | Misinformation causes lethal stampedes & false escapes | **Automated claim verification against official civil telemetry** |
| **Bureaucracy** | Vulnerable patients saddled with illegal medical bills | **Statutory violation identification and automated appeal packet** |

---

*LifeBridge — Universal Bridge Between Human Intent and Complex Systems.*
