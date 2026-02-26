"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, Share2, ChevronDown, ChevronUp, Copy, Check, Info, X } from "lucide-react";

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
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [showPincodeCheck, setShowPincodeCheck] = useState(false);
    const [pincode, setPincode] = useState('');
    const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
    const [showProductInfo, setShowProductInfo] = useState(false);
    const [showBrandInfo, setShowBrandInfo] = useState(false);
    const [showSizeInfo, setShowSizeInfo] = useState(false);
    const [showAddToCartMsg, setShowAddToCartMsg] = useState(false);
    const [activeCouponTab, setActiveCouponTab] = useState('offers');

    const imageRef = useRef<HTMLDivElement>(null);

    // Mock product images (in real app, these would come from product data)
    const productImages = [
        product?.defaultImage?.replace('280x338', '583x720'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'b.webp'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'c.webp'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'd.webp'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'e.webp'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'f.webp'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'g.webp'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'h.webp'),
        product?.defaultImage?.replace('280x338', '583x720')?.replace('a.webp', 'i.webp'),
    ].filter(Boolean);

    const thumbnailImages = productImages.map(img => img?.replace('583x720', '56x69'));

    useEffect(() => {
        const data = boutiqueDataMap[categorySlug];
        if (data?.products) {
            const found = data.products.find((p: any) => p.id === productId);
            setProduct(found);
        }
        setLoading(false);
    }, [categorySlug, productId]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y });
    };

    const handlePincodeCheck = () => {
        if (pincode.length === 6) {
            // Mock validation - in real app, check against API
            setPincodeValid(Math.random() > 0.3);
        }
    };

    const handleCopyCoupon = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCoupon(code);
        setTimeout(() => setCopiedCoupon(null), 2000);
    };

    const handleAddToCart = () => {
        setShowAddToCartMsg(true);
        setTimeout(() => setShowAddToCartMsg(false), 3000);
    };

    const sizes = [
        { id: 'nb', name: 'New Born', available: true, stock: 5 },
        { id: '0-3m', name: '0 - 3 M', available: false },
        { id: '6-9m', name: '6 - 9 M', available: true, stock: 2 },
        { id: '9-12m', name: '9 - 12 M', available: false },
        { id: '18-24m', name: '18 - 24 M', available: false },
    ];

    const coupons = [
        { code: 'SALE55', description: 'Flat 55% Off* on Select Fashion Range', club: true },
        { code: '50SHOP', description: 'Flat 50% Off* on Select Fashion Range', club: true },
        { code: 'DEALZ', description: 'Flat 45% to 65% Off', club: false },
        { code: 'GREEN', description: 'Flat 50% OFF* -Club Users | Flat 45% OFF* - All Users', club: true },
        { code: 'VALUE', description: 'Flat 50% Off* For Club | Flat 45% Off* For Non Club', club: true },
    ];

    const bankOffers = [
        { bank: 'PNB', offer: '10% Instant Discount* on Punjab National Bank Credit Cards' },
        { bank: 'Canara', offer: '5% Instant Discount* on Canara Bank Visa Credit Cards' },
        { bank: 'Paytm', offer: 'Assured Rs.25 - Rs.200 cashback & Gold Coins on every Paytm UPI txn' },
    ];

    const sizeInfo = [
        { label: 'Age', value: 'New Born' },
        { label: 'Product Material', value: 'Cambric' },
        { label: 'Shoulder', value: '19.5 cm | 7.68 inch' },
        { label: 'Waist', value: '36.5 cm | 14.37 inch' },
        { label: 'Length for Top', value: '20.5 cm | 8.07inch' },
        { label: 'Length for Bottom', value: '26 cm | 10.24inch' },
        { label: 'Sleeve', value: '19.5 cm | 7.68 inch' },
        { label: 'Chest', value: '27cm | 10.63 inch' },
        { label: 'Wash Care', value: 'Machine Washable with warm water\nTumble dry with medium heat\nUse non chlorine bleach only when needed\nWash dark colors separately' },
        { label: 'Ironing Instruction', value: 'Use warm iron\nDo not iron prints on clothes and if needed iron prints inside out' },
        { label: 'Wash Type', value: 'Machine Washable' },
        { label: 'Laundry Detergent', value: 'Check out our range of baby laundry detergents for the finest wash care results!' },
    ];

    const productInfo = [
        { label: 'Brand', value: 'Babyhug' },
        { label: 'Type', value: 'Dhoti Kurta Set' },
        { label: 'Silhouette', value: 'Straight Cut, Dhoti' },
        { label: 'Sleeve Length', value: 'Full Sleeves' },
        { label: 'Neck Type', value: 'Mandarin Collar/ Bandh Gala' },
        { label: 'Neck Opening', value: 'Front Buttons' },
        { label: 'Length', value: 'Full Length' },
        { label: 'Highlights', value: 'Woven' },
        { label: 'Pattern/Print Type', value: 'All Over Print' },
        { label: 'Collection', value: 'Floral' },
        { label: 'Items Included', value: '1 Dhoti, 1 Kurta' },
        { label: 'Country of Origin', value: 'India' },
    ];

    const youMayAlsoLike = [
        { id: '20840508', name: 'Babyhug Cotton Cambric Woven Full Sleeves Kurta Dhoti Set with Floral Print - White & Purple', price: 663.17, mrp: 799, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/20840508a.webp' },
        { id: '20305525', name: 'Babyhug Cotton Woven Full Sleeves Kurta Dhoti Set With Floral Print - White', price: 663.17, mrp: 799, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/20305525a.webp' },
        { id: '20305702', name: 'Babyhug Cambric Woven Full Sleeves Kurta Dhoti Set with Floral Print - Light Green & White', price: 599.25, mrp: 799, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/20305702a.webp' },
        { id: '20840660', name: 'Babyhug Cambric Full Sleeves Floral Printed Kurta Dhoti Set - Purple', price: 703.12, mrp: 799, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/20840660a.webp' },
    ];

    const frequentlyBought = [
        { id: '21558034', name: 'Doodle Poodle 100% Cotton Interlock Knit Full Sleeves Tiger Printed T-Shirt & Lounge Pant Set With Cap & Mittens - Light Yellow', price: 337.31, mrp: 379, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/21558034a.webp' },
        { id: '21549954', name: 'Babyhug 100% Cotton Interlock Knit Full Sleeves Vehicle Printed Onesies With Leggings Cap & Booties - Navy Blue', price: 606.69, mrp: 749, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/21549954a.webp' },
        { id: '18347121', name: 'Babyhug 100% Cotton Knit Full Sleeves Onesies Bear Print Pack of 3- Multicolour', price: 368.59, mrp: 899, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/18347121a.webp' },
        { id: '15361457', name: 'Babyhug 100% Cotton Knit Half Sleeves Rompers with Crocodile Print Pack of 2 - Yellow & Green', price: 692.23, mrp: 899, image: '//cdn.fcglcdn.com/brainbees/images/products/280x338/15361457a.webp' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
                    <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
                    <Link href={`/boutique/${categorySlug}`} className="inline-block mt-4 text-orange-500 hover:underline">
                        Back to Boutique
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Add to Cart Success Message */}
            {showAddToCartMsg && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <Check size={16} />
                    <span>Item has been added to your cart</span>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-sm border-b">
                <nav className="flex items-center space-x-2">
                    <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                    <span className="text-gray-400">/</span>
                    <Link href="/boutiques" className="text-gray-600 hover:text-gray-900">Boutiques</Link>
                    <span className="text-gray-400">/</span>
                    <Link href={`/boutique/${categorySlug}`} className="text-gray-600 hover:text-gray-900 capitalize">{categorySlug}</Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 line-clamp-1">{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            {/* Main Product Section */}
            <section className="pinfosection max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Images - fixed height */}
                    <section id="prodImgInfo" className="sticky top-24 self-start">
                        <div className="flex gap-4">
                            {/* Thumbnail Slider */}
                            <div className="w-20 flex-shrink-0">
                                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                    {thumbnailImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`border-2 rounded cursor-pointer ${selectedImage === index ? 'border-orange-500' : 'border-gray-200'}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-auto" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Image with Zoom */}
                            <div className="flex-1 relative">
                                <button className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md">
                                    <Heart size={20} className="text-gray-600" />
                                </button>

                                <div
                                    ref={imageRef}
                                    className="relative overflow-hidden border rounded-lg cursor-crosshair"
                                    onMouseEnter={() => setShowZoom(true)}
                                    onMouseLeave={() => setShowZoom(false)}
                                    onMouseMove={handleMouseMove}
                                >
                                    <img
                                        src={productImages[selectedImage]}
                                        alt={product.name}
                                        className="w-full h-auto"
                                    />

                                    {/* View Similar */}
                                    <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-1 cursor-pointer">
                                        <span className="text-sm">View Similar</span>
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/similar-icon.svg" alt="" className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Zoom Lens */}
                                {showZoom && (
                                    <div
                                        className="absolute border-2 border-orange-500 bg-white bg-opacity-30 pointer-events-none"
                                        style={{
                                            left: `${zoomPosition.x}%`,
                                            top: `${zoomPosition.y}%`,
                                            width: '200px',
                                            height: '200px',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Zoom Container (separate for full zoom view) */}
                        {showZoom && (
                            <div className="fixed top-20 right-10 w-[400px] h-[500px] border shadow-2xl bg-white z-50 overflow-hidden hidden lg:block">
                                <div
                                    className="w-full h-full bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${productImages[selectedImage]?.replace('583x720', 'zoom')})`,
                                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                        backgroundSize: '200%',
                                    }}
                                />
                            </div>
                        )}
                    </section>

                    {/* Right Column - Product Info - Scrollable Container */}
                    {/* Right Column - Product Info - Scrollable Container with Hidden Scrollbar */}
                    <section
                        th-description=""
                        className="h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <div className="space-y-6 pb-8">
                            <h1 className="text-xl font-medium text-gray-900 mb-2">
                                <span className="font-bold">{product.brand}</span> {product.name}
                            </h1>

                            {/* Price */}
                            <p className="mb-4">
                                <span className="text-2xl font-bold text-gray-900">₹{product.defaultPrice.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">MRP: ₹{product.defaultMrp}</span>
                                <span className="ml-2 text-sm text-green-600">
                                    {Math.round((1 - product.defaultPrice / product.defaultMrp) * 100)}% OFF
                                </span>
                            </p>

                            {/* GST Info */}
                            <div className="mb-4 text-xs text-gray-500 flex items-center">
                                Sale price inclusive of all taxes (with applicable GST benefits)
                                <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                            </div>

                            {/* Best Price Section */}
                            <div className="mb-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/m/best_price_tag.png" alt="" className="h-8" />
                                        <div>
                                            <span className="text-xs text-gray-600">Get it as low as:</span>
                                            <span className="text-lg font-bold text-gray-900 ml-2">₹{product.defaultClubPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button className="text-xs text-blue-600">View details</button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Including coupons and Offers</p>
                            </div>

                            {/* Club Section */}
                            <div className="mb-4 bg-blue-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/m/newclub.png" alt="Club" className="h-5" />
                                        <span className="text-sm font-medium">Price: ₹{(product.defaultClubPrice - 15).toFixed(2)}</span>
                                    </div>
                                    <button className="text-xs text-blue-600">Join Now →</button>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-green-600">Add'l saving of ₹15.98</span>
                                    <span className="text-xs text-gray-400">|</span>
                                    <span className="text-xs flex items-center">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/club-cash-1.svg" alt="" className="w-3 h-3 mr-1" />
                                        Earn club cash ₹14*
                                    </span>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <section className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="font-bold">Size</label>
                                    <button
                                        onClick={() => setShowSizeChart(true)}
                                        className="text-xs text-blue-600"
                                    >
                                        SIZE CHART
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {sizes.map((size) => (
                                        <div key={size.id} className="relative">
                                            <button
                                                onClick={() => size.available && setSelectedSize(size.id)}
                                                disabled={!size.available}
                                                className={`
                                min-w-[60px] px-4 py-2 text-sm border rounded
                                ${selectedSize === size.id ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}
                                ${!size.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:border-orange-300'}
                            `}
                                            >
                                                {size.name}
                                            </button>
                                            {size.available && size.stock && size.stock <= 2 && (
                                                <span className="absolute -top-2 -right-2 text-xs text-orange-500 bg-white px-1 rounded">
                                                    {size.stock} left
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Delivery Pincode */}
                            <section className="mb-6">
                                <p className="font-bold mb-2">Delivery To</p>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={pincode}
                                        onChange={(e) => {
                                            setPincode(e.target.value.replace(/\D/g, ''));
                                            setPincodeValid(null);
                                        }}
                                        placeholder="Enter Pincode"
                                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                        onClick={handlePincodeCheck}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                    >
                                        Check
                                    </button>
                                </div>
                                {pincodeValid === true && (
                                    <p className="text-sm text-green-600 mt-1">Delivery available in your area</p>
                                )}
                                {pincodeValid === false && (
                                    <p className="text-sm text-red-600 mt-1">Delivery not available in your area</p>
                                )}

                                {/* Policy Icons */}
                                <div className="flex space-x-4 mt-4">
                                    <div className="flex items-center space-x-1">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/gift-item.svg" alt="" className="w-4 h-4" />
                                        <span className="text-xs text-gray-600">Gift Wrap</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/replacement-time-1.svg" alt="" className="w-4 h-4" />
                                        <span className="text-xs text-gray-600">7 days Return/Exchange</span>
                                    </div>
                                </div>
                            </section>

                            {/* Coupons Section */}
                            <section className="mb-6 border rounded-lg overflow-hidden">
                                <div className="border-b">
                                    <div className="flex">
                                        <button
                                            className={`flex-1 px-4 py-3 text-sm font-medium ${activeCouponTab === 'offers' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                                            onClick={() => setActiveCouponTab('offers')}
                                        >
                                            Offers and Discounts
                                        </button>
                                        <button
                                            className={`flex-1 px-4 py-3 text-sm font-medium ${activeCouponTab === 'bank' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                                            onClick={() => setActiveCouponTab('bank')}
                                        >
                                            Bank Offers
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 space-y-4">
                                    {activeCouponTab === 'offers' ? (
                                        coupons.map((coupon, idx) => (
                                            <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        {coupon.club && (
                                                            <div className="flex items-center space-x-1 mb-1">
                                                                <img src="//cdn.fcglcdn.com/brainbees/images/club_membership.svg" alt="" className="w-4 h-4" />
                                                                <span className="text-xs font-medium">{coupon.description.split('|')[0]}</span>
                                                            </div>
                                                        )}
                                                        <p className="text-sm">{coupon.club ? coupon.description.split('|')[1] || coupon.description : coupon.description}</p>
                                                    </div>
                                                    <button className="text-xs text-blue-600">T&C</button>
                                                </div>

                                                <div className="flex items-center space-x-2 mt-2">
                                                    <div className="flex-1 flex items-center">
                                                        <div className="bg-gray-900 text-white px-3 py-1 rounded-l text-sm font-mono">
                                                            {coupon.code}
                                                        </div>
                                                        <button
                                                            onClick={() => handleCopyCoupon(coupon.code)}
                                                            className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                                                        >
                                                            {copiedCoupon === coupon.code ? <Check size={14} /> : <Copy size={14} />}
                                                        </button>
                                                    </div>
                                                    <button className="text-xs text-blue-600 hover:underline">
                                                        View Products
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        bankOffers.map((offer, idx) => (
                                            <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                                                <div className="flex items-start space-x-3">
                                                    <img src="//cdn.fcglcdn.com/brainbees/images/bank_logo.svg" alt="" className="w-8 h-8" />
                                                    <div className="flex-1">
                                                        <p className="text-sm">{offer.offer}</p>
                                                        <button className="text-xs text-blue-600 mt-1">View T&C</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            {/* Product Information Accordion */}
                            <section className="mb-6 border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setShowProductInfo(!showProductInfo)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/product-1.svg" alt="" className="w-5 h-5" />
                                        <span className="font-medium">Product Information</span>
                                    </div>
                                    {showProductInfo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                {showProductInfo && (
                                    <div className="p-4 text-sm space-y-2">
                                        {productInfo.map((info, idx) => (
                                            <div key={idx} className="grid grid-cols-3 gap-2">
                                                <span className="text-gray-600">{info.label}:</span>
                                                <span className="col-span-2 text-gray-900">{info.value}</span>
                                            </div>
                                        ))}
                                        <div className="mt-2 text-xs text-gray-500">
                                            <span className="font-medium">Product ID:</span> {product.id}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Size Information Accordion */}
                            <section className="mb-6 border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setShowSizeInfo(!showSizeInfo)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/info-1.svg" alt="" className="w-5 h-5" />
                                        <span className="font-medium">Size Information & Material Care</span>
                                    </div>
                                    {showSizeInfo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                {showSizeInfo && (
                                    <div className="p-4 text-sm space-y-2">
                                        {sizeInfo.map((info, idx) => (
                                            <div key={idx} className="grid grid-cols-3 gap-2">
                                                <span className="text-gray-600">{info.label}:</span>
                                                <span className="col-span-2 text-gray-900 whitespace-pre-line">{info.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Brand Information Accordion */}
                            <section className="mb-6 border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setShowBrandInfo(!showBrandInfo)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/brand-info.svg" alt="" className="w-5 h-5" />
                                        <span className="font-medium">Brand Information</span>
                                        <span className="text-xs text-gray-500">Babyhug</span>
                                    </div>
                                    {showBrandInfo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                {showBrandInfo && (
                                    <div className="p-4">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/brands/621.webp" alt="Babyhug" className="h-12 mb-3" />
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            Babyhug is India's largest and most trusted baby care brand. When it comes to the needs of their little ones, countless mums can vouch for the convenience, safety, and quality that is synonymous with Babyhug. We put our hearts and souls into enhancing the parenting experience; a whole lot of care goes into each of our products.
                                        </p>
                                        <p className="text-sm text-gray-700 leading-relaxed mt-2">
                                            Our team is always on the lookout for innovations that help us cater to what parents are looking for. We keep communication channels open so that our customers can give us honest feedback so that our products keep evolving along the way. Babyhug India conforms to global quality standards, ensuring that our offerings are second to only a mother's hug.
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* Ratings & Reviews */}
                            <section className="mb-6 border rounded-lg p-4">
                                <h3 className="font-bold mb-3">Ratings & Reviews</h3>
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className="text-2xl text-gray-300">★</span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600 mt-2">
                                    Tap on the stars to Rate & Review this product
                                    <a href="/termsofuse" className="text-blue-600 ml-1">T&C</a>
                                </p>
                            </section>

                            {/* Follow Us */}
                            <section className="mb-6 border rounded-lg p-4">
                                <h3 className="font-bold mb-3">Follow Us to Get Featured</h3>
                                <div className="flex space-x-6">
                                    <a href="https://www.facebook.com/babyhug/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/facebook _mobile_icon.png" alt="" className="w-6 h-6" />
                                        <span className="text-sm">@Babyhug</span>
                                    </a>
                                    <a href="https://www.instagram.com/babyhug/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/instagram_mobile_icon.png" alt="" className="w-6 h-6" />
                                        <span className="text-sm">@Babyhug</span>
                                    </a>
                                </div>
                            </section>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </section>
                </div>
            </section>

            {/* You May Also Like */}
            <section className="max-w-7xl mx-auto px-4 py-8 border-t">
                <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {youMayAlsoLike.map((item) => (
                        <Link key={item.id} href={`/boutique/${categorySlug}/${item.id}`} className="group">
                            <div className="relative">
                                <img src={item.image} alt={item.name} className="w-full rounded-lg" />
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                    {Math.round((1 - item.price / item.mrp) * 100)}% OFF
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm line-clamp-2 group-hover:text-orange-600">{item.name}</p>
                                <p className="font-bold mt-1">₹{item.price.toFixed(2)}</p>
                                <p className="text-xs text-gray-500 line-through">₹{item.mrp}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Frequently Bought Together */}
            <section className="max-w-7xl mx-auto px-4 py-8 border-t">
                <h2 className="text-xl font-bold mb-6">Frequently Bought Together</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {frequentlyBought.map((item) => (
                        <Link key={item.id} href={`/boutique/${categorySlug}/${item.id}`} className="group">
                            <div className="relative">
                                <img src={item.image} alt={item.name} className="w-full rounded-lg" />
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                    {Math.round((1 - item.price / item.mrp) * 100)}% OFF
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm line-clamp-2 group-hover:text-orange-600">{item.name}</p>
                                <p className="font-bold mt-1">₹{item.price.toFixed(2)}</p>
                                <p className="text-xs text-gray-500 line-through">₹{item.mrp}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Size Chart Modal */}
            {showSizeChart && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSizeChart(false)} />
                    <div className="relative bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                            <h3 className="font-bold">Size Chart</h3>
                            <button onClick={() => setShowSizeChart(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <table className="w-full text-sm">
                                <tbody>
                                    {sizeInfo.slice(0, 8).map((info, idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="py-2 text-gray-600">{info.label}</td>
                                            <td className="py-2 font-medium">{info.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}