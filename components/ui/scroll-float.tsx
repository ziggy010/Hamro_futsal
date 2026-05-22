"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type ScrollFloatProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export default function ScrollFloat({
  children,
  className,
  y = 28,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [y, 0, -y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={shouldReduceMotion ? undefined : { y: translateY }}
    >
      {children}
    </motion.div>
  );
}
