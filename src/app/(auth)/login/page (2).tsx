"use client";

import { useState } from "react";
import { Button } from "../../(protected)/components/ui/button";
import { Input } from "../../(protected)/components/ui/input";
import { Checkbox } from "../../(protected)/components/ui/checkbox";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ your working login logic here
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image Slider */}
      {/* <ImageSlider /> */}

      {/* Right Side Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/logo.svg" alt="Logo" className="h-12" />
          </div>

          {/* Welcome Content */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Welcome to AppName</h1>
            <p className="text-gray-500 text-sm">Your tagline goes here</p>
          </div>

          {/* Form */}
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

            {/* Remember Me + Links */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="remember" />
                <span>Remember me</span>
              </label>

              <div className="flex gap-4 text-sm">
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Get Started
                </Link>
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Auth (inline for now) */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <img src="/icons/google.svg" className="h-5 w-5" alt="Google" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <img src="/icons/github.svg" className="h-5 w-5" alt="GitHub" />
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <img src="/icons/facebook.svg" className="h-5 w-5" alt="Facebook" />
              Continue with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
