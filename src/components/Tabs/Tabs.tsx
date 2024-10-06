import { cn } from "@/src/utils/class.utils";
import Link from "next/link";
import React from "react";
import styles from "./tabs.module.scss";
import { TabsProps } from "./tabs.types";

function Tabs({ isActive, route, title }: TabsProps) {
  return (
    <Link
      href={route}
      className={cn(`${styles["link__con"]}`, {
        [styles["__active"]]: isActive,
      })}
    >
      <p
        className={cn(`${styles["link__text"]}`, {
          [styles["__active"]]: isActive,
        })}
      >
        {title}
      </p>
    </Link>
  );
}

export default Tabs;
