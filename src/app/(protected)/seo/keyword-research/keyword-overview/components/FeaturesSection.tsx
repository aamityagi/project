interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  heading: string;
  paragraph: string;
  items: FeatureItem[];
}

export default function FeaturesSection({ heading, paragraph, items }: FeaturesSectionProps) {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-2">{heading}</h2>
      <p className="text-gray-700 mb-4">{paragraph}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 border rounded-md hover:shadow-lg transition">
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
