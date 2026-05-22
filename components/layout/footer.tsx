import Link from "next/link";
import Button from "@/components/ui/button";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Book", href: "/book" },
  { label: "Games", href: "/games" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_30%,rgba(184,255,59,0.06),transparent_18%),radial-gradient(circle_at_85%_40%,rgba(184,255,59,0.05),transparent_18%)]" />

      <div className="container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.75fr_0.75fr_0.95fr]">
          <div>
            <div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#B8FF3B]/8 blur-xl" />
                  <Image
                    src="/logo.png"
                    alt="Hamro Futsal logo"
                    width={52}
                    height={52}
                    className="relative h-12 w-12 object-contain"
                  />
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                    Hamro Futsal
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    Premium futsal booking
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-[15px] leading-8 text-[#94A3B8]">
                Premium futsal booking with a cleaner matchday experience,
                smooth mobile flow, and a café space built for local players.
              </p>
            </div>

            <div className="mt-6">
              <Link href="/book">
                <Button className="w-full rounded-[999px] px-6 py-3 shadow-[0_14px_34px_rgba(184,255,59,0.20)] sm:w-auto">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white">
              Quick Links
            </p>

            <div className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[15px] text-[#94A3B8] transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white">
              Hours
            </p>

            <div className="mt-5 space-y-3 text-[15px] text-[#94A3B8]">
              <p>Open daily</p>
              <p>7:00 AM – 10:00 PM</p>
              <p>Walk-ins supported</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white">
              Contact
            </p>

            <div className="mt-5 space-y-3 text-[15px] text-[#94A3B8]">
              <p>Bhaktapur, Nepal</p>
              <p>9813110577</p>
              <p>tajale01@email.com</p>
            </div>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
              <div className="pointer-events-none absolute" />
              <div className="px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B8FF3B]">
                  Premium booking
                </p>
                <p className="mt-3 text-[15px] leading-7 text-[#94A3B8]">
                  Fast booking, clean pricing, and a better matchday feel.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-5 text-sm text-[#6F7D90] md:mt-12 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Hamro Futsal. All rights reserved.</p>
          <p>Built for premium futsal booking.</p>
        </div>
      </div>
    </footer>
  );
}
