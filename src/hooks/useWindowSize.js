import { useState, useEffect } from "react";

const BREAKPOINTS = {
  mobile: 480,
  tablet: 834,
};
export function useWindowSize() {
  const [currentWindowType, setCurrentWindowType] = useState();
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= BREAKPOINTS.mobile) {
        setCurrentWindowType("mobile");
      } else if (window.innerWidth <= BREAKPOINTS.tablet) {
        setCurrentWindowType("tablet");
      } else {
        setCurrentWindowType("desktop");
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return currentWindowType;
}
