"use client";

import React, { useState } from "react";
import { FilterCategory } from "@/types/boutiques/filter";

interface Props {
    filters: FilterCategory[];
    onFilterChange: (filterType: string, value: string, checked: boolean) => void;
    onPincodeCheck: (pincode: string) => void;
}

const BoutiqueFilters: React.FC<Props> = ({ filters, onFilterChange, onPincodeCheck }) => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [pincode, setPincode] = useState("");
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    return (
        <div className="boutique-flexible">
            <div className="innerWrapper max-w-[1366px] mx-auto px-4 pb-4">
                <div id="myfilter">
                    {/* Filter Tabs */}
                    <div className="filter-tab flex justify-between items-center">
                        <div className="div-ib lft">
                            <ul className="optionCount flex items-center space-x-4">
                                <li className="text-sm text-white">Filter by:</li>
                                {filters.slice(0, 6).map((filter) => (
                                    <li key={filter.id}>
                                        <button
                                            className={`text-sm hover:text-orange-500 transition-colors ${activeFilter === filter.id ? 'text-orange-500 font-medium' : 'text-white'
                                                }`}
                                            onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                                        >
                                            {filter.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="moreFilter">
                            <button
                                className="text-sm text-orange-500 hover:text-orange-600"
                                onClick={() => setShowMoreFilters(!showMoreFilters)}
                            >
                                More Filters
                            </button>
                        </div>
                    </div>

                    {/* Pincode Check */}
                    <div className="filter-tab flex justify-end">
                        <div className="div-ib rgt">
                            <div className="value_chk flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Enter Pin Code"
                                    className="inputcheckpin border border-gray-300 rounded px-3 py-2 text-sm w-32"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                />
                                <button
                                    className="check_txt text-sm text-orange-500 font-medium hover:text-orange-600"
                                    onClick={() => onPincodeCheck(pincode)}
                                >
                                    CHECK
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Options */}
                    {activeFilter && (
                        <div className="tab-wrap myptabdetails mt-4 mb-2">
                            <div className="tab-options pcontents tab active border border-gray-300 rounded p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {filters
                                        .find(f => f.id === activeFilter)
                                        ?.options.map((option) => (
                                            <label key={option.id} className="flex items-center space-x-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-orange-500"
                                                    onChange={(e) => onFilterChange(activeFilter, option.value, e.target.checked)}
                                                />
                                                <span className="text-gray-700">{option.name}</span>
                                                <span className="text-gray-500 text-xs">({option.count})</span>
                                            </label>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* More Filters Popup */}
                    {showMoreFilters && (
                        <div className="filter-popup-wrap fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMoreFilters(false)}></div>
                            <div className="filter-popup bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto relative z-10">
                                <div className="fhead sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                                    <p className="text-lg font-bold">Filter By</p>
                                    <button className="fclose text-2xl" onClick={() => setShowMoreFilters(false)}>×</button>
                                </div>
                                <div className="p-6">
                                    {filters.map((filter) => (
                                        <div key={filter.id} className="mb-6">
                                            <h3 className="font-medium mb-3">{filter.name}</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {filter.options.map((option) => (
                                                    <label key={option.id} className="flex items-center space-x-2 text-sm">
                                                        <input type="checkbox" className="form-checkbox text-orange-500" />
                                                        <span className="text-gray-700">{option.name}</span>
                                                        <span className="text-gray-500 text-xs">({option.count})</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="fpop-footer sticky bottom-0 bg-white border-t p-4 flex justify-end">
                                    <button className="btn-apply bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoutiqueFilters;