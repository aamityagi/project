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
  onCompare: (data: {
    user: { url: string; domainType: string; keywordType: string };
    competitors: Competitor[];
    country: { code: string; location_code: number };
  }) => void;
}

export default function KeywordGapBacklinkForm({ onCompare }: KeywordGapFormProps) {
  const [userUrl, setUserUrl] = useState("");
  const [userDomainType, setUserDomainType] = useState("Root Domain");
  const [userKeywordType, setUserKeywordType] = useState("Organic Keyword");
  const [country, setCountry] = useState({ code: "IN", location_code: 2840 });
  const [competitors, setCompetitors] = useState<Competitor[]>([]);

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
    onCompare({
      user: { url: userUrl, domainType: userDomainType, keywordType: userKeywordType },
      competitors,
      country,
    });
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
            <Select value={userDomainType} onValueChange={setUserDomainType}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {domainOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Keyword Type */}
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
                value={comp.domainType}
                onValueChange={(val) => handleCompetitorChange(index, "domainType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {domainOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Keyword Type */}
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
          </div>
        </div>
      ))}

      {/* Bottom Row: Add Competitor Left, Country + Compare Right */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Add Competitor Button (left) */}
        {competitors.length < 3 && (
          <Button onClick={handleAddCompetitor} className="w-auto">
            Add Competitor
          </Button>
        )}

        {/* Country + Compare Button (right) */}
        <div className="flex flex-1 md:flex-row gap-3 items-center justify-end">
          <CountrySelect
            value={country.code}
            onChange={({ code, location_code }) => setCountry({ code, location_code })}
          />
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
