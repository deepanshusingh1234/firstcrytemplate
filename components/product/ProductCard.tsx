'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, ChevronRight, Star } from 'lucide-react';
import { Product } from '@/types/product/types';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: string) => void;
    onAddToWishlist?: (productId: string) => void;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onAddToWishlist,
    className = ''
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.code);
    const [currentImage, setCurrentImage] = useState(product.image);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleColorHover = (color: typeof product.colors[0]) => {
        if (color.image) {
            setCurrentImage(color.image);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart?.(product.id);
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        onAddToWishlist?.(product.id);
    };

    return (
        <Link href={`/product/${product.id}`} className="block">
            <div
                className={`group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                        src={currentImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                            <span className="px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded">
                                NEW
                            </span>
                        )}
                        {product.isBestSeller && (
                            <span className="px-2 py-1 text-xs font-semibold text-white bg-orange-500 rounded">
                                BESTSELLER
                            </span>
                        )}
                    </div>

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded">
                            {discount}% OFF
                        </div>
                    )}

                    {/* Stock Left */}
                    {product.stockLeft && product.stockLeft <= 5 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded">
                            Only {product.stockLeft} left
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={handleAddToWishlist}
                        className={`absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md transition-all ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            }`}
                    >
                        <Heart
                            size={20}
                            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                        />
                    </button>
                </div>

                {/* Product Details */}
                <div className="p-4">
                    {/* Brand */}
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

                    {/* Product Name */}
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 h-10">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                            <div className="flex items-center">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 text-sm font-medium text-gray-900">{product.rating}</span>
                            </div>
                            {product.reviewCount && (
                                <span className="text-xs text-gray-500">({product.reviewCount})</span>
                            )}
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">
                            ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                            <>
                                <span className="text-sm text-gray-500 line-through">
                                    ₹{product.originalPrice.toFixed(2)}
                                </span>
                                <span className="text-xs font-semibold text-green-600">
                                    {discount}% off
                                </span>
                            </>
                        )}
                    </div>

                    {/* Club Price */}
                    {product.clubPrice && (
                        <div className="flex items-center gap-1 mb-3 text-xs">
                            <span className="text-blue-600 font-semibold">Club Price:</span>
                            <span className="text-blue-600">₹{product.clubPrice.toFixed(2)}</span>
                            <div className="relative group">
                                <span className="w-4 h-4 inline-flex items-center justify-center text-xs bg-gray-200 text-gray-600 rounded-full cursor-help">?</span>
                                <div className="absolute bottom-full left-0 mb-2 w-48 p-2 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Earn Club Cash up to ₹{product.earnCash} on this product
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Color Options */}
                    {product.colors.length > 1 && (
                        <div className="flex items-center gap-1 mb-3">
                            {product.colors.slice(0, 5).map((color) => (
                                <button
                                    key={color.code}
                                    className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === color.code
                                        ? 'border-blue-600 scale-110'
                                        : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                    style={{ backgroundColor: color.code }}
                                    onMouseEnter={() => handleColorHover(color)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedColor(color.code);
                                    }}
                                    title={color.name}
                                />
                            ))}
                            {product.colors.length > 5 && (
                                <span className="text-xs text-gray-500">+{product.colors.length - 5}</span>
                            )}
                        </div>
                    )}

                    {/* Size Options */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {product.sizes.slice(0, 4).map((size) => (
                            <span
                                key={size.label}
                                className={`px-2 py-1 text-xs border rounded ${size.available
                                    ? 'border-gray-300 text-gray-700'
                                    : 'border-gray-200 text-gray-300 line-through'
                                    }`}
                            >
                                {size.label}
                            </span>
                        ))}
                        {product.sizes.length > 4 && (
                            <button
                                className="text-xs text-blue-600 hover:underline flex items-center"
                                onClick={(e) => e.preventDefault()}
                            >
                                +{product.sizes.length - 4} <ChevronRight size={12} />
                            </button>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        ADD TO CART
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;