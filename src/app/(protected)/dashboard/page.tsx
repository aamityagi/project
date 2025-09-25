import AffiliateBanner from "../../components/AffiliateBanner";
import { getServerAuthSession } from "../../../../lib/getServerAuthSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Show affiliate opportunity */}
      <AffiliateBanner />

      {/* Your normal dashboard content */}
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
      <p className="text-sm text-gray-600">
        Your account overview goes here.
      </p>
    </div>
  );
}
