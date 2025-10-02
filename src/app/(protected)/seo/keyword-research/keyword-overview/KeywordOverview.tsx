"use client";

import { useState } from "react";
import KeywordOverviewForm, { KeywordData } from "../components/KeywordOverviewForm";

export default function KeywordOverview() {
  const [submittedData, setSubmittedData] = useState<KeywordData | null>(null);

  const handleFormSubmit = (data: KeywordData) => {
    console.log("Keyword Overview Submitted Data:", data); // console the input for API hit
    setSubmittedData(data);
  };

  return (
    <section className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Free Keyword Checker</h1>
        <p className="text-gray-600">
          Check Keyword Difficulty, Competition, Trends, and More with Keyword Overview
        </p>
      </div>

      {/* Form */}
      <KeywordOverviewForm onSubmit={handleFormSubmit} />

    </section>
  );
}
