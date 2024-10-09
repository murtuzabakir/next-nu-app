import React, { CSSProperties } from "react";
import styles from "./header.module.scss";
import { cn } from "@/src/utils/class.utils";

type Props = {
  classnames?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  paddingTop?: number;
  paddingBottom?: number;
};

function Header({
  leftComponent,
  rightComponent,
  classnames,
  paddingBottom = 0,
  paddingTop = 0,
}: Props) {
  return (
    <div
      style={
        {
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        } as CSSProperties
      }
      className={cn(styles["header__main-con"], classnames)}
    >
      <div>{leftComponent}</div>
      <div>{rightComponent}</div>
    </div>
  );
}

export default Header;
