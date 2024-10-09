"use client";
import Header from "@/src/components/header/Header";
import { IconSize } from "@/src/constants/iconsize.constant";
import { ArrowLeft, X } from "@phosphor-icons/react";
import React from "react";
import styles from "./course-details.module.scss";
import { useRouter } from "next/navigation";
import IconButton from "@/src/components/icon-button/IconButton";

const CourseDetails = ({ id }: { id: string | "create" }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/lms/courses/manage-courses");
  };

  return (
    <div>
      <Header
        paddingTop={12}
        paddingBottom={12}
        classnames={styles["course__details-main-con"]}
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-3">
            <IconButton
              onClick={handleBackClick}
              icon={
                <ArrowLeft
                  size={IconSize.XL}
                  color="#09090B"
                  onClick={handleBackClick}
                />
              }
            />
            <p className={styles["course__title-text"]}>
              {id === "create"
                ? "Create course"
                : "Existing course name comes here"}
            </p>
          </div>
        }
        rightComponent={
          <IconButton
            onClick={handleBackClick}
            icon={<X size={IconSize.L} />}
          />
        }
      />

      <p>create course component comes here</p>
    </div>
  );
};

export default CourseDetails;
