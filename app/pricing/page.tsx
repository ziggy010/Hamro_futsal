import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MoonStar,
  ShieldCheck,
  SunMedium,
  Wallet,
} from "lucide-react";
import Button from "@/components/ui/button";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";

const pricingPlans = [
  {
    label: "Morning",
    time: "7 AM - 10 AM",
    price: "NPR 800",
    note: "Best for early games, lighter demand, and more flexible scheduling.",
    highlight: false,
    icon: SunMedium,
  },
  {
    label: "Day",
    time: "10 AM - 5 PM",
    price: "NPR 1000",
    note: "Balanced timing for casual groups, weekday sessions, and smoother availability.",
    highlight: false,
    icon: Clock3,
  },
  {
    label: "Evening",
    time: "5 PM - 10 PM",
    price: "NPR 1200",
    note: "Prime-time hours with the strongest demand and the most active match feel.",
    highlight: true,
    icon: MoonStar,
  },
] as const;

const pricingHighlights = [
  {
    title: "Clear hourly pricing",
    text: "The price changes only by time band, so users do not need to guess what the slot will cost.",
    icon: Wallet,
  },
  {
    title: "One or two hours only",
    text: "The booking flow is intentionally simple: reserve one hour or two continuous hours.",
    icon: CalendarDays,
  },
  {
    title: "Payment at venue",
    text: "No online payment flow right now. Booking is reserved first and payment is handled later on arrival.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "What decides the price?",
    answer:
      "Only the time of day. Morning is lowest, daytime is mid-range, and evening is the premium peak slot.",
  },
  {
    question: "Do I need to pay online now?",
    answer:
      "No. The site reserves the booking first, and payment is currently collected at the venue.",
  },
  {
    question: "Can I book for two hours?",
    answer:
      "Yes. You can choose one hour or two continuous hours in the booking flow.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <section className="container py-6 md:py-12">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,255,59,0.10),transparent_18%),radial-gradient(circle_at_85%_30%,rgba(184,255,59,0.10),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Pricing
                  </span>
                </div>

                <h1 className="mt-5 text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.05em] text-white sm:text-[2.6rem] md:text-[4.8rem]">
                  Simple pricing that is easy to judge before you book.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  The goal is clarity, not complexity. Pick the time band,
                  understand the hourly rate immediately, and move into booking
                  without second-guessing the cost.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Time-based pricing only
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    One or two hours
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Pay at venue
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book">
                    <Button className="w-full rounded-[999px] px-8 py-[18px] text-base shadow-[0_14px_34px_rgba(184,255,59,0.22)] sm:w-auto">
                      Book Your Slot
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="secondary"
                      className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-8 py-[18px] text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] sm:w-auto"
                    >
                      Ask a Question
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.30)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                <div className="relative p-5 md:p-6">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.08] text-[#B8FF3B]">
                        <MoonStar size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-[#D7DEE7]">Most booked band</p>
                        <p className="text-lg font-semibold text-white">
                          Evening slots
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-sm text-[#94A3B8]">Lowest rate</p>
                        <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                          800
                        </p>
                        <p className="mt-1 text-sm text-[#94A3B8]">Morning</p>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-sm text-[#94A3B8]">Balanced rate</p>
                        <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                          1000
                        </p>
                        <p className="mt-1 text-sm text-[#94A3B8]">Day</p>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-sm text-[#94A3B8]">Peak rate</p>
                        <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                          1200
                        </p>
                        <p className="mt-1 text-sm text-[#94A3B8]">Evening</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.12}>
          <SectionHeading
            eyebrow="Pricing bands"
            title="Choose the time band that fits your group."
            text="Every slot belongs to one of three clear pricing windows, so players can compare fast and book confidently."
          />
        </FadeIn>

        <div className="mt-7 grid gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <FadeIn key={plan.label} delay={0.16 + index * 0.06}>
                <div
                  className={`group relative overflow-hidden rounded-[34px] border p-6 transition-all duration-300 will-change-transform hover:-translate-y-[4px] ${
                    plan.highlight
                      ? "border-[#B8FF3B]/60 bg-[rgba(20,28,15,0.76)] shadow-[0_16px_44px_rgba(184,255,59,0.10),0_16px_50px_rgba(0,0,0,0.24)]"
                      : "border-white/10 bg-[rgba(10,14,19,0.72)] shadow-[0_16px_50px_rgba(0,0,0,0.24)]"
                  }`}
                >
                  {plan.highlight && (
                    <>
                      <div className="pointer-events-none absolute -right-12 top-16 h-40 w-40 rounded-full bg-[#B8FF3B]/12 blur-3xl" />
                      <div className="pointer-events-none absolute -left-8 bottom-10 h-28 w-28 rounded-full bg-[#B8FF3B]/10 blur-3xl" />
                    </>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.05),transparent_28%,transparent_62%,rgba(255,255,255,0.02)_100%)] opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.06] text-[#B8FF3B]">
                          <Icon size={20} />
                        </div>

                        <div>
                          <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                            {plan.label}
                          </p>
                          <h2 className="mt-4 text-[2.6rem] font-semibold tracking-[-0.05em] text-white">
                            {plan.price}
                            <span className="ml-1 text-base text-[#94A3B8]">
                              /hr
                            </span>
                          </h2>
                        </div>
                      </div>

                      {plan.highlight && (
                        <span className="rounded-full border border-[#5E8B15] bg-[#2B3F13] px-4 py-2 text-sm font-medium text-[#B8FF3B]">
                          Peak Hours
                        </span>
                      )}
                    </div>

                    <p className="mt-6 text-base font-medium text-white">
                      {plan.time}
                    </p>

                    <p className="mt-5 text-[15px] leading-8 text-[#94A3B8]">
                      {plan.note}
                    </p>

                    <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm text-[#94A3B8]">Best fit</p>
                      <p className="mt-2 text-sm leading-7 text-[#D7DEE7]">
                        {plan.label === "Morning"
                          ? "Players who want the lowest rate and a quieter session."
                          : plan.label === "Day"
                            ? "Groups looking for a balanced slot without peak-hour pressure."
                            : "Teams who want the strongest match atmosphere in prime hours."}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link href="/book">
                        <Button
                          className={`w-full rounded-[999px] py-4 text-base ${
                            plan.highlight
                              ? "shadow-[0_14px_34px_rgba(184,255,59,0.22)]"
                              : ""
                          }`}
                          variant={plan.highlight ? "primary" : "secondary"}
                        >
                          Select This Time
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.24}>
          <SectionHeading
            eyebrow="Before you book"
            title="What the pricing page should answer immediately."
            text="Users usually want to know how pricing works, what kind of duration is supported, and whether payment happens online or later."
          />
        </FadeIn>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pricingHighlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={0.28 + index * 0.06}>
                <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-[4px] hover:border-white/14">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[6deg]">
                      <Icon size={20} strokeWidth={1.9} />
                    </div>

                    <h2 className="mt-6 text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                      {item.title}
                    </h2>

                    <p className="mt-4 text-[15px] leading-8 text-[#94A3B8]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container pb-16 md:pb-24">
        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <FadeIn delay={0.34}>
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Common questions
                </p>
                <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[2.8rem]">
                  The answers most players want before booking.
                </h2>

                <div className="mt-7 space-y-3">
                  {faqs.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                          <CheckCircle2 size={18} />
                        </div>
                        <div>
                          <p className="text-base font-medium text-white">
                            {item.question}
                          </p>
                          <p className="mt-2 text-[15px] leading-8 text-[#94A3B8]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Ready to reserve?
                </p>
                <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[2.8rem]">
                  Pick the right time band, then book in just a few steps.
                </h2>

                <p className="mt-5 text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  The pricing page should help users decide quickly. Once the
                  timing feels right, the booking flow takes over with a clean
                  date, slot, and confirmation experience.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book">
                    <Button className="w-full rounded-[999px] px-7 py-[16px] sm:w-auto">
                      Go to Booking
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="secondary"
                      className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-7 py-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] sm:w-auto"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
