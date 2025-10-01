"use client";

import { useState } from "react";
import CountrySelect from "../../../components/CountrySelector";
import DynamicTable from "../../../components/DynamicTable";
import { Input } from "@/app/(protected)/components/ui/input";
import { Button } from "@/app/(protected)/components/ui/button";

import Image from "next/image";
import content from "../data/keywordTool.json";

import { ContentSection } from "./components/ContentSection";
import { MetricSection } from "./components/MetricSection";
import { StepsSection } from "./components/StepsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import FaqSection from "./components/FaqSection"; // ✅ Correct


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
    <section>
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
      <div className="w-full">
        <div className="w-full">
          <Image
            src={content.banner.image} // "/assets/Keyword-magic-tool.svg"
            alt={content.banner.alt}
            width={1920}
            height={400}
            className="w-full h-72 object-cover"
          />
        </div>

        {/* Sections */}
        <ContentSection left={content.intro.left} right={content.intro.right} />
        <MetricSection title={content.metrics.title} left={content.metrics.left} right={content.metrics.right} footer={content.metrics.footer} />
        <StepsSection title={content.steps.title} items={content.steps.items} />
        <FeaturesSection title={content.features.title} items={content.features.items} />
        <FaqSection title={content.faqs.title} items={content.faqs.items} />
      </div>
    </section>
  );
}
