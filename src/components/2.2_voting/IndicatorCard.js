import styles from "./IndicatorCard.module.css";

import BarChart from "../0.4_charts/BarCharts"
import _BAR_DATA from "../../data/charts/bar_chart.json"
const IndicatorCard = () => {
  return (
    <div className={styles.card}>
      <BarChart data={_BAR_DATA}/>
    </div>
  );
};

export default IndicatorCard;
