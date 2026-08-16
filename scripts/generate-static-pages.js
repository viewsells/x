import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

// List of all account service slugs
const accountSlugs = [
  'buy-new-github-accounts',
  'buy-aged-github-accounts',
  'buy-github-active-account',
  'buy-github-student-account',
  'buy-github-account-with-stars',
  'buy-github-account-with-forks',
  'buy-github-account-with-projects',
  'buy-github-account-with-followers',
  'buy-github-account-with-commits',
  'buy-github-account-with-watches',
  'buy-github-account-with-repositories',
  'buy-github-account-with-achievements-badge',
  'buy-bulk-github-accounts',
  'buy-github-for-legion',
  'buy-github-for-authena'
];

// List of all promotion service slugs
const promotionSlugs = [
  'buy-github-stars',
  'buy-github-forks',
  'buy-github-followers',
  'buy-github-watchers',
  'buy-github-repositories',
  'buy-github-achievements-badge'
];

// List of all blog slugs
const blogSlugs = [
  'what-are-github-accounts-how-they-work',
  'new-vs-aged-github-accounts-difference',
  'github-stars-algorithm-how-repositories-trend',
  'github-student-developer-pack-benefits-breakdown',
  'preventing-github-account-suspensions-best-practices',
  'how-github-forks-signal-real-world-utility',
  'scaling-github-actions-runners-dedicated-accounts',
  'github-follower-metrics-developer-authority-guide',
  'commit-activity-patterns-signals-of-active-maintenance',
  'github-achievements-badges-complete-breakdown',
  'safely-managing-multiple-github-identities-ssh-config',
  'crypto-payment-privacy-guide-digital-developer-services',
  'github-organization-vs-personal-accounts-teams',
  'github-repository-watchers-developer-interest-metric',
  'bulk-github-accounts-enterprise-qa-testing-isolation',
  'github-legion-and-authena-infrastructure-developer-guide',
  'github-account-warranty-terms-what-to-expect',
  'open-source-promotion-ethics-transparency-guide'
];

// Core pages
const corePages = [
  'accounts',
  'promotion-services',
  'blog',
  'faq',
  'about',
  'contact',
  'checkout',
  'payment-methods',
  'terms',
  'privacy-policy',
  'refund-policy',
  'delivery-policy',
  'disclaimer',
  'sitemap'
];

// All route paths
const allRoutes = [
  ...corePages,
  ...accountSlugs.map(slug => `accounts/${slug}`),
  ...promotionSlugs.map(slug => `promotion-services/${slug}`),
  ...blogSlugs.map(slug => `blog/${slug}`)
];

console.log(`Generating static route directories for ${allRoutes.length} pages...`);

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Please run vite build first.');
  process.exit(1);
}

const baseIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Ensure 404.html in dist has fallback
const public404 = path.join(publicDir, '404.html');
if (fs.existsSync(public404)) {
  fs.copyFileSync(public404, path.join(distDir, '404.html'));
}

// Ensure CNAME in dist
const publicCname = path.join(publicDir, 'CNAME');
if (fs.existsSync(publicCname)) {
  fs.copyFileSync(publicCname, path.join(distDir, 'CNAME'));
}

// Ensure robots and sitemap
if (fs.existsSync(path.join(publicDir, 'robots.txt'))) {
  fs.copyFileSync(path.join(publicDir, 'robots.txt'), path.join(distDir, 'robots.txt'));
}
if (fs.existsSync(path.join(publicDir, 'sitemap.xml'))) {
  fs.copyFileSync(path.join(publicDir, 'sitemap.xml'), path.join(distDir, 'sitemap.xml'));
}
if (fs.existsSync(path.join(publicDir, 'googleedb1345b51ee2a94.html'))) {
  fs.copyFileSync(path.join(publicDir, 'googleedb1345b51ee2a94.html'), path.join(distDir, 'googleedb1345b51ee2a94.html'));
}

// Generate directory and index.html for each route
allRoutes.forEach(route => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), baseIndexHtml, 'utf-8');
});

console.log(`Successfully generated ${allRoutes.length} route HTML files.`);
