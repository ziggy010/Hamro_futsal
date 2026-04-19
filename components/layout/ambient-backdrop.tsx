"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function AmbientBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yPrimary = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yTertiary = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  if (shouldReduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[-8%] top-[8%] h-[18rem] w-[18rem] rounded-full bg-[#B8FF3B]/[0.05] blur-3xl" />
        <div className="absolute right-[-10%] top-[32%] h-[22rem] w-[22rem] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute bottom-[-8%] left-[20%] h-[15rem] w-[15rem] rounded-full bg-[#7EF7C1]/[0.03] blur-3xl" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ y: yPrimary, rotate }}
        className="absolute left-[-8%] top-[6%] h-[18rem] w-[18rem] rounded-full bg-[#B8FF3B]/[0.06] blur-3xl md:h-[24rem] md:w-[24rem]"
      />
      <motion.div
        style={{ y: ySecondary }}
        className="absolute right-[-10%] top-[28%] h-[20rem] w-[20rem] rounded-full bg-white/[0.035] blur-3xl md:h-[26rem] md:w-[26rem]"
      />
      <motion.div
        style={{ y: yPrimary }}
        className="absolute bottom-[-8%] left-[22%] h-[14rem] w-[14rem] rounded-full bg-[#B8FF3B]/[0.04] blur-3xl md:h-[18rem] md:w-[18rem]"
      />
      <motion.div
        style={{ y: yTertiary, rotate }}
        className="absolute bottom-[8%] right-[12%] h-[12rem] w-[12rem] rounded-full bg-[#7EF7C1]/[0.04] blur-3xl md:h-[16rem] md:w-[16rem]"
      />
    </div>
  );
}
