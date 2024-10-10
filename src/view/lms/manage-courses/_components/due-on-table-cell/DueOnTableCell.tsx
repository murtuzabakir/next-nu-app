import React from "react";
import styles from "./due-on-table-cell.module.scss";

const DueOnTableCell = ({ dueOnDate }: { dueOnDate: string }) => {
  return (
    <div className={styles["due__on-main-con"]}>
      <p className={styles["header__text"]}>{dueOnDate}</p>
      <p className={styles["subtext"]}>Due on</p>
    </div>
  );
};

export default DueOnTableCell;
