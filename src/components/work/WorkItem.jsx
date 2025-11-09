import { forwardRef, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./workitem.module.css";
import Divider from "../misc/divider/Divider";

const WorkItem = forwardRef(({ project, isOpen, toggleProject }, ref) => {
  const contentRef = useRef(null);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: "power2.out" });
    }
  }, [isOpen]);

  // Update arrow states
  const updateArrowState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // Scroll carousel by one image width + gap
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const firstImage = carouselRef.current.querySelector(`.${styles.imageFrame}`);
    if (!firstImage) return;

    const gap = 24;
    const scrollAmount = firstImage.offsetWidth + gap;

    carouselRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  // Track scroll to update arrow opacity
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    updateArrowState();
    carousel.addEventListener("scroll", updateArrowState);
    window.addEventListener("resize", updateArrowState);

    return () => {
      carousel.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, []);

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
          <div
            className={styles.accordionButton}
            style={{ mixBlendMode: "color-dodge" }} // Invert effect
          >
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
        <div className={styles.imageStripContainer}>
          <div className={styles.imageStrip} ref={carouselRef}>
            {project.images.map((image, i) => (
              <div key={i} className={styles.imageFrame}>
                <img
                  src={image}
                  alt={`${project.clientName} image ${i + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Carousel Arrows */}
          <button
            className={styles.carouselArrowLeft}
            onClick={() => scrollCarousel("left")}
            style={{ opacity: canScrollLeft ? 1 : 0.3 }}
          >
            <img src="/arrow_left.svg" alt="Previous" />
          </button>
          <button
            className={styles.carouselArrowRight}
            onClick={() => scrollCarousel("right")}
            style={{ opacity: canScrollRight ? 1 : 0.3 }}
          >
            <img src="/arrow_right.svg" alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default WorkItem;
