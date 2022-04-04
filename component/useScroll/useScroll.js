import { useRef, useState, useEffect, useContext } from "react";
import appContext from "../../store/context";
export default function useScroll(threshold, section) {
  const { setActiveSection, activeSection } = useContext(appContext);
  const containerRef = useRef();

  useEffect(() => {
    let target = "";
    const observer = new IntersectionObserver(
      (enteries) => {
        if (enteries[0].isIntersecting) {
          setActiveSection(section);
        }
      },
      //   { rootMargin: "0px 0px -50% 0px" }
      { threshold: [threshold] }
    );

    if (containerRef.current) {
      target = containerRef.current;
      observer.observe(containerRef.current);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [containerRef, threshold, setActiveSection, section]);

  return [activeSection, containerRef];
}
