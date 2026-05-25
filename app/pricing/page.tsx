import Link from "next/link";
import { ArrowRight, CalendarDays, Sun, Cloud, Moon } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";

/* ── data ────────────────────────────────────────────────────── */

// 15-hour operating window: 7 AM – 10 PM
// flex values are proportional to hours in each band (3 : 7 : 5)
const BANDS = [
  {
    n: "01",
    label: "Morning",
    hours: "7 AM – 10 AM",
    rate: "800",
    note: "Quieter session, the lowest rate, and the most flexible availability.",
    color: "#F5C76A",
    band: "morning",
    flex: 3,
    labelLeft: 10,
    peak: false,
  },
  {
    n: "02",
    label: "Day",
    hours: "10 AM – 5 PM",
    rate: "1,000",
    note: "Balanced demand. A good window for groups and weekday sessions.",
    color: "#7DD3FC",
    band: "day",
    flex: 7,
    labelLeft: 43,
    peak: false,
  },
  {
    n: "03",
    label: "Evening",
    hours: "5 PM – 10 PM",
    rate: "1,200",
    note: "Prime hours. Strongest atmosphere, highest demand, every night.",
    color: "#B8FF3B",
    band: "evening",
    flex: 5,
    labelLeft: 83,
    peak: true,
  },
] as const;

const BAND_ICON = { morning: Sun, day: Cloud, evening: Moon } as const;

const INCLUDES = [
  { title: "Full-size pitch",       sub: "Floodlit through to 10 PM every day." },
  { title: "Café access",           sub: "Indoors, open the same hours as the pitch." },
  { title: "1 or 2 hour blocks",    sub: "Continuous slots at the same band rate." },
  { title: "Open game option",      sub: "Let other signed-in players join your slot." },
] as const;

const STEPS = [
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
] as const;

const FAQS = [
  {
    q: "What decides the price?",
    a: "Only the time of day. Morning is the lowest, daytime is mid-range, and evening is peak. The rate is the same every day of the week — no weekend surcharges.",
  },
  {
    q: "Do I pay when I book?",
    a: "No. The site reserves your slot and payment is collected at the venue when you arrive. Card and cash both accepted.",
  },
  {
    q: "Can I book for two hours?",
    a: "Yes. In the booking flow you can choose one or two continuous hours at the same band rate.",
  },
  {
    q: "Can I change or cancel a booking?",
    a: "Yes — from your account page up until the slot starts. Since payment is at the venue, there's nothing to refund.",
  },
] as const;

/* ── component ───────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="container pt-12 pb-10 md:pt-20 md:pb-16">
        <FadeIn>
          <span className="eyebrow">Pricing</span>

          <h1
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.6rem,6.8vw,5.8rem)",
              lineHeight: 0.94,
              letterSpacing: "-0.055em",
              color: "var(--fg)",
              marginTop: "1.1rem",
              maxWidth: "14ch",
            }}
          >
            Three windows.<br />One flat rate each.
          </h1>

          <p
            style={{
              marginTop: "1.5rem",
              maxWidth: "46ch",
              fontSize: "17px",
              lineHeight: 1.75,
              color: "var(--fg-3)",
            }}
          >
            Price changes only by time of day. Pick the window, understand the
            rate, book in under a minute.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-primary btn-lg">
              <CalendarDays size={15} />
              Book a slot
              <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
            </Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Ask a question
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 2.5rem",
              fontFamily: "var(--f-mono)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-dim)",
            }}
          >
            <span>Time-based only</span>
            <span>1 or 2 hours</span>
            <span>Pay at venue</span>
            <span>Same rate every day</span>
          </div>
        </FadeIn>
      </section>

      {/* ── DAY TIMELINE ─────────────────────────────────────── */}
      <section className="container pb-4">
        <FadeIn delay={0.08}>
          <div className="day-timeline" aria-label="Pricing bands across the operating day">

            {/* Band name labels above the bar */}
            <div className="day-timeline-labels" aria-hidden="true">
              {BANDS.map((b) => (
                <span
                  key={b.label}
                  className="day-timeline-seg-label"
                  style={{ left: `${b.labelLeft}%`, color: b.color }}
                >
                  {b.label}{b.peak ? " · Peak" : ""}
                </span>
              ))}
            </div>

            {/* Colored proportional bar */}
            <div className="day-timeline-track">
              {BANDS.map((b) => (
                <div
                  key={b.label}
                  className="day-timeline-seg"
                  style={{ flex: b.flex, background: b.color }}
                  title={`${b.label}: ${b.hours}`}
                />
              ))}
            </div>

            {/* Time axis below */}
            <div className="day-timeline-axis" aria-hidden="true">
              {(["7 AM", "10 AM", "5 PM", "10 PM"] as const).map((t, i) => (
                <span
                  key={t}
                  className="day-timeline-tick"
                  style={{ left: ["0%", "20%", "66.7%", "100%"][i] }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── RATE CARDS ───────────────────────────────────────── */}
      <section className="container pb-16 md:pb-20">
        <div className="price-bands-grid">
          {BANDS.map((band, i) => {
            const Icon = BAND_ICON[band.band];
            return (
              <FadeIn key={band.label} delay={i * 0.12} className={`price-band-card ${band.band}`}>
                <div className="price-band-top">
                  <span className="price-band-n">{band.n}</span>
                  {band.peak && <span className="price-band-peak">PEAK</span>}
                </div>
                <div className="price-band-icon"><Icon size={20} /></div>
                <p className="price-band-name">{band.label}</p>
                <p className="price-band-hours">{band.hours}</p>
                <p className="price-band-note">{band.note}</p>
                <div className="price-band-bottom">
                  <div className="price-band-price">
                    <span className="price-band-currency">NPR</span>
                    <span className="price-band-amount">{band.rate}</span>
                    <span className="price-band-unit">/hr</span>
                  </div>
                  <Link
                    href="/book"
                    className={`btn btn-lg ${band.peak ? "btn-primary" : "btn-ghost"}`}
                  >
                    Book
                    <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ── IN EVERY BOOKING ─────────────────────────────────── */}
      <section className="container pb-16 md:pb-20">
        <FadeIn>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--f-sans)",
                fontWeight: 600,
                fontSize: "clamp(1.8rem,3.2vw,2.8rem)",
                letterSpacing: "-0.04em",
                color: "var(--fg)",
                margin: 0,
              }}
            >
              In every booking.
            </h2>
            <span
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg-dim)",
              }}
            >
              All rates · No hidden fees
            </span>
          </div>

          <div className="includes-grid">
            {INCLUDES.map((item) => (
              <div key={item.title} className="includes-item">
                <div className="includes-item-title">{item.title}</div>
                <div className="includes-item-sub">{item.sub}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="container pb-16 md:pb-20">
        <FadeIn>
          <span className="eyebrow" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
            How it works
          </span>
          <h2
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem,3.2vw,2.8rem)",
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              marginTop: "0.8rem",
            }}
          >
            Pick, reserve, show up.
          </h2>
        </FadeIn>

        <div
          style={{
            marginTop: "2.5rem",
            maxWidth: "640px",
          }}
        >
          {STEPS.map((step, i) => (
            <FadeIn key={step.n} delay={0.08 + i * 0.06}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr",
                  gap: "0 1.5rem",
                  padding: "1.75rem 0",
                  borderTop: "1px solid var(--line)",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    color: "var(--fg-dim)",
                    paddingTop: "3px",
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "var(--fg)",
                      lineHeight: 1.35,
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "15px",
                      lineHeight: 1.75,
                      color: "var(--fg-3)",
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="container pb-16 md:pb-20">
        <FadeIn>
          <span className="eyebrow" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
            Before you book
          </span>
          <h2
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem,3.2vw,2.8rem)",
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              marginTop: "0.8rem",
            }}
          >
            Common questions.
          </h2>
        </FadeIn>

        <div style={{ marginTop: "2.5rem", maxWidth: "58ch" }}>
          {FAQS.map((item, i) => (
            <FadeIn key={item.q} delay={0.08 + i * 0.05}>
              <div
                style={{
                  padding: "1.75rem 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: "var(--fg)",
                  }}
                >
                  {item.q}
                </p>
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "var(--fg-3)",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </FadeIn>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────── */}
      <section className="container pb-20 md:pb-28">
        <FadeIn delay={0.08}>
          <div className="cta-strip">
            <div>
              <h2
                style={{
                  fontFamily: "var(--f-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(2rem,4.5vw,3.4rem)",
                  letterSpacing: "-0.055em",
                  color: "var(--fg)",
                  lineHeight: 1.02,
                  margin: 0,
                }}
              >
                Ready to reserve?
              </h2>
              <p style={{ marginTop: "0.625rem", fontSize: "15px", color: "var(--fg-3)" }}>
                Pick your slot and lock in your next game.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", flexShrink: 0 }}>
              <Link href="/book" className="btn btn-primary btn-lg">
                <CalendarDays size={15} />
                Book now
                <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
              </Link>
              <Link href="/contact" className="btn btn-ghost btn-lg">
                Contact us
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
