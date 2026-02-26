export interface ImageContent {
    type: 'image';
    src: string;
    alt: string;
    title: string;
    link?: string;
    hasLink: boolean;
}

export type ContentItem = ImageContent;

export interface Column {
    width: number;
    content: ContentItem[];
}

export interface Row {
    columns: Column[];
}

export interface Section {
    type: 'full-width' | 'split' | 'grid';
    marginBottom: string;
    rows: Row[];
}

export interface CPIDData {
    cpidId: string;
    sections: Section[];
}