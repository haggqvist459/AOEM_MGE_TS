import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactElement;
  direction: "left" | "right";
};

const SwipeWrapper = ({ children, direction }: Props) => {

  const [displayed, setDisplayed] = useState(children);
  const [animatingOut, setAnimatingOut] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  console.log("CHILD KEY:", children.key);

  const prevKeyRef = useRef<string | null | undefined>(null);

  useEffect(() => {
    const prevKey = prevKeyRef.current;

    if (prevKey === children.key) return;

    setAnimatingOut(true);

    const timeout = setTimeout(() => {
      setDisplayed(children);
      setEntering(true); // new
      prevKeyRef.current = children.key; // <-- update ref *after* animation
      setAnimatingOut(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [children.key]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    console.log("WRAPPER CLASS (on animatingOut change):", wrapperRef.current.className);
  }, [animatingOut]);

  console.log("ANIMATION STATE:", animatingOut, direction);


  const [entering, setEntering] = useState(false);
  useEffect(() => {
    if (!entering) return;
    const timer = setTimeout(() => setEntering(false), 300);
    return () => clearTimeout(timer);
  }, [entering]);

  return (
    <div className="relative w-full overflow-hidden h-full">
      <div
        ref={wrapperRef}
        className={`w-full transition-transform duration-300 ${animatingOut
          ? direction === "right"
            ? "-translate-x-full"
            : "translate-x-full"
          : "translate-x-0"
          }`}
      >
        <div className="w-full">{displayed}</div>
      </div>
    </div>
  )
};

export default SwipeWrapper;

/*









*/