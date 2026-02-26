export interface ProductImage {
    url: string;
    color?: string;
    colorCode?: string;
}

export interface ProductVariant {
    id: string;
    size: string;
    price: number;
    mrp: number;
    clubPrice: number;
    inStock: boolean;
}

export interface ProductColor {
    name: string;
    code: string;
    imageUrl: string;
    variants: ProductVariant[];
}

export interface Product {
    id: string;
    brand: string;
    name: string;
    shortDescription: string;
    description: string;
    images: ProductImage[];
    colors: ProductColor[];
    defaultImage: string;
    defaultPrice: number;
    defaultMrp: number;
    defaultClubPrice: number;
    availableSizes: string[];
    ageGroup: string;
    inStock: boolean;
    url: string;
}