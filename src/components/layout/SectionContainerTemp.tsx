import { useEffect, useState, useRef } from "react";

type Props = {
  children: React.ReactElement;
};

const SectionContainerTemp = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const prevChildRef = useRef<React.ReactElement>(children);

  useEffect(() => {
    const entryTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 10); // allow initial render, then fade in
    return () => clearTimeout(entryTimeout);
  }, []);

  useEffect(() => {
    if (children.key === prevChildRef.current.key) return;

    setIsVisible(false);

    const timeout = setTimeout(() => {
      setIsVisible(true);
      prevChildRef.current = children;
    }, 300);

    return () => clearTimeout(timeout);
  }, [children]);

  return (
    <section
      className={`transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        } bg-neutral-300 flex flex-col w-11/12 lg:w-3/4 mx-auto my-5 py-5 border shadow-md rounded-md`}
    >
      <div className="px-5">{children}</div>
    </section>
  );
};

export default SectionContainerTemp;
