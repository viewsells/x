/**
 * Site Configuration & Entity Metadata for BuyGitHubAccounts.com
 * Centralized settings for SEO, Analytics, Social Profiles, and Organization Schema.
 */

export interface SiteConfig {
  name: string;
  domain: string;
  siteUrl: string;
  title: string;
  description: string;
  phone: string;
  supportHours: string;
  warrantyPeriod: string;
  officialTelegram: string;
  officialTelegramUrl: string;
  officialWhatsApp: string;
  officialWhatsAppUrl: string;
  // Social profiles (Placeholders until official verified channels are published)
  socialProfiles: {
    twitter?: string; // TODO: Insert official X/Twitter URL once published (e.g. https://x.com/BuyGitHubAccounts)
    facebook?: string; // TODO: Insert official Facebook Page URL once published
    instagram?: string; // TODO: Insert official Instagram URL once published
    linkedin?: string; // TODO: Insert official LinkedIn Company URL once published
    youtube?: string; // TODO: Insert official YouTube Channel URL once published
    github?: string;
  };
  // Analytics configuration (Non-blocking Google Analytics 4)
  analytics: {
    // Set to your Google Analytics 4 Measurement ID (e.g. "G-XXXXXXXXXX")
    gaMeasurementId: string;
    enabled: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: 'BuyGitHubAccounts.com',
  domain: 'buygithubaccounts.com',
  siteUrl: 'https://buygithubaccounts.com',
  title: 'Buy GitHub Accounts & Promotion Services',
  description: 'Buy verified new & aged GitHub accounts, student packs, bulk tiers, and repository promotion services with transparent pricing, crypto, and 24/7 support.',
  phone: '+1 (307) 393-9979',
  supportHours: '24/7/365 Technical Support',
  warrantyPeriod: '48-Hour Replacement Guarantee',
  officialTelegram: '@EgSupport24',
  officialTelegramUrl: 'https://t.me/EgSupport24',
  officialWhatsApp: '+1 (307) 393-9979',
  officialWhatsAppUrl: 'https://wa.me/13073939979',
  socialProfiles: {
    // Verified official chat channels
    twitter: '', // Set when available
    facebook: '', // Set when available
    instagram: '', // Set when available
    linkedin: '', // Set when available
    youtube: '', // Set when available
  },
  analytics: {
    // Configurable Google Analytics 4 ID. Defaults to empty until user adds their measurement ID.
    gaMeasurementId: '',
    enabled: false,
  },
};
