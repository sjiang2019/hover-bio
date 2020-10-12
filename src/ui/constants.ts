
export interface Link {
    text: string;
    href: string;
}

export interface StreamLink extends Link {
    price: string;
}

export interface MovieInfo {
    title: string;
    links: Array<StreamLink>;
}

export interface Article {
    title: string;
    link: string;
    date: string;
}

export interface Social {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
}

export interface AdditionalInfo {
    name: string;
    articles?: Array<Article>;
    social?: Social;
}

export interface BioInfo {
    name: string;
    wikiUrl: string;
    snippet: string;
    imageUrl: string;
}
