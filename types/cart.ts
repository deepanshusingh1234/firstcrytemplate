export interface CartItem {
    productId: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    mrp: number;
    clubPrice: number;
    quantity: number;
    size?: string;
    color?: string;
    colorCode?: string;
    fabric?: string;
    ageGroup?: string;
    inStock: boolean;
    maxQuantity: number;
    minQuantity: number;
    selectedColor?: {
        name: string;
        code: string;
        imageUrl: string;
    };
}

export interface CartSummary {
    subtotal: number;
    discount: number;
    clubSavings: number;
    shippingCharges: number;
    total: number;
    itemCount: number;
}

export interface CartState {
    items: CartItem[];
    summary: CartSummary;
    isOpen: boolean;
}