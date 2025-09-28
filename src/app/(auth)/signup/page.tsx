"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../(protected)/components/ui/button";
import SocialAuth from "../components/SocialAuth"; // icon-only social buttons
import Image from "next/image";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";
import { Input } from "../../(protected)/components/ui/input";
import { Checkbox } from "@/app/(protected)/components/ui/checkbox";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  extraInfo?: string;
  terms: boolean;
  profession: string;
  professionLink?: string;
}

// Image Slider Json
const sliderImages = [
  "/assets/login-banner/launch.jpg",
  "/assets/login-banner/automat.jpg",
];

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);
  const profession = watch("profession");

  const onSubmit = async (data: FormData) => {
    setMessage(null);
    if (
      (data.profession === "business" ||
        data.profession === "social" ||
        data.profession === "company") &&
      !data.professionLink
    ) {
      setMessage("Please enter the required link for your profession");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();

      if (res.ok) {
        alert(
          `Thank you for signing up!\n\nVerification link sent to your registered email: ${data.email}.`
        );
        setMessage("Signup successful! Verification email sent.");
      } else {
        setMessage(result.error);
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-200 text-gray-800">
      {/* Left side slider (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 h-screen">
        <ImageSlider images={sliderImages} interval={3000} />
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center p-6 bg-gray-200">
        <div className="w-full h-full lg:h-auto max-w-md bg-white shadow-lg p-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              width={40}
              height={40}
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10"
            />
          </div>

          {/* Social login buttons */}
          <div className="w-full mb-4">
            <SocialAuth />
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div>
              <Input
                {...register("fullName", { required: "Full name is required" })}
                placeholder="Full Name"
                className="w-full p-2"
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="w-full p-2 "
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("phone", { required: "Phone is required" })}
                placeholder="Phone"
                className="w-full p-2 "
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="w-full p-2 "
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 "
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Conditional Input based on profession */}
            {(profession === "business" ||
              profession === "social" ||
              profession === "company") && (
              <div>
                <Input
                  {...register("professionLink", {
                    required: "Link is required",
                  })}
                  placeholder={
                    profession === "business"
                      ? "Enter your website link"
                      : profession === "social"
                      ? "Enter your social media link"
                      : "Enter your company website link"
                  }
                  className="w-full p-2 "
                />
              </div>
            )}

            <div className="flex items-center space-x-2 cursor-pointer">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  {...register("terms", { required: "You must accept terms" })}
                />
                <span>I accept the terms and conditions</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500">{errors.terms.message}</p>
            )}

            <Button type="submit" className="w-full mt-2 cursor-pointer">
              Sign Up
            </Button>

            {message && (
              <p className="mt-2 text-center text-red-500">{message}</p>
            )}

            <div className="flex justify-between w-full">
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
