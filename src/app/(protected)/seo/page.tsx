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
import { Button } from "../components/ui/button";

const seoTabs = [
  {
    name: "Competitive Research",
    secondary: [
      { name: "Domain Overview", component: <DomainOverview /> },
      { name: "Organic Research", component: <OrganicResearch /> },
      // Add other Competitive Research components here
    ],
  },
  {
    name: "Keyword Research",
    secondary: [
      { name: "Keyword Overview", component: <KeywordOverview /> },
      { name: "Keyword Magic Tool", component: <KeywordMagicTool /> },
      // Add other Keyword Research components here
    ],
  },
  {
    name: "Content Writing",
    secondary: [
      { name: "Create Url", component: <BacklinkAnalytics /> },
      { name: "Keyword Stuffing", component: <BacklinkAnalytics /> },
      { name: "Genrate Content", component: <BacklinkAnalytics /> },
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
      <h1 className="text-2xl font-bold mb-4 uppercase">
        We are Here to Help you For on Page SEO.
      </h1>

      {/* Primary Tabs */}
      {/* Primary Tabs */}
      <div className="flex mb-4 border-b border-gray-300 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {seoTabs.map((tab, index) => (
          <button
            key={tab.name}
            className={`
        px-3 py-1 text-sm font-medium transition-all duration-200 flex-shrink-0
        ${
          activePrimary === index
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white"
        }
        ${index !== seoTabs.length - 1 ? "border-r border-gray-300" : ""}
      `}
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
      <div className="flex border-b border-gray-300">
        {primary.secondary.map((tab, index) => (
          <button
            key={tab.name}
            className={`
        px-2 py-1 text-sm font-medium transition-all duration-200
        ${
          activeSecondary === index
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white"
        }
        ${
          index !== primary.secondary.length - 1
            ? "border-r border-gray-300"
            : ""
        }
      `}
            onClick={() => setActiveSecondary(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-100 p-4">{secondary.component}</div>
    </div>
  );
}
