"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import holiCelebrationsData from "@/data/boutiques/holi-celebrations.json";

const boutiqueDataMap: Record<string, any> = {
    'holi-celebrations': holiCelebrationsData,
};

export default function ProductDetailPage() {
    const params = useParams();
    const categorySlug = params.category as string;
    const productId = params.productId as string;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = boutiqueDataMap[categorySlug];
        if (data?.products) {
            const found = data.products.find((p: any) => p.id === productId);
            setProduct(found);
        }
        setLoading(false);
    }, [categorySlug, productId]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <nav className="flex mb-6 text-sm">
                <Link href="/" className="text-gray-600">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/boutiques" className="text-gray-600">Boutiques</Link>
                <span className="mx-2">/</span>
                <Link href={`/boutique/${categorySlug}`} className="text-gray-600">{categorySlug}</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{product.name}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img src={product.defaultImage} alt={product.name} className="w-full" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-2">{product.brand} {product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.ageGroup}</p>

                    <div className="mb-4">
                        <span className="text-2xl font-bold">₹{product.defaultPrice}</span>
                        <span className="ml-2 text-gray-500 line-through">₹{product.defaultMrp}</span>
                        <span className="ml-2 text-green-600">
                            {Math.round((1 - product.defaultPrice / product.defaultMrp) * 100)}% off
                        </span>
                    </div>

                    <div className="mb-4">
                        <span className="text-blue-500">Club Price: ₹{product.defaultClubPrice}</span>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}