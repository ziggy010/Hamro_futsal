export type ActivityType = "FUTSAL" | "PICKLEBALL";

export const FUTSAL_HOURLY_RATE = 1200;
export const PICKLEBALL_HOURLY_RATE = 800;
export const HOURLY_RATE = FUTSAL_HOURLY_RATE;

export function getHourlyRate(activity: ActivityType) {
  return activity === "PICKLEBALL"
    ? PICKLEBALL_HOURLY_RATE
    : FUTSAL_HOURLY_RATE;
}
