"use client";

import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import DomainWhoisData from "./DomainWhoisData";
import DomainAIStats from "./DomainAIStats";

interface DomainResultProps {
  domain: string;       // user input
  countryCode: string;
}

export default function DomainResult({ domain, countryCode }: DomainResultProps) {
  const [whoisData, setWhoisData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Normalize domain ONLY for link (remove protocol + www)
  const getLinkDomain = (input: string) => {
    return input.replace(/^(https?:\/\/)?(www\.)?/i, "");
  };

  useEffect(() => {
    async function fetchWhois() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/whois?domain=${domain}`);
        const data = await res.json();
        if (data.error) setError(data.error);
        else setWhoisData(data);
      } catch (err) {
        setError("Failed to load domain data");
      } finally {
        setLoading(false);
      }
    }

    fetchWhois();
  }, [domain]);

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 w-full">
      {/* Header: Domain + Flag */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h3 className="text-md md:text-lg font-semibold flex items-center gap-2 flex-wrap">
          Domain Overview:
          <span className="bg-yellow-200 rounded px-2 py-1 shadow-sm flex items-center gap-1">
            <a
              href={`//${getLinkDomain(domain)}`} // just domain
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              {domain} {/* show exactly what user typed */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-4h-4a2 2 0 0 0-2 2v4m6-6l-10 10"
                />
              </svg>
            </a>
          </span>


          <span className="text-sm flex items-center gap-1">
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{ width: "1.2em", height: "1.2em" }}
            />
            {countryCode}
          </span>
        </h3>
      </div>

      {/* Content: WHOIS + AI Stats */}
      <div className="mt-4 w-full flex flex-col md:flex-row gap-4 items-stretch">
        {/* Left div */}
        <div className="w-full md:w-1/4 flex flex-col">
          <div className="flex-1 flex flex-col justify-between">
            {loading && <p className="text-gray-600 mt-2">Fetching domain info...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {whoisData && <DomainWhoisData data={whoisData} />}
          </div>
        </div>

        {/* Center div */}
        <div className="w-full md:w-1/4 flex flex-col">
          <div className="flex-1 flex flex-col justify-between">
            <DomainAIStats countryCode={countryCode} />
          </div>
        </div>

        {/* Right div */}
        <div className="w-full md:w-2/4 flex flex-col">
          <div className="flex-1 flex flex-col justify-between">
            <DomainAIStats countryCode={countryCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
