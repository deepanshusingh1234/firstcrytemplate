import categoriesData from '../../data/boutiques/index.json';
import { BoutiqueCategory, BoutiqueCategoryList } from '../../types/boutiques';

export const getBoutiqueCategories = (): BoutiqueCategory[] => {
    return (categoriesData as BoutiqueCategoryList).categories;
};

export const getBoutiqueCategoryBySlug = (slug: string): BoutiqueCategory | undefined => {
    return getBoutiqueCategories().find(cat => cat.slug === slug);
};

export const getBoutiqueCategoryById = (id: string): BoutiqueCategory | undefined => {
    return getBoutiqueCategories().find(cat => cat.id === id);
};