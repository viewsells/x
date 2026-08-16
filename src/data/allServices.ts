import { ServiceItem } from '../types';
import { accountServices } from './accountServicesData';
import { promotionServices } from './promotionServicesData';

export const allServices: ServiceItem[] = [
  ...accountServices,
  ...promotionServices
];

const slugAliases: Record<string, string> = {
  'buy-github-account-with-repositories': 'buy-github-accounts-with-repositories',
  'buy-github-account-with-followers': 'buy-github-accounts-with-followers',
  'buy-github-active-accounts': 'buy-github-active-account',
  'buy-old-github-account': 'buy-old-github-accounts',
  'buy-github-copilot-account': 'buy-github-copilot-accounts',
  'buy-github-enterprise-account': 'buy-github-enterprise-accounts',
  'buy-usa-uk-github-account': 'buy-usa-uk-github-accounts',
  'buy-developer-verified-github-account': 'buy-developer-verified-github-accounts'
};

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  const normalizedSlug = slugAliases[slug] || slug;
  return allServices.find((s) => s.slug === normalizedSlug || s.id === normalizedSlug || s.slug === slug || s.id === slug);
};

export const getServiceById = (id: string): ServiceItem | undefined => {
  const normalizedId = slugAliases[id] || id;
  return allServices.find((s) => s.id === normalizedId || s.slug === normalizedId || s.id === id || s.slug === id);
};

export const getServicesByCategory = (category: 'accounts' | 'promotion'): ServiceItem[] => {
  return allServices.filter((s) => s.category === category);
};

export const getFeaturedServices = (): ServiceItem[] => {
  // Select top featured items across accounts and promotion
  const featuredIds = [
    'buy-new-github-accounts',
    'buy-aged-github-accounts',
    'buy-github-stars',
    'buy-github-student-account',
    'buy-github-account-with-stars',
    'buy-github-forks',
    'buy-bulk-github-accounts',
    'buy-github-followers'
  ];
  return allServices.filter((s) => featuredIds.includes(s.id));
};
