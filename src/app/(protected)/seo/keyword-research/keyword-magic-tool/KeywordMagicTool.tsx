"use client";

import { useState } from "react";
import CountrySelect from "../../../components/CountrySelector";

export default function KeywordMagicTool() {
  const [keyword, setKeyword] = useState("");
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("IN"); // default India

  const handleSearch = () => {
    console.log("Searching with:", { keyword, domain, country });
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

        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (optional)"
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
