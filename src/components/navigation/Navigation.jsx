import { useEffect, useRef, useState } from "react";
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
  const navTimeline = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial page entrance and hide nav items
  useEffect(() => {
    gsap.set(navRef.current, { y: -70, opacity: 0 });
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 2,
    });

    gsap.set(navItemsRef.current, { opacity: 0, x: 50 });
  }, []);

  // create nav items timeline (start = closed)
  useEffect(() => {
    navTimeline.current = gsap.timeline({ paused: true });
    const reversedItems = [...navItemsRef.current].reverse();
    navTimeline.current.to(reversedItems, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.3,
      ease: "power2.out",
    });
    // ensure timeline starts at the closed position (progress 0)
    navTimeline.current.progress(0);
  }, []);

  // When burger is clicked, toggle state and timeline
  const handleBurgerClick = () => {
    const navTl = navTimeline.current;
    if (!navTl) {
      setIsMenuOpen((s) => !s);
      return;
    }

    if (!isMenuOpen) {
      navTl.play();
      setIsMenuOpen(true);
    } else {
      navTl.reverse();
      setIsMenuOpen(false);
    }
  };

  // clicking a nav link: scroll or mailto then close menu
  const handleNavClick = (href) => (e) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          scrollTo: target.offsetTop - 80,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    } else if (href.startsWith("mailto:")) {
      window.location.href = href;
    }

    // Close menu if open
    if (navTimeline.current) navTimeline.current.reverse();
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.NavigationWrapper} ref={navRef}>
      <nav className={styles.NavigationContainer}>
        <div className={styles.Logo}>Nick Manton</div>

        <div className={styles.NavRight}>
          <ul
            className={`${styles.NavigationItems} ${
              !isMenuOpen ? styles.navClosed : ""
            }`}
          >
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

          {/* parent handles click; pass isMenuOpen so Hamburger can animate */}
          <div onClick={handleBurgerClick} style={{ cursor: "pointer" }}>
            <Hamburger isOpen={isMenuOpen} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
