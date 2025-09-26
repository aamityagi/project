// src/app/api/keyword-search/route.ts
import { NextResponse } from "next/server";
import { connectMongo } from "../../../../lib/mongoose";
import Keyword from "../../../../models/Keyword";
import fs from "fs";

interface KeywordItem {
  Keyword: string;
  Intent: string;
  Volume: number;
  KD: number;
  CPC: number;
  SF: number;
  UpdateDate: Date;
}

// Type for SerpApi response (simplified)
interface SerpApiResult {
  title?: string;
  position?: number;
}

interface SerpApiResponse {
  organic_results?: SerpApiResult[];
}

// Type for OpenAI API response
interface OpenAIChoice {
  message: {
    content: string;
  };
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
}

export async function POST(req: Request) {
  await connectMongo();
  const { keyword, country } = await req.json();

  if (!keyword || !country) {
    return NextResponse.json({ error: "Keyword and country required" }, { status: 400 });
  }

  try {
    // 1️⃣ Check MongoDB
    const dbData = await Keyword.find({ keyword, country }).lean();
    if (dbData.length > 0) {
      console.log("✅ Found in MongoDB");
      return NextResponse.json({ source: "mongodb", data: dbData });
    } else {
      console.log("❌ Not found in MongoDB");
    }

    const combinedData: KeywordItem[] = [];

    // 2️⃣ Keyword API (SerpApi example)
    try {
      if (process.env.SERPAPI_KEY) {
        const apiRes = await fetch(
          `https://serpapi.com/search.json?q=${keyword}&location=${country}&api_key=${process.env.SERPAPI_KEY}`
        );

        if (apiRes.ok) {
          const apiJson: SerpApiResponse = await apiRes.json();

          if (apiJson?.organic_results?.length) {
            const formatted: KeywordItem[] = apiJson.organic_results.map((r) => ({
              Keyword: r.title || keyword,
              Intent: "Informational",
              Volume: r.position || 0,
              KD: Math.floor(Math.random() * 100),
              CPC: Number((Math.random() * 2).toFixed(2)),
              SF: Math.floor(Math.random() * 10),
              UpdateDate: new Date(),
            }));
            console.log(`✅ Found ${formatted.length} from Keyword API`);
            combinedData.push(...formatted);
          } else {
            console.log("❌ No data from keyword API");
          }
        } else {
          console.log(`❌ Keyword API failed with status ${apiRes.status}`);
        }
      } else {
        console.log("⚠️ SERPAPI_KEY not set, skipping keyword API");
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log("Keyword API error:", err.message);
      else console.log("Keyword API error:", err);
    }

    // 3️⃣ AI fallback
    try {
      if (combinedData.length === 0 && process.env.OPENAI_API_KEY) {
        const aiPrompt = `Provide keyword research data for "${keyword}" in ${country} with fields: Keyword, Intent, Volume, KD, CPC, SF, UpdateDate. Respond as JSON array.`;

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

        if (aiRes.ok) {
          const aiData: OpenAIResponse = await aiRes.json();
          const aiJson: KeywordItem[] = JSON.parse(aiData.choices[0].message.content || "[]");
          if (aiJson.length) {
            console.log(`✅ Found ${aiJson.length} from AI`);
            combinedData.push(...aiJson);
          } else {
            console.log("❌ No data available from AI");
          }
        } else {
          console.log(`❌ AI API failed with status ${aiRes.status}`);
        }
      } else if (!process.env.OPENAI_API_KEY) {
        console.log("⚠️ OPENAI_API_KEY not set, skipping AI fallback");
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log("AI API error:", err.message);
      else console.log("AI API error:", err);
    }

    // 4️⃣ If all fail
    if (combinedData.length === 0) {
      console.log("❌ No data found in DB, API, or AI");
      return NextResponse.json({ data: [], message: "No data available" });
    }

    // 5️⃣ Deduplicate
    const uniqueDataMap = new Map<string, KeywordItem>();
    combinedData.forEach((item) => {
      if (!uniqueDataMap.has(item.Keyword)) uniqueDataMap.set(item.Keyword, item);
    });
    const finalData = Array.from(uniqueDataMap.values());

    // 6️⃣ Save/update MongoDB
    for (const item of finalData) {
      await Keyword.updateOne(
        { keyword: item.Keyword, country },
        { $set: { ...item, country } },
        { upsert: true }
      );
    }

    // 7️⃣ Save JSON file
    fs.writeFileSync("keyword-results.json", JSON.stringify(finalData, null, 2));

    return NextResponse.json({ source: "combined", data: finalData });
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Server error in keyword search:", err.message);
    else console.error("Server error in keyword search:", err);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
