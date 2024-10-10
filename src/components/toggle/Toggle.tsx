/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import styles from "./toggle.module.scss";
import { cn } from "@/src/utils/class.utils";

type ToggleProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: unknown;
  readonly?: boolean;
};

const Toggle = ({
  checked = false,
  disabled = false,
  onChange,
  className,
  readonly = false,
}: ToggleProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    if (checked != isChecked) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleOnClick = useCallback(() => {
    if (disabled || readonly) return;
    setIsChecked(!isChecked);
    if (onChange) onChange(!isChecked);
  }, [onChange, disabled, readonly, isChecked]);

  return (
    <div
      role="button"
      className={cn(
        styles["p-toggle-con"],
        { [styles.checked]: isChecked, [styles.disabled]: disabled },
        className
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          handleOnClick();
        }
      }}
      onClick={handleOnClick}
    ></div>
  );
};

export default Toggle;
