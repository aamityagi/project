"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/(protected)/components/ui/button";
import CountrySelect from "@/app/(protected)/components/CountrySelector";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/app/(protected)/components/ui/select";

export interface KeywordData {
  keywords: string[];
  country: string;
  location?: string;
}

interface KeywordOverviewFormProps {
  onSubmit: (data: KeywordData) => void; // callback to parent
}

export default function KeywordOverviewForm({ onSubmit }: KeywordOverviewFormProps) {
  const [keywordsInput, setKeywordsInput] = useState(""); // textarea value
  const [country, setCountry] = useState("IN");
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Format input to numbered list
  const formatKeywords = (text: string) => {
    const keywords = text
      .split(/\n|,/)
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    return keywords.map((k, i) => `${i + 1}) ${k}`).join("\n");
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    const formatted = formatKeywords(rawValue);
    setKeywordsInput(formatted);
  };

  // Dynamically resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [keywordsInput]);

  // Fetch locations (mock)
  useEffect(() => {
    if (country === "IN") setLocations(["Delhi", "Mumbai", "Bangalore"]);
    else if (country === "US") setLocations(["California", "Texas", "New York"]);
    else setLocations([]);
    setSelectedLocation("");
  }, [country]);

  const handleSearch = () => {
    const keywords = keywordsInput
      .split("\n")
      .map((line) => line.replace(/^\d+\)\s*/, "").trim())
      .filter((k) => k.length > 0);

    const data: KeywordData = { keywords, country, location: selectedLocation };
    onSubmit(data); // pass data to parent
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Keyword Input */}
      <div>
        <label className="text-sm font-medium mb-1 block">Keyword 0 - 100</label>
        <textarea
          ref={textareaRef}
          placeholder="Enter Keyword Separated By Commas"
          value={keywordsInput}
          onChange={handleKeywordsChange}
          className="w-full p-2 border rounded-md resize-none overflow-hidden"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between mt-4">
        {/* Left Side: Info */}
        <div className="flex-1 text-gray-700 text-sm md:text-base">
          <p>
            Instantly evaluate how hard it will be to rank in the top 10 results for a search term, along with other critical keyword metrics. Enter keywords separated by commas or new lines.
          </p>
        </div>

        {/* Right Side: Controls */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto mt-3 md:mt-0">
          <div className="flex-1">
            <CountrySelect value={country} onChange={({ code }) => setCountry(code)} />
          </div>

          {locations.length > 0 && (
            <div className="flex-1 min-w-[120px]">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex-1 md:flex-none">
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-purple-600 hover:to-indigo-600 w-full md:w-auto mt-2 md:mt-0"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
