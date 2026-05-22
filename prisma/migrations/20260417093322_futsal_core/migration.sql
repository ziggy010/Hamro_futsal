-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('PRIVATE', 'OPEN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PRIVATE_CONFIRMED', 'OPEN_PENDING_FILL', 'OPEN_CONFIRMED', 'OPEN_EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OpenGameStatus" AS ENUM ('PENDING_FILL', 'CONFIRMED', 'FULL', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SlotBlockReason" AS ENUM ('MAINTENANCE', 'ADMIN_BLOCK', 'PRIVATE_EVENT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingType" "BookingType" NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "playersCount" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSlot" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "slotDate" TIMESTAMP(3) NOT NULL,
    "startHour" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenGame" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "OpenGameStatus" NOT NULL,
    "currentPlayers" INTEGER NOT NULL,
    "minPlayers" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL DEFAULT 10,
    "cutoffTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpenGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenGameParticipant" (
    "id" TEXT NOT NULL,
    "openGameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playersJoined" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpenGameParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlotBlock" (
    "id" TEXT NOT NULL,
    "blockDate" TIMESTAMP(3) NOT NULL,
    "startHour" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "reason" "SlotBlockReason" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SlotBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Booking_bookingDate_idx" ON "Booking"("bookingDate");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_bookingType_idx" ON "Booking"("bookingType");

-- CreateIndex
CREATE INDEX "BookingSlot_slotDate_idx" ON "BookingSlot"("slotDate");

-- CreateIndex
CREATE INDEX "BookingSlot_startHour_endHour_idx" ON "BookingSlot"("startHour", "endHour");

-- CreateIndex
CREATE UNIQUE INDEX "OpenGame_bookingId_key" ON "OpenGame"("bookingId");

-- CreateIndex
CREATE INDEX "OpenGame_status_idx" ON "OpenGame"("status");

-- CreateIndex
CREATE INDEX "OpenGame_cutoffTime_idx" ON "OpenGame"("cutoffTime");

-- CreateIndex
CREATE INDEX "OpenGameParticipant_openGameId_idx" ON "OpenGameParticipant"("openGameId");

-- CreateIndex
CREATE INDEX "OpenGameParticipant_userId_idx" ON "OpenGameParticipant"("userId");

-- CreateIndex
CREATE INDEX "SlotBlock_blockDate_idx" ON "SlotBlock"("blockDate");

-- CreateIndex
CREATE INDEX "SlotBlock_startHour_endHour_idx" ON "SlotBlock"("startHour", "endHour");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSlot" ADD CONSTRAINT "BookingSlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenGame" ADD CONSTRAINT "OpenGame_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenGameParticipant" ADD CONSTRAINT "OpenGameParticipant_openGameId_fkey" FOREIGN KEY ("openGameId") REFERENCES "OpenGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenGameParticipant" ADD CONSTRAINT "OpenGameParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
