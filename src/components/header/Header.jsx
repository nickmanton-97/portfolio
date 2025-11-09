import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./header.module.css";

gsap.registerPlugin(SplitText, ScrollTrigger);

function Header() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const split = new SplitText(heroRef.current, { type: "lines" });

    // Entrance animation
    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      delay: 1.25,
    });

    // Fade out hero
    gsap.to(heroRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body, // fade based on whole page scroll
        start: "top top",
        end: "top+=20%",        // fade completes quickly
        scrub: true,
      },
    });

    return () => split.revert();
  }, []);

  return (
    <>
    <div className={styles.heroContainer}>
      <h1 className={styles.heroText} ref={heroRef}>
        I’m a designer and front-end developer building digital experiences,
        from concept to code.
      </h1>
    </div>
    </>
  );
}

export default Header;
