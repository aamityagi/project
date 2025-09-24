"use client";

import { Button } from "../../(protected)/components/ui/button";
import { signIn } from "next-auth/react";
import { Github, Facebook, Chrome } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../(protected)/components/ui/tooltip";

export default function SocialAuth() {
  return (
    <>
      {/* Divider */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm text-gray-400">Continue With </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

     {/* Social login icons with tooltips */}
      <TooltipProvider>
        <div className="flex justify-center gap-4 mb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => signIn("google")}
                className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition"
              >
                <Chrome className="w-5 h-5 text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Continue with Google</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => signIn("github")}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-900 transition"
              >
                <Github className="w-5 h-5 text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Continue with GitHub</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => signIn("facebook")}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition"
              >
                <Facebook className="w-5 h-5 text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Continue with Facebook</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

    </>
  );
}
