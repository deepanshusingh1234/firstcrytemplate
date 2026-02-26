import { Product } from '../../types/boutiques';

export const getBoutiqueProducts = async (slug: string): Promise<Product[]> => {
    try {
        const data = await import(`../../data/boutiques/${slug}.json`);
        return data.products || [];
    } catch (error) {
        console.error(`Error loading products for ${slug}:`, error);
        return [];
    }
};

export const filterProducts = (
    products: Product[],
    filters: { type: string; value: string }[]
): Product[] => {
    // Implement filtering logic here
    return products;
};

export const sortProducts = (
    products: Product[],
    sortBy: string
): Product[] => {
    switch (sortBy) {
        case 'NewArrivals':
            return [...products]; // Add sorting logic
        case 'Price':
            return [...products].sort((a, b) => a.defaultPrice - b.defaultPrice);
        case 'Name':
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        default:
            return products;
    }
};