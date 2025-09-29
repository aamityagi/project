"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import InfoTooltip from "../InfoTooltip";
import { Input } from "../ui/input";

export type FilterType = "single" | "multi" | "range";

export interface FilterOption {
  label: string;
  value?: string;
  range?: string;   // e.g. "85–100%"
  tooltip?: string;
}

type FilterValue<T extends FilterType> =
  T extends "single" ? string | null | { from: number; to: number } :
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSingleSelect = (value: string) => setSelectedValue(value);
  const handleMultiSelect = (value: string) =>
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const handleRangeChange = (field: "from" | "to", value: string) =>
    setRange((prev) => ({ ...prev, [field]: value }));

  const handleApply = () => {
    if (type === "single") {
      if (range.from || range.to) {
        onApply({ from: Number(range.from), to: Number(range.to) } as FilterValue<T>);
      } else {
        onApply(selectedValue as FilterValue<T>);
      }
    } else if (type === "multi") onApply(selectedValues as FilterValue<T>);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedValue(null);
    setSelectedValues([]);
    setRange({ from: "", to: "" });
    onApply(null as any);
    setOpen(false);
  };

  const renderButtonContent = () => {
    if (type === "multi" && selectedValues.length) {
      return (
        <div className="flex flex-wrap gap-1 items-center">
          <span className="font-semibold">{title}:</span>
          {selectedValues.map((val) => (
            <span
              key={val}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 text-sm"
            >
              {val}
              <button
                type="button"
                className="ml-1 font-bold text-blue-600 hover:text-red-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  const newValues = selectedValues.filter((v) => v !== val);
                  setSelectedValues(newValues);
                  onApply(newValues as FilterValue<T>);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      );
    } else if (type === "single" && selectedValue) {
      return (
        <div className="flex items-center gap-1">
          <span className="font-semibold">{title}:</span>
          <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 text-sm">
            {selectedValue}
            <button
              type="button"
              className="ml-1 font-bold text-blue-600 hover:text-red-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedValue(null);
                onApply(null as FilterValue<T>);
              }}
            >
              ×
            </button>
          </span>
        </div>
      );
    } else if (type === "range" && (range.from || range.to)) {
      return `${title}: ${range.from || 0} - ${range.to || "∞"}`;
    }
    return title;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        {renderButtonContent()}
      </Button>
      {open && (
        <div className="absolute top-full mt-1 w-60 bg-white border shadow-md z-50 p-3 flex flex-col gap-1">
          {options.map((opt) => (
            <div
              key={opt.label}
              className={`flex items-center justify-between cursor-pointer px-1 py-1 text-sm ${
                type === "single"
                  ? selectedValue === (opt.value || opt.label)
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                  : selectedValues.includes(opt.value || opt.label)
                  ? "bg-blue-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                if (type === "single") handleSingleSelect(opt.value || opt.label);
                else if (type === "multi") handleMultiSelect(opt.value || opt.label);
              }}
            >
              <span>{opt.label}</span>
              <div className="flex items-center gap-1">
                {opt.range && <span className="text-sm text-gray-600">{opt.range}</span>}
                {opt.tooltip && <InfoTooltip content={opt.tooltip} />}
              </div>
            </div>
          ))}

          {/* Custom Range */}
          <div className="flex flex-col gap-2 mt-2">
            <hr className="border-gray-300" />
            <label className="font-semibold">Custom Range</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                className="border p-1 w-1/2"
                value={range.from}
                onChange={(e) => handleRangeChange("from", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                className="border p-1 w-1/2"
                value={range.to}
                onChange={(e) => handleRangeChange("to", e.target.value)}
              />
            </div>
          </div>

          {/* Apply & Cancel */}
          <div className="flex justify-between mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleApply}
              className="w-1/2 bg-blue-500 text-white hover:bg-blue-700 transition-colors"
            >
              Apply
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="w-1/2 bg-gray-400 text-gray-700 hover:bg-gray-500 hover:text-gray-100 transition-colors"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
