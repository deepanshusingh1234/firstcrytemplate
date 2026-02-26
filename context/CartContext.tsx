'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartState, CartSummary } from '@/types/cart';

interface CartContextType {
    cart: CartState;
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string, size?: string, color?: string) => void;
    updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
    clearCart: () => void;
    cartCount: number;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateSummary = (items: CartItem[]): CartSummary => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = items.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
    const discount = originalTotal - subtotal;
    const clubSavings = items.reduce((sum, item) => sum + ((item.mrp - item.clubPrice) * item.quantity), 0);

    // Free shipping over ₹499
    const shippingCharges = subtotal >= 499 ? 0 : 49;

    const total = subtotal + shippingCharges;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return {
        subtotal,
        discount,
        clubSavings,
        shippingCharges,
        total,
        itemCount
    };
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartState>({
        items: [],
        summary: {
            subtotal: 0,
            discount: 0,
            clubSavings: 0,
            shippingCharges: 0,
            total: 0,
            itemCount: 0
        },
        isOpen: false
    });

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prevCart => {
            // Create a unique key based on productId, size, and color
            const itemKey = `${item.productId}-${item.size || ''}-${item.color || ''}`;

            const existingItemIndex = prevCart.items.findIndex(i =>
                `${i.productId}-${i.size || ''}-${i.color || ''}` === itemKey
            );

            let newItems;
            if (existingItemIndex >= 0) {
                newItems = [...prevCart.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: Math.min(
                        newItems[existingItemIndex].quantity + item.quantity,
                        newItems[existingItemIndex].maxQuantity
                    )
                };
            } else {
                newItems = [...prevCart.items, item];
            }

            const newSummary = calculateSummary(newItems);

            return {
                ...prevCart,
                items: newItems,
                summary: newSummary,
                isOpen: true // Open cart when item is added
            };
        });

        // Auto-hide cart after 3 seconds
        setTimeout(() => {
            setCart(prev => ({ ...prev, isOpen: false }));
        }, 3000);
    };

    const removeFromCart = (productId: string, size?: string, color?: string) => {
        setCart(prevCart => {
            const itemKey = `${productId}-${size || ''}-${color || ''}`;
            const newItems = prevCart.items.filter(i =>
                `${i.productId}-${i.size || ''}-${i.color || ''}` !== itemKey
            );
            const newSummary = calculateSummary(newItems);

            return {
                ...prevCart,
                items: newItems,
                summary: newSummary
            };
        });
    };

    const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
        setCart(prevCart => {
            const itemKey = `${productId}-${size || ''}-${color || ''}`;
            const newItems = prevCart.items.map(item => {
                if (`${item.productId}-${item.size || ''}-${item.color || ''}` === itemKey) {
                    const newQty = Math.min(Math.max(quantity, item.minQuantity), item.maxQuantity);
                    return { ...item, quantity: newQty };
                }
                return item;
            });
            const newSummary = calculateSummary(newItems);

            return {
                ...prevCart,
                items: newItems,
                summary: newSummary
            };
        });
    };

    const clearCart = () => {
        setCart({
            items: [],
            summary: {
                subtotal: 0,
                discount: 0,
                clubSavings: 0,
                shippingCharges: 0,
                total: 0,
                itemCount: 0
            },
            isOpen: false
        });
    };

    const setIsCartOpen = (isOpen: boolean) => {
        setCart(prev => ({ ...prev, isOpen }));
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount: cart.summary.itemCount,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};