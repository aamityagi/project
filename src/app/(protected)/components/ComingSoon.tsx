import Image from "next/image";
import ComingSoonDataJson from "../seo/data/ComingSoon.json";

interface Section {
  heading: string;
  description: string;
  imageUrl: string;
}

interface ComingSoonItem {
  page: string;
  mainHeading: string;
  paragraph: string;
  imageUrl: string;
  sections: Section[];
}

// Type the JSON
const ComingSoonData: ComingSoonItem[] = ComingSoonDataJson as ComingSoonItem[];

interface ComingSoonPageProps {
  page: string;
}

export default function ComingSoonPage({ page }: ComingSoonPageProps) {
  const pageData = ComingSoonData.find((item) => item.page === page);

  if (!pageData) {
    return <p className="text-red-500 text-center">Page data not found!</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Main heading and paragraph */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
          {pageData.mainHeading}
        </h1>
        <p className="text-gray-700 text-lg">{pageData.paragraph}</p>
      </div>

      {/* Main image */}
      {pageData.imageUrl && (
        <div className="relative w-full md:w-2/3 h-64 mx-auto">
          <Image
            src={pageData.imageUrl}
            alt={pageData.mainHeading}
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Alternating sections */}
      {pageData.sections.map((section, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row items-center gap-6 ${
            idx % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={section.imageUrl}
              alt={section.heading}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-3">{section.heading}</h2>
            <p className="text-gray-700">{section.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
