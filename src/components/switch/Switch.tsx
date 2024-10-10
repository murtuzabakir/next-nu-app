"use client";
import React, { useCallback } from "react";
import styles from "./switch.module.scss";
import { cn } from "@/src/utils/class.utils";

const Switch = ({
  options,
  selectedOption,
  onClick,
  isDisabled = false,
  readonly = false,
}: {
  options: {
    label: string;
    value: string;
  }[];
  selectedOption: string;
  onClick: (value: string) => void;
  isDisabled?: boolean;
  readonly?: boolean;
}) => {
  const handleOnClick = useCallback(
    (val: string) => {
      if (isDisabled || readonly) return;
      onClick(val);
    },
    [, readonly, isDisabled, onClick]
  );
  return (
    <div
      className={cn(styles["switch__main-con"], {
        [styles["disabled"]]: isDisabled,
      })}
    >
      {options.map((option, index) => {
        return (
          <button
            disabled={isDisabled}
            onClick={() => handleOnClick(option.value)}
            key={option.value}
            className={cn(styles["option__con"], {
              [styles["selected"]]: option.value === selectedOption,
              [styles["disabled"]]: isDisabled,
              [styles["readonly"]]: readonly,
            })}
          >
            <p
              className={cn(styles["option__text"], {
                [styles["selected"]]: option.value === selectedOption,
              })}
            >
              {option.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default Switch;
