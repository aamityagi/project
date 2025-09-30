import { redirect } from "next/navigation";
import AffiliationForm from "../../../components/AffiliationForm";
import { getServerAuthSession } from "../../../../../lib/getServerAuthSession";

export default async function AffiliationOnboardingPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/onboarding/affiliation");
  }



  const initial = {
    email: session.user?.email || "",
    fullName: session.user?.name || "",
  };

  return (
    <div className="p-6">
      <h1>Join Affiliate Program</h1>
      <AffiliationForm initial={initial} />
    </div>
  );
}
