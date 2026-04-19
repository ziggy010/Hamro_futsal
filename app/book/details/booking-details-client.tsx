"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Users } from "lucide-react";
import Button from "@/components/ui/button";
import BookingProgress from "@/components/ui/booking-progress";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";
import { useSession } from "next-auth/react";
import { getErrorMessage } from "@/lib/utils/error-message";

type Slot = {
  time: string;
  price: number;
};

type Props = {
  dateParam?: string;
  slots: Slot[];
  total: number;
  initialUser?: {
    name: string;
    phone: string;
  };
};

export default function BookingDetailsClient({
  dateParam,
  slots,
  total,
  initialUser,
}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fullName, setFullName] = useState(initialUser?.name || "");
  const [phone, setPhone] = useState(initialUser?.phone || "");
  const [gameType, setGameType] = useState<"private" | "open">("private");
  const [playersCount, setPlayersCount] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function convertTimeToHour(value?: string) {
    if (!value) return 0;

    const safeValue = value.trim();
    if (!safeValue) return 0;

    const parts = safeValue.split(" ");
    if (parts.length < 2) return 0;

    const time = parts[0];
    const period = parts[1];

    const [rawHour] = time.split(":");
    let hour = Number(rawHour);

    if (Number.isNaN(hour)) return 0;

    if (period === "AM") {
      if (hour === 12) hour = 0;
    } else if (period === "PM") {
      if (hour !== 12) hour += 12;
    }

    return hour;
  }

  function parseSlotTimeRange(timeRange?: string) {
    if (!timeRange) {
      return {
        startHour: 0,
        endHour: 0,
      };
    }

    const parts = timeRange.split(" - ").map((part) => part.trim());

    if (parts.length !== 2) {
      return {
        startHour: 0,
        endHour: 0,
      };
    }

    return {
      startHour: convertTimeToHour(parts[0]),
      endHour: convertTimeToHour(parts[1]),
    };
  }

  const parsedDate = dateParam ? new Date(dateParam) : null;
  const remainingPlayersNeeded = Math.max(0, 10 - playersCount);
  const trimmedFullName = fullName.trim();
  const trimmedPhone = phone.trim();
  const phoneInvalid =
    trimmedPhone.length > 0 && !/^[0-9+\-\s]{7,15}$/.test(trimmedPhone);

  useEffect(() => {
    if (session?.user?.name && !initialUser?.name && !fullName) {
      setFullName(session.user.name);
    }
  }, [session, initialUser?.name, fullName]);

  const handleConfirm = async () => {
    try {
      setSubmitError("");
      setIsSubmitting(true);

      const formattedSlots = slots
        .map((slot) => {
          const { startHour, endHour } = parseSlotTimeRange(slot?.time);

          return {
            startHour,
            endHour,
            price: slot.price,
          };
        })
        .filter((slot) => slot.startHour < slot.endHour);

      if (formattedSlots.length === 0) {
        setSubmitError(
          "Invalid slot time. Please go back and select the slot again.",
        );
        setIsSubmitting(false);
        return;
      }

      if (!trimmedFullName) {
        setSubmitError("Please enter your full name.");
        setIsSubmitting(false);
        return;
      }

      if (!trimmedPhone) {
        setSubmitError("Please enter your phone number.");
        setIsSubmitting(false);
        return;
      }

      if (phoneInvalid) {
        setSubmitError("Please enter a valid phone number.");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedFullName,
          phone: trimmedPhone,
          bookingDate: dateParam,
          bookingType: gameType.toUpperCase(),
          playersCount,
          totalPrice: total,
          slots: formattedSlots,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.error === "One or more selected slots are already booked") {
          setSubmitError(
            "One of your selected slots was just booked. Please choose another.",
          );
        } else if (data?.error === "One or more selected slots are blocked") {
          setSubmitError(
            "One of your selected slots is not available anymore.",
          );
        } else if (data?.error === "You must be logged in to book a slot") {
          setSubmitError("Please log in before booking.");
        } else {
          setSubmitError(
            data?.details
              ? `${data?.error || "Booking failed"}: ${data.details}`
              : data?.error || "Booking failed. Please try again.",
          );
        }
        return;
      }

      const bookingId = data?.booking?.id;

      if (!bookingId) {
        setSubmitError(
          "Booking was created, but confirmation details were missing.",
        );
        return;
      }

      setIsRedirecting(true);
      router.replace(
        `/book/success?bookingId=${encodeURIComponent(bookingId)}`,
      );
    } catch (error: unknown) {
      setSubmitError(
        getErrorMessage(
          error,
          "Something went wrong while creating the booking.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pb-24">
      <section className="container py-8 md:py-12">
        <FadeIn>
          <SectionHeading
            eyebrow="Booking details"
            title="Complete your reservation"
            text="Choose your game type, add your details, and confirm the booking."
          />
          <BookingProgress currentStep={2} />
        </FadeIn>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-6">
            <FadeIn delay={0.04}>
              <div className="card-strong p-5 md:p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-medium text-white">
                      Step 1 already done
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      Your date and slot are selected and saved in this booking
                      flow.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-medium text-white">
                      One more confirmation
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      Choose private or open game, then confirm with your saved
                      contact details.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-medium text-white">
                      Payment at venue
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      No online checkout right now. Your slot is booked first,
                      and payment is settled later at the futsal.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="card-strong p-5 md:p-6">
                <div className="mb-5">
                  <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                    Choose game type
                  </p>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    Private games are for your own players. Open games allow
                    other signed-in players to join later.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setGameType("private")}
                    className={`rounded-[24px] border p-4 text-left transition-all duration-300 ${
                      gameType === "private"
                        ? "border-[#B8FF3B] bg-[#18220C]"
                        : "border-white/10 bg-white/[0.04] hover:border-white/14 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                        <Lock size={18} />
                      </div>

                      <div>
                        <p className="text-base font-medium text-white">
                          Private Game
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                          Keep the booking for your own group only.
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGameType("open")}
                    className={`rounded-[24px] border p-4 text-left transition-all duration-300 ${
                      gameType === "open"
                        ? "border-[#B8FF3B] bg-[#18220C]"
                        : "border-white/10 bg-white/[0.04] hover:border-white/14 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                        <Users size={18} />
                      </div>

                      <div>
                        <p className="text-base font-medium text-white">
                          Open Game
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                          Let other players join until the game fills up.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {gameType === "open" && (
                  <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                        <ShieldCheck size={18} />
                      </div>

                      <div className="w-full">
                        <p className="text-sm text-[#94A3B8]">
                          How many players do you already have?
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setPlayersCount((prev) => Math.max(1, prev - 1))
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
                          >
                            -
                          </button>

                          <div className="min-w-[60px] text-center">
                            <p className="text-2xl font-semibold tracking-[-0.03em] text-white">
                              {playersCount}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setPlayersCount((prev) => Math.min(10, prev + 1))
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
                          >
                            +
                          </button>

                          <p className="text-sm text-[#94A3B8]">
                            Need{" "}
                            <span className="font-medium text-white">
                              {remainingPlayersNeeded}
                            </span>{" "}
                            more players
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="card-strong p-5 md:p-6">
                <div className="mb-6">
                  <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                    Your details
                  </p>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    Keep it quick and easy for mobile users.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Phone number
                    </label>
                      <input
                        type="tel"
                        placeholder="9813110577"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
                      />
                      {phoneInvalid && (
                        <p className="mt-2 text-sm text-[#FFB4B4]">
                          Use 7-15 digits and only numbers, spaces, `+` or `-`.
                        </p>
                      )}
                    </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm leading-7 text-[#94A3B8]">
                      Sign in will be required before final booking confirmation
                      for both private and open games. Payment is collected at
                      the venue.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.16}>
            <div className="card-strong glow sticky top-24 p-5 md:p-6">
              <p className="section-eyebrow">Booking summary</p>

              <div className="mt-5 space-y-4">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Date</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">
                    {parsedDate && !Number.isNaN(parsedDate.getTime())
                      ? format(parsedDate, "EEEE, MMM d")
                      : "No date selected"}
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Slots</p>

                  {slots.length > 0 ? (
                    <div className="mt-3 space-y-2">
                      {slots.map((slot, index) => (
                        <div
                          key={`${slot.time}-${index}`}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121821] px-3 py-3"
                        >
                          <span className="text-sm font-medium text-white">
                            {slot.time}
                          </span>
                          <span className="text-sm text-[#94A3B8]">
                            NPR {slot.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-[#94A3B8]">
                      No slots selected.
                    </p>
                  )}
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Game type</p>

                  <div className="mt-3 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                      {gameType === "private" ? (
                        <Lock size={18} />
                      ) : (
                        <Users size={18} />
                      )}
                    </div>

                    <div>
                      <p className="text-base font-medium text-white">
                        {gameType === "private" ? "Private Game" : "Open Game"}
                      </p>

                      <p className="mt-1 text-sm leading-7 text-[#94A3B8]">
                        {gameType === "private"
                          ? "This slot will be reserved for your own players only."
                          : `You already have ${playersCount} player${
                              playersCount > 1 ? "s" : ""
                            } and need ${remainingPlayersNeeded} more to fill the game.`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#94A3B8]">Duration</p>
                    <p className="font-medium text-white">
                      {slots.length} hour{slots.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-[#94A3B8]">Total</p>
                    <p className="text-2xl font-semibold tracking-[-0.03em] text-white">
                      NPR {total}
                    </p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">What happens next</p>
                  <div className="mt-3 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-[#121821] px-3 py-3 text-sm text-[#D7DEE7]">
                      1. Your selected slot gets reserved immediately.
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#121821] px-3 py-3 text-sm text-[#D7DEE7]">
                      2. You land on a confirmation page with your booking
                      summary.
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#121821] px-3 py-3 text-sm text-[#D7DEE7]">
                      3. Payment is handled at the venue, not online.
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="rounded-[18px] border border-[#4D2A2F] bg-[#241519] px-4 py-3">
                    <p className="text-sm text-[#FFB4B4]">{submitError}</p>
                  </div>
                )}

                {status === "loading" ? (
                  <Button
                    className="w-full shadow-[0_10px_30px_rgba(184,255,59,0.18)]"
                    disabled
                  >
                    Checking account...
                  </Button>
                ) : session?.user ? (
                  <Button
                    className="w-full shadow-[0_10px_30px_rgba(184,255,59,0.18)]"
                    disabled={
                      !fullName ||
                      !phone ||
                      phoneInvalid ||
                      slots.length === 0 ||
                      isSubmitting ||
                      isRedirecting
                    }
                    onClick={handleConfirm}
                  >
                    {isRedirecting
                      ? "Opening confirmation..."
                      : isSubmitting
                        ? "Booking..."
                        : "Confirm Booking"}
                  </Button>
                ) : (
                  <Button
                    className="w-full shadow-[0_10px_30px_rgba(184,255,59,0.18)]"
                    onClick={() => {
                      const currentUrl =
                        typeof window !== "undefined"
                          ? window.location.pathname + window.location.search
                          : "/book/details";

                      router.push(
                        `/login?callbackUrl=${encodeURIComponent(currentUrl)}`,
                      );
                    }}
                  >
                    Login to Continue
                  </Button>
                )}

                {!session?.user && status !== "loading" && (
                  <p className="text-center text-sm text-[#94A3B8]">
                    You need to sign in before booking. We will bring you right
                    back to this confirmation step.
                  </p>
                )}

                <Link
                  href="/book"
                  className="block text-center text-sm text-[#94A3B8] transition hover:text-white"
                >
                  Go back and edit slot
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
