"use client";

import { useState } from "react";

// Example: Import components for each secondary tab
// Keyword Overview
import KeywordOverview from "./keyword-research/keyword-overview/KeywordOverview";
import KeywordMagicTool from "./keyword-research/keyword-magic-tool/KeywordMagicTool";
// Competitive Research
import DomainOverview from "./competitive-research/domain-overview/DomainOverview";
import OrganicResearch from "./competitive-research/organic-research/OrganicResearch";
// Link Building
import BacklinkAnalytics from "./link-building/backlink-analytics/BacklinkAnalytics";
// On Page & Tech Seo
import SiteAudit from "./on-page-tech-seo/site-audit/SiteAudit";

const seoTabs = [
  {
    name: "Keyword Research",
    secondary: [
      { name: "Keyword Overview", component: <KeywordOverview /> },
      { name: "Keyword Magic Tool", component: <KeywordMagicTool /> },
      // Add other Keyword Research components here
    ],
  },
  {
    name: "Competitive Research",
    secondary: [
      { name: "Domain Overview", component: <DomainOverview /> },
      { name: "Organic Research", component: <OrganicResearch /> },
      // Add other Competitive Research components here
    ],
  },
  {
    name: "Link Building",
    secondary: [
      { name: "Backlink Analytics", component: <BacklinkAnalytics /> },
      // Add other Link Building components here
    ],
  },
  {
    name: "On Page & Tech SEO",
    secondary: [
      { name: "Site Audit", component: <SiteAudit /> },
      // Add other On Page & Tech SEO components here
    ],
  },
];

export default function SeoPage() {
  const [activePrimary, setActivePrimary] = useState(0);
  const [activeSecondary, setActiveSecondary] = useState(0);

  const primary = seoTabs[activePrimary];
  const secondary = primary.secondary[activeSecondary];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SEO Dashboard</h1>

      {/* Primary Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-300">
        {seoTabs.map((tab, index) => (
          <button
            key={tab.name}
            className={`px-3 py-1 rounded-t-md text-sm ${
              activePrimary === index
                ? "bg-white border-t border-l border-r border-gray-300 font-semibold"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              setActivePrimary(index);
              setActiveSecondary(0); // Reset secondary tab on primary change
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Secondary Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {primary.secondary.map((tab, index) => (
          <button
            key={tab.name}
            className={`px-2 py-1 rounded text-sm ${
              activeSecondary === index
                ? "bg-blue-600 text-white font-medium"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setActiveSecondary(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-4 rounded shadow">
        {secondary.component}
      </div>
    </div>
  );
}
