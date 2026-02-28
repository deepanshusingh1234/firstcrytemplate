"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

import BoutiqueBanner from "@/components/boutiques/BoutiqueBanner";
import BoutiqueHeader from "@/components/boutiques/BoutiqueHeader";
import BoutiqueFilters from "@/components/boutiques/BoutiqueFilters";
import BoutiqueProductGrid from "@/components/boutiques/BoutiqueProductGrid";
import { BoutiqueData } from "@/types/boutiques"; // Make sure this path is correct

// Import all boutique data
import holiCelebrationsData from "@/data/boutiques/holi-celebrations.json";
import festiveEthnicData from "@/data/boutiques/holi-celebrations.json"; // Fixed: was importing wrong file

const boutiqueDataMap: Record<string, BoutiqueData> = {
    'holi-celebrations': holiCelebrationsData as BoutiqueData,
    'festive-ethnic-for-holi': festiveEthnicData as BoutiqueData,
};

export default function BoutiqueCategoryPage() {
    const params = useParams();
    const categorySlug = params.category as string;

    const [data, setData] = useState<BoutiqueData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [sortBy, setSortBy] = useState("manual");

    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            try {
                const boutiqueData = boutiqueDataMap[categorySlug];
                if (boutiqueData) {
                    setData(boutiqueData);
                    setSelectedFilters({});
                } else {
                    console.error(`Boutique ${categorySlug} not found`);
                }
            } catch (error) {
                console.error("Error loading boutique data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [categorySlug]);

    // Filter products based on selected filters
    const filteredProducts = useMemo(() => {
        if (!data?.products) return [];

        if (Object.keys(selectedFilters).length === 0) return data.products;

        return data.products.filter(product => {
            // Example filtering logic - customize based on your needs
            let matchesFilter = true;

            Object.entries(selectedFilters).forEach(([filterType, selectedValues]) => {
                if (selectedValues.length === 0) return;

                switch (filterType) {
                    case 'category':
                    case 'subcategory':
                        // Add your category filtering logic
                        break;
                    case 'brand':
                        if (!selectedValues.includes(product.brand)) {
                            matchesFilter = false;
                        }
                        break;
                    case 'price':
                        // Add price range filtering
                        break;
                    case 'color':
                        // Check if product has any of the selected colors
                        const hasColor = product.colors?.some(color =>
                            selectedValues.includes(color.name)
                        );
                        if (!hasColor) matchesFilter = false;
                        break;
                    // Add more filter types as needed
                }
            });

            return matchesFilter;
        });
    }, [data, selectedFilters]);

    // Sort products
    const sortedProducts = useMemo(() => {
        const products = [...filteredProducts];

        switch (sortBy) {
            case "price-low-to-high":
                products.sort((a, b) => a.defaultPrice - b.defaultPrice);
                break;
            case "price-high-to-low":
                products.sort((a, b) => b.defaultPrice - a.defaultPrice);
                break;
            case "highest-discount":
                products.sort((a, b) => {
                    const discountA = ((a.defaultMrp - a.defaultPrice) / a.defaultMrp) * 100;
                    const discountB = ((b.defaultMrp - b.defaultPrice) / b.defaultMrp) * 100;
                    return discountB - discountA;
                });
                break;
            case "name-asc":
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "new-arrivals":
                // Add logic for new arrivals if you have a date field
                // products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                // Keep original order (manual)
                break;
        }

        return products;
    }, [filteredProducts, sortBy]);

    const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
        setSelectedFilters(prev => {
            const currentValues = prev[filterType] || [];
            const newValues = checked
                ? [...currentValues, value]
                : currentValues.filter(v => v !== value);

            if (newValues.length === 0) {
                const { [filterType]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [filterType]: newValues
            };
        });
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    const handlePincodeCheck = (pincode: string) => {
        console.log('Checking pincode:', pincode);
        // Implement pincode check logic here
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#ffd91c] border-t-transparent"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Boutique Not Found</h1>
                    <p className="text-gray-600 mt-2">The boutique you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <BoutiqueBanner category={data.category} />

            <div className="bg-[#3d3d3d]">
                <BoutiqueHeader
                    category={data.category}
                    sortOptions={data.sortOptions}
                    onSortChange={handleSortChange}
                />
                <BoutiqueFilters
                    filters={data.filters}
                    onFilterChange={handleFilterChange}
                    onPincodeCheck={handlePincodeCheck}
                />
            </div>

            <div className="bg-[#242424]">
                <BoutiqueProductGrid
                    products={sortedProducts}
                    totalCount={data.category.itemCount}
                />
            </div>
        </div>
    );
}