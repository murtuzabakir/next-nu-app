"use client";
import Button from "@/src/components/Button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Test = () => {
  const router = useRouter();
  return (
    <div style={{ width: "200px" }}>
      <Button
        title="go to existing course"
        onClick={() => {
          router.push("/lms/courses/manage-courses/123/builder");
        }}
      />
    </div>
  );
};

export default Test;
