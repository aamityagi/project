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
  const [country, setCountry] = useState({ code: "IN", location_code: 2840 }); // default India

  const handleSubmit = () => {
    onSearch({ domain, country });
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-6">
      {/* Domain Input */}
      <Input
        type="text"
        placeholder="Enter domain (example.com)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="flex-1 border p-2 w-full"
      />

      {/* Country Selector */}
      <CountrySelect
        value={country.code}
        onChange={({ code, location_code }) => setCountry({ code, location_code })}
      />

      {/* Search Button */}
      <Button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600"
      >
        Search
      </Button>
    </div>
  );
}
