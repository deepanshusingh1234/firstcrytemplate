import heroSliderData from '../data/heroSlider.json';
import { HeroSliderData, Slide } from '../types/heroSlider';

export const getHeroSlides = (): Slide[] => {
    return (heroSliderData as HeroSliderData).slides;
};

export const getSlideById = (id: string): Slide | undefined => {
    return getHeroSlides().find(slide => slide.id === id);
};

export const getTotalSlides = (): number => {
    return getHeroSlides().length;
};