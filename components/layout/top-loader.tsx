"use client";

import { motion } from "framer-motion";

export default function TopLoader() {
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[3px] overflow-hidden bg-white/[0.04]">
      <motion.div
        className="h-full bg-[linear-gradient(90deg,rgba(184,255,59,0),rgba(184,255,59,0.95),rgba(126,247,193,0.82),rgba(184,255,59,0))] shadow-[0_0_18px_rgba(184,255,59,0.35)]"
        initial={{ x: "-100%", opacity: 0.9, scaleX: 0.9 }}
        animate={{ x: "100%", scaleX: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </div>
  );
}
