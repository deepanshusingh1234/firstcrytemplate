"use client";

import React from "react";
import Link from "next/link";

interface Props {
    category: string;
}

const BoutiqueBreadcrumb: React.FC<Props> = ({ category }) => {
    return (
        <div className="banner-event">
            <div className="mainContainer banner-boutique max-w-[1366px] mx-auto px-4">
                <div className="breadcrumb">
                    <ul className="flex items-center space-x-2 text-sm">
                        <li>
                            <Link href="/" className="text-gray-600 hover:text-gray-900">
                                Home
                            </Link>
                        </li>
                        <li><span className="text-gray-400">/</span></li>
                        <li>
                            <Link href="/boutiques" className="text-gray-600 hover:text-gray-900">
                                Premium Boutiques
                            </Link>
                        </li>
                        <li><span className="text-gray-400">/</span></li>
                        <li className="bactive text-gray-900 font-medium">{category}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BoutiqueBreadcrumb;