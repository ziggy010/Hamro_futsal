ALTER TABLE "Booking"
ADD COLUMN "paidAmount" INTEGER;

UPDATE "Booking"
SET "paidAmount" = "totalPrice"
WHERE "paymentStatus" = 'PAID';

ALTER TABLE "Booking"
ADD CONSTRAINT "Booking_paidAmount_nonnegative_check"
CHECK ("paidAmount" IS NULL OR "paidAmount" >= 0);
