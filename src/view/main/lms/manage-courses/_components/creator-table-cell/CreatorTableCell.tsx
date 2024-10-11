import React from "react";
import styles from "./creator-table-cell.module.scss";

const CreatorTableCell = ({ createdBy }: { createdBy: string }) => {
  return (
    <div className={styles["creator__main-con"]}>
      <p className={styles["header__text"]}>{createdBy}</p>
      <p className={styles["subtext"]}>Created by</p>
    </div>
  );
};

export default CreatorTableCell;
