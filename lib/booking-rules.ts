export type IncomingSlot = { startHour: number; endHour: number; price: number };

export function normalizeSlots(slots: IncomingSlot[], hourlyRate: number) {
  const normalized = slots.map((slot) => ({
    startHour: Number(slot.startHour),
    endHour: Number(slot.endHour),
    price: Number(slot.price),
  })).sort((a, b) => a.startHour - b.startHour);

  if (normalized.length === 0 || normalized.length > 2) throw new Error("INVALID_SLOT_SELECTION");
  for (const slot of normalized) {
    if (!Number.isInteger(slot.startHour) || !Number.isInteger(slot.endHour) ||
        slot.startHour < 6 || slot.endHour > 22 || slot.endHour !== slot.startHour + 1) {
      throw new Error("INVALID_SLOT_SELECTION");
    }
    if (slot.price !== hourlyRate) throw new Error("INVALID_SLOT_PRICE");
  }
  if (normalized.length === 2 && normalized[1].startHour !== normalized[0].endHour) {
    throw new Error("INVALID_SLOT_SELECTION");
  }
  return normalized;
}
