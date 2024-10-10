import React from "react";
import styles from "./in-progress-table-cell.module.scss";

const InProgressTableCell = ({
  inprogressCount,
}: {
  inprogressCount: string;
}) => {
  return (
    <div className={styles["inprogress__main-con"]}>
      <p className={styles["header__text"]}>
        {inprogressCount} <span className={styles["spanText"]}> (users)</span>{" "}
      </p>
      <p className={styles["subtext"]}>In- progress</p>
    </div>
  );
};

export default InProgressTableCell;
