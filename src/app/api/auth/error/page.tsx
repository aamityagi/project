// src/app/api/auth/error/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-[70%] max-w-2xl bg-white shadow-2xl rounded-lg p-10 text-center">
        {/* Error Image */}
        <div className="mb-6">
          <Image
            src="/error-image.png" // replace with your image path
            alt="Auth Error"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong.
        </h1>

        {/* Paragraph */}
        <p className="text-gray-600 mb-8">
          We couldn’t process your authentication. Please try again or return to the home page.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
          >
            Go to Login
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
          >
            Go to Marketing
          </button>
        </div>
      </div>
    </div>
  );
}
