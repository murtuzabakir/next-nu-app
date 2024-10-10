import React from "react";
import styles from "./total-modules-table-cell.module.scss";

const TotalModulesTableCell = ({
  totalModulesCount,
}: {
  totalModulesCount: number;
}) => {
  return (
    <div className={styles["totalModules__main-con"]}>
      <p className={styles["header__text"]}>{totalModulesCount}</p>
      <p className={styles["subtext"]}>Total modules</p>
    </div>
  );
};

export default TotalModulesTableCell;
