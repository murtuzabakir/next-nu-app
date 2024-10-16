import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { SelectProps, SelectOption } from "./Select.types";
import styles from "./Select.module.scss";

const SelectComponent = ({ label, options, field, isMulti = false, placeholder = "Select...", selectedOptions: preSelectedOptions = [], onChange, creatable = false, loading = false }: SelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedOption, setSelectedOption] = useState<SelectOption[]>(preSelectedOptions);
   const [updatedOptions, setUpdatedOptions] = useState<SelectOption[]>(options);
   const dropdownRef = useRef<HTMLDivElement>(null);

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

      const newOption = { [field]: trimmedSearchQuery };  // Create a new option object using the trimmed search query
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

   const filteredOptions = updatedOptions.filter((option) =>
      option[field]?.toLowerCase().includes(searchQuery.toLowerCase())
   );

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
   }, [options])


   useEffect(() => {
      if (preSelectedOptions.length > 0) {
         setSelectedOption(preSelectedOptions);
      }
   }, [preSelectedOptions])

   return (
      <div className={styles["select-container"]} ref={dropdownRef}>
         <div className={styles["select-header"]} onClick={toggleDropdown}>
            <span className={styles["label"]}>
               <span>{label}</span>
               <div className={styles["pipe"]}></div>
            </span>
            <span className={styles["selected-value"]}>
               {selectedOption.length > 0
                  ? selectedOption.map((option) => option[field]).join(", ")
                  : placeholder}
            </span>
            <KeyboardArrowDownOutlinedIcon />
         </div>

         {isOpen && (
            <div className={styles["dropdown-list"]}>
               <div className={styles["search-input-wrapper"]}>
                  <SearchOutlinedIcon />
                  <input
                     type="text"
                     placeholder="Type a command for search..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className={styles["search-input"]}
                  />
               </div>

               {creatable && (
                  <div className={styles["create-new"]}>
                     <AddIcon />
                     <button onClick={addNewOption}>Create new {label?.toLowerCase()}</button>
                  </div>
               )}

               <ul className={styles["dropdown-options"]}>
                  {loading && (
                     <li className={`${styles['dropdown-option']} ${styles['loading']}`}>
                        Loading {label.toLowerCase()}...
                     </li>
                  )}

                  {!loading && filteredOptions.length === 0 && (
                     <li className={`${styles['dropdown-option']} ${styles['no-results']}`}>
                        No {label.toLowerCase()} found
                     </li>
                  )}

                  {!loading && filteredOptions.length > 0 && filteredOptions.map((option) => (
                     <li
                        key={option[field]}
                        className={`${isOptionSelected(option) ? styles.selected : ""} ${styles['dropdown-option']}`}
                        onClick={() => selectOption(option)}
                     >
                        {isOptionSelected(option) && <CheckRoundedIcon />}
                        {option[field]}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default SelectComponent;
