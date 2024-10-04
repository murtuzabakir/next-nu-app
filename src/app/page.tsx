"use client";
import { useRouter } from "next/navigation";
import { cn } from "../utils/class.utils";

export default function Home() {
  const router = useRouter();
  return (
    <div
      className={cn(
        "nu-w-screen nu-h-screen nu-flex nu-ai-center nu-jc-center",
        {
          "test-new": false,
        }
      )}
    >
      <p
        onClick={() => {
          router.push(`/lms/${1}?test=ronith`);
        }}
      >
        Initial setup{" "}
      </p>
    </div>
  );
}
