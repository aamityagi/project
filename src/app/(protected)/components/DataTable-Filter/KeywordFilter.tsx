"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export type KeywordType = "All" | "Questions";
export type MatchType =
  | "All Keyword"
  | "Broad Match"
  | "Phrase Match"
  | "Exact Match"
  | "Related";

interface KeywordFilterProps {
  onFilterChange: (keywordType: KeywordType, matchType: MatchType) => void;
}

export default function KeywordFilter({ onFilterChange }: KeywordFilterProps) {
  const [keywordType, setKeywordType] = useState<KeywordType>("All");
  const [matchType, setMatchType] = useState<MatchType>("All Keyword");
  
  // Radix Select onValueChange gives string directly
  const handleKeywordTypeChange = (value: string) => {
    const typedValue = value as KeywordType;
    setKeywordType(typedValue);
    onFilterChange(typedValue, matchType);
  };

  const handleMatchTypeChange = (value: string) => {
    const typedValue = value as MatchType;
    setMatchType(typedValue);
    onFilterChange(keywordType, typedValue);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Keyword Type Filter */}
      <div className="flex flex-col w-full sm:w-48">
        <label className="font-semibold mb-1">Keyword Type</label>
        <Select value={keywordType} onValueChange={handleKeywordTypeChange}>
          <SelectTrigger className="border px-2 py-1 text-gray-600">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent className="text-gray-800">
            <SelectItem value="All">All Keywords</SelectItem>
            <SelectItem value="Questions">Questions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Match Type Filter */}
      <div className="flex flex-col w-full sm:w-48 ">
        <label className="font-semibold mb-1">Match Type</label>
        <Select value={matchType} onValueChange={handleMatchTypeChange}>
          <SelectTrigger className="border px-2 py-1 text-gray-600">
            <SelectValue placeholder="Select Match Type" />
          </SelectTrigger>
          <SelectContent className="text-gray-800">
            <SelectItem value="All Keyword">All Keywords</SelectItem>
            <SelectItem value="Broad Match">Broad Match</SelectItem>
            <SelectItem value="Phrase Match">Phrase Match</SelectItem>
            <SelectItem value="Exact Match">Exact Match</SelectItem>
            <SelectItem value="Related">Related</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
