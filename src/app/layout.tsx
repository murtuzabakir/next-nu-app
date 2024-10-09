import type { Metadata } from "next";
import "../styles/globals.scss";
import "./globals.css";
import MainLayout from "../layouts/main-layout/MainLayout";

export const metadata: Metadata = {
  title: "Nymbleup",
  description: "Workforce Planning & Employee Scheduling Software | Nymbleup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <MainLayout>
          <div id="nymbleup-root">{children}</div>
        </MainLayout>
        <div id="nymbleup-portal"></div>
      </body>
    </html>
  );
}
