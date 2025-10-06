"use client";
import { useState } from "react";
import ImageSlider from "../components/ImageSlider";
import Image from "next/image";
import { Button } from "@/app/(protected)/components/ui/button";
import { Input } from "@/app/(protected)/components/ui/input";
import logo from "../../../../public/logo.png"
export default function ForgotPasswordPage() {
  const logoAlt = "Namakwala"
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // Image Slider Json
  const sliderImages = [
    "/assets/login-banner/launch.jpg",
    "/assets/login-banner/automat.jpg",
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      setMessage("✅ Reset link sent to your email");
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
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={logo}
              alt={logoAlt}
              width={180}
              height={180}
              sizes="90px"
              quality={90}
              priority
              className="h-20 w-20 object-cover"
            />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p>Enter your Registred Email Id.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md space-y-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <Button
              type="submit"
              className="w-full text-white bg-green-900 hover:bg-green-700"
            >
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
