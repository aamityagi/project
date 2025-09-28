"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageSlider from "../../components/ImageSlider";
import Image from "next/image";
import { Button } from "@/app/(protected)/components/ui/button";
import { Input } from "@/app/(protected)/components/ui/input";
export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // Image Slider Json
  const sliderImages = [
    "/assets/login-banner/launch.jpg",
    "/assets/login-banner/automat.jpg",
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const res = await fetch(`/api/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, confirmPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      setMessage("✅ Password reset successfully. Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-200 text-gray-800">
      {/* Left side slider (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 h-screen">
        <ImageSlider images={sliderImages} interval={3000} />
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 h-screen flex justify-center items-center bg-gray-200 p-6 overflow-y-auto">
        <div className="w-full relative max-w-md bg-white p-8 shadow-lg space-y-6">
          <div className="flex justify-center">
            <Image
              width={40}
              height={40}
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10"
            />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p>Enter your Registred Email Id.</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow-md w-full max-w-md space-y-4"
          >
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>

            <Input
              type="password"
              placeholder="New Password"
              className="w-full border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-full border p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 hover:bg-blue-700 cursor-pointer"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
