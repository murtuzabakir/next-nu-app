import AuthLayout from "@/src/layouts/auth-layout/AuthLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
