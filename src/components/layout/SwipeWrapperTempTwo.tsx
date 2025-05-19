import { useEffect, useRef, useState, useLayoutEffect } from "react";

type Props = {
  children: React.ReactElement;
  direction: "left" | "right";
};

const SwipeWrapper = ({ children, direction }: Props) => {
  const [currentCalculator, setCurrentCalculator] = useState(children);
  const [exitingCalculator, setExitingCalculator] = useState<React.ReactElement | null>(null);
  const [animating, setAnimating] = useState(false);
  const firstRenderRef = useRef(true);

  const exitingCalculatorKeyRef = useRef<string | null>(null);
  console.log("CHILD KEY:", children.key);
  console.log("exitingCalculatorKeyRef", exitingCalculatorKeyRef.current)
  console.log("ANIMATION STATE:", animating, direction);

  useLayoutEffect(() => {
    const enteringCalculatorKey = children.key ?? null;
    firstRenderRef.current = false;
    exitingCalculatorKeyRef.current = enteringCalculatorKey;
  }, []);


  useEffect(() => {
    if (firstRenderRef.current) return;
    const enteringCalculatorKey = children.key ?? null;

    if (enteringCalculatorKey === exitingCalculatorKeyRef.current) return;

    setExitingCalculator(currentCalculator);
    setCurrentCalculator(children);
    setAnimating(true);

    const timer = setTimeout(() => {
      setExitingCalculator(null);
      setAnimating(false);
      exitingCalculatorKeyRef.current = enteringCalculatorKey;
    }, 300);

    return () => clearTimeout(timer);
  }, [children, direction]);

  return (
    <div className="relative w-full overflow-hidden h-full">
      {/* Outgoing calculator */}
      {exitingCalculator && (
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-300
            ${direction === "right" ? "-translate-x-full" : "translate-x-full"}
          `}
        >
          {exitingCalculator}
        </div>
      )}

      {/* Incoming calculator */}
      <div
        className={`absolute top-0 left-0 w-full transition-transform duration-300
          ${animating
            ? direction === "right"
              ? "translate-x-full"
              : "-translate-x-full"
            : "translate-x-0"
          }
        `}
      >
        {currentCalculator}
      </div>
    </div>
  );
};

export default SwipeWrapper;


/* 

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactElement;
  direction: "left" | "right";
};

const SwipeWrapper = ({ children, direction }: Props) => {
  const [displayed, setDisplayed] = useState(children);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [animationClass, setAnimationClass] = useState("translate-x-0");

  const containerRef = useRef<HTMLDivElement>(null);
  const prevKey = useRef<string | null>(children.key ?? null);

  useEffect(() => {
    const newKey = children.key ?? null;
    if (newKey === prevKey.current || phase !== "idle") return;

    const exitClass = direction === "right" ? "-translate-x-full" : "translate-x-full";
    const enterClass = direction === "right" ? "translate-x-full" : "-translate-x-full";

    // Start exit
    setPhase("exiting");
    setAnimationClass(exitClass);

    const exitTimer = setTimeout(() => {
      // Replace child and prepare for entry
      prevKey.current = newKey;

      setDisplayed(children);
      setAnimationClass(enterClass);
      setPhase("entering");

      requestAnimationFrame(() => {
        // Force layout reflow before applying the new transform
        containerRef.current?.offsetHeight;
        setAnimationClass("translate-x-0");
      });
    }, 300);

    return () => clearTimeout(exitTimer);
  }, [children, direction, phase]);

  useEffect(() => {
    if (phase !== "entering") return;

    const entryTimer = setTimeout(() => {
      setPhase("idle");
    }, 300);

    return () => clearTimeout(entryTimer);
  }, [phase]);

  return (
    <div className="relative w-full overflow-hidden h-full">
      <div
        ref={containerRef}
        className={`w-full h-full transition-transform duration-300 ${animationClass}`}
      >
        {displayed}
      </div>
    </div>
  );
};

export default SwipeWrapper;

*/


/* 
19th May
import { useRef, useEffect } from 'react';

type Slide = {
  key: string;
  component: React.ReactElement;
};

type Props = {
  activeKey: string;
  slides: Slide[];
};

const SlideWrapper = ({ activeKey, slides }: Props) => {
  const prevKeyRef = useRef<string>(activeKey);

  const prevIndex = slides.findIndex(s => s.key === prevKeyRef.current);
  const currentIndex = slides.findIndex(s => s.key === activeKey);
  const direction: 'left' | 'right' = currentIndex > prevIndex ? 'right' : 'left';

  const activeSlide = slides[currentIndex];

  useEffect(() => {
    prevKeyRef.current = activeKey;
  }, [activeKey]);

  // Update prevKey after render
  // prevKeyRef.current = activeKey;

  console.log('SlideWrapper render:', {
    activeKey,
    prevKey: prevKeyRef.current,
    direction,
    activeComponent: activeSlide?.key,
  });

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        key={activeSlide.key}
        className={`absolute inset-0 transition-transform duration-300 ${direction === 'right'
          ? 'translate-x-full animate-slide-in-from-right'
          : '-translate-x-full animate-slide-in-from-left'
          }`}
      >
        {activeSlide.component}
      </div>
    </div>
  );
};

export default SlideWrapper;

*/


/*
WORKS

import { useRef, useEffect, useState } from 'react';

type Slide = {
  key: string;
  component: React.ReactElement;
};

type Props = {
  activeKey: string;
  slides: Slide[];
};

const SlideWrapper = ({ activeKey, slides }: Props) => {
  const [prevKey, setPrevKey] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevIndex = slides.findIndex(s => s.key === prevKey);
  const currentIndex = slides.findIndex(s => s.key === activeKey);
  const direction: 'left' | 'right' = currentIndex > prevIndex ? 'right' : 'left';

  useEffect(() => {
    if (activeKey !== prevKey) {
      setIsAnimating(true);
      setPrevKey(prev => (prev === activeKey ? null : prevKey)); // Don't update if already in sync
    }
  }, [activeKey]);

  // Animation end handler
  const handleAnimationEnd = () => {
    setIsAnimating(false);
    setPrevKey(activeKey); // Finalize
  };

  const activeSlide = slides[currentIndex];
  const previousSlide = prevKey !== null ? slides[prevIndex] : null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {isAnimating && previousSlide && (
        <div
          key={previousSlide.key}
          className={`absolute inset-0 transition-transform duration-300
            ${direction === 'right' ? '-translate-x-0 animate-slide-out-to-left' : 'translate-x-0 animate-slide-out-to-right'}
          `}
        >
          {previousSlide.component}
        </div>
      )}
      <div
        key={activeSlide.key}
        className={`absolute inset-0 transition-transform duration-300
          ${isAnimating
            ? direction === 'right'
              ? 'translate-x-full animate-slide-in-from-right'
              : '-translate-x-full animate-slide-in-from-left'
            : 'translate-x-0'
          }
        `}
        onAnimationEnd={handleAnimationEnd}
      >
        {activeSlide.component}
      </div>
    </div>
  );
};

export default SlideWrapper;
*/