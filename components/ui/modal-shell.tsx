"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ModalShellProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  position?: "center" | "bottom";
  closeOnBackdrop?: boolean;
};

export default function ModalShell({
  open,
  onClose,
  children,
  className,
  panelClassName,
  position = "center",
  closeOnBackdrop = true,
}: ModalShellProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open || !onClose) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.14 : 0.22 }}
          className={cn(
            "fixed inset-0 z-[120] flex bg-black/55 p-3 backdrop-blur-sm",
            position === "center"
              ? "items-end justify-center md:items-center"
              : "items-end justify-center",
            className,
          )}
          onClick={() => {
            if (closeOnBackdrop) {
              onClose?.();
            }
          }}
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : position === "center"
                  ? { opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" }
                  : { opacity: 0, y: 28, scale: 0.985, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : position === "center"
                  ? { opacity: 0, y: 12, scale: 0.985, filter: "blur(4px)" }
                  : { opacity: 0, y: 20, scale: 0.99, filter: "blur(4px)" }
            }
            transition={{
              duration: shouldReduceMotion ? 0.16 : 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn("w-full", panelClassName)}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
