"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    if (!(["LCP", "INP", "CLS"] as string[]).includes(metric.name)) return;
    if (Math.random() > 0.1) return;
    const payload = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      path: window.location.pathname,
      mobile: window.matchMedia("(max-width: 767px)").matches,
    });
    navigator.sendBeacon?.("/api/vitals", new Blob([payload], { type: "application/json" }));
  });
  return null;
}
