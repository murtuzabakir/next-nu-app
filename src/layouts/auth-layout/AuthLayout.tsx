"use client";
import Image from "next/image";
import React from "react";
import styles from "./auth-layout.module.scss";
import { cn } from "@/src/utils/class.utils";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["auth__main-layout-con"]}>
      <Image src={"/images/logo.png"} alt="logo" width={204} height={75} />
      <div className={styles["auth__children-con"]}>{children}</div>
      <footer>
        <div className="nu-flex nu-ai-center nu-gap-5">
          <p className={styles["footer__text"]}>© 2024 Nymbleup Limited</p>
          <button className={cn(styles["footer__text"], styles["underline"])}>
            Privacy Policy
          </button>
          <button className={cn(styles["footer__text"], styles["underline"])}>
            Support
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
