import styles from "./Sandbox.module.css";

const SiteCard = () => {
  return (
    <div className={styles.col}>
      <div className={`${styles.siteBox} ${styles.col}`}>
        <div className={`${styles.titleTextSmall}`}>Site Information</div>
        <div className={`${styles.titleTextMiddle}`}>Name of building</div>
        <div className={`${styles.contentTextSmall}`}>
          PLaceholder PLaceholder PLaceholder PLaceholder PLaceholder
          PLaceholder PLaceholder PLaceholder PLaceholder PLaceholder
          PLaceholder PLaceholder PLaceholder PLaceholder PLaceholder
          PLaceholder PLaceholder PLaceholder
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
