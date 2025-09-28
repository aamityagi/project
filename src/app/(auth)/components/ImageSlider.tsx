"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

export default function ImageSlider({
  images,
  interval = 3000,
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  const singleImage = images.length <= 1;

  useEffect(() => {
    if (singleImage) return;

    const slider = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(slider);
  }, [images, interval, singleImage]);

  if (!images || images.length === 0) return null;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-screen hidden md:block overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}

      {!singleImage && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
