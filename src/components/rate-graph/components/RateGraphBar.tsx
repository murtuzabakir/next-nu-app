/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styles from "../styles/rate-graph.module.scss";
export type RateGraphType = {
  header: string;
  displayText: string;
  chartColor: string;
  customHeaderRender?: () => React.ReactNode;
};

function RateGraphBar({ data }: { data: RateGraphType }) {
  return (
    <div className={styles["rate-graph-bar"]}>
      <div className={styles["rate-graph-info-text-con"]}>
        {data.customHeaderRender ? (
          data.customHeaderRender()
        ) : (
          <p className={styles["rate-header-text"]}>{data.header}</p>
        )}
        <p className={styles["rate-title-text"]}>{data.displayText}</p>
      </div>
      <div
        className={styles["rate-graph-bar-chart"]}
        style={{
          background: data.chartColor,
        }}
      ></div>
    </div>
  );
}

export default RateGraphBar;
