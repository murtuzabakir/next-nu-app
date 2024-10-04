import LmsMainLayout from "@/src/layouts/LmsLayouts/LmsMainLayout/LmsMainLayout";
import React from "react";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return <LmsMainLayout>{children}</LmsMainLayout>;
}

export default layout;
