'use client';

import React, { useState, useEffect } from 'react';
import {
    X, ChevronDown, ChevronUp, Info, Shield, Truck, RotateCcw,
    CreditCard, Wallet, Smartphone, Landmark, Lock,
    Gift, Award, Percent, CheckCircle, AlertCircle
} from 'lucide-react';
import { Share2, Heart } from 'lucide-react';
import LoginSignup from '@/components/auth/LoginSignup';
import { useAuth } from '@/hooks/useAuth';

const CheckoutPage = () => {
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [showWalletOtp, setShowWalletOtp] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showCouponSection, setShowCouponSection] = useState(true);
    const [showGiftSection, setShowGiftSection] = useState(false);
    const [pincode, setPincode] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [giftCode, setGiftCode] = useState('');
    const [selectedQty, setSelectedQty] = useState(1);
    const [activePaymentTab, setActivePaymentTab] = useState('upi');
    const [showLogin, setShowLogin] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const { user, logout, login } = useAuth();

    // Prevent hydration mismatch by only rendering after client-side mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Product data
    const product = {
        id: 21789292,
        name: 'Hola Bonita Cotton Woven Sleeveless Floral Printed Dress with Belt - Multicolor',
        brand: 'Hola Bonita',
        image: '//cdn.fcglcdn.com/brainbees/images/products/thumb/21789292a.webp',
        mrp: 999,
        price: 779.22,
        clubPrice: 759.24,
        discount: 22,
        size: '4-5Y',
        fabric: 'Cotton',
        quantity: 1
    };

    const handleLoginSuccess = (userData: any) => {
        login(userData);
        setShowLogin(false);
    };

    const handleLogout = () => {
        logout();
    };

    if (!isClient) {
        return null; // or return a loading skeleton
    }

    return (
        <>
            {/* Login Popup */}
            {showLogin && (
                <LoginSignup
                    isOpen={showLogin}
                    onClose={() => setShowLogin(false)}
                    onLoginSuccess={handleLoginSuccess}
                    redirectUrl="https://checkout.firstcry.com/pay"
                />
            )}

            <form method="post" action="" id="frmcheckout" name="frmcheckout" autoComplete="off" className="bg-gray-50 min-h-screen">
                {/* Processing Payment Overlay */}
                <section className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="MakePaymentProgress">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 max-w-md">
                        <div className="text-center">
                            <p className="text-lg font-semibold mb-2">We are Processing your payment please wait,</p>
                            <p className="text-sm text-gray-600 mb-4">Do not click on the <b>&quot;Refresh&quot;</b> button or close this window</p>
                            <div className="flex justify-center space-x-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Confirm Box Popup */}
                {showConfirmBox && (
                    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 max-w-sm">
                            <div className="text-center">
                                <h3 className="text-lg font-bold mb-4">Are you sure you want to remove this card?</h3>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => setShowConfirmBox(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                                    >
                                        NO
                                    </button>
                                    <button
                                        onClick={() => setShowConfirmBox(false)}
                                        className="px-6 py-2 bg-yellow-400 text-white rounded-lg font-medium hover:bg-yellow-500"
                                    >
                                        YES
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Wallet OTP Popup */}
                {showWalletOtp && (
                    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">OTP Verification</h3>
                                <button onClick={() => setShowWalletOtp(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                As you are using Cash Refund it is important to verify your account.
                                We have sent OTP to your account Email address. Please submit OTP and verify your self.
                            </p>
                            <div className="flex justify-between mb-4">
                                {[...Array(6)].map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                ))}
                            </div>
                            <div className="text-center mb-4">
                                <span className="text-sm text-green-600">OTP Sent successfully</span>
                            </div>
                            <div className="text-center mb-4">
                                <button className="text-sm text-blue-600 hover:underline">Resend OTP</button>
                            </div>
                            <button className="w-full py-3 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500">
                                SUBMIT
                            </button>
                        </div>
                    </section>
                )}

                {/* Internet Connection Error */}
                <div id="nointernet" className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 hidden">
                    <div className="container mx-auto flex items-center justify-between">
                        <span className="text-sm">Unable to connect. Please check your internet connection.</span>
                        <button className="text-sm font-medium hover:underline">Retry</button>
                    </div>
                </div>

                {/* Main Header */}
                <section className="bg-white border-b sticky top-0 z-40">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <button
                                    className="text-2xl"
                                    onClick={() => window.history.back()}
                                    type="button"
                                >
                                    ←
                                </button>
                                <h1 className="text-xl font-bold">Cart</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="relative" type="button">
                                    <Share2 size={20} />
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs w-4 h-4 rounded-full flex items-center justify-center">1</span>
                                </button>
                                <button type="button">
                                    <Heart size={20} />
                                </button>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Section - Cart Items */}
                        <div className="flex-1">
                            {/* Delivery Address Section */}
                            <section className="bg-white rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">Deliver to:</p>
                                        <p className="font-medium">John Doe, 123 Main Street, Mumbai - 400001</p>
                                    </div>
                                    <button
                                        className="text-sm text-blue-600 font-medium"
                                        type="button"
                                    >
                                        Change
                                    </button>
                                </div>
                            </section>

                            {/* Pincode Section */}
                            <section className="bg-white rounded-lg p-4 mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2 flex-1">
                                        <span className="text-sm text-gray-500">Delivery Pincode:</span>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            placeholder="Enter pincode"
                                        />
                                    </div>
                                    <button
                                        className="px-4 py-2 bg-yellow-400 text-white rounded-lg font-medium hover:bg-yellow-500"
                                        type="button"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </section>

                            {/* Bank Offers Carousel */}
                            <section className="bg-white rounded-lg p-4 mb-4">
                                <div className="flex space-x-4 overflow-x-auto pb-2">
                                    <div className="flex-shrink-0 w-64 p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <img src="https://cdn.fcglcdn.com/brainbees/checkout/canara.jpg" alt="Canara Bank" className="w-12 h-12 object-contain" />
                                            <div>
                                                <p className="font-medium">5% Off Upto ₹500</p>
                                                <p className="text-xs text-gray-500">On Canara Bank Visa Credit Cards | Above ₹1499</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 w-64 p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <img src="https://cdn.fcglcdn.com/brainbees/checkout/bank-cart-banners/PNBlogo_v6.jpg" alt="PNB" className="w-12 h-12 object-contain" />
                                            <div>
                                                <p className="font-medium">10% Off Upto ₹750</p>
                                                <p className="text-xs text-gray-500">On PNB Credit Cards | Over ₹1999</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Club Membership Banner */}
                            <section className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/checkout/onemonthclublogo.svg" alt="Club" className="h-8" />
                                        <span className="font-medium">Join Club & Save ₹35 with this Order</span>
                                        <Info size={16} className="text-gray-700" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mt-3">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-2">
                                        <p className="text-xs font-medium">3 Months</p>
                                        <p className="text-lg font-bold">₹267 <span className="text-xs">33</span></p>
                                        <p className="text-xs line-through">₹399</p>
                                        <p className="text-xs text-green-700">33% OFF</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-2">
                                        <p className="text-xs font-medium">6 Months</p>
                                        <p className="text-lg font-bold">₹511 <span className="text-xs">36</span></p>
                                        <p className="text-xs line-through">₹799</p>
                                        <p className="text-xs text-green-700">36% OFF</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-2">
                                        <p className="text-xs font-medium">12 Months</p>
                                        <p className="text-lg font-bold">₹941 <span className="text-xs">97</span></p>
                                        <p className="text-xs line-through">₹1599</p>
                                        <p className="text-xs text-green-700">41% OFF</p>
                                    </div>
                                </div>
                            </section>

                            {/* Out of Stock Warning */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                <div className="flex">
                                    <AlertCircle size={20} className="text-yellow-600 mr-2" />
                                    <div>
                                        <p className="text-sm">Few item(s) in your cart just went out of stock and were removed from the cart.</p>
                                        <button
                                            className="text-sm text-blue-600 font-medium mt-1"
                                            type="button"
                                        >
                                            Click here to see details.
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Card */}
                            <div className="bg-white rounded-lg p-4 mb-4">
                                <div className="flex space-x-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium mb-2">{product.name}</h3>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
                                            <span className="text-sm text-gray-500 line-through">₹{product.mrp}</span>
                                            <span className="text-sm text-green-600">{product.discount}% OFF</span>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <img src="//cdn.fcglcdn.com/brainbees/checkout/onemonthclublogo.svg" alt="Club" className="h-4" />
                                            <span className="text-sm text-blue-600">Club: ₹{product.clubPrice.toFixed(2)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">Price inclusive of all taxes.</p>

                                        {/* Product Attributes */}
                                        <div className="flex space-x-4 mb-2">
                                            <div>
                                                <span className="text-xs text-gray-500">Size</span>
                                                <p className="text-sm font-medium">{product.size}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Fabric</span>
                                                <p className="text-sm font-medium">{product.fabric}</p>
                                            </div>
                                        </div>

                                        {/* Quantity and Actions */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border rounded-lg">
                                                <button
                                                    className="p-1 hover:bg-gray-100"
                                                    type="button"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center text-sm">{product.quantity}</span>
                                                <button
                                                    className="p-1 hover:bg-gray-100"
                                                    type="button"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    className="text-sm text-gray-500 hover:text-red-500"
                                                    type="button"
                                                >
                                                    REMOVE
                                                </button>
                                                <button
                                                    className="text-sm text-gray-500 hover:text-blue-500"
                                                    type="button"
                                                >
                                                    MOVE TO SHORTLIST
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Apply Coupon Section */}
                            <section className="bg-white rounded-lg p-4 mb-4">
                                <div className="border rounded-lg p-3">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowCouponSection(!showCouponSection)}>
                                        <div className="flex items-center space-x-2">
                                            <Percent size={18} />
                                            <span className="font-medium">Apply Coupon</span>
                                        </div>
                                        {showCouponSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>

                                    {showCouponSection && (
                                        <div className="mt-3">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                    placeholder="Enter Coupon Code"
                                                />
                                                <button
                                                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg font-medium hover:bg-yellow-500"
                                                    type="button"
                                                >
                                                    Apply
                                                </button>
                                            </div>

                                            {/* Unlock Coupon Progress */}
                                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm">Add ₹219.78 to unlock</span>
                                                    <span className="text-sm font-medium text-blue-600">GET50CT</span>
                                                </div>
                                                <p className="text-xs text-gray-500">Extra Rs. 50 OFF* on orders worth Rs. 999</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Gift Certificate Section */}
                                <div className="mt-3 border rounded-lg p-3">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowGiftSection(!showGiftSection)}>
                                        <div className="flex items-center space-x-2">
                                            <Gift size={18} />
                                            <span className="font-medium">Have a Gift Certificate?</span>
                                        </div>
                                        {showGiftSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>

                                    {showGiftSection && (
                                        <div className="mt-3 flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={giftCode}
                                                onChange={(e) => setGiftCode(e.target.value)}
                                                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                placeholder="Enter Gift Certificate/Saving Code"
                                            />
                                            <button
                                                className="px-4 py-2 bg-yellow-400 text-white rounded-lg font-medium hover:bg-yellow-500"
                                                type="button"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Free Shipping Banner */}
                            <section className="bg-blue-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Truck size={24} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Free Shipping</h3>
                                        <p className="text-sm">On Your 1st Order</p>
                                    </div>
                                </div>
                            </section>

                            {/* Trending Items */}
                            <section className="bg-white rounded-lg p-4">
                                <h2 className="font-bold text-lg mb-4">Trending Items</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="border rounded-lg p-2">
                                            <div className="h-32 bg-gray-100 rounded-lg mb-2"></div>
                                            <p className="text-sm font-medium mb-1">Product Name {i}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold">₹399</span>
                                                <button
                                                    className="px-3 py-1 bg-yellow-400 text-white text-xs rounded-lg hover:bg-yellow-500"
                                                    type="button"
                                                >
                                                    ADD
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Section - Payment Summary */}
                        <div className="lg:w-96">
                            <div className="bg-white rounded-lg p-4 sticky top-24">
                                <h2 className="font-bold text-lg mb-4">Payment Information</h2>

                                {/* Price Breakdown */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Value of Products</span>
                                        <span className="font-medium">₹{product.mrp}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Discount(-)</span>
                                        <span className="text-green-600">-₹{(product.mrp - product.price).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping(+)</span>
                                        <div>
                                            <span className="text-green-600 font-medium mr-2">FREE</span>
                                            <span className="text-xs text-gray-500 line-through">₹100</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Club Savings */}
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/checkout/onemonthclublogo.svg" alt="Club" className="h-5" />
                                        <span className="text-sm font-medium text-blue-800">Total Club Savings: ₹35.98</span>
                                    </div>
                                </div>

                                {/* Order Total */}
                                <div className="flex justify-between items-center pt-3 border-t mb-4">
                                    <span className="font-bold">Order Total</span>
                                    <span className="font-bold text-xl">₹{product.price.toFixed(2)}</span>
                                </div>

                                {/* Payment Options */}
                                <div className="mb-4">
                                    <h3 className="font-medium mb-3">Payment Options</h3>
                                    <div className="space-y-2">
                                        <button
                                            className={`w-full p-3 border rounded-lg flex items-center justify-between ${activePaymentTab === 'upi' ? 'border-yellow-400 bg-yellow-50' : ''}`}
                                            onClick={() => setActivePaymentTab('upi')}
                                            type="button"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Smartphone size={20} />
                                                <span>UPI</span>
                                            </div>
                                            <ChevronDown size={18} />
                                        </button>
                                        <button
                                            className={`w-full p-3 border rounded-lg flex items-center justify-between ${activePaymentTab === 'card' ? 'border-yellow-400 bg-yellow-50' : ''}`}
                                            onClick={() => setActivePaymentTab('card')}
                                            type="button"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <CreditCard size={20} />
                                                <span>Credit/Debit Card</span>
                                            </div>
                                            <ChevronDown size={18} />
                                        </button>
                                        <button
                                            className={`w-full p-3 border rounded-lg flex items-center justify-between ${activePaymentTab === 'netbanking' ? 'border-yellow-400 bg-yellow-50' : ''}`}
                                            onClick={() => setActivePaymentTab('netbanking')}
                                            type="button"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Landmark size={20} />
                                                <span>Net Banking</span>
                                            </div>
                                            <ChevronDown size={18} />
                                        </button>
                                        <button
                                            className={`w-full p-3 border rounded-lg flex items-center justify-between ${activePaymentTab === 'wallet' ? 'border-yellow-400 bg-yellow-50' : ''}`}
                                            onClick={() => setActivePaymentTab('wallet')}
                                            type="button"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Wallet size={20} />
                                                <span>Wallets</span>
                                            </div>
                                            <ChevronDown size={18} />
                                        </button>
                                        <button
                                            className={`w-full p-3 border rounded-lg flex items-center justify-between ${activePaymentTab === 'emi' ? 'border-yellow-400 bg-yellow-50' : ''}`}
                                            onClick={() => setActivePaymentTab('emi')}
                                            type="button"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Award size={20} />
                                                <span>EMI</span>
                                            </div>
                                            <ChevronDown size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Login to Place Order Button */}
                                {!user && (
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="w-full py-3 bg-yellow-400 text-white font-bold rounded-lg hover:bg-yellow-500 mb-4"
                                        type="button"
                                    >
                                        LOGIN TO PLACE ORDER
                                    </button>
                                )}

                                {/* Trust Badges */}
                                <section className="grid grid-cols-4 gap-2 pt-4 border-t">
                                    <div className="text-center">
                                        <Lock size={16} className="mx-auto mb-1 text-gray-500" />
                                        <p className="text-xs text-gray-500">Quick & Secure Payments</p>
                                    </div>
                                    <div className="text-center">
                                        <RotateCcw size={16} className="mx-auto mb-1 text-gray-500" />
                                        <p className="text-xs text-gray-500">Easy Returns & Refunds</p>
                                    </div>
                                    <div className="text-center">
                                        <Shield size={16} className="mx-auto mb-1 text-gray-500" />
                                        <p className="text-xs text-gray-500">Encrypted User data</p>
                                    </div>
                                    <div className="text-center">
                                        <CheckCircle size={16} className="mx-auto mb-1 text-gray-500" />
                                        <p className="text-xs text-gray-500">PCI Certified</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hidden Inputs */}
                <input type="hidden" id="hdnNetPayment" name="hdnNetPayment" value="779.22" />
                <input type="hidden" id="hdnSubTotal" name="hdnSubTotal" value="779.22" />
                <input type="hidden" value="UPI" id="PaymentType" name="PaymentType" />
            </form>
        </>
    );
};

export default CheckoutPage;