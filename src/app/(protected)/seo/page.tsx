"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import your SEO components
import DomainOverview from "./competitive-research/domain-overview/DomainOverview";
import OrganicResearch from "./competitive-research/organic-research/OrganicResearch";
import BacklinkGap from "./competitive-research/backlink-gap/BacklinkGap";
import KeywordGap from "./competitive-research/keyword-gap/KeywordGap";

import KeywordOverview from "./keyword-research/keyword-overview/KeywordOverview";
import KeywordMagicTool from "./keyword-research/keyword-magic-tool/KeywordMagicTool";
import KeywordStrategyBuilder from "./keyword-research/keyword-strategy-builder/KeywordStrategyBuilder";
import OrganicTrafficInsights from "./keyword-research/organic-traffic-insights/OrganicTrafficInsights";
import PositionTracking from "./keyword-research/position-tracking/PositionTracking";

import CreateUrl from "./content-writing/create-url/CreateUrl";
import GenrateContent from "./content-writing/genrate-content/GenrateContent";
import KeywordStuffing from "./content-writing/keyword-stuffing/KeywordStuffing";

import LogFileAnalyzer from "./on-page-tech-seo/log-file-analyzer/LogFileAnalyzer";
import OnPageSEOChecker from "./on-page-tech-seo/on-page-seo-checker/OnPageSeoChecker";
import SiteAudit from "./on-page-tech-seo/site-audit/SiteAudit";

import BacklinkAnalytics from "./link-building/backlink-analytics/BacklinkAnalytics";
import BacklinkAudit from "./link-building/backlink-audit/BacklinkAudit";
import BulkAnalysis from "./link-building/bulk-analysis/BulkAnalysis";
import LinkBuildingTool from "./link-building/link-building-tool/LinkBuildingTool";

import KeywordLearn from "./learn-seo/Keyword-learn/KeywordLearn";
import ContentWritingLearn from "./learn-seo/content-writing-learn/ContentWritingLearn";
import OnPageAndTechnicalSEOLearn from "./learn-seo/on-page-and-technical-seo-Learn/OnPageAndTechnicalSEOLearn";
import OffPageSEOLearn from "./learn-seo/off-page-seo-learn/OffPageSEOLearn";

// Define tabs
const seoTabs = [
  {
    name: "Competitive Research",
    secondary: [
      { name: "Domain Overview", component: <DomainOverview /> },
      { name: "Organic Research", component: <OrganicResearch /> },
      { name: "Keyword Gap", component: <KeywordGap /> },
      { name: "Backlink Gap", component: <BacklinkGap /> },
    ],
  },
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
  {
    name: "Content Writing",
    secondary: [
      { name: "Create Url", component: <CreateUrl /> },
      { name: "Keyword Stuffing", component: <KeywordStuffing /> },
      { name: "Genrate Content", component: <GenrateContent /> },
    ],
  },
  {
    name: "On Page & Tech SEO",
    secondary: [
      { name: "Log File Analyzer", component: <LogFileAnalyzer /> },
      { name: "On Page SEO Checker", component: <OnPageSEOChecker /> },
      { name: "Site Audit", component: <SiteAudit /> },
    ],
  },
  {
    name: "Link Building",
    secondary: [
      { name: "Backlink Analytics", component: <BacklinkAnalytics /> },
      { name: "Backlink Audit", component: <BacklinkAudit /> },
      { name: "Bulk Analysis", component: <BulkAnalysis /> },
      { name: "Link Building Tool", component: <LinkBuildingTool /> },
    ],
  },
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

  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const [canScrollPrimaryLeft, setCanScrollPrimaryLeft] = useState(false);
  const [canScrollPrimaryRight, setCanScrollPrimaryRight] = useState(false);
  const [canScrollSecondaryLeft, setCanScrollSecondaryLeft] = useState(false);
  const [canScrollSecondaryRight, setCanScrollSecondaryRight] = useState(false);  

  const primary = seoTabs[activePrimary];
  const secondary = primary.secondary[activeSecondary];

  const checkScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setLeft: React.Dispatch<React.SetStateAction<boolean>>,
    setRight: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!ref.current) return; // null check
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setLeft(scrollLeft > 0);
    setRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const updateScroll = () => {
      checkScroll(primaryRef, setCanScrollPrimaryLeft, setCanScrollPrimaryRight);
      checkScroll(secondaryRef, setCanScrollSecondaryLeft, setCanScrollSecondaryRight);
    };

    // Initial check
    updateScroll();

    window.addEventListener("resize", updateScroll);
    return () => window.removeEventListener("resize", updateScroll);
  }, []);

  // ✅ Single scroll function (renamed to avoid conflicts)
  const scrollTabs = (ref: React.RefObject<HTMLDivElement | null>, distance: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: distance, behavior: "smooth" });

    // Re-check scroll position after smooth scroll
    setTimeout(() => {
      checkScroll(
        ref,
        ref === primaryRef ? setCanScrollPrimaryLeft : setCanScrollSecondaryLeft,
        ref === primaryRef ? setCanScrollPrimaryRight : setCanScrollSecondaryRight
      );
    }, 300);
  };

  // ✅ Single useEffect to handle resize + initial state
  useEffect(() => {
    const updateScroll = () => {
      if (primaryRef.current)
        checkScroll(primaryRef, setCanScrollPrimaryLeft, setCanScrollPrimaryRight);
      if (secondaryRef.current)
        checkScroll(secondaryRef, setCanScrollSecondaryLeft, setCanScrollSecondaryRight);
    };

    updateScroll(); // initial check
    window.addEventListener("resize", updateScroll);
    return () => window.removeEventListener("resize", updateScroll);
  }, []);


  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-6 uppercase text-center lg:text-left">
        We are Here to Help you For Page SEO
      </h1>

      {/* Primary Tabs */}
      <div className="relative mb-2 w-full overflow-hidden">
        {canScrollPrimaryLeft && (
          <Button
            onClick={() => scrollTabs(primaryRef, -150)}
            className="absolute left-0 top-0 z-20 h-full px-2 bg-white/90 backdrop-blur-sm shadow flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Button>
        )}

        <div
          ref={primaryRef}
          className="flex flex-nowrap w-full px-1 sm:px-6 overflow-x-auto scrollbar-hide touch-pan-x"
          onScroll={() => checkScroll(primaryRef, setCanScrollPrimaryLeft, setCanScrollPrimaryRight)}
        >
          {seoTabs.map((tab, index) => (
            <Button
              key={tab.name}
              className={`flex-shrink-0 !h-8 min-w-0 px-3 sm:px-4 py-1.5 sm:py-2 text-sm transition-all
                ${activePrimary === index
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white"
                }`}
              onClick={() => { setActivePrimary(index); setActiveSecondary(0); }}
            >
              {tab.name}
            </Button>
          ))}
        </div>

        {canScrollPrimaryRight && (
          <Button
            onClick={() => scrollTabs(primaryRef, 150)}
            className="absolute right-0 top-0 z-20 h-full px-2 bg-white/90 backdrop-blur-sm shadow flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </Button>
        )}
      </div>

      {/* Secondary Tabs */}
      <div className="relative mb-4 w-full overflow-hidden">
        {canScrollSecondaryLeft && (
          <Button
            onClick={() => scrollTabs(secondaryRef, -150)}
            className="absolute left-0 top-0 z-20 h-full px-2 bg-white/90 backdrop-blur-sm shadow flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </Button>
        )}

        <div
          ref={secondaryRef}
          className="flex flex-nowrap text-sm w-full px-1 sm:px-6 overflow-x-auto scrollbar-hide touch-pan-x"
          onScroll={() => checkScroll(secondaryRef, setCanScrollSecondaryLeft, setCanScrollSecondaryRight)}
        >
          {primary.secondary.map((tab, index) => (
            <Button
              key={tab.name}
              className={`flex-shrink-0 !h-8 min-w-0 px-3 sm:px-4 py-1.5 sm:py-2 text-sm transition-all
                ${activeSecondary === index
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white"
                }`}
              onClick={() => setActiveSecondary(index)}
            >
              {tab.name}
            </Button>
          ))}
        </div>

        {canScrollSecondaryRight && (
          <Button
            onClick={() => scrollTabs(secondaryRef, 150)}
            className="absolute right-0 top-0 z-20 h-full px-2 bg-white/90 backdrop-blur-sm shadow flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="bg-white flex-1 overflow-auto">
        {secondary.component}
      </div>
    </div>
  );
}
