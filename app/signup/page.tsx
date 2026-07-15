"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/fade-in";
import { getErrorMessage } from "@/lib/utils/error-message";

function SignupPageFallback() {
  return <main className="min-h-screen" />;
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
      if (emailInvalid) { setError("Please enter a valid email address."); return; }
      if (passwordTooShort) { setError("Password must be at least 6 characters."); return; }
      if (phoneInvalid) { setError("Please enter a valid phone number."); return; }

      const fallbackUrl = callbackUrl || "/";

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone || undefined,
          email: normalizedEmail,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to sign up");

      const loginRes = await signIn("credentials", {
        email: normalizedEmail,
        password,
        callbackUrl: fallbackUrl,
        redirect: false,
      });

      if (!loginRes || loginRes.error) {
        router.replace(
          callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/login",
        );
        return;
      }

      router.replace(loginRes.url || fallbackUrl);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  /* reusable input style helper */
  const inputStyle = (invalid?: boolean): React.CSSProperties => ({
    width: "100%",
    borderRadius: "14px",
    border: `1px solid ${invalid ? "rgba(255,100,100,0.45)" : "var(--line)"}`,
    background: "var(--bg-soft)",
    padding: "13px 16px",
    fontSize: "15px",
    color: "var(--fg)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s",
  });

  return (
    <main className="min-h-screen">
      <div className="container grid min-h-[calc(100vh-80px)] gap-12 py-16 lg:grid-cols-[1fr_420px] lg:items-center lg:py-24">

        {/* ── Left: editorial ──────────────────────────────────────── */}
        <FadeIn>
          <span className="eyebrow">Join the club</span>
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
            Create your account. Book with confidence.
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
            Sign up once and every booking is tied to your name. Faster
            reservations, open game access, and a full history of your slots.
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
            <span>Faster booking</span>
            <span>Join open games</span>
            <span>Full slot history</span>
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
            <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--line)" }}>
              <span className="eyebrow">Sign up</span>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                }}
              >
                Create your account
              </p>
            </div>

            {/* Fields */}
            <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.125rem" }}>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--fg-3)", marginBottom: "0.5rem" }}>
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle()}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--fg-3)", marginBottom: "0.5rem" }}>
                  Phone number{" "}
                  <span style={{ color: "var(--fg-dim)", fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="9813110577"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle(phoneInvalid)}
                  onFocus={(e) => (e.currentTarget.style.borderColor = phoneInvalid ? "rgba(255,100,100,0.45)" : "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = phoneInvalid ? "rgba(255,100,100,0.45)" : "var(--line)")}
                />
                {phoneInvalid && (
                  <p style={{ marginTop: "0.4rem", fontSize: "12px", color: "rgba(255,140,140,0.9)" }}>
                    Use 7-15 digits: numbers, spaces, + or −.
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--fg-3)", marginBottom: "0.5rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle(emailInvalid)}
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
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--fg-3)", marginBottom: "0.5rem" }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && canSubmit && handleSignup()}
                  style={inputStyle(passwordTooShort)}
                  onFocus={(e) => (e.currentTarget.style.borderColor = passwordTooShort ? "rgba(255,100,100,0.45)" : "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = passwordTooShort ? "rgba(255,100,100,0.45)" : "var(--line)")}
                />
                {passwordTooShort && (
                  <p style={{ marginTop: "0.4rem", fontSize: "12px", color: "rgba(255,140,140,0.9)" }}>
                    Password must be at least 6 characters.
                  </p>
                )}
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
                  <p style={{ fontSize: "13px", color: "rgba(255,150,150,0.9)", margin: 0 }}>{error}</p>
                </div>
              )}

              <button
                onClick={handleSignup}
                disabled={loading || !canSubmit}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", boxShadow: "0 10px 30px rgba(184,255,59,0.16)" }}
              >
                {loading ? "Creating account..." : "Create account"}
                <span className="btn-icon-wrap"><ArrowRight size={13} /></span>
              </button>
            </div>

            {/* Footer */}
            <div style={{ padding: "1.125rem 1.75rem", borderTop: "1px solid var(--line)", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "var(--fg-dim)" }}>
                Already have an account?{" "}
                <Link
                  href={callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/login"}
                  style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
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
