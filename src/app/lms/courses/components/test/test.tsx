"use client";
import Button from "@/src/components/button/Button";
import Switch from "@/src/components/switch/Switch";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Test = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Yes");
  return (
    <div className="nu-flex nu-ai-center nu-gap-4">
      <div style={{ width: "200px" }}>
        <Button
          title="go to existing course"
          onClick={() => {
            router.push("/lms/courses/manage-courses/123/builder");
          }}
        />
      </div>
      <Switch
        options={["Yes", "No"]}
        selectedOption={selectedOption}
        onClick={(value) => {
          setSelectedOption(value);
        }}
      />
    </div>
  );
};

export default Test;
