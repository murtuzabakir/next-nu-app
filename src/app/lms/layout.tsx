import LmsMainLayout from "@/src/layouts/lms-layouts/lms-main-layout/LmsMainLayout";
import React from "react";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return <LmsMainLayout>{children}</LmsMainLayout>;
}

export default layout;
