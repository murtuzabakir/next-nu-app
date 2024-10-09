import { cn } from "@/src/utils/class.utils";
import React from "react";
import styles from "./icon-button.module.scss";

const IconButton = ({
  icon,
  classnames,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  classnames?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(styles["icon__button"], classnames)}
    >
      {icon}
    </button>
  );
};

export default IconButton;
