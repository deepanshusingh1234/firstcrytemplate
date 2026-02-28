"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/boutiques";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Props {
    product: Product;
}

const BoutiqueProductCard: React.FC<Props> = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(product.defaultImage);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.colors[0]?.variants[0]?.size || '');
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        setIsAdding(true);

        // Find the selected variant price
        const selectedVariant = selectedColor?.variants.find(v => v.size === selectedSize);
        const price = selectedVariant?.price || product.defaultPrice;
        // Use the same price for clubPrice if variant doesn't have clubPrice
        const clubPrice = selectedVariant?.price || product.defaultClubPrice;

        addToCart({
            productId: product.id,
            name: product.name,
            brand: product.brand,
            image: currentImage,
            price: price,
            mrp: product.defaultMrp,
            clubPrice: clubPrice,
            quantity: 1,
            size: selectedSize,
            color: selectedColor?.name,
            colorCode: selectedColor?.code,
            ageGroup: product.ageGroup,
            inStock: true,
            maxQuantity: 10,
            minQuantity: 1,
            selectedColor: selectedColor ? {
                name: selectedColor.name,
                code: selectedColor.code,
                imageUrl: selectedColor.imageUrl
            } : undefined
        });

        // Show success animation
        setTimeout(() => setIsAdding(false), 500);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const discount = Math.round((1 - product.defaultPrice / product.defaultMrp) * 100);

    return (
        <div className="list_block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative group">
                <div className="pimg aspect-4/5 overflow-hidden bg-gray-100">
                    <Link href={product.url} className="block h-full">
                        <Image
                            src={currentImage}
                            alt={product.name}
                            title={product.name}
                            width={300}
                            height={375}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onMouseEnter={() => product.images.length > 1 && setCurrentImage(product.images[1].url)}
                            onMouseLeave={() => setCurrentImage(product.defaultImage)}
                            unoptimized
                        />
                    </Link>
                </div>

                {/* Shortlist Button */}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                    <Heart size={18} className="text-gray-600" />
                </button>

                {/* Added to Cart indicator */}
                {isAdding && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                        <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-bounce">
                            Added to Cart!
                        </span>
                    </div>
                )}
            </div>

            <div className="ptitle p-4">
                <Link href={product.url}>
                    <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-orange-500">
                        {product.brand} {product.name}
                    </h3>
                </Link>
                <p className="text-xs text-gray-500 mb-2">{product.ageGroup}</p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold text-sm">₹{product.defaultPrice}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.defaultMrp}</span>
                    <span className="text-xs text-green-600">
                        {discount}% off
                    </span>
                </div>

                {/* Club Price */}
                <div className="club-block flex items-center space-x-1 text-xs">
                    <span className="club-star-img text-blue-500">★</span>
                    <span className="text-blue-500 font-medium">Club Price:</span>
                    <span className="text-blue-500">₹{product.defaultClubPrice}</span>
                </div>

                {/* Color Options */}
                {product.colors.length > 0 && (
                    <div className="pcolor mt-3">
                        <p className="text-xs text-gray-500 mb-2">Color: {selectedColor?.name}</p>
                        <ul className="flex flex-wrap gap-2">
                            {product.colors.map((color, index) => (
                                <li key={index} className="relative">
                                    <button
                                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-orange-500' : 'border-transparent'
                                            }`}
                                        style={{ backgroundColor: color.code }}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setCurrentImage(color.imageUrl);
                                            // Reset size when color changes
                                            setSelectedSize(color.variants[0]?.size || '');
                                        }}
                                        title={color.name}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Size Options */}
                {selectedColor && selectedColor.variants.length > 0 && (
                    <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Size: {selectedSize}</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedColor.variants.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => handleSizeSelect(variant.size)}
                                    className={`px-3 py-1 text-xs border rounded transition-colors ${selectedSize === variant.size
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
                                        }`}
                                >
                                    {variant.size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="pbtns mt-4">
                    <ul className="flex space-x-2">
                        <li className="flex-1">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className={`w-full text-white text-sm py-2 rounded transition-all duration-300 ${isAdding
                                    ? 'bg-green-500'
                                    : 'bg-orange-500 hover:bg-orange-600'
                                    }`}
                            >
                                {isAdding ? 'ADDED ✓' : 'ADD TO CART'}
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50 transition-colors">
                                SHORTLIST
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BoutiqueProductCard;