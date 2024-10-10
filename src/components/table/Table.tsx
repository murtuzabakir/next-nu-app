import React from "react";
import styles from "./table.module.scss";

const Table = ({
  cellsGap,
  showBorder,
  rows,
}: {
  cellsGap?: number;
  showBorder?: boolean;
  rows: {
    id: string;
    cells: { component: React.ReactNode }[];
    rightComponent?: React.ReactNode;
  }[];
}) => {
  return (
    <div className={styles["table__main-con"]}>
      {rows.map((row) => {
        return (
          <div key={row.id} className={styles["row__main-con"]}>
            <div className={styles["row__cells-parent-con"]}>
              {row.cells.map((cell, index) => {
                return <div key={index}>{cell.component}</div>;
              })}
            </div>
            {row.rightComponent && row.rightComponent}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
