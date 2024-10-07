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
      <div style={{ marginLeft: "10px" }}>
        {data.customHeaderRender ? (
          data.customHeaderRender()
        ) : (
          <p className="nu-ml-1">{data.header}</p>
        )}
        <div className="flex column gap-2">
          <p className="nu-ml-1">{data.displayText}</p>
        </div>
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
