import { Input } from "@nextui-org/react";
import { useState, ChangeEvent } from "react";
import { IoCheckmarkDoneOutline, IoClose } from "../icons/icons";

interface Option {
  id: number | string;
  code?: string;
  name: string;
}

interface Props<T extends Option> {
  fetchData?: (inputValue: string) => void;
  onOptionSelect: (id: string | null) => void;
  options: T[];
  label?: string;
  className?: string;
  description?: string | undefined;
  labelPlacement?: "inside" | "outside" | "outside-left" | undefined;
  radius?: "full" | "lg" | "md" | "sm" | "none" | undefined;
  color?:
    | "primary"
    | "secondary"
    | "warning"
    | "success"
    | "danger"
    | "default"
    | undefined;
  variant?: "faded" | "flat" | "bordered" | "underlined" | undefined;
}

export const Autocomplete = <T extends Option>({
  options,
  fetchData,
  onOptionSelect,
  label,
  labelPlacement,
  description,
  radius,
  color,
  variant,
  className,
}: Props<T>) => {
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (fetchData) {
      fetchData(value);
    }
    setIsSelected(false);
  };

  const handleSelect = (option: T) => {
    const { id, name } = option;
    setInput(name ?? id.toString());
    onOptionSelect(id.toString());
    setSelectedOption(id.toString());
    setIsSelected(true);
  };

  const handleClear = () => {
    setInput("");
    setIsSelected(false);
    setSelectedOption("");
    onOptionSelect(null);
    if (fetchData) {
      fetchData("");
    }
  };

  const handleFocus = () => {
    setIsSelected(false);
  };

  const colorOnDefault =
    color === undefined || color === "default"
      ? "bg-zinc-300 dark:bg-zinc-600"
      : `bg-${color}`;

  return (
    <div className={className ?? "w-full"}>
      <div className="relative flex items-center">
        <Input
          type="text"
          label={label}
          labelPlacement={labelPlacement}
          description={description}
          value={input}
          radius={radius}
          color={color}
          variant={variant}
          onFocus={handleFocus}
          onChange={handleChange}
          className={className}
        />
        {input && (
          <button
            onClick={handleClear}
            className={`absolute right-2 rounded-full ${colorOnDefault} p-[3px] mb-1`}
          >
            <IoClose />
          </button>
        )}
      </div>
      {!isSelected && input.length > 0 && (
        <div
          className={`overflow-scroll absolute z-20 max-w-[290px] w-full max-h-[200px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 rounded-md flex flex-col gap-2 p-2 mt-1`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`flex justify-between items-center hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md cursor-pointer gap-2 p-2`}
            >
              <p>{option.name ?? option.id}</p>{" "}
              {option.id.toString() === selectedOption && (
                <IoCheckmarkDoneOutline className={`text-${color} text-xl`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
