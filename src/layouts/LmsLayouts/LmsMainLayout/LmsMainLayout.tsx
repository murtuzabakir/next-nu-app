import LmsNavBar from "@/src/app/lms/components/LmsNavBar/LmsNavBar";
import React from "react";
import styles from "./lms-main-layout.module.scss";

type Props = { children: React.ReactNode };

function LmsMainLayout({ children }: Props) {
  return (
    <div className={`${styles["lms__main-layout-con"]}`}>
      <LmsNavBar />
      <div className={`${styles["lms__child-con"]}`}>{children}</div>
    </div>
  );
}

export default LmsMainLayout;
