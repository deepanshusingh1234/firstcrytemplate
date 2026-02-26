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

export interface BoutiqueCategoryList {
    categories: BoutiqueCategory[];
}