export interface FooterLink {
    label: string;
    href?: string;
    rel?: string;
    target?: string;
    className?: string;
    icon?: string;
    tooltip?: string;
}

export interface FooterSection {
    title: string;
    links?: FooterLink[];
    items?: FooterLink[];
}

export interface FranchiseData {
    becomeFranchise: {
        title: string;
        buttonText: string;
        href: string;
    };
    intellitotsFranchise: {
        imageUrl: string;
        alt: string;
        href: string;
    };
}

export interface SeoContent {
    mainHeading: string;
    description1: string;
    description2: string;
    description3: string;
    newbornHeading: string;
    newbornDescription: string;
    kidsShoppingHeading: string;
    kidsShoppingDescription: string;
    parentingHeading: string;
    parentingDescription1: string;
    parentingDescription2: string;
    parentingDescription3: string;
    parentingDescription4: string;
    preschoolHeading: string;
    preschoolDescription: string;
    offersHeading: string;
    offersDescription1: string;
    offersDescription2: string;
}

export interface FooterData {
    categories: FooterSection;
    companyInfo: FooterSection;
    firstCryParenting: FooterSection;
    regionalParenting: FooterSection;
    otherWebsites: FooterSection;
    shippingPolicies: FooterSection;
    paymentMethods: FooterSection;
    socialMedia: FooterSection;
    ourApps: FooterSection;
    learningEducation: FooterSection;
    shopInternational: FooterSection;
    kidsLearningApps: FooterSection;
    careers: FooterSection;
    franchise: FranchiseData;
    seoContent: SeoContent;
    copyright: string;
}