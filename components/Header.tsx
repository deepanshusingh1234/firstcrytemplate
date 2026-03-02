// components/Header.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronDown, Heart, Menu, X, User, LogOut, ChevronRight } from "lucide-react";
import { getMainCategories, getTopMenuItems } from "@/utils/navigation";
import { MainCategory } from "@/types/navigation";
import { useCart } from "@/context/CartContext";
import CartButton from "@/components/cart/CartButton";
import CartPopup from "@/components/cart/CartPopup";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { setIsCartOpen } = useCart();
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    const navigationData = getTopMenuItems();
    const mainCategories = getMainCategories();

    // Handle scroll visibility
    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 10;

            if (currentScrollY < scrollThreshold) {
                // At the top of the page - always show header
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down - hide header
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show header
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        let ticking = false;

        const scrollListener = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    controlHeader();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener, { passive: true });

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, [lastScrollY]);

    const handleLogout = () => {
        logout();
    };

    const handleLoginClick = () => {
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    };

    const handleMenuEnter = (categoryId: string) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setActiveMenu(categoryId);
    };

    const handleMenuLeave = () => {
        const timeout = setTimeout(() => {
            setActiveMenu(null);
        }, 100);
        setHoverTimeout(timeout);
    };

    const handleMegaMenuEnter = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
    };

    const handleMegaMenuLeave = () => {
        setActiveMenu(null);
    };

    return (
        <>
            <header
                className={`
                    bg-white border-b border-gray-200 sticky top-0 z-50
                    transition-transform duration-300 ease-in-out will-change-transform
                    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
                `}
            >
                {/* Top Bar */}
                <div className="bg-[#f5f5f5] py-2 px-4 border-b border-gray-200 hidden md:block">
                    <div className="max-w-[1366px] mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            {/* Location */}
                            <div className="flex items-center text-sm text-gray-600 cursor-pointer">
                                <MapPin size={16} className="mr-1" />
                                <span>Select location</span>
                                <ChevronDown size={14} className="ml-1" />
                            </div>

                            {/* Top Menu Items */}
                            {navigationData.leftSection.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href || "#"}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center space-x-6">
                            {navigationData.rightSection.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href || "#"}
                                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                                >
                                    {item.icon === "heart" && <Heart size={16} className="mr-1" />}
                                    {item.label}
                                </a>
                            ))}

                            {/* User section */}
                            {isLoading ? (
                                <div className="text-sm text-gray-400">Loading...</div>
                            ) : user ? (
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Hi, {user.fullName.split(' ')[0]}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center text-xs text-gray-500 hover:text-red-500 ml-2"
                                    >
                                        <LogOut size={14} className="mr-1" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleLoginClick}
                                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                                >
                                    <User size={16} className="mr-1" />
                                    Login / Register
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Logo and Search Bar */}
                <div className="max-w-[1366px] mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <button
                                className="md:hidden mr-2"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <Link href="/" className="block">
                                <img
                                    src="https://cdn.fcglcdn.com/brainbees/images/n/fc_logo.png"
                                    alt="FirstCry India"
                                    className="h-10 md:h-12"
                                />
                            </Link>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search for a Category, Brand or Product"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-gray-400"
                                />
                                <button className="absolute right-0 top-0 h-full px-6 bg-gray-100 border border-l-0 border-gray-300 rounded-r hover:bg-gray-200">
                                    <Search size={20} className="text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 relative">
                                <Heart size={22} className="text-gray-700" />
                            </button>
                            <CartButton />

                            {/* Mobile Login/Register */}
                            {!isLoading && !user && (
                                <button
                                    className="md:hidden p-2"
                                    onClick={handleLoginClick}
                                >
                                    <User size={22} className="text-gray-700" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Menu - Desktop */}
                <nav className="hidden md:block border-t border-gray-200 bg-[#ffd91c] relative">
                    <div className="max-w-[1366px] mx-auto px-4">
                        <ul className="flex items-center space-x-6 py-2 text-sm relative">
                            <li
                                className="font-bold text-gray-800 flex items-center cursor-pointer group"
                                onMouseEnter={() => handleMenuEnter('all-categories')}
                                onMouseLeave={handleMenuLeave}
                            >
                                All Categories <ChevronDown size={16} className="ml-1" />
                            </li>

                            {/* Skip the first 'all-categories' when mapping for top menu */}
                            {mainCategories.slice(1).map((category: MainCategory) => (
                                <li
                                    key={category.id}
                                    className="relative group cursor-pointer"
                                    onMouseEnter={() => handleMenuEnter(category.id)}
                                    onMouseLeave={handleMenuLeave}
                                >
                                    <a href={category.href} className="py-2 block text-gray-700 hover:text-gray-900 group-hover:text-gray-900 whitespace-nowrap">
                                        {category.label}
                                    </a>
                                </li>
                            ))}

                            <li className="ml-auto">
                                <img
                                    src="https://cdn.fcglcdn.com/brainbees/images/disney_marvel.gif"
                                    alt="Disney Marvel"
                                    className="h-8"
                                />
                            </li>
                        </ul>
                    </div>

                    {/* Full Width Mega Menu */}
                    {activeMenu && (
                        <div
                            className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200 z-[100] pt-2"
                            style={{ top: '100%' }}
                            onMouseEnter={handleMegaMenuEnter}
                            onMouseLeave={handleMegaMenuLeave}
                        >
                            <div className="max-w-[1366px] mx-auto px-4 py-6">
                                {/* Find the active category directly instead of mapping all */}
                                {(() => {
                                    const activeCategory = mainCategories.find(cat => cat.id === activeMenu);
                                    if (!activeCategory) return null;

                                    return (
                                        <div key={activeCategory.id} className="flex">
                                            {/* Render columns dynamically */}
                                            {activeCategory.columns.map((column, idx) => (
                                                <div key={`${activeCategory.id}-col-${idx}`} className="flex-1 px-3">
                                                    <h3 className="font-bold mb-3 text-sm text-gray-900 border-b border-gray-200 pb-2">{column.title}</h3>
                                                    <ul className="space-y-2">
                                                        {column.items.slice(0, 8).map((item, itemIdx) => (
                                                            <li key={`${activeCategory.id}-${idx}-${itemIdx}-${item.id || item.label}`}>
                                                                <a
                                                                    href={item.href}
                                                                    className="text-xs text-gray-600 hover:text-gray-900 hover:underline block py-1"
                                                                >
                                                                    {item.label}
                                                                </a>
                                                            </li>
                                                        ))}
                                                        {column.items.length > 8 && (
                                                            <li>
                                                                <a href="#" className="text-xs text-blue-600 hover:underline flex items-center mt-2">
                                                                    View All <ChevronRight size={12} className="ml-1" />
                                                                </a>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}

                                            {/* Banner if exists */}
                                            {activeCategory.banner && (
                                                <div className="w-48 ml-4 flex-shrink-0">
                                                    <a href={activeCategory.banner.href}>
                                                        <img
                                                            src={activeCategory.banner.image}
                                                            alt={activeCategory.banner.alt}
                                                            className="w-full h-auto rounded-lg"
                                                        />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <img src="https://cdn.fcglcdn.com/brainbees/images/n/fc_logo.png" alt="FirstCry" className="h-8" />
                                <button onClick={() => setIsMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Mobile Search */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <Search size={20} className="absolute right-3 top-2.5 text-gray-400" />
                            </div>

                            {/* Mobile Menu Items */}
                            <div className="space-y-2">
                                <div className="py-2 border-b border-gray-200">
                                    <div className="flex items-center text-gray-700">
                                        <MapPin size={16} className="mr-2" />
                                        Select location
                                    </div>
                                </div>

                                {mainCategories.map((category) => (
                                    <div key={category.id} className="py-2 border-b border-gray-200">
                                        <a href={category.href} className="block text-gray-800 font-medium">
                                            {category.label}
                                        </a>
                                    </div>
                                ))}

                                <div className="py-2 border-b border-gray-200">
                                    {user ? (
                                        <div className="flex items-center justify-between" key={user.emailOrMobile}>
                                            <div className="flex items-center text-gray-800">
                                                <User size={16} className="mr-2" />
                                                <span>{user.fullName}</span>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="text-sm text-red-500"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                router.push('/login');
                                            }}
                                            className="flex items-center text-gray-800 w-full text-left"
                                        >
                                            <User size={16} className="mr-2" />
                                            Login / Register
                                        </button>
                                    )}
                                </div>
                                <div className="py-2">
                                    <a href="#" className="flex items-center text-gray-800">
                                        <Heart size={16} className="mr-2" />
                                        Shortlist
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cart Popup */}
                <CartPopup />
            </header>

            {/* Backdrop for mobile menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Header;