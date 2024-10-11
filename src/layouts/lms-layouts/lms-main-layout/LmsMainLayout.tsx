import React from "react";
import styles from "./lms-main-layout.module.scss";
import LmsNavBar from "@/src/view/main/lms/components/lms-nav-bar/LmsNavBar";

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
