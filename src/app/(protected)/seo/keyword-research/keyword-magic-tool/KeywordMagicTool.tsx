"use client";

import { useState } from "react";
import CountrySelect from "../../../components/CountrySelector";
import DynamicTable from "../../../components/DynamicTable";
import { Input } from "@/app/(protected)/components/ui/input";
import { Button } from "@/app/(protected)/components/ui/button";

// ✅ Define a type for table rows
export interface TableRow {
  [key: string]: string | number | boolean | Date | undefined;
}

export default function KeywordMagicTool() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("IN");
  const [locationCode, setLocationCode] = useState(2840);
  const [tableData, setTableData] = useState<TableRow[]>([]); // ✅ type-safe

  const handleSearch = async () => {
    try {
      const res = await fetch("/api/keyword-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, country, location_code: locationCode }),
      });

      const json = await res.json();
      setTableData(json.data || []);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Keyword Re-Search.
      </h1>

      <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-6">
        <Input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
          className="flex-1 border p-2 w-full"
        />

        <CountrySelect
          value={country}
          onChange={({ code, location_code }) => {
            setCountry(code);
            setLocationCode(location_code);
          }}
        />

        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600"
        >
          Search
        </Button>
      </div>

      {/* Table */}
      {tableData.length > 0 && <DynamicTable data={tableData} />}
    </div>
  );
}
