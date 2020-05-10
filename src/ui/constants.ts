
export interface Link {
    text: string;
    href: string;
}

export interface StreamLink extends Link {
    price: string
}

export interface MovieInfo {
    title: string;
    links: Array<StreamLink>;
}
