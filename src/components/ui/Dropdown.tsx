"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect?: (selected: string) => void; //부모에게 옵션 전달함수
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Option");
  const dropdownRef = useRef<HTMLDivElement>(null);

  //바깥 클릭하면 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectHandler = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const itemHeight = 35;
  const headerHeight = 40;
  const totalHeight = isOpen
    ? headerHeight + (options.length + 1) * itemHeight
    : headerHeight;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-[var(--color-black)] mb-2.5 ml-2 ">
        {label}
      </label>

      <div
        className={`border border-[var(--color-gray-border)] rounded-lg min-h-12 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "border-[var(--color-primary-400)]" : ""
        }`}
        style={{ height: `${totalHeight}px` }}
      >
        <button
          type="button"
          className="w-full mt-1 px-4 py-2 text-left bg-white text-sm  flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`${
              selected === "Option"
                ? "text-[var(--color-gray-placeholder)]"
                : "text-[var(--color-black)]"
            }`}
          >
            {selected}
          </span>
          <span>
            {isOpen ? (
              <ChevronUp className="text-[var(--color-gray-placeholder)]" />
            ) : (
              <ChevronDown className="text-[var(--color-gray-placeholder)] " />
            )}
          </span>
        </button>

        <div
          className="bg-white transition-all duration-300 ease-in-out px-2"
          style={{
            height: isOpen ? `${options.length * itemHeight}px` : "0px",
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="h-9.5 px-4 flex items-center text-sm text-[var(--color-black)] hover:bg-[var(--color-muted)] rounded-lg cursor-pointer"
              onClick={() => selectHandler(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
