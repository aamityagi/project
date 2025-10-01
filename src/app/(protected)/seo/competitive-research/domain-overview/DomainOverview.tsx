"use client";

import contentData from "../../data/domainContent.json";
import ContentSection from "../components/ContentSection";
import DomainOrganicForm from "../components/DomainOrganicForm";

export default function DomainOverview() {
  const handleSearch = (data: { domain: string; country: { code: string; location_code: number } }) => {
    console.log("Form Data:", data);
  };

  return (
    <section className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Domain Overview</h2>
        <p className="text-gray-600 text-center mb-8">
          Get instant insights into strengths and weaknesses of your competitor or prospective customer.
        </p>
        {/* Domain Form */}
        <DomainOrganicForm onSearch={handleSearch} />
      </div>

      {/* Content Sections */}
      <div>
        <ContentSection data={contentData} />
      </div>
    </section>
  );
}
