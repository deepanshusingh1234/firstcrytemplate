"use client";

import React, { useState, useEffect } from "react";
import { getFooterData, getFranchiseData, getSeoContent, getCopyrightText } from "../utils/footer";
import { FooterData } from "../types/footer";

const Footer = () => {
    const [footerData, setFooterData] = useState<FooterData | null>(null);
    const [franchiseData, setFranchiseData] = useState<any>(null);
    const [seoContent, setSeoContent] = useState<any>(null);
    const [copyright, setCopyright] = useState("");
    const [extendedMenuOpen, setExtendedMenuOpen] = useState(false);

    useEffect(() => {
        setFooterData(getFooterData());
        setFranchiseData(getFranchiseData());
        setSeoContent(getSeoContent());
        setCopyright(getCopyrightText());
    }, []);

    if (!footerData) {
        return null;
    }

    // Helper function to render links
    const renderLinks = (links: any[]) => {
        return links.map((link, index) => (
            <span key={index}>
                <a
                    href={link.href || "#"}
                    target={link.target || "_self"}
                    rel={link.rel || ""}
                    className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                >
                    {link.label}
                </a>
            </span>
        ));
    };

    // Helper function to render payment items
    const renderPaymentItems = (items: any[]) => {
        return items.map((item, index) => (
            <span key={index} className="relative group">
                <span className="text-xs text-gray-600 cursor-default">
                    {item.label}
                    {item.tooltip && (
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none">
                            {item.tooltip}
                        </span>
                    )}
                </span>
            </span>
        ));
    };

    // Helper function to render social media links with icons
    const renderSocialLinks = (links: any[]) => {
        return links.map((link, index) => {
            let iconClass = "";
            let iconChar = "";
            switch (link.icon) {
                case "facebook":
                    iconClass = "bg-[#3b5998]";
                    iconChar = "f";
                    break;
                case "instagram":
                    iconClass = "bg-[#e4405f]";
                    iconChar = "📷";
                    break;
                case "twitter":
                    iconClass = "bg-[#1da1f2]";
                    iconChar = "🐦";
                    break;
                case "youtube":
                    iconClass = "bg-[#ff0000]";
                    iconChar = "▶";
                    break;
                case "linkedin":
                    iconClass = "bg-[#0077b5]";
                    iconChar = "in";
                    break;
                default:
                    iconClass = "";
            }

            return (
                <span key={index} className={link.className || ""}>
                    <a
                        href={link.href}
                        target={link.target || "_self"}
                        className={`text-xs ${link.icon ? `${iconClass} text-white w-6 h-6 flex items-center justify-center rounded` : "text-gray-600 hover:text-gray-900 hover:underline"}`}
                        style={link.icon ? { display: 'inline-flex' } : {}}
                    >
                        {link.icon ? iconChar : link.label}
                    </a>
                </span>
            );
        });
    };

    return (
        <footer className="bg-gray-100 border-t border-gray-300 mt-10">
            {/* Top Section with Brand Image - Using Sprite */}
            <div className="footer-rtb">
                <div className="tic flex justify-center py-4 bg-[#d9f3f4]">
                    <div
                        className="footer_kid_store w-[282px] h-[64px] bg-no-repeat"
                        style={{
                            backgroundImage: 'url(https://cdn.fcglcdn.com/brainbees/images/sprite-footer1.1.png)',
                            backgroundPosition: '-10px -170px'
                        }}
                    ></div>
                </div>

                {/* Main Footer Content */}
                <div className="fc-footer bg-gray-50 py-8">
                    <div className="max-w-[1366px] mx-auto px-4">
                        {/* First Row - 4 Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Column 1: CATEGORIES */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">CATEGORIES</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.categories.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column 2: FIRSTCRY PARENTING */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">FIRSTCRY PARENTING</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.firstCryParenting.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column 3: REGIONAL PARENTING */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">REGIONAL PARENTING</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.regionalParenting.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column 4: SHIPPING & POLICIES */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">SHIPPING & POLICIES</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.shippingPolicies.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Second Row - 4 Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                            {/* Column 1: COMPANY INFO */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">COMPANY INFO</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.companyInfo.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column 2: OUR OTHER WEBSITES */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">OUR OTHER WEBSITES</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.otherWebsites.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>

                                {/* Learning & Education */}
                                <h4 className="font-bold text-sm mb-3 mt-6">Learning & Education</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.learningEducation.links?.slice(0, 4).map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column 3: PAYMENT METHOD */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">PAYMENT METHOD</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.paymentMethods.items?.map((item, index) => (
                                        <span key={index} className="relative group">
                                            <span className="text-xs text-gray-600 cursor-default">
                                                {item.label}
                                                {item.tooltip && (
                                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none">
                                                        {item.tooltip}
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    ))}
                                </div>

                                {/* Connect with Us */}
                                <h4 className="font-bold text-sm mb-3 mt-6">CONNECT WITH US</h4>
                                <div className="flex flex-wrap gap-2">
                                    {footerData.socialMedia.links?.map((link, index) => {
                                        let iconClass = "";
                                        let iconChar = "";
                                        switch (link.icon) {
                                            case "facebook":
                                                iconClass = "bg-[#3b5998]";
                                                iconChar = "f";
                                                break;
                                            case "instagram":
                                                iconClass = "bg-[#e4405f]";
                                                iconChar = "📷";
                                                break;
                                            case "twitter":
                                                iconClass = "bg-[#1da1f2]";
                                                iconChar = "🐦";
                                                break;
                                            case "youtube":
                                                iconClass = "bg-[#ff0000]";
                                                iconChar = "▶";
                                                break;
                                            case "linkedin":
                                                iconClass = "bg-[#0077b5]";
                                                iconChar = "in";
                                                break;
                                            default:
                                                iconClass = "";
                                        }
                                        return (
                                            <a
                                                key={index}
                                                href={link.href}
                                                target={link.target || "_self"}
                                                className={`text-xs ${link.icon ? `${iconClass} text-white w-6 h-6 flex items-center justify-center rounded` : "text-gray-600 hover:text-gray-900 hover:underline"}`}
                                                style={link.icon ? { display: 'inline-flex' } : {}}
                                            >
                                                {link.icon ? iconChar : link.label}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Column 4: OUR APPS */}
                            <div>
                                <h4 className="font-bold text-sm mb-3">OUR APPS</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.ourApps.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>

                                {/* Shop International */}
                                <h4 className="font-bold text-sm mb-3 mt-6">SHOP INTERNATIONAL</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.shopInternational.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Third Row - Additional Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                            {/* Column 1: KIDS LEARNING & EDUCATIONAL APPS */}
                            <div className="col-span-2">
                                <h4 className="font-bold text-sm mb-3">KIDS LEARNING & EDUCATIONAL APPS</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.kidsLearningApps.links?.map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column 2: Learning & Education (remaining items) */}
                            <div className="col-span-2">
                                <h4 className="font-bold text-sm mb-3">Learning & Education</h4>
                                <div className="flex flex-col space-y-2">
                                    {footerData.learningEducation.links?.slice(4).map((link, index) => (
                                        <span key={index}>
                                            <a
                                                href={link.href || "#"}
                                                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Franchise Section - Redesigned with Image on Right */}
                        {franchiseData && (
                            <div className="mt-8 flex flex-col md:flex-row gap-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                                {/* Left Content - Text and Button */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">BECOME OUR FRANCHISE STORE</h3>
                                    <p className="text-gray-600 mb-6 text-lg">Turn Your Ambition Into a Profitable Business!</p>
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={franchiseData.becomeFranchise.href}
                                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 inline-block"
                                        >
                                            KNOW MORE
                                        </a>
                                        <span className="text-gray-800 font-semibold text-lg">Start A Preschool</span>
                                    </div>
                                </div>

                                {/* Right Content - Image */}
                                <div className="md:w-80 flex-shrink-0">
                                    <a href={franchiseData.intellitotsFranchise.href} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={franchiseData.intellitotsFranchise.imageUrl}
                                            alt={franchiseData.intellitotsFranchise.alt}
                                            className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                        />
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Extended Menu Section */}
                        <div className="mt-8 border-t border-gray-300 pt-6">
                            <div
                                className="flex items-center justify-between cursor-pointer mb-4"
                                onClick={() => setExtendedMenuOpen(!extendedMenuOpen)}
                            >
                                <p className="font-semibold text-sm">Extended Menu</p>
                                <span className={`transform transition-transform duration-300 ${extendedMenuOpen ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </div>

                            {extendedMenuOpen && (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-xs">
                                    {/* Popular in Clothes & Shoes */}
                                    <div>
                                        <span className="font-semibold text-gray-500 mb-2 block">Popular in Clothes & Shoes</span>
                                        <ul className="space-y-1">
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Girls Tops</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Jeans For Girls</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Girls T Shirts</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Girls Shirts</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Girls Crop Tops</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-500 mb-2 block">Popular in Toys & Gaming</span>
                                        <ul className="space-y-1">
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Carrom Board</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Teddy Bear</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Hot Wheels</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Dolls</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Barbie Dolls</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-500 mb-2 block">Popular in Baby Gear</span>
                                        <ul className="space-y-1">
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Kids Cycle</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Skating Shoes</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Bike for Kids</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Kids Car</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Kids Bicycle</a></li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SEO Content */}
                        {seoContent && (
                            <div className="mt-8 space-y-6 text-xs text-gray-600">
                                <div>
                                    <h1 className="font-semibold text-sm mb-2">{seoContent.mainHeading}</h1>
                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: seoContent.description1 }} />
                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: seoContent.description2 }} />
                                    <p dangerouslySetInnerHTML={{ __html: seoContent.description3 }} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-sm mb-2">{seoContent.newbornHeading}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: seoContent.newbornDescription }} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-sm mb-2">{seoContent.kidsShoppingHeading}</h2>
                                    <p>{seoContent.kidsShoppingDescription}</p>
                                </div>

                                <div>
                                    <h2 className="font-semibold text-sm mb-2">{seoContent.parentingHeading}</h2>
                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: seoContent.parentingDescription1 }} />
                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: seoContent.parentingDescription2 }} />
                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: seoContent.parentingDescription3 }} />
                                    <p>{seoContent.parentingDescription4}</p>
                                </div>

                                <div>
                                    <h2 className="font-semibold text-sm mb-2">{seoContent.preschoolHeading}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: seoContent.preschoolDescription }} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-sm mb-2">{seoContent.offersHeading}</h2>
                                    <p className="mb-2">{seoContent.offersDescription1}</p>
                                    <p dangerouslySetInnerHTML={{ __html: seoContent.offersDescription2 }} />
                                </div>
                            </div>
                        )}

                        {/* Copyright */}
                        <div className="mt-8 text-xs text-gray-500 border-t border-gray-300 pt-4">
                            <p dangerouslySetInnerHTML={{ __html: copyright }} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;