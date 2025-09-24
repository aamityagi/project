"use client";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../(protected)/components/ui/button";

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
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);

  const profession = watch("profession");

  const onSubmit = async (data: FormData) => {
        setMessage(null);

        // Validate profession link if required
        if ((data.profession === "business" || data.profession === "social" || data.profession === "company") && !data.professionLink) {
            setMessage("Please enter the required link for your profession");
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
            });

            const result = await res.json();

            if (res.ok) {
            // Show popup alert
            alert(
                `Thank you for signing up!\n\nVerification link sent to your registered email: ${data.email}.\nPlease verify your email and login.`
            );

            // Optionally, you can still set message below the form if you want
            setMessage("Signup successful! Verification email sent.");

            // Reset form or redirect if needed
            } else {
            setMessage(result.error);
            }
        } catch (err) {
            setMessage("Server error");
        }
};


  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <input {...register("fullName", { required: "Full name is required" })}
            placeholder="Full Name" className="w-full p-2 border rounded" />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
        </div>

        <div>
          <input {...register("email", { required: "Email is required" })}
            type="email" placeholder="Email" className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register("phone", { required: "Phone is required" })}
            placeholder="Phone" className="w-full p-2 border rounded" />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <input {...register("password", { required: "Password is required" })}
            type="password" placeholder="Password" className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <input {...register("confirmPassword", { required: "Confirm password is required" })}
            type="password" placeholder="Confirm Password" className="w-full p-2 border rounded" />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <textarea {...register("extraInfo")} placeholder="Extra Info (Optional)"
            className="w-full p-2 border rounded" />
        </div>

        {/* Profession Dropdown */}
        <div>
          <label className="block mb-1">Profession</label>
          <select {...register("profession", { required: "Please select your profession" })}
            className="w-full p-2 border rounded">
            <option value="">Select Profession</option>
            <option value="business">Business</option>
            <option value="social">Social</option>
            <option value="student">Student</option>
            <option value="company">Company</option>
            <option value="self">Self</option>
          </select>
          {errors.profession && <p className="text-red-500">{errors.profession.message}</p>}
        </div>

        {/* Conditional input based on profession */}
        {(profession === "business" || profession === "social" || profession === "company") && (
          <div>
            <input {...register("professionLink", { required: "Link is required" })}
              placeholder={
                profession === "business" ? "Enter your website link" :
                profession === "social" ? "Enter your social media link" :
                profession === "company" ? "Enter your company website link" : ""
              }
              className="w-full p-2 border rounded" />
          </div>
        )}

        <div className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" {...register("terms", { required: "You must accept terms" })} />
          <label>I accept the terms and conditions</label>
        </div>
        {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}

        <Button type="submit" className="w-full mt-2 cursor-pointer">Sign Up</Button>
        {message && <p className="mt-2 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
