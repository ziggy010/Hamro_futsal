CREATE TYPE "ActivityType" AS ENUM ('FUTSAL', 'PICKLEBALL');

ALTER TABLE "BookingSlot"
ADD COLUMN "activity" "ActivityType" NOT NULL DEFAULT 'FUTSAL',
ADD COLUMN "courtNumber" INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "SlotBlock"
ADD COLUMN "activity" "ActivityType" NOT NULL DEFAULT 'FUTSAL',
ADD COLUMN "courtNumber" INTEGER NOT NULL DEFAULT 1;

CREATE INDEX "BookingSlot_slotDate_activity_courtNumber_idx"
ON "BookingSlot"("slotDate", "activity", "courtNumber");

CREATE INDEX "SlotBlock_blockDate_activity_courtNumber_idx"
ON "SlotBlock"("blockDate", "activity", "courtNumber");
