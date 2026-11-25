import { format } from "date-fns";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char] || char);

export function emailConfigured() {
  const sender = process.env.EMAIL_FROM?.match(/@([^>\s]+)>?$/)?.[1]?.toLowerCase();
  return Boolean(process.env.RESEND_API_KEY && process.env.AUTH_URL && sender &&
    !["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"].includes(sender));
}

export async function sendEmail(to: string, subject: string, html: string, idempotencyKey?: string) {
  if (!emailConfigured()) throw new Error("EMAIL_NOT_CONFIGURED");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify({ from: process.env.EMAIL_FROM, to: [to], subject, html }),
  });
  if (!response.ok) throw new Error(`EMAIL_SEND_FAILED_${response.status}`);
}

export function verificationEmail(url: string) {
  return `<p>Welcome to Strike Yard. Verify your email to activate your account.</p><p><a href="${escapeHtml(url)}">Verify email</a></p><p>This link expires in 24 hours. If you did not sign up, ignore this message.</p>`;
}

export function bookingEmail(booking: {
  id: string;
  bookingDate: Date;
  totalPrice: number;
  slots: { startHour: number; endHour: number; activity: string; courtNumber: number }[];
}) {
  const activity = booking.slots[0]?.activity === "PICKLEBALL"
    ? `Pickleball · Court ${booking.slots[0].courtNumber}` : "Futsal";
  const hours = booking.slots.map((slot) => `${slot.startHour}:00–${slot.endHour}:00`).join(", ");
  return `<h1>Your slot is booked</h1><p>${escapeHtml(activity)} on ${escapeHtml(format(booking.bookingDate, "EEEE, MMMM d, yyyy"))} at ${escapeHtml(hours)}.</p><p>Booking ID: ${escapeHtml(booking.id)}<br>Total: NPR ${booking.totalPrice.toLocaleString()} (pay at venue)</p><p>Strike Yard, Bhaktapur. <a href="https://maps.app.goo.gl/56bzcsrhmnG6V39f6">Directions</a></p><p>Manage your booking from your account. Cancellation is available more than 5 hours before the game.</p>`;
}
