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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    <div className="flex min-h-screen">
      {/* Left side */}
      <ImageSlider />

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 shadow-lg space-y-6">
          <div className="flex justify-center">
            <img src="/logo.svg" alt="Logo" className="h-12" />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={remember}
                  onCheckedChange={(val) => setRemember(!!val)}
                />
                <span>Remember me</span>
              </label>

              <div className="flex gap-4">
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Get Started
                </Link>
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:underline"
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
