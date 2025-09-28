"use client";

import { useState } from "react";
import countriesDataJson from "../components/data/countries.json"; // adjust path
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Country {
  name: string;
  code: string;
  flag: string;
  location_code: number; // added for DataForSEO
}

const countriesData: Country[] = countriesDataJson;

export default function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (selection: { code: string; location_code: number }) => void; // return code + location
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
      <Button
        type="button"
        className="flex items-center border bg-white bg-gray-800 hover:bg-white"
        onClick={() => setOpen(!open)}
      >
        {selected ? (
          <>
            <Image
              width={60}
              height={60}
              src={selected.flag}
              alt={selected.code}
              className="w-4 h-4 mr-1"
            />
            <span className="text-sm text-gray-800 font-medium">
              {selected.code}
            </span>
          </>
        ) : (
          <span className="text-sm">Select</span>
        )}

        <svg
          className="w-3 h-3 ml-1 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute mt-1 w-48 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {/* Search input */}
          <div className="p-2 border-b">
            <Input
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
                onChange({ code: c.code, location_code: c.location_code }); // return code + location_code
                setOpen(false);
                setSearch("");
              }}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              <Image
                width={60}
                height={60}
                src={c.flag}
                alt={c.code}
                className="w-4 h-4 mr-2"
              />
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
