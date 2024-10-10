import React from "react";
import styles from "./info-tile.module.scss";

const Infotile = ({
  title,
  rightComponent,
}: {
  title: string;
  rightComponent: React.ReactNode;
}) => {
  return (
    <div className={styles["info__tile-main-con"]}>
      <div className="nu-flex nu-ai-center nu-gap-1">
        <p className={styles["title__text"]}>{title}</p>
        <div className={styles["divider-con"]}></div>
      </div>
      {rightComponent}
    </div>
  );
};

export default Infotile;
