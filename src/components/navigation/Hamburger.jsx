import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./hamburger.module.css";

export default function Hamburger({ isOpen = false }) {
  const topRef = useRef(null);
  const midRef = useRef(null);
  const botRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    // build timeline: start = burger (three lines), end = X
    const tl = gsap.timeline({ paused: true });

    tl.to(topRef.current, { y: -11, duration: 0.18 }, "burg")
      .to(botRef.current, { y: 9, duration: 0.18 }, "burg")
      .to(midRef.current, { scale: 0.01, duration: 0.18 }, "burg")
      .addLabel("rotate")
      .to(
        topRef.current,
        { y: 5, rotation: 45, transformOrigin: "44% 50%", duration: 0.18 },
        "rotate"
      )
      .to(
        botRef.current,
        { y: -5, rotation: -45, transformOrigin: "50% 52%", duration: 0.18 },
        "rotate"
      );

    // ensure the timeline starts visually at burger (progress 0)
    tl.progress(0);

    tlRef.current = tl;

    return () => {
      // cleanup if component unmounts
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = null;
    };
  }, []);

  // respond to prop change: play -> to X, reverse -> to burger
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  return (
    <svg
      className={styles.openmenu}
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      aria-hidden="true"
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
