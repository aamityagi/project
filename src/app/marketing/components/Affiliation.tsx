import Link from "next/link";

        export default function Affiliation() {
  return (
    <section id="affiliation" className="py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Affiliation Program</h2>
      <p className="max-w-3xl mx-auto text-gray-700 mb-6">
        Join our affiliate program and earn rewards by referring users to our platform.
      </p>
      <Link href={"/signup"}>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
          Sign Up as Affiliate
        </button>
      </Link>
    </section>
  );
}
