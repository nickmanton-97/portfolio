import { useState, useRef } from "react";
import styles from "./workitem.module.css";
import Divider from "../misc/divider/Divider";
import workData from "./work.json";
import WorkItem from "./WorkItem";

function Work() {
  const projects = Object.values(workData).flat(); // flatten once
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
        const scrollTarget = headerTop - 20;
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
      }
    }
  };

  return (
    <div className={styles.workFrame}>
      {projects.map((project) => (
        <WorkItem
          key={project.id}
          project={project}
          isOpen={openProjectId === project.id}
          toggleProject={toggleProject}
          ref={(el) => (workRefs.current[project.id] = el)}
        />
      ))}
      <Divider start="top 80%" />
    </div>
  );
}

export default Work;
