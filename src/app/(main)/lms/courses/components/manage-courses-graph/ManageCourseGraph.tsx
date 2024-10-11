import React from "react";
import styles from "./manage-courses-graph.module.scss";
import RateGraph from "@/src/components/rate-graph/components/RateGraph";
import { RateGraphType } from "@/src/components/rate-graph/components/RateGraphBar";
type Props = {};

function ManageCourseGraph({}: Props) {
  const chartData: RateGraphType[] = [
    {
      header: "30",
      chartColor: "#0AE2FF",
      displayText: "Total courses",
    },
    {
      header: "30",
      chartColor: "#CE0AFF",
      displayText: "Total active courses",
    },
    {
      header: "18",
      chartColor: "#96BF1D",
      displayText: "Courses in draft",
    },
    {
      header: "30",
      chartColor: "#FFC90A",
      displayText: "Total users",
    },
    {
      header: "22",
      chartColor: "#FF0A60",
      displayText: "Active users",
    },
    {
      header: "18",
      chartColor: "#1DBF73",
      displayText: "Mandatory courses",
    },
    {
      header: "10",
      chartColor: "#3F42E4",
      displayText: "Completed mandatory",
    },
    {
      header: "10",
      chartColor: "#E43F3F",
      displayText: "To start",
    },
  ];

  return (
    <div className={styles["manage-courses-garph__main-con"]}>
      <div className={styles["sub__con"]}>
        <RateGraph
          completionRate={30}
          chartData={chartData}
          // customInfoRenderer={() => <p>this is left component here</p>}
        />
      </div>
    </div>
  );
}

export default ManageCourseGraph;
