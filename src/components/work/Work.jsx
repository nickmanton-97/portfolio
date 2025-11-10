import { useState, useRef } from "react";
import styles from "./workitem.module.css";
import Divider from "../misc/divider/Divider";
import workData from "./work.json";
import WorkItem from "./WorkItem";

function Work() {
  const projects = Object.values(workData).flat();
  const [openProjectId, setOpenProjectId] = useState(null);
  const workRefs = useRef({});

  const toggleProject = (id) => {
    const newOpenId = openProjectId === id ? null : id;
    setOpenProjectId(newOpenId);

    if (newOpenId && workRefs.current[newOpenId]) {
      const headerEl = workRefs.current[newOpenId].querySelector(
        `.${styles.projectHeader}`
      );
      if (headerEl) {
        const headerTop = headerEl.getBoundingClientRect().top + window.scrollY;
        const scrollTarget = headerTop - 80;
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className={styles.recentWork} id="work">
        <p>Recent work</p>
      </div>

      <div className={styles.workFrame}>
        {projects.map((project) => (
          <WorkItem
            key={project.id}
            project={{
              ...project,
              media: project.images.map((src) => {
                const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
                return {
                  type: isVideo ? "video" : "image",
                  src,
                };
              }),
            }}
            isOpen={openProjectId === project.id}
            toggleProject={toggleProject}
            ref={(el) => (workRefs.current[project.id] = el)}
          />
        ))}

        <Divider start="top 80%" />
      </div>
    </>
  );
}

export default Work;
