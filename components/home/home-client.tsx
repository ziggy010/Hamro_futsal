"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";

/* ── static data ─────────────────────────────────────────────────── */
const ROTATE_WORDS = ["Bhaktapur", "matchday", "evenings", "5-a-side", "twilight"];

const STEPS = [
  {
    n: "01",
    label: "Pick your slot",
    text: "Choose a date and time. Morning, Day, or Evening — each has a flat hourly rate.",
  },
  {
    n: "02",
    label: "Reserve online",
    text: "Lock the slot for your squad, or open it for other players to join. No payment yet.",
  },
  {
    n: "03",
    label: "Show up and play",
    text: "Your slot is held. Pay on arrival at the venue — card or cash, your call.",
  },
];

const RATES = [
  { band: "morning", label: "Morning", time: "7 AM – 10 AM", rate: "800",   peak: false },
  { band: "day",     label: "Day",     time: "10 AM – 5 PM", rate: "1,000", peak: false },
  { band: "evening", label: "Evening", time: "5 PM – 10 PM", rate: "1,200", peak: true  },
] as const;

const BAND_COLOR: Record<string, string> = {
  morning: "#F5C76A",
  day:     "#7DD3FC",
  evening: "#B8FF3B",
};

const CAFE_POINTS = [
  "Coffee and snacks all day, same hours as the pitch.",
  "Indoor seating with a view onto the court.",
  "A proper spot for a debrief after the final whistle.",
];

const QUICK_SLOTS = [
  { time: "7 PM", meta: "NPR 1,200", taken: false },
  { time: "8 PM", meta: "NPR 1,200", taken: false },
  { time: "9 PM", meta: "NPR 1,200", taken: true  },
];

const MARQUEE_ITEMS = [
  <><span className="star">★</span> Bhaktapur · Nepal</>,
  <>Futsal &amp; café — est. 2024</>,
  <><span className="star">★</span> Daily 7 AM — 10 PM</>,
  <>Open games every evening</>,
  <><span className="star">★</span> Floodlit pitch — clean turf</>,
  <>Pay at venue · NPR 800 / hr</>,
];

/* ── count-up hook ───────────────────────────────────────────────── */
function useCountUp(target: number, frames = 60) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let f = 0;
    const tick = () => {
      f++;
      const eased = 1 - Math.pow(1 - Math.min(1, f / frames), 3);
      setValue(Math.round(target * eased));
      if (f < frames) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, frames]);
  return value;
}

/* ── component ───────────────────────────────────────────────────── */
export default function HomeClient() {
  /* live clock */
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const h = now.getHours();
  const isOpen = h >= 7 && h < 22;
  const fmtTime = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  /* rotating word */
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATE_WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);
  const longestWord = ROTATE_WORDS.reduce((a, b) => (b.length > a.length ? b : a));

  /* count-up stats */
  const openCount     = useCountUp(7);
  const bookingsToday = useCountUp(24);

  return (
    <main>

      {/* ── CINEMATIC HERO ─────────────────────────────────────────── */}
      <section className="home-hero">

        {/* background photo — uses img tag so Ken Burns inset works */}
        <div className="home-hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-player.jpg" alt="" className="home-hero-bg-img" />
        </div>

        <div className="home-hero-content container">
          <div>
            {/* top row: status pill + coordinates */}
            <div className="home-hero-top">
              <div className="live">
                <span className="pulse" />
                <span className="label">{isOpen ? "Open now" : "Closed"}</span>
                <span className="sep" />
                <span className="time">{fmtTime} · Bhaktapur</span>
              </div>
              <div className="home-hero-marker">
                <span className="corner"><i /><i /></span>
                27.6722° N — 85.4298° E
              </div>
            </div>

            {/* headline + CTA */}
            <div className="home-hero-headline-wrap">
              <h1 className="home-hero-headline">
                <span className="line">
                  <span className="line-inner">Futsal &amp; café</span>
                </span>
                <span className="line">
                  <span className="line-inner">
                    in&nbsp;
                    <span className="home-hero-rotator">
                      {ROTATE_WORDS.map((w, i) => (
                        <span
                          key={w}
                          className={`home-hero-rotator-word${i === wordIdx ? " is-active" : ""}`}
                          aria-hidden={i !== wordIdx}
                        >
                          {w}.
                        </span>
                      ))}
                      {/* invisible sizer holds the rotator's width to the longest word */}
                      <span className="home-hero-rotator-sizer" aria-hidden="true">
                        {longestWord}.
                      </span>
                    </span>
                  </span>
                </span>
              </h1>

              <p className="home-hero-sub">
                Book a slot online, show up ready. Clean turf, flat hourly
                pricing, and a café for before and after the game.
              </p>

              <div className="home-hero-cta">
                <Link href="/book" className="btn btn-primary btn-lg">
                  <CalendarDays size={15} />
                  Book a slot
                  <span className="arrow"><ArrowRight size={14} /></span>
                </Link>
                <Link href="/pricing" className="btn btn-ghost btn-lg">
                  View pricing
                </Link>
              </div>
            </div>
          </div>

          {/* bottom rail: readouts + quick-book card */}
          <div className="home-hero-bottom">
            <div className="hero-readouts">
              <div className="hero-readout">
                <div className="hero-readout-label">Open slots today</div>
                <div className="hero-readout-value">
                  <span style={{ color: "var(--accent)" }}>{openCount}</span>
                  <span style={{ color: "var(--fg-dim)", fontWeight: 500 }}> / 15</span>
                </div>
                <div className="hero-readout-sub">Updated just now</div>
              </div>
              <div className="hero-readout">
                <div className="hero-readout-label">Booked today</div>
                <div className="hero-readout-value">{bookingsToday}</div>
                <div className="hero-readout-sub">Across all bands</div>
              </div>
              <div className="hero-readout">
                <div className="hero-readout-label">From</div>
                <div className="hero-readout-value">
                  <span style={{ fontSize: "0.55em", color: "var(--fg-dim)", fontWeight: 500, letterSpacing: 0, marginRight: 4 }}>NPR</span>
                  800
                  <span style={{ fontSize: "0.55em", color: "var(--fg-dim)", fontWeight: 500, letterSpacing: 0, marginLeft: 4 }}>/hr</span>
                </div>
                <div className="hero-readout-sub">Morning band, flat</div>
              </div>
            </div>

            <div className="hero-quickbook">
              <div className="hero-quickbook-head">
                <span className="hero-quickbook-title">Quick book · tonight</span>
                <span className="hero-quickbook-meta">5 PM – 10 PM · peak</span>
              </div>
              <div className="hero-quickbook-slots">
                {QUICK_SLOTS.map((s) => (
                  <div key={s.time} className={`hero-quickbook-slot peak${s.taken ? " taken" : ""}`}>
                    <div className="hero-quickbook-slot-time">{s.time}</div>
                    <div className="hero-quickbook-slot-meta">{s.taken ? "Taken" : s.meta}</div>
                  </div>
                ))}
              </div>
              <div className="hero-quickbook-foot">
                <span>Pay at venue · card or cash</span>
                <Link href="/book" className="btn-text" style={{ fontSize: 12 }}>
                  See all slots <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* scrolling marquee at very bottom of hero */}
        <div className="home-hero-marquee" aria-hidden="true">
          <div className="home-hero-marquee-track">
            {[0, 1].map((dup) =>
              MARQUEE_ITEMS.map((item, i) => (
                <span key={`${dup}-${i}`} className="home-hero-marquee-item">
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        {/* animated scroll cue */}
        <div className="home-hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="home-hero-scroll-line" />
        </div>
      </section>

      {/* ── FACTS STRIP ────────────────────────────────────────────── */}
      <section style={{ paddingTop: "clamp(64px,7vw,100px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <FadeIn>
          <div className="container">
            <div className="facts">
              {[
                { value: "7 AM",     label: "Opens daily" },
                { value: "10 PM",    label: "Last slot" },
                { value: "800 NPR",  label: "From per hour" },
                { value: "1–2 hr",   label: "Booking duration" },
              ].map((f) => (
                <div className="fact" key={f.label}>
                  <div className="fact-value">{f.value}</div>
                  <div className="fact-label">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section style={{ paddingBottom: "clamp(64px,7vw,112px)" }}>
        <FadeIn>
          <div
            className="container"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 40 }}
          >
            <div>
              <span className="eyebrow eyebrow--accent" style={{ marginBottom: 16, display: "inline-flex" }}>
                <span className="num">01</span>
                How booking works
              </span>
              <h2 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(38px,5.4vw,72px)", margin: "16px 0 0" }}>
                Three steps.<br />That&rsquo;s the whole flow.
              </h2>
            </div>
            <Link href="/book" className="btn-text">
              Start booking <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="container">
            <div className="steps">
              {STEPS.map((s) => (
                <div className="step" key={s.n}>
                  <div className="step-num">{s.n}</div>
                  <div className="step-title">{s.label}</div>
                  <div className="step-text">{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FULL-BLEED PITCH ───────────────────────────────────────── */}
      <FadeIn>
        <div className="pitch-full">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80"
            alt="Floodlit pitch at night"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* gradient fade to page colour */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(8,9,12,.2) 40%,#08090c 100%)", zIndex: 1 }} />
          {/* label overlay */}
          <div
            className="container"
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", paddingBottom: "clamp(40px,6vw,80px)", zIndex: 2 }}
          >
            <div>
              <span className="eyebrow eyebrow--accent" style={{ display: "inline-flex", marginBottom: 16 }}>
                <span className="dot" /> The pitch
              </span>
              <div style={{ maxWidth: "16ch", fontSize: "clamp(36px,4.8vw,64px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.98, color: "#F5F7FB", textShadow: "0 4px 24px rgba(0,0,0,.5)" }}>
                Full-size turf, lit through to 10 PM.
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── PRICING INLINE ─────────────────────────────────────────── */}
      <section style={{ paddingBlock: "clamp(64px,7vw,112px)" }}>
        <FadeIn>
          <div
            className="container"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 40 }}
          >
            <div>
              <span className="eyebrow eyebrow--accent" style={{ marginBottom: 16, display: "inline-flex" }}>
                <span className="num">02</span>
                Pricing at a glance
              </span>
              <h2 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(38px,5.4vw,72px)", margin: "16px 0 0" }}>
                One flat rate<br />by time of day.
              </h2>
            </div>
            <Link href="/pricing" className="btn-text">
              See full pricing <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="container">
            <div className="pricing-inline">
              {RATES.map((r) => (
                <div key={r.band} className={`pricing-inline-row${r.peak ? " peak" : ""}`}>
                  <div className={`cell-band ${r.band}`}>
                    <span className="band-dot" style={{ background: BAND_COLOR[r.band] }} />
                    {r.label}
                    {r.peak && <span className="peak-tag">PEAK</span>}
                  </div>
                  <div className="cell-time">{r.time}</div>
                  <div className={`cell-rate${r.peak ? " peak" : ""}`}>
                    <span className="npr">NPR</span>{r.rate}
                  </div>
                  <div className="cell-cta">
                    <Link href="/book" className={`btn ${r.peak ? "btn-primary" : "btn-ghost"} btn-sm`}>
                      Book <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── CAFÉ ───────────────────────────────────────────────────── */}
      <section style={{ paddingBottom: "clamp(64px,7vw,112px)" }}>
        <div className="container">
          <div className="cafe-grid">
            <FadeIn>
              <div className="cafe-photo">
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80"
                  alt="Hamro Café"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="cafe-tag">
                  <span className="dot" />
                  Hamro Café
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <span className="eyebrow eyebrow--accent" style={{ marginBottom: 16, display: "inline-flex" }}>
                  <span className="num">03</span>
                  The café
                </span>
                <h2 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(38px,5.4vw,72px)", margin: "16px 0 0" }}>
                  Come for the game.<br />Stay for the café.
                </h2>
                <p style={{ marginTop: 24, fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.6, color: "var(--fg-3)", maxWidth: "56ch" }}>
                  Coffee, snacks, and a place to sit — built for the part of the
                  day around the game, not just the match itself.
                </p>
                <ul className="cafe-points">
                  {CAFE_POINTS.map((pt, i) => (
                    <li key={i}>
                      <b>0{i + 1}</b>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
                  <Link href="/book" className="btn btn-primary btn-lg">Book a slot</Link>
                  <Link href="/contact" className="btn btn-ghost btn-lg">Get directions</Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────────────────────── */}
      <section style={{ paddingBottom: "clamp(64px,7vw,112px)" }}>
        <FadeIn>
          <div className="container">
            <div className="cta-strip">
              <div>
                <h2 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(38px,5.4vw,72px)", margin: 0 }}>
                  Ready to play?
                </h2>
                <p style={{ color: "var(--fg-3)", fontSize: 15, marginTop: 16 }}>
                  Bhaktapur · Open daily 7 AM – 10 PM
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/book" className="btn btn-primary btn-lg">
                  <CalendarDays size={15} />
                  Book now
                  <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Get directions
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
