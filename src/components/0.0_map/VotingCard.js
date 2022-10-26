import styles from "./Sandbox.module.css";

const VotingCard = ({ title, subTitle, content }) => {
  return (
    <div className={styles.col}>
      <div className={`${styles.votingBox} ${styles.col}`}>
        <div className={`${styles.titleTextSmall}`}>{title}</div>
        <div className={`${styles.titleTextMiddle}`}>{subTitle}</div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default VotingCard;
