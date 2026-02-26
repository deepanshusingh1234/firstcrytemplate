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
    type: 'subcategory' | 'brand' | 'discount' | 'price' | 'age' | 'gender' | 'color' | 'material';
    options: FilterOption[];
}