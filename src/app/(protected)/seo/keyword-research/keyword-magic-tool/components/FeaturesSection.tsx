"use client";

import React from "react";

export const FeaturesSection = ({ title, items }: { title: string; items: { title: string; desc: string }[] }) => (
  <section className="w-full max-w-6xl mx-auto py-12 px-4">
    <h2 className="text-center text-2xl font-bold mb-8">{title}</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {items.map((f, i) => (
        <div key={i} className="bg-white shadow rounded-xl p-6 space-y-2">
          <h3 className="font-semibold">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
