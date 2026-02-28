'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { FilterCategory } from '@/types/product/types';

interface FilterSidebarProps {
    filters: FilterCategory[];
    onFilterChange: (categoryId: string, optionId: string, checked: boolean) => void;
    onClearAll: () => void;
    selectedFilters: Record<string, string[]>;
    className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    filters,
    onFilterChange,
    onClearAll,
    selectedFilters,
    className = ''
}) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
        filters.reduce((acc, filter) => ({ ...acc, [filter.id]: filter.expanded ?? true }), {})
    );
    const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleSearchChange = (categoryId: string, value: string) => {
        setSearchTerms(prev => ({
            ...prev,
            [categoryId]: value
        }));
    };

    const clearSearch = (categoryId: string) => {
        setSearchTerms(prev => {
            const newTerms = { ...prev };
            delete newTerms[categoryId];
            return newTerms;
        });
    };

    const getSelectedCount = () => {
        return Object.values(selectedFilters).reduce((acc, curr) => acc + curr.length, 0);
    };

    const selectedCount = getSelectedCount();

    const renderFilterOptions = (category: FilterCategory) => {
        const searchTerm = searchTerms[category.id]?.toLowerCase() || '';
        const filteredOptions = searchTerm
            ? category.options.filter(opt => opt.label.toLowerCase().includes(searchTerm))
            : category.options;

        if (category.type === 'color') {
            return (
                <div className="grid grid-cols-5 gap-2 mt-2">
                    {filteredOptions.map(option => (
                        <div
                            key={option.id}
                            className="relative group"
                        >
                            <button
                                onClick={() => onFilterChange(category.id, option.id, !selectedFilters[category.id]?.includes(option.id))}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${selectedFilters[category.id]?.includes(option.id)
                                    ? 'border-blue-600 scale-110'
                                    : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                style={{ backgroundColor: option.label.toLowerCase() }}
                                title={option.label}
                            />
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {option.label} ({option.count})
                            </span>
                        </div>
                    ))}
                </div>
            );
        }

        if (category.type === 'price') {
            return (
                <div className="space-y-2 mt-2">
                    {filteredOptions.map(option => (
                        <label key={option.id} className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="price"
                                    value={option.id}
                                    checked={selectedFilters[category.id]?.includes(option.id)}
                                    onChange={(e) => onFilterChange(category.id, option.id, e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                                    {option.label}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">({option.count})</span>
                        </label>
                    ))}
                </div>
            );
        }

        return (
            <div className="space-y-2 mt-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                {filteredOptions.map(option => (
                    <label key={option.id} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedFilters[category.id]?.includes(option.id)}
                                onChange={(e) => onFilterChange(category.id, option.id, e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                                {option.label}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                ))}
            </div>
        );
    };

    return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">FILTERS</h2>
                    {selectedCount > 0 && (
                        <button
                            onClick={onClearAll}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Clear All ({selectedCount})
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Categories */}
            <div className="divide-y divide-gray-200">
                {filters.map(category => (
                    <div key={category.id} className="p-4">
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="flex items-center justify-between w-full text-left"
                        >
                            <span className="font-medium text-gray-900">{category.title}</span>
                            {expandedCategories[category.id] ? (
                                <ChevronUp size={18} className="text-gray-500" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-500" />
                            )}
                        </button>

                        {/* Category Content */}
                        {expandedCategories[category.id] && (
                            <div className="mt-3">
                                {/* Search Box */}
                                {category.searchable && (
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            placeholder={`Search ${category.title.toLowerCase()}`}
                                            value={searchTerms[category.id] || ''}
                                            onChange={(e) => handleSearchChange(category.id, e.target.value)}
                                            className="w-full px-3 py-2 pl-9 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                                        {searchTerms[category.id] && (
                                            <button
                                                onClick={() => clearSearch(category.id)}
                                                className="absolute right-3 top-2.5"
                                            >
                                                <X size={16} className="text-gray-400 hover:text-gray-600" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Filter Options */}
                                {renderFilterOptions(category)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;