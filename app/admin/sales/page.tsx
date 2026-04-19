"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  ReceiptText,
  Wallet,
} from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type Booking = {
  id: string;
  bookingType: "PRIVATE" | "OPEN";
  totalPrice: number;
  createdAt: string;
  paymentStatus: "PENDING" | "PAID";
  user: {
    name: string;
  };
};

type SalesResponse = {
  success: boolean;
  totalRevenue: number;
  collectedRevenue: number;
  pendingRevenue: number;
  privateRevenue: number;
  openRevenue: number;
  bookings: Booking[];
};

function paymentBadge(paymentStatus: Booking["paymentStatus"]) {
  return paymentStatus === "PAID"
    ? "border-[#1E4D33] bg-[#10261B] text-[#7EF7C1]"
    : "border-[#6C5A14] bg-[#2B2411] text-[#F4D35E]";
}

function bookingTypeLabel(type: Booking["bookingType"]) {
  return type === "PRIVATE" ? "Private game" : "Open game";
}

export default function AdminSalesPage() {
  const [data, setData] = useState<SalesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSales = async () => {
    try {
      setError("");
      const res = await fetch("/api/admin/sales", {
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to load sales");
      }

      setData(json);
    } catch (fetchError: unknown) {
      setError(getErrorMessage(fetchError, "Failed to load sales"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const bookingCount = data?.bookings.length ?? 0;
  const paidCount = useMemo(
    () => data?.bookings.filter((booking) => booking.paymentStatus === "PAID").length ?? 0,
    [data],
  );
  const pendingCount = useMemo(
    () =>
      data?.bookings.filter((booking) => booking.paymentStatus === "PENDING")
        .length ?? 0,
    [data],
  );

  const quickLinks = [
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Bookings",
      href: "/admin/bookings",
    },
    {
      label: "Open Games",
      href: "/admin/open-games",
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <FadeIn>
          <SectionHeading
            eyebrow="Admin"
            title="Sales overview"
            text="Track today's collected revenue, pending payments, and the booking mix driving venue income."
          />
        </FadeIn>

        <FadeIn delay={0.04}>
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_82%_24%,rgba(140,201,255,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Daily revenue pulse
                  </span>
                </div>

                <h1 className="mt-5 text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4rem]">
                  Know what has been collected, what is still pending, and where today&apos;s money is coming from.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  This view focuses on today&apos;s booking revenue so you can
                  follow up on unpaid bookings and see whether private or open
                  games are driving the day.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    {bookingCount} booking{bookingCount === 1 ? "" : "s"} tracked
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    {paidCount} paid
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    {pendingCount} pending
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.32)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                <div className="relative p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.08] text-[#B8FF3B]">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#D7DEE7]">Today&apos;s headline</p>
                      <p className="text-lg font-semibold text-white">
                        Revenue snapshot
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Total revenue</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        NPR {data?.totalRevenue ?? 0}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Collected</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        NPR {data?.collectedRevenue ?? 0}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Pending</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        NPR {data?.pendingRevenue ?? 0}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Bookings counted</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        {bookingCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {error && (
          <div className="mt-6">
            <StatePanel
              variant="error"
              eyebrow="Couldn’t load sales"
              title="The sales dashboard is temporarily unavailable"
              text={error}
              actions={
                <Link href="/admin/bookings">
                  <span className="inline-flex rounded-[999px] border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]">
                    Check Bookings Instead
                  </span>
                </Link>
              }
            />
          </div>
        )}

        {loading ? (
          <div className="mt-8">
            <StatePanel
              variant="loading"
              eyebrow="Loading"
              title="Calculating today’s revenue"
              text="We’re pulling bookings, payment states, and today’s collection totals."
            />
          </div>
        ) : data ? (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Collected Today",
                  value: `NPR ${data.collectedRevenue}`,
                  meta: `${paidCount} paid booking${paidCount === 1 ? "" : "s"}`,
                  icon: CircleDollarSign,
                },
                {
                  title: "Pending Today",
                  value: `NPR ${data.pendingRevenue}`,
                  meta: `${pendingCount} booking${pendingCount === 1 ? "" : "s"} still unpaid`,
                  icon: CreditCard,
                },
                {
                  title: "Private Revenue",
                  value: `NPR ${data.privateRevenue}`,
                  meta: "Private-game contribution",
                  icon: ReceiptText,
                },
                {
                  title: "Open Revenue",
                  value: `NPR ${data.openRevenue}`,
                  meta: "Open-game contribution",
                  icon: Wallet,
                },
              ].map((item, index) => (
                <FadeIn key={item.title} delay={0.06 + index * 0.03}>
                  <div className="card-strong rounded-[28px] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-[#94A3B8]">{item.title}</p>
                        <p className="mt-2 text-[1.75rem] font-semibold tracking-[-0.04em] text-white">
                          {item.value}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                          {item.meta}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] text-[#B8FF3B]">
                        <item.icon size={20} />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
              <FadeIn delay={0.14}>
                <div className="card-strong rounded-[32px] p-5 md:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                        Revenue mix
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        Where today&apos;s revenue came from
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-sm text-[#94A3B8]">Private games</p>
                      <p className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-white">
                        NPR {data.privateRevenue}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                        Best for exclusive bookings and larger single-party revenue.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-sm text-[#94A3B8]">Open games</p>
                      <p className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-white">
                        NPR {data.openRevenue}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                        Useful for community fill and extra participation on open slots.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-[#94A3B8]">Collection health</p>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                        {bookingCount > 0
                          ? `${Math.round((paidCount / bookingCount) * 100)}% paid`
                          : "No bookings"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                      {pendingCount > 0
                        ? "There are still unpaid bookings to follow up before the day closes."
                        : "All tracked bookings for today are already marked paid."}
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.18}>
                <div className="card-strong rounded-[32px] p-5 md:p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                      Links
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      Move quickly between admin tools
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white transition hover:border-white/14 hover:bg-white/[0.06]"
                      >
                        <span>{link.label}</span>
                        <ArrowRight
                          size={16}
                          className="text-[#B8FF3B] transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.22}>
              <div className="mt-8 card-strong rounded-[32px] p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                      Booking ledger
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      Today&apos;s revenue activity
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {data.bookings.length === 0 ? (
                    <StatePanel
                      title="No sales recorded for today"
                      text="As bookings are created for today, they’ll appear here with payment status and amount."
                      className="rounded-[22px] p-4 shadow-none"
                    />
                  ) : (
                    data.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-base font-medium text-white">
                                {booking.user.name}
                              </p>
                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7DEE7]">
                                {bookingTypeLabel(booking.bookingType)}
                              </span>
                              <span
                                className={`inline-flex rounded-full border px-3 py-1 text-xs ${paymentBadge(
                                  booking.paymentStatus,
                                )}`}
                              >
                                {booking.paymentStatus === "PAID" ? "Paid" : "Pending"}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-[#94A3B8]">
                              {new Date(booking.createdAt).toLocaleTimeString()}
                            </p>
                          </div>

                          <div className="rounded-[18px] border border-white/10 bg-[#121821] px-4 py-3 text-right">
                            <p className="text-xs text-[#94A3B8]">Amount</p>
                            <p className="mt-1 text-sm font-medium text-white">
                              NPR {booking.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </FadeIn>
          </>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/admin"
            className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition hover:border-white/14 hover:bg-white/[0.06]"
          >
            Dashboard
            <ChevronRight size={16} />
          </Link>

          <Link
            href="/admin/bookings"
            className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition hover:border-white/14 hover:bg-white/[0.06]"
          >
            Bookings
            <ChevronRight size={16} />
          </Link>

          <Link
            href="/admin/open-games"
            className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition hover:border-white/14 hover:bg-white/[0.06]"
          >
            Open Games
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
