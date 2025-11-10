import { forwardRef, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./workitem.module.css";
import Divider from "../misc/divider/Divider";

const WorkItem = forwardRef(({ project, isOpen, toggleProject }, ref) => {
  const contentRef = useRef(null);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const videoObserverRef = useRef(null);

  // Helper: convert possible "public/..." paths to root-relative paths
  const normaliseSrc = (src) => {
    if (!src) return src;
    if (src.startsWith("http") || src.startsWith("/")) return src;
    if (src.startsWith("public/")) return `/${src.replace(/^public\//, "")}`;
    return src;
  };

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

  // Lazy-load / autoplay videos when they come into view
  useEffect(() => {
    if (!carouselRef.current) return;

    // Clean up previous observer
    if (videoObserverRef.current) {
      videoObserverRef.current.disconnect();
      videoObserverRef.current = null;
    }

    const videos = carouselRef.current.querySelectorAll("video[data-src]");

    if (videos.length === 0) return;

    const options = {
      root: carouselRef.current,
      rootMargin: "0px",
      threshold: 0.35, // start loading when ~35% visible
    };

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          // set src only once
          if (!vid.getAttribute("src")) {
            const dataSrc = vid.dataset.src;
            if (dataSrc) {
              vid.src = dataSrc;
              // optional: load metadata first then play
              vid.load();
              // try to play; muted is required for autoplay in many browsers
              const p = vid.play();
              if (p && p.catch) {
                p.catch(() => {
                  /* play blocked; ignore */
                });
              }
            }
          } else {
            // if src already set, ensure it's playing
            if (vid.paused) {
              vid.play().catch(() => {});
            }
          }
        } else {
          // optionally pause when out of view to reduce CPU/bandwidth
          if (!vid.paused) {
            try {
              vid.pause();
            } catch (e) {
              /* ignore */
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, options);
    videoObserverRef.current = observer;

    videos.forEach((v) => observer.observe(v));

    return () => {
      if (videoObserverRef.current) {
        videoObserverRef.current.disconnect();
        videoObserverRef.current = null;
      }
    };
  }, [isOpen, project.images]); // re-run when open toggles or images change

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
            {project.images.map((image, i) => {
              const src = normaliseSrc(image);
              const isVideo =
                typeof src === "string" &&
                (src.toLowerCase().endsWith(".mp4") || src.toLowerCase().endsWith(".webm"));

              return (
                <div key={i} className={styles.imageFrame}>
                  {isVideo ? (
                    <video
                      // data-src used for lazy-loading; observer will set src when visible
                      data-src={src}
                      preload="none"
                      muted
                      loop
                      playsInline
                      // autoplay controlled via IntersectionObserver when src set
                    />
                  ) : (
                    <img src={src} alt={`${project.clientName} image ${i + 1}`} loading="lazy" />
                  )}
                </div>
              );
            })}
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
