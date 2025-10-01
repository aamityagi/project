"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../../../../../../lib/utils"; // optional

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = AccordionPrimitive.Trigger;
const AccordionContent = AccordionPrimitive.Content;

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

export default function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <Accordion type="single" collapsible className="w-full border rounded-md">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="border-b last:border-b-0"
          >
            <AccordionTrigger
              className={cn(
                "flex justify-between items-center py-3 px-4 cursor-pointer font-medium",
                "hover:bg-gray-50 transition-colors rounded-md"
              )}
            >
              {item.q}
              <span className="ml-2">+</span>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "px-4 pb-3 text-gray-700 overflow-hidden",
                "data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up"
              )}
            >
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
