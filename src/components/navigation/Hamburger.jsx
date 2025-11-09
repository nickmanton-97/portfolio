import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./hamburger.module.css";

export default function Hamburger() {
  const topRef = useRef(null);
  const midRef = useRef(null);
  const botRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    // GSAP timeline matching original TimelineMax
    timeline.current = gsap.timeline({ paused: true, reversed: true });

    timeline.current
      // Burg phase (move lines out & shrink middle)
      .to(topRef.current, { y: -11, transformOrigin: "50% 50%", duration: 0.2 }, "burg")
      .to(botRef.current, { y: 9, transformOrigin: "50% 50%", duration: 0.2 }, "burg")
      .to(midRef.current, { scale: 0.01, transformOrigin: "50% 50%", duration: 0.2 }, "burg")
      // Rotate phase
      .addLabel("rotate")
      .to(topRef.current, { y: 5, duration: 0.2 }, "rotate")
      .to(botRef.current, { y: -5, duration: 0.2 }, "rotate")
      .to(topRef.current, { rotation: 45, transformOrigin: "44% 50%", duration: 0.2 }, "rotate")
      .to(botRef.current, { rotation: -45, transformOrigin: "50% 52%", duration: 0.2 }, "rotate");

    const handleClick = () => {
      timeline.current.reversed() ? timeline.current.restart() : timeline.current.reverse();
    };

    const burger = document.getElementById("burger");
    burger.addEventListener("click", handleClick);

    return () => {
      burger.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <svg
      id="burger"
      className={styles.openmenu}
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
    >
      <line
        ref={topRef}
        className={styles.top}
        x1="0"
        y1="9"
        x2="30"
        y2="9"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        ref={midRef}
        className={styles.mid}
        x1="0"
        y1="15"
        x2="30"
        y2="15"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line
        ref={botRef}
        className={styles.bot}
        x1="0"
        y1="21"
        x2="30"
        y2="21"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
