import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.css';

export default function Loader({ menuIsActive }) {
  const containerRef = useRef();

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const blocks = containerRef.current.querySelectorAll('.block');
    const shuffled = shuffle([...blocks]);

    if (menuIsActive) {
      gsap.to(shuffled, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
      });
    } else {
      gsap.to(shuffled, {
        opacity: 0,
        duration: 0.3,
        stagger: 0.02,
      });
    }
  }, [menuIsActive]);

  return (
    <div className={styles.pixelBackground} ref={containerRef}>
      {[...Array(10)].map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {[...Array(10)].map((_, colIndex) => (
            <div key={colIndex} className="block" />
          ))}
        </div>
      ))}
    </div>
  );
}
