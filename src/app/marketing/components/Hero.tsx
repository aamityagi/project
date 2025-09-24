import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-24 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to Our Platform
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Best solution for managing your products, pricing, and affiliates.
      </p>
      <Link href="/signup">
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer">
          Get Started
        </button>
      </Link>
    </section>
  );
}
