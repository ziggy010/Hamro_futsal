import Image from "next/image";
import Link from "next/link";
import { Phone, Navigation } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";

const faqs = [
  {
    q: "Do I need to pay online first?",
    a: "No. Bookings are reserved online, and payment is handled at the venue when you arrive.",
  },
  {
    q: "Can I create an open game?",
    a: "Yes. During booking, choose the open game option so other signed-in players can join your session.",
  },
  {
    q: "Where exactly are you located?",
    a: "In Bhaktapur, near Samata School. Call us and we'll guide you directly from wherever you are.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero — raw editorial, no card ── */}
      <section className="container pt-12 pb-14 md:pt-20 md:pb-16">
        <FadeIn>
          <span className="eyebrow">Contact</span>
          <h1
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.6rem,6.5vw,5.8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              color: "var(--fg)",
              marginTop: "1.1rem",
              maxWidth: "12ch",
            }}
          >
            Find us.<br />Let&apos;s talk.
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
            Questions about bookings, venue hours, or directions — reach us
            directly. We&apos;re in Bhaktapur, near Samata School, open every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book">
              <button className="btn btn-primary">Book a slot</button>
            </Link>
            <a href="tel:9813110577">
              <button className="btn btn-ghost">
                <Phone size={15} />
                9813110577
              </button>
            </a>
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
              fontSize: "13px",
              color: "var(--fg-dim)",
              fontFamily: "var(--f-mono)",
              letterSpacing: "0.04em",
            }}
          >
            <span>Bhaktapur · near Samata School</span>
            <span>7 AM – 10 PM daily</span>
            <span>9813110577</span>
          </div>
        </FadeIn>
      </section>

      {/* ── Venue — raw two-col layout, no card wrappers ── */}
      <section className="container pb-16 md:pb-20">
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
              gap: "3rem 4rem",
              alignItems: "center",
            }}
          >
            {/* Details */}
            <div>
              <span className="eyebrow">The venue</span>
              <h2
                style={{
                  fontFamily: "var(--f-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(1.9rem,3vw,2.6rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--fg)",
                  marginTop: "0.9rem",
                  lineHeight: 1.08,
                }}
              >
                Come for the game,<br />stay for the café.
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "var(--fg-3)",
                  maxWidth: "38ch",
                }}
              >
                Floodlit turf, clean facilities, and an on-site café — built for
                players who take matchday seriously.
              </p>

              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  { label: "Location", value: "Bhaktapur, near Samata School" },
                  { label: "Hours", value: "Open daily, 7 AM to 10 PM" },
                  { label: "Phone", value: "9813110577" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      alignItems: "baseline",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--f-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--fg-dim)",
                        minWidth: "72px",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span style={{ fontSize: "15px", color: "var(--fg-2)" }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "2rem" }}>
                <a
                  href="https://maps.google.com/?q=Bhaktapur+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn btn-ghost">
                    <Navigation size={14} />
                    Get directions
                  </button>
                </a>
              </div>
            </div>

            {/* Photo — no card wrapper */}
            <div
              style={{
                position: "relative",
                height: "360px",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80"
                alt="Futsal court at the Bhaktapur venue"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Map ── */}
      <section id="map" className="container pb-16 md:pb-20">
        <FadeIn>
          <div
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span className="eyebrow">Find us</span>
            <span
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
                color: "var(--fg-dim)",
              }}
            >
              27.6722° N · 85.4298° E
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ borderRadius: "16px", overflow: "hidden" }}>
            <svg
              viewBox="0 0 1320 640"
              style={{ display: "block", width: "100%", height: "auto" }}
              aria-label="Stylized map of Hamro Futsal location in Bhaktapur"
            >
              <defs>
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                </pattern>
                <radialGradient id="venueGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(184,255,59,0.55)" />
                  <stop offset="60%" stopColor="rgba(184,255,59,0.08)" />
                  <stop offset="100%" stopColor="rgba(184,255,59,0)" />
                </radialGradient>
                <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>

              <rect width="1320" height="640" fill="#11161d" />
              <rect width="1320" height="640" fill="url(#mapGrid)" />

              <g opacity="0.6">
                <path d="M 80 80 Q 220 60 320 140 T 540 200 Q 600 240 540 320 L 360 360 Q 200 340 120 260 Z" fill="#18202a" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                <path d="M 760 60 Q 920 80 1000 160 T 1200 240 Q 1240 320 1180 380 L 940 420 Q 800 380 760 280 Z" fill="#18202a" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                <path d="M 100 420 Q 240 400 380 460 T 580 500 L 540 580 Q 360 600 220 560 L 100 520 Z" fill="#18202a" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                <path d="M 820 480 Q 960 460 1100 510 T 1260 560 L 1240 620 L 880 620 L 820 580 Z" fill="#18202a" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              </g>

              <path d="M -20 360 Q 200 320 380 380 T 720 360 Q 900 340 1100 400 T 1340 380" fill="none" stroke="rgba(210,188,144,0.18)" strokeWidth="14" strokeLinecap="round" />
              <path d="M -20 360 Q 200 320 380 380 T 720 360 Q 900 340 1100 400 T 1340 380" fill="none" stroke="rgba(210,188,144,0.35)" strokeWidth="1.5" strokeDasharray="2 6" />

              <g stroke="rgba(111,125,144,0.55)" fill="none" strokeLinecap="round">
                <path d="M -20 220 Q 280 240 540 220 T 940 250 T 1340 230" strokeWidth="1.4" />
                <path d="M -20 480 Q 220 470 460 490 T 880 470 T 1340 500" strokeWidth="1.4" />
                <path d="M 340 -20 Q 360 180 420 320 T 480 660" strokeWidth="1.4" />
                <path d="M 920 -20 Q 880 180 860 320 T 800 660" strokeWidth="1.4" />
                <path d="M 660 -20 L 660 660" strokeWidth="2.2" strokeOpacity="0.7" />
              </g>

              <g stroke="rgba(111,125,144,0.22)" fill="none" strokeWidth="0.7">
                <path d="M 200 80 L 220 600" />
                <path d="M 760 80 L 740 600" />
                <path d="M 1080 80 L 1100 600" />
                <path d="M -20 140 L 1340 160" />
                <path d="M -20 320 L 1340 340" />
                <path d="M -20 560 L 1340 580" />
                <path d="M 100 100 L 600 540" />
                <path d="M 1200 80 L 820 600" />
              </g>

              <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="10" fill="#94A3B8" letterSpacing="1">
                <text x="200" y="180">SAMATA SCHOOL</text>
                <text x="200" y="194" fontSize="8" fill="#6f7d90">school · 200m</text>
                <text x="980" y="280">DURBAR SQUARE</text>
                <text x="980" y="294" fontSize="8" fill="#6f7d90">heritage · 1.4km</text>
                <text x="180" y="540">BHAKTAPUR HOSP.</text>
                <text x="180" y="554" fontSize="8" fill="#6f7d90">hospital · 900m</text>
                <text x="980" y="540">SURYAVINAYAK</text>
                <text x="980" y="554" fontSize="8" fill="#6f7d90">park · 2.1km</text>
                <text x="40" y="40" fontSize="9" fill="#6f7d90" letterSpacing="2">BHAKTAPUR · 44800</text>
                <text x="1180" y="40" fontSize="9" fill="#6f7d90" letterSpacing="2" textAnchor="end">SECTOR 04</text>
              </g>

              <g transform="translate(1240 90)" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="10" fill="#94A3B8">
                <circle r="22" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                <path d="M 0 -16 L 4 0 L 0 -4 L -4 0 Z" fill="#B8FF3B" />
                <path d="M 0 16 L 4 0 L 0 4 L -4 0 Z" fill="#6f7d90" />
                <text x="0" y="-28" textAnchor="middle" fontSize="9" letterSpacing="1.5">N</text>
              </g>

              <g transform="translate(60 580)" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="9" fill="#94A3B8">
                <line x1="0" y1="0" x2="120" y2="0" stroke="#94A3B8" strokeWidth="1" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="#94A3B8" strokeWidth="1" />
                <line x1="60" y1="-3" x2="60" y2="3" stroke="#94A3B8" strokeWidth="1" />
                <line x1="120" y1="-3" x2="120" y2="3" stroke="#94A3B8" strokeWidth="1" />
                <text x="0" y="18">0</text>
                <text x="60" y="18" textAnchor="middle">250M</text>
                <text x="120" y="18" textAnchor="end">500M</text>
              </g>

              <circle cx="660" cy="320" r="200" fill="url(#venueGlow)" />

              <g fill="none" stroke="#B8FF3B" strokeOpacity="0.4">
                <circle cx="660" cy="320" r="48" strokeWidth="0.7" />
                <circle cx="660" cy="320" r="80" strokeWidth="0.5" strokeOpacity="0.25" />
                <circle cx="660" cy="320" r="120" strokeWidth="0.4" strokeOpacity="0.15" />
              </g>

              <g transform="translate(660 320)">
                <line x1="0" y1="-46" x2="0" y2="-58" stroke="#B8FF3B" strokeWidth="1.2" />
                <line x1="0" y1="-2" x2="0" y2="46" stroke="#B8FF3B" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="2 3" />
                <circle r="14" fill="#B8FF3B" filter="url(#softBlur)" opacity="0.45" />
                <circle r="9" fill="#B8FF3B" />
                <circle r="9" fill="none" stroke="#0B0F14" strokeWidth="2" />
                <circle r="2.4" fill="#0B0F14" />
              </g>

              <g transform="translate(700 270)">
                <rect x="0" y="0" width="220" height="58" rx="10" fill="#18202a" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                <text x="14" y="20" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="9" fill="#B8FF3B" letterSpacing="2">HAMRO FUTSAL</text>
                <text x="14" y="40" fontFamily="ui-serif, Georgia, serif" fontSize="15" fill="#F5F7FB">Bhaktapur · near Samata School</text>
                <text x="14" y="52" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="8" fill="#94A3B8" letterSpacing="1">7AM — 10PM · DAILY</text>
              </g>
            </svg>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                padding: "1.25rem 0",
                borderTop: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: "11px",
                  color: "var(--fg-dim)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0 1.5rem",
                }}
              >
                <span>LAT 27.6722° N</span>
                <span>LNG 85.4298° E</span>
                <span>ELEV 1,401 m</span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a href="https://maps.google.com/?q=Bhaktapur+Nepal" target="_blank" rel="noreferrer">
                  <button className="btn btn-ghost">Open in Maps</button>
                </a>
                <a href="tel:9813110577">
                  <button className="btn btn-ghost">Call for directions</button>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FAQ — divider-separated text, no cards ── */}
      <section className="container pb-16 md:pb-20">
        <FadeIn>
          <span className="eyebrow">FAQ</span>
          <h2
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem,3.2vw,2.8rem)",
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              marginTop: "0.9rem",
            }}
          >
            Common questions.
          </h2>
        </FadeIn>

        <div style={{ marginTop: "2.5rem", maxWidth: "58ch" }}>
          {faqs.map((item, i) => (
            <FadeIn key={item.q} delay={0.08 + i * 0.06}>
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

      {/* ── CTA strip ── */}
      <section className="container pb-20 md:pb-28">
        <FadeIn delay={0.08}>
          <div
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: "3rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--f-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(2rem,4vw,3.2rem)",
                  letterSpacing: "-0.05em",
                  color: "var(--fg)",
                  lineHeight: 1.04,
                }}
              >
                Ready to play?
              </h2>
              <p style={{ marginTop: "0.5rem", fontSize: "15px", color: "var(--fg-3)" }}>
                Pick your slot and lock in the game.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/book">
                <button className="btn btn-primary btn-lg">Book now</button>
              </Link>
              <a href="tel:9813110577">
                <button className="btn btn-ghost btn-lg">Call instead</button>
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
