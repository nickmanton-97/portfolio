import { useState, useEffect } from 'react';
import styles from './PixelCursor.module.css';
import Header from '../header/Header';
import ScrollMouse from "../misc/scroll_mouse/ScrollMouse";

export default function PixelCursor() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBlocks = () => {
    if (!windowWidth) return null;
    const blockSize = windowWidth * 0.05;
    const nbOfBlocks = Math.ceil(window.innerHeight / blockSize);

    return [...Array(nbOfBlocks).keys()].map((_, index) => (
      <div
        key={index}
        className={styles.block}
        onMouseEnter={(e) => colorize(e.target)}
      />
    ));
  };

  const colorize = (el) => {
    el.style.backgroundColor = 'black';
    setTimeout(() => {
      el.style.backgroundColor = 'transparent';
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Header />
      </div>

      {/* Move scroll mouse OUTSIDE .body */}
      <ScrollMouse className={styles.scrollMouse} />

      <div className={styles.grid}>
        {[...Array(20).keys()].map((_, colIndex) => (
          <div key={colIndex} className={styles.column}>
            {getBlocks()}
          </div>
        ))}
      </div>
    </div>
  );
}
