"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.scss";
import { cn } from "@/src/utils/class.utils";
import { usePathname } from "next/navigation";
import { navbarRoutes } from "@/src/data/navbar-routes.data";
import Profile from "../../ProfileIcon/components/Profile";

const Navbar = () => {
  const pathName = usePathname();
  const getActive = (route: string): boolean => {
    return pathName.includes(route);
  };

  return (
    <nav className={`${styles["navbar__main-con"]}`}>
      <div className="nu-flex nu-ai-center">
        <Image
          className="nu-mr-8"
          width={27}
          height={27}
          src={"/images/burgerking_logo.svg"}
          alt="logo"
        />
        <div className="nu-flex nu-gap-5">
          {navbarRoutes.map((navEle) => {
            return (
              <Link
                href={navEle.route}
                key={navEle.activeKey}
                className={cn(`${styles["link__con"]}`, {
                  [styles["active"]]: getActive(navEle.activeKey),
                })}
              >
                <p
                  className={cn(`${styles["link__text"]}`, {
                    [styles["active"]]: getActive(navEle.activeKey),
                  })}
                >
                  {navEle.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      <Profile />
    </nav>
  );
};

export default Navbar;
