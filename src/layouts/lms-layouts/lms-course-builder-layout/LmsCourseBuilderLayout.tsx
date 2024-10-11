"use client";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Header from "@/src/components/header/Header";
import IconButton from "@/src/components/icon-button/IconButton";
import { IconSize } from "@/src/constants/iconsize.constant";
import CourseBuilderNavbar from "@/src/view/main/lms/components/course-builder-navbar/CourseBuilderNavbar";
import { ArrowLeft, Pencil, Play, Share, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import styles from "./lms-course-builder-layout.module.scss";
import React from "react";

const LmsCourseBuilderLayout = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  const handleEditClick = (courseId: string) => {
    router.push(`/lms/courses/manage-courses/${courseId}`);
  };
  return (
    <div>
      <Header
        classnames="nu-ai-center nu-flex"
        paddingTop={12}
        paddingBottom={12}
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-3 ">
            <IconButton
              icon={<ArrowLeft size={IconSize.L} />}
              onClick={handleBackClick}
            />
            <p className={styles["course__title-text"]}>Course name</p>
            <IconButton
              icon={<Pencil size={IconSize.M} />}
              onClick={() => handleEditClick(id)}
            />
          </div>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-5">
            <Button
              buttonType={ButtonType.primary}
              prefixIcon={<Share size={IconSize.M} />}
              onClick={() => {}}
              title="Publish"
            />
            <IconButton
              icon={<X size={IconSize.XL} />}
              onClick={handleBackClick}
            />
          </div>
        }
      />

      <Header
        leftComponent={<CourseBuilderNavbar id={id} />}
        rightComponent={
          <Button
            className="nu-mt-6 nu-mb-6"
            title="Preview"
            prefixIcon={<Play size={IconSize.M} weight="fill" />}
            onClick={() => {}}
          />
        }
      />
      {children}
    </div>
  );
};

export default LmsCourseBuilderLayout;
