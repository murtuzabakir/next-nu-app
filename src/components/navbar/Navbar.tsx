import { navbarRoutes } from "@/src/data/navbar-routes.data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="nu-flex nu-ai-center  nu-pl-8">
      <div>
        <Image
          className="nu-mr-8"
          width={27}
          height={27}
          src={"/images/burgerking_logo.svg"}
          alt="logo"
        />
      </div>
      <div className="nu-flex nu-gap-6">
        {navbarRoutes.map((navEle) => {
          return (
            <Link
              href={navEle.route}
              key={navEle.name}
              className="nu-py-10 nu-f-center"
              style={{
                cursor: "pointer",
                userSelect: "none",
                minWidth: "92px",
                height: "100%",
              }}
            >
              <p style={{ fontWeight: 500 }}>{navEle.name}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
