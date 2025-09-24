"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/images/slide1.jpg", "/images/slide2.jpg", "/images/slide3.jpg"];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-1/2 h-screen hidden md:block">
      <img
        src={images[current]}
        alt="Slide"
        className="w-full h-full object-cover transition-all duration-500"
      />
      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
