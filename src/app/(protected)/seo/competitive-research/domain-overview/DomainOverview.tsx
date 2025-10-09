"use client";

import { useState } from "react";
import contentData from "../../data/domainContent.json";
import ContentSection from "../components/ContentSection";
import DomainOrganicForm from "../components/DomainOrganicForm";
import DomainResult from "../components/DomainResult";

export default function DomainOverview() {
  const [searchData, setSearchData] = useState<{
    domain: string;
    country: { code: string; location_code: number };
  } | null>(null);

  const handleSearch = (data: { domain: string; country: { code: string; location_code: number } }) => {
    setSearchData(data); // store for showing result component
  };

  return (
    <section className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Domain Overview</h2>
        <p className="text-gray-600 mb-8">
          Get instant insights into strengths and weaknesses of your competitor or prospective customer.
        </p>

        {/* Domain Form */}
        <DomainOrganicForm onSearch={handleSearch} />

        {/* Show domain result if valid search */}
        {searchData && (
          <DomainResult
            domain={searchData.domain}
            countryCode={searchData.country.code}
          />
        )}
      </div>

      {/* Content Sections */}
      <div className="w-full">
        <ContentSection data={contentData} />
      </div>
    </section>
  );
}
