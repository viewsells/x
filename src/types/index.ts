export type ServiceCategory = 'accounts' | 'promotion';

export interface PricingTier {
  quantity: number | string;
  label: string;
  price: number | string;
  unitPrice?: string;
  popular?: boolean;
  notes?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  subcategory: 'new' | 'aged' | 'active' | 'student' | 'bulk' | 'history' | 'specialized' | 'stars' | 'forks' | 'followers' | 'watchers' | 'repositories' | 'achievements';
  basePrice: string; // e.g. "$5", "$35", "$17"
  priceNumber: number; // for sorting/calculations
  priceUnit: string; // e.g. "per account", "starting price", "contact for price"
  shortDescription: string;
  heroHeadline: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  features: {
    title: string;
    description: string;
  }[];
  whatsIncluded: string[];
  pricingTiers?: PricingTier[];
  overviewContent: string[];
  whyChooseUsPoints: {
    title: string;
    description: string;
  }[];
  suitabilityList: string[];
  limitationsAndHonestNotes: string[];
  orderingSteps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  faqs: ServiceFAQ[];
  relatedServiceIds: string[];
  relatedBlogSlugs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'Accounts & History' | 'Promotion & Growth' | 'Security & Best Practices' | 'Developer Guides';
  publishedDate: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    body: string[];
    bulletPoints?: string[];
    callout?: string;
  }[];
  relatedServiceIds: string[];
  tags: string[];
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  items: ServiceFAQ[];
}

export interface CryptoWallet {
  id: string;
  name: string;
  symbol: string;
  displaySymbol: string;
  network: string;
  networkBadge: string;
  address: string;
  category: 'stablecoin' | 'major' | 'altcoin';
  estRateUsd: number;
  decimals: number;
  popular?: boolean;
  recommended?: boolean;
  notes?: string;
}

export interface OrderInquiry {
  serviceId: string;
  serviceName: string;
  selectedTier?: string;
  price: string;
  customerName: string;
  contactMethod: 'telegram' | 'whatsapp' | 'email';
  contactHandle: string;
  notes?: string;
}
