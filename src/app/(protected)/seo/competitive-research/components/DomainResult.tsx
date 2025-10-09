"use client";

import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import DomainAIStats from "./DomainAIStats";

interface DomainResultProps {
  domain: string;
  countryCode: string;
}

export default function DomainResult({ domain, countryCode }: DomainResultProps) {
  return (
    <div className="mt-6 p-4 border border-gray-300 bg-gray-100 w-full rounded-lg">
      {/* Domain + Flag in one line */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h3 className="text-md md:text-lg font-semibold flex items-center gap-2 flex-wrap">
          Domain Overview:
          <span className="bg-yellow-200 rounded px-2 py-1 shadow-sm flex items-center gap-1">
            <Link
              href={domain.startsWith("http") ? domain : `https://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              {domain}
              {/* External link icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-4h-4a2 2 0 0 0-2 2v4m6-6l-10 10" />
              </svg>
            </Link>
          </span>

          {/* Flag + Country code */}
          <span className="text-sm flex items-center gap-1">
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{ width: '1.2em', height: '1.2em' }}
            />
            {countryCode}
          </span>
        </h3>
      </div>

        {/* AI Stats Section */}
        <div className="mt-4 w-full flex flex-col md:flex-row gap-4">
            {/* Left div - 1/4 width */}
            <div className="w-full md:w-1/4">
                <DomainAIStats countryCode={countryCode} />
            </div>
            {/* Right div - 3/4 width */}
            <div className="w-full md:w-3/4">
                {/* Future content goes here */}
            </div>
        </div>

    </div>
  );
}
