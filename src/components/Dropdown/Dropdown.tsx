import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./dropdown.module.scss";
import { CaretDown } from "@phosphor-icons/react";

type Props = {
  label: string;
  placeholder: string;
  selectedOption: string;
  options: {
    label: string;
    secondaryLabel?: string;
    value: string;
    customRenderer?: (option: DropdownOptionType) => React.ReactNode;
  }[];
  isSearchable?: boolean;
  disabled?: boolean;
  showPlaceholder?: boolean;
  readonly?: boolean;
  onOpen?: () => void;
  onFocus?: () => void;
  onChange?: (val: string, index: number) => void;
};

type DropdownOptionType<T = undefined> = {
  label: string;
  value: string;
  secondaryLabel?: string;
  data?: T;
};

function Dropdown({
  label,
  options,
  placeholder,
  selectedOption,
  disabled,
  isSearchable = false,
  showPlaceholder = false,
  onFocus,
  onOpen = () => {},
  onChange,
  readonly = false,
}: Props) {
  const dropdownRef = useRef<any>(null);
  const optionsRef = useRef<any>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [currentKeyboardSelectedIndex, setCurrentKeyboardSelectedIndex] =
    useState(-1);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropDownClick = () => {
    if (disabled || readonly) return;
    // isSearchable && inputRef.current?.focus();
    if (!open) {
      onFocus && onFocus();
      onOpen();
    } else {
      // inputRef.current?.blur();
    }
    setOpen(!open);
  };

  const filteredOptions = useMemo(() => {
    if (isSearchable) {
      return options.filter((option) =>
        option.label?.toLowerCase().includes("searchTerm".toLowerCase())
      );
    }
    return options;
  }, [isSearchable, options]);

  return (
    <button
      className={styles["dropdown__main-con"]}
      ref={dropdownRef}
      onClick={(e) => {
        e.stopPropagation();
        handleDropDownClick();
      }}
    >
      <div className="nu-flex nu-ai-center">
        <div className={styles["dropdown__placeholder-text-con"]}>
          <p className={styles["placeholder-text"]}>{label}</p>
          <div className={styles["divider-con"]}></div>
        </div>
        <div className={styles["dropdown__right-con"]}>
          <p className={styles["selected__option-text"]}>{selectedOption}</p>
          <CaretDown size={10} />
        </div>
      </div>
      {open && (
        <div
          className={styles["options__main-con"]}
          ref={optionsRef}
          onClick={(e) => e.stopPropagation()}
        >
          {filteredOptions.map((e) => {
            return <p key={e.label}>{e.label}</p>;
          })}
        </div>
      )}
    </button>
  );
}

export default Dropdown;
