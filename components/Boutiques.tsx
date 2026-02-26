"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { getBoutiques, getSectionTitle, getViewAllLink } from "../utils/boutiques";
import { Boutique } from "../types/boutique";

const Boutiques = () => {
    const [boutiques, setBoutiques] = useState<Boutique[]>([]);
    const [sectionTitle, setSectionTitle] = useState("");
    const [viewAllLink, setViewAllLink] = useState("");

    useEffect(() => {
        setBoutiques(getBoutiques());
        setSectionTitle(getSectionTitle());
        setViewAllLink(getViewAllLink());
    }, []);

    // Function to check if a boutique is ending soon (for styling)
    const isEndingSoon = (endDate: string) => {
        const now = new Date();
        const end = new Date(endDate);
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3 && diffDays > 0;
    };

    return (
        <div
            id="new-boutique"
            className="bg-gray-100 relative -top-[5px]"
        >
            <div className="max-w-[1366px] mx-auto px-[50px] py-[31px] pb-[26px] relative z-10">
                {/* Section Title */}
                <div className="baby-faishon-text mb-6">
                    <div className="flex justify-center">
                        <div className="ribbon-center relative">
                            <span className="baby">
                                <h3 className="text-2xl font-bold text-center relative px-8 py-2">
                                    {sectionTitle}
                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-[2px] bg-gray-400"></div>
                                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-[2px] bg-gray-400"></div>
                                </h3>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Boutiques Grid */}
                <div className="img-block grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {boutiques.map((boutique) => (
                        <a
                            key={boutique.id}
                            href={boutique.linkUrl}
                            className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative"
                        >
                            {/* Timer/End Date Sticky */}
                            <div
                                className={`absolute top-2 left-2 z-10 px-3 py-1.5 rounded text-xs font-medium ${isEndingSoon(boutique.endDate)
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-800 bg-opacity-70 text-white'
                                    }`}
                            >
                                {boutique.endDateText}
                            </div>

                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-gray-100">
                                <img
                                    src={boutique.imageUrl.startsWith('//') ? `https:${boutique.imageUrl}` : boutique.imageUrl}
                                    alt={boutique.title}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h4 className="head font-semibold text-gray-800 mb-1 line-clamp-2">
                                    {boutique.title}
                                </h4>
                                <p className="title text-sm text-gray-600 mb-2 line-clamp-2">
                                    {boutique.description}
                                </p>

                                {/* New Tag */}
                                {boutique.isNew && (
                                    <span className="newtag inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                                        NEW TODAY
                                    </span>
                                )}

                                {/* Shop Now Button */}
                                <p className="shop-now text-sm font-semibold text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
                                    SHOP NOW
                                </p>
                            </div>
                        </a>
                    ))}

                    {/* View All Link */}
                    <div className="col-span-full flex justify-center mt-8">
                        <a
                            href={viewAllLink}
                            target="_self"
                            className="off-brand inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
                        >
                            <span>View All Boutiques</span>
                            <ChevronRight size={18} className="ml-1 hme_arr" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boutiques;