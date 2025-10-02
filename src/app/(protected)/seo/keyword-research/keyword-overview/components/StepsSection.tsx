interface StepsSectionProps {
  heading: string;
  paragraph: string;
  items: string[];
}

export default function StepsSection({ heading, paragraph, items }: StepsSectionProps) {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-2">{heading}</h2>
      <p className="text-gray-700 mb-4">{paragraph}</p>
      <div className="flex flex-col md:flex-row gap-4">
        {items.map((step, i) => (
          <div key={i} className="flex-1 p-4 border rounded-md text-center">
            <h3 className="font-bold mb-2">{i + 1}</h3>
            <p className="text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
