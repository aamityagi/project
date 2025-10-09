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

const validateDomain = (domain: string) => {
  const trimmed = domain.trim();

  // Must start with http://, https://, or www.
  const startsCorrectly = /^(https?:\/\/|www\.)/.test(trimmed);

  // Must contain a valid TLD somewhere
  const endsCorrectly = allowedTlds.some((tld) => trimmed.includes(tld));

  // Only allow valid URL characters
  const invalidChars = /[^a-zA-Z0-9-.:/]/.test(trimmed);

  // Ensure at least one character before TLD
  const tldMatch = allowedTlds.find((tld) => trimmed.includes(tld));
  const validLength = tldMatch
    ? trimmed
        .replace(/^(https?:\/\/|www\.)/, "")
        .split(tldMatch)[0].length > 0
    : false;

  return startsCorrectly && endsCorrectly && !invalidChars && validLength;
};


  const handleSubmit = () => {
    if (!validateDomain(domain)) {
      setError(
        'Invalid domain. Example: "https://example.com", "http://example.in", "www.example.org"'
      );
      return;
    }

    setError("");
    onSearch({ domain: domain.trim(), country });
  };

  return (
    <div className="flex flex-col w-full gap-1">
      {/* Form Row */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-center w-full">
        {/* Domain Input */}
        <Input
          type="text"
          placeholder="Enter domain (example: https://example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 border p-2 h-10 w-full"
        />

        {/* Country + Search Wrapper */}
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

      {/* Error Message (next to form row) */}
      {error && (
        <p className="text-red-500 text-sm md:ml-2">
          {error}
        </p>
      )}
    </div>
  );
}
