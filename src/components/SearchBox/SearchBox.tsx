import React, { CSSProperties } from "react";
import styles from "./searchbox.module.scss";

type SearchBoxProps = {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placeholder: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "num";
  itemGap?: number;
  width?: number;
};

function SearchBox({
  placeholder,
  value,
  label,
  prefixIcon,
  suffixIcon,
  onChange,
  type,
  itemGap = 8,
  width = 291,
}: SearchBoxProps) {
  return (
    <div
      className={`${styles["search__main-con"]}`}
      style={
        {
          "--gap": `${itemGap}px`,
        } as CSSProperties
      }
    >
      {prefixIcon && (
        <div className={`${styles["prefix__div-con"]}`}>{prefixIcon}</div>
      )}
      <input
        style={
          {
            "--_search-width": `${width}px`,
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
