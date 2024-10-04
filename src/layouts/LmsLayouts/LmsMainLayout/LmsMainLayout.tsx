"use client";
import { subNavbarRoutes } from "@/src/app/lms/data/subnavbar-routes.data";
import Link from "next/link";
import React from "react";

type Props = { children: React.ReactNode };

function LmsMainLayout({ children }: Props) {
  return (
    <div>
      {subNavbarRoutes.map((ele) => {
        return (
          <Link key={ele.name} href={ele.route}>
            {ele.name}
          </Link>
        );
      })}
      {children}
    </div>
  );
}

export default LmsMainLayout;
