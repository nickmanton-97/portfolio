import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./cursor.module.css";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e) => {
      const size = cursor.offsetWidth / 2;
      gsap.to(cursor, {
        x: e.clientX - size,
        y: e.clientY - size,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto"; // reset on unmount
    };
  }, []);

  return <div
  ref={cursorRef}
  className={styles.cursor}
  style={{ border: '2px solid #272624' }}
/>;
}
