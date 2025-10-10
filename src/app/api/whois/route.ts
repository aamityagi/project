import { NextRequest, NextResponse } from "next/server";

interface WhoisData {
  domain: string;
  registrar?: string;
  country?: string;
  whoisServer?: string;
  created?: string;
  updated?: string;
  expires?: string;
  nameservers?: string[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  try {
    const results: WhoisData[] = [];

    // --- WhoAPI ---
    try {
      const whoapiRes = await fetch(
        `https://api.whoapi.com/?apikey=${process.env.WHOAPI_KEY}&r=whois&domain=${domain}`
      );
      const whoapiData = await whoapiRes.json();
      if (!whoapiData.error && whoapiData.status !== 35) {
        results.push({
          domain: whoapiData.domain,
          registrar: whoapiData.registrar,
          country: whoapiData.country,
          whoisServer: whoapiData.whois_server,
          created: whoapiData.create_date,
          updated: whoapiData.update_date,
          expires: whoapiData.expire_date,
          nameservers: whoapiData.name_servers,
        });
      }
    } catch (e) {
      console.error("WhoAPI error:", e);
    }

    // --- JSONWHOIS ---
    try {
      const jsonWhoisRes = await fetch(
        `https://jsonwhoisapi.com/api/v1/whois?identifier=${domain}`,
        { headers: { Authorization: `Token ${process.env.JSONWHOIS_KEY}` } }
      );
      const jsonWhoisData = await jsonWhoisRes.json();
      results.push({
        domain: jsonWhoisData.domain_name,
        registrar: jsonWhoisData.registrar_name,
        country: jsonWhoisData.registrant_country,
        whoisServer: jsonWhoisData.whois_server,
        created: jsonWhoisData.registry_created,
        updated: jsonWhoisData.registry_updated,
        expires: jsonWhoisData.registry_expiry,
        nameservers: jsonWhoisData.nameservers,
      });
    } catch (e) {
      console.error("JSONWHOIS error:", e);
    }

    // --- Merge results ---
    const merged: WhoisData = results.reduce((acc, curr) => {
      if (!acc.domain) acc.domain = curr.domain;
      acc.registrar ||= curr.registrar;
      acc.country ||= curr.country;
      acc.whoisServer ||= curr.whoisServer;
      acc.created ||= curr.created;
      acc.updated ||= curr.updated;
      acc.expires ||= curr.expires;
      acc.nameservers ||= curr.nameservers;
      return acc;
    }, {} as WhoisData);

    if (!merged.domain) {
      return NextResponse.json(
        { error: "Invalid or unavailable domain information." },
        { status: 404 }
      );
    }

    console.log("Merged WHOIS data:", merged);
    return NextResponse.json(merged);
  } catch (err) {
    console.error("General WHOIS error:", err);
    return NextResponse.json({ error: "Failed to fetch WHOIS data" }, { status: 500 });
  }
}
