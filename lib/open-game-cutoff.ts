export const OPEN_GAME_CUTOFF_HOURS = 4;

type SlotLike = {
  startHour: number;
};

export function getOpenGameCutoffTime(
  bookingDate: Date,
  slots: SlotLike[],
): Date {
  if (!slots.length) {
    return new Date(bookingDate);
  }

  const earliestStartHour = Math.min(...slots.map((slot) => slot.startHour));
  const cutoffTime = new Date(bookingDate);
  cutoffTime.setHours(earliestStartHour - OPEN_GAME_CUTOFF_HOURS, 0, 0, 0);
  return cutoffTime;
}
