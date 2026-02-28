'use client';

import React, { useState } from 'react';
import { ChevronDown, Grid, LayoutGrid } from 'lucide-react';
import { SortOption } from '@/types/product/types';

interface SortBarProps {
    totalProducts: number;
    sortOptions: SortOption[];
    selectedSort: string;
    onSortChange: (value: string) => void;
    viewMode: 'grid-3' | 'grid-4';
    onViewModeChange: (mode: 'grid-3' | 'grid-4') => void;
    className?: string;
}

const SortBar: React.FC<SortBarProps> = ({
    totalProducts,
    sortOptions,
    selectedSort,
    onSortChange,
    viewMode,
    onViewModeChange,
    className = ''
}) => {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const selectedOption = sortOptions.find(opt => opt.value === selectedSort);

    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Title and Count */}
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold text-gray-900">Curated Styles For You</h1>
                    <span className="text-sm text-gray-500">({totalProducts} Items)</span>
                </div>

                {/* Sort and View Options */}
                <div className="flex items-center gap-4">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <span className="text-gray-500">Sort by:</span>
                            <span className="font-medium text-gray-900">{selectedOption?.label || 'Select'}</span>
                            <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSortOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsSortOpen(false)}
                                />
                                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                    {sortOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onSortChange(option.value);
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${selectedSort === option.value
                                                    ? 'text-blue-600 font-medium'
                                                    : 'text-gray-700'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 border border-gray-300 rounded-md p-1">
                        <button
                            onClick={() => onViewModeChange('grid-3')}
                            className={`p-1.5 rounded ${viewMode === 'grid-3' ? 'bg-gray-200' : 'hover:bg-gray-100'
                                }`}
                        >
                            <Grid size={18} className="text-gray-600" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('grid-4')}
                            className={`p-1.5 rounded ${viewMode === 'grid-4' ? 'bg-gray-200' : 'hover:bg-gray-100'
                                }`}
                        >
                            <LayoutGrid size={18} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortBar;