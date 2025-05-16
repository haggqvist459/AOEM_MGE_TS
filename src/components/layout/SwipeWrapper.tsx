import React, { useEffect, useRef, useState } from 'react';

type SliderProps = {
  activeKey: string;
  direction: 'left' | 'right';
  children: React.ReactElement;
};

const SwipeWrapper = ({ activeKey, direction, children }: SliderProps) => {
  const [visibleChild, setVisibleChild] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitingChild, setExitingChild] = useState<React.ReactElement | null>(null);
  const previousKeyRef = useRef(activeKey);

  useEffect(() => {
    const keyChanged = children.key !== previousKeyRef.current;
    if (!keyChanged) return;

    setExitingChild(visibleChild);
    setIsAnimating(true);

    const timeout = setTimeout(() => {
      setExitingChild(null);
      setVisibleChild(children);
      previousKeyRef.current = activeKey;
      setIsAnimating(false);
    }, 300); // must match Tailwind animation duration

    return () => clearTimeout(timeout);
  }, [activeKey, children]);

  console.log('Slider visibleChild:', visibleChild);
  console.log({
    visibleKey: visibleChild.key,
    exitingKey: exitingChild?.key,
    isAnimating
  });

  return (
    <div className="relative w-full h-full overflow-hidden">
      {exitingChild && (
        <div
          key={`exit-${exitingChild.key}`}
          className={`absolute inset-0 z-10 transition-transform duration-300 ${direction === 'right' ? '-translate-x-full' : 'translate-x-full'
            }`}
        >
          {exitingChild}
        </div>
      )}

      <div
        key={`enter-${visibleChild.key}`}
        className={`absolute inset-0 z-20 transition-transform duration-300 ${isAnimating
            ? direction === 'right'
              ? 'translate-x-full animate-slide-in-from-right'
              : '-translate-x-full animate-slide-in-from-left'
            : 'translate-x-0'
          }`}
        style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
      >
        {visibleChild}
      </div>
    </div>
  );
};

export default SwipeWrapper;