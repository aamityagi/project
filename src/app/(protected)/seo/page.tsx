"use client";

import { useState } from "react";

// Example: Import components for each secondary tab
// Competitive Research
import DomainOverview from "./competitive-research/domain-overview/DomainOverview";
import OrganicResearch from "./competitive-research/organic-research/OrganicResearch";
import BacklinkGap from "./competitive-research/backlink-gap/BacklinkGap";
import KeywordGap from "./competitive-research/keyword-gap/KeywordGap";

// Keyword Overview
import KeywordOverview from "./keyword-research/keyword-overview/KeywordOverview";
import KeywordMagicTool from "./keyword-research/keyword-magic-tool/KeywordMagicTool";
import KeywordStrategyBuilder from "./keyword-research/keyword-strategy-builder/KeywordStrategyBuilder";
import OrganicTrafficInsights from "./keyword-research/organic-traffic-insights/OrganicTrafficInsights";
import PositionTracking from "./keyword-research/position-tracking/PositionTracking";

// Content Writing
import CreateUrl from "./content-writing/create-url/CreateUrl";
import GenrateContent from "./content-writing/genrate-content/GenrateContent";
import KeywordStuffing from "./content-writing/keyword-stuffing/KeywordStuffing";

// On Page and Technical Seo
import LogFileAnalyzer from "./on-page-tech-seo/log-file-analyzer/LogFileAnalyzer";
import OnPageSEOChecker from "./on-page-tech-seo/on-page-seo-checker/OnPageSeoChecker";
import SiteAudit from "./on-page-tech-seo/site-audit/SiteAudit";

// Link Building
import BacklinkAnalytics from "./link-building/backlink-analytics/BacklinkAnalytics";
import BacklinkAudit from "./link-building/backlink-audit/BacklinkAudit";
import BulkAnalysis from "./link-building/bulk-analysis/BulkAnalysis";
import LinkBuildingTool from "./link-building/link-building-tool/LinkBuildingTool";

// SEO Learn
import KeywordLearn from "./learn-seo/Keyword-learn/KeywordLearn";
import ContentWritingLearn from "./learn-seo/content-writing-learn/ContentWritingLearn";
import OnPageAndTechnicalSEOLearn from "./learn-seo/on-page-and-technical-seo-Learn/OnPageAndTechnicalSEOLearn";
import OffPageSEOLearn from "./learn-seo/off-page-seo-learn/OffPageSEOLearn";

import { Button } from "../components/ui/button";

const seoTabs = [
  // Competitive Research
  {
    name: "Competitive Research",
    secondary: [
      { name: "Domain Overview", component: <DomainOverview /> },
      { name: "Organic Research", component: <OrganicResearch /> },
      { name: "Backlink Gap", component: <BacklinkGap /> },
      { name: "Keyword Gap", component: <KeywordGap /> },
    ],
  },
  // Keyword Research
  {
    name: "Keyword Research",
    secondary: [
      { name: "Keyword Overview", component: <KeywordOverview /> },
      { name: "Keyword Magic Tool", component: <KeywordMagicTool /> },
      { name: "Keyword Strategy Builder", component: <KeywordStrategyBuilder /> },
      { name: "Organic Traffic Insights", component: <OrganicTrafficInsights /> },
      { name: "Position Tracking", component: <PositionTracking /> },
    ],
  },
  // Content Writing
  {
    name: "Content Writing",
    secondary: [
      { name: "Create Url", component: <CreateUrl /> },
      { name: "Keyword Stuffing", component: <KeywordStuffing /> },
      { name: "Genrate Content", component: <GenrateContent /> },
    ],
  },
  // On Page & Technical Seo
  {
    name: "On Page & Tech SEO",
    secondary: [
      { name: "Log File Analyzer", component: <LogFileAnalyzer /> },
      { name: "On Page SEO Checker", component: <OnPageSEOChecker /> },
      { name: "Site Audit", component: <SiteAudit /> },
    ],
  },
  // Link Building
  {
    name: "Link Building",
    secondary: [
      { name: "Backlink Analytics", component: <BacklinkAnalytics /> },
      { name: "Backlink Audit", component: <BacklinkAudit /> },
      { name: "Bulk Analysis", component: <BulkAnalysis /> },
      { name: "Link Building Tool", component: <LinkBuildingTool /> },
    ],
  },
  // Link Building
  {
    name: "SEO Learn",
    secondary: [
      { name: "Keyword Learn", component: <KeywordLearn /> },
      { name: "Content Writing Learn", component: <ContentWritingLearn /> },
      { name: "On Page and Technical SEO", component: <OnPageAndTechnicalSEOLearn /> },
      { name: "Off Page SEO Learn", component: <OffPageSEOLearn /> },
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
        We are Here to Help you For Page SEO.
      </h1>

      {/* Primary Tabs */}
      <div className="flex mb-4 border-b border-gray-300 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {seoTabs.map((tab, index) => (
          <Button
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
          </Button>
        ))}
      </div>

      {/* Secondary Tabs */}
      <div className="flex border-b border-gray-300">
        {primary.secondary.map((tab, index) => (
          <Button
            key={tab.name}
            className={`
        px-2 py-1 text-sm font-medium transition-all duration-200
        ${
          activeSecondary === index
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white"
        }
        ${
          index !== primary.secondary.length - 1 ? "" : ""
        }
      `}
            onClick={() => setActiveSecondary(index)}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-100 p-4 shadow-xl border-r border-l border-b border-gray-300">
        {secondary.component}
      </div>
    </div>
  );
}
