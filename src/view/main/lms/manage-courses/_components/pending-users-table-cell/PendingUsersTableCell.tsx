import React from "react";
import styles from "./pending-users-table-cell.module.scss";

const PendingUsersTableCell = ({
  pendingUsersCount,
}: {
  pendingUsersCount: string;
}) => {
  return (
    <div className={styles["pending__users-main-con"]}>
      <p className={styles["header__text"]}>
        {pendingUsersCount} <span className={styles["spanText"]}> (users)</span>{" "}
      </p>
      <p className={styles["subtext"]}>Pending</p>
    </div>
  );
};

export default PendingUsersTableCell;
