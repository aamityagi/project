interface Metric {
  title: string;
  description: string;
}

interface MetricsSectionProps {
  heading: string;
  paragraph: string;
  items: Metric[];
}

export default function MetricsSection({ heading, paragraph, items }: MetricsSectionProps) {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-2">{heading}</h2>
      <p className="text-gray-700 mb-4">{paragraph}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((metric, i) => (
          <div key={i} className="p-4 border rounded-md hover:shadow-md transition">
            <h3 className="font-semibold mb-1">{metric.title}</h3>
            <p className="text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
