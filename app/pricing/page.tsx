import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MoonStar,
  SunMedium,
} from "lucide-react";
import Button from "@/components/ui/button";
import FadeIn from "@/components/ui/fade-in";

const bands = [
  {
    n: "01",
    label: "Morning",
    icon: SunMedium,
    hours: "7 AM – 10 AM",
    rate: "800",
    note: "Quieter session, lowest rate, most flexible availability.",
    peak: false,
  },
  {
    n: "02",
    label: "Day",
    icon: Clock3,
    hours: "10 AM – 5 PM",
    rate: "1,000",
    note: "Balanced demand, good for groups and weekday sessions.",
    peak: false,
  },
  {
    n: "03",
    label: "Evening",
    icon: MoonStar,
    hours: "5 PM – 10 PM",
    rate: "1,200",
    note: "Prime hours, strongest atmosphere, highest demand.",
    peak: true,
  },
] as const;

const steps = [
  {
    n: "01",
    label: "Pick your window",
    text: "Morning, Day, or Evening — each has a flat hourly rate. No hidden fees.",
  },
  {
    n: "02",
    label: "Reserve the slot",
    text: "Choose your date and time online. No payment required at this stage.",
  },
  {
    n: "03",
    label: "Pay when you arrive",
    text: "Card and cash both accepted at the venue. One or two hours, your call.",
  },
];

const faqs = [
  {
    q: "What decides the price?",
    a: "Only the time of day. Morning is the lowest, daytime is mid-range, and evening is peak. The rate is the same every day of the week.",
  },
  {
    q: "Do I need to pay online?",
    a: "No. The site reserves your slot and payment is collected at the venue when you arrive.",
  },
  {
    q: "Can I book for two hours?",
    a: "Yes. In the booking flow you can choose one or two continuous hours at the same band rate.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero — raw typography, no card wrapper */}
      <section className="container pt-12 pb-14 md:pt-20 md:pb-20">
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8FF3B]">
            Pricing
          </span>

          <h1 className="mt-5 max-w-[16ch] text-[clamp(2.8rem,7.5vw,6rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white">
            Three windows. One clear rate each.
          </h1>

          <p className="mt-7 max-w-[48ch] text-[17px] leading-[1.75] text-[#94A3B8]">
            Price changes only by time of day. Pick the window, understand the
            rate, and move straight to booking.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/book">
              <Button className="rounded-[999px] px-7 py-[14px] text-[15px]">
                <CalendarDays size={16} />
                Book a slot
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                className="rounded-[999px] px-7 py-[14px] text-[15px]"
              >
                Ask a question
              </Button>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/8 pt-8 text-[14px] text-[#6f7d90]">
            <span>Time-based only</span>
            <span>1 or 2 hours</span>
            <span>Pay at venue</span>
          </div>
        </FadeIn>
      </section>

      {/* Pricing schedule — card layout */}
      <section className="container max-w-[1360px] pb-16 md:pb-20">
        <FadeIn>
          <div className="grid gap-7 lg:grid-cols-3">
            {bands.map((band, i) => {
              const Icon = band.icon;
              return (
                <FadeIn key={band.label} delay={0.07 * (i + 1)}>
                  <div
                    className={`group relative overflow-hidden rounded-[30px] border px-8 py-9 shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-300 md:min-h-[500px] md:px-9 md:py-10 ${
                      band.peak
                        ? "border-[#B8FF3B]/18 bg-[linear-gradient(180deg,rgba(28,36,18,0.82),rgba(13,19,26,0.9))] hover:border-[#B8FF3B]/24 hover:shadow-[0_30px_70px_rgba(184,255,59,0.08)]"
                        : "border-white/8 bg-[linear-gradient(180deg,rgba(17,23,31,0.92),rgba(13,19,26,0.92))] hover:border-white/12 hover:-translate-y-[2px]"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 ${
                        band.peak
                          ? "bg-[radial-gradient(circle_at_top_right,rgba(184,255,59,0.12),transparent_38%)]"
                          : band.label === "Morning"
                            ? "bg-[radial-gradient(circle_at_top_right,rgba(245,199,106,0.12),transparent_34%)]"
                            : "bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_34%)]"
                      }`}
                    />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6f7d90]">
                          {band.n}
                        </span>
                        {band.peak && (
                          <span className="rounded-full border border-[#B8FF3B]/25 bg-[#B8FF3B]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B8FF3B]">
                            Peak
                          </span>
                        )}
                      </div>

                      <div
                        className={`mt-5 inline-flex h-11 w-11 items-center justify-center rounded-[14px] border ${
                          band.peak
                            ? "border-[#B8FF3B]/30 bg-[#B8FF3B]/6 text-[#B8FF3B]"
                            : band.label === "Morning"
                              ? "border-[#F5C76A]/28 bg-[#F5C76A]/6 text-[#F5C76A]"
                              : "border-[#7DD3FC]/28 bg-[#7DD3FC]/6 text-[#7DD3FC]"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={
                            band.peak
                              ? "text-[#B8FF3B]"
                              : band.label === "Morning"
                                ? "text-[#F5C76A]"
                                : "text-[#7DD3FC]"
                          }
                        />
                      </div>

                      <h3
                        className={`mt-6 text-[clamp(2.1rem,3.5vw,3rem)] font-bold leading-[0.98] tracking-[-0.05em] ${
                          band.peak ? "text-[#B8FF3B]" : "text-white"
                        }`}
                      >
                        {band.label}
                      </h3>

                      <p className="mt-3 font-mono text-[13px] uppercase tracking-[0.18em] text-[#8DA0B7]">
                        {band.hours}
                      </p>

                      <p className="mt-7 min-h-[108px] max-w-[28ch] text-[15px] leading-[1.8] text-[#94A3B8]">
                        {band.note}
                      </p>

                      <div className="mt-10 border-t border-white/8 pt-8">
                        <div className="flex flex-col gap-6">
                          <div className="flex items-end gap-2">
                            <span className="pb-1 font-mono text-[13px] uppercase tracking-[0.08em] text-[#73839A]">
                              NPR
                            </span>
                            <span
                              className={`text-[clamp(3rem,4.2vw,4.2rem)] font-bold leading-none tracking-[-0.05em] ${
                                band.peak ? "text-[#B8FF3B]" : "text-white"
                              }`}
                            >
                              {band.rate}
                            </span>
                            <span className="pb-1 text-[15px] text-[#8DA0B7]">/hr</span>
                          </div>

                          <Link href="/book" className="self-start">
                            <Button
                              variant={band.peak ? "primary" : "secondary"}
                              className="min-w-[132px] rounded-[999px] px-7 py-3 text-[15px]"
                            >
                              Book
                              <ArrowRight size={13} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* How it works — numbered strip, no cards */}
      <section className="container pb-16 md:pb-20">
        <FadeIn>
          <h2 className="text-[2rem] font-bold tracking-[-0.04em] text-white md:text-[2.5rem]">
            How it works.
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-0 md:grid-cols-3 md:divide-x md:divide-white/6">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={0.08 * (i + 1)}>
              <div
                className={`border-t border-white/6 py-8 md:border-t-0 ${i > 0 ? "md:pl-10" : ""} ${i < steps.length - 1 ? "md:pr-10" : ""}`}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6f7d90]">
                  {step.n}
                </span>
                <p className="mt-4 text-[17px] font-semibold leading-[1.3] text-white">
                  {step.label}
                </p>
                <p className="mt-2.5 text-[15px] leading-[1.75] text-[#94A3B8]">
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ — dividers only, no cards */}
      <section className="container pb-16 md:pb-20">
        <FadeIn>
          <h2 className="text-[2rem] font-bold tracking-[-0.04em] text-white md:text-[2.8rem]">
            Before you book.
          </h2>
        </FadeIn>

        <div className="mt-10 max-w-[62ch] divide-y divide-white/6">
          {faqs.map((item, i) => (
            <FadeIn key={item.q} delay={0.1 + i * 0.06}>
              <div className="py-7">
                <p className="text-[17px] font-semibold leading-[1.4] text-white">
                  {item.q}
                </p>
                <p className="mt-3 text-[15px] leading-[1.8] text-[#94A3B8]">
                  {item.a}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA strip — border-top only, no card */}
      <section className="container pb-20 md:pb-28">
        <FadeIn delay={0.08}>
          <div className="flex flex-col gap-8 border-t border-white/8 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[2.2rem] font-bold leading-[1.04] tracking-[-0.05em] text-white md:text-[3rem]">
                Ready to reserve?
              </h2>
              <p className="mt-2 text-[15px] text-[#94A3B8]">
                Pick your slot and lock in your next game.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/book">
                <Button className="rounded-[999px] px-8 py-[15px] text-[15px]">
                  <CalendarDays size={16} />
                  Book now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  className="rounded-[999px] px-8 py-[15px] text-[15px]"
                >
                  Contact us
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
