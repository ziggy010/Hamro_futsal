import test from "node:test";
import assert from "node:assert/strict";
import { bookingEmail, emailConfigured, verificationEmail } from "../lib/email";

test("public Gmail address cannot be treated as a configured Resend sender", () => {
  const oldKey = process.env.RESEND_API_KEY;
  const oldFrom = process.env.EMAIL_FROM;
  const oldUrl = process.env.AUTH_URL;
  process.env.RESEND_API_KEY = "test-key";
  process.env.EMAIL_FROM = "strikeyard01@gmail.com";
  process.env.AUTH_URL = "https://strikeyard.vercel.app";
  try {
    assert.equal(emailConfigured(), false);
    process.env.EMAIL_FROM = "Strike Yard <bookings@strikeyard.com.np>";
    assert.equal(emailConfigured(), true);
  } finally {
    if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.EMAIL_FROM; else process.env.EMAIL_FROM = oldFrom;
    if (oldUrl === undefined) delete process.env.AUTH_URL; else process.env.AUTH_URL = oldUrl;
  }
});

test("verification message includes expiring action and escapes URL markup", () => {
  const html = verificationEmail('https://example.com/verify?token="bad"');
  assert.match(html, /24 hours/);
  assert.match(html, /&quot;bad&quot;/);
  assert.doesNotMatch(html, /token="bad"/);
});

test("confirmation lists activity, court, slot, payment and directions", () => {
  const html = bookingEmail({
    id: "booking-123",
    bookingDate: new Date("2026-11-26T06:00:00.000Z"),
    totalPrice: 800,
    slots: [{ startHour: 9, endHour: 10, activity: "PICKLEBALL", courtNumber: 2 }],
  });
  assert.match(html, /Pickleball · Court 2/);
  assert.match(html, /9:00–10:00/);
  assert.match(html, /NPR 800/);
  assert.match(html, /maps.app.goo.gl/);
});
