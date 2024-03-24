"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export interface SearchSelectProps {
  items: string[];
  onChange: (item: string) => void;
  label?: string;
  placeholder?: string;
  value?: string;
}

const EditablePickList: React.FC<SearchSelectProps> = ({
  items,
  onChange,
  placeholder,
  label,
  value,
}) => {
  const [showList, setShowList] = useState(false);
  const filteredItems = value
    ? items.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : items;

  return (
    <div className="relative flex flex-col">
      {label && <label className="mb-1">{label}</label>}
      <div
        className={cn(
          "flex w-fit items-center justify-between rounded-b-xl rounded-t-xl bg-slate-100 px-2 py-1 ring-slate-400 focus:ring-2 md:min-w-[250px]",
          showList && "rounded-b-none",
        )}
      >
        <input
          className="ring-none hover:ring-none focus:ring-none rounded-b-xl rounded-t-xl bg-slate-100 p-1 focus:border-none focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowList(true)}
          onBlur={() => {
            setTimeout(() => setShowList(false), 150);
          }}
          placeholder={placeholder}
        />
      </div>
      {showList && filteredItems.length ? (
        <div className="max-h-30 absolute top-full z-50 flex w-fit max-w-[250px] flex-col overflow-y-auto rounded-b-xl bg-slate-100 px-1.5 py-4 md:w-full">
          {filteredItems.map((item, index) => (
            <div
              className="p-1 transition-colors hover:bg-slate-100"
              key={index}
              onClick={() => {
                onChange(item);
              }}
              role="button"
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default EditablePickList;
