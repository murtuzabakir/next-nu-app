import type { Metadata } from "next";
import "../styles/globals.scss";

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
        <div id="nymbleup-root">{children}</div>
        <div id="nymbleup-portal"></div>
      </body>
    </html>
  );
}
