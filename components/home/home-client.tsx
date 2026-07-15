"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";

/* ── static data ─────────────────────────────────────────────────── */
const ROTATE_WORDS = ["belongs", "gathers", "stays", "wins", "breathes", "lives"];

const FEATURES = [
  { n: "01", label: "Floodlit pitch",  sub: "5-a-side · clean turf · open till 10", x: 26, y: 26 },
  { n: "02", label: "Café terrace",    sub: "Rooftop · coffee & snacks",             x: 52, y: 34 },
  { n: "03", label: "Garden lounge",   sub: "Pre-match chill · string lights",       x: 42, y: 64 },
  { n: "04", label: "Tennis & track",  sub: "Sister courts · ring track",            x: 74, y: 62 },
];

const QUICK_SLOTS = [
  { time: "7 PM", meta: "NPR 1,200", taken: false },
  { time: "8 PM", meta: "NPR 1,200", taken: false },
  { time: "9 PM", meta: "NPR 1,200", taken: true  },
];

const STEPS = [
  { n: "01", label: "Pick your slot",    text: "Choose any available time. Every slot is NPR 1,200 per hour." },
  { n: "02", label: "Reserve online",    text: "Lock the slot for your squad, or open it for other players to join. No payment yet." },
  { n: "03", label: "Show up and play",  text: "Your slot is held. Pay on arrival at the venue — card or cash, your call." },
];

const CAFE_POINTS = [
  "Coffee and snacks all day, same hours as the pitch.",
  "Indoor seating with a view onto the court.",
  "A proper spot for a debrief after the final whistle.",
];

const MARQUEE_ITEMS = [
  <><span className="star">★</span> Bhaktapur · Nepal</>,
  <>Futsal &amp; café — est. 2024</>,
  <><span className="star">★</span> Daily 7 AM — 10 PM</>,
  <>Open games every evening</>,
  <><span className="star">★</span> Floodlit pitch — clean turf</>,
  <>Pay at venue · NPR 1,200 / hr</>,
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

/* ── firefly seed helper ─────────────────────────────────────────── */
function seedRand(i: number) {
  return (i * 9301 + 49297) % 233280;
}

/* ── AerialMonitor ───────────────────────────────────────────────── */
function AerialMonitor() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((i) => (i + 1) % FEATURES.length), 3200);
    return () => clearInterval(id);
  }, [auto]);

  const fireflies = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const s = seedRand(i);
        return {
          left: s % 100,
          top: (s * 7) % 100,
          dur: 6 + ((s * 3) % 80) / 10,
          delay: (s % 50) / 10,
          size: 1.6 + ((s * 5) % 30) / 10,
        };
      }),
    []
  );

  const a = FEATURES[active];
  return (
    <div className="hero-aerial">
      {/* photo frame */}
      <div className="hero-aerial-frame" onMouseLeave={() => setAuto(true)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/aerial-twilight.jpg"
          alt="Aerial view of Hamro Futsal at twilight"
          className="hero-aerial-photo"
        />

        <div className="hero-aerial-warm" aria-hidden="true" />
        <div className="hero-aerial-grid" aria-hidden="true" />

        {/* fireflies */}
        <div className="hero-aerial-fireflies" aria-hidden="true">
          {fireflies.map((f, i) => (
            <span
              key={i}
              className="firefly"
              style={{
                left: `${f.left}%`, top: `${f.top}%`,
                width: `${f.size}px`, height: `${f.size}px`,
                animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`,
              }}
            />
          ))}
        </div>

        {/* moving accent spot */}
        <span
          className={`hero-aerial-spot${a.y > 48 ? " flip-y" : ""}${a.x > 58 ? " flip-x" : ""}`}
          style={{ left: `${a.x}%`, top: `${a.y}%` }}
          aria-hidden="true"
        >
          <span className="hero-aerial-spot-dot" />
          <span className="hero-aerial-spot-ring" />
          <span className="hero-aerial-spot-ring r2" />
          <span className="hero-aerial-spot-tag">
            <b>{a.n}</b>
            <span>{a.label}</span>
          </span>
        </span>

      </div>

      {/* feature list + quickbook */}
      <div className="hero-aerial-list">
        <div className="hero-aerial-list-head">
          <span>The grounds</span>
          <span className="hero-aerial-list-count">04</span>
        </div>
        {FEATURES.map((f, i) => (
          <Link
            key={f.n}
            href="/book"
            className={`hero-aerial-item${i === active ? " on" : ""}`}
            onMouseEnter={() => { setActive(i); setAuto(false); }}
          >
            <span className="hero-aerial-item-n">{f.n}</span>
            <span className="hero-aerial-item-text">
              <b>{f.label}</b>
              <em>{f.sub}</em>
            </span>
            <span className="hero-aerial-item-arr">
              <ArrowRight size={12} />
            </span>
          </Link>
        ))}

        <div className="hero-aerial-quickbook">
          <div className="hero-aerial-qb-head">
            <span><b>Tonight</b> · 5 PM – 10 PM</span>
            <span className="hero-aerial-qb-peak">NPR 1,200 / HR</span>
          </div>
          <div className="hero-aerial-qb-slots">
            {QUICK_SLOTS.map((s) => (
              <Link
                key={s.time}
                href={s.taken ? "#" : "/book"}
                className={`hero-aerial-qb-slot${s.taken ? " taken" : ""}`}
                aria-disabled={s.taken}
              >
                <span className="t">{s.time}</span>
                <span className="m">{s.taken ? "Taken" : s.meta}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── main component ──────────────────────────────────────────────── */
export default function HomeClient() {
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

      {/* ── ALMANAC HERO ───────────────────────────────────────────── */}
      <section className="home-hero">

        {/* almanac grid: left editorial + right aerial */}
        <div className="container hero-almanac-grid">

          {/* left editorial column */}
          <div className="hero-left">
            <h1 className="hero-display">
              <span className="hero-display-line">
                <span className="hero-display-inner">Where Bhaktapur</span>
              </span>
              <span className="hero-display-line">
                <span className="hero-display-inner">
                  plays, eats,
                </span>
              </span>
              <span className="hero-display-line">
                <span className="hero-display-inner">
                  and{" "}
                  <span className="hero-rotator-slot">
                    {ROTATE_WORDS.map((w, i) => (
                      <span
                        key={w}
                        className={`hero-rotator-w${i === wordIdx ? " on" : ""}`}
                        aria-hidden={i !== wordIdx}
                      >
                        {w}.
                      </span>
                    ))}
                    <span className="hero-rotator-sizer" aria-hidden="true">
                      {longestWord}.
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            <div className="hero-cta-row">
              <Link href="/book" className="btn btn-primary btn-lg">
                <CalendarDays size={15} />
                Book a slot
                <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
              </Link>
              <Link href="/games" className="btn btn-ghost btn-lg">
                View games
              </Link>
            </div>

            <dl className="hero-stats">
              <div className="hero-stat">
                <dt>Open slots</dt>
                <dd><b>{openCount}</b><span> / 15</span></dd>
              </div>
              <div className="hero-stat">
                <dt>Booked today</dt>
                <dd><b>{bookingsToday}</b></dd>
              </div>
              <div className="hero-stat">
                <dt>Rate / hr</dt>
                <dd><span className="npr">NPR</span><b>1,200</b></dd>
              </div>
            </dl>
          </div>

          {/* right: aerial monitor */}
          <AerialMonitor />
        </div>

        {/* ambient marquee */}
        <div className="home-hero-marquee" aria-hidden="true">
          <div className="home-hero-marquee-track">
            {[0, 1].map((dup) =>
              MARQUEE_ITEMS.map((item, i) => (
                <span key={`${dup}-${i}`} className="home-hero-marquee-item">{item}</span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── FACTS STRIP ────────────────────────────────────────────── */}
      <section style={{ paddingTop: "clamp(64px,7vw,100px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <div className="container">
          <div className="facts">
            {[
              { value: "7 AM",   label: "Opens daily" },
              { value: "10 PM",  label: "Last slot" },
              { value: <>1,200<span style={{ fontSize: "0.45em", color: "var(--fg-dim)", marginLeft: 6, fontWeight: 500, letterSpacing: 0 }}>NPR</span></>, label: "Flat rate per hour" },
              { value: "1–2 hr", label: "Booking duration" },
            ].map((f, i) => (
              <FadeIn key={i} delay={0.06 * i}>
                <div className="fact">
                  <div className="fact-value">{f.value}</div>
                  <div className="fact-label">{f.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
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

        <div className="container">
          <div className="steps">
            {STEPS.map((s, i) => (
              <FadeIn key={s.n} delay={0.08 + i * 0.14} className="step">
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.label}</div>
                <div className="step-text">{s.text}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED PITCH ───────────────────────────────────────── */}
      <FadeIn>
        <div className="pitch-full">
          <Image
            src="/pitch-night.jpg"
            alt="Floodlit pitch at night"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(270deg,rgba(8,9,12,.72) 28%,rgba(8,9,12,.1) 70%)", zIndex: 1 }} />
          <div
            className="container"
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", paddingBottom: "clamp(40px,6vw,80px)", zIndex: 2 }}
          >
            <div style={{ textAlign: "right" }}>
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

      {/* ── CAFÉ ───────────────────────────────────────────────────── */}
      <section style={{ paddingBlock: "clamp(64px,7vw,112px)" }}>
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
                <div className="cafe-points" role="list">
                  {CAFE_POINTS.map((pt, i) => (
                    <FadeIn key={i} delay={0.1 + i * 0.1}>
                      <div className="cafe-point" role="listitem">
                        <b>0{i + 1}</b>
                        <span>{pt}</span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
                  <Link href="/book" className="btn btn-primary btn-lg">
                    Book a slot
                    <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                  </Link>
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
                  <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Get directions
                  <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
