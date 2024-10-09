import React from "react";

const LmsCourseBuilderLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <p>topbar</p>
      <p>tabs</p>
      {children}
    </div>
  );
};

export default LmsCourseBuilderLayout;
