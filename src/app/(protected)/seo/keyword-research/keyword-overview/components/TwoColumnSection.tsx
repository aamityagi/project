interface TwoColumnProps {
  left: { heading: string; paragraphs: string[] };
  right: { heading: string; paragraphs: string[] };
}

export default function TwoColumnSection({ left, right }: TwoColumnProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 my-8">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">{left.heading}</h2>
        {left.paragraphs.map((p, i) => <p key={i} className="text-gray-700 mb-2">{p}</p>)}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">{right.heading}</h2>
        {right.paragraphs.map((p, i) => <p key={i} className="text-gray-700 mb-2">{p}</p>)}
      </div>
    </div>
  );
}
