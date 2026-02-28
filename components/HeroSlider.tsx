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

    // Responsive heights
    const getSliderHeight = () => {
        if (typeof window === 'undefined') return '550px';
        if (window.innerWidth < 640) return '250px';      // mobile
        if (window.innerWidth < 768) return '300px';      // sm
        if (window.innerWidth < 1024) return '400px';     // md
        if (window.innerWidth < 1280) return '500px';     // lg
        return '550px';                                    // xl
    };

    const [sliderHeight, setSliderHeight] = useState('550px');

    useEffect(() => {
        const handleResize = () => {
            setSliderHeight(getSliderHeight());
        };

        handleResize(); // Set initial height
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive arrow sizes
    const getArrowSize = () => {
        if (typeof window === 'undefined') return 28;
        if (window.innerWidth < 640) return 16;
        if (window.innerWidth < 768) return 18;
        if (window.innerWidth < 1024) return 20;
        return 28;
    };

    const [arrowSize, setArrowSize] = useState(28);

    useEffect(() => {
        const handleResize = () => {
            setArrowSize(getArrowSize());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive dot sizes
    const getDotSize = () => {
        if (typeof window === 'undefined') return { active: 'w-8', inactive: 'w-3', height: 'h-3' };
        if (window.innerWidth < 640) {
            return { active: 'w-6', inactive: 'w-2', height: 'h-2' };
        }
        if (window.innerWidth < 768) {
            return { active: 'w-7', inactive: 'w-2.5', height: 'h-2.5' };
        }
        return { active: 'w-8', inactive: 'w-3', height: 'h-3' };
    };

    const [dotSizes, setDotSizes] = useState({ active: 'w-8', inactive: 'w-3', height: 'h-3' });

    useEffect(() => {
        const handleResize = () => {
            setDotSizes(getDotSize());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="full-width-slider mb-0 relative w-full overflow-hidden"
            style={{
                backgroundImage: `url(${sideBackgroundUrl})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto'
            }}
        >
            <div
                className="slider-container relative w-full mx-auto"
                style={{ height: sliderHeight }}
                ref={sliderRef}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Slides Container - Centered with responsive spacing */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Left Space - Hidden on mobile, visible on larger screens */}
                    <div className="hidden md:block md:w-[10%] lg:w-[12%] xl:w-[15%] h-full" />

                    {/* Central Image Container - Full width on mobile, reduced on larger screens */}
                    <div className="w-full md:w-[80%] lg:w-[76%] xl:w-[70%] max-w-[1366px] h-full relative overflow-hidden">
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
                                        className="w-full h-full object-cover object-center"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Right Space - Hidden on mobile, visible on larger screens */}
                    <div className="hidden md:block md:w-[10%] lg:w-[12%] xl:w-[15%] h-full" />
                </div>

                {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
                {totalSlides > 1 && (
                    <>
                        {/* Left Arrow - Visible on tablet and above */}
                        <button
                            onClick={prevSlide}
                            className="hidden md:flex absolute left-[5%] md:left-[5%] lg:left-[6%] xl:left-[7.5%] top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full items-center justify-center text-white transition-all duration-300"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={arrowSize} />
                        </button>

                        {/* Right Arrow - Visible on tablet and above */}
                        <button
                            onClick={nextSlide}
                            className="hidden md:flex absolute right-[5%] md:right-[5%] lg:right-[6%] xl:right-[7.5%] top-1/2 transform -translate-y-1/2 translate-x-1/2 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full items-center justify-center text-white transition-all duration-300"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={arrowSize} />
                        </button>
                    </>
                )}

                {/* Mobile Touch Navigation Areas - Only visible on mobile */}
                {totalSlides > 1 && (
                    <div className="md:hidden absolute inset-0 z-15 flex">
                        <div
                            className="w-1/2 h-full"
                            onClick={prevSlide}
                            aria-label="Previous slide"
                        />
                        <div
                            className="w-1/2 h-full"
                            onClick={nextSlide}
                            aria-label="Next slide"
                        />
                    </div>
                )}

                {/* Slide Indicators/Dots - Responsive positioning and sizing */}
                {totalSlides > 1 && (
                    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2 md:space-x-2.5 lg:space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`${dotSizes.height} rounded-full transition-all duration-300 ${index === currentSlide
                                    ? `bg-white ${dotSizes.active}`
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75 ' + dotSizes.inactive
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