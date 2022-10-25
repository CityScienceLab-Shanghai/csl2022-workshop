import styles from "./Sandbox.module.css";

const DecoLine = () => (
  <svg
    width="330"
    height="2"
    viewBox="0 0 330 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.DecoLine}
  >
    <path d="M0 1H438" stroke="#2F2F2F" />
  </svg>
);

const IndicatorCard = ({ title, subTitle, content }) => {
  return (
    <div className={styles.col}>
      <div className={`${styles.siteBox} ${styles.col}`}>
        <div className={`${styles.ind_titleTextSmall}`}>{title}</div>
        <div className={`${styles.ind_titleTextMiddle}`}>{subTitle}</div>
        <DecoLine />

        <div className={styles.legend_1}></div>
        <div className={styles.legend_2}></div>
        <div className={styles.legend_1_text}>proposal</div>
        <div className={styles.legend_2_text}>baseline</div>

        <div className={`${styles.ind_contentTextSmall}`}>{content}</div>
      </div>
    </div>
  );
};

export default IndicatorCard;
