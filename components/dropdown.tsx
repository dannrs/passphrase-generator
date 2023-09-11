import { ChangeEvent } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedOption: string) => void;
}

export default function Dropdown({ options, onSelect }: DropdownProps) {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelect(selectedOption);
  };

  return (
    <select
      className="text-sm sm:text-base bg-white border border-gray-300 rounded px-3 py-2 text-black"
      onChange={handleSelect}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
