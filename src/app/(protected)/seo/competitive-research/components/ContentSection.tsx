"use client";

import Image from "next/image";

interface ContentItem {
  title: string;
  image: string;
  points: string[];
}

interface ContentSectionProps {
  data: ContentItem[];
}

export default function ContentSection({ data }: ContentSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-16">
      {data.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Image */}
            <div className="md:w-1/2 relative group">
              <div className="overflow-hidden rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold">{item.title}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      {/* CTA Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Get 7-day unlimited access to all tools and reports
        </h2>
        <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
          Get Free Trial
        </button>
      </div>
    </section>
  );
}
