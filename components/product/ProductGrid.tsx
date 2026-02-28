'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product/types';

interface ProductGridProps {
    products: Product[];
    viewMode: 'grid-3' | 'grid-4';
    onAddToCart?: (productId: string) => void;
    onAddToWishlist?: (productId: string) => void;
    loading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
    className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    viewMode,
    onAddToCart,
    onAddToWishlist,
    loading = false,
    hasMore = false,
    onLoadMore,
    className = ''
}) => {
    const gridCols = viewMode === 'grid-3' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

    if (products.length === 0 && !loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className={`grid ${gridCols} gap-4`}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onAddToWishlist={onAddToWishlist}
                    />
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {/* Load More Button */}
            {hasMore && !loading && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={onLoadMore}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
                    >
                        Show More Products
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;