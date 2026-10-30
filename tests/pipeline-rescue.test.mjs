import test from "node:test";
import assert from "node:assert/strict";
import { missions, runPipeline } from "../data/pipeline-rescue.ts";

test("retry-safe patch removes the duplicated sale from calculated revenue", () => {
  const output = runPipeline(missions[0], "deduplicate");
  assert.equal(output.passed, true);
  assert.equal(output.duplicates, 1);
  assert.equal(output.accepted.length, 3);
  assert.equal(output.revenueCents, 7700);
  assert.equal(runPipeline(missions[0], "keep-all").revenueCents, 10100);
  assert.equal(runPipeline(missions[0], "keep-all").passed, false);
});
test("schema patch quarantines incomplete data instead of inventing a value", () => {
  const output = runPipeline(missions[1], "validate");
  assert.equal(output.passed, true);
  assert.equal(output.accepted.length, 2);
  assert.equal(output.quarantined[0].id, "evt-202");
  assert.equal(output.revenueCents, 5800);
  assert.equal(runPipeline(missions[1], "fill-zero").passed, false);
});
test("event time patch corrects chronology without dropping late data", () => {
  const output = runPipeline(missions[2], "event-time");
  assert.equal(output.passed, true);
  assert.deepEqual(output.accepted.map(({ id }) => id), ["evt-301", "evt-302", "evt-303"]);
  assert.equal(output.revenueCents, 7100);
  assert.equal(runPipeline(missions[2], "arrival-time").passed, false);
});
test("runs are repeatable, do not mutate inputs and reject unrelated patches", () => {
  const original = structuredClone(missions);
  for (const mission of missions) {
    for (const { patch } of mission.choices) assert.deepEqual(runPipeline(mission, patch), runPipeline(mission, patch));
  }
  assert.deepEqual(missions, original);
  assert.throws(() => runPipeline(missions[0], "validate"), /Choose a patch/);
});
