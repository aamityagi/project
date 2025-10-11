"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../../../../lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTriggerPrimitive = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-md animate-in fade-in-80",
        "max-w-xs sm:max-w-sm pointer-events-auto select-text",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

/**
 * Safe wrapper for TooltipTrigger to allow label or children
 * without breaking other pages
 */
interface TooltipTriggerWrapperProps {
  label?: string;
  tooltipText: string;
  small?: boolean;
  children?: React.ReactNode;
}

const TooltipTriggerWrapper: React.FC<TooltipTriggerWrapperProps> = ({
  label,
  tooltipText,
  small,
  children,
}) => {
  return (
    <Tooltip>
      <TooltipTriggerPrimitive asChild>
        {children ? (
          <>{children}</>
        ) : (
          <span
            className={cn(
              "cursor-pointer rounded bg-gray-100 select-text",
              small ? "text-xs px-1 py-0.5" : "px-2 py-0.5 text-sm"
            )}
          >
            {label}
          </span>
        )}
      </TooltipTriggerPrimitive>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export { Tooltip, TooltipTriggerPrimitive as TooltipTrigger, TooltipContent, TooltipProvider, TooltipTriggerWrapper };
