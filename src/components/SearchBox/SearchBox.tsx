import React, { CSSProperties } from "react";
import styles from "./searchbox.module.scss";
import { SearchBoxProps } from "./searchbox.types";

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
}: SearchBoxProps) {
  return (
    <div className={`${styles["search__main-con"]}`}>
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
        id={label.toLowerCase()}
        name={label.toLowerCase()}
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
