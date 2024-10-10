import React from "react";
import styles from "./total-users-table-cell.module.scss";

const TotalusersTableCell = ({
  totalUsersCount,
}: {
  totalUsersCount: number;
}) => {
  return (
    <div className={styles["users__main-con"]}>
      <p className={styles["header__text"]}>{totalUsersCount}</p>
      <p className={styles["subtext"]}>Created by</p>
    </div>
  );
};

export default TotalusersTableCell;
