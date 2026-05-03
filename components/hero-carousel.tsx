"use client";

import { useEffect, useState } from "react";

const slides = [
  "/assets/store-reception.png",
  "/assets/store-bath-spa.png",
  "/assets/store-grooming-suite.png",
];

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-carousel" aria-hidden="true">
      {slides.map((slide, index) => (
        <span
          className={`hero-slide${index === activeSlide ? " is-active" : ""}`}
          key={slide}
          style={{ backgroundImage: `url('${slide}')` }}
        />
      ))}
    </div>
  );
}
