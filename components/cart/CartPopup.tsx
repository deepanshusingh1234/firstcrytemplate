'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Gift, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CartPopup: React.FC = () => {
    const { cart, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
    const router = useRouter();
    const [pincode, setPincode] = useState('');

    if (!cart.isOpen) return null;

    const handleQuantityChange = (productId: string, currentQty: number, change: number, size?: string, color?: string) => {
        const newQty = currentQty + change;
        if (newQty >= 1) {
            updateQuantity(productId, newQty, size, color);
        }
    };

    const progressPercentage = Math.min((cart.summary.subtotal / 499) * 100, 100);

    const handleProceedToCheckout = () => {
        setIsCartOpen(false);
        router.push('/cart/pay');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-transparent bg-opacity-50 z-50 transition-opacity duration-300"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Popup */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-[#ffd91c] p-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag size={24} className="text-gray-800" />
                        <h2 className="text-lg font-bold text-gray-800">Shopping Cart</h2>
                        <span className="bg-gray-800 text-white text-sm px-2 py-1 rounded-full">
                            {cart.summary.itemCount}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-1 hover:bg-yellow-500 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-800" />
                    </button>
                </div>

                {/* Free Shipping Progress */}
                {cart.items.length > 0 && (
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <Truck size={18} className="text-green-600" />
                                <span className="text-sm text-gray-600">Free Shipping</span>
                            </div>
                            <span className="text-sm font-medium">
                                {cart.summary.subtotal >= 499 ? (
                                    <span className="text-green-600">Eligible ✓</span>
                                ) : (
                                    <span className="text-orange-500">
                                        Add ₹{(499 - cart.summary.subtotal).toFixed(2)} more
                                    </span>
                                )}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.items.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-sm text-gray-500 mb-4">Looks like you haven&apos;t added anything yet</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="bg-[#ffd91c] text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.items.map((item) => (
                            <div key={`${item.productId}-${item.size}-${item.color}`} className="border rounded-lg p-3 space-y-3">
                                {/* Product Row */}
                                <div className="flex space-x-3">
                                    {/* Product Image */}
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.selectedColor?.imageUrl || item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                            {item.brand} {item.name}
                                        </h4>

                                        {/* Product Attributes */}
                                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                                            {item.size && (
                                                <span className="bg-gray-100 px-2 py-1 rounded">Size: {item.size}</span>
                                            )}
                                            {item.color && (
                                                <span className="flex items-center space-x-1">
                                                    <span>Color:</span>
                                                    <span
                                                        className="w-3 h-3 rounded-full border"
                                                        style={{ backgroundColor: item.colorCode }}
                                                    />
                                                </span>
                                            )}
                                            {item.fabric && (
                                                <span className="bg-gray-100 px-2 py-1 rounded">{item.fabric}</span>
                                            )}
                                        </div>

                                        {/* Price */}
                                        <div className="mt-2 flex items-baseline space-x-2">
                                            <span className="font-bold text-gray-900">₹{item.price.toFixed(2)}</span>
                                            <span className="text-xs text-gray-500 line-through">₹{item.mrp}</span>
                                            <span className="text-xs text-green-600">
                                                {Math.round((1 - item.price / item.mrp) * 100)}% off
                                            </span>
                                        </div>

                                        {/* Club Price */}
                                        <div className="flex items-center space-x-1 mt-1">
                                            <span className="text-xs text-blue-500">Club Price:</span>
                                            <span className="text-xs font-medium text-blue-500">₹{item.clubPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity and Actions */}
                                <div className="flex items-center justify-between">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange(item.productId, item.quantity, -1, item.size, item.color)}
                                            disabled={item.quantity <= item.minQuantity}
                                            className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.productId, item.quantity, 1, item.size, item.color)}
                                            disabled={item.quantity >= item.maxQuantity}
                                            className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                                        className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100"
                                        title="Remove"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pincode Checker */}
                {cart.items.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Enter Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ffd91c]"
                                maxLength={6}
                            />
                            <button className="px-4 py-2 bg-[#ffd91c] text-gray-800 text-sm rounded-lg hover:bg-yellow-500">
                                Check
                            </button>
                        </div>
                    </div>
                )}

                {/* Order Summary */}
                {cart.items.length > 0 && (
                    <div className="p-4 border-t bg-white sticky bottom-0">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{cart.summary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-green-600">-₹{cart.summary.discount.toFixed(2)}</span>
                            </div>
                            {cart.summary.clubSavings > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Club Savings</span>
                                    <span className="text-blue-500">-₹{cart.summary.clubSavings.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className={cart.summary.shippingCharges === 0 ? 'text-green-600' : ''}>
                                    {cart.summary.shippingCharges === 0 ? 'FREE' : `₹${cart.summary.shippingCharges}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4 pt-2 border-t">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-lg">₹{cart.summary.total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleProceedToCheckout}
                            className="w-full bg-[#ffd91c] text-gray-800 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                        >
                            Proceed to Checkout
                        </button>

                        {/* Trust Badges */}
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                            <div className="flex flex-col items-center">
                                <Shield size={16} className="text-gray-500" />
                                <span className="text-xs text-gray-500 mt-1">Secure Payment</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <RotateCcw size={16} className="text-gray-500" />
                                <span className="text-xs text-gray-500 mt-1">Easy Returns</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Truck size={16} className="text-gray-500" />
                                <span className="text-xs text-gray-500 mt-1">Free Shipping*</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPopup;