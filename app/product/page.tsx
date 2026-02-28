'use client';

import React, { useState, useEffect, useCallback } from 'react';
import FilterSidebar from '@/components/product/FilterSidebar';
import ProductGrid from '@/components/product//ProductGrid';
import SortBar from '@/components/product//SortBar';
import { Product, FilterCategory, SortOption } from '@/types/product/types';
import { mockProducts, filters as mockFilters, sortOptions } from '@/data/product/data';
import { X } from 'lucide-react';

const ProductListingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<FilterCategory[]>(mockFilters);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [selectedSort, setSelectedSort] = useState<string>('popularity');
    const [viewMode, setViewMode] = useState<'grid-3' | 'grid-4'>('grid-3');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Load initial products
    useEffect(() => {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
    }, []);

    // Apply filters and sort
    useEffect(() => {
        let result = [...products];

        // Apply filters
        Object.entries(selectedFilters).forEach(([categoryId, selectedIds]) => {
            if (selectedIds.length === 0) return;

            const category = filters.find(f => f.id === categoryId);

            switch (categoryId) {
                case 'brand':
                    result = result.filter(p => selectedIds.includes(p.brand.toLowerCase()));
                    break;
                case 'gender':
                    // Add gender filtering logic based on your data structure
                    break;
                case 'age':
                    // Add age filtering logic
                    break;
                case 'price':
                    // Handle price ranges
                    const priceRange = selectedIds[0];
                    result = result.filter(p => {
                        switch (priceRange) {
                            case 'p0': return p.price <= 250;
                            case 'p1': return p.price > 250 && p.price <= 500;
                            case 'p2': return p.price > 500 && p.price <= 1000;
                            case 'p3': return p.price > 1000 && p.price <= 2000;
                            case 'p4': return p.price > 2000 && p.price <= 3000;
                            case 'p5': return p.price > 3000 && p.price <= 4000;
                            case 'p6': return p.price > 4000 && p.price <= 5000;
                            case 'p7': return p.price > 5000;
                            default: return true;
                        }
                    });
                    break;
                case 'discount':
                    const discountRange = selectedIds[0];
                    result = result.filter(p => {
                        const discount = ((p.originalPrice - p.price) / p.originalPrice) * 100;
                        switch (discountRange) {
                            case 'd0': return discount <= 10;
                            case 'd1': return discount > 10 && discount <= 20;
                            case 'd2': return discount > 20 && discount <= 30;
                            case 'd3': return discount > 30 && discount <= 40;
                            case 'd4': return discount > 40;
                            default: return true;
                        }
                    });
                    break;
                case 'color':
                    result = result.filter(p =>
                        p.colors.some(c => selectedIds.includes(c.name.toLowerCase()))
                    );
                    break;
                default:
                    // Handle other filters
                    break;
            }
        });

        // Apply sorting
        switch (selectedSort) {
            case 'newArrivals':
                result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
                break;
            case 'bestSeller':
                result.sort((a, b) => (a.isBestSeller === b.isBestSeller ? 0 : a.isBestSeller ? -1 : 1));
                break;
            case 'priceLowToHigh':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'priceHighToLow':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'discount':
                result.sort((a, b) => {
                    const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
                    const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
                    return discountB - discountA;
                });
                break;
            case 'rating':
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                // Popularity (default)
                break;
        }

        setFilteredProducts(result);
    }, [selectedFilters, selectedSort, products]);

    const handleFilterChange = (categoryId: string, optionId: string, checked: boolean) => {
        setSelectedFilters(prev => {
            const current = prev[categoryId] || [];
            const updated = checked
                ? [...current, optionId]
                : current.filter(id => id !== optionId);

            return {
                ...prev,
                [categoryId]: updated
            };
        });
    };

    const handleClearAll = () => {
        setSelectedFilters({});
    };

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
    };

    const handleAddToCart = (productId: string) => {
        console.log('Add to cart:', productId);
        // Implement add to cart logic
    };

    const handleAddToWishlist = (productId: string) => {
        console.log('Add to wishlist:', productId);
        // Implement wishlist logic
    };

    const handleLoadMore = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setPage(prev => prev + 1);
            setLoading(false);
            if (page >= 3) setHasMore(false);
        }, 1000);
    };

    const getSelectedFiltersCount = () => {
        return Object.values(selectedFilters).reduce((acc, curr) => acc + curr.length, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1366px] mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <nav className="mb-4 text-sm">
                    <ol className="flex items-center space-x-2 text-gray-600">
                        <li><a href="/" className="hover:text-gray-900">Home</a></li>
                        <li><span className="mx-2">&gt;</span></li>
                        <li className="text-gray-900 font-medium">Curated Styles For You</li>
                    </ol>
                </nav>

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden w-full mb-4 px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center justify-center gap-2"
                >
                    <span>Filters</span>
                    {getSelectedFiltersCount() > 0 && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                            {getSelectedFiltersCount()}
                        </span>
                    )}
                </button>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Desktop Filter Sidebar */}
                    <FilterSidebar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearAll={handleClearAll}
                        selectedFilters={selectedFilters}
                        className="hidden lg:block w-64 flex-shrink-0"
                    />

                    {/* Mobile Filter Sidebar */}
                    {showMobileFilter && (
                        <div className="lg:hidden">
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                                onClick={() => setShowMobileFilter(false)}
                            />
                            <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 overflow-y-auto">
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Filters</h2>
                                    <button onClick={() => setShowMobileFilter(false)}>
                                        <X size={24} />
                                    </button>
                                </div>
                                <FilterSidebar
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                    onClearAll={handleClearAll}
                                    selectedFilters={selectedFilters}
                                    className="border-0 rounded-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Products Section */}
                    <div className="flex-1">
                        <SortBar
                            totalProducts={filteredProducts.length}
                            sortOptions={sortOptions}
                            selectedSort={selectedSort}
                            onSortChange={handleSortChange}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            className="mb-4"
                        />

                        <ProductGrid
                            products={filteredProducts}
                            viewMode={viewMode}
                            onAddToCart={handleAddToCart}
                            onAddToWishlist={handleAddToWishlist}
                            loading={loading}
                            hasMore={hasMore}
                            onLoadMore={handleLoadMore}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;