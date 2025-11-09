import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "./navigation.module.css";
import Hamburger from "./Hamburger";

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "mailto:mantonnick@outlook.com" },
];

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

    // Animate nav items in reverse order (Contact → About → Work)
    const reversedItems = [...navItemsRef.current].reverse();

    timeline.current.to(reversedItems, {
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

  // Handle nav item clicks (smooth scroll or mailto)
  const handleNavClick = (href) => (e) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        // Scroll with offset for fixed header (adjust 80 if needed)
        gsap.to(window, {
          scrollTo: target.offsetTop - 80,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    } else if (href.startsWith("mailto:")) {
      window.location.href = href;
    }
  };

  return (
    <div className={styles.NavigationWrapper} ref={navRef}>
      <nav className={styles.NavigationContainer}>
        {/* Logo / Wordmark */}
        <div className={styles.Logo}>Nick Manton</div>

        {/* Right-side container for nav items + hamburger */}
        <div className={styles.NavRight}>
          <ul className={styles.NavigationItems}>
            {navItems.map((item, i) => (
              <li
                key={item.label}
                className={styles.item}
                ref={(el) => (navItemsRef.current[i] = el)}
              >
                <a
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {item.label}
                </a>
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
