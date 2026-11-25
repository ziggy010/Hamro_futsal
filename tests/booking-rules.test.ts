import test from "node:test";
import assert from "node:assert/strict";
import { normalizeSlots } from "../lib/booking-rules";

test("accepts one or two consecutive hours in chronological order", () => {
  assert.deepEqual(normalizeSlots([
    { startHour: 8, endHour: 9, price: 1200 },
    { startHour: 7, endHour: 8, price: 1200 },
  ], 1200).map((slot) => slot.startHour), [7, 8]);
});

test("rejects gaps, past opening, after closing, and duplicate hours", () => {
  for (const slots of [
    [{ startHour: 7, endHour: 8, price: 1200 }, { startHour: 9, endHour: 10, price: 1200 }],
    [{ startHour: 5, endHour: 6, price: 1200 }],
    [{ startHour: 22, endHour: 23, price: 1200 }],
    [{ startHour: 7, endHour: 8, price: 1200 }, { startHour: 7, endHour: 8, price: 1200 }],
  ]) assert.throws(() => normalizeSlots(slots, 1200), /INVALID_SLOT_SELECTION/);
});

test("rejects client-supplied discount in slot price", () => {
  assert.throws(() => normalizeSlots([{ startHour: 10, endHour: 11, price: 1 }], 800), /INVALID_SLOT_PRICE/);
});
