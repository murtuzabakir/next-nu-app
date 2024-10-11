import React, { CSSProperties } from "react";
import styles from "./input.module.scss";
import { cn } from "@/src/utils/class.utils";
import { InputProps } from "./input.types";

function Input({
  placeholder,
  value,
  prefixIcon,
  suffixIcon,
  onChange,
  type,
  width = 291,
  autoWidth = false,
  classnames,
}: InputProps) {
  return (
    <div className={styles["input__main-con"]}>
      {prefixIcon && (
        <div className={`${styles["prefix__div-con"]}`}>{prefixIcon}</div>
      )}
      <input
        style={
          {
            "--_search-width": autoWidth ? "100%" : `${width}px`,
          } as CSSProperties
        }
        className={cn(styles["input__sub-con"], classnames)}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => {
          if (type === "num" || type === "number") {
            onChange(e.target.value.replace(/\D/, ""));
          } else {
            onChange(e.target.value);
          }
        }}
      />
      {suffixIcon && (
        <div className={`${styles["suffix__div-con"]}`}>{suffixIcon}</div>
      )}
    </div>
  );
}

export default Input;
