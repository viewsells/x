import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  ChevronDown, 
  Menu, 
  X, 
  Send, 
  MessageSquare, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Clock,
  GraduationCap,
  Layers,
  GitFork,
  Activity,
  Building2,
  Globe2,
  FolderGit2,
  Code2,
  CheckCircle2,
  Eye,
  Award
} from 'lucide-react';
import { navigateTo } from '../utils/router';
import { accountServices } from '../data/accountServicesData';
import { promotionServices } from '../data/promotionServicesData';

interface HeaderProps {
  currentPath: string;
  onOpenOrderModal?: (serviceId?: string) => void;
}

export const Header = ({ currentPath }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'accounts' | 'promotion' | null>(null);
  const [mobileAccountsOpen, setMobileAccountsOpen] = useState(false);
  const [mobilePromotionOpen, setMobilePromotionOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    navigateTo(path);
  };

  const isCurrent = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleMouseEnter = (menu: 'accounts' | 'promotion') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Helper icons for account services
  const getAccountIcon = (slug: string) => {
    switch (slug) {
      case 'buy-new-github-accounts': return Sparkles;
      case 'buy-aged-github-accounts': return Clock;
      case 'buy-old-github-accounts': return Clock;
      case 'buy-github-account-with-commits': return Activity;
      case 'buy-github-account-with-stars': return Star;
      case 'buy-github-student-account': return GraduationCap;
      case 'buy-bulk-github-accounts': return Layers;
      case 'buy-github-organization-accounts': return Building2;
      case 'buy-usa-uk-github-accounts': return Globe2;
      case 'buy-github-enterprise-accounts': return ShieldCheck;
      case 'buy-green-heatmap-github-accounts': return Activity;
      case 'buy-github-accounts-with-followers': return Users;
      case 'buy-github-accounts-with-repositories': return FolderGit2;
      case 'buy-github-copilot-accounts': return Code2;
      case 'buy-developer-verified-github-accounts': return CheckCircle2;
      default: return Terminal;
    }
  };

  // Helper icons for promotion services
  const getPromotionIcon = (slug: string) => {
    switch (slug) {
      case 'buy-github-stars': return Star;
      case 'buy-github-forks': return GitFork;
      case 'buy-github-followers': return Users;
      case 'buy-github-watchers': return Eye;
      case 'buy-github-repositories': return FolderGit2;
      case 'buy-github-achievements-badge': return Award;
      default: return Sparkles;
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#161B22]/95 backdrop-blur-md border-b border-[#30363D] shadow-md shadow-black/20'
          : 'bg-[#161B22] border-b border-[#30363D]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              id="header-brand-logo"
              onClick={() => handleNavClick('/')}
              className="flex items-center space-x-2.5 text-left focus:outline-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#238636] flex items-center justify-center text-white shadow-xs group-hover:bg-[#2EA043] transition-colors">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-base font-semibold tracking-tight text-white flex items-center">
                BuyGitHubAccounts<span className="text-[#2EA043]">.com</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => handleNavClick('/')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                isCurrent('/') && currentPath === '/'
                  ? 'text-white font-semibold bg-[#21262D]'
                  : 'text-[#8B949E] hover:text-white hover:bg-[#21262D]/60'
              }`}
            >
              Home
            </button>

            {/* 1. Accounts Dropdown with ALL 15 Services */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('accounts')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-accounts-dropdown"
                onClick={() => handleNavClick('/accounts')}
                className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 transition-colors ${
                  isCurrent('/accounts') || activeDropdown === 'accounts'
                    ? 'text-white font-semibold bg-[#21262D]'
                    : 'text-[#8B949E] hover:text-white hover:bg-[#21262D]/60'
                }`}
              >
                <span>Accounts</span>
                <span className="text-[10px] font-mono bg-[#238636]/20 text-[#2EA043] px-1.5 py-0.5 rounded font-bold">
                  15
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'accounts' ? 'rotate-180 text-white' : 'text-[#8B949E]'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'accounts' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 w-[620px] bg-[#161B22] border border-[#30363D] rounded-xl shadow-2xl p-3 z-50 mt-1"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#30363D]/80 px-2">
                      <span className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">
                        All GitHub Accounts ({accountServices.length})
                      </span>
                      <button
                        onClick={() => handleNavClick('/accounts')}
                        className="text-xs text-[#58A6FF] hover:underline font-medium flex items-center gap-1"
                      >
                        <span>View catalog</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* 2-Column Grid with all 15 services */}
                    <div className="grid grid-cols-2 gap-1 max-h-[380px] overflow-y-auto pr-1">
                      {accountServices.map((service) => {
                        const Icon = getAccountIcon(service.slug);
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleNavClick(`/accounts/${service.slug}`)}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#21262D] transition-colors flex items-center justify-between text-xs text-[#C9D1D9] hover:text-white group"
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              <Icon className="w-3.5 h-3.5 text-[#8B949E] group-hover:text-[#2EA043] shrink-0" />
                              <span className="truncate font-medium">{service.name}</span>
                            </div>
                            <span className="font-mono text-[#2EA043] font-semibold text-[11px] shrink-0">
                              {service.basePrice}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#30363D]/80 px-2 flex items-center justify-between text-[11px] text-[#8B949E]">
                      <span>⚡ Instant &amp; Safe Manual Delivery</span>
                      <span className="text-[#C9D1D9]">48h Warranty Included</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Promotion Services Dropdown with ALL 6 Services */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('promotion')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-promotion-dropdown"
                onClick={() => handleNavClick('/promotion-services')}
                className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 transition-colors ${
                  isCurrent('/promotion-services') || activeDropdown === 'promotion'
                    ? 'text-white font-semibold bg-[#21262D]'
                    : 'text-[#8B949E] hover:text-white hover:bg-[#21262D]/60'
                }`}
              >
                <span>Services</span>
                <span className="text-[10px] font-mono bg-[#E3B341]/20 text-[#E3B341] px-1.5 py-0.5 rounded font-bold">
                  6
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'promotion' ? 'rotate-180 text-white' : 'text-[#8B949E]'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'promotion' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 w-[420px] bg-[#161B22] border border-[#30363D] rounded-xl shadow-2xl p-3 z-50 mt-1"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#30363D]/80 px-2">
                      <span className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">
                        Repository &amp; Profile Growth ({promotionServices.length})
                      </span>
                      <button
                        onClick={() => handleNavClick('/promotion-services')}
                        className="text-xs text-[#58A6FF] hover:underline font-medium flex items-center gap-1"
                      >
                        <span>View all</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      {promotionServices.map((service) => {
                        const Icon = getPromotionIcon(service.slug);
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleNavClick(`/promotion-services/${service.slug}`)}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#21262D] transition-colors flex items-center justify-between text-xs text-[#C9D1D9] hover:text-white group"
                          >
                            <div className="flex items-center gap-2.5 truncate pr-2">
                              <Icon className="w-4 h-4 text-[#8B949E] group-hover:text-[#E3B341] shrink-0" />
                              <div>
                                <div className="font-medium text-white group-hover:text-[#58A6FF] transition-colors">
                                  {service.name}
                                </div>
                                <div className="text-[11px] text-[#8B949E] truncate max-w-[240px]">
                                  {service.priceUnit}
                                </div>
                              </div>
                            </div>
                            <span className="font-mono text-[#2EA043] font-semibold text-xs shrink-0">
                              {service.basePrice}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="nav-blog"
              onClick={() => handleNavClick('/blog')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                isCurrent('/blog')
                  ? 'text-white font-semibold bg-[#21262D]'
                  : 'text-[#8B949E] hover:text-white hover:bg-[#21262D]/60'
              }`}
            >
              Blog
            </button>

            <button
              id="nav-faq"
              onClick={() => handleNavClick('/faq')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                isCurrent('/faq')
                  ? 'text-white font-semibold bg-[#21262D]'
                  : 'text-[#8B949E] hover:text-white hover:bg-[#21262D]/60'
              }`}
            >
              FAQ
            </button>

            <button
              id="nav-contact"
              onClick={() => handleNavClick('/contact')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                isCurrent('/contact')
                  ? 'text-white font-semibold bg-[#21262D]'
                  : 'text-[#8B949E] hover:text-white hover:bg-[#21262D]/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#8B949E] hover:text-[#58A6FF] flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-[#21262D] transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>@EgSupport24</span>
            </a>

            <button
              id="header-cta-explore"
              onClick={() => handleNavClick('/accounts')}
              className="bg-[#238636] hover:bg-[#2EA043] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Explore Accounts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#C9D1D9] hover:text-white hover:bg-[#21262D] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu with Sub-menus */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-[#161B22] border-b border-[#30363D] shadow-xl px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto"
          >
            {/* Primary Nav Links & Accordion Sub-menus */}
            <div className="space-y-1">
              {/* Home */}
              <button
                onClick={() => handleNavClick('/')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPath === '/' ? 'bg-[#21262D] text-white font-semibold' : 'text-[#C9D1D9] hover:bg-[#21262D]'
                }`}
              >
                Home
              </button>

              {/* 1. Mobile Accounts Sub-Menu Accordion */}
              <div>
                <button
                  onClick={() => setMobileAccountsOpen(!mobileAccountsOpen)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    currentPath.startsWith('/accounts') ? 'bg-[#21262D] text-white font-semibold' : 'text-[#C9D1D9] hover:bg-[#21262D]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>GitHub Accounts</span>
                    <span className="text-[10px] font-mono font-bold bg-[#238636]/20 text-[#2EA043] px-1.5 py-0.5 rounded">
                      15
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#8B949E] transition-transform duration-200 ${mobileAccountsOpen ? 'rotate-180 text-white' : ''}`} />
                </button>

                {mobileAccountsOpen && (
                  <div className="mt-1 ml-2 pl-2 border-l-2 border-[#238636] space-y-0.5 py-1">
                    {accountServices.map((service) => {
                      const Icon = getAccountIcon(service.slug);
                      return (
                        <button
                          key={service.id}
                          onClick={() => handleNavClick(`/accounts/${service.slug}`)}
                          className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#21262D] text-xs flex items-center justify-between text-[#C9D1D9] hover:text-white"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <Icon className="w-3.5 h-3.5 text-[#8B949E] shrink-0" />
                            <span className="truncate">{service.name}</span>
                          </div>
                          <span className="font-mono text-[#2EA043] font-semibold text-[11px] shrink-0">
                            {service.basePrice}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handleNavClick('/accounts')}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-[#58A6FF] hover:underline font-medium"
                    >
                      View all accounts catalog &rarr;
                    </button>
                  </div>
                )}
              </div>

              {/* 2. Mobile Promotion Sub-Menu Accordion */}
              <div>
                <button
                  onClick={() => setMobilePromotionOpen(!mobilePromotionOpen)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    currentPath.startsWith('/promotion-services') ? 'bg-[#21262D] text-white font-semibold' : 'text-[#C9D1D9] hover:bg-[#21262D]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Promotion Services</span>
                    <span className="text-[10px] font-mono font-bold bg-[#E3B341]/20 text-[#E3B341] px-1.5 py-0.5 rounded">
                      6
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#8B949E] transition-transform duration-200 ${mobilePromotionOpen ? 'rotate-180 text-white' : ''}`} />
                </button>

                {mobilePromotionOpen && (
                  <div className="mt-1 ml-2 pl-2 border-l-2 border-[#E3B341] space-y-0.5 py-1">
                    {promotionServices.map((service) => {
                      const Icon = getPromotionIcon(service.slug);
                      return (
                        <button
                          key={service.id}
                          onClick={() => handleNavClick(`/promotion-services/${service.slug}`)}
                          className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#21262D] text-xs flex items-center justify-between text-[#C9D1D9] hover:text-white"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <Icon className="w-3.5 h-3.5 text-[#E3B341] shrink-0" />
                            <span className="truncate">{service.name}</span>
                          </div>
                          <span className="font-mono text-[#2EA043] font-semibold text-[11px] shrink-0">
                            {service.basePrice}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handleNavClick('/promotion-services')}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-[#58A6FF] hover:underline font-medium"
                    >
                      View all promotion services &rarr;
                    </button>
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              <button
                onClick={() => handleNavClick('/blog')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPath.startsWith('/blog') ? 'bg-[#21262D] text-white font-semibold' : 'text-[#C9D1D9] hover:bg-[#21262D]'
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => handleNavClick('/faq')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPath === '/faq' ? 'bg-[#21262D] text-white font-semibold' : 'text-[#C9D1D9] hover:bg-[#21262D]'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentPath === '/contact' ? 'bg-[#21262D] text-white font-semibold' : 'text-[#C9D1D9] hover:bg-[#21262D]'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="pt-2 border-t border-[#30363D] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://t.me/EgSupport24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#21262D] text-[#58A6FF] text-xs font-medium border border-[#30363D]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://wa.me/13073939979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#21262D] text-[#2EA043] text-xs font-medium border border-[#30363D]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => handleNavClick('/accounts')}
                className="w-full bg-[#238636] hover:bg-[#2EA043] text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View All Accounts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};
