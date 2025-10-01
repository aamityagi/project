"use client";

import contentData from "../../data/organicContent.json";
import ContentSection from "../components/ContentSection";
import DomainOrganicForm from "../components/DomainOrganicForm";

export default function OrganicResearch() {
  const handleSearch = (data: { domain: string; country: { code: string; location_code: number } }) => {
    console.log("Form Data:", data);
  };

  return (
    <section className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
          Organic Research
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Discover valuable insights about your competitors’ organic traffic and keyword strategies.
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
