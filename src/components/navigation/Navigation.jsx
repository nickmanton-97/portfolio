import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./navigation.module.css";
import Hamburger from "./Hamburger";

const navItems = ["Work", "About", "Contact"];

function Navigation() {
  const navRef = useRef(null);
  const navItemsRef = useRef([]);
  const timeline = useRef(null);

  // Animate nav into place on page load
  useEffect(() => {
    gsap.set(navRef.current, { y: -70, opacity: 0 });
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 2,
    });

    // Initialize nav items hidden offscreen for hamburger toggle
    gsap.set(navItemsRef.current, { opacity: 0, x: 50 });
  }, []);

  // Hamburger click triggers staggered nav items
  useEffect(() => {
    const burger = document.getElementById("burger");

    timeline.current = gsap.timeline({ paused: true, reversed: true });
    timeline.current.to(navItemsRef.current, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.3,
      ease: "power2.out",
    });

    const handleClick = () => {
      timeline.current.reversed() ? timeline.current.restart() : timeline.current.reverse();
    };

    burger.addEventListener("click", handleClick);
    return () => burger.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className={styles.NavigationWrapper} ref={navRef}>
      <nav className={styles.NavigationContainer}>
        {/* Logo / Wordmark */}
        <div className={styles.Logo}>Nick Manton</div>

        {/* Right-side container for nav items + hamburger */}
        <div className={styles.NavRight}>
          <ul className={styles.NavigationItems}>
            {navItems.map((label, i) => (
              <li
                key={label}
                className={styles.item}
                ref={(el) => (navItemsRef.current[i] = el)}
              >
                {label}
              </li>
            ))}
          </ul>

          <Hamburger />
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
