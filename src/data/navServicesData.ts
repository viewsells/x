export interface NavServiceItem {
  id: string;
  name: string;
  slug: string;
  basePrice: string;
  priceUnit?: string;
}

export const headerAccountServices: NavServiceItem[] = [
  { id: 'buy-new-github-accounts', name: 'Buy New GitHub Accounts', slug: 'buy-new-github-accounts', basePrice: '$5' },
  { id: 'buy-aged-github-accounts', name: 'Buy Aged GitHub Accounts', slug: 'buy-aged-github-accounts', basePrice: '$35' },
  { id: 'buy-old-github-accounts', name: 'Buy Old GitHub Accounts', slug: 'buy-old-github-accounts', basePrice: '$45' },
  { id: 'buy-github-active-account', name: 'Buy Active GitHub Accounts', slug: 'buy-github-active-account', basePrice: '$35' },
  { id: 'buy-github-account-with-commits', name: 'Buy GitHub Account with Commits', slug: 'buy-github-account-with-commits', basePrice: '$40' },
  { id: 'buy-github-account-with-stars', name: 'Buy GitHub Account with Stars', slug: 'buy-github-account-with-stars', basePrice: '$65' },
  { id: 'buy-github-student-account', name: 'Buy GitHub Student Account', slug: 'buy-github-student-account', basePrice: '$55' },
  { id: 'buy-bulk-github-accounts', name: 'Buy Bulk GitHub Accounts', slug: 'buy-bulk-github-accounts', basePrice: '$200' },
  { id: 'buy-github-organization-accounts', name: 'Buy GitHub Organization Accounts', slug: 'buy-github-organization-accounts', basePrice: '$85' },
  { id: 'buy-usa-uk-github-accounts', name: 'Buy USA/UK GitHub Accounts', slug: 'buy-usa-uk-github-accounts', basePrice: '$60' },
  { id: 'buy-github-enterprise-accounts', name: 'Buy GitHub Enterprise Accounts', slug: 'buy-github-enterprise-accounts', basePrice: '$150' },
  { id: 'buy-green-heatmap-github-accounts', name: 'Buy Green Heatmap GitHub Accounts', slug: 'buy-green-heatmap-github-accounts', basePrice: '$50' },
  { id: 'buy-github-accounts-with-followers', name: 'Buy GitHub Accounts with Followers', slug: 'buy-github-accounts-with-followers', basePrice: '$90' },
  { id: 'buy-github-accounts-with-repositories', name: 'Buy GitHub Accounts with Repositories', slug: 'buy-github-accounts-with-repositories', basePrice: '$45' },
  { id: 'buy-github-copilot-accounts', name: 'Buy GitHub Copilot Accounts', slug: 'buy-github-copilot-accounts', basePrice: '$70' },
  { id: 'buy-developer-verified-github-accounts', name: 'Buy Developer Verified Accounts', slug: 'buy-developer-verified-github-accounts', basePrice: '$60' }
];

export const headerPromotionServices: NavServiceItem[] = [
  { id: 'buy-github-stars', name: 'Buy GitHub Stars', slug: 'buy-github-stars', basePrice: 'From $17', priceUnit: '25 – 500+ stars' },
  { id: 'buy-github-forks', name: 'Buy GitHub Forks', slug: 'buy-github-forks', basePrice: 'From $15', priceUnit: '25 – 250+ forks' },
  { id: 'buy-github-followers', name: 'Buy GitHub Followers', slug: 'buy-github-followers', basePrice: 'From $25', priceUnit: '50 – 1000+ followers' },
  { id: 'buy-github-watchers', name: 'Buy GitHub Watchers', slug: 'buy-github-watchers', basePrice: 'From $25', priceUnit: '50 – 500+ watchers' },
  { id: 'buy-github-repositories', name: 'Buy GitHub Repositories', slug: 'buy-github-repositories', basePrice: 'From $10', priceUnit: 'Pre-configured codebases' },
  { id: 'buy-github-achievements-badge', name: 'Buy GitHub Achievements Badge', slug: 'buy-github-achievements-badge', basePrice: 'From $20', priceUnit: 'Pair Extraordinaire / Pull Shark' }
];
