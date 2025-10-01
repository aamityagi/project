"use client";

import React from "react";

export const MetricSection = ({ title, left, right, footer }: { title: string; left: string[]; right: string[]; footer: string }) => (
  <section className="w-full max-w-6xl mx-auto py-12 px-4">
    <h2 className="text-center text-2xl font-bold mb-8">{title}</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <ul className="bg-white shadow-md rounded-2xl p-6 space-y-3 h-full">
        {left.map((item, i) => <li key={i}>✅ {item}</li>)}
      </ul>
      <ul className="bg-white shadow-md rounded-2xl p-6 space-y-3 h-full">
        {right.map((item, i) => <li key={i}>✅ {item}</li>)}
      </ul>
    </div>
    <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto">{footer}</p>
  </section>
);
