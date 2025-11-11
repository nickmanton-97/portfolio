import styles from "./workitem.module.css";

const ComingSoonItem = ({ clientName, services }) => {
  return (
    <div className={styles.workItem} style={{ opacity: 0.5, pointerEvents: "none" }}>
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
};

export default ComingSoonItem;
