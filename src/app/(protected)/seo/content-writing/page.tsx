"use client";
import { usePathname, useRouter } from "next/navigation";

const keywordTabs = [
  { name: "Keyword Overview", href: "/seo/keyword-research/keyword-overview" },
  {
    name: "Keyword Magic Tool",
    href: "/seo/keyword-research/keyword-magic-tool",
  },
  {
    name: "Keyword Strategy Builder",
    href: "/seo/keyword-research/keyword-strategy-builder",
  },
  {
    name: "Position Tracking",
    href: "/seo/keyword-research/position-tracking",
  },
  {
    name: "Organic Traffic Insights",
    href: "/seo/keyword-research/organic-traffic-insights",
  },
];

export default function ContentWriting() {
  const pathname = usePathname();
    const router = useRouter();
  
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Keyword Research</h2>
  
        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300">
          {keywordTabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            return (
              <button
                key={tab.name}
                className={`px-3 py-1 rounded-t-md text-sm ${
                  isActive
                    ? "bg-white border-t border-l border-r border-gray-300 font-semibold"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => router.push(tab.href)}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
  
        {/* Render the selected sub-page */}
        <div className="bg-white p-4 rounded shadow">
          <p>
            Content for the selected keyword research sub-tab will render here.
          </p>
        </div>
      </div>
    );
}
