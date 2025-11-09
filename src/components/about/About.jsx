import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText"; // import SplitText plugin
import styles from "./about.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(aboutRef.current, { type: "words" });

    gsap.set(split.words, { opacity: 0.05 });

    gsap.to(split.words, {
      opacity: 1,
      stagger: 0.02,
      duration: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // optional cleanup
    return () => split.revert();
  }, []);

  return (
    <div className={styles.aboutContainer} ref={aboutRef}>
      <h3>
        My name's Nick - I'm a Melbourne-based designer and front-end developer with six years' experience across branding, digital, and web. I create design-led, immersive, and interactive digital experiences.
        <br /><br />
        I love experimenting with how technology can bring ideas to life in unexpected, engaging ways. I'm currently open to new creative opportunities in Melbourne.
      </h3>
    </div>
  );
}

export default About;
