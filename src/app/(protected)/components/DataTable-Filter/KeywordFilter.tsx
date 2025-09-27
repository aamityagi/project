"use client";

import React, { useState } from "react";

export type KeywordType = "All" | "Questions";
export type MatchType = "All Keyword" | "Broad Match" | "Phrase Match" | "Exact Match" | "Related";

interface KeywordFilterProps {
  onFilterChange: (keywordType: KeywordType, matchType: MatchType) => void;
}

export default function KeywordFilter({ onFilterChange }: KeywordFilterProps) {
  const [keywordType, setKeywordType] = useState<KeywordType>("All");
  const [matchType, setMatchType] = useState<MatchType>("All Keyword");

  const handleKeywordTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as KeywordType;
    setKeywordType(value);
    onFilterChange(value, matchType);
  };

  const handleMatchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as MatchType;
    setMatchType(value);
    onFilterChange(keywordType, value);
  };

  return (
    <div className="flex gap-4 mb-4">
      {/* Keyword Type Filter */}
      <div className="flex flex-col">
        <label className="font-semibold">Keyword Type</label>
        <select
          value={keywordType}
          onChange={handleKeywordTypeChange}
          className="border p-1 rounded"
        >
          <option value="All">All Keywords</option>
          <option value="Questions">Questions</option>
        </select>
      </div>

      {/* Match Type Filter */}
      <div className="flex flex-col">
        <label className="font-semibold">Match Type</label>
        <select
          value={matchType}
          onChange={handleMatchTypeChange}
          className="border p-1 rounded"
        >
          <option value="All Keyword">All Keywords</option>
          <option value="Broad Match">Broad Match</option>
          <option value="Phrase Match">Phrase Match</option>
          <option value="Exact Match">Exact Match</option>
          <option value="Related">Related</option>
        </select>
      </div>
    </div>
  );
}
