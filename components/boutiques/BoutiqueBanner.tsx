/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import React, { useEffect, useState } from "react";
import { BoutiqueCategory } from "@/types/boutiques";

interface Props {
    category: BoutiqueCategory;
}

const BoutiqueBanner: React.FC<Props> = ({ category }) => {
    const [timeLeft, setTimeLeft] = useState<string>(category.endDateText);

    useEffect(() => {
        if (category.endDate === "Boutique open until stocks last") {
            return;
        }

        const calculateTimeLeft = () => {
            const endDate = new Date(category.endDate).getTime();
            const now = new Date().getTime();
            const difference = endDate - now;

            if (difference <= 0) {
                setTimeLeft("Boutique ended");
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            if (days > 0) {
                setTimeLeft(`Boutique ends in ${days} days & ${hours} hours`);
            } else {
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`Boutique ends in ${hours} hours & ${minutes} minutes`);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [category.endDate, category.endDateText]);

    return (
        <>
            {/* Breadcrumb with increased height */}
            <div className="banner-event bg-gray-50 border-b border-gray-200">
                <div className="mainContainer banner-boutique max-w-[1366px] mx-auto px-4 py-4">
                    <div className="breadcrumb flex justify-between items-center">
                        <ul className="flex items-center space-x-2 text-sm md:text-base">
                            <li>
                                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                            </li>
                            <li><span className="text-gray-400">/</span></li>
                            <li>
                                <a href="/boutiques" className="text-gray-600 hover:text-gray-900">Premium Boutiques</a>
                            </li>
                            <li><span className="text-gray-400">/</span></li>
                            <li className="text-gray-900 font-medium text-base md:text-lg">{category.name}</li>
                        </ul>
                        <p className="event-time text-sm md:text-base text-orange-500 font-medium">
                            <span id="timer_38715">{timeLeft}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Banner image with increased height */}
            <div
                className="intro-banner relative w-full h-[400px] md:h-[450px] lg:h-[500px] bg-repeat-x"
                style={{ backgroundImage: `url('${category.tileImage}')` }}
                title={category.name}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={category.bannerImage}
                        alt={category.name}
                        title={category.name}
                        className="w-full h-full object-contain md:object-cover"
                    />
                </div>
            </div>
        </>
    );
};

export default BoutiqueBanner;