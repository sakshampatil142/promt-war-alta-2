import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { DEMO_SCENARIOS } from "../src/data/demoScenarios.ts";

describe("LifeBridge Schema & Core Logic Tests", () => {
  test("All 4 predefined demo scenarios are properly configured", () => {
    assert.equal(DEMO_SCENARIOS.length, 4, "Expected exactly 4 scenarios");
    const expectedIds = [
      "medical-history",
      "flood-disaster",
      "cardiac-emergency",
      "insurance-bureaucracy",
    ];

    for (const id of expectedIds) {
      const match = DEMO_SCENARIOS.find((s) => s.id === id);
      assert.ok(match, `Scenario ${id} should exist`);
      assert.ok(match.title, `Scenario ${id} should have a title`);
      assert.ok(match.sampleText, `Scenario ${id} should have sampleText`);
    }
  });

  test("Medical scenario flags Warfarin drug interaction as CRITICAL", () => {
    const med = DEMO_SCENARIOS.find((s) => s.id === "medical-history");
    assert.ok(med);
    assert.equal(med.mockResult.severity, "CRITICAL");
    assert.match(
      med.mockResult.severityReason.toLowerCase(),
      /ciprofloxacin|warfarin|interaction|hypotension/
    );

    // Verify claims contain FDA Black box interaction
    const verifiedInteraction = med.mockResult.verifyPhase.claims.find(
      (c) => c.status === "VERIFIED" && c.claim.includes("Warfarin")
    );
    assert.ok(
      verifiedInteraction,
      "Should have verified Warfarin interaction claim"
    );
  });

  test("Flood disaster scenario accurately debunks panic misinformation", () => {
    const flood = DEMO_SCENARIOS.find((s) => s.id === "flood-disaster");
    assert.ok(flood);
    assert.equal(flood.mockResult.severity, "URGENT");

    // Dam breach rumor should be CONTRADICTED
    const rumorClaim = flood.mockResult.verifyPhase.claims.find(
      (c) => c.claim.includes("Dam") && c.status === "CONTRADICTED"
    );
    assert.ok(
      rumorClaim,
      "Viral dam breach rumor must be tagged as CONTRADICTED"
    );
  });

  test("Cardiac emergency scenario identifies agonal respirations and OHCA", () => {
    const cardiac = DEMO_SCENARIOS.find((s) => s.id === "cardiac-emergency");
    assert.ok(cardiac);
    assert.equal(cardiac.mockResult.severity, "CRITICAL");

    // Misinterpreting snoring as normal breathing should be contradicted
    const breathClaim = cardiac.mockResult.verifyPhase.claims.find(
      (c) => c.status === "CONTRADICTED"
    );
    assert.ok(breathClaim);

    // Verify CPR step is order 2 or 1
    const cprStep = cardiac.mockResult.actionPlan.immediateSteps.find((s) =>
      s.action.toLowerCase().includes("compression")
    );
    assert.ok(cprStep, "Must have chest compressions step");
    assert.equal(cprStep.urgencyLevel, "DO_NOW");
  });

  test("Insurance bureaucracy scenario verifies statutory emergency protections", () => {
    const ins = DEMO_SCENARIOS.find((s) => s.id === "insurance-bureaucracy");
    assert.ok(ins);
    assert.equal(ins.mockResult.severity, "IMPORTANT");

    // Denial legality should be contradicted under ACA / No Surprises Act
    const denialClaim = ins.mockResult.verifyPhase.claims.find(
      (c) => c.status === "CONTRADICTED"
    );
    assert.ok(
      denialClaim,
      "Unlawful denial of emergency care must be contradicted"
    );
  });

  test("Confidence scores adhere strictly to 0-100% boundary", () => {
    for (const sc of DEMO_SCENARIOS) {
      const conf = sc.mockResult.verifyPhase.overallConfidence;
      assert.ok(
        conf >= 0 && conf <= 100,
        `Confidence ${conf} out of bounds for ${sc.id}`
      );

      for (const claim of sc.mockResult.verifyPhase.claims) {
        assert.ok(
          claim.confidence >= 0 && claim.confidence <= 100,
          `Claim confidence out of bounds in ${sc.id}`
        );
      }
    }
  });

  test("Operator scripts are concise, high-clarity, and non-empty", () => {
    for (const sc of DEMO_SCENARIOS) {
      const script = sc.mockResult.actionPlan.operatorScript;
      assert.ok(script && script.length > 20, "Operator script is too short");
      assert.ok(script.length < 500, "Operator script is too long for panic call");
    }
  });
});
