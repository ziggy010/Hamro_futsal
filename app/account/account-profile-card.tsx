"use client";

import { useState } from "react";
import { Mail, Phone, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/button";
import StatePanel from "@/components/ui/state-panel";
import { getErrorMessage } from "@/lib/utils/error-message";

type Props = {
  initialName: string;
  initialEmail: string;
  initialPhone: string;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update profile");
      }

      await update({ name: data?.user?.name || name });
      setSuccess("Profile updated successfully.");
      setEditing(false);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#B8FF3B]">
            Profile
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            Member details
          </p>
          <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
            Keep your contact details updated so bookings stay accurate.
          </p>
        </div>

        {!editing ? (
          <Button
            variant="secondary"
            className="rounded-[14px]"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="rounded-[14px]"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              className="rounded-[14px]"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <User2 size={14} className="text-[#B8FF3B]" />
            Name
          </div>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-3 w-full rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
            />
          ) : (
            <p className="mt-2 text-lg font-semibold text-white">{name}</p>
          )}
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Mail size={14} className="text-[#B8FF3B]" />
            Email
          </div>
          <p className="mt-2 text-lg font-semibold text-white">
            {initialEmail || "No email"}
          </p>
          <p className="mt-2 text-xs text-[#6F7D90]">
            Email can’t be edited here yet.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Phone size={14} className="text-[#B8FF3B]" />
            Phone
          </div>
          {editing ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Add your phone number"
              className="mt-3 w-full rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-[#6F7D90] focus:border-[#B8FF3B] focus:bg-white/[0.06]"
            />
          ) : (
            <p className="mt-2 text-lg font-semibold text-white">
              {phone || "No phone added"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm text-[#94A3B8]">Why this matters</p>
        <p className="mt-2 text-sm leading-7 text-[#C9D2DC]">
          Your saved profile is used to make booking details faster and keeps
          your account activity tied to the right contact information.
        </p>
      </div>

      {error && (
        <div className="mt-4">
          <StatePanel
            variant="error"
            eyebrow="Couldn’t save profile"
            title="Your profile changes weren’t saved"
            text={error}
            className="rounded-[24px] p-4 shadow-none"
          />
        </div>
      )}

      {success && (
        <div className="mt-4">
          <StatePanel
            variant="success"
            eyebrow="Profile updated"
            title="Your account details are now up to date"
            text={success}
            className="rounded-[24px] p-4 shadow-none"
          />
        </div>
      )}
    </div>
  );
}
