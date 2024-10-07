import React, { CSSProperties } from "react";
import styles from "./searchbox.module.scss";
import { SearchBoxProps } from "./searchbox.types";
import { cn } from "@/src/utils/class.utils";

function SearchBox({
  placeholder,
  value,
  label,
  prefixIcon,
  suffixIcon,
  onChange,
  type,
  width = 291,
  autoWidth = false,
  classnames,
}: SearchBoxProps) {
  return (
    <div className={cn(styles["search__main-con"], classnames)}>
      {prefixIcon && (
        <div className={`${styles["prefix__div-con"]}`}>{prefixIcon}</div>
      )}
      <input
        style={
          {
            "--_search-width": autoWidth ? "100%" : `${width}px`,
          } as CSSProperties
        }
        className={`${styles["search__input-con"]}`}
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

export default SearchBox;
