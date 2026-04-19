import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";
import HeroFeatureCarousel from "@/components/home/hero-feature-carousel";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Coffee,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "Fast mobile booking",
    text: "Choose a date, pick one or two continuous hours, and reserve your slot without a messy flow.",
    icon: "zap",
  },
  {
    title: "Premium matchday feel",
    text: "Sharper visuals, cleaner turf, and a better overall feel for casual and competitive games.",
    icon: "sparkles",
  },
  {
    title: "Café + social space",
    text: "Players can hang out before or after games with drinks, food, and a more complete experience.",
    icon: "coffee",
  },
];

const galleryItems = [
  {
    title: "Premium turf setup",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Night match energy",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Lounge and café space",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
  },
];

const heroStats = [
  { value: "7 AM", label: "Daily opening time" },
  { value: "10 PM", label: "Last bookable slot" },
  { value: "2 hrs", label: "Max quick-book duration" },
];

const bookingSteps = [
  {
    title: "Choose a date and time",
    text: "Pick one hour or two continuous hours without jumping through extra steps.",
    icon: CalendarDays,
  },
  {
    title: "Confirm your game type",
    text: "Reserve it privately for your squad or open the game for more players to join.",
    icon: Users,
  },
  {
    title: "Show up and play",
    text: "Your slot is locked in first, and payment is handled later at the venue.",
    icon: ShieldCheck,
  },
];

const pricingBands = [
  {
    label: "Morning",
    price: "NPR 800",
    time: "7 AM - 10 AM",
    note: "Best for quieter sessions",
  },
  {
    label: "Day",
    price: "NPR 1000",
    time: "10 AM - 5 PM",
    note: "Balanced for flexible groups",
  },
  {
    label: "Evening",
    price: "NPR 1200",
    time: "5 PM - 10 PM",
    note: "Prime-time match energy",
  },
];

const trustPoints = [
  {
    title: "Clear pricing and timing",
    text: "No messy flow. You can see the slot, the duration, and the cost before confirming.",
    icon: Clock3,
  },
  {
    title: "Made for real groups",
    text: "Private bookings and open games both fit naturally into the same experience.",
    icon: Users,
  },
  {
    title: "Better matchday feel",
    text: "Cleaner visuals, turf-first focus, and a café space that makes staying longer feel worth it.",
    icon: Coffee,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="container pt-4 pb-14 md:pt-10 md:pb-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn>
            <div className="relative">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#B8FF3B]/10 blur-3xl" />
              <div className="absolute left-20 top-52 h-32 w-32 rounded-full bg-[#B8FF3B]/10 blur-3xl" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B]" />
                  <span className="text-sm text-[#D7DEE7]">
                    Bhaktapur, Nepal
                  </span>
                </div>

                <h1 className="mt-5 text-[2.6rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-[3.2rem] md:mt-6 md:text-[5.6rem]">
                  Book premium
                  <br />
                  futsal. Play at a
                  <br />
                  different level.
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#94A3B8] sm:text-lg sm:leading-8">
                  Fast booking, clean pricing, and a premium futsal experience
                  built for serious players.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Private bookings
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Open games
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Pay at venue
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book">
                    <Button className="w-full rounded-[999px] px-8 py-[18px] text-base shadow-[0_14px_34px_rgba(184,255,59,0.22)] sm:w-auto">
                      Book Now
                    </Button>
                  </Link>

                  <Link href="/pricing">
                    <Button
                      variant="secondary"
                      className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-8 py-[18px] text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] sm:w-auto"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
                  {heroStats.map((item) => (
                    <div
                      key={item.value}
                      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.035)] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/14"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_42%,transparent_100%)]" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
                      <div className="pointer-events-none absolute -right-8 top-6 h-16 w-16 rounded-full bg-[#B8FF3B]/8 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10">
                        <p className="text-[2rem] font-semibold tracking-[-0.04em] text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-sm text-[#94A3B8]">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-[40px] bg-[#B8FF3B]/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.04] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:rounded-[40px]">
                <div className="relative h-[360px] overflow-hidden rounded-[24px] sm:h-[420px] sm:rounded-[32px] md:h-[520px]">
                  <Image
                    src="/hero-player.jpg"
                    alt="Futsal player"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[30%_center]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.34))]" />

                  <div className="absolute left-5 top-5 overflow-hidden rounded-full border border-white/12 bg-[rgba(18,22,28,0.22)] shadow-[0_10px_30px_rgba(0,0,0,0.18),0_0_24px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                    <div className="relative flex items-center gap-2 px-4 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                      <span className="text-sm font-medium text-white/90">
                        Premium Booking
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-3 right-3 flex justify-end sm:bottom-5 sm:left-auto sm:right-5">
                    <HeroFeatureCarousel />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.12}>
          <SectionHeading
            eyebrow="How it works"
            title="A booking flow that feels quick even for first-time players."
            text="You do not need to understand the whole system first. Pick the slot, confirm the booking, and show up ready to play."
          />
        </FadeIn>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
          <FadeIn delay={0.16}>
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
              <div className="pointer-events-none absolute -left-10 bottom-10 h-24 w-24 rounded-full bg-[#B8FF3B]/8 blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#D7DEE7]">
                  <MapPin size={14} className="text-[#B8FF3B]" />
                  Near Samata School, Bhaktapur
                </div>

                <h3 className="mt-5 text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[3rem]">
                  Built to remove hesitation before the game even starts.
                </h3>

                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Players should know what to expect right away: when you are
                  open, what the slot costs, whether the game is private or
                  open, and how the visit works once they arrive.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    "Clear time-based pricing before checkout",
                    "Private bookings and open games in one flow",
                    "Payment handled later at the venue",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#476B0D] bg-[#22310D] text-[#B8FF3B]">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-sm text-[#D7DEE7]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-3">
            {bookingSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <FadeIn key={step.title} delay={0.2 + index * 0.06}>
                  <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-[4px] hover:border-white/14">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[6deg]">
                          <Icon size={20} strokeWidth={1.9} />
                        </div>

                        <span className="text-sm font-medium text-[#B8FF3B]">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 text-[1.45rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-[15px] leading-8 text-[#94A3B8]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.24}>
          <SectionHeading
            eyebrow="Pricing at a glance"
            title="Simple hourly pricing based on the time of day."
            text="You can plan fast without guessing. Morning stays lighter, daytime stays balanced, and evenings are the premium peak slots."
          />
        </FadeIn>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pricingBands.map((item, index) => (
            <FadeIn key={item.label} delay={0.28 + index * 0.06}>
              <div
                className={`group relative overflow-hidden rounded-[30px] border p-6 transition-all duration-300 will-change-transform hover:-translate-y-[4px] ${
                  index === 2
                    ? "border-[#B8FF3B]/40 bg-[#10180d] shadow-[0_16px_36px_rgba(184,255,59,0.08),0_16px_40px_rgba(0,0,0,0.18)]"
                    : "border-white/10 bg-[rgba(13,19,26,0.92)] shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                      {item.label}
                    </p>
                    {index === 2 && (
                      <span className="rounded-full border border-[#5E8B15] bg-[#1c2a0f] px-3 py-1 text-xs text-[#B8FF3B]">
                        Peak hours
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-[2.4rem] font-semibold tracking-[-0.05em] text-white">
                    {item.price}
                    <span className="ml-1 text-base text-[#94A3B8]">/hr</span>
                  </p>

                  <p className="mt-3 text-sm text-[#D7DEE7]">{item.time}</p>
                  <p className="mt-5 text-[15px] leading-8 text-[#94A3B8]">
                    {item.note}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.16}>
          <SectionHeading
            eyebrow="Why choose us"
            title="Built for smooth games and a better overall experience."
            text="From booking to matchday, everything is shaped to feel cleaner, faster, and more premium on both mobile and desktop."
          />
          </FadeIn>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon =
              feature.icon === "zap"
                ? Zap
                : feature.icon === "sparkles"
                  ? Sparkles
                  : Coffee;

            return (
              <FadeIn key={feature.title} delay={0.08 * index}>
                <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-[4px] hover:border-white/14">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[6deg]">
                      <Icon size={20} strokeWidth={1.9} />
                    </div>

                    <h3 className="mt-6 text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-8 text-[#94A3B8]">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <FadeIn key={point.title} delay={0.18 + index * 0.06}>
                <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                      <Icon size={18} />
                    </div>
                    <p className="text-base font-medium text-white">
                      {point.title}
                    </p>
                  </div>

                  <p className="mt-4 text-[15px] leading-8 text-[#94A3B8]">
                    {point.text}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn delay={0.2}>
            <div className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-[4px] hover:border-white/14 md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
              <div className="pointer-events-none absolute -right-10 top-8 h-20 w-20 rounded-full bg-[#B8FF3B]/8 blur-2xl" />

              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[6deg]">
                  <Coffee size={20} strokeWidth={1.9} />
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Café experience
                </p>

                <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[2.8rem]">
                  More than just the game.
                </h2>

                <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Grab drinks, sit with your team, and make the visit feel
                  better before or after the match. It’s built to feel like more
                  than just a booking and a game.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book">
                    <Button className="w-full rounded-[999px] px-7 py-[16px] sm:w-auto">
                      Book Your Slot
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

          <FadeIn delay={0.26}>
            <div className="group relative">
              <div className="absolute inset-0 scale-105 rounded-[38px] bg-[#B8FF3B]/8 blur-3xl" />

              <div className="relative overflow-hidden rounded-[38px] border border-white/8 bg-white/[0.04] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
                <div className="relative h-[320px] overflow-hidden rounded-[30px] md:h-[380px]">
                  <Image
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                    alt="Cafe and lounge"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.34))]" />

                  <div className="absolute left-5 top-5 overflow-hidden rounded-full border border-white/12 bg-[rgba(18,22,28,0.22)] shadow-[0_10px_30px_rgba(0,0,0,0.18),0_0_24px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                    <div className="relative flex items-center gap-2 px-4 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                      <span className="text-sm font-medium text-white/90">
                        Lounge + Café
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-5 right-5 w-[250px] overflow-hidden rounded-[26px] border border-white/12 bg-[rgba(20,24,30,0.30)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                    <div className="relative px-5 py-4">
                      <p className="text-sm text-[#D7DEE7]">After the game</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        Relax longer
                      </p>
                      <p className="mt-2 text-sm text-[#B8FF3B]">
                        Drinks, food, and team hangout space
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.3}>
          <SectionHeading
            eyebrow="Gallery preview"
            title="A quick look at the vibe."
            text="Premium turf, cleaner visuals, and a matchday feel built to stand out."
          />
        </FadeIn>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <FadeIn key={item.title} delay={0.08 * index}>
              <div className="group relative">
                <div className="absolute inset-0 scale-[1.02] rounded-[32px] bg-[#B8FF3B]/6 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.20)] transition-transform duration-300 will-change-transform group-hover:-translate-y-[4px] group-hover:border-white/14">
                  <div className="relative h-72 overflow-hidden rounded-[24px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.52))]" />

                    <div className="absolute left-4 top-4 overflow-hidden rounded-full border border-white/12 bg-[rgba(18,22,28,0.22)] shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                      <div className="relative flex items-center gap-2 px-3 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#B8FF3B]" />
                        <span className="text-xs font-medium text-white/90">
                          Premium View
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="overflow-hidden rounded-[22px] border border-white/12 bg-[rgba(20,24,30,0.26)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_45%,rgba(255,255,255,0.02)_100%)]" />
                        <div className="relative">
                          <p className="text-lg font-semibold tracking-[-0.03em] text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm text-[#C9D2DC]">
                            Built for a cleaner, better matchday feel
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <section className="container pb-16 md:pb-24">
        <FadeIn delay={0.34}>
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Visit us
                  </span>
                </div>

                <h2 className="mt-5 text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[3.8rem]">
                  Bhaktapur, Nepal
                </h2>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Premium turf, smooth mobile booking, and a café space that
                  gives players a better reason to stay longer than just the
                  match.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Open daily · 7 AM – 10 PM
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Futsal + Café
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Mobile-first booking
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/book">
                  <Button className="w-full rounded-[999px] px-8 py-[18px] text-base shadow-[0_14px_34px_rgba(184,255,59,0.22)] lg:w-auto">
                    Reserve Your Slot
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="secondary"
                    className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-8 py-[18px] text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] lg:w-auto"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
