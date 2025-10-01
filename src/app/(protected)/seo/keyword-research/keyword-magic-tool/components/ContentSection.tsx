"use client";

import React from "react";

export const ContentSection = ({ left, right }: { left: any; right: any }) => (
  <section className="w-full max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8 items-start">
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{left.title}</h2>
      {left.paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
    </div>
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{right.title}</h2>
      {right.paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
    </div>
  </section>
);
