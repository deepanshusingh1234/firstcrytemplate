"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";

// Import your boutique data
import boutiquesData from "@/data/boutiques/holi-celebrations.json";

// Define types
interface Boutique {
    id: string;
    name: string;
    image: string;
    endDate: string;
    description: string;
    gender?: string[];
    age?: string[];
    subcategories?: string[];
    brands?: string[];
}

interface FilterOption {
    pcheck: string;
    name: string;
    doc_count: number;
    mcategory?: string;
}

interface FilterCategory {
    title: string;
    dataCategory: string;
    options: FilterOption[];
    dataJson?: any;
}

const BoutiquesPage = () => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [showAllFilters, setShowAllFilters] = useState<Record<string, boolean>>({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupCategory, setPopupCategory] = useState<string>("");
    const [popupDetails, setPopupDetails] = useState<string>("");
    const [popupOptions, setPopupOptions] = useState<FilterOption[]>([]);
    const [tempSelectedFilters, setTempSelectedFilters] = useState<Record<string, string[]>>({});
    const [isLoading, setIsLoading] = useState(true);

    // Mock boutiques data (in real app, this would come from your API)
    const [boutiques, setBoutiques] = useState<Boutique[]>([
        {
            id: "38715",
            name: "Holi Celebrations",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38715.webp",
            endDate: "3/31/2026 9:30:00 AM",
            description: "Explore T-shirt, Ethnic wear, party wear & More"
        },
        {
            id: "38807",
            name: "Festive Ethnic for Holi | Upto to 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38807.webp",
            endDate: "3/2/2026 9:30:00 AM",
            description: "Explore Now"
        },
        {
            id: "38721",
            name: "Spring It On | Upto to 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38721.webp",
            endDate: "3/15/2026 9:30:00 AM",
            description: "New Arrivals"
        },
        {
            id: "38479",
            name: "Breathable. Stretchable. Baby-Approved.",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38479.webp",
            endDate: "2/28/2026 9:30:00 AM",
            description: "Brand Logo- powered by babyhug"
        },
        {
            id: "38842",
            name: "Urban & Stylish",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38842.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Casual Wear Winter Wear & More",

        },
        {
            id: "38480",
            name: "Cozy Onesies Collection",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38480.webp",
            endDate: "2/28/2026 9:30:00 AM",
            description: "Explore Now"
        },
        {
            id: "38833",
            name: "Splash into Holi | Upto to 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38833.webp",
            endDate: "3/4/2026 9:30:00 AM",
            description: "Shop t-shirts, onesies & More"
        },
        {
            id: "38839",
            name: "Cute Everyday Must-Haves | Up to 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38839.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Shop Tees, Sets & More",

        },
        {
            id: "38840",
            name: "Value Essentials | Up to 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38840.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Explore Multipacks for Daily Use",

        },
        {
            id: "38841",
            name: "Everyday Bottoms| Upto to 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38841.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Shop Shorts, skirts & more",

        },
        {
            id: "38843",
            name: "Rang Barse Edit | Upto to 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38843.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Shop Onesies, Tops & more",

        },
        {
            id: "38844",
            name: "Styles Kids Love to wear | Upto to 14y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38844.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Shop Now",

        },
        {
            id: "38845",
            name: "Soft & Snug Essentials | Up To 14Y",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38845.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Shop must-have innerwear for your little stars!",

        },
        {
            id: "38846",
            name: "Nourish Happy Moments With Feeding Essentials",
            image: "//cdn.fcglcdn.com/brainbees/images/boutique/300x300/38846.webp",
            endDate: "3/5/2026 9:30:00 AM",
            description: "Up to 50%",

        }
    ]);

    // Filter categories based on the HTML
    const filterCategories: FilterCategory[] = [
        {
            title: "Gender",
            dataCategory: "gender",
            options: [
                { pcheck: "both", name: "Unisex", doc_count: 42 },
                { pcheck: "female", name: "Girl", doc_count: 48 },
                { pcheck: "male", name: "Boy", doc_count: 46 }
            ]
        },
        {
            title: "Age",
            dataCategory: "age",
            options: [
                { pcheck: "0", name: "0-3 Months", doc_count: 40 },
                { pcheck: "1", name: "3-6 Months", doc_count: 40 },
                { pcheck: "2", name: "6-9 Months", doc_count: 40 },
                { pcheck: "3", name: "9-12 Months", doc_count: 40 },
                { pcheck: "4", name: "12-18 Months", doc_count: 42 },
                { pcheck: "5", name: "18-24 Months", doc_count: 44 },
                { pcheck: "6", name: "2-4 Years", doc_count: 45 },
                { pcheck: "7", name: "4-6 Years", doc_count: 46 },
                { pcheck: "8", name: "6-8 Years", doc_count: 46 },
                { pcheck: "9", name: "8-10 Years", doc_count: 46 },
                { pcheck: "10", name: "10-12 Years", doc_count: 46 },
                { pcheck: "11", name: "12+ Years", doc_count: 46 },
                { pcheck: "27", name: "New born", doc_count: 28 },
                { pcheck: "15", name: "Preemie", doc_count: 24 }
            ],
            dataJson: {
                "0-9": { "": { "pcheck": "11", "name": "12+ Years", "doc_count": 46 } },
                "N": { "": { "pcheck": "27", "name": "New born", "doc_count": 28 } },
                "P": { "": { "pcheck": "15", "name": "Preemie", "doc_count": 24 } }
            }
        },
        {
            title: "Subcategory",
            dataCategory: "subcategories",
            options: [
                { pcheck: "378", name: "Academic Books", doc_count: 1, mcategory: "11" },
                { pcheck: "416", name: "Action & Adventure", doc_count: 1, mcategory: "85" },
                { pcheck: "417", name: "Animals & Pets", doc_count: 1, mcategory: "85" },
                { pcheck: "418", name: "Arts & Photography", doc_count: 1, mcategory: "85" },
                { pcheck: "860", name: "Athleisure & Sportswear", doc_count: 3, mcategory: "6" },
                { pcheck: "65", name: "Baby Bedding Sets & Pillows", doc_count: 1, mcategory: "8" },
                { pcheck: "13", name: "Baby Creams & Ointments", doc_count: 1, mcategory: "3" },
                { pcheck: "136", name: "Baby Furniture", doc_count: 1, mcategory: "8" },
                { pcheck: "37", name: "Breast Feeding", doc_count: 1, mcategory: "2" },
                { pcheck: "424", name: "Crafts, Hobbies & Practical Interests", doc_count: 1, mcategory: "85" },
                { pcheck: "140", name: "Drawing & Colouring Books", doc_count: 1, mcategory: "11" },
                { pcheck: "260", name: "Eye Wear", doc_count: 2, mcategory: "22" },
                { pcheck: "113", name: "Fun & Educational CDs/DVDs", doc_count: 1, mcategory: "11" },
                { pcheck: "456", name: "Growing Up & Facts of Life", doc_count: 1, mcategory: "85" },
                { pcheck: "1703", name: "Home Storage and Organization", doc_count: 1, mcategory: "1700" },
                { pcheck: "461", name: "Interactive & Activity Books", doc_count: 1, mcategory: "85" },
                { pcheck: "1705", name: "Kitchen & Home Appliances", doc_count: 1, mcategory: "1700" },
                { pcheck: "1706", name: "Luggage & Travel", doc_count: 2, mcategory: "1700" },
                { pcheck: "137", name: "Mosquito Nets", doc_count: 1, mcategory: "8" },
                { pcheck: "229", name: "Nursing/Sleep Wear", doc_count: 3, mcategory: "21" },
                { pcheck: "164", name: "Onesies & Rompers", doc_count: 19, mcategory: "6" },
                { pcheck: "49", name: "Play Gyms & Playmats", doc_count: 1, mcategory: "5" },
                { pcheck: "123", name: "Rhymes and Poetry Books", doc_count: 1, mcategory: "11" },
                { pcheck: "276", name: "Swim Wear", doc_count: 5, mcategory: "6" },
                { pcheck: "147", name: "Travel Accessories", doc_count: 1, mcategory: "8" },
                { pcheck: "275", name: "Watches", doc_count: 7, mcategory: "22" }
            ],
            dataJson: {
                "A": { "860": { "pcheck": "860", "mcategory": "6", "name": "Athleisure & Sportswear", "doc_count": 3 } },
                "B": { "37": { "pcheck": "37", "mcategory": "2", "name": "Breast Feeding", "doc_count": 1 } },
                "C": { "424": { "pcheck": "424", "mcategory": "85", "name": "Crafts, Hobbies & Practical Interests", "doc_count": 1 } },
                "D": { "140": { "pcheck": "140", "mcategory": "11", "name": "Drawing & Colouring Books", "doc_count": 1 } },
                "E": { "260": { "pcheck": "260", "mcategory": "22", "name": "Eye Wear", "doc_count": 2 } },
                "F": { "113": { "pcheck": "113", "mcategory": "11", "name": "Fun & Educational CDs/DVDs", "doc_count": 1 } },
                "G": { "456": { "pcheck": "456", "mcategory": "85", "name": "Growing Up & Facts of Life", "doc_count": 1 } },
                "H": { "1703": { "pcheck": "1703", "mcategory": "1700", "name": "Home Storage and Organization", "doc_count": 1 } },
                "I": { "461": { "pcheck": "461", "mcategory": "85", "name": "Interactive & Activity Books", "doc_count": 1 } },
                "K": { "1705": { "pcheck": "1705", "mcategory": "1700", "name": "Kitchen & Home Appliances", "doc_count": 1 } },
                "L": { "1706": { "pcheck": "1706", "mcategory": "1700", "name": "Luggage & Travel", "doc_count": 2 } },
                "M": { "137": { "pcheck": "137", "mcategory": "8", "name": "Mosquito Nets", "doc_count": 1 } },
                "N": { "229": { "pcheck": "229", "mcategory": "21", "name": "Nursing/Sleep Wear", "doc_count": 3 } },
                "O": { "164": { "pcheck": "164", "mcategory": "6", "name": "Onesies & Rompers", "doc_count": 19 } },
                "P": { "49": { "pcheck": "49", "mcategory": "5", "name": "Play Gyms & Playmats", "doc_count": 1 } },
                "R": { "123": { "pcheck": "123", "mcategory": "11", "name": "Rhymes and Poetry Books", "doc_count": 1 } },
                "S": { "276": { "pcheck": "276", "mcategory": "6", "name": "Swim Wear", "doc_count": 5 } },
                "T": { "147": { "pcheck": "147", "mcategory": "8", "name": "Travel Accessories", "doc_count": 1 } },
                "W": { "275": { "pcheck": "275", "mcategory": "22", "name": "Watches", "doc_count": 7 } }
            }
        },
        {
            title: "Brands",
            dataCategory: "brands",
            options: [
                { pcheck: "1006846", name: "Rummikub", doc_count: 1 },
                { pcheck: "1010333", name: "&Circus", doc_count: 2 },
                { pcheck: "1006168", name: "3PIN", doc_count: 4 },
                { pcheck: "1009233", name: "999Store", doc_count: 2 },
                { pcheck: "1003183", name: "A Little Fable", doc_count: 1 },
                { pcheck: "1006704", name: "A Toddler Thing", doc_count: 1 },
                { pcheck: "1005311", name: "A&A Kreative Box", doc_count: 3 },
                { pcheck: "1007771", name: "A'pieu", doc_count: 1 },
                { pcheck: "1008976", name: "Azhari", doc_count: 4 },
                { pcheck: "1008964", name: "Byora Homes", doc_count: 1 },
                { pcheck: "1010580", name: "CutTales", doc_count: 2 },
                { pcheck: "1008994", name: "Dwij Products", doc_count: 2 },
                { pcheck: "1006899", name: "Expelite", doc_count: 1 },
                { pcheck: "1010672", name: "furr balls", doc_count: 3 },
                { pcheck: "1008041", name: "GYANOTOY", doc_count: 1 },
                { pcheck: "1010970", name: "HVNLY by shoetopia", doc_count: 1 },
                { pcheck: "1007280", name: "iVOOMi", doc_count: 1 },
                { pcheck: "1009555", name: "JUST BAGS", doc_count: 1 },
                { pcheck: "1009870", name: "Kyari", doc_count: 1 },
                { pcheck: "1009006", name: "LuvLittle", doc_count: 4 },
                { pcheck: "1007906", name: "Mystiq Living", doc_count: 1 },
                { pcheck: "1010971", name: "NZS", doc_count: 1 },
                { pcheck: "1005341", name: "OYO BABY", doc_count: 1 },
                { pcheck: "1006394", name: "Putchi", doc_count: 2 },
                { pcheck: "1008121", name: "Qvink", doc_count: 2 },
                { pcheck: "754", name: "Rustic Art", doc_count: 1 },
                { pcheck: "1010272", name: "Synlark", doc_count: 2 },
                { pcheck: "1009648", name: "Typhoon", doc_count: 1 },
                { pcheck: "1008400", name: "USHA SHRIRAM", doc_count: 1 },
                { pcheck: "1005585", name: "VParents", doc_count: 3 },
                { pcheck: "1009601", name: "WudnKrafts", doc_count: 1 },
                { pcheck: "1008639", name: "Xtouch", doc_count: 1 },
                { pcheck: "1006712", name: "Yunicorn Max", doc_count: 1 },
                { pcheck: "1007036", name: "Zyozi", doc_count: 2 }
            ],
            dataJson: {
                "0-9": { "1009233": { "pcheck": "1009233", "name": "999Store", "doc_count": 2 } },
                "A": { "1008976": { "pcheck": "1008976", "name": "Azhari", "doc_count": 4 } },
                "B": { "1008964": { "pcheck": "1008964", "name": "Byora Homes", "doc_count": 1 } },
                "C": { "1010580": { "pcheck": "1010580", "name": "CutTales", "doc_count": 2 } },
                "D": { "1008994": { "pcheck": "1008994", "name": "Dwij Products", "doc_count": 2 } },
                "E": { "1006899": { "pcheck": "1006899", "name": "Expelite", "doc_count": 1 } },
                "F": { "1010672": { "pcheck": "1010672", "name": "furr balls", "doc_count": 3 } },
                "G": { "1008041": { "pcheck": "1008041", "name": "GYANOTOY", "doc_count": 1 } },
                "H": { "1010970": { "pcheck": "1010970", "name": "HVNLY by shoetopia", "doc_count": 1 } },
                "I": { "1007280": { "pcheck": "1007280", "name": "iVOOMi", "doc_count": 1 } },
                "J": { "1009555": { "pcheck": "1009555", "name": "JUST BAGS", "doc_count": 1 } },
                "K": { "1009870": { "pcheck": "1009870", "name": "Kyari", "doc_count": 1 } },
                "L": { "1009006": { "pcheck": "1009006", "name": "LuvLittle", "doc_count": 4 } },
                "M": { "1007906": { "pcheck": "1007906", "name": "Mystiq Living", "doc_count": 1 } },
                "N": { "1010971": { "pcheck": "1010971", "name": "NZS", "doc_count": 1 } },
                "O": { "1005341": { "pcheck": "1005341", "name": "OYO BABY", "doc_count": 1 } },
                "P": { "1006394": { "pcheck": "1006394", "name": "Putchi", "doc_count": 2 } },
                "Q": { "1008121": { "pcheck": "1008121", "name": "Qvink", "doc_count": 2 } },
                "R": { "754": { "pcheck": "754", "name": "Rustic Art", "doc_count": 1 } },
                "S": { "1010272": { "pcheck": "1010272", "name": "Synlark", "doc_count": 2 } },
                "T": { "1009648": { "pcheck": "1009648", "name": "Typhoon", "doc_count": 1 } },
                "U": { "1008400": { "pcheck": "1008400", "name": "USHA SHRIRAM", "doc_count": 1 } },
                "V": { "1005585": { "pcheck": "1005585", "name": "VParents", "doc_count": 3 } },
                "W": { "1009601": { "pcheck": "1009601", "name": "WudnKrafts", "doc_count": 1 } },
                "X": { "1008639": { "pcheck": "1008639", "name": "Xtouch", "doc_count": 1 } },
                "Y": { "1006712": { "pcheck": "1006712", "name": "Yunicorn Max", "doc_count": 1 } },
                "Z": { "1007036": { "pcheck": "1007036", "name": "Zyozi", "doc_count": 2 } },
                "&": { "1010333": { "pcheck": "1010333", "name": "&Circus", "doc_count": 2 } }
            }
        }
    ];

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleFilterClick = (category: string) => {
        setActiveFilter(activeFilter === category ? null : category);
    };

    const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
        setSelectedFilters(prev => {
            const current = prev[category] || [];
            if (checked) {
                return { ...prev, [category]: [...current, value] };
            } else {
                return { ...prev, [category]: current.filter(v => v !== value) };
            }
        });
    };

    const handleClearAll = () => {
        setSelectedFilters({});
    };

    const handleViewAll = (category: string, details: string, options: FilterOption[], dataJson: any) => {
        setPopupCategory(category);
        setPopupDetails(details);
        setPopupOptions(options);
        setTempSelectedFilters({ ...selectedFilters });
        setShowPopup(true);
        // eslint-disable-next-line react-hooks/immutability
        document.body.style.overflow = 'hidden';
    };

    const handlePopupCheckboxChange = (category: string, value: string, checked: boolean) => {
        setTempSelectedFilters(prev => {
            const current = prev[category] || [];
            if (checked) {
                return { ...prev, [category]: [...current, value] };
            } else {
                return { ...prev, [category]: current.filter(v => v !== value) };
            }
        });
    };

    const handlePopupApply = () => {
        setSelectedFilters(tempSelectedFilters);
        setShowPopup(false);
        document.body.style.overflow = 'auto';
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        document.body.style.overflow = 'auto';
    };

    const getTimerDisplayValue = (endDate: string): string => {
        const dateFuture = new Date(endDate);
        const dateNow = new Date();

        const diffTime = dateFuture.getTime() - dateNow.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (diffDays > 10) {
            return "Boutique open until stocks last";
        } else if (diffDays > 0) {
            return `Boutique ends in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
        } else if (diffHours > 0) {
            return `Boutique ends in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
        } else {
            return "Boutique ending now";
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner">
                    <Image
                        src="//cdn.fcglcdn.com/brainbees/images/n/ajax-loader.gif"
                        alt="Loading..."
                        width={50}
                        height={50}
                        unoptimized
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Banner Image - Only using the header image from HTML */}
            <div className="intro-banner" style={{ backgroundColor: '#222222' }}>
                <div className="w-full">
                    <Image
                        src="//cdn.fcglcdn.com/brainbees/images/boutique/994x190/Boutiques-landing-banner.webp"
                        alt="Firstcry Premium Store"
                        width={1366}
                        height={190}
                        className="w-full h-auto object-cover"
                        unoptimized
                    />
                </div>
            </div>

            {/* Menu Navigation */}
            <div className="gl-menu border-b border-gray-200">
                <div className="max-w-[1366px] mx-auto">
                    <ul className="flex items-center space-x-8 py-3 px-4 text-sm">
                        <li className="active font-bold text-orange-500 border-b-2 border-orange-500 pb-2">
                            <button className="cursor-pointer">TODAY&apos;S BOUTIQUES</button>
                        </li>
                        <li>
                            <Link href="/boutiques/popular?ref2=best_sellers" className="text-gray-700 hover:text-gray-900">
                                BEST SELLERS
                            </Link>
                        </li>
                        <li>
                            <Link href="/boutiques/ending-today?ref2=last_day" className="text-gray-700 hover:text-gray-900">
                                LAST DAY
                            </Link>
                        </li>
                        <li className="relative group">
                            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                                <span>SHOP BY CATEGORY</span>
                                <ChevronDown size={14} />
                            </button>
                            <ul className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg border rounded-lg hidden group-hover:block z-10">
                                <li className="border-b">
                                    <Link href="/premium-store/baby-kids-clothes/6/0/0?age=0,1,2,3,4,5&sort=newarrivals&ref2=premium_store_shopbycat" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        Baby Clothes
                                    </Link>
                                </li>
                                <li className="border-b">
                                    <Link href="/premium-store/moms-and-maternity/21/0/0?sort=newarrivals&ref2=premium_store_shopbycat" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        Moms & Maternity
                                    </Link>
                                </li>
                                <li className="border-b">
                                    <Link href="/premium-store/baby-kids-clothes/6/0/0?age=6,7,8,9,10,11&sort=newarrivals&ref2=premium_store_shopbycat" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        Kids Clothes
                                    </Link>
                                </li>
                                <li className="border-b">
                                    <Link href="/premium-store/diapering/1/0/0?sort=newarrivals&ref2=premium_store_shopbycat" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        Baby Diapering
                                    </Link>
                                </li>
                                <li className="border-b">
                                    <Link href="/premium-store/footwear/6/170/0?sort=newarrivals&ref2=premium_store_shopbycat" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        Footwear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="relative group">
                            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                                <span>SHOP BY AGE</span>
                                <ChevronDown size={14} />
                            </button>
                            <ul className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg border rounded-lg hidden group-hover:block z-10">
                                <li className="border-b">
                                    <Link href="/premium-store/all-products?searchstring=brand@@@@1@0@20@@~0~1~2~3@@@@@@@@@@@@@@&sort=newarrivals&ref2=premium_store_shopbyage" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        0 - 12 Months
                                    </Link>
                                </li>
                                <li className="border-b">
                                    <Link href="/premium-store/all-products?searchstring=brand@@@@1@0@20@@~4~5@@@@@@@@@@@@@@&sort=newarrivals&ref2=premium_store_shopbyage" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        12 - 24 Months
                                    </Link>
                                </li>
                                <li className="border-b">
                                    <Link href="/premium-store/all-products?searchstring=brand@@@@1@0@20@@~6@@@@@@@@@@@@@@&sort=newarrivals&ref2=premium_store_shopbyage" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        2 - 4 Years
                                    </Link>
                                </li>
                                <li className="border-b">
                                    <Link href="/premium-store/all-products?searchstring=brand@@@@1@0@20@@~7@@@@@@@@@@@@@@&sort=newarrivals&ref2=premium_store_shopbyage" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        4 - 6 Years
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/premium-store/all-products?searchstring=brand@@@@1@0@20@@~8@@@@@@@@@@@@@@&sort=newarrivals&ref2=premium_store_shopbyage" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                        6 - 8 Years
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Filter Section */}
            <div className="filter-main-wrap bg-gray-50 py-4">
                <div className="max-w-[1366px] mx-auto px-4">
                    <div id="myfilter">
                        <div className="filter-tab flex justify-between items-center">
                            <div className="div-ib lft">
                                <ul className="flex items-center space-x-6">
                                    <li className="text-sm font-medium text-gray-700">Filter Boutiques By:</li>
                                    {filterCategories.map((category) => (
                                        <li key={category.dataCategory}>
                                            <button
                                                className={`text-sm hover:text-orange-500 transition-colors ${activeFilter === category.dataCategory ? 'text-orange-500 font-medium' : 'text-gray-600'
                                                    }`}
                                                onClick={() => handleFilterClick(category.dataCategory)}
                                            >
                                                {category.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="div-right">
                                <div className="div-ib">
                                    <span className="topr text-sm text-gray-600">(Showing {boutiques.length} Boutiques)</span>
                                </div>
                            </div>
                        </div>

                        {/* Active Filter Options */}
                        <div className="tab-wrap myptabdetails mt-4">
                            {activeFilter && filterCategories.map((category) => (
                                category.dataCategory === activeFilter && (
                                    <div
                                        key={category.dataCategory}
                                        className="tab-options pcontents tab bg-white border rounded-lg p-4"
                                        id={`flTab${category.title}`}
                                        data-category={category.dataCategory}
                                        data-details={category.title}
                                    >
                                        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {category.options.slice(0, 8).map((option) => (
                                                <li key={option.pcheck} className="filtersquaredFour">
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox h-4 w-4 text-orange-500 rounded"
                                                            checked={selectedFilters[category.dataCategory]?.includes(option.pcheck) || false}
                                                            onChange={(e) => handleCheckboxChange(category.dataCategory, option.pcheck, e.target.checked)}
                                                        />
                                                        <span className="text-sm text-gray-700">{option.name}</span>
                                                        <span className="text-xs text-gray-500">({option.doc_count})</span>
                                                    </label>
                                                </li>
                                            ))}
                                            {category.options.length > 8 && (
                                                <li className="viewall col-span-full text-right mt-2">
                                                    <button
                                                        className="text-sm text-blue-600 hover:underline"
                                                        onClick={() => handleViewAll(
                                                            category.dataCategory,
                                                            category.title,
                                                            category.options,
                                                            category.dataJson
                                                        )}
                                                    >
                                                        View All {category.title}
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Selected Filters Display */}
                        {Object.keys(selectedFilters).length > 0 && (
                            <div className="pdetails mt-4">
                                <div className="pinde flex flex-wrap items-center gap-2">
                                    {Object.entries(selectedFilters).map(([category, values]) => (
                                        values.length > 0 && (
                                            <div key={category} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center space-x-1">
                                                <span className="font-medium capitalize">{category}:</span>
                                                {values.map(value => {
                                                    const option = filterCategories
                                                        .find(c => c.dataCategory === category)
                                                        ?.options.find(o => o.pcheck === value);
                                                    return (
                                                        <span key={value} className="ml-1 text-gray-700">
                                                            {option?.name || value}
                                                            {values.indexOf(value) < values.length - 1 ? ',' : ''}
                                                        </span>
                                                    );
                                                })}
                                                <button
                                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => handleCheckboxChange(category, values[0], false)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )
                                    ))}
                                    <button
                                        className="text-sm text-blue-600 hover:underline"
                                        onClick={handleClearAll}
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Boutiques Grid */}
            <div className="boutique-landing max-w-[1366px] mx-auto px-4 py-8">
                <div className="box-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {boutiques.map((boutique) => (
                        <Link
                            key={boutique.id}
                            href={`/boutique/${boutique.name.toLowerCase().replace(/\s+/g, '-')}/${boutique.id}?ref2=todays_boutiques`}
                            className="group"
                        >
                            <div className="box-child bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                <div className="image-ctr relative">
                                    <Image
                                        src={boutique.image}
                                        alt={boutique.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-auto"
                                        unoptimized
                                    />
                                    <div className="footer-sticky absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs py-1 px-2">
                                        {getTimerDisplayValue(boutique.endDate)}
                                    </div>

                                </div>
                                <div className="text-ctr p-4">
                                    <div className="head-text">
                                        <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[3rem]">
                                            {boutique.name}
                                        </h3>
                                    </div>
                                    <div className="link-text mt-2">
                                        <span className="kids-app text-sm text-gray-600 line-clamp-2">
                                            {boutique.description}
                                        </span>
                                        <span className="shop-now text-orange-500 text-sm font-medium block mt-2 group-hover:underline">
                                            SHOP NOW
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="boutique-footer border-t border-gray-200 py-6">
                <div className="max-w-[1366px] mx-auto px-4 flex justify-center space-x-8">
                    <Link href="/boutiques/popular?ref2=best_sellers" className="text-gray-600 hover:text-orange-500">
                        BEST SELLERS
                    </Link>
                    <Link href="/boutiques/ending-today?ref2=last_day" className="text-gray-600 hover:text-orange-500">
                        LAST DAY
                    </Link>
                </div>
            </div>

            {/* Hidden Inputs */}
            <input type="hidden" id="TotalCount" value={boutiques.length.toString()} />
            <input type="hidden" id="PageNo" value="2" />
            <input type="hidden" id="PageSize" value="20" />
            <input type="hidden" id="PageType" value="todays_boutiques" />

            {/* View All Popup */}
            {showPopup && (
                <div className="allSubCatPopup fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handlePopupClose} />
                    <div className="relative bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
                        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                            <h3 className="font-bold text-lg">All {popupDetails}</h3>
                            <button onClick={handlePopupClose}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Alphabet Navigation */}
                        <div className="alphabet-wrap border-b px-4 py-2 overflow-x-auto">
                            <ul className="flex space-x-2 text-sm">
                                {['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => (
                                    <li key={letter}>
                                        <button
                                            className="px-2 py-1 hover:bg-gray-100 rounded"
                                            onClick={() => {
                                                const element = document.getElementById(`option-${letter}`);
                                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            {letter}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Options */}
                        <div className="options-wrap overflow-y-auto p-4" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                            {Object.entries(popupOptions.reduce((acc, option) => {
                                const firstChar = option.name.charAt(0).toUpperCase();
                                if (!acc[firstChar]) acc[firstChar] = [];
                                acc[firstChar].push(option);
                                return acc;
                            }, {} as Record<string, FilterOption[]>)).sort(([a], [b]) => a.localeCompare(b)).map(([letter, options]) => (
                                <div key={letter} id={`option-${letter}`} className="mb-4">
                                    <span className="cat-label font-bold text-gray-500 block mb-2">{letter}</span>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {options.map(option => (
                                            <div key={option.pcheck} className="scrolloption">
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-orange-500 rounded"
                                                        checked={tempSelectedFilters[popupCategory]?.includes(option.pcheck) || false}
                                                        onChange={(e) => handlePopupCheckboxChange(popupCategory, option.pcheck, e.target.checked)}
                                                    />
                                                    <span className="text-sm text-gray-700">{option.name}</span>
                                                    <span className="text-xs text-gray-500">({option.doc_count})</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                onClick={handlePopupClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                onClick={handlePopupApply}
                            >
                                Apply
                            </button>
                        </div>
                        <div id="applyerror" className="text-red-500 text-sm px-4 pb-2"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoutiquesPage;