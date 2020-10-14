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
  Facebook: string;
  Twitter: string;
  Instagram: string;
  LinkedIn: string;
}

export const SOCIAL_MEDIA_KEYS = ["Facebook", "Twitter", "Instagram", "LinkedIn"]

export interface InfoPanel {
    social: Social;
    metadata: { [key: string]: string };
}

export interface AdditionalInfo {
  name: string;
  articles?: Array<Article>;
  social?: Social;
  metadata?: {[key: string]: string};
}

export interface BioInfo {
  name: string;
  wikiUrl: string;
  snippet: string;
  imageUrl: string;
}
