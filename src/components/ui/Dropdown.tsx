"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface DropdownProps {
  label?: string;
  options: string[];
  onSelect?: (selected: string) => void; //부모에게 옵션 전달함수
  defaultIndex?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  label = "",
  options,
  onSelect,
  defaultIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Option");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef(false);

  //디폴트 인덱스
  useEffect(() => {
    if (
      !optionsRef.current &&
      typeof defaultIndex === "number" &&
      defaultIndex >= 0 &&
      defaultIndex < options.length
    ) {
      setSelected(options[defaultIndex]);
      optionsRef.current = true;
    }
  }, [defaultIndex, options]);

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
  const maxVisible = 6;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-black)] mb-2.5 ml-2">
          {label}
        </label>
      )}

      {/* 버튼 영역 */}
      <button
        type="button"
        className={`w-full px-4 py-3 text-left bg-white text-sm border rounded-lg flex items-center justify-between transition-colors ${
          isOpen
            ? "border-[var(--color-primary-400)]"
            : "border-[var(--color-gray-border)]"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
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
        {isOpen ? (
          <ChevronUp className="text-[var(--color-gray-placeholder)]" />
        ) : (
          <ChevronDown className="text-[var(--color-gray-placeholder)]" />
        )}
      </button>

      {/* 옵션 리스트 */}
      {isOpen && (
        <div
          className="dropbox-scroll absolute top-full left-0 w-full px-2 py-1 bg-white mt-2 border border-[var(--color-primary-400)] scroll-py-2 rounded-lg z-50 max-h-[210px] overflow-y-auto"
          style={{ maxHeight: `${itemHeight * maxVisible}px` }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="h-[35px] px-2 flex items-center text-sm  text-[var(--color-black)] hover:bg-[var(--color-muted)] rounded cursor-pointer"
              onClick={() => selectHandler(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
