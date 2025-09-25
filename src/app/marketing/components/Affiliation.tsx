import { getServerAuthSession } from "../../../../lib/getServerAuthSession";
import { redirect } from 'next/navigation';


export default async function AffiliateLanding() {
const session = await getServerAuthSession();
if (session) {
// If already signed in, send to onboarding directly
redirect('/onboarding/affiliation');
}


return (
<div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold">Partner with us</h1>
    <p className="mt-2 text-gray-600">Earn commissions by sharing our product. Sign up to apply and receive a promo link.</p>
    <div className="mt-6">
        <a href={`/api/auth/signin?callbackUrl=/onboarding/affiliation`} className="inline-flex items-center rounded bg-[#d2ab67] px-4 py-2 text-black">Sign up / Login to apply</a>
    </div>
</div>
);
}