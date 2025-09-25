import { redirect } from "next/navigation";
import AffiliationForm from "../../../components/AffiliationForm";
import { getServerAuthSession } from "../../../../../lib/getServerAuthSession";

export default async function AffiliationOnboardingPage() {
  const session = await getServerAuthSession();

  if (!session) {
    // Redirect to signin with callback so user lands back here after login
    redirect("/api/auth/signin?callbackUrl=/onboarding/affiliation");
  }

  const initial = {
    email: session.user?.email || "",
    fullName: session.user?.name || "",
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900">
          Join our Affiliate / Partner Program
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Fill out this form to apply. We Will review your application and respond
          within <span className="font-medium">3 to 5 business days</span>.
        </p>

        <div className="mt-6 bg-white shadow-sm rounded-lg p-6 border">
          <AffiliationForm initial={initial} />
        </div>
      </div>
    </div>
  );
}
