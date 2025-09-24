"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../(protected)/components/ui/button";
import SocialAuth from "../components/SocialAuth"; // icon-only social buttons
import Image from "next/image";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";

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
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side slider */}
      <ImageSlider />

      {/* Right side form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white shadow-lg">
        {/* Logo */}
        <div className="mb-6">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        </div>

        {/* Social login buttons */}
        <div className="mb-4 w-full max-w-md">
          <SocialAuth />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 w-full max-w-md mb-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">Continue with Email</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Signup form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md"
        >
          <div>
            <input
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("phone", { required: "Phone is required" })}
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("extraInfo")}
              placeholder="Extra Info (Optional)"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Profession Dropdown */}
          <div>
            <label className="block mb-1">Profession</label>
            <select
              {...register("profession", {
                required: "Please select your profession",
              })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Profession</option>
              <option value="business">Business</option>
              <option value="social">Social</option>
              <option value="student">Student</option>
              <option value="company">Company</option>
              <option value="self">Self</option>
            </select>
            {errors.profession && (
              <p className="text-red-500">{errors.profession.message}</p>
            )}
          </div>

          {/* Conditional input based on profession */}
          {(profession === "business" ||
            profession === "social" ||
            profession === "company") && (
            <div>
              <input
                {...register("professionLink", {
                  required: "Link is required",
                })}
                placeholder={
                  profession === "business"
                    ? "Enter your website link"
                    : profession === "social"
                    ? "Enter your social media link"
                    : profession === "company"
                    ? "Enter your company website link"
                    : ""
                }
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          <div className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("terms", { required: "You must accept terms" })}
            />
            <label>I accept the terms and conditions</label>
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
  );
}
