// src/app/api/keyword-search/route.ts
"use server";

import { NextResponse } from "next/server";
import { connectMongo } from "../../../../lib/mongoose";
import Keyword from "../../../../models/Keyword";
import fs from "fs/promises"; // ✅ use async fs

interface KeywordItem {
  Keyword: string;
  Intent: string;
  Volume: number;
  KD: number;
  CPC: number;
  SF: number;
  UpdateDate: Date;
  Source: string;
}

// Random intent generator
function getIntentForKeyword(): string {
  const intents = ["Informational", "Transactional", "Navigational", "Commercial"];
  return intents[Math.floor(Math.random() * intents.length)];
}

// ✅ Safe JSON parser
async function safeJson(req: Request) {
  try {
    const text = await req.text();
    if (!text) return {};
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  await connectMongo();

  // ✅ Safe parse
  const { keyword, country } = await safeJson(req);

  if (!keyword || !country) {
    return NextResponse.json({ error: "Keyword and country required" }, { status: 400 });
  }

  try {
    const combinedData: KeywordItem[] = [];

    // 1️⃣ Check MongoDB first
    const dbDataFromMongo = await Keyword.find({ keyword, country }).lean();
    if (dbDataFromMongo.length > 0) {
      const dbData: KeywordItem[] = dbDataFromMongo.map(item => ({
        Keyword: item.keyword,
        Intent: item.Intent || getIntentForKeyword(),
        Volume: item.Volume || 0,
        KD: item.KD || 0,
        CPC: item.CPC || 0,
        SF: item.SF || 0,
        UpdateDate: item.UpdateDate || new Date(),
        Source: "MongoDB",
      }));
      return NextResponse.json({ source: "mongodb", data: dbData });
    }

    // 2️⃣ SerpApi
    if (process.env.SERPAPI_KEY) {
      try {
        const serpRes = await fetch(
          `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&location=${encodeURIComponent(
            country
          )}&api_key=${process.env.SERPAPI_KEY}`
        );
        const serpJson = await serpRes.json();
        if (Array.isArray(serpJson?.organic_results)) {
          const serpData: KeywordItem[] = serpJson.organic_results.map((r: any) => ({
            Keyword: r.title || keyword,
            Intent: getIntentForKeyword(),
            Volume: r.position || 0,
            KD: Math.floor(Math.random() * 100),
            CPC: Number((Math.random() * 2).toFixed(2)),
            SF: Math.floor(Math.random() * 10),
            UpdateDate: new Date(),
            Source: "SerpApi",
          }));
          combinedData.push(...serpData);
        }
      } catch (err: unknown) {
        console.error("SerpApi error:", err);
      }
    }

    // 3️⃣ DataForSEO
    if (process.env.DATAFORSEO_KEY && process.env.DATAFORSEO_SECRET) {
      try {
        const countryLocationMap: Record<string, number> = {
          India: 2840,
          USA: 2840, // replace with correct codes
        };
        const location_code = countryLocationMap[country] || 2840;
        const tasks = [{ keyword, language_code: "en", location_code }];

        const res = await fetch(
          "https://api.dataforseo.com/v3/keywords_data/google/search_volume/live",
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  `${process.env.DATAFORSEO_KEY}:${process.env.DATAFORSEO_SECRET}`
                ).toString("base64"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks),
          }
        );

        const dataForSEOJson = await res.json();
        if (Array.isArray(dataForSEOJson.tasks)) {
          const dfsData: KeywordItem[] = dataForSEOJson.tasks.flatMap((task: any) =>
            Array.isArray(task.result)
              ? task.result.map((r: any) => ({
                  Keyword: r.keyword || keyword,
                  Intent: getIntentForKeyword(),
                  Volume: r.search_volume || 0,
                  KD: r.competition || Math.floor(Math.random() * 100),
                  CPC: r.cpc || Number((Math.random() * 2).toFixed(2)),
                  SF: r.search_feature || Math.floor(Math.random() * 10),
                  UpdateDate: new Date(),
                  Source: "DataForSEO",
                }))
              : []
          );
          combinedData.push(...dfsData);
        }
      } catch (err: unknown) {
        console.error("DataForSEO error:", err);
      }
    }

    // 4️⃣ AI fallback
    if (combinedData.length === 0 && process.env.OPENAI_API_KEY) {
      try {
        const aiPrompt = `Provide keyword research data for "${keyword}" in ${country} as JSON array with fields: Keyword, Intent, Volume, KD, CPC, SF, UpdateDate.`;

        const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: aiPrompt }],
            max_tokens: 500,
          }),
        });

        const aiData = await aiRes.json();
        const aiParsed = JSON.parse(aiData.choices?.[0]?.message?.content || "[]");

        const aiJson: KeywordItem[] = aiParsed.map((item: any) => ({
          Keyword: item.Keyword || keyword,
          Intent: getIntentForKeyword(),
          Volume: item.Volume ?? 0,
          KD: item.KD ?? 0,
          CPC: item.CPC ?? 0,
          SF: item.SF ?? 0,
          UpdateDate: item.UpdateDate ? new Date(item.UpdateDate) : new Date(),
          Source: "AI",
        }));

        if (aiJson.length) combinedData.push(...aiJson);
      } catch (err: unknown) {
        console.error("AI error:", err);
      }
    }

    if (combinedData.length === 0) {
      return NextResponse.json({ data: [], message: "No data available" });
    }

    // Deduplicate by keyword
    const uniqueDataMap = new Map<string, KeywordItem>();
    combinedData.forEach(item => {
      if (!uniqueDataMap.has(item.Keyword)) uniqueDataMap.set(item.Keyword, item);
    });
    const finalData = Array.from(uniqueDataMap.values());

    // Save/update MongoDB
    await Promise.all(
      finalData.map(item =>
        Keyword.updateOne(
          { keyword: item.Keyword, country },
          { $set: { ...item, country } },
          { upsert: true }
        )
      )
    );

    // Save JSON asynchronously
    await fs.writeFile("keyword-results.json", JSON.stringify(finalData, null, 2));

    return NextResponse.json({ source: "combined", data: finalData });
  } catch (err: unknown) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
