/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./dropdown.module.scss";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/src/utils/class.utils";

type Props = {
  label: string;
  placeholder: string;
  value: string;
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
  onChange?: (val: any, index: number) => void;
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
  value,
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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const filterRef = React.useRef<(HTMLDivElement | null)[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [currentKeyboardSelectedIndex, setCurrentKeyboardSelectedIndex] =
    useState(-1);

  //changed
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

  useEffect(() => {
    if (optionsRef.current && open && dropdownRef.current) {
      const dropdownData = dropdownRef.current.getBoundingClientRect();
      const boxData = optionsRef.current.getBoundingClientRect();
      if (
        dropdownData.y + dropdownData.height + boxData.height + 20 >
        window.innerHeight
      ) {
        optionsRef.current.style.removeProperty("top");
        optionsRef.current.style.setProperty("bottom", `calc(100% + 4px)`);
      } else {
        optionsRef.current.style.removeProperty("bottom");
        optionsRef.current.style.setProperty("top", `calc(100% + 4px)`);
      }
    }
  }, [optionsRef.current, open]);

  const filteredOptions = useMemo(() => {
    if (isSearchable) {
      return options.filter((option) =>
        option.label?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return options;
  }, [isSearchable, options, searchTerm, isSearchable]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentKeyboardSelectedIndex(-1);
    setSearchTerm(e.target.value);
  };

  const handleDropDownClick = () => {
    if (disabled || readonly) return;
    if (!open) {
      onFocus && onFocus();
      onOpen();
    } else {
      // inputRef.current?.blur();
    }
    setOpen(!open);
  };

  const handleDropDownOptionClick = (
    option: DropdownOptionType,
    index: number
  ) => {
    if (onChange && option.value != value) {
      onChange(option, index);
    }
    setOpen(false);
  };
  useEffect(() => {
    if (!open) {
      setCurrentKeyboardSelectedIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    if (currentKeyboardSelectedIndex !== -1) {
      filterRef.current[currentKeyboardSelectedIndex]?.focus();
    }
  }, [currentKeyboardSelectedIndex]);
  //changed

  return (
    <div
      className={styles["dropdown__main-con"]}
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          handleDropDownClick();
        }
      }}
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

      <div
        className={cn(
          styles["options__main-con"],
          open ? styles["visible"] : styles["hidden"]
        )}
        ref={optionsRef}
        onClick={(e) => e.stopPropagation()}
      >
        {isSearchable && (
          <div>
            <input
              type="text"
              onChange={handleInputChange}
              value={searchTerm}
            />
          </div>
        )}
        <div className={styles["options__con"]}>
          {filteredOptions.length > 0 ? (
            <div className="nu-p-1">
              {filteredOptions.map((option, index) => (
                <div
                  ref={(el) => {
                    filterRef.current[index] = el;
                  }}
                  onMouseEnter={() => {
                    setCurrentKeyboardSelectedIndex(index);
                  }}
                  onMouseLeave={() => {
                    setCurrentKeyboardSelectedIndex(-1);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropDownOptionClick(option, index);
                  }}
                  key={index}
                >
                  <div
                    className={cn(styles["option__list-item"], {
                      [styles["keyboard-selected"]]:
                        index === currentKeyboardSelectedIndex,
                    })}
                  >
                    <p>{option.label}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>nothing to display</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
