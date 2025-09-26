"use client";

import { useState } from "react";
import CountrySelect from "../../../components/CountrySelector";

export default function KeywordMagicTool() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("IN"); // default India

  const handleSearch = async () => {
    // Send request to API
    try {
      const res = await fetch("/api/keyword-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, country }),
      });

      const data = await res.json();
      console.log("API response:", data);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Keyword Magic Tool
      </h1>

      <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
          className="flex-1 border rounded-md p-2 w-full"
        />

        <CountrySelect value={country} onChange={setCountry} />

        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
}
