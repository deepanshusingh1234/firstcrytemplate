export interface NavItem {
    id: string;
    label: string;
    href?: string;
    icon?: string;
    type?: string;
    isViewAll?: boolean;
    action?: string;
}

export interface NavColumn {
    title: string;
    type: string;
    items: NavItem[];
}

export interface Banner {
    image: string;
    alt: string;
    href: string;
    title: string;
}

export interface MainCategory {
    id: string;
    label: string;
    href: string;
    columns: NavColumn[];
    banner?: Banner;
}

export interface TopMenuItem {
    id: string;
    label: string;
    type: string;
    href?: string;
    icon?: string;
    children?: TopMenuItem[];
    loginHref?: string;
    registerHref?: string;
}

export interface NavigationData {
    topMenu: {
        leftSection: TopMenuItem[];
        rightSection: TopMenuItem[];
    };
    mainCategories: MainCategory[];
    myAccount: {
        sections: {
            title: string;
            items: NavItem[];
        }[];
    };
    footerLinks: {
        popularCategories: string[];
        popularBrands: string[];
    };
}