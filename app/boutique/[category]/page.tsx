"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

import BoutiqueBanner from "@/components/boutiques/BoutiqueBanner";
import BoutiqueHeader from "@/components/boutiques/BoutiqueHeader";
import BoutiqueFilters from "@/components/boutiques/BoutiqueFilters";
import BoutiqueProductGrid from "@/components/boutiques/BoutiqueProductGrid";
import { BoutiqueData } from "@/types/boutiques";

// Import all boutique data
import holiCelebrationsData from "@/data/boutiques/holi-celebrations.json";
import festiveEthnicData from "@/data/boutiques/holi-celebrations.json";
// Import other boutique data as needed

const boutiqueDataMap: Record<string, BoutiqueData> = {
    'holi-celebrations': holiCelebrationsData as BoutiqueData,
    'festive-ethnic-for-holi': festiveEthnicData as BoutiqueData,
    // Add other mappings
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
            // Implement your filtering logic here based on product properties
            // This is a placeholder - you'll need to implement actual filtering
            return true;
        });
    }, [data, selectedFilters]);

    // Sort products
    const sortedProducts = useMemo(() => {
        const products = [...filteredProducts];

        switch (sortBy) {
            case "Price":
                products.sort((a, b) => a.defaultPrice - b.defaultPrice);
                break;
            case "HighestDiscount":
                products.sort((a, b) => {
                    const discountA = ((a.defaultMrp - a.defaultPrice) / a.defaultMrp) * 100;
                    const discountB = ((b.defaultMrp - b.defaultPrice) / b.defaultMrp) * 100;
                    return discountB - discountA;
                });
                break;
            case "Name":
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "NewArrivals":
                // Add logic for new arrivals if you have a date field
                break;
            default:
                // Keep original order
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
                    <p className="text-gray-600 mt-2">The boutique you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <BoutiqueBanner category={data.category} />

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

            <div className=" bg-[#242424]">
                <BoutiqueProductGrid
                    products={sortedProducts}
                    totalCount={data.category.itemCount}
                />
            </div>
        </div>
    );
}