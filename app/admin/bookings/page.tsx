"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronRight, Phone, Search, User } from "lucide-react";
import Button from "@/components/ui/button";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type BookingApi = {
  id: string;
  bookingType: "PRIVATE" | "OPEN";
  status:
    | "PRIVATE_CONFIRMED"
    | "OPEN_PENDING_FILL"
    | "OPEN_CONFIRMED"
    | "OPEN_EXPIRED"
    | "CANCELLED";
  bookingDate: string;
  playersCount: number;
  paymentStatus: "PENDING" | "PAID";
  paidAt?: string | null;
  totalPrice: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
  };
  slots: {
    id: string;
    startHour: number;
    endHour: number;
    price: number;
  }[];
  openGame?: {
    id: string;
    status: "PENDING_FILL" | "CONFIRMED" | "FULL" | "EXPIRED" | "CANCELLED";
    currentPlayers: number;
    maxPlayers: number;
  } | null;
};

function hourTo12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

function formatSlotRange(
  slots: { startHour: number; endHour: number }[] | undefined,
) {
  if (!slots?.length) return "Time unavailable";

  const sorted = [...slots].sort((a, b) => a.startHour - b.startHour);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  return `${hourTo12(first.startHour)} – ${hourTo12(last.endHour)}`;
}

function formatDateLabel(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function isBookingFinished(booking: BookingApi) {
  const now = new Date();

  const bookingDate = new Date(booking.bookingDate);
  bookingDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate.getTime() < today.getTime()) {
    return true;
  }

  if (bookingDate.getTime() > today.getTime()) {
    return false;
  }

  const lastEndHour = Math.max(...booking.slots.map((slot) => slot.endHour));
  const currentHour = now.getHours();

  return currentHour >= lastEndHour;
}

function statusLabel(status: BookingApi["status"]) {
  if (status === "PRIVATE_CONFIRMED") return "Confirmed";
  if (status === "OPEN_PENDING_FILL") return "Pending Fill";
  if (status === "OPEN_CONFIRMED") return "Open Confirmed";
  if (status === "OPEN_EXPIRED") return "Expired";
  return "Cancelled";
}

function statusClasses(status: BookingApi["status"]) {
  if (status === "PRIVATE_CONFIRMED" || status === "OPEN_CONFIRMED") {
    return "border-[#476B0D] bg-[#22310D] text-[#B8FF3B]";
  }

  if (status === "OPEN_PENDING_FILL") {
    return "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
  }

  if (status === "OPEN_EXPIRED" || status === "CANCELLED") {
    return "border-[#4D2A2F] bg-[#241519] text-[#FF9999]";
  }

  return "border-white/10 bg-white/[0.04] text-[#D7DEE7]";
}

function canManageBooking(booking: BookingApi) {
  return (
    booking.status !== "CANCELLED" &&
    booking.status !== "OPEN_EXPIRED"
  );
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showFinishedBookings, setShowFinishedBookings] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"ALL" | "PRIVATE" | "OPEN">(
    "ALL",
  );
  const [dateFilter, setDateFilter] = useState<"ALL" | "TODAY">("ALL");

  const fetchBookings = async () => {
    try {
      setError("");
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load bookings");
      }

      setBookings(data.bookings || []);
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Failed to load bookings"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleMarkPaid = async (bookingId: string) => {
    try {
      const res = await fetch("/api/bookings/mark-paid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to mark paid");
      }

      fetchBookings();
    } catch (error: unknown) {
      alert(getErrorMessage(error, "Error marking payment"));
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Cancel this booking?")) return;

    try {
      const res = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to cancel");
      }

      fetchBookings();
    } catch (error: unknown) {
      alert(getErrorMessage(error, "Error cancelling booking"));
    }
  };

  const filteredBookings = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((booking) => {
      const matchesSearch =
        booking.user.name.toLowerCase().includes(search.toLowerCase()) ||
        booking.user.phone.includes(search) ||
        booking.id.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "ALL" || booking.bookingType === typeFilter;

      let matchesDate = true;
      if (dateFilter === "TODAY") {
        const bookingDate = new Date(booking.bookingDate);
        bookingDate.setHours(0, 0, 0, 0);
        matchesDate = bookingDate.getTime() === today.getTime();
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [bookings, search, typeFilter, dateFilter]);

  const activeBookings = useMemo(() => {
    return filteredBookings.filter((booking) => !isBookingFinished(booking));
  }, [filteredBookings]);

  const finishedBookings = useMemo(() => {
    return filteredBookings.filter((booking) => isBookingFinished(booking));
  }, [filteredBookings]);

  const todaysBookingsCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === today.getTime();
    }).length;
  }, [bookings]);

  const privateCount = useMemo(
    () =>
      bookings.filter((booking) => booking.bookingType === "PRIVATE").length,
    [bookings],
  );

  const openCount = useMemo(
    () => bookings.filter((booking) => booking.bookingType === "OPEN").length,
    [bookings],
  );

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#B8FF3B]">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Bookings
          </h1>
          <p className="mt-2 text-[#94A3B8]">
            Track, filter, and manage all bookings from one place.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="card-strong p-5 md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full max-w-md">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="text"
                    placeholder="Search by name, phone, or booking ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B]"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTypeFilter("ALL")}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      typeFilter === "ALL"
                        ? "border-white/10 bg-white/[0.08] text-white"
                        : "border-white/10 bg-white/[0.04] text-[#94A3B8]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setTypeFilter("PRIVATE")}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      typeFilter === "PRIVATE"
                        ? "border-white/10 bg-white/[0.08] text-white"
                        : "border-white/10 bg-white/[0.04] text-[#94A3B8]"
                    }`}
                  >
                    Private
                  </button>
                  <button
                    onClick={() => setTypeFilter("OPEN")}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      typeFilter === "OPEN"
                        ? "border-white/10 bg-white/[0.08] text-white"
                        : "border-white/10 bg-white/[0.04] text-[#94A3B8]"
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() =>
                      setDateFilter(dateFilter === "TODAY" ? "ALL" : "TODAY")
                    }
                    className={`rounded-full border px-4 py-2 text-sm ${
                      dateFilter === "TODAY"
                        ? "border-white/10 bg-white/[0.08] text-white"
                        : "border-white/10 bg-white/[0.04] text-[#94A3B8]"
                    }`}
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <StatePanel
                variant="error"
                eyebrow="Couldn’t load bookings"
                title="The booking list is temporarily unavailable"
                text={error}
                actions={
                  <Button
                    variant="secondary"
                    className="rounded-[999px]"
                    onClick={() => {
                      setLoading(true);
                      fetchBookings();
                    }}
                  >
                    Try Again
                  </Button>
                }
              />
            )}

            <div className="space-y-4">
              {loading ? (
                <StatePanel
                  variant="loading"
                  eyebrow="Loading"
                  title="Checking booking activity"
                  text="Pulling the latest bookings, statuses, and payment state for the admin queue."
                />
              ) : filteredBookings.length === 0 ? (
                <StatePanel
                  eyebrow="No results"
                  title="No bookings match these filters"
                  text="Try changing the search text or filter pills to widen the booking list again."
                />
              ) : (
                <>
                  {activeBookings.length > 0 && (
                    <div className="space-y-4">
                      {activeBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="card-strong p-5 transition-all duration-300 hover:border-white/14"
                        >
                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                                  {formatSlotRange(booking.slots)}
                                </p>
                                <span
                                  className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusClasses(
                                    booking.status,
                                  )}`}
                                >
                                  {statusLabel(booking.status)}
                                </span>

                                <span
                                  className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                                    booking.paymentStatus === "PAID"
                                      ? "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]"
                                      : "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]"
                                  }`}
                                >
                                  {booking.paymentStatus === "PAID"
                                    ? "Paid"
                                    : "Pending"}
                                </span>
                              </div>

                              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                                  <User size={15} className="text-[#B8FF3B]" />
                                  <span className="text-white">
                                    {booking.user.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                                  <Phone size={15} className="text-[#B8FF3B]" />
                                  <span className="text-white">
                                    {booking.user.phone}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                                  <CalendarDays
                                    size={15}
                                    className="text-[#B8FF3B]"
                                  />
                                  <span className="text-white">
                                    {formatDateLabel(booking.bookingDate)}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                                  {booking.bookingType === "PRIVATE"
                                    ? "Private"
                                    : "Open"}
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                                  {booking.playersCount} players
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                                  {booking.id.slice(0, 10)}
                                </span>
                              </div>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[170px]">
                              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                                <p className="text-xs text-[#94A3B8]">Total</p>
                                <p className="mt-1 text-xl font-semibold text-white">
                                  NPR {booking.totalPrice}
                                </p>
                              </div>

                              <div className="flex gap-2">
                                {booking.paymentStatus === "PENDING" &&
                                canManageBooking(booking) ? (
                                  <Button
                                    className="flex-1 rounded-[16px] px-4 bg-[#B8FF3B] text-black hover:bg-[#a6e632]"
                                    onClick={() => handleMarkPaid(booking.id)}
                                  >
                                    Mark Paid
                                  </Button>
                                ) : (
                                  <Button
                                    variant="secondary"
                                    className="flex-1 rounded-[16px] px-4"
                                    disabled
                                  >
                                    Paid
                                  </Button>
                                )}

                                <Button
                                  variant="secondary"
                                  className="flex-1 rounded-[16px] px-4"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  disabled={!canManageBooking(booking)}
                                >
                                  {canManageBooking(booking)
                                    ? "Cancel"
                                    : "Inactive"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {finishedBookings.length > 0 && (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setShowFinishedBookings((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition hover:border-white/14"
                      >
                        <div>
                          <p className="text-base font-medium text-white">
                            Finished Bookings
                          </p>
                          <p className="mt-1 text-sm text-[#94A3B8]">
                            {finishedBookings.length} completed booking
                            {finishedBookings.length > 1 ? "s" : ""}
                          </p>
                        </div>

                        <span className="text-sm text-[#B8FF3B]">
                          {showFinishedBookings ? "Hide" : "Show"}
                        </span>
                      </button>

                      {showFinishedBookings && (
                        <div className="mt-4 space-y-4">
                          {finishedBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="card-strong p-5 opacity-75 transition-all duration-300"
                            >
                              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                                      {formatSlotRange(booking.slots)}
                                    </p>
                                    <span
                                      className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusClasses(
                                        booking.status,
                                      )}`}
                                    >
                                      {statusLabel(booking.status)}
                                    </span>

                                    <span
                                      className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                                        booking.paymentStatus === "PAID"
                                          ? "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]"
                                          : "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]"
                                      }`}
                                    >
                                      {booking.paymentStatus === "PAID"
                                        ? "Paid"
                                        : "Pending"}
                                    </span>
                                  </div>

                                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                                      <User
                                        size={15}
                                        className="text-[#B8FF3B]"
                                      />
                                      <span className="text-white">
                                        {booking.user.name}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                                      <Phone
                                        size={15}
                                        className="text-[#B8FF3B]"
                                      />
                                      <span className="text-white">
                                        {booking.user.phone}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                                      <CalendarDays
                                        size={15}
                                        className="text-[#B8FF3B]"
                                      />
                                      <span className="text-white">
                                        {formatDateLabel(booking.bookingDate)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                                  <p className="text-xs text-[#94A3B8]">
                                    Total
                                  </p>
                                  <p className="mt-1 text-xl font-semibold text-white">
                                    NPR {booking.totalPrice}
                                  </p>
                                </div>

                                {booking.paymentStatus === "PENDING" &&
                                  canManageBooking(booking) && (
                                    <Button
                                      className="rounded-[16px] px-4 bg-[#B8FF3B] text-black hover:bg-[#a6e632]"
                                      onClick={() => handleMarkPaid(booking.id)}
                                    >
                                      Mark Paid
                                    </Button>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-strong p-5">
              <p className="text-lg font-semibold text-white">Quick stats</p>

              <div className="mt-4 space-y-3">
                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-[#94A3B8]">Today’s bookings</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {todaysBookingsCount}
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-[#94A3B8]">Private games</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {privateCount}
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-[#94A3B8]">Open games</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {openCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-strong p-5">
              <p className="text-lg font-semibold text-white">Admin links</p>

              <div className="mt-4 space-y-2">
                <Link
                  href="/admin"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Dashboard
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>

                <Link
                  href="/admin/open-games"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Open Games
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>

                <Link
                  href="/admin/slots"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Slots
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>

                <Link
                  href="/admin/sales"
                  className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-white/14"
                >
                  Sales
                  <ChevronRight size={16} className="text-[#94A3B8]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
