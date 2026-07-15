import Link from "next/link";
import { Compass, MapPinned, SearchX } from "lucide-react";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_82%_24%,rgba(140,201,255,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                Page not found
              </span>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <h1 className="text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4rem]">
                  The page you were looking for isn&apos;t on this pitch.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  The link may be old, the address may be wrong, or the page has
                  moved. The main parts of the site are still ready to use.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/">
                    <Button className="rounded-[999px]">Back to Home</Button>
                  </Link>
                  <Link href="/book">
                    <Button variant="secondary" className="rounded-[999px]">
                      Book a Slot
                    </Button>
                  </Link>
                  <Link href="/games">
                    <Button variant="secondary" className="rounded-[999px]">
                      Browse Games
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.32)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.05] text-[#B8FF3B]">
                    <SearchX size={24} />
                  </div>
                  <p className="mt-5 text-lg font-semibold text-white">
                    Quick recovery
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[#94A3B8]">
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                      Check the URL if you typed it by hand.
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                      Use the main booking and games pages to find your next
                      step quickly.
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/games"
                    className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/14 hover:bg-white/[0.06]"
                  >
                    <Compass size={20} className="text-[#B8FF3B]" />
                    <p className="mt-4 text-base font-medium text-white">
                      View games
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      Check rates before booking.
                    </p>
                  </Link>

                  <Link
                    href="/contact"
                    className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/14 hover:bg-white/[0.06]"
                  >
                    <MapPinned size={20} className="text-[#B8FF3B]" />
                    <p className="mt-4 text-base font-medium text-white">
                      Contact us
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      Get directions or ask a question.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
