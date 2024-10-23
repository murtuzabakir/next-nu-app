"use client";
import Button from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/types";
import Header from "@/src/components/Header/Header";
import IconButton from "@/src/components/icon-button/IconButton";
import { IconSize } from "@/src/constants/iconsize.constant";
import CourseBuilderNavbar from "@/src/view/main/lms/components/course-builder-navbar/CourseBuilderNavbar";
import { ArrowLeft, PencilSimple, Play, Share, X } from "@phosphor-icons/react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useRouter } from "next/navigation";
import styles from "./lms-course-builder-layout.module.scss";
import React from "react";
import { Button as MuiBtn } from "@/src/shared/Components/Button/Button";
import {IconButton as MuiIconButton} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
    router.push(`/lms/courses/${courseId}`);
  };
  return (
    <div>
      <Header
        classnames="nu-ai-center nu-flex"
        paddingTop={10}
        paddingBottom={10}
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-3 ">
              <MuiIconButton>
                 <KeyboardBackspaceOutlinedIcon fontSize="medium" className={styles["icon-color"]} />
              </MuiIconButton>
            {/* <IconButton
              icon={<ArrowLeft size={IconSize.L} />}
              onClick={handleBackClick}
            /> */}
            <p className={styles["course__title-text"]}>Course name</p>
              <MuiIconButton>
                 <ModeEditIcon className={styles["icon-color"]}  fontSize="small"/>
              </MuiIconButton>
            {/* <IconButton
              icon={<ModeEditIcon/>}
              onClick={() => handleEditClick(id)}
            /> */}
          </div>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-5">
            <Button
              buttonType={ButtonType.primary}
              prefixIcon={<LaunchOutlinedIcon fontSize={"small"}/>}
              onClick={() => {}}
              title="Publish"
            />
            {/* <IconButton
              icon={<X size={IconSize.XL} />}
              onClick={handleBackClick}
            /> */}
            <MuiIconButton>
               <CloseOutlinedIcon className={styles["icon-color"]} />
            </MuiIconButton>
          </div>
        }
      />

      <Header
        leftComponent={<CourseBuilderNavbar id={id} />}
        rightComponent={
          <Button
            className="nu-mt-6 nu-mb-6"
            title="Preview"
            prefixIcon={<PlayArrowIcon />}
            onClick={() => {}}
          />
        }
      />
      {children}
    </div>
  );
};

export default LmsCourseBuilderLayout;
