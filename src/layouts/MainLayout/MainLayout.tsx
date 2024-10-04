import Navbar from "@/src/components/navbar/Navbar";
import React from "react";

type Props = { children: React.ReactNode };

function MainLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
