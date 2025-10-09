"use client";

import React from "react";
import ReactCountryFlag from "react-country-flag";
import data from "../domain-overview/data/domainStats.json";

interface DomainAIStatsProps {
  countryCode: string;
}

export default function DomainAIStats({ countryCode }: DomainAIStatsProps) {
  const { aiVisibility, aiOverview } = data;

  return (
    <div className="grid gap-6 w-full bg-white p-3 rounded shadow-lg border border-gray-300">
      {/* Heading + Today + Country */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h4 className="text-sm font-bold flex items-center gap-1">
          {aiVisibility.title} - 
          <small className="text-gray-600">
            {aiVisibility.date} 
            <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{ width: '1.2em', height: '1.2em' }}
                className="mx-1"
            />
            {countryCode}
          </small>
        </h4>
      </div>
        {/* Half-circle progress graph */}
        <div className="w-full max-w-xs mx-auto">
            {/* Full Circle Progress */}
            <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                {/* Background Circle */}
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#e5e7eb" // mid gray
                    strokeWidth="4"
                />
                {/* Progress Circle */}
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#10b981" // green
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 16} // circumference
                    strokeDashoffset={2 * Math.PI * 16 * (1 - aiVisibility.total / 100)} // dynamic
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)" // start from top
                />
                </svg>
                {/* Centered text */}
                <div className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-bold">
                {aiVisibility.total}%
                </div>
            </div>
        </div>
        {/* Mentions Section */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1 items-start">
            {/* Left column: heading + total */}
            <div>
                <h4 className="text-sm font-semibold">Mentions</h4>
                <p className="text-2xl font-bold mt-2">
                    {(() => {
                    // Calculate total
                    const total = aiOverview.reduce((sum, item) => {
                        if (!item.count) return sum;
                        let value: number;
                        const countStr = item.count.toUpperCase();
                        if (countStr.endsWith("K")) value = parseFloat(countStr) * 1000;
                        else if (countStr.endsWith("M")) value = parseFloat(countStr) * 1_000_000;
                        else value = parseInt(countStr);
                        return sum + value;
                    }, 0);

                    // Format with K/M/B
                    if (total >= 1_000_000_000) return (total / 1_000_000_000).toFixed(1) + "B";
                    if (total >= 1_000_000) return (total / 1_000_000).toFixed(1) + "M";
                    if (total >= 1_000) return (total / 1_000).toFixed(1) + "K";
                    return total;
                    })()}
                </p>
            </div>
            {/* Right column: list of mentions */}
            <div>
                <ul className="list-none flex flex-col gap-2">
                    {aiOverview.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-[12px]">
                        <span className="flex items-center gap-1 text-gray-600">
                            {item.icon && <img src={item.icon} alt={item.name} className="h-4 w-4" />}
                            {item.name}
                        </span>
                        <span className="font-semibold">
                            {item.count ? (
                            item.count
                            ) : (
                            <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                                soon
                            </span>
                            )}
                        </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
}
