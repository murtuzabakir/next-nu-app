import { cn } from "@/src/utils/class.utils";
import Link from "next/link";
import React from "react";
import styles from "./tabs.module.scss";

type Props = {
  route: string;
  title: string;
  isActive: boolean;
};

function Tabs({ isActive, route, title }: Props) {
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
