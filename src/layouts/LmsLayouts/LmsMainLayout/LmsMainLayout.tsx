import LmsNavBar from "@/src/app/lms/components/LmsNavBar/LmsNavBar";
import React from "react";

type Props = { children: React.ReactNode };

function LmsMainLayout({ children }: Props) {
  return (
    <div>
      <LmsNavBar />
      {children}
    </div>
  );
}

export default LmsMainLayout;
