import { useEffect, useState } from 'react';

type Slide = {
  key: string;
  component: React.ReactElement;
};

type Props = {
  activeKey: string;
  slides: Slide[];
};

type Phase = 'idle' | 'exiting' | 'entering';

const SlideWrapper = ({ activeKey, slides }: Props) => {
  const [displayedKey, setDisplayedKey] = useState(activeKey);
  const [phase, setPhase] = useState<Phase>('idle');
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Set direction and start exit animation when key changes
  useEffect(() => {
    if (activeKey !== displayedKey) {
      const prevIndex = slides.findIndex(s => s.key === displayedKey);
      const nextIndex = slides.findIndex(s => s.key === activeKey);
      setDirection(nextIndex > prevIndex ? 'right' : 'left');
      setPhase('exiting');
    }
  }, [activeKey]);

  // Handle exit animation end: show entering component
  const handleExitAnimationEnd = () => {
    setDisplayedKey(activeKey);
    setPhase('entering');
  };

  // Handle enter animation end: finish animation
  const handleEnterAnimationEnd = () => {
    setPhase('idle');
  };

  // Decide which slide to show and which animation
  let slideKey = displayedKey;
  let animationClass = '';

  if (phase === 'exiting') {
    animationClass =
      direction === 'right'
        ? 'animate-slide-out-to-left'
        : 'animate-slide-out-to-right';
  } else if (phase === 'entering') {
    slideKey = activeKey;
    animationClass =
      direction === 'right'
        ? 'animate-slide-in-from-right'
        : 'animate-slide-in-from-left';
  }

  const slide = slides.find(s => s.key === slideKey);

  return (
    <div
      className="relative w-full overflow-x-hidden min-h-screen"
    >
      <div
        className={`${animationClass}`}
        onAnimationEnd={
          phase === 'exiting'
            ? handleExitAnimationEnd
            : phase === 'entering'
              ? handleEnterAnimationEnd
              : undefined
        }
      >
        {slide?.component}
      </div>
    </div>
  );
};

export default SlideWrapper;