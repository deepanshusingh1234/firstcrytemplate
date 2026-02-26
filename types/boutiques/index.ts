export interface FilterOption {
    id: string;
    name: string;
    count: number;
    value: string;
    colorCode?: string;
}

export interface FilterCategory {
    id: string;
    name: string;
    type: string;
    options: FilterOption[];
}

export interface SortOption {
    id: string;
    name: string;
    value: string;
}

export interface BoutiqueCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    itemCount: number;
    bannerImage: string;
    tileImage: string;
    endDate: string;
    endDateText: string;
}

export interface ProductVariant {
    id: string;
    size: string;
    price: number;
    available: boolean;
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
    defaultImage: string;
    images: { url: string }[];
    defaultPrice: number;
    defaultMrp: number;
    defaultClubPrice: number;
    ageGroup: string;
    colors: ProductColor[];
    url: string;
}

export interface BoutiqueData {
    category: BoutiqueCategory;
    filters: FilterCategory[];
    sortOptions: SortOption[];
    products: Product[];
}

export interface HomeBoutique {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    endDate: string;
    endDateText: string;
    isNew: boolean;
}

export interface HomeBoutiquesData {
    sectionTitle: string;
    viewAllLink: string;
    boutiques: HomeBoutique[];
}