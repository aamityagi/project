"use client";

import { useState } from "react";
import { Input } from "@/app/(protected)/components/ui/input";
import CountrySelect from "@/app/(protected)/components/CountrySelector";
import { Button } from "@/app/(protected)/components/ui/button";

interface DomainFormProps {
  onSearch: (data: { domain: string; country: { code: string; location_code: number } }) => void;
}

export default function DomainOrganicForm({ onSearch }: DomainFormProps) {
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState({ code: "IN", location_code: 2840 });
  const [error, setError] = useState("");

  const allowedTlds = [".com", ".in", ".org", ".net", ".uae"];

  // Normalize the domain: remove protocol and www
  const normalizeDomain = (input: string) => {
    return input
      .trim()
      .replace(/^(https?:\/\/)/i, "")
      .replace(/^www\./i, "");
  };

  const validateDomain = (input: string) => {
    const normalized = normalizeDomain(input);

    // Check if contains valid TLD
    const validTld = allowedTlds.some((tld) => normalized.includes(tld));

    // Check if there are invalid characters
    const invalidChars = /[^a-zA-Z0-9-.:/]/.test(normalized);

    return validTld && !invalidChars;
  };

  const handleSubmit = () => {
    const normalized = normalizeDomain(domain);
    if (!validateDomain(domain)) {
      setError('Invalid domain. Example: "example.com", "example.in", "example.org"');
      return;
    }

    setError("");
    onSearch({ domain: normalized, country });
  };

  // Trigger search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-center w-full">
        <Input
          type="text"
          placeholder="Enter domain (example: example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 h-10 w-full"
        />

        <div className="flex w-full md:w-auto gap-2">
          <CountrySelect
            value={country.code}
            onChange={({ code, location_code }) => setCountry({ code, location_code })}
          />
          <Button
            onClick={handleSubmit}
            className="h-10 w-full md:w-[80px] bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600"
          >
            Search
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm md:ml-2">{error}</p>}
    </div>
  );
}
