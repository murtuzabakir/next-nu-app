"use client";
import { IconSize } from "@/src/constants/iconsize.constant";
import { NotePencil } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./action-component-table-cell.module.scss";

const ActionComponentTableCell = ({
  id,
  courseType,
}: {
  id: string;
  courseType: string;
}) => {
  const router = useRouter();

  return (
    <div className={styles["action__main-con"]}>
      <p className={styles["course__type-text"]}>{courseType}</p>
      <button
        className={styles["button__main-con"]}
        onClick={() => {
          router.push(`/lms/courses/${id}/course-settings`);
        }}
      >
        <NotePencil size={IconSize.M} color="#8E8EA9" />
        <p className={styles["edit__text"]}>Edit</p>
      </button>
    </div>
  );
};

export default ActionComponentTableCell;
