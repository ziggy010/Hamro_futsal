"use client";

import { useState } from "react";
import { Mail, Phone, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { getErrorMessage } from "@/lib/utils/error-message";

type Props = {
  initialName: string;
  initialEmail: string;
  initialPhone: string;
};

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--f-mono)",
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: "var(--fg-dim)",
        display: "block",
        marginBottom: "0.375rem",
      }}
    >
      {children}
    </span>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "12px",
  border: "1px solid var(--line)",
  background: "var(--bg)",
  padding: "10px 14px",
  fontSize: "15px",
  color: "var(--fg)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color .2s",
  marginTop: "0.375rem",
};

export default function AccountProfileCard({
  initialName,
  initialEmail,
  initialPhone,
}: Props) {
  const { update } = useSession();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCancel = () => {
    setName(initialName);
    setPhone(initialPhone);
    setError("");
    setSuccess("");
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update profile");

      await update({ name: data?.user?.name || name });
      setSuccess("Profile updated.");
      setEditing(false);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "20px",
        background: "var(--bg-soft)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1.375rem 1.75rem",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <span className="eyebrow">Profile</span>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.03em", marginTop: "0.375rem" }}>
            Member details
          </p>
        </div>
        {!editing ? (
          <button
            className="btn btn-ghost"
            onClick={() => setEditing(true)}
          >
            Edit profile
          </button>
        ) : (
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <button className="btn btn-ghost" onClick={handleCancel} disabled={saving}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
              style={{ boxShadow: "0 8px 24px rgba(184,255,59,0.14)" }}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </div>

      {/* Name */}
      <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
        <User2 size={13} style={{ color: "var(--fg-dim)", marginTop: "0.2rem", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <RowLabel>Name</RowLabel>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            />
          ) : (
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg)" }}>{name || "No name"}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--line)", display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
        <Mail size={13} style={{ color: "var(--fg-dim)", marginTop: "0.2rem", flexShrink: 0 }} />
        <div>
          <RowLabel>Email</RowLabel>
          <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg)" }}>{initialEmail || "No email"}</p>
          <p style={{ fontSize: "12px", color: "var(--fg-dim)", marginTop: 3 }}>Email editing coming soon.</p>
        </div>
      </div>

      {/* Phone */}
      <div style={{ padding: "1.25rem 1.75rem", borderBottom: error || success ? "1px solid var(--line)" : undefined, display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
        <Phone size={13} style={{ color: "var(--fg-dim)", marginTop: "0.2rem", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <RowLabel>Phone</RowLabel>
          {editing ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Add your phone number"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            />
          ) : (
            <p style={{ fontSize: "16px", fontWeight: 600, color: phone ? "var(--fg)" : "var(--fg-dim)" }}>
              {phone || "No phone added"}
            </p>
          )}
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <div style={{ padding: "1rem 1.75rem" }}>
          <div style={{ padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(255,100,100,0.22)", background: "rgba(255,80,80,0.05)" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,150,150,0.9)", margin: 0 }}>{error}</p>
          </div>
        </div>
      )}
      {success && (
        <div style={{ padding: "1rem 1.75rem" }}>
          <div style={{ padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(184,255,59,0.2)", background: "rgba(184,255,59,0.05)" }}>
            <p style={{ fontSize: "13px", color: "var(--accent)", margin: 0 }}>{success}</p>
          </div>
        </div>
      )}
    </div>
  );
}
