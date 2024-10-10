"use client";
import Button from "@/src/components/button/Button";
import Switch from "@/src/components/switch/Switch";
import Toggle from "@/src/components/toggle/Toggle";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Test = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Non-mandatory");
  return (
    <div className="nu-flex nu-ai-center nu-gap-4">
      <div style={{ width: "200px" }}>
        <Button
          title="go to existing course"
          onClick={() => {
            router.push("/lms/courses/manage-courses/123/course-settings");
          }}
        />
      </div>
      <Switch
        options={["Non-mandatory", "Mandatory"]}
        selectedOption={selectedOption}
        onClick={(value) => {
          setSelectedOption(value);
        }}
      />
      <Toggle
        checked={true}
        onChange={(val) => {
          console.log(val);
        }}
      />
    </div>
  );
};

export default Test;
