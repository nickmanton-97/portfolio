import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./navigation.module.css";

const navItems = ["Work", "About", "Contact"];

function Navigation() {
  const navRef = useRef(null);

  // Animate nav into place on load
  useEffect(() => {
    gsap.set(navRef.current, { y: -70, opacity: 0 });
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 2,
    });
  }, []);

  return (
    <div className={styles.NavigationWrapper} ref={navRef}>
      <nav className={styles.NavigationContainer}>
        {/* Logo / Wordmark */}
        <div className={styles.Logo}>Nick Manton</div>

        {/* Navigation Links */}
        <ul className={styles.NavigationItems}>
          {navItems.map((label) => (
            <li key={label} className={styles.item}>
              {label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
