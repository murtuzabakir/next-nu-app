import React from "react";

const page = () => {
  return (
    <div>
      {Array.from({ length: 50 }).map((e, i) => (
        <p key={i}>here </p>
      ))}
    </div>
  );
};

export default page;
