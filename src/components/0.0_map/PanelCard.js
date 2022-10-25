import styles from "./Sandbox.module.css";

const PanelCard = ({ title, subTitle, content }) => {
  return (
    <div className={styles.col}>
      <div className={`${styles.siteBox} ${styles.col}`}>
        <div className={`${styles.titleTextSmall}`}>{title}</div>
        <div className={`${styles.titleTextMiddle}`}>{subTitle}</div>
        <div className={`${styles.contentTextSmall}`}>{content}</div>
      </div>
    </div>
  );
};

export default PanelCard;
