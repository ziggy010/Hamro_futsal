import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Phone,
  Clock3,
  ShieldCheck,
  Navigation,
  MessageSquare,
} from "lucide-react";
import Button from "@/components/ui/button";
import FadeIn from "@/components/ui/fade-in";
import SectionHeading from "@/components/ui/section-heading";

const contactCards = [
  {
    title: "Location",
    value: "Bhaktapur, Nepal",
    text: "Bhaktapur, Nepal (near Samata School)",
    icon: MapPin,
  },
  {
    title: "Opening hours",
    value: "7 AM – 10 PM",
    text: "Open daily for bookings and matchday café visits.",
    icon: Clock3,
  },
  {
    title: "Contact",
    value: "9813110577",
    text: "Call or email us for bookings or inquiries.",
    icon: Phone,
  },
];

const contactOptions = [
  {
    title: "Booking questions",
    text: "Need help choosing the right time or understanding the booking flow?",
    action: "Book a slot online first",
    icon: CalendarDays,
  },
  {
    title: "Quick phone contact",
    text: "Best when you want a direct answer about timing, location, or availability.",
    action: "Call us directly",
    icon: Phone,
  },
  {
    title: "Visit with confidence",
    text: "Players can come for the game, stay for the café, and enjoy a cleaner matchday feel.",
    action: "Get directions",
    icon: Navigation,
  },
];

const faqs = [
  {
    q: "Do I need to pay online first?",
    a: "No. Bookings are currently reserved online, and payment is handled later at the venue.",
  },
  {
    q: "Can I create an open game?",
    a: "Yes. During booking, you can choose an open game so other signed-in players can join later.",
  },
  {
    q: "Where exactly are you located?",
    a: "In Bhaktapur, near Samata School. The contact page is meant to make getting there feel straightforward.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="container py-6 md:py-12">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Contact
                </span>
              </div>

              <h1 className="mt-5 text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.05em] text-white sm:text-[2.6rem] md:text-[4.6rem]">
                Find us in Bhaktapur and book your next game easily.
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                Reach out for bookings, questions, or anything else. Built for a
                premium futsal and café experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/book">
                  <Button className="w-full rounded-[999px] px-8 py-[18px] text-base shadow-[0_14px_34px_rgba(184,255,59,0.22)] sm:w-auto">
                    Book Now
                  </Button>
                </Link>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-8 py-[18px] text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] sm:w-auto"
                  >
                    Open Map
                  </Button>
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Fastest action</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Book online
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Opening hours</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    7 AM - 10 PM
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-[#94A3B8]">Best for help</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Call directly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="container pb-10 md:pb-16">
        <FadeIn delay={0.1}>
          <SectionHeading
            eyebrow="Reach us faster"
            title="Choose the fastest way to get what you need."
            text="Some visitors want directions, some want quick booking help, and some just need a direct number. This page should support all three."
          />
        </FadeIn>

        <div className="mt-7 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <FadeIn key={option.title} delay={0.16 + index * 0.06}>
                <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-[4px] hover:border-white/14">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[6deg]">
                      <Icon size={20} strokeWidth={1.9} />
                    </div>

                    <h2 className="mt-6 text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                      {option.title}
                    </h2>

                    <p className="mt-4 text-[15px] leading-8 text-[#94A3B8]">
                      {option.text}
                    </p>

                    <p className="mt-5 text-sm font-medium text-[#B8FF3B]">
                      {option.action}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <FadeIn key={card.title} delay={0.08 * index}>
                <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-[4px] hover:border-white/14">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B] transition-transform duration-300 group-hover:scale-[1.04] group-hover:rotate-[6deg]">
                      <Icon size={20} strokeWidth={1.9} />
                    </div>

                    <p className="mt-6 text-sm text-[#94A3B8]">{card.title}</p>
                    <h2 className="mt-3 text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                      {card.value}
                    </h2>
                    <p className="mt-4 text-[15px] leading-8 text-[#94A3B8]">
                      {card.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container pb-10 md:pb-16">
        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <FadeIn delay={0.28}>
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)] opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Common questions
                </p>
                <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[2.8rem]">
                  The details most players usually want first.
                </h2>

                <div className="mt-7 space-y-3">
                  {faqs.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <p className="text-base font-medium text-white">
                            {item.q}
                          </p>
                          <p className="mt-2 text-[15px] leading-8 text-[#94A3B8]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.34}>
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-[#B8FF3B]">
                  <ShieldCheck size={20} strokeWidth={1.9} />
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Best next step
                </p>
                <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[2.8rem]">
                  If you already know your time, booking online is still the fastest path.
                </h2>

                <p className="mt-5 text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  The contact page should help, but it should also encourage the
                  quickest action when a player is ready. If the time is clear,
                  go straight to booking. If not, call for a quick answer.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book">
                    <Button className="w-full rounded-[999px] px-7 py-[16px] sm:w-auto">
                      Start Booking
                    </Button>
                  </Link>

                  <a href="tel:9813110577">
                    <Button
                      variant="secondary"
                      className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-7 py-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] sm:w-auto"
                    >
                      Call 9813110577
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
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
                  <Navigation size={20} strokeWidth={1.9} />
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Visit us
                </p>

                <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[2.8rem]">
                  Built for games, hangouts, and a better overall feel.
                </h2>

                <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Players can come for the match, stay for the café, and enjoy a
                  cleaner premium futsal setup in Bhaktapur.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book">
                    <Button className="w-full rounded-[999px] px-7 py-[16px] sm:w-auto">
                      Reserve Your Slot
                    </Button>
                  </Link>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="secondary"
                      className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-7 py-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] sm:w-auto"
                    >
                      Get Directions
                    </Button>
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Open daily · 7 AM – 10 PM
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Futsal + Café
                  </div>
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
                    src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80"
                    alt="Futsal venue"
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
                        Bhaktapur Venue
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-5 right-5 w-[255px] overflow-hidden rounded-[26px] border border-white/12 bg-[rgba(20,24,30,0.30)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                    <div className="relative px-5 py-4">
                      <p className="text-sm text-[#D7DEE7]">Easy to reach</p>
                      <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                        Visit easily
                      </p>
                      <p className="mt-2 text-sm text-[#B8FF3B]">
                        Book online, play on time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container pb-16 md:pb-24">
        <FadeIn delay={0.32}>
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Ready to play?
                </p>
                <h2 className="mt-3 text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[3.8rem]">
                  Book your slot and lock in your next game.
                </h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Smooth booking flow, premium setup, and a better experience on
                  both mobile and desktop.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/book">
                  <Button className="w-full rounded-[999px] px-8 py-[18px] text-base shadow-[0_14px_34px_rgba(184,255,59,0.22)] lg:w-auto">
                    Book Now
                  </Button>
                </Link>

                <a href="tel:9813110577" className="w-full lg:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full rounded-[999px] border-white/12 bg-white/[0.04] px-8 py-[18px] text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl hover:bg-white/[0.08] lg:w-auto"
                  >
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
