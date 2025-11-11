import { useState, useRef } from "react";
import styles from "./workitem.module.css";
import Divider from "../misc/divider/Divider";
import workData from "./work.json";
import WorkItem from "./WorkItem";

function ComingSoonItem({ clientName, services }) {
  return (
    <div className={styles.workItem} style={{ opacity: 0.5 }}>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderContent}>
          <div className={styles.projectHeaderText}>
            <h3 className={styles.projectTitle}>{clientName || "Coming Soon"}</h3>
            {services && <p className={styles.services}>{services}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Work() {
  const projects = Object.values(workData).flat();
  const [openProjectId, setOpenProjectId] = useState(null);
  const workRefs = useRef({});

  const toggleProject = (id) => {
    const newOpenId = openProjectId === id ? null : id;
    setOpenProjectId(newOpenId);
    // Removed scroll-to-header logic
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
              media: (project.images || []).map((src) => {
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

        {/* Coming Soon Items */}
        <ComingSoonItem clientName="JAM Architects" services="Development (Coming soon)" />

        {/* Faded divider between coming soon items */}
        <Divider
          start="top 80%"
          style={{ opacity: 0.3, margin: "24px 0" }}
        />

        <ComingSoonItem clientName="Natalie Daskalou" services="Development (Coming soon)" />
      </div>
    </>
  );
}

export default Work;
