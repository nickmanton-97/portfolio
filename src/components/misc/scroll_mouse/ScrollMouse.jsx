import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollMouse.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollMouse({ target = "#nextSection" }) {
  const mouseRef = useRef(null);

  useEffect(() => {
    if (!mouseRef.current) return;

    const tl = gsap.timeline();

    // Fade in after 2.5s
    tl.fromTo(
      mouseRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 2.5, ease: "power2.out" }
    );

    // Fade out on scroll
    gsap.to(mouseRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "top+=20%",
        scrub: true,
      },
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      gsap.to(window, {
        scrollTo: el.offsetTop,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  return (
    <a
      href={target}
      ref={mouseRef}
      className={styles.mouseDown}
      onClick={handleClick}
    >
      <span />
    </a>
  );
}
