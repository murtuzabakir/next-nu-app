import React from "react";
import styles from "./completion-table-cell.module.scss";

const CompletionTableCell = ({
  completionPercentage,
}: {
  completionPercentage: number;
}) => {
  return (
    <div className={styles["completion__main-con"]}>
      <p className={styles["header__text"]}>
        {completionPercentage}%
        <span className={styles["spanText"]}> (of users)</span>{" "}
      </p>
      <p className={styles["subtext"]}>Completion status</p>
    </div>
  );
};

export default CompletionTableCell;
