import { forwardRef, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./workitem.module.css";
import Divider from "../misc/divider/Divider";

const WorkItem = forwardRef(({ project, isOpen, toggleProject }, ref) => {
  const contentRef = useRef(null);
  const carouselRef = useRef(null);

  // Accordion slide animation
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: el.scrollHeight, opacity: 1, duration: 0.6, ease: "power2.in" }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }
  }, [isOpen]);

  // Scroll carousel by one image width
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const firstImage = carouselRef.current.querySelector(`.${styles.imageFrame}`);
    if (!firstImage) return;

    const gap = 14; // gap between images in px
    const scrollAmount = firstImage.offsetWidth + gap;

    carouselRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.workItem} ref={ref}>
      <Divider start="top 80%" />

      {/* Header */}
      <div className={styles.projectHeader} onClick={() => toggleProject(project.id)}>
        <div className={styles.projectHeaderContent}>
          <div className={styles.projectHeaderText}>
            <h3 className={styles.projectTitle}>{project.clientName}</h3>
            <p className={styles.services}>{project.services}</p>
          </div>
          <div className={styles.accordionButton}>
            <img
              id="open"
              src="open.svg"
              alt="Open"
              style={{ display: isOpen ? "none" : "block" }}
            />
            <img
              id="close"
              src="close.svg"
              alt="Close"
              style={{ display: isOpen ? "block" : "none" }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className={styles.workBodyContent}
        ref={contentRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <div className={styles.workBodyWrapper}>
          <h4 className={styles.description}>{project.description}</h4>
          <ul className={styles.tags}>
            {project.tags.map((tag, i) => (
              <li key={`${project.id}-tag-${i}`}>{tag}</li>
            ))}
          </ul>
        </div>

        {/* Image Carousel */}
        <div className={styles.imageStripContainer} style={{ position: "relative" }}>
          <button
            className={styles.carouselArrowLeft}
            onClick={() => scrollCarousel("left")}
          >
            <img src="/arrow_left.svg" alt="Previous" />
          </button>

          <div className={styles.imageStrip} ref={carouselRef}>
            {project.images.map((image, i) => (
              <div key={i} className={styles.imageFrame}>
                <img src={image} alt={`${project.clientName} image ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <button
            className={styles.carouselArrowRight}
            onClick={() => scrollCarousel("right")}
          >
            <img src="/arrow_right.svg" alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default WorkItem;
