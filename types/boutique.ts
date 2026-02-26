export interface Boutique {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    endDate: string;
    endDateText: string;
    isNew: boolean;
}

export interface BoutiquesData {
    sectionTitle: string;
    viewAllLink: string;
    boutiques: Boutique[];
}