"use client";

import { useState } from "react";
import countriesDataJson from "../components/data/countries.json"; // adjust path

interface Country {
  name: string;
  code: string;
  flag: string;
}

const countriesData: Country[] = countriesDataJson;

export default function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = countriesData.find((c) => c.code === value);
  const filtered = countriesData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-w-[80px]">
      {/* Selected country */}
      <button
        type="button"
        className="flex items-center border p-1 rounded-md bg-white min-w-[80px]"
        onClick={() => setOpen(!open)}
      >
        {selected ? (
          <>
            <img src={selected.flag} alt={selected.code} className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{selected.code}</span>
          </>
        ) : (
          <span className="text-sm">Select</span>
        )}

        {/* Dropdown arrow */}
        <svg
          className="w-3 h-3 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute mt-1 w-48 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {/* Search input */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-1 border rounded text-sm"
            />
          </div>

          {/* Country list */}
          {filtered.map((c) => (
            <div
              key={c.code}
              onClick={() => {
                onChange(c.code);
                setOpen(false);
                setSearch("");
              }}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              <img src={c.flag} alt={c.code} className="w-4 h-4 mr-2" />
              <span>{c.name}</span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-2 text-gray-500 text-sm">No countries found</div>
          )}
        </div>
      )}
    </div>
  );
}
