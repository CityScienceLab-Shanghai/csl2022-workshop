import styles from "./Sandbox.module.css";
import { stateStore } from "../../stores";

const TitleCard = () => {
  const { setPage } = stateStore;

  return (
    <div className={styles.titleBox}>
      <div className={`${styles.titleTextSmall}`}>SoCity Community DAO</div>
      <div className={`${styles.titleTextLarge}`}>Kendall Square</div>
      <div className={`${styles.backBox}`}>
        <div className={`${styles.backButton}`} onClick={() => setPage(2)}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7Z"
              fill="white"
            />
            <path
              d="M8 11L4 7L8 3"
              stroke="#EA4C6F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={`${styles.backText}`} onClick={() => setPage(2)}>
          Go back to tutorial
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
