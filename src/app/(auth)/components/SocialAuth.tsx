"use client";

import { signIn } from "next-auth/react";
import { Github, Facebook, Chrome } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../(protected)/components/ui/tooltip";
import { Button } from "@/app/(protected)/components/ui/button";

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
              <Button
                onClick={() => signIn("google")}
                className="w-10 h-10 px-1 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition"
              >
                <Chrome className="w-5 h-5 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Continue with Google</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => signIn("github")}
                className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center hover:bg-gray-600 transition"
              >
                <Github className="w-5 h-5 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Continue with GitHub</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => signIn("facebook")}
                className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Facebook className="w-5 h-5 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Continue with Facebook</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

    </>
  );
}
