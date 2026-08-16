import { ServiceItem } from '../types';
import { accountServices } from './accountServicesData';
import { promotionServices } from './promotionServicesData';

export const allServices: ServiceItem[] = [
  ...accountServices,
  ...promotionServices
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return allServices.find((s) => s.slug === slug || s.id === slug);
};

export const getServiceById = (id: string): ServiceItem | undefined => {
  return allServices.find((s) => s.id === id || s.slug === id);
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
