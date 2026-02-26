import boutiquesData from '../data/boutiques.json';
import { BoutiquesData, Boutique } from '../types/boutique';

export const getBoutiquesData = (): BoutiquesData => {
    return boutiquesData as BoutiquesData;
};

export const getBoutiques = (): Boutique[] => {
    return getBoutiquesData().boutiques;
};

export const getSectionTitle = (): string => {
    return getBoutiquesData().sectionTitle;
};

export const getViewAllLink = (): string => {
    return getBoutiquesData().viewAllLink;
};