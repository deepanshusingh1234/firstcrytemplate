export * from './categories';
export * from './products';

import { BoutiquePageData, BoutiqueCategory } from '../../types/boutiques';
import { getBoutiqueCategoryBySlug } from './categories';





export const getBoutiquePageData = async (slug: string): Promise<BoutiquePageData | null> => {
    try {
        // Dynamic import of the category data
        const data = await import(`@/data/boutiques/${slug}.json`);

        // Get category info from categories list
        const category = getBoutiqueCategoryBySlug(slug);

        if (!category) return null;

        return {
            category: {
                ...category,
                ...data.category // Override with any category data from the file
            },
            filters: data.filters || [],
            products: data.products || [],
            sortOptions: data.sortOptions || []
        };
    } catch (error) {
        console.error(`Error loading boutique data for ${slug}:`, error);
        return null;
    }
};