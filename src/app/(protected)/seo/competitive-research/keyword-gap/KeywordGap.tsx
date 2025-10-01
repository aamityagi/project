"use client";

import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "@/app/(protected)/components/ui/button";
import CountrySelect from "../../../components/CountrySelector";
import ContentSection from "../components/ContentSection";
import contentData from "../../data/keywordGapContent.json";
import KeywordGapBacklinkForm from "../components/KeywordGapBacklinkForm";

interface Competitor {
  url: string;
  domainType: string;
  keywordType: string;
}

export default function KeywordGap() {
  const [userUrl, setUserUrl] = useState("");
  const [userDomainType, setUserDomainType] = useState("Root Domain");
  const [userKeywordType, setUserKeywordType] = useState("Organic Keyword");
  const [country, setCountry] = useState({ code: "IN", location_code: 2840 });

  const [competitors, setCompetitors] = useState<Competitor[]>([]);

  const handleAddCompetitor = () => {
    if (competitors.length < 3) {
      setCompetitors([...competitors, { url: "", domainType: "Root Domain", keywordType: "Organic Keyword" }]);
    }
  };

  const handleCompetitorChange = (index: number, field: keyof Competitor, value: string) => {
    const updated = [...competitors];
    updated[index][field] = value;
    setCompetitors(updated);
  };

  const handleCompare = () => {
    console.log({ user: { url: userUrl, domainType: userDomainType, keywordType: userKeywordType }, competitors, country });
  };

  return (
    <section className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Keyword Gap</h2>
        <p className="text-gray-600">
          A tool that helps you compare your keyword profile with your competitors.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 mb-8">
        <KeywordGapBacklinkForm
          onCompare={(data) => {
            console.log("Form Data:", data);
          }}
        />

      </div>

      {/* Content Sections */}
      <ContentSection data={contentData} />
    </section>
  );
}
