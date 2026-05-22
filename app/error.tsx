"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import Button from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,120,120,0.08),transparent_18%),radial-gradient(circle_at_82%_24%,rgba(184,255,59,0.05),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5C262C] bg-[#241519] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF8F8F] shadow-[0_0_14px_rgba(255,143,143,0.55)]" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#FFB4B4]">
                Something went wrong
              </span>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <h1 className="text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4rem]">
                  This page hit a problem, but the rest of the app is still
                  there.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  The request did not finish the way we expected. Try loading
                  this section again, or jump back into a known page and keep
                  moving.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    className="rounded-[999px]"
                    onClick={() => unstable_retry()}
                  >
                    <RefreshCw size={16} />
                    Try Again
                  </Button>

                  <Link href="/">
                    <Button variant="secondary" className="rounded-[999px]">
                      Go Home
                    </Button>
                  </Link>

                  <Link href="/book">
                    <Button variant="secondary" className="rounded-[999px]">
                      Book a Slot
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.32)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.05] text-[#FFB4B4]">
                  <AlertTriangle size={24} />
                </div>

                <p className="mt-5 text-lg font-semibold text-white">
                  Recovery options
                </p>
                <div className="mt-4 space-y-3 text-sm text-[#94A3B8]">
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                    Retry if this was a temporary server or network issue.
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                    Go back to booking, games, or account if you just need to
                    continue using the site.
                  </div>
                  {error.digest && (
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">
                        Error reference
                      </p>
                      <p className="mt-2 break-all font-mono text-xs text-[#D7DEE7]">
                        {error.digest}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
