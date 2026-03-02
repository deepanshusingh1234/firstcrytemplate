// app/product/[productId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight, Check, ShoppingBag, Truck, RotateCcw, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/data/product/data';
import { Product } from '@/types/product/types';

// Helper function to get product by ID
const getProductById = (id: string): Product | undefined => {
    return mockProducts.find(product => product.id === id);
};

// Helper function to get related products
const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
    const currentProduct = getProductById(productId);
    if (!currentProduct) return [];

    const sameBrand = mockProducts.filter(
        p => p.id !== productId && p.brand === currentProduct.brand
    );

    const others = mockProducts.filter(
        p => p.id !== productId && p.brand !== currentProduct.brand
    );

    return [...sameBrand, ...others].slice(0, limit);
};

const ProductDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const productId = params.productId as string;
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Image gallery states
    const [selectedImage, setSelectedImage] = useState(0);
    const [currentImage, setCurrentImage] = useState('');

    // Product options states
    const [selectedColor, setSelectedColor] = useState<typeof product.colors[0] | null>(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    // UI states
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [showAddToCartMsg, setShowAddToCartMsg] = useState(false);
    const [pincode, setPincode] = useState('');
    const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);

    useEffect(() => {
        const loadProduct = () => {
            setLoading(true);
            try {
                const foundProduct = getProductById(productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                    setCurrentImage(foundProduct.image);
                    setRelatedProducts(getRelatedProducts(productId, 4));

                    // Set default color
                    if (foundProduct.colors.length > 0) {
                        setSelectedColor(foundProduct.colors[0]);
                    }

                    // Set default size
                    const firstAvailable = foundProduct.sizes.find(s => s.available);
                    if (firstAvailable) {
                        setSelectedSize(firstAvailable.label);
                    }
                }
            } catch (error) {
                console.error('Error loading product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    // Create images array for gallery
    const productImages = product ? [product.image, ...product.images] : [];

    const handleColorSelect = (color: typeof product.colors[0]) => {
        setSelectedColor(color);
        // If color has custom image, update current image
        if (color.image) {
            setCurrentImage(color.image);
        } else {
            setCurrentImage(product?.image || '');
        }
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else {
            setQuantity(prev => (prev > 1 ? prev - 1 : 1));
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        setIsAdding(true);

        addToCart({
            productId: product!.id,
            name: product!.name,
            brand: product!.brand,
            image: currentImage,
            price: product!.price,
            mrp: product!.originalPrice,
            clubPrice: product!.clubPrice || product!.price,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor?.name,
            colorCode: selectedColor?.code,
            inStock: true,
            maxQuantity: 10,
            minQuantity: 1,
            selectedColor: selectedColor ? {
                name: selectedColor.name,
                code: selectedColor.code,
                imageUrl: selectedColor.image || product!.image
            } : undefined
        });

        setShowAddToCartMsg(true);

        setTimeout(() => {
            setIsAdding(false);
            setTimeout(() => setShowAddToCartMsg(false), 2000);
        }, 500);
    };

    const handlePincodeCheck = () => {
        if (pincode.length === 6) {
            setPincodeValid(Math.random() > 0.3);
        }
    };

    const discount = product ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
                    <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
                    <button
                        onClick={() => router.push('/product')}
                        className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                    >
                        Go to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Success Message */}
            {showAddToCartMsg && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
                    <Check size={20} />
                    <span>Added to cart successfully!</span>
                </div>
            )}

            <div className="max-w-[1366px] mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm">
                    <ol className="flex items-center flex-wrap gap-y-2 text-gray-600">
                        <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
                        <li><span className="mx-2">/</span></li>
                        <li><Link href="/product" className="hover:text-gray-900">Products</Link></li>
                        <li><span className="mx-2">/</span></li>
                        <li className="text-gray-900 font-medium line-clamp-1 max-w-[300px]">{product.name}</li>
                    </ol>
                </nav>

                {/* Main Product Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={currentImage}
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                                            NEW
                                        </span>
                                    )}
                                    {product.isBestSeller && (
                                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                                            BESTSELLER
                                        </span>
                                    )}
                                </div>

                                {/* Discount Badge */}
                                {discount > 0 && (
                                    <div className="absolute top-4 right-4 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                                        {discount}% OFF
                                    </div>
                                )}

                                {/* Stock Left */}
                                {product.stockLeft && product.stockLeft <= 5 && (
                                    <div className="absolute bottom-4 left-4 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                                        Only {product.stockLeft} left
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedImage(index);
                                            setCurrentImage(img);
                                        }}
                                        className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden transition-all ${selectedImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                            unoptimized
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Product Info */}
                        <div className="space-y-6">
                            {/* Brand and Title */}
                            <div>
                                <Link href={`/brand/${product.brand.toLowerCase()}`} className="text-sm text-orange-500 hover:underline">
                                    {product.brand}
                                </Link>
                                <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mt-1">
                                    {product.name}
                                </h1>
                                <p className="text-xs text-gray-500 mt-1">{product.ageGroup || 'All Ages'}</p>
                            </div>

                            {/* Rating */}
                            {product.rating && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-yellow-400">
                                                {i < Math.floor(product.rating!) ? '★' : product.rating! % 1 !== 0 && i === Math.floor(product.rating!) ? '½' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {product.rating} ({product.reviewCount} reviews)
                                    </span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ₹{product.price.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through">
                                        ₹{product.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                        {discount}% OFF
                                    </span>
                                </div>

                                {/* Club Price */}
                                {product.clubPrice && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-blue-500 font-medium">Club Price:</span>
                                        <span className="text-blue-500">₹{product.clubPrice.toFixed(2)}</span>
                                        <span className="text-gray-500">Save ₹{(product.price - product.clubPrice).toFixed(2)}</span>
                                    </div>
                                )}

                                {/* Earn Cash */}
                                {product.earnCash && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-blue-500">★</span>
                                        <span>Earn up to ₹{product.earnCash} Club Cash</span>
                                    </div>
                                )}
                            </div>

                            {/* Color Selection */}
                            {product.colors.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm text-gray-500">Color:</span>
                                        <span className="text-sm font-medium text-gray-900">{selectedColor?.name}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => handleColorSelect(color)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor?.name === color.name ? 'border-orange-500 scale-110' : 'border-gray-200 hover:border-gray-400'
                                                    }`}
                                                style={{ backgroundColor: color.code }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm text-gray-500">Size:</span>
                                    <span className="text-sm font-medium text-gray-900">{selectedSize}</span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size.label}
                                            onClick={() => size.available && handleSizeSelect(size.label)}
                                            disabled={!size.available}
                                            className={`px-4 py-2 text-sm font-medium border rounded-md transition-all ${selectedSize === size.label
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : size.available
                                                    ? 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
                                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                                }`}
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <span className="text-sm text-gray-500 block mb-3">Quantity:</span>
                                <div className="flex items-center">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => handleQuantityChange('decrease')}
                                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center text-sm font-medium">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange('increase')}
                                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="ml-4 text-xs text-gray-500">
                                        (Max 10)
                                    </span>
                                </div>
                            </div>

                            {/* Pincode Check */}
                            <div>
                                <span className="text-sm text-gray-500 block mb-3">Delivery To:</span>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={pincode}
                                        onChange={(e) => {
                                            setPincode(e.target.value.replace(/\D/g, ''));
                                            setPincodeValid(null);
                                        }}
                                        placeholder="Enter Pincode"
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                        onClick={handlePincodeCheck}
                                        className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors"
                                    >
                                        Check
                                    </button>
                                </div>
                                {pincodeValid === true && (
                                    <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                                        <Check size={14} /> Delivery available at this pincode
                                    </p>
                                )}
                                {pincodeValid === false && (
                                    <p className="mt-2 text-xs text-red-600">
                                        Delivery not available at this pincode
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className={`flex-1 px-6 py-3 rounded-md font-medium text-white transition-all ${isAdding ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'
                                        }`}
                                >
                                    {isAdding ? 'ADDED ✓' : 'ADD TO CART'}
                                </button>
                                <button
                                    onClick={() => setIsInWishlist(!isInWishlist)}
                                    className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <Heart size={18} className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
                                    SHORTLIST
                                </button>
                            </div>

                            {/* Delivery Info */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <div className="text-center">
                                    <Truck size={20} className="mx-auto mb-2 text-gray-600" />
                                    <p className="text-xs text-gray-600">Free Delivery</p>
                                </div>
                                <div className="text-center">
                                    <RotateCcw size={20} className="mx-auto mb-2 text-gray-600" />
                                    <p className="text-xs text-gray-600">7 Days Return</p>
                                </div>
                                <div className="text-center">
                                    <Shield size={20} className="mx-auto mb-2 text-gray-600" />
                                    <p className="text-xs text-gray-600">Secure Payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {relatedProducts.map((item) => {
                                const itemDiscount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/product/${item.id}`}
                                        className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={300}
                                                height={300}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                unoptimized
                                            />
                                            {item.isNew && (
                                                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                    NEW
                                                </span>
                                            )}
                                            {itemDiscount > 0 && (
                                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                    {itemDiscount}% OFF
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
                                            <p className="text-sm font-medium line-clamp-2 mb-2 group-hover:text-orange-500">
                                                {item.name}
                                            </p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-base font-bold">₹{item.price.toFixed(2)}</span>
                                                <span className="text-xs text-gray-500 line-through">
                                                    ₹{item.originalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;