"use client";

import React from "react";

export const StepsSection = ({ title, items }: { title: string; items: string[] }) => (
  <section className="w-full max-w-4xl mx-auto py-12 px-4 text-center">
    <h2 className="text-2xl font-bold mb-8">{title}</h2>
    <ol className="space-y-6 text-left">
      {items.map((step, i) => (
        <li key={i} className="bg-gray-50 shadow rounded-xl p-4">
          <span className="font-bold mr-2">{i + 1}.</span> {step}
        </li>
      ))}
    </ol>
  </section>
);
