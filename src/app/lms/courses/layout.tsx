import Header from "@/src/components/Header/Header";
import React from "react";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <div>
      <Header
        leftComponent={<p>Course summary</p>}
        rightComponent={
          <div
            style={{ height: "36px", width: "200px", backgroundColor: "red" }}
          ></div>
        }
      />
      <p>charts comes here</p>
      <p>here comes the tab components</p>
      {children}
    </div>
  );
}

export default layout;
