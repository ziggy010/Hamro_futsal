"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { getErrorMessage } from "@/lib/utils/error-message";

function LoginPageFallback() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="h-[640px] animate-pulse rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl" />
        </div>
      </section>
    </main>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const normalizedEmail = email.trim().toLowerCase();
  const emailInvalid =
    normalizedEmail.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  const canSubmit = !!normalizedEmail && !!password && !emailInvalid;

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      if (!normalizedEmail || !password) {
        setError("Email and password are required.");
        return;
      }

      if (emailInvalid) {
        setError("Please enter a valid email address.");
        return;
      }

      const fallbackUrl =
        callbackUrl ||
        (normalizedEmail ===
        process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase()
          ? "/admin"
          : "/");

      const res = await signIn("credentials", {
        email: normalizedEmail,
        password,
        callbackUrl: fallbackUrl,
        redirect: false,
      });

      if (!res || res.error) {
        setError("Invalid email or password");
        return;
      }

      router.replace(res.url || fallbackUrl);
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,255,59,0.08),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(184,255,59,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(18,22,28,0.24)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B8FF3B] shadow-[0_0_14px_rgba(184,255,59,0.55)]" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#B8FF3B]">
                    Welcome back
                  </span>
                </div>

                <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4.2rem]">
                  Log in and keep your bookings real.
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Sign in to book slots, join open games, and manage your
                  activity with a real account.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Real user access
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Safer bookings
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Faster joining
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.32)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                <div className="relative p-5 md:p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                      Login
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                      Access your account
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      Use your email and password to continue.
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
                      />
                      {emailInvalid && (
                        <p className="mt-2 text-sm text-[#FFB4B4]">
                          Please enter a valid email address.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
                      />
                    </div>

                    {error && (
                      <div className="rounded-[18px] border border-[#4D2A2F] bg-[#241519] px-4 py-3">
                        <p className="text-sm text-[#FFB4B4]">{error}</p>
                      </div>
                    )}

                    <button
                      onClick={handleLogin}
                      disabled={loading || !canSubmit}
                      className="w-full rounded-[999px] bg-[#B8FF3B] px-5 py-3 font-medium text-black shadow-[0_14px_34px_rgba(184,255,59,0.20)] transition hover:bg-[#a9ef36] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4 text-center">
                      <p className="text-sm text-[#94A3B8]">
                        <Link
                          href={
                            callbackUrl
                              ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`
                              : "/signup"
                          }
                          className="font-medium text-[#B8FF3B] hover:text-white"
                        >
                          Don’t have an account yet? Create one{" "}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}
