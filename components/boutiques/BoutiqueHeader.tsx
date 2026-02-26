"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BoutiqueCategory } from "@/types/boutiques";

interface Props {
    category: BoutiqueCategory;
    sortOptions: { id: string; name: string; value: string; }[];
    onSortChange: (sortValue: string) => void;
}

const BoutiqueHeader: React.FC<Props> = ({ category, sortOptions, onSortChange }) => {
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Select");

    const handleSortSelect = (option: { name: string; value: string }) => {
        setSelectedSort(option.name);
        setShowSortMenu(false);
        onSortChange(option.value);
    };

    const socialShare = [
        { platform: "Pinterest", icon: "pinterest", url: `http://pinterest.com/pin/create/bookmarklet/?media=//cdn.fcglcdn.com/brainbees/images/boutique/300x364/38715.webp&url=http://www.firstcry.com/boutique/holi-celebrations/38715?ref2=pinshare&is_video=false&description=${category.name}` },
        { platform: "Facebook", icon: "facebook", url: `http://www.facebook.com/sharer.php?u=http://www.firstcry.com/boutique/holi-celebrations/38715?ref2=faceshare` },
        { platform: "Google Plus", icon: "google", url: `https://plus.google.com/share?url=http://www.firstcry.com/boutique/holi-celebrations/38715?ref2=googleshare` }
    ];

    return (
        <div className="boutique-flexible">
            <div className="innerWrapper max-w-[1366px] mx-auto px-4">
                <div className="pcontainer">
                    <div className="filter-main-wrap">
                        <div className="filter-head phead clearfix flex justify-between items-center py-4">
                            <div className="lft flex items-center">
                                <ul className="lft flex items-center space-x-2">
                                    <li>
                                        <h1 className="text-2xl font-bold text-white">{category.name}</h1>
                                    </li>
                                    <li className="topr text-white">({category.itemCount} Items)</li>
                                </ul>
                            </div>

                            <div className="div-right flex items-center space-x-4">
                                <ul className="social-icon flex items-center space-x-3">
                                    <li className="text-sm text-white">Share:</li>
                                    {socialShare.map((social, index) => (
                                        <li key={index} className={social.icon}>
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="nofollow"
                                                className="block w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                                title={social.platform}
                                            />
                                        </li>
                                    ))}
                                </ul>

                                <div className="sort-wrapper relative">
                                    <div className="sort-dropdown">
                                        <div
                                            className="sort-select flex items-center space-x-2 cursor-pointer border border-gray-300 rounded px-3 py-2"
                                            onClick={() => setShowSortMenu(!showSortMenu)}
                                        >
                                            <span className="txt-sort text-sm text-white">Sort by:</span>
                                            <span className="sort-select-content text-sm font-medium text-white">{selectedSort}</span>
                                            <span className="arrow text-white">
                                                <ChevronDown size={16} className={`transform transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                                            </span>
                                        </div>
                                        {showSortMenu && (
                                            <ul className="sort-menu absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-20">
                                                {sortOptions.map((option) => (
                                                    <li
                                                        key={option.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                        onClick={() => handleSortSelect(option)}
                                                    >
                                                        {option.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoutiqueHeader;