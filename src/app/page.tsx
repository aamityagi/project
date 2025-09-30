// src/app/page.tsx
import { redirect } from "next/navigation";
import MarketingPage from "./marketing/page";
import { getServerAuthSession } from "../../lib/getServerAuthSession";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    // ✅ logged-in users should NOT see marketing
    redirect("/dashboard"); // or "/onboarding/affiliation"
  }

  // ✅ guests see marketing
  return <MarketingPage />;
}
