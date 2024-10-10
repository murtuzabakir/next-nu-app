import React from "react";
import styles from "./completed-table-cell.module.scss";

const CompletedTableCell = ({ completedCount }: { completedCount: string }) => {
  return (
    <div className={styles["completed__main-con"]}>
      <p className={styles["header__text"]}>
        {completedCount} <span className={styles["spanText"]}> (users)</span>{" "}
      </p>
      <p className={styles["subtext"]}>Completed</p>
    </div>
  );
};

export default CompletedTableCell;
