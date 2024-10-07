/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/rate-graph.module.scss";
import RateGraphBar, { RateGraphType } from "./RateGraphBar";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/src/utils/class.utils";

function RateGraph({
  title = "Avg Completion Rate",
  completionRate,
  chartData,
  customInfoRenderer,
}: {
  title?: string;
  completionRate: number;
  chartData: RateGraphType[];
  customInfoRenderer?: () => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [arrowVisibility, setArrowVisibility] = useState({
    left: false,
    right: true,
  });

  const checkIfArrowsShouldShow = () => {
    const area = ref.current!;
    setShowArrows(area.scrollWidth > area.offsetWidth);
  };

  const checkArrowVisibility = () => {
    const area = ref.current!;
    if (area.scrollLeft === 0) {
      setArrowVisibility({
        left: false,
        right: true,
      });
    } else if (area.scrollLeft + area.offsetWidth === area.scrollWidth) {
      setArrowVisibility({
        left: true,
        right: false,
      });
    } else {
      setArrowVisibility({
        left: true,
        right: true,
      });
    }
  };

  useEffect(() => {
    if (ref.current) {
      checkIfArrowsShouldShow();
    }
  }, [ref, chartData]);

  useEffect(() => {
    if (showArrows) {
      ref.current?.addEventListener("scroll", checkArrowVisibility);
    }

    return () => {
      if (showArrows) {
        ref.current?.removeEventListener("scroll", checkArrowVisibility);
      }
    };
  }, [showArrows]);

  const handleArrowClick = (type: "left" | "right") => {
    const area = ref.current!;
    if (type === "left") {
      if (area.scrollLeft === 0) {
        return;
      }
      area.scrollLeft = area.scrollLeft - area.offsetWidth;
    } else {
      if (area.scrollLeft + area.offsetWidth === area.scrollWidth) {
        return;
      }
      area.scrollLeft = area.scrollLeft + area.offsetWidth;
    }
  };
  return (
    <div className={styles["rate-graph-con"]}>
      {customInfoRenderer ? (
        customInfoRenderer()
      ) : (
        <div className={styles["rate-graph-header"]}>
          <p className={styles["rate-graph-title"]}>{title}</p>
          <p className={styles["rate-graph-perc"]}>{completionRate}%</p>
        </div>
      )}
      <div
        className={styles["rate-graph-display"]}
        ref={ref}
        style={
          {
            "--count": chartData.length,
          } as React.CSSProperties
        }
      >
        {chartData.map((data, i) => (
          <RateGraphBar key={i} data={data} />
        ))}
      </div>
      {showArrows && (
        <div
          className={cn(
            "nu-flex nu-column nu-flex-shrink-zero nu-gap-2",
            styles["rate-graph-arrows"]
          )}
        >
          {arrowVisibility.left && (
            <button
              className={styles["arrow__main-con"]}
              onClick={() => handleArrowClick("left")}
            >
              <CaretLeft />
            </button>
          )}{" "}
          {arrowVisibility.right && (
            <button
              className={styles["arrow__main-con"]}
              onClick={() => handleArrowClick("right")}
            >
              <CaretRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default RateGraph;
