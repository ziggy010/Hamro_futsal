"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import { getErrorMessage } from "@/lib/utils/error-message";

function LoginPageFallback() {
  return (
    <main className="min-h-screen" />
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
        (normalizedEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase()
          ? "/admin"
          : "/");

      const res = await signIn("credentials", {
        email: normalizedEmail,
        password,
        callbackUrl: fallbackUrl,
        redirect: false,
      });

      if (!res || res.error) {
        setError("Invalid email or password.");
        return;
      }

      router.replace(res.url || fallbackUrl);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="container grid min-h-[calc(100vh-80px)] gap-12 py-16 lg:grid-cols-[1fr_420px] lg:items-center lg:py-24">

        {/* ── Left: editorial ──────────────────────────────────────── */}
        <FadeIn>
          <span className="eyebrow">Welcome back</span>
          <h1
            style={{
              fontFamily: "var(--f-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.6rem,6vw,5.2rem)",
              letterSpacing: "-0.055em",
              lineHeight: 0.95,
              color: "var(--fg)",
              marginTop: "1.1rem",
              maxWidth: "16ch",
            }}
          >
            Sign in and keep your game going.
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "17px",
              lineHeight: 1.75,
              color: "var(--fg-3)",
              maxWidth: "44ch",
            }}
          >
            Access your bookings, join open games, and manage your slots — all
            tied to your account.
          </p>

          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 2.5rem",
              fontFamily: "var(--f-mono)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-dim)",
            }}
          >
            <span>Real bookings</span>
            <span>Open game access</span>
            <span>Your account history</span>
          </div>
        </FadeIn>

        {/* ── Right: form ──────────────────────────────────────────── */}
        <FadeIn delay={0.1}>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "24px",
              background: "var(--bg-soft)",
              overflow: "hidden",
            }}
          >
            {/* Form header */}
            <div
              style={{
                padding: "1.5rem 1.75rem",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span className="eyebrow">Login</span>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                }}
              >
                Access your account
              </p>
            </div>

            {/* Fields */}
            <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--fg-3)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && canSubmit && handleLogin()}
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    border: `1px solid ${emailInvalid ? "rgba(255,100,100,0.45)" : "var(--line)"}`,
                    background: "var(--bg-soft)",
                    padding: "13px 16px",
                    fontSize: "15px",
                    color: "var(--fg)",
                    outline: "none",
                    boxSizing: "border-box" as const,
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = emailInvalid ? "rgba(255,100,100,0.45)" : "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = emailInvalid ? "rgba(255,100,100,0.45)" : "var(--line)")}
                />
                {emailInvalid && (
                  <p style={{ marginTop: "0.4rem", fontSize: "12px", color: "rgba(255,140,140,0.9)" }}>
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--fg-3)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && canSubmit && handleLogin()}
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid var(--line)",
                    background: "var(--bg-soft)",
                    padding: "13px 16px",
                    fontSize: "15px",
                    color: "var(--fg)",
                    outline: "none",
                    boxSizing: "border-box" as const,
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                />
              </div>

              {error && (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,100,100,0.22)",
                    background: "rgba(255,80,80,0.05)",
                  }}
                >
                  <p style={{ fontSize: "13px", color: "rgba(255,150,150,0.9)", margin: 0 }}>
                    {error}
                  </p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading || !canSubmit}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", boxShadow: "0 10px 30px rgba(184,255,59,0.16)" }}
              >
                {loading ? "Signing in..." : "Sign in"}
                <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
              </button>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "1.125rem 1.75rem",
                borderTop: "1px solid var(--line)",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "13px", color: "var(--fg-dim)" }}>
                No account yet?{" "}
                <Link
                  href={callbackUrl ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/signup"}
                  style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
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
