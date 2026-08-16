import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  ArrowRight, 
  Star, 
  GitFork, 
  Users, 
  Clock, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Coins,
  ChevronRight,
  Eye,
  History,
  Award,
  Layers,
  FolderGit2,
  Lock,
  ChevronDown,
  Activity,
  Zap,
  ShoppingCart,
  Check,
  Search,
  BookOpen
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { featuredBlogPreviews } from '../data/blogData';
import { navigateTo } from '../utils/router';

interface HomePageProps {
  onOpenOrderModal: (serviceId?: string) => void;
}

export const HomePage = ({ onOpenOrderModal }: HomePageProps) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [pricingTab, setPricingTab] = useState<'accounts' | 'stars' | 'followers' | 'forks' | 'watchers' | 'repositories'>('accounts');
  const [explorerCategory, setExplorerCategory] = useState<'accounts' | 'stars' | 'followers' | 'forks' | 'watchers' | 'repositories' | 'achievements'>('accounts');
  const [heroInteractiveTab, setHeroInteractiveTab] = useState<'accounts' | 'promotion'>('accounts');
  const [hoveredHeroService, setHoveredHeroService] = useState<string | null>(null);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6 Popular Services as required in Master Prompt
  const popularServicesList = [
    {
      id: 'aged-github-accounts',
      slug: 'buy-aged-github-accounts',
      category: 'accounts' as const,
      name: 'Buy Aged GitHub Accounts',
      price: '$35',
      unit: 'per account',
      badge: 'High Tenure',
      description: 'Mature account tenure with authentic registration history, verified email mailbox access, and instant deployment readiness.'
    },
    {
      id: 'github-accounts-with-stars',
      slug: 'buy-github-account-with-stars',
      category: 'accounts' as const,
      name: 'Buy GitHub Accounts with Stars',
      price: '$65',
      unit: 'per account',
      badge: 'Social Proof',
      description: 'Accounts with pre-existing starred repositories and public activity to build instant social proof for developer portfolios.'
    },
    {
      id: 'github-account-with-followers',
      slug: 'buy-github-account-with-followers',
      category: 'accounts' as const,
      name: 'Buy GitHub Account with Followers',
      price: '$90',
      unit: 'per account',
      badge: 'Community Reach',
      description: 'Pre-established developer profiles with an existing follower base and community reach for open-source maintainers.'
    },
    {
      id: 'buy-github-stars',
      slug: 'buy-github-stars',
      category: 'promotion' as const,
      name: 'Buy GitHub Stars',
      price: 'From $17',
      unit: '25 – 500+ stars',
      badge: 'Discovery Boost',
      description: 'Safe, organically paced repository stars from verified developer profiles to enhance open-source discovery and ranking.'
    },
    {
      id: 'buy-github-followers',
      slug: 'buy-github-followers',
      category: 'promotion' as const,
      name: 'Buy GitHub Followers',
      price: 'From $25',
      unit: '50 – 1000+ followers',
      badge: 'Authority',
      description: 'Gradually delivered public developer followers to elevate personal branding, organization visibility, and social authority.'
    },
    {
      id: 'buy-github-repositories',
      slug: 'buy-github-repositories',
      category: 'promotion' as const,
      name: 'Buy GitHub Repositories',
      price: 'From $10',
      unit: 'per repository',
      badge: 'Clean Codebase',
      description: 'Pre-built codebases with clean repository structure, commit histories, and licensing ready for rapid deployment.'
    }
  ];

  // Interactive Pricing Data Categories
  const pricingData = {
    accounts: [
      { name: 'New GitHub Account (Clean / Verified)', price: '$5', unit: 'per account', time: '15–30 Mins', notes: 'Clean registration with primary email mailbox credentials.', id: 'buy-new-github-accounts', path: '/accounts/buy-new-github-accounts' },
      { name: 'Aged GitHub Account (Established Tenure)', price: '$35', unit: 'per account', time: '15–45 Mins', notes: 'Matured account age with zero policy flags or anti-spam restrictions.', id: 'buy-aged-github-accounts', path: '/accounts/buy-aged-github-accounts' },
      { name: 'Active GitHub Account (Public Commits)', price: '$35', unit: 'per account', time: '30–60 Mins', notes: 'Includes historic commit graph activity and public profile contributions.', id: 'buy-github-active-account', path: '/accounts/buy-github-active-account' },
      { name: 'GitHub Student Developer Account', price: '$55', unit: 'per account', time: '1–2 Hours', notes: 'Pre-approved Student Pack with cloud credits and partner tools.', id: 'buy-github-student-account', path: '/accounts/buy-github-student-account' },
      { name: 'Bulk Accounts (100 Verified Accounts)', price: '$200', unit: '$2.00 / account', time: '1–4 Hours', notes: 'Large inventory bundle for automated QA testing and distributed teams.', id: 'buy-bulk-github-accounts', path: '/accounts/buy-bulk-github-accounts' },
    ],
    stars: [
      { name: '25 GitHub Stars (Starter Package)', price: '$17', unit: '25 stars', time: '12–24 Hours', notes: 'Natural delivery cadence from verified GitHub user profiles.', id: 'buy-github-stars', path: '/promotion-services/buy-github-stars' },
      { name: '50 GitHub Stars (Growth Package)', price: '$30', unit: '50 stars', time: '18–36 Hours', notes: 'Optimal package for trending in niche open-source categories.', id: 'buy-github-stars', path: '/promotion-services/buy-github-stars' },
      { name: '100 GitHub Stars (Popular Tier)', price: '$50', unit: '100 stars', time: '24–48 Hours', notes: 'High-impact boost for repository launches and show-HN showcases.', id: 'buy-github-stars', path: '/promotion-services/buy-github-stars' },
      { name: '200 GitHub Stars (Pro Tier)', price: '$90', unit: '200 stars', time: '48–72 Hours', notes: 'Paced over multiple days to maintain organic growth metrics.', id: 'buy-github-stars', path: '/promotion-services/buy-github-stars' },
      { name: '500 GitHub Stars (Enterprise Package)', price: '$200', unit: '500 stars', time: '3–6 Days', notes: 'Maximum repository authority with non-drop warranty protection.', id: 'buy-github-stars', path: '/promotion-services/buy-github-stars' },
    ],
    followers: [
      { name: '50 GitHub Followers (Kickstart)', price: '$25', unit: '50 followers', time: '24–36 Hours', notes: 'Direct profile followers with avatar and platform tenure.', id: 'buy-github-followers', path: '/promotion-services/buy-github-followers' },
      { name: '100 GitHub Followers (Recommended)', price: '$45', unit: '100 followers', time: '24–48 Hours', notes: 'Builds social proof for individual developers and team accounts.', id: 'buy-github-followers', path: '/promotion-services/buy-github-followers' },
      { name: '250 GitHub Followers (Builder)', price: '$95', unit: '250 followers', time: '48–72 Hours', notes: 'Safe pacing across multiple business days for steady expansion.', id: 'buy-github-followers', path: '/promotion-services/buy-github-followers' },
      { name: '500 GitHub Followers (Authority)', price: '$175', unit: '500 followers', time: '3–5 Days', notes: 'Elevates credibility for open-source organization profiles.', id: 'buy-github-followers', path: '/promotion-services/buy-github-followers' },
    ],
    forks: [
      { name: '25 Repository Forks (Essential)', price: '$15', unit: '25 forks', time: '12–24 Hours', notes: 'Creates authentic developer branching activity signals.', id: 'buy-github-forks', path: '/promotion-services/buy-github-forks' },
      { name: '50 Repository Forks (Standard)', price: '$25', unit: '50 forks', time: '18–36 Hours', notes: 'Boosts codebase engagement indicators on GitHub search.', id: 'buy-github-forks', path: '/promotion-services/buy-github-forks' },
      { name: '100 Repository Forks (Advanced)', price: '$45', unit: '100 forks', time: '24–48 Hours', notes: 'Ideal for frameworks, utilities, and developer templates.', id: 'buy-github-forks', path: '/promotion-services/buy-github-forks' },
      { name: '250 Repository Forks (Flagship)', price: '$95', unit: '250 forks', time: '48–72 Hours', notes: 'High-volume branching distribution across active developer accounts.', id: 'buy-github-forks', path: '/promotion-services/buy-github-forks' },
    ],
    watchers: [
      { name: '50 Repository Watchers (Subscriber Tier)', price: '$25', unit: '50 watchers', time: '12–36 Hours', notes: 'Generates active notification subscriber metrics on repository.', id: 'buy-github-watchers', path: '/promotion-services/buy-github-watchers' },
      { name: '100 Repository Watchers (Active Watch)', price: '$45', unit: '100 watchers', time: '24–48 Hours', notes: 'Establishes repository community engagement indicators.', id: 'buy-github-watchers', path: '/promotion-services/buy-github-watchers' },
      { name: '250 Repository Watchers (Growth)', price: '$95', unit: '250 watchers', time: '48–72 Hours', notes: 'Steadily delivered to simulate developer release interest.', id: 'buy-github-watchers', path: '/promotion-services/buy-github-watchers' },
      { name: '500 Repository Watchers (Enterprise)', price: '$175', unit: '500 watchers', time: '3–5 Days', notes: 'Top-tier repository visibility signals with 48-hr warranty.', id: 'buy-github-watchers', path: '/promotion-services/buy-github-watchers' },
    ],
    repositories: [
      { name: 'Clean Starter Repository Template', price: '$10', unit: 'per repository', time: 'Instant Delivery', notes: 'Pre-configured architecture, README, license, and CI structure.', id: 'buy-github-repositories', path: '/promotion-services/buy-github-repositories' },
      { name: 'Repository with Historic Commits', price: '$25', unit: 'per repository', time: '1–2 Hours', notes: 'Realistic backdated commit timeline for portfolio presentation.', id: 'buy-github-repositories', path: '/promotion-services/buy-github-repositories' },
      { name: 'Multi-Release Project Repository', price: '$45', unit: 'per repository', time: '2–4 Hours', notes: 'Includes tagged release history, changelogs, and branch structure.', id: 'buy-github-repositories', path: '/promotion-services/buy-github-repositories' },
      { name: 'Enterprise GitHub Repo Package', price: '$85', unit: 'per repository', time: '4–8 Hours', notes: 'Full open-source suite with issue templates, workflows, and PRs.', id: 'buy-github-repositories', path: '/promotion-services/buy-github-repositories' },
    ]
  };

  // Service Explorer categories data
  const explorerServicesData = {
    accounts: [
      { id: 'buy-new-github-accounts', path: '/accounts/buy-new-github-accounts', name: 'New Verified GitHub Accounts', price: '$5', time: '15–30 Mins', desc: 'Fresh accounts with primary mailbox login and clean IP footprint.' },
      { id: 'buy-aged-github-accounts', path: '/accounts/buy-aged-github-accounts', name: 'Aged GitHub Accounts', price: '$35', time: '15–45 Mins', desc: 'Established tenure accounts with natural platform history.' },
      { id: 'buy-github-active-account', path: '/accounts/buy-github-active-account', name: 'Active Contribution Accounts', price: '$35', time: '30–60 Mins', desc: 'Accounts with green commit graphs and public activity history.' },
      { id: 'buy-github-student-account', path: '/accounts/buy-github-student-account', name: 'GitHub Student Developer Accounts', price: '$55', time: '1–2 Hours', desc: 'Approved Student Pack benefits with developer tools access.' },
      { id: 'buy-bulk-github-accounts', path: '/accounts/buy-bulk-github-accounts', name: 'Bulk Accounts (100 Pack)', price: '$200', time: '1–4 Hours', desc: 'Bulk volume testing accounts formatted for automated CI pipelines.' },
      { id: 'buy-github-account-with-repositories', path: '/accounts/buy-github-account-with-repositories', name: 'Accounts with Repositories', price: '$45', time: '1–2 Hours', desc: 'Pre-populated with codebases and structured repositories.' }
    ],
    stars: [
      { id: 'buy-github-stars', path: '/promotion-services/buy-github-stars', name: '25 Repository Stars', price: '$17', time: '12–24 Hours', desc: 'Fast initial social proof for open source repositories.' },
      { id: 'buy-github-stars', path: '/promotion-services/buy-github-stars', name: '50 Repository Stars', price: '$30', time: '18–36 Hours', desc: 'Organic pacing from active developer profile accounts.' },
      { id: 'buy-github-stars', path: '/promotion-services/buy-github-stars', name: '100 Repository Stars', price: '$50', time: '24–48 Hours', desc: 'High-traction boost for product launches and show-HN.' },
      { id: 'buy-github-stars', path: '/promotion-services/buy-github-stars', name: '200 Repository Stars', price: '$90', time: '48–72 Hours', desc: 'Paced multi-day distribution with non-drop guarantee.' }
    ],
    followers: [
      { id: 'buy-github-followers', path: '/promotion-services/buy-github-followers', name: '50 Developer Followers', price: '$25', time: '24–36 Hours', desc: 'Profile authority builders from real developer accounts.' },
      { id: 'buy-github-followers', path: '/promotion-services/buy-github-followers', name: '100 Developer Followers', price: '$45', time: '24–48 Hours', desc: 'Enhanced personal brand and organization follower count.' },
      { id: 'buy-github-followers', path: '/promotion-services/buy-github-followers', name: '250 Developer Followers', price: '$95', time: '48–72 Hours', desc: 'Substantial community elevation with safety pacing.' }
    ],
    forks: [
      { id: 'buy-github-forks', path: '/promotion-services/buy-github-forks', name: '25 Codebase Forks', price: '$15', time: '12–24 Hours', desc: 'Natural branch activity signals for open source algorithms.' },
      { id: 'buy-github-forks', path: '/promotion-services/buy-github-forks', name: '50 Codebase Forks', price: '$25', time: '18–36 Hours', desc: 'Boosts organic repository visibility in GitHub search.' },
      { id: 'buy-github-forks', path: '/promotion-services/buy-github-forks', name: '100 Codebase Forks', price: '$45', time: '24–48 Hours', desc: 'High volume distribution across distinct developer profiles.' }
    ],
    watchers: [
      { id: 'buy-github-watchers', path: '/promotion-services/buy-github-watchers', name: '50 Repository Watchers', price: '$25', time: '12–36 Hours', desc: 'Notification subscriber metrics for public repositories.' },
      { id: 'buy-github-watchers', path: '/promotion-services/buy-github-watchers', name: '100 Repository Watchers', price: '$45', time: '24–48 Hours', desc: 'Authentic project interest signal for developer tooling.' },
      { id: 'buy-github-watchers', path: '/promotion-services/buy-github-watchers', name: '250 Repository Watchers', price: '$95', time: '48–72 Hours', desc: 'Long-term watcher retention with warranty coverage.' }
    ],
    repositories: [
      { id: 'buy-github-repositories', path: '/promotion-services/buy-github-repositories', name: 'Starter Repo Template', price: '$10', time: 'Instant Delivery', desc: 'Pre-configured repository with documentation and workflows.' },
      { id: 'buy-github-repositories', path: '/promotion-services/buy-github-repositories', name: 'Commit History Codebase', price: '$25', time: '1–2 Hours', desc: 'Structured commit logs reflecting authentic development cycles.' },
      { id: 'buy-github-repositories', path: '/promotion-services/buy-github-repositories', name: 'Multi-Release Software Repo', price: '$45', time: '2–4 Hours', desc: 'Includes tagged semantic releases and changelogs.' }
    ],
    achievements: [
      { id: 'buy-github-achievements-badge', path: '/promotion-services/buy-github-achievements-badge', name: 'Pull Shark Badge Service', price: '$20', time: '12–24 Hours', desc: 'Merged pull request badge unlocked directly on your profile.' },
      { id: 'buy-github-achievements-badge', path: '/promotion-services/buy-github-achievements-badge', name: 'Quickdraw Badge Service', price: '$15', time: '6–12 Hours', desc: 'Fast issue closure achievement verified on developer profile.' },
      { id: 'buy-github-achievements-badge', path: '/promotion-services/buy-github-achievements-badge', name: 'YOLO Badge Service', price: '$15', time: '6–12 Hours', desc: 'Direct-to-main merge badge unlocked on profile showcase.' }
    ]
  };

  // 8 Specific Homepage FAQs
  const homeFaqs = [
    {
      question: 'What GitHub account services do you provide?',
      answer: 'We provide a comprehensive range of verified developer accounts tailored to distinct technical requirements. This includes brand new accounts for clean testing or isolated environments ($5), aged accounts with established tenure ($35), active accounts with commit histories ($35), pre-approved GitHub Student Developer Pack accounts ($55), high-volume bulk accounts for testing teams (100 for $200), and specialty accounts with existing stars, followers, or community achievements.'
    },
    {
      question: 'How much does a new GitHub account cost?',
      answer: 'Our standard verified new GitHub accounts start at $5 each. When ordering in bulk quantities (such as 50 or 100 accounts), the per-unit rate scales down to as low as $2 per account. Each account comes with complete credentials and full access to the primary registered email mailbox so you maintain total administrative control.'
    },
    {
      question: 'What is an aged GitHub account?',
      answer: 'An aged GitHub account is an account registered months or years in the past that has maintained platform tenure without policy infractions. Aged accounts benefit from established trust parameters in automated screening systems, reduced anti-spam velocity limits, and natural seniority that is valuable for serious engineering teams, open-source organizations, and deployment pipelines.'
    },
    {
      question: 'How much do GitHub stars cost?',
      answer: 'GitHub stars start at $17 for 25 stars, scaling to $30 for 50 stars, $50 for 100 stars, $90 for 200 stars, and $200 for 500 stars. Stars are delivered gradually from verified user profiles to simulate organic engagement and adhere to platform pacing guidelines with a non-drop warranty.'
    },
    {
      question: 'How are GitHub accounts delivered after purchase?',
      answer: 'Delivery is handled directly and securely via Telegram or WhatsApp. Once payment is confirmed (typically within 15–30 minutes), you receive a structured credential payload containing GitHub username, secure password, primary email address, email account password, recovery backup codes, and session notes.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major cryptocurrencies including USDT (TRC-20 and ERC-20), Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), and Solana (SOL). Crypto transactions provide instant confirmation, low network fees, and enhanced transaction privacy for global developer teams.'
    },
    {
      question: 'Is there a replacement guarantee or warranty?',
      answer: 'Yes. All accounts come with an unconditional 48-Hour Replacement Guarantee against login anomalies or registration defects. If an account experiences an issue within 48 hours of handover, contact our support team with your order ID for an instant replacement.'
    },
    {
      question: 'How do I place an order?',
      answer: 'You can use our online checkout or reach out directly to our 24/7 support team on Telegram (@EgSupport24) or WhatsApp (+1 307 393-9979). Mention the exact service and package volume you need, receive instant payment details, and get your credentials delivered immediately.'
    }
  ];

  // 6 How It Works Steps
  const howItWorksSteps = [
    { num: '01', title: 'Choose Service', desc: 'Select the exact account configuration, star tier, or promotion volume matching your technical goals.' },
    { num: '02', title: 'Contact Support', desc: 'Reach out to our 24/7 team via Telegram (@EgSupport24), WhatsApp (+1 307 393-9979), or instant checkout.' },
    { num: '03', title: 'Confirm Details', desc: 'Specify repository URLs, username preferences, batch quantities, and delivery schedules.' },
    { num: '04', title: 'Complete Payment', desc: 'Execute secure payment using USDT (TRC20/ERC20), BTC, ETH, LTC, or SOL with instant confirmation.' },
    { num: '05', title: 'Order Processing', desc: 'Our automated fulfillment engine prepares your account credentials or begins safe promotion pacing.' },
    { num: '06', title: 'Receive Service', desc: 'Receive your full credential payload with primary email ownership and 48-hour warranty protection.' },
  ];

  const featuredBlogs = featuredBlogPreviews;

  return (
    <div className="bg-[#FFFFFF] text-[#24292F] min-h-screen relative overflow-hidden font-sans selection:bg-[#2DA44E] selection:text-white">
      
      <SEOHead
        title="Buy GitHub Accounts & Promotion Services | Verified & Aged Accounts"
        description="Buy verified GitHub accounts (new, aged, active, student) and GitHub promotion services (stars, followers, forks, watchers). Transparent pricing with crypto support."
        canonicalPath=""
        schemaData={[
          {
            '@type': 'WebSite',
            name: 'BuyGitHubAccounts.com',
            url: 'https://buygithubaccounts.com',
            description: 'Premium developer services marketplace for verified GitHub accounts and organic repository promotion.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://buygithubaccounts.com/accounts?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@type': 'FAQPage',
            mainEntity: homeFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }
        ]}
      />

      {/* 5. HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#D0D7DE] bg-gradient-to-b from-[#FFFFFF] via-[#F6F8FA]/60 to-[#FFFFFF] overflow-hidden">
        
        {/* Subtle Technical Grid Background */}
        <div className="absolute inset-0 tech-grid-light opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2DA44E]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Modern Display Headline & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Animated Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#24292F] shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#2DA44E] animate-pulse" />
                <span className="font-mono text-[#0969DA]">GITHUB ACCOUNTS &amp; PROMOTION SERVICES</span>
              </motion.div>

              {/* Main Headline (Word/Line Reveal) */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#24292F] leading-[1.15]"
              >
                GitHub Accounts &amp; <br className="hidden sm:inline" />
                <span className="text-[#0969DA] inline-block">Promotion Services</span>
              </motion.h1>

              {/* Subheading Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg text-[#57606A] leading-relaxed max-w-xl"
              >
                Explore account options and GitHub-related promotion services with clear pricing and direct customer support.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                <button
                  id="hero-cta-accounts"
                  onClick={() => navigateTo('/accounts')}
                  className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-sm font-semibold px-6 py-3.5 rounded-lg flex items-center transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 group"
                >
                  <Terminal className="w-4 h-4 text-[#2DA44E] mr-2 transition-transform group-hover:scale-110" />
                  <span>Browse Accounts</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  id="hero-cta-promotion"
                  onClick={() => navigateTo('/promotion-services')}
                  className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-[#24292F] text-sm font-semibold px-6 py-3.5 rounded-lg flex items-center transition-all duration-200 shadow-2xs hover:border-[#24292F] hover:-translate-y-0.5 group"
                >
                  <Star className="w-4 h-4 text-[#D29922] mr-2 transition-transform group-hover:scale-110" />
                  <span>Explore Promotion Services</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-[#57606A]" />
                </button>
              </motion.div>

              {/* Trust Guarantee Micro Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-3 flex flex-wrap items-center gap-4 text-xs text-[#57606A]"
              >
                <div className="flex items-center">
                  <ShieldCheck className="w-4 h-4 text-[#2DA44E] mr-1.5 shrink-0" />
                  <span className="font-medium">48-Hr Replacement Guarantee</span>
                </div>
                <div className="flex items-center">
                  <Coins className="w-4 h-4 text-[#0969DA] mr-1.5 shrink-0" />
                  <span>USDT, BTC, ETH, SOL</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-[#8250DF] mr-1.5 shrink-0" />
                  <span>15–30 Min Handover</span>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: Interactive GitHub Services Control Interface */}
            <div className="lg:col-span-6 relative">
              
              {/* 9. FLOATING SERVICE BADGES AROUND HERO (Desktop only to prevent clutter) */}
              <div className="hidden sm:block absolute -top-5 -left-4 z-20 animate-float-1">
                <div className="bg-white/95 backdrop-blur-md border border-[#D0D7DE] rounded-lg px-3 py-1.5 shadow-sm text-xs font-mono text-[#24292F] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2DA44E]" />
                  <strong>$5</strong> New Account
                </div>
              </div>

              <div className="hidden sm:block absolute -bottom-4 -left-6 z-20 animate-float-2">
                <div className="bg-white/95 backdrop-blur-md border border-[#D0D7DE] rounded-lg px-3 py-1.5 shadow-sm text-xs font-mono text-[#24292F] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D29922]" />
                  <strong>$35</strong> Aged Account
                </div>
              </div>

              <div className="hidden sm:block absolute -top-4 -right-4 z-20 animate-float-3">
                <div className="bg-white/95 backdrop-blur-md border border-[#D0D7DE] rounded-lg px-3 py-1.5 shadow-sm text-xs font-mono text-[#24292F] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#E3B341] fill-[#E3B341]" />
                  100 Stars — <strong>$50</strong>
                </div>
              </div>

              <div className="hidden sm:block absolute -bottom-5 -right-3 z-20 animate-float-4">
                <div className="bg-white/95 backdrop-blur-md border border-[#D0D7DE] rounded-lg px-3 py-1.5 shadow-sm text-xs font-mono text-[#24292F] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#58A6FF]" />
                  100 Followers — <strong>$45</strong>
                </div>
              </div>

              {/* 6 & 7. HERO RIGHT-SIDE INTERACTIVE VISUAL */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="bg-[#0D1117] border border-[#30363D] rounded-2xl shadow-xl overflow-hidden text-white relative"
              >
                
                {/* Control Interface Window Header */}
                <div className="bg-[#161B22] border-b border-[#30363D] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#EC6547]/80" />
                      <div className="w-3 h-3 rounded-full bg-[#E3B341]/80" />
                      <div className="w-3 h-3 rounded-full bg-[#2DA44E]/80" />
                    </div>
                    <span className="text-xs font-mono text-[#8B949E] ml-2">github-services-control.sh</span>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] font-mono text-[#2DA44E] bg-[#2DA44E]/10 border border-[#2DA44E]/30 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2DA44E] animate-ping" />
                    <span>SYSTEM ONLINE</span>
                  </div>
                </div>

                {/* Subheader: Category Selection Tabs */}
                <div className="grid grid-cols-2 bg-[#161B22]/50 border-b border-[#30363D] text-xs font-mono">
                  <button
                    onClick={() => setHeroInteractiveTab('accounts')}
                    className={`py-2.5 px-4 text-center font-medium transition-colors flex items-center justify-center space-x-2 border-b-2 ${
                      heroInteractiveTab === 'accounts'
                        ? 'border-[#2DA44E] text-white bg-[#0D1117]'
                        : 'border-transparent text-[#8B949E] hover:text-[#C9D1D9]'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#2DA44E]" />
                    <span>Account Services</span>
                  </button>

                  <button
                    onClick={() => setHeroInteractiveTab('promotion')}
                    className={`py-2.5 px-4 text-center font-medium transition-colors flex items-center justify-center space-x-2 border-b-2 ${
                      heroInteractiveTab === 'promotion'
                        ? 'border-[#2DA44E] text-white bg-[#0D1117]'
                        : 'border-transparent text-[#8B949E] hover:text-[#C9D1D9]'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 text-[#D29922]" />
                    <span>Promotion Services</span>
                  </button>
                </div>

                {/* Interactive Service Rows List */}
                <div className="p-4 sm:p-5 space-y-2">
                  
                  {heroInteractiveTab === 'accounts' ? (
                    <>
                      {[
                        { title: 'New Accounts', price: '$5', desc: 'Fresh verified accounts with full email access', slug: 'buy-new-github-accounts', tag: 'Instant' },
                        { title: 'Aged Accounts', price: '$35', desc: 'Established platform seniority & clean history', slug: 'buy-aged-github-accounts', tag: 'Popular' },
                        { title: 'Active Accounts', price: '$35', desc: 'Public contribution graph & past commits', slug: 'buy-active-github-accounts', tag: 'Verified' },
                        { title: 'Student Accounts', price: '$55', desc: 'Pre-approved GitHub Student Developer Pack', slug: 'buy-github-student-account', tag: 'Pack' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredHeroService(`acc-${idx}`)}
                          onMouseLeave={() => setHoveredHeroService(null)}
                          onClick={() => navigateTo(`/accounts/${item.slug}`)}
                          className="p-2.5 rounded-lg border border-[#30363D]/60 hover:border-[#2DA44E] bg-[#161B22]/60 hover:bg-[#161B22] transition-all duration-200 cursor-pointer flex items-center justify-between group hover:translate-x-1"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-[#2DA44E] font-mono text-xs">●</span>
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-[#C9D1D9] group-hover:text-white flex items-center gap-1.5">
                                <span>{item.title}</span>
                                <span className="text-[10px] bg-[#21262D] text-[#8B949E] px-1.5 py-0.2 rounded font-mono">
                                  {item.tag}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#8B949E] mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex items-center space-x-2 pl-2">
                            <span className="font-mono text-sm font-bold text-[#2DA44E]">
                              {item.price}
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#8B949E] group-hover:text-[#2DA44E] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {[
                        { title: 'GitHub Stars', price: '$17+', desc: 'Organic repository stars from active developers', slug: 'buy-github-stars', tag: 'Trending' },
                        { title: 'GitHub Followers', price: '$25+', desc: 'Safe profile followers to build social proof', slug: 'buy-github-followers', tag: 'Authority' },
                        { title: 'GitHub Forks', price: '$15+', desc: 'Repository branching signals and reach', slug: 'buy-github-forks', tag: 'Discovery' },
                        { title: 'GitHub Watchers', price: '$25+', desc: 'Notification subscriber metrics for releases', slug: 'buy-github-watchers', tag: 'Engagement' },
                        { title: 'Repository History', price: '$10+', desc: 'Clean commit histories and starter codebases', slug: 'buy-github-repositories', tag: 'Codebase' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredHeroService(`prom-${idx}`)}
                          onMouseLeave={() => setHoveredHeroService(null)}
                          onClick={() => navigateTo(`/promotion-services/${item.slug}`)}
                          className="p-2.5 rounded-lg border border-[#30363D]/60 hover:border-[#2DA44E] bg-[#161B22]/60 hover:bg-[#161B22] transition-all duration-200 cursor-pointer flex items-center justify-between group hover:translate-x-1"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-[#D29922] font-mono text-xs">●</span>
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-[#C9D1D9] group-hover:text-white flex items-center gap-1.5">
                                <span>{item.title}</span>
                                <span className="text-[10px] bg-[#21262D] text-[#8B949E] px-1.5 py-0.2 rounded font-mono">
                                  {item.tag}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#8B949E] mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex items-center space-x-2 pl-2">
                            <span className="font-mono text-sm font-bold text-[#2DA44E]">
                              {item.price}
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#8B949E] group-hover:text-[#2DA44E] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                </div>

                {/* Subtle Activity Node Line at bottom */}
                <div className="bg-[#161B22] border-t border-[#30363D] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-[#8B949E]">
                  <div className="flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#2DA44E]" />
                    <span>Activity Grid:</span>
                    <div className="flex space-x-1 pl-1">
                      <span className="w-2 h-2 rounded-xs bg-[#2DA44E]/30" />
                      <span className="w-2 h-2 rounded-xs bg-[#2DA44E]/60" />
                      <span className="w-2 h-2 rounded-xs bg-[#2DA44E]" />
                      <span className="w-2 h-2 rounded-xs bg-[#2DA44E]/80" />
                      <span className="w-2 h-2 rounded-xs bg-[#2DA44E]" />
                      <span className="w-2 h-2 rounded-xs bg-[#2DA44E]/40" />
                    </div>
                  </div>
                  <span className="text-[#58A6FF] hover:underline cursor-pointer" onClick={() => navigateTo(heroInteractiveTab === 'accounts' ? '/accounts' : '/promotion-services')}>
                    View All &rarr;
                  </span>
                </div>

              </motion.div>

            </div>

          </div>

          {/* 10. HERO SCROLL INDICATOR */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={scrollToServices}
              className="group flex flex-col items-center text-xs font-mono text-[#57606A] hover:text-[#24292F] transition-colors focus:outline-none"
            >
              <span>Explore Services</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-1"
              >
                <ChevronDown className="w-4 h-4 text-[#2DA44E] group-hover:scale-110 transition-transform" />
              </motion.div>
            </button>
          </div>

        </div>
      </section>

      {/* 11. TRUST STRIP */}
      <section className="bg-white border-b border-[#D0D7DE] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F6F8FA] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#E1F0DA] border border-[#2DA44E]/30 flex items-center justify-center text-[#1A7F37] shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#24292F]">Clear Pricing</h4>
                <p className="text-[11px] sm:text-xs text-[#57606A] mt-0.5">Fixed rates with volume discounts</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F6F8FA] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#DDF4FF] border border-[#54AEFF]/30 flex items-center justify-center text-[#0969DA] shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#24292F]">Multiple Service Options</h4>
                <p className="text-[11px] sm:text-xs text-[#57606A] mt-0.5">Diverse account ages &amp; tiers</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F6F8FA] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#FBEFFF] border border-[#D157FF]/30 flex items-center justify-center text-[#8250DF] shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#24292F]">Direct Support</h4>
                <p className="text-[11px] sm:text-xs text-[#57606A] mt-0.5">Telegram &amp; WhatsApp engineers</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F6F8FA] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#FFF8C5] border border-[#D29922]/30 flex items-center justify-center text-[#9A6700] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#24292F]">Crypto Payment</h4>
                <p className="text-[11px] sm:text-xs text-[#57606A] mt-0.5">USDT, BTC, ETH, SOL, LTC</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12 & 13. SERVICE CATEGORY SECTION ("Choose What You Need") */}
      <section id="services-section" className="py-16 md:py-20 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight">
              Choose What You Need
            </h2>
            <p className="text-sm text-[#57606A] mt-2">
              Select between verified developer accounts or targeted repository promotion services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Block 1: GitHub Accounts */}
            <div 
              onClick={() => navigateTo('/accounts')}
              className="bg-white border border-[#D0D7DE] rounded-2xl p-8 sm:p-10 shadow-2xs hover:shadow-md hover:border-[#24292F] transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#F6F8FA] border border-[#D0D7DE] flex items-center justify-center text-[#24292F] group-hover:bg-[#24292F] group-hover:text-white transition-colors duration-200">
                  <Terminal className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors">
                      GitHub Accounts
                    </h3>
                    <span className="text-xs font-mono font-semibold text-[#1A7F37] bg-[#E1F0DA] px-2.5 py-1 rounded border border-[#2DA44E]/30">
                      From $5
                    </span>
                  </div>

                  <p className="text-sm text-[#57606A] mt-3 leading-relaxed">
                    Explore new, aged, active, student and bulk account options. Fully verified with direct primary mailbox handover and 48-hour warranty.
                  </p>

                  <div className="mt-6 space-y-2 text-xs text-[#57606A]">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#2DA44E] mr-2" />
                      <span>New verified accounts with primary email mailbox</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#2DA44E] mr-2" />
                      <span>Aged tenure accounts with natural platform seniority</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#2DA44E] mr-2" />
                      <span>GitHub Student Developer Pack approved accounts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D0D7DE] flex items-center justify-between">
                <span className="text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors flex items-center">
                  Explore Accounts
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </span>
                <span className="text-xs text-[#8C959F] font-mono">6 configurations available</span>
              </div>
            </div>

            {/* Block 2: GitHub Promotion Services */}
            <div 
              onClick={() => navigateTo('/promotion-services')}
              className="bg-white border border-[#D0D7DE] rounded-2xl p-8 sm:p-10 shadow-2xs hover:shadow-md hover:border-[#24292F] transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#F6F8FA] border border-[#D0D7DE] flex items-center justify-center text-[#24292F] group-hover:bg-[#24292F] group-hover:text-white transition-colors duration-200">
                  <Star className="w-7 h-7 text-[#D29922] group-hover:scale-110 transition-transform" />
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors">
                      GitHub Promotion Services
                    </h3>
                    <span className="text-xs font-mono font-semibold text-[#1A7F37] bg-[#E1F0DA] px-2.5 py-1 rounded border border-[#2DA44E]/30">
                      From $10
                    </span>
                  </div>

                  <p className="text-sm text-[#57606A] mt-3 leading-relaxed">
                    Explore stars, followers, forks, watchers and repository-related services. Organic delivery cadence with non-drop warranty protection.
                  </p>

                  <div className="mt-6 space-y-2 text-xs text-[#57606A]">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#2DA44E] mr-2" />
                      <span>Natural paced repository stars from verified profiles</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#2DA44E] mr-2" />
                      <span>Profile followers, codebase forks &amp; repository watchers</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#2DA44E] mr-2" />
                      <span>Pre-built repository codebases with commit histories</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D0D7DE] flex items-center justify-between">
                <span className="text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors flex items-center">
                  Explore Promotion Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </span>
                <span className="text-xs text-[#8C959F] font-mono">8 promotion options</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 14 & 15. POPULAR SERVICES (Staggered Animation Reveal) */}
      <section className="py-16 md:py-20 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
                Curated Developer Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
                Popular Services
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#57606A] mt-2 md:mt-0 max-w-md">
              Top developer selections with rapid delivery, primary mailbox handover, and warranty protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServicesList.map((service, idx) => {
              const path = service.category === 'accounts' ? `/accounts/${service.slug}` : `/promotion-services/${service.slug}`;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white border border-[#D0D7DE] rounded-xl p-6 flex flex-col justify-between hover:border-[#24292F] transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-semibold text-[#57606A] bg-[#F6F8FA] px-2 py-0.5 rounded border border-[#D0D7DE]">
                        {service.badge}
                      </span>
                      <div className="text-right">
                        <span className="text-base font-mono font-extrabold text-[#1A7F37]">
                          {service.price}
                        </span>
                        <span className="block text-[10px] text-[#8C959F] font-mono">
                          {service.unit}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                      <button onClick={() => navigateTo(path)} className="text-left">
                        {service.name}
                      </button>
                    </h3>

                    <p className="text-xs text-[#57606A] mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D0D7DE]/70 flex items-center justify-between text-xs">
                    <button
                      onClick={() => navigateTo(path)}
                      className="text-[#0969DA] font-semibold hover:underline flex items-center"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => navigateTo(`/checkout?service=${service.id}`)}
                      className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-[11px] font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <ShoppingCart className="w-3 h-3 text-[#2DA44E]" />
                      <span>Instant Buy</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 16 & 17. INTERACTIVE PRICE SECTION ("Simple Pricing") */}
      <section className="py-16 md:py-20 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
              Transparent &amp; Guaranteed Rates
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
              Simple Pricing
            </h2>
            <p className="text-sm text-[#57606A] mt-2">
              Select a service category below to view official package volumes and guaranteed rates.
            </p>
          </div>

          {/* Pricing Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { key: 'accounts', label: 'Accounts', icon: Terminal },
              { key: 'stars', label: 'Stars', icon: Star },
              { key: 'followers', label: 'Followers', icon: Users },
              { key: 'forks', label: 'Forks', icon: GitFork },
              { key: 'watchers', label: 'Watchers', icon: Eye },
              { key: 'repositories', label: 'Repositories', icon: FolderGit2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = pricingTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setPricingTab(tab.key as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#24292F] text-white shadow-xs'
                      : 'bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#24292F] hover:border-[#8C959F]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2DA44E]' : 'text-[#8C959F]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Animated Tab Content Table / Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pricingTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-[#D0D7DE] rounded-xl shadow-xs overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F6F8FA] border-b border-[#D0D7DE] text-[#24292F] font-semibold">
                      <th className="p-4 sm:p-5">Service Tier / Package</th>
                      <th className="p-4 sm:p-5">Price (USD)</th>
                      <th className="p-4 sm:p-5 hidden sm:table-cell">Unit / Rate</th>
                      <th className="p-4 sm:p-5 hidden md:table-cell">Turnaround</th>
                      <th className="p-4 sm:p-5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D0D7DE]">
                    {pricingData[pricingTab].map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F6F8FA]/80 transition-colors group">
                        <td className="p-4 sm:p-5">
                          <button
                            onClick={() => navigateTo(row.path)}
                            className="font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors text-left block"
                          >
                            {row.name}
                          </button>
                          <span className="text-[11px] text-[#57606A] mt-0.5 block">
                            {row.notes}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5">
                          <span className="font-mono font-extrabold text-[#1A7F37] text-base group-hover:scale-105 inline-block transition-transform">
                            {row.price}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5 text-[#57606A] font-mono text-xs hidden sm:table-cell">
                          {row.unit}
                        </td>
                        <td className="p-4 sm:p-5 text-[#57606A] text-xs hidden md:table-cell">
                          {row.time}
                        </td>
                        <td className="p-4 sm:p-5">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => navigateTo(row.path)}
                              className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-[#24292F] text-xs font-semibold px-2.5 py-1.5 rounded transition-colors hidden sm:inline-block"
                            >
                              Specs
                            </button>
                            <button
                              onClick={() => navigateTo(`/checkout?service=${row.id}`)}
                              className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center space-x-1 transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>Order</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 18. HOW IT WORKS (Horizontal Animated Timeline) */}
      <section className="py-16 md:py-20 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
              Fulfillment Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
              How It Works
            </h2>
            <p className="text-sm text-[#57606A] mt-2">
              From service selection to full credential handover in six straightforward steps.
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {howItWorksSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-6 relative hover:border-[#24292F] transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-lg bg-[#24292F] text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-mono text-[#2DA44E] bg-[#E1F0DA] px-2 py-0.5 rounded font-bold">
                    Phase {idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-[#57606A] mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Direct Support Contact Line */}
          <div className="mt-10 p-4 bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl flex flex-col sm:flex-row items-center justify-between text-xs text-[#57606A] gap-4">
            <div className="flex items-center space-x-2 text-[#24292F] font-medium">
              <Sparkles className="w-4 h-4 text-[#0969DA]" />
              <span>Need custom volume or organization-level invoicing?</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://t.me/EgSupport24"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0969DA] font-semibold hover:underline flex items-center"
              >
                <Send className="w-3 h-3 mr-1" />
                Telegram Support
              </a>
              <span className="text-[#D0D7DE]">|</span>
              <a
                href="https://wa.me/13073939979"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A7F37] font-semibold hover:underline flex items-center"
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                WhatsApp Support
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 19. WHY CHOOSE US (Editorial Section) */}
      <section className="py-16 md:py-20 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Editorial Heading */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
                Platform Standards
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#24292F] tracking-tight leading-tight">
                Everything You Need in One Place
              </h2>
              <p className="text-sm text-[#57606A] leading-relaxed">
                BuyGitHubAccounts.com delivers dependable infrastructure for software developers, QA automation teams, and open-source project creators worldwide.
              </p>
              <div className="p-4 bg-white border border-[#D0D7DE] rounded-xl space-y-2 text-xs text-[#57606A]">
                <div className="font-bold text-[#24292F]">Security &amp; Privacy First</div>
                <p>All account transactions are performed with zero tracking, direct primary email credential transfer, and no secondary access retained.</p>
              </div>
            </div>

            {/* Right: Animated Checklist */}
            <div className="lg:col-span-7 bg-white border border-[#D0D7DE] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="space-y-4">
                {[
                  { title: 'Clear service pricing', desc: 'Guaranteed published rates with no hidden fees or post-checkout surprises.' },
                  { title: 'Multiple account options', desc: 'Fresh accounts, aged tenure, commit history profiles, and approved Student Pack setups.' },
                  { title: 'Direct customer support', desc: 'Live human engineering support via Telegram (@EgSupport24) and WhatsApp.' },
                  { title: 'Straightforward ordering', desc: 'Intuitive self-service checkout or direct agent assistance within minutes.' },
                  { title: 'Multiple service categories', desc: 'Comprehensive coverage across stars, followers, forks, watchers, and codebases.' },
                  { title: 'Crypto payment availability', desc: 'Instant settlement with USDT TRC20/ERC20, Bitcoin, Ethereum, Solana, and LTC.' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F6F8FA] transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E1F0DA] text-[#1A7F37] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#24292F]">{item.title}</h4>
                      <p className="text-xs text-[#57606A] mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 20. ANIMATED SERVICE EXPLORER (SaaS Navigation Interface) */}
      <section className="py-16 md:py-20 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
              Interactive Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
              Explore Our Services
            </h2>
            <p className="text-sm text-[#57606A] mt-2">
              Browse our complete catalog by technical classification and view real-time package details.
            </p>
          </div>

          {/* Interactive SaaS Browser Frame */}
          <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-2xl overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Categories List */}
            <div className="lg:col-span-4 bg-white border-b lg:border-b-0 lg:border-r border-[#D0D7DE] p-4 sm:p-6 space-y-1.5">
              <div className="text-xs font-bold font-mono text-[#8C959F] uppercase tracking-wider px-3 py-1 mb-1">
                Categories
              </div>

              {[
                { key: 'accounts', label: 'Accounts', count: '6 tiers', icon: Terminal },
                { key: 'stars', label: 'Stars', count: '5 packages', icon: Star },
                { key: 'followers', label: 'Followers', count: '4 tiers', icon: Users },
                { key: 'forks', label: 'Forks', count: '4 tiers', icon: GitFork },
                { key: 'watchers', label: 'Watchers', count: '4 tiers', icon: Eye },
                { key: 'repositories', label: 'Repositories', count: '3 setups', icon: FolderGit2 },
                { key: 'achievements', label: 'Achievements', count: '3 badges', icon: Award },
              ].map((cat) => {
                const Icon = cat.icon;
                const isSelected = explorerCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setExplorerCategory(cat.key as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#24292F] text-white shadow-xs'
                        : 'text-[#57606A] hover:bg-[#F6F8FA] hover:text-[#24292F]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#2DA44E]' : 'text-[#8C959F]'}`} />
                      <span>{cat.label}</span>
                    </div>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-[#8B949E]' : 'text-[#8C959F]'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Service Items Grid */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-[#F6F8FA]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D0D7DE]">
                <span className="text-xs font-bold text-[#24292F] uppercase tracking-wider font-mono">
                  Available {explorerCategory.toUpperCase()} Options:
                </span>
                <button
                  onClick={() => navigateTo(explorerCategory === 'accounts' ? '/accounts' : '/promotion-services')}
                  className="text-xs text-[#0969DA] font-semibold hover:underline"
                >
                  View full category &rarr;
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={explorerCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {explorerServicesData[explorerCategory].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigateTo(item.path)}
                      className="bg-white border border-[#D0D7DE] rounded-xl p-4 hover:border-[#24292F] transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors line-clamp-1">
                            {item.name}
                          </span>
                          <span className="font-mono font-bold text-[#1A7F37] text-xs">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#57606A] line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#D0D7DE]/60 flex items-center justify-between text-[10px] text-[#8C959F]">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.time}
                        </span>
                        <span className="text-[#0969DA] font-semibold group-hover:translate-x-0.5 transition-transform">
                          Details &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 21. SEO CONTENT SECTION */}
      <section className="py-16 md:py-20 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-[#D0D7DE] pb-4 mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
              Platform Documentation &amp; Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
              GitHub Accounts &amp; Promotion Services
            </h2>
          </div>

          <div className="prose prose-sm max-w-none text-[#57606A] space-y-6 text-xs sm:text-sm leading-relaxed">
            
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#24292F] mb-2">
                GitHub Account Services
              </h3>
              <p>
                Developer accounts serve as the primary identity for collaborating on open-source codebases, configuring continuous integration pipelines, and deploying software infrastructure. BuyGitHubAccounts.com offers verified developer accounts prepared specifically for software engineering teams, independent consultants, and QA automation departments. Explore our catalog of <a href="/accounts/buy-new-github-accounts" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-new-github-accounts'); } }} className="text-[#0969DA] font-semibold hover:underline">new GitHub accounts</a>, <a href="/accounts/buy-developer-verified-github-accounts" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-developer-verified-github-accounts'); } }} className="text-[#0969DA] font-semibold hover:underline">developer-verified profiles</a>, and <a href="/accounts/buy-bulk-github-accounts" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-bulk-github-accounts'); } }} className="text-[#0969DA] font-semibold hover:underline">bulk GitHub accounts</a>. Every account is provisioned with primary email mailbox credentials to ensure the purchaser retains full sovereignty over login credentials, secondary two-factor authentication, and notification settings.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#24292F] mb-2">
                Aged and Active Accounts
              </h3>
              <p>
                In platform verification algorithms and automated code analysis tooling, account age and historical commit activity are key factors in trust evaluation. Our <a href="/accounts/buy-aged-github-accounts" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-aged-github-accounts'); } }} className="text-[#0969DA] font-semibold hover:underline">aged GitHub accounts</a> benefit from long-standing platform tenure (2015–2024), allowing engineering departments to avoid the velocity limits often applied to newly registered profiles. <a href="/accounts/buy-github-active-account" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-github-active-account'); } }} className="text-[#0969DA] font-semibold hover:underline">Active accounts</a> and <a href="/accounts/buy-green-heatmap-github-accounts" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-green-heatmap-github-accounts'); } }} className="text-[#0969DA] font-semibold hover:underline">green heatmap profiles</a> feature structured contribution graphs and public activity history, providing credible developer profiles for technical demonstrations, open-source maintainership, and professional portfolio presentation.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#24292F] mb-2">
                GitHub Promotion Services
              </h3>
              <p>
                Promoting software projects in high-density package ecosystems requires consistent visibility signals. Our complete <a href="/promotion-services" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/promotion-services'); } }} className="text-[#0969DA] font-semibold hover:underline">repository promotion solutions</a> are engineered to simulate organic developer discovery across search indices and curated showcase feeds. Services are delivered with deliberate rate pacing from established developer profiles to ensure stability and platform compliance.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#24292F] mb-2">
                Stars, Followers and Forks
              </h3>
              <p>
                Repository stars act as a key indicator of quality for software repositories, influencing trending algorithms and open-source adoption. Order authentic <a href="/promotion-services/buy-github-stars" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/promotion-services/buy-github-stars'); } }} className="text-[#0969DA] font-semibold hover:underline">GitHub stars</a> to increase repository traction, <a href="/promotion-services/buy-github-followers" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/promotion-services/buy-github-followers'); } }} className="text-[#0969DA] font-semibold hover:underline">developer followers</a> to expand profile authority, and codebase <a href="/promotion-services/buy-github-forks" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/promotion-services/buy-github-forks'); } }} className="text-[#0969DA] font-semibold hover:underline">GitHub forks</a> to reflect real-world developer branching. All promotion orders include non-drop warranty protection and clear tracking parameters.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#24292F] mb-2">
                Choosing the Right Service
              </h3>
              <p>
                When selecting between accounts and promotion packages, evaluate your project lifecycle and deployment needs. If your team requires clean environments for isolated testing or continuous integration runners, our <a href="/accounts/buy-new-github-accounts" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-new-github-accounts'); } }} className="text-[#0969DA] font-semibold hover:underline">new</a> or <a href="/accounts/buy-bulk-github-accounts" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/accounts/buy-bulk-github-accounts'); } }} className="text-[#0969DA] font-semibold hover:underline">bulk accounts</a> provide cost-effective solutions. For organizations seeking to establish credibility for new repositories, our staged star and follower packages deliver safe, proportional growth. Check our <a href="/faq" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/faq'); } }} className="text-[#0969DA] font-semibold hover:underline">FAQ guide</a> for comprehensive answers to common developer questions.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#24292F] mb-2">
                Ordering and Support
              </h3>
              <p>
                Orders are processed seamlessly via our <a href="/payment-methods" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/payment-methods'); } }} className="text-[#0969DA] font-semibold hover:underline">cryptocurrency checkout gateway</a> or directly with our technical support team via Telegram (<a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" className="text-[#0969DA] font-semibold hover:underline">@EgSupport24</a>) and WhatsApp (<a href="https://wa.me/13073939979" target="_blank" rel="noopener noreferrer" className="text-[#0969DA] font-semibold hover:underline">+1 307 393-9979</a>). Visit our <a href="/contact" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/contact'); } }} className="text-[#0969DA] font-semibold hover:underline">contact page</a> for additional channels. All packages feature fixed published pricing, instant delivery turnarounds, and a <a href="/refund-policy" onClick={(e) => { if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); navigateTo('/refund-policy'); } }} className="text-[#0969DA] font-semibold hover:underline">48-Hour Replacement Guarantee</a> for complete peace of mind.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 22. FAQ SECTION (Accordion Animation) */}
      <section className="py-16 md:py-20 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
                Common Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
                Frequently Asked Questions
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/faq')}
              className="mt-3 sm:mt-0 text-xs font-semibold text-[#0969DA] hover:underline flex items-center"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#D0D7DE] rounded-xl overflow-hidden transition-colors duration-150"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-xs sm:text-sm text-[#24292F] hover:text-[#0969DA] transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 shrink-0 text-[#57606A]"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#57606A] leading-relaxed border-t border-[#D0D7DE]/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 23. BLOG SECTION ("Latest From the Blog") */}
      <section className="py-16 md:py-20 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969DA]">
                Engineering Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
                Latest From the Blog
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/blog')}
              className="mt-3 sm:mt-0 text-xs font-semibold text-[#0969DA] hover:underline flex items-center"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => navigateTo(`/blog/${post.slug}`)}
                className="bg-white border border-[#D0D7DE] rounded-xl overflow-hidden hover:border-[#24292F] transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Minimal Thumbnail Header */}
                  <div className="bg-[#F6F8FA] border-b border-[#D0D7DE] p-5 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#0969DA] bg-white px-2 py-0.5 rounded border border-[#D0D7DE] font-semibold">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-[#8C959F] font-mono">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-sm sm:text-base font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#57606A] mt-2.5 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#0969DA] font-semibold group-hover:underline">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* 24. FINAL CTA (Dark GitHub-Inspired Section with Animated Grid) */}
      <section className="py-20 bg-[#0D1117] text-white relative overflow-hidden border-t border-[#30363D]">
        
        {/* Animated Technical Grid */}
        <div className="absolute inset-0 animated-grid-dark opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2DA44E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-[#161B22] border border-[#30363D] px-3.5 py-1.5 rounded-full text-xs font-mono text-[#2DA44E]">
            <span className="w-2 h-2 rounded-full bg-[#2DA44E] animate-pulse" />
            <span>24/7 TECHNICAL ADVISORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Need Help Choosing a Service?
          </h2>

          <p className="text-sm sm:text-base text-[#8B949E] max-w-xl mx-auto leading-relaxed">
            Tell us what you're looking for and contact our support team for assistance. We provide customized configurations, volume discounts, and immediate credential handover.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-sm font-bold px-6 py-3.5 rounded-lg flex items-center space-x-2 shadow-lg shadow-[#2DA44E]/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>Telegram @EgSupport24</span>
            </a>

            <a
              href="https://wa.me/13073939979"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-white text-sm font-bold px-6 py-3.5 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-[#2DA44E]" />
              <span>WhatsApp +1 (307) 393-9979</span>
            </a>
          </div>

          <div className="pt-6 text-xs text-[#8B949E] font-mono">
            Average response time: &lt; 5 minutes &bull; Instant Crypto Invoicing &bull; 48-Hour Warranty
          </div>

        </div>
      </section>

    </div>
  );
};
