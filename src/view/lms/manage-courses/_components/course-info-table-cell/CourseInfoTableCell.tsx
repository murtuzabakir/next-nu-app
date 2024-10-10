import styles from "./course-info-table-cell.module.scss";
import Image from "next/image";
import React from "react";

const CourseInfoTableCell = ({
  courseName,
  createdOn,
  courseCategory,
  courseImgUrl,
}: {
  courseName: string;
  createdOn: string;
  courseCategory: string;
  courseImgUrl: string;
}) => {
  return (
    <div className={styles["course__info-table-cell-main-con"]}>
      <Image
        src={courseImgUrl}
        alt="course img"
        width={40}
        height={40}
        className={styles["image__con"]}
      />
      <div className="nu-flex nu-column nu-gap-1">
        <p className={styles["header__text"]}>{courseName}</p>
        <div className="nu-flex nu-ai-center nu-gap-1">
          <p className={styles["subtext"]}>Created on: {createdOn}</p>
          <div className={styles["dot"]}></div>
          <p className={styles["info__subtext"]}>{courseCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoTableCell;
