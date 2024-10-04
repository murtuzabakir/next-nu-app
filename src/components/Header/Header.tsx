import React from "react";
import styles from "./header.module.scss";
import { cn } from "@/src/utils/class.utils";

type Props = {
  classnames?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
};

function Header({ leftComponent, rightComponent, classnames }: Props) {
  return (
    <div className={cn(styles["header__main-con"], classnames)}>
      <div>{leftComponent}</div>
      <div>{rightComponent}</div>
    </div>
  );
}

export default Header;
