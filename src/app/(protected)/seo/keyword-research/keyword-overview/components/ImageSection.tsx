interface ImageSectionProps {
  url: string;
  alt?: string;
}

export default function ImageSection({ url, alt }: ImageSectionProps) {
  return (
    <div className="my-8 text-center">
      <img src={url} alt={alt || "Keyword Overview"} className="w-full max-w-4xl mx-auto rounded-lg shadow-md" />
    </div>
  );
}
