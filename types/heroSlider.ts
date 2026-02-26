export interface Slide {
    id: string;
    imageUrl: string;
    linkUrl: string;
    altText: string;
    title: string;
    bgImage?: string;
}

export interface HeroSliderData {
    slides: Slide[];
}