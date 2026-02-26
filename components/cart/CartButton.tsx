'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Props {
    className?: string;
}

const CartButton: React.FC<Props> = ({ className = '' }) => {
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <button
            onClick={() => setIsCartOpen(true)}
            className={`p-2 relative ${className}`}
            aria-label="Shopping cart"
        >
            <ShoppingCart size={22} className="text-gray-700" />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                </span>
            )}
        </button>
    );
};

export default CartButton;