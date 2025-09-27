"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Info } from "lucide-react";

export type FilterType = "single" | "multi" | "range";

export interface FilterOption {
  label: string;
  value?: string;
}

// Different output types based on filter type
type FilterValue<T extends FilterType> =
  T extends "single" ? string | null :
  T extends "multi" ? string[] :
  T extends "range" ? { from: string; to: string } :
  never;

interface FilterDropdownProps<T extends FilterType> {
  title: string;
  type: T;
  options?: FilterOption[];
  onApply: (value: FilterValue<T>) => void;
}

export default function FilterDropdown<T extends FilterType>({
  title,
  type,
  options = [],
  onApply,
}: FilterDropdownProps<T>) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [range, setRange] = useState<{ from: string; to: string }>({ from: "", to: "" });
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSingleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleMultiSelect = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleApply = () => {
    if (type === "single") {
      onApply(selectedValue as FilterValue<T>);
    } else if (type === "multi") {
      onApply(selectedValues as FilterValue<T>);
    } else if (type === "range") {
      onApply(range as FilterValue<T>);
    }
    setOpen(false);
  };

  const handleRangeChange = (field: "from" | "to", value: string) => {
    setRange((prev) => ({ ...prev, [field]: value }));
  };

  // Button label
  let buttonLabel = title;
  if (type === "single" && selectedValue) {
    buttonLabel = `${title}: ${selectedValue}`;
  } else if (type === "multi" && selectedValues.length > 0) {
    buttonLabel = `${title}: ${selectedValues.join(", ")}`;
  } else if (type === "range" && (range.from || range.to)) {
    buttonLabel = `${title}: ${range.from || "0"} - ${range.to || "∞"}`;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        {buttonLabel}
      </Button>

      {open && (
        <div className="absolute top-full mt-1 w-60 bg-white border shadow-md z-50 p-3 flex flex-col gap-2">
          {/* Single Select */}
          {type === "single" &&
            options.map((opt) => {
              const value = opt.value || opt.label;
              const isSelected = selectedValue === value;
              return (
                <div
                  key={opt.label}
                  className={`flex items-center gap-2 p-1 rounded cursor-pointer ${
                    isSelected ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSingleSelect(value)}
                >
                  <span>{opt.label}</span>
                  <Info className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              );
            })}

          {/* Multi Select */}
          {type === "multi" &&
            options.map((opt) => {
              const value = opt.value || opt.label;
              const isSelected = selectedValues.includes(value);
              return (
                <div
                  key={opt.label}
                  className={`flex items-center gap-2 p-1 rounded cursor-pointer ${
                    isSelected ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleMultiSelect(value)}
                >
                  <span>{opt.label}</span>
                  <Info className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              );
            })}

          {/* Range Input */}
          {type === "range" && (
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Custom Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="From"
                  className="border p-1 rounded w-1/2"
                  value={range.from}
                  onChange={(e) => handleRangeChange("from", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To"
                  className="border p-1 rounded w-1/2"
                  value={range.to}
                  onChange={(e) => handleRangeChange("to", e.target.value)}
                />
              </div>
            </div>
          )}

          <Button size="sm" className="mt-2" onClick={handleApply}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
