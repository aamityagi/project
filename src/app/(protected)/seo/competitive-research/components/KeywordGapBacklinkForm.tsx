"use client";

import { useState } from "react";
import { Input } from "@/app/(protected)/components/ui/input";
import { Button } from "@/app/(protected)/components/ui/button";
import CountrySelect from "@/app/(protected)/components/CountrySelector";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/app/(protected)/components/ui/select";

export interface Competitor {
  url: string;
  domainType: string;
  keywordType: string;
}

interface KeywordGapFormProps {
  onCompare: (data: any) => void;
  onlyRootDomain?: boolean; // optional prop to fix domain type
  hideCountry?: boolean; // optional prop to hide country selector
}

export default function KeywordGapBacklinkForm({
  onCompare,
  onlyRootDomain = false,
  hideCountry = false,
}: KeywordGapFormProps) {
  const [userUrl, setUserUrl] = useState("");
  const [userDomainType, setUserDomainType] = useState("Root Domain");
  const [userKeywordType, setUserKeywordType] = useState("Organic Keyword");
  const [country, setCountry] = useState({ code: "IN", location_code: 2840 });

  // Initialize with one competitor by default
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { url: "", domainType: onlyRootDomain ? "Root Domain" : "Root Domain", keywordType: "Organic Keyword" },
  ]);

  const domainOptions = ["Root Domain", "Exact URL", "Subdomain", "Subfolder"];
  const keywordOptions = ["Organic Keyword", "Paid Keyword", "PLA Keyword"];

  const handleAddCompetitor = () => {
    if (competitors.length < 3) {
      setCompetitors([
        ...competitors,
        { url: "", domainType: "Root Domain", keywordType: "Organic Keyword" },
      ]);
    }
  };

  const handleCompetitorChange = (
    index: number,
    field: keyof Competitor,
    value: string
  ) => {
    const updated = [...competitors];
    updated[index][field] = value;
    setCompetitors(updated);
  };

  const handleCompareClick = () => {
    const data = {
      user: { url: userUrl, domainType: userDomainType },
      competitors: competitors.map((c) => ({ url: c.url, domainType: c.domainType })),
      country: hideCountry ? undefined : country,
    };
    console.log("Form Data:", data);
    onCompare(data);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* User Section */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-3 items-start">
          <div className="flex-1 w-full">
            <label className="text-sm font-medium mb-1 block">Your Domain</label>
            <Input
              type="text"
              placeholder="Enter your website URL"
              value={userUrl}
              onChange={(e) => setUserUrl(e.target.value)}
              className="w-full h-10 p-2"
            />
          </div>

          {/* Domain Type */}
          <div>
            <label className="text-sm font-medium mb-1 block">Domain Type</label>
            <Select
              value="Root Domain"
              disabled={onlyRootDomain} // fixed to Root Domain
              onValueChange={(val) => setUserDomainType(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {onlyRootDomain
                  ? <SelectItem value="Root Domain">Root Domain</SelectItem>
                  : domainOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))
                }
              </SelectContent>
            </Select>
          </div>

          {/* Keyword Type - hide for Backlink Gap */}
          {!onlyRootDomain && (
            <div>
              <label className="text-sm font-medium mb-1 block">Keyword Type</label>
              <Select value={userKeywordType} onValueChange={setUserKeywordType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {keywordOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Competitor Section */}
      {competitors.map((comp, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between"
        >
          <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-3 items-start">
            <div className="flex-1 w-full">
              <label className="text-sm font-medium mb-1 block">
                Competitor URL {index + 1}
              </label>
              <Input
                type="text"
                placeholder="Enter competitor URL"
                value={comp.url}
                onChange={(e) => handleCompetitorChange(index, "url", e.target.value)}
                className="w-full h-10 p-2"
              />
            </div>

            {/* Domain Type */}
            <div>
              <label className="text-sm font-medium mb-1 block">Domain Type</label>
              <Select
                value="Root Domain"
                disabled={onlyRootDomain}
                onValueChange={(val) => handleCompetitorChange(index, "domainType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {onlyRootDomain
                    ? <SelectItem value="Root Domain">Root Domain</SelectItem>
                    : domainOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Keyword Type - hide */}
            {!onlyRootDomain && (
              <div>
                <label className="text-sm font-medium mb-1 block">Keyword Type</label>
                <Select
                  value={comp.keywordType}
                  onValueChange={(val) => handleCompetitorChange(index, "keywordType", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {keywordOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {competitors.length < 3 && (
          <Button onClick={handleAddCompetitor} className="w-auto text-white">
            Add Competitor
          </Button>
        )}

        <div className="flex flex-1 md:flex-row gap-3 items-center justify-end">
          {!hideCountry && (
            <CountrySelect
              value={country.code}
              onChange={({ code, location_code }) => setCountry({ code, location_code })}
            />
          )}
          <Button
            onClick={handleCompareClick}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-purple-600 hover:to-indigo-600 w-full md:w-auto"
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
}
