import { createContext, useContext, type RefObject } from "react";

interface ScrollContextValue {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  prefersReducedMotion: boolean;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({
  scrollContainerRef,
  prefersReducedMotion,
  children,
}: ScrollContextValue & { children: React.ReactNode }) {
  return (
    <ScrollContext.Provider value={{ scrollContainerRef, prefersReducedMotion }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScrollContext must be used inside ScrollProvider");
  }
  return ctx;
}

