export interface Product {
    id: string;
    brand: string;
    name: string;
    image: string;
    images: string[];
    price: number;
    originalPrice: number;
    discount: number;
    rating?: number;
    reviewCount?: number;
    colors: Color[];
    sizes: Size[];
    isNew?: boolean;
    isBestSeller?: boolean;
    stockLeft?: number;
    clubPrice?: number;
    earnCash?: number;
}

export interface Color {
    name: string;
    code: string;
    image?: string;
}

export interface Size {
    label: string;
    available: boolean;
    productId?: string;
}

export interface FilterOption {
    id: string;
    label: string;
    count: number;
    selected?: boolean;
}

export interface FilterCategory {
    id: string;
    title: string;
    type: 'checkbox' | 'radio' | 'color' | 'price' | 'search';
    options: FilterOption[];
    searchable?: boolean;
    expanded?: boolean;
}

export interface SortOption {
    value: string;
    label: string;
}