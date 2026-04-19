"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { getErrorMessage } from "@/lib/utils/error-message";

function SignupPageFallback() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="h-[720px] animate-pulse rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl" />
        </div>
      </section>
    </main>
  );
}

function SignupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const passwordTooShort = password.length > 0 && password.length < 6;
  const emailInvalid =
    normalizedEmail.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  const phoneInvalid =
    trimmedPhone.length > 0 && !/^[0-9+\-\s]{7,15}$/.test(trimmedPhone);
  const canSubmit =
    !!trimmedName &&
    !!normalizedEmail &&
    !!password &&
    !emailInvalid &&
    !phoneInvalid &&
    !passwordTooShort;

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      if (!trimmedName || !normalizedEmail || !password) {
        setError("Name, email, and password are required.");
        return;
      }

      if (emailInvalid) {
        setError("Please enter a valid email address.");
        return;
      }

      if (passwordTooShort) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (phoneInvalid) {
        setError("Please enter a valid phone number.");
        return;
      }

      const fallbackUrl = callbackUrl || "/";

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone || undefined,
          email: normalizedEmail,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to sign up");
      }

      const loginRes = await signIn("credentials", {
        email: normalizedEmail,
        password,
        callbackUrl: fallbackUrl,
        redirect: false,
      });

      if (!loginRes || loginRes.error) {
        router.replace(
          callbackUrl
            ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
            : "/login",
        );
        return;
      }

      router.replace(loginRes.url || fallbackUrl);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong"));
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
                    Join the club
                  </span>
                </div>

                <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4.2rem]">
                  Create your account and book with confidence.
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#94A3B8] md:text-base">
                  Sign up once to book slots faster, join open games, and keep
                  your activity tied to a real account.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#C9D2DC]">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Secure account
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Easier bookings
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    Real game joins
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[rgba(20,24,30,0.32)] shadow-[0_20px_60px_rgba(0,0,0,0.24),0_0_30px_rgba(184,255,59,0.06)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />

                <div className="relative p-5 md:p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
                      Sign up
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                      Create your account
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                      Start with your basic details and you’ll be ready to go.
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Full name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        placeholder="Optional for now"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
                      />
                      {phoneInvalid && (
                        <p className="mt-2 text-sm text-[#FFB4B4]">
                          Use 7-15 digits and only numbers, spaces, `+` or `-`.
                        </p>
                      )}
                    </div>

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
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
                      />
                      {passwordTooShort && (
                        <p className="mt-2 text-sm text-[#FFB4B4]">
                          Password must be at least 6 characters.
                        </p>
                      )}
                    </div>

                    {error && (
                      <div className="rounded-[18px] border border-[#4D2A2F] bg-[#241519] px-4 py-3">
                        <p className="text-sm text-[#FFB4B4]">{error}</p>
                      </div>
                    )}

                    <button
                      onClick={handleSignup}
                      disabled={loading || !canSubmit}
                      className="w-full rounded-[999px] bg-[#B8FF3B] px-5 py-3 font-medium text-black shadow-[0_14px_34px_rgba(184,255,59,0.20)] transition hover:bg-[#a9ef36] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? "Creating account..." : "Create Account"}
                    </button>

                    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4 text-center">
                      <p className="text-sm text-[#94A3B8]">
                        <Link
                          href={
                            callbackUrl
                              ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
                              : "/login"
                          }
                          className="font-medium text-[#B8FF3B] hover:text-white"
                        >
                          Already have an account? Login{" "}
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

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupPageFallback />}>
      <SignupPageContent />
    </Suspense>
  );
}
