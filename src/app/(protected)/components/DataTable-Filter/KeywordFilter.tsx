"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export type KeywordType = "All" | "Questions";
export type MatchType =
  | "All Keyword"
  | "Broad Match"
  | "Phrase Match"
  | "Exact Match"
  | "Related";

interface KeywordFilterProps {
  keywordType: KeywordType;
  matchType: MatchType;
  onFilterChange: (keywordType: KeywordType, matchType: MatchType) => void;
}

export default function KeywordFilter({
  keywordType,
  matchType,
  onFilterChange,
}: KeywordFilterProps) {
  return (
    <div className="flex gap-4 mb-4">
      {/* Keyword Type Filter */}
      <Select
        value={keywordType}
        onValueChange={(val) => onFilterChange(val as KeywordType, matchType)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Keyword Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Keywords</SelectItem>
          <SelectItem value="Questions">Questions</SelectItem>
        </SelectContent>
      </Select>

      {/* Match Type Filter */}
      <Select
        value={matchType}
        onValueChange={(val) => onFilterChange(keywordType, val as MatchType)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Match Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Keyword">All Keyword</SelectItem>
          <SelectItem value="Broad Match">Broad Match</SelectItem>
          <SelectItem value="Phrase Match">Phrase Match</SelectItem>
          <SelectItem value="Exact Match">Exact Match</SelectItem>
          <SelectItem value="Related">Related</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
