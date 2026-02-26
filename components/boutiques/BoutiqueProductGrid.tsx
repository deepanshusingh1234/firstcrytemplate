"use client";

import React, { useState } from "react";
import BoutiqueProductCard from "./BoutiqueProductCard";
import { Product } from "@/types/boutiques";

interface Props {
    products: Product[];
    totalCount: number;
}

const BoutiqueProductGrid: React.FC<Props> = ({ products, totalCount }) => {
    const [visibleProducts, setVisibleProducts] = useState(12);
    const productsPerPage = 12;

    const loadMore = () => {
        setVisibleProducts(prev => Math.min(prev + productsPerPage, products.length));
    };

    return (
        <div className="mainContainer max-w-[1366px] mx-auto px-4 py-8">
            <div className="innerWrapper">
                <div className="pcatgory">
                    <ul className="viewfour grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.slice(0, visibleProducts).map((product) => (
                            <li key={product.id}>
                                <BoutiqueProductCard product={product} />
                            </li>
                        ))}
                    </ul>

                    {/* Load More / No More Products */}
                    {visibleProducts < products.length ? (
                        <div className="sc_key fw lft showmoredivs text-center mt-8">
                            <button
                                onClick={loadMore}
                                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                            >
                                Show More Products
                            </button>
                        </div>
                    ) : (
                        products.length > 0 && (
                            <div className="sc_key fw lft nomoredivs text-center mt-8">
                                <span className="text-gray-500">No More Products</span>
                            </div>
                        )
                    )}

                    {products.length === 0 && (
                        <div className="sc_key fw lft text-center mt-8">
                            <span className="text-gray-500">Sorry No suggestions Available.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoutiqueProductGrid;