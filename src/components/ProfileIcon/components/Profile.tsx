"use client";
import { IconSize } from "@/src/constants/iconsize.constant";
import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/profile.module.scss";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  return (
    <button
      className={styles["profile__main-con"]}
      onClick={() => setVisible(!visible)}
    >
      <div className="nu-position-relative">
        <Image
          className={styles["profile__icon"]}
          src={
            "https://as2.ftcdn.net/v2/jpg/03/34/13/15/1000_F_334131546_NpUIxz0QWEwyUIDAkC9dtrwdr0AXxoHB.jpg"
          }
          width={27}
          height={27}
          alt="profile pic"
        />
        <div className={styles["profile__icon-dot"]} />
      </div>
      <CaretDown size={IconSize.S} color="black" />
    </button>
  );
};

export default Profile;
