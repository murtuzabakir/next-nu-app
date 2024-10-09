import React from "react";

const page = ({ params }: { params: { id: string | "create" } }) => {
  console.log(params.id);
  return <div>id page</div>;
};

export default page;
