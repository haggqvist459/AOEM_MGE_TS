import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactElement;
};

const SwipeWrapper = ({ children }: Props) => {
  
 const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10); // Let the component mount before triggering fade-in

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {children}
    </div>
  );
};

export default SwipeWrapper;