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