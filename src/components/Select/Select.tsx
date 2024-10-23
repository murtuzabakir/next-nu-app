import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { SelectProps, SelectOption } from "./Select.types";
import styles from "./Select.module.scss";

const SelectComponent = ({
   label,
   options,
   field,
   isMulti = false,
   placeholder = "Select...",
   selectedOptions: preSelectedOptions = [],
   onChange,
   creatable = false,
   deleteable = false,
   onDelete,
   loading = false,
   showCountBadge = false,
   displayPills = false,
   maxDisplayedItems = 2,
}: SelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedOption, setSelectedOption] = useState<SelectOption[]>(preSelectedOptions);
   const [updatedOptions, setUpdatedOptions] = useState<SelectOption[]>(options);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const dropdownListRef = useRef<HTMLDivElement>(null);

   const toggleDropdown = () => setIsOpen((prev) => !prev);

   const selectOption = (option: SelectOption) => {
      if (isMulti) {
         const isSelected = selectedOption.some((item) => item[field] === option[field]);
         let updatedSelection;
         if (isSelected) {
            // If the option is already selected, remove it from the selection
            updatedSelection = selectedOption.filter((item) => item[field] !== option[field]);
         } else {
            // If the option is not selected, add it to the selection
            updatedSelection = [...selectedOption, option];
         }
         // Update the state and call onChange handler with the new selection
         setSelectedOption(updatedSelection);
         onChange(updatedSelection);
         return;
      }

      // For single-selection mode
      setSelectedOption([option]);
      onChange([option]);
      setIsOpen(false); // Close dropdown after selecting an option
   };

   const addNewOption = () => {
      const trimmedSearchQuery = searchQuery.trim();
      if (!trimmedSearchQuery) return;

      const newOption = { [field]: trimmedSearchQuery }; // Create a new option object using the trimmed search query
      const newOptionsList = [newOption, ...updatedOptions]; // Add the new option to the top of the updated options list
      setUpdatedOptions(newOptionsList);

      let updatedSelection; // Update the current selection
      if (isMulti) {
         updatedSelection = [...selectedOption, newOption]; // Append the new option in multi-select mode
      } else {
         updatedSelection = [newOption]; // Replace the current selection in single-select mode
      }

      setSearchQuery(""); // Clear the search input and update the selection
      setSelectedOption(updatedSelection);
      onChange(updatedSelection);
   };

   const isOptionSelected = (option: SelectOption) => selectedOption.some((item) => item[field] === option[field]);

   const filteredOptions = updatedOptions.filter((option) => option[field]?.toLowerCase().includes(searchQuery.toLowerCase()));

   // Function to handle keeping the dropdown within the viewport
   const adjustDropdownPosition = () => {
      if (!dropdownListRef.current) return;
      const rect = dropdownListRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Check if the dropdown goes outside the viewport on the bottom or right
      if (rect.bottom > viewportHeight) {
         dropdownListRef.current.style.top = `-${rect.height}px`; // Shift the dropdown upward
      }
      if (rect.right > viewportWidth) {
         dropdownListRef.current.style.left = `-${rect.width - dropdownRef.current?.offsetWidth}px`; // Shift the dropdown left
      }
   };

   // Trigger the 'create new' functionality when Enter is pressed and there are no search results
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && creatable && filteredOptions.length === 0) {
         addNewOption();
      }
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   useEffect(() => {
      setUpdatedOptions(options);
   }, [options]);

   useEffect(() => {
      if (preSelectedOptions.length > 0) {
         setSelectedOption(preSelectedOptions);
      }
   }, [preSelectedOptions]);

   // Adjust dropdown position when it opens
   useEffect(() => {
      if (isOpen) {
         adjustDropdownPosition();
      }
   }, [isOpen]);

   return (
      <div className={styles["select-container"]} ref={dropdownRef}>
         <div className={styles["select-header"]} onClick={toggleDropdown}>
            <span className={styles["label"]}>
               <span>{label}</span>
               <div className={styles["pipe"]}></div>
            </span>
            <span className={styles["selected-value"]}>
               {selectedOption.length > 0 ? (
                  displayPills ? (
                     selectedOption.slice(0, maxDisplayedItems).map((option) => (
                        <span key={option[field]} className={styles["chip"]}>
                           {option[field]}
                           <span
                              className={styles["chip-remove"]}
                              onClick={(e) => {
                                 e.stopPropagation(); // Prevent the dropdown from opening

                                 // Remove the option from the selected list
                                 const updatedSelection = selectedOption.filter((opt) => opt[field] !== option[field]);
                                 setSelectedOption(updatedSelection);

                                 // Trigger the onChange to notify parent component
                                 onChange(updatedSelection);
                              }}
                           >
                              &times;
                           </span>
                        </span>
                     ))
                  ) : (
                     // If displayPills is false, render as comma-separated text
                     <span>
                        {selectedOption
                           .slice(0, maxDisplayedItems) // Limit the number of displayed options to maxPills
                           .map((option) => option[field])
                           .join(", ")}
                     </span>
                  )
               ) : (
                  <span>{placeholder}</span>
               )}
            </span>

            <KeyboardArrowDownOutlinedIcon className={styles["MuiSvgIcon-root"]} />
         </div>

         {/* Show count badge  when there are more items than displayed */}
         {showCountBadge && selectedOption.length > maxDisplayedItems && (
            <span className={styles["badge"]}>
               <p>+{selectedOption.length - maxDisplayedItems}</p>
            </span>
         )}

         {isOpen && (
            <div className={styles["dropdown-list"]} ref={dropdownListRef}>
               <div className={styles["search-input-wrapper"]}>
                  <SearchOutlinedIcon className={styles["MuiSvgIcon-root"]} />
                  <input type="text" placeholder="Type a command for search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} className={styles["search-input"]} />
               </div>

               {creatable && (
                  <div className={styles["create-new"]}>
                     <AddIcon className={styles["MuiSvgIcon-root"]} />
                     <button onClick={addNewOption}>Create new {label?.toLowerCase()}</button>
                  </div>
               )}

               <ul className={styles["dropdown-options"]}>
                  {loading && <li className={`${styles["dropdown-option"]} ${styles["loading"]}`}>Loading {label.toLowerCase()}...</li>}

                  {!loading && filteredOptions.length === 0 && <li className={`${styles["dropdown-option"]} ${styles["no-results"]}`}>No {label.toLowerCase()} found</li>}

                  {!loading &&
                     filteredOptions.length > 0 &&
                     filteredOptions.map((option) => (
                        <li key={option[field]} className={`${isOptionSelected(option) ? styles.selected : ""} ${styles["dropdown-option"]}`} onClick={() => selectOption(option)}>
                           {isOptionSelected(option) && <CheckRoundedIcon className={styles["MuiSvgIcon-root"]} />}
                           {option[field]}
                           {deleteable && (
                              <DeleteIcon
                                 className={`${styles["MuiSvgIcon-root"]} ${styles["ml-auto"]}`}
                                 onClick={(e) => {
                                    e.stopPropagation();

                                    const updatedList = updatedOptions.filter((opt) => opt[field] !== option[field]);
                                    setUpdatedOptions(updatedList);

                                    const updatedSelection = selectedOption.filter((opt) => opt[field] !== option[field]);
                                    setSelectedOption(updatedSelection);
                                    if (onDelete) {
                                       onDelete(option);
                                    }

                                    onChange(updatedSelection);
                                 }}
                              />
                           )}
                        </li>
                     ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default SelectComponent;
