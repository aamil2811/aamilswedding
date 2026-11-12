import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ScrollProvider } from "./context/ScrollContext";
import { Background, type ActivePage } from "./components/Background";
import { Petals } from "./components/Petals";
import { ReadingBand } from "./components/ReadingBand";
import { ProgressLine } from "./components/ProgressLine";

export function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activePage, setActivePage] = useState<ActivePage>(1);

  return (
    <ScrollProvider
      scrollContainerRef={scrollContainerRef}
      prefersReducedMotion={prefersReducedMotion}
    >
      <div className="app-shell">
        <Background
          prefersReducedMotion={prefersReducedMotion}
          activePage={activePage}
        />
        <Petals prefersReducedMotion={prefersReducedMotion} />
        <ReadingBand activePage={activePage} onPageChange={setActivePage} />
        <ProgressLine />
      </div>
    </ScrollProvider>
  );
}

export default App;
