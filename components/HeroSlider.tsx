"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroSlides, getTotalSlides } from "../utils/heroSlider";
import { Slide } from "../types/heroSlider";

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout>();

    const slides: Slide[] = getHeroSlides();
    const totalSlides = getTotalSlides();

    // Background image for the side spaces
    const sideBackgroundUrl = "https://cdn.fcglcdn.com/brainbees/banners/hp_def_new_season_new_styles_side1770992332620.jpg";

    useEffect(() => {
        if (isAutoPlaying && totalSlides > 0) {
            autoPlayRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 5000);
        }
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, totalSlides]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
    };

    const handleDotClick = (index: number) => {
        goToSlide(index);
    };

    if (totalSlides === 0) {
        return null;
    }

    return (
        <div
            className="full-width-slider mb-0 relative w-full"
            style={{
                backgroundImage: `url(${sideBackgroundUrl})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto'
            }}
        >
            <div
                className="slider-container relative w-full mx-auto"
                style={{ height: '550px' }}
                ref={sliderRef}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Slides Container - Centered with 15% spacing */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Left Space (15%) - Transparent, shows background */}
                    <div className="w-[15%] h-full" />

                    {/* Central Image Container (70%) */}
                    <div className="w-[70%] max-w-[1366px] h-full relative overflow-hidden rounded-lg">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${index === currentSlide
                                        ? 'opacity-100 z-10'
                                        : 'opacity-0 z-0 pointer-events-none'
                                    }`}
                            >
                                <a
                                    href={slide.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full"
                                    title={slide.title}
                                >
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.altText}
                                        title={slide.title}
                                        className="w-full h-full object-cover"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Right Space (15%) - Transparent, shows background */}
                    <div className="w-[15%] h-full" />
                </div>

                {/* Navigation Arrows - Positioned OUTSIDE the central image, on the side spaces */}
                {totalSlides > 1 && (
                    <>
                        {/* Left Arrow - Positioned in the left 15% space */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-[7.5%] top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all duration-300"
                            style={{ left: '7.5%' }}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        {/* Right Arrow - Positioned in the right 15% space */}
                        <button
                            onClick={nextSlide}
                            className="absolute right-[7.5%] top-1/2 transform -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center text-white transition-all duration-300"
                            style={{ right: '7.5%' }}
                            aria-label="Next slide"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </>
                )}

                {/* Slide Indicators/Dots - Centered below the central image */}
                {totalSlides > 1 && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? 'bg-white w-8'
                                        : 'bg-white bg-opacity-50 hover:bg-opacity-75 w-3'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSlider;