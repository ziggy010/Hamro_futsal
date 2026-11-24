"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Mail,
  Phone,
  Search,
  UserRound,
} from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type Customer = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  createdAt: string;
  bookingCount: number;
  paidBookingCount: number;
  lifetimeSpend: number;
  lastBookingAt: string | null;
  favoriteActivity: "FUTSAL" | "PICKLEBALL" | null;
};

type CustomerResponse = {
  success: boolean;
  customers: Customer[];
  summary: {
    totalCustomers: number;
    returningCustomers: number;
    totalBookings: number;
    lifetimeRevenue: number;
  };
};

function formatDate(value: string | null) {
  if (!value) return "No bookings yet";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminCustomersPage() {
  const [data, setData] = useState<CustomerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    try {
      setError("");
      const response = await fetch("/api/admin/customers", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) throw new Error(json?.error || "Failed to load customers");
      setData(json);
    } catch (fetchError: unknown) {
      setError(getErrorMessage(fetchError, "Failed to load customers"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data?.customers ?? [];

    return (data?.customers ?? []).filter((customer) =>
      [customer.name, customer.phone, customer.email].some((value) =>
        value?.toLowerCase().includes(query),
      ),
    );
  }, [data, search]);

  const stats = [
    { label: "Customers", value: data?.summary.totalCustomers ?? 0 },
    { label: "Returning", value: data?.summary.returningCustomers ?? 0 },
    { label: "Bookings", value: data?.summary.totalBookings ?? 0 },
    {
      label: "Lifetime collected",
      value: `NPR ${(data?.summary.lifetimeRevenue ?? 0).toLocaleString()}`,
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <FadeIn>
          <span className="eyebrow">Admin</span>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.055em] text-white">
            Customers.
          </h1>
          <p className="mt-4 max-w-[56ch] text-base leading-7 text-[var(--fg-3)]">
            See who books most often, how to reach them, and the amount they have
            actually spent at Strike Yard.
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-8 grid grid-cols-2 border-y border-[var(--line)] lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-4 ${index % 2 === 1 ? "pl-4" : "pr-4"} ${index > 1 ? "border-t border-[var(--line)] lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:pl-5" : ""}`}
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                  {stat.label}
                </span>
                <span className="mt-2 block font-mono text-[clamp(1.15rem,2.3vw,1.8rem)] font-semibold tracking-[-0.04em] text-white tabular-nums">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {error ? (
          <div className="mt-6">
            <StatePanel
              variant="error"
              eyebrow="Couldn't load customers"
              title="Customer insights are temporarily unavailable"
              text={error}
              actions={
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setLoading(true);
                    fetchCustomers();
                  }}
                >
                  Try again
                </button>
              }
            />
          </div>
        ) : null}

        <FadeIn delay={0.08}>
          <div className="mt-6 overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--bg-soft)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-5 md:px-7">
              <div>
                <span className="eyebrow">Customer directory</span>
                <p className="mt-1 text-base font-semibold tracking-[-0.025em] text-white">
                  {filteredCustomers.length} customer{filteredCustomers.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="relative w-full sm:w-[320px]">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-dim)]"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, phone, or email"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] py-2.5 pl-9 pr-3 text-sm text-white outline-none transition focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="px-5 md:px-7">
              {loading ? (
                <div className="py-8">
                  <StatePanel
                    variant="loading"
                    title="Building customer histories"
                    text="Calculating bookings and collected spend."
                    className="rounded-[20px] p-5 shadow-none"
                  />
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="py-8">
                  <StatePanel
                    title={search ? "No customers match that search" : "No customers yet"}
                    text={search ? "Try a different name, phone number, or email." : "Customers will appear here after their first account or venue booking."}
                    className="rounded-[20px] p-5 shadow-none"
                  />
                </div>
              ) : (
                filteredCustomers.map((customer) => (
                  <article
                    key={customer.id}
                    className="grid gap-5 border-t border-[var(--line)] py-5 first:border-t-0 lg:grid-cols-[minmax(220px,1.2fr)_minmax(190px,0.9fr)_repeat(2,minmax(110px,0.55fr))_auto] lg:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--line)] text-[var(--fg-dim)]">
                          <UserRound size={15} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-white">
                            {customer.name}
                          </p>
                          <p className="mt-1 text-xs text-[var(--fg-dim)]">
                            Customer since {formatDate(customer.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-xs text-[var(--fg-3)]">
                        <Phone size={12} className="text-[var(--fg-dim)]" />
                        {customer.phone || "No phone"}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-[var(--fg-3)]">
                        <Mail size={12} className="text-[var(--fg-dim)]" />
                        <span className="truncate">{customer.email || "No email"}</span>
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-dim)]">Bookings</span>
                      <p className="mt-1 font-mono text-xl font-semibold text-white tabular-nums">
                        {customer.bookingCount}
                      </p>
                      <p className="mt-1 text-[11px] text-[var(--fg-dim)]">
                        {customer.paidBookingCount} paid
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-dim)]">Spent</span>
                      <p className="mt-1 font-mono text-[15px] font-semibold text-[var(--accent)] tabular-nums">
                        NPR {customer.lifetimeSpend.toLocaleString()}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--fg-dim)]">
                        <CalendarDays size={11} /> {formatDate(customer.lastBookingAt)}
                      </p>
                    </div>

                    <Link
                      href={`/admin/bookings?search=${encodeURIComponent(customer.phone || customer.email || customer.name)}`}
                      className="btn btn-ghost btn-sm w-fit"
                    >
                      View bookings
                    </Link>
                  </article>
                ))
              )}
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
