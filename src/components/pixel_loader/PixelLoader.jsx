import React, { useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import styles from "./pixelloader.module.css";

export default function PixelLoader() {
  const [blocks, setBlocks] = useState([]);

  // Create blocks once on mount
  useLayoutEffect(() => {
    const rowCount = 10;
    const colCount = Math.ceil(window.innerWidth / (window.innerHeight * 0.1));
    const newBlocks = Array.from({ length: rowCount }).map(() =>
      Array.from({ length: colCount }).map(() => React.createRef())
    );
    setBlocks(newBlocks);
  }, []);

  // Animate out on mount
  useLayoutEffect(() => {
    if (!blocks.length) return;

    const allBlocks = blocks.flat().map((r) => r.current).filter(Boolean);
    const shuffled = allBlocks.sort(() => Math.random() - 0.5);

    // Animate from opacity 1 → 0
    gsap.fromTo(
      shuffled,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.005,
        stagger: 0.007,
        ease: "power1.out",
      }
    );
  }, [blocks]);

  if (!blocks.length) return null;

  return (
    <div className={styles.pixelBackground}>
      {blocks.map((row, rIdx) => (
        <div key={rIdx} className={styles.row}>
          {row.map((ref, cIdx) => (
            <div key={cIdx} className={styles.block} ref={ref} />
          ))}
        </div>
      ))}
    </div>
  );
}
