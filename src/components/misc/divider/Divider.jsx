import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Divider.module.css";

gsap.registerPlugin(ScrollTrigger);

const Divider = ({
  start = "top 75%",     // ScrollTrigger start
  duration = 1,          // Animation duration
  ease = "power2.out",   // Animation easing
  color = "#272624",     // Line color
  height = 1,            // Line thickness in px
}) => {
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;

    // Start hidden
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

    // Animate on scroll trigger
    ScrollTrigger.create({
      trigger: line,
      start: start,
      onEnter: () => {
        gsap.to(line, { scaleX: 1, duration, ease });
      },
    });
  }, [start, duration, ease]);

  return (
    <div className={styles.dividerContainer}>
      <div
        ref={lineRef}
        className={styles.dividerLine}
        style={{ backgroundColor: color, height: `${height}px` }}
      ></div>
    </div>
  );
};

export default Divider;
