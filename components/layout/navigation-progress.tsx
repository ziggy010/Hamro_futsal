"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import TopLoader from "@/components/layout/top-loader";

type NavigationProgressContextType = {
  startLoading: () => void;
};

const NavigationProgressContext =
  createContext<NavigationProgressContextType | null>(null);

export function NavigationProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLoading(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const value = useMemo(
    () => ({
      startLoading,
    }),
    [startLoading],
  );

  return (
    <NavigationProgressContext.Provider value={value}>
      {loading && <TopLoader />}
      {children}
    </NavigationProgressContext.Provider>
  );
}

export function useNavigationProgress() {
  const context = useContext(NavigationProgressContext);

  if (!context) {
    throw new Error(
      "useNavigationProgress must be used inside NavigationProgressProvider",
    );
  }

  return context;
}
