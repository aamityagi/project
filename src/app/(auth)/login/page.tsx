"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Button } from "../../(protected)/components/ui/button";
import { Input } from "../../(protected)/components/ui/input";
import { Checkbox } from "../../(protected)/components/ui/checkbox";
import Link from "next/link";
import ImageSlider from "../components/ImageSlider";
import SocialAuth from "../components/SocialAuth";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  // Image Slider Json
  const sliderImages = [
    "/assets/login-banner/launch.jpg",
    "/assets/login-banner/automat.jpg",
  ];
  // Load remembered credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.replace("/dashboard");
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (remember) {
      localStorage.setItem("rememberEmail", email);
      localStorage.setItem("rememberPassword", password);
    } else {
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-200 text-gray-800">
      {/* Left side slider (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 h-screen">
        <ImageSlider images={sliderImages} interval={3000} />
      </div>

      {/* Right side form */}
      <div
        className="
          w-full lg:w-1/2 h-screen overflow-y-auto 
          flex flex-col lg:justify-center items-center p-6 bg-gray-200
        "
      >
        <div className="w-full relative max-w-md bg-white p-8 shadow-lg space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              width={40}
              height={40}
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10"
            />
          </div>

          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 px-2 py-1"
            />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 px-2 py-1"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full text-white">
              Login
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mt-2 gap-3 sm:gap-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={remember}
                  onCheckedChange={(val) => setRemember(!!val)}
                />
                <span>Remember me</span>
              </label>

              <div className="flex justify-between sm:justify-end w-full sm:w-auto">
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Get Started
                </Link>
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:underline ml-4"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>

          <SocialAuth />
        </div>
      </div>

    </div>
  );
}
