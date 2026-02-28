"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, ChevronDown, ChevronUp, Copy, Check, Info, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
    const [pincode, setPincode] = useState('');
    const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
    const [showProductInfo, setShowProductInfo] = useState(false);
    const [showBrandInfo, setShowBrandInfo] = useState(false);
    const [showSizeInfo, setShowSizeInfo] = useState(false);
    const [showAddToCartMsg, setShowAddToCartMsg] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [activeCouponTab, setActiveCouponTab] = useState('offers');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const { addToCart } = useCart();
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

    // Handle touch gestures for mobile image slider
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 150) {
            // Swipe left
            nextImage();
        }

        if (touchStart - touchEnd < -150) {
            // Swipe right
            prevImage();
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === productImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? productImages.length - 1 : prev - 1
        );
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current || window.innerWidth < 1024) return; // Disable zoom on mobile

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y });
    };

    const handlePincodeCheck = () => {
        if (pincode.length === 6) {
            setPincodeValid(Math.random() > 0.3);
        }
    };

    const handleCopyCoupon = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCoupon(code);
        setTimeout(() => setCopiedCoupon(null), 2000);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        setIsAdding(true);

        const price = product?.defaultPrice || 0;
        const mrp = product?.defaultMrp || 0;
        const clubPrice = product?.defaultClubPrice || 0;

        addToCart({
            productId: product.id,
            name: product.name,
            brand: product.brand,
            image: productImages[selectedImage] || product.defaultImage,
            price: price,
            mrp: mrp,
            clubPrice: clubPrice,
            quantity: 1,
            size: selectedSize || undefined,
            inStock: true,
            maxQuantity: 10,
            minQuantity: 1
        });

        setShowAddToCartMsg(true);

        setTimeout(() => {
            setIsAdding(false);
            setShowAddToCartMsg(false);
        }, 3000);
    };

    const sizes = [
        { id: 'nb', name: 'NB', available: true, stock: 5 },
        { id: '0-3m', name: '0-3M', available: false },
        { id: '3-6m', name: '3-6M', available: true, stock: 2 },
        { id: '6-9m', name: '6-9M', available: true, stock: 8 },
        { id: '9-12m', name: '9-12M', available: false },
        { id: '12-18m', name: '12-18M', available: true },
        { id: '18-24m', name: '18-24M', available: false },
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800">Product Not Found</h1>
                    <p className="text-sm text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
                    <Link href={`/boutique/${categorySlug}`} className="inline-block mt-4 text-orange-500 hover:underline">
                        Back to Boutique
                    </Link>
                </div>
            </div>
        );
    }

    const discount = Math.round((1 - product.defaultPrice / product.defaultMrp) * 100);

    return (
        <div className="bg-white min-h-screen">
            {/* Add to Cart Success Message */}
            {showAddToCartMsg && (
                <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce text-sm">
                    <Check size={16} />
                    <span className="font-medium">Item added to cart!</span>
                </div>
            )}

            {/* Breadcrumb - Fixed */}
            <div className="max-w-7xl mx-auto px-3 py-2 text-xs border-b">
                <nav className="flex items-center flex-wrap gap-y-1">
                    <Link href="/" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">Home</Link>
                    <span className="text-gray-400 mx-1">/</span>
                    <Link href="/boutiques" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">Boutiques</Link>
                    <span className="text-gray-400 mx-1">/</span>
                    <Link href={`/boutique/${categorySlug}`} className="text-gray-600 hover:text-gray-900 capitalize whitespace-nowrap">{categorySlug}</Link>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-900 truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <section className="max-w-7xl mx-auto px-3 py-4">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    {/* Left Column - Images */}
                    <div className="mb-6 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
                        {/* Mobile Image Slider */}
                        <div className="lg:hidden">
                            <div
                                className="relative"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <img
                                    src={productImages[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-auto rounded-lg"
                                />

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                {/* Image Counter */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                    {currentImageIndex + 1} / {productImages.length}
                                </div>

                                {/* Wishlist Button */}
                                <button className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                                    <Heart size={18} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
                                {thumbnailImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`flex-shrink-0 w-16 border-2 rounded cursor-pointer transition-all ${currentImageIndex === index ? 'border-orange-500' : 'border-gray-200'
                                            }`}
                                        onClick={() => {
                                            setCurrentImageIndex(index);
                                            setSelectedImage(index);
                                        }}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-auto" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Image Section */}
                        <div className="hidden lg:flex lg:gap-4">
                            {/* Thumbnail Slider */}
                            <div className="w-20 flex-shrink-0">
                                <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-hide">
                                    {thumbnailImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`border-2 rounded cursor-pointer ${selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                                                }`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-auto" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Image with Zoom */}
                            <div className="flex-1 relative">
                                <button className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
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
                                </div>
                            </div>
                        </div>

                        {/* Desktop Zoom Container */}
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
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="lg:max-w-2xl">
                        <div className="space-y-4">
                            {/* Product Title */}
                            <div>
                                <span className="font-bold text-gray-900">{product.brand}</span>
                                <h1 className="text-sm text-gray-700 mt-1">{product.name}</h1>
                            </div>

                            {/* Price Section */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-gray-900">₹{product.defaultPrice.toFixed(2)}</span>
                                    <span className="text-xs text-gray-500 line-through">MRP: ₹{product.defaultMrp}</span>
                                    <span className="text-xs text-green-600 font-medium px-2 py-0.5 bg-green-50 rounded">
                                        {discount}% OFF
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Sale price inclusive of all taxes</p>
                            </div>

                            {/* Best Price Section */}
                            <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-600">Best Price:</span>
                                    <span className="text-base font-bold text-gray-900">₹{product.defaultClubPrice.toFixed(2)}</span>
                                </div>
                                <button className="text-xs text-blue-600 hover:underline">Details</button>
                            </div>

                            {/* Club Section */}
                            <div className="bg-blue-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/m/newclub.png" alt="Club" className="h-5" />
                                        <span className="text-xs font-medium">Club: ₹{(product.defaultClubPrice - 15).toFixed(2)}</span>
                                    </div>
                                    <button className="text-xs text-blue-600 hover:underline">Join →</button>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-green-600">Save ₹15.98</span>
                                    <span className="text-xs text-gray-400">|</span>
                                    <span className="text-xs flex items-center">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/club-cash-1.svg" alt="" className="w-3 h-3 mr-1" />
                                        Earn ₹14 cash
                                    </span>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="font-medium text-sm">Size <span className="text-red-500">*</span></label>
                                    <button
                                        onClick={() => setShowSizeChart(true)}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        SIZE CHART
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <div key={size.id} className="relative">
                                            <button
                                                onClick={() => size.available && setSelectedSize(size.id)}
                                                disabled={!size.available}
                                                className={`
                                                    min-w-[50px] px-3 py-1.5 text-xs border rounded transition-all
                                                    ${selectedSize === size.id ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium' : 'border-gray-300'}
                                                    ${!size.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : 'hover:border-orange-300'}
                                                `}
                                            >
                                                {size.name}
                                            </button>
                                            {size.available && size.stock && size.stock <= 2 && (
                                                <span className="absolute -top-2 -right-2 text-[10px] text-orange-500 bg-white px-1 rounded border border-orange-200">
                                                    {size.stock} left
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {!selectedSize && (
                                    <p className="text-xs text-red-500 mt-2">Please select a size</p>
                                )}
                            </div>

                            {/* Delivery Pincode */}
                            <div>
                                <p className="font-medium text-sm mb-2">Delivery To</p>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={pincode}
                                        onChange={(e) => {
                                            setPincode(e.target.value.replace(/\D/g, ''));
                                            setPincodeValid(null);
                                        }}
                                        placeholder="Enter Pincode"
                                        className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                        onClick={handlePincodeCheck}
                                        className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                                    >
                                        Check
                                    </button>
                                </div>
                                {pincodeValid === true && (
                                    <p className="text-xs text-green-600 mt-1">✓ Delivery available</p>
                                )}
                                {pincodeValid === false && (
                                    <p className="text-xs text-red-600 mt-1">✗ Not available</p>
                                )}

                                {/* Policy Icons */}
                                <div className="flex flex-wrap gap-4 mt-3">
                                    <div className="flex items-center space-x-1">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/gift-item.svg" alt="" className="w-4 h-4" />
                                        <span className="text-xs text-gray-600">Gift Wrap</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/replacement-time-1.svg" alt="" className="w-4 h-4" />
                                        <span className="text-xs text-gray-600">7 days Return</span>
                                    </div>
                                </div>
                            </div>

                            {/* Coupons Section */}
                            <section className="border rounded-lg overflow-hidden">
                                <div className="border-b">
                                    <div className="flex">
                                        <button
                                            className={`flex-1 px-4 py-3 text-xs font-medium transition-colors ${activeCouponTab === 'offers' ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                            onClick={() => setActiveCouponTab('offers')}
                                        >
                                            Offers
                                        </button>
                                        <button
                                            className={`flex-1 px-4 py-3 text-xs font-medium transition-colors ${activeCouponTab === 'bank' ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                            onClick={() => setActiveCouponTab('bank')}
                                        >
                                            Bank Offers
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
                                    {activeCouponTab === 'offers' ? (
                                        coupons.map((coupon, idx) => (
                                            <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1 pr-2">
                                                        {coupon.club && (
                                                            <div className="flex items-center space-x-1 mb-1">
                                                                <img src="//cdn.fcglcdn.com/brainbees/images/club_membership.svg" alt="" className="w-3 h-3" />
                                                                <span className="text-xs font-medium text-blue-600">Club</span>
                                                            </div>
                                                        )}
                                                        <p className="text-xs">{coupon.description}</p>
                                                    </div>
                                                    <button className="text-xs text-blue-600 hover:underline">T&C</button>
                                                </div>

                                                <div className="flex items-center space-x-2 mt-2">
                                                    <div className="flex-1 flex items-center">
                                                        <div className="bg-gray-900 text-white px-2 py-1 rounded-l text-xs font-mono">
                                                            {coupon.code}
                                                        </div>
                                                        <button
                                                            onClick={() => handleCopyCoupon(coupon.code)}
                                                            className="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300 transition-colors"
                                                        >
                                                            {copiedCoupon === coupon.code ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                                                        </button>
                                                    </div>
                                                    <button className="text-xs text-blue-600 hover:underline">
                                                        View
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
                                                        <p className="text-xs">{offer.offer}</p>
                                                        <button className="text-xs text-blue-600 mt-1 hover:underline">T&C</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            {/* Product Information Accordion */}
                            <section className="border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setShowProductInfo(!showProductInfo)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/product-1.svg" alt="" className="w-4 h-4" />
                                        <span className="text-xs font-medium">Product Information</span>
                                    </div>
                                    {showProductInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                {showProductInfo && (
                                    <div className="p-4 text-xs space-y-2 max-h-60 overflow-y-auto">
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
                            <section className="border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setShowSizeInfo(!showSizeInfo)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/info-1.svg" alt="" className="w-4 h-4" />
                                        <span className="text-xs font-medium">Size Information & Material Care</span>
                                    </div>
                                    {showSizeInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                {showSizeInfo && (
                                    <div className="p-4 text-xs space-y-2 max-h-60 overflow-y-auto">
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
                            <section className="border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setShowBrandInfo(!showBrandInfo)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/ng/m/brand-info.svg" alt="" className="w-4 h-4" />
                                        <span className="text-xs font-medium">Brand Information</span>
                                    </div>
                                    {showBrandInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                {showBrandInfo && (
                                    <div className="p-4">
                                        <img src="//cdn.fcglcdn.com/brainbees/images/brands/621.webp" alt="Babyhug" className="h-8 mb-3" />
                                        <p className="text-xs text-gray-700 leading-relaxed">
                                            Babyhug is India's largest and most trusted baby care brand...
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* Ratings */}
                            <section className="border rounded-lg p-4">
                                <h3 className="font-medium text-sm mb-2">Ratings & Reviews</h3>
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className="text-xl text-gray-300">★</span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600 mt-2">
                                    Tap on the stars to Rate & Review this product
                                </p>
                            </section>

                            {/* ADD TO CART Button - Visible on all devices, NOT sticky */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className={`
                                    w-full py-3 rounded-lg font-bold text-base transition-all mt-4
                                    ${isAdding
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-orange-500 text-white hover:bg-orange-600'
                                    }
                                `}
                            >
                                {isAdding ? 'ADDED ✓' : 'ADD TO CART'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* You May Also Like */}
            <section className="max-w-7xl mx-auto px-3 py-6 border-t mt-4">
                <h2 className="text-base font-bold mb-4">You May Also Like</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {youMayAlsoLike.map((item) => (
                        <Link key={item.id} href={`/boutique/${categorySlug}/${item.id}`} className="group">
                            <div className="relative overflow-hidden rounded-lg">
                                <img src={item.image} alt={item.name} className="w-full transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded">
                                    {Math.round((1 - item.price / item.mrp) * 100)}% OFF
                                </div>
                            </div>
                            <div className="mt-1">
                                <p className="text-xs line-clamp-2 group-hover:text-orange-600">{item.name}</p>
                                <p className="font-bold text-xs mt-1">₹{item.price.toFixed(2)}</p>
                                <p className="text-[10px] text-gray-500 line-through">₹{item.mrp}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Size Chart Modal */}
            {showSizeChart && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSizeChart(false)} />
                    <div className="relative bg-white rounded-t-lg sm:rounded-lg w-full sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-3 flex justify-between items-center">
                            <h3 className="font-bold text-sm">Size Chart</h3>
                            <button onClick={() => setShowSizeChart(false)} className="hover:bg-gray-100 p-1 rounded-full">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-4">
                            <table className="w-full text-xs">
                                <tbody>
                                    {sizeInfo.slice(0, 8).map((info, idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="py-2 text-gray-600 font-medium pr-2">{info.label}</td>
                                            <td className="py-2 text-gray-900">{info.value}</td>
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