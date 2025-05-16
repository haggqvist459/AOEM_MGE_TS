
import { useEffect, useRef, useState } from "react";

interface SliderProps {
  children: React.ReactElement;
  direction: "left" | "right";
}

const SwipeWrapper = ({ children, direction }: SliderProps) => {
  const [displayed, setDisplayed] = useState(children);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [animationClass, setAnimationClass] = useState("translate-x-0");
  const keyRef = useRef(children.key);

  useEffect(() => {
    if (children.key === keyRef.current || phase !== "idle") return;

    // Phase 1: slide out current
    setAnimationClass(direction === "left" ? "-translate-x-full" : "translate-x-full");
    setPhase("exiting");

    const exitTimeout = setTimeout(() => {
      // Phase 2: mount new and slide it in
      setDisplayed(children);
      setAnimationClass(direction === "left" ? "translate-x-full" : "-translate-x-full");
      setPhase("entering");

      requestAnimationFrame(() => {
        setAnimationClass("translate-x-0");
      });

      keyRef.current = children.key;
    }, 300);

    return () => clearTimeout(exitTimeout);
  }, [children, direction, phase]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`transition-transform duration-300 w-full h-full ${animationClass}`}
        key={displayed.key}
      >
        {displayed}
      </div>
    </div>
  );
};

export default SwipeWrapper;