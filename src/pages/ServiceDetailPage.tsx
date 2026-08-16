import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Star, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Lock, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown,
  ShoppingCart,
  Zap,
  Tag,
  Coins,
  FileText,
  Layers,
  Sparkles,
  HelpCircle,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  Mail,
  Shield,
  Award,
  Users,
  GitFork,
  Eye,
  Activity,
  FolderGit2
} from 'lucide-react';
import { ServiceItem } from '../types';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceHeroVisual } from '../components/ServiceHeroVisual';
import { ProductVisual, getServiceSKU } from '../components/ProductVisual';
import { allServices, getServicesByCategory } from '../data/allServices';
import { blogPosts } from '../data/blogData';
import { navigateTo } from '../utils/router';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onOpenOrderModal: (serviceId?: string) => void;
}

export const ServiceDetailPage = ({ service, onOpenOrderModal }: ServiceDetailPageProps) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'specs' | 'pricing' | 'how-it-works'>('overview');

  const isAccount = service.category === 'accounts';
  const categoryPath = isAccount ? '/accounts' : '/promotion-services';
  const categoryLabel = isAccount ? 'GitHub Accounts' : 'Promotion Services';
  const categoryShortLabel = isAccount ? 'GITHUB ACCOUNT SERVICE' : 'GITHUB PROMOTION SERVICE';

  // Related services (exclude current)
  const relatedServices = getServicesByCategory(service.category)
    .filter((s) => s.id !== service.id && s.slug !== service.slug)
    .slice(0, 3);

  // Fallback to cross-category if not enough
  const displayRelated = relatedServices.length >= 3 
    ? relatedServices 
    : allServices.filter(s => s.id !== service.id).slice(0, 3);

  // Related blog posts
  const relatedBlogs = blogPosts.filter(b => 
    service.relatedBlogSlugs?.includes(b.slug) || 
    (isAccount ? b.category.includes('Accounts') || b.category.includes('Security') : b.category.includes('Promotion'))
  ).slice(0, 3);

  const currentTiers = service.pricingTiers && service.pricingTiers.length > 0
    ? service.pricingTiers
    : [{ quantity: 1, label: service.name, price: service.basePrice, unitPrice: service.priceUnit }];

  const selectedTier = currentTiers[selectedTierIndex] || currentTiers[0];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const telegramOrderMsg = encodeURIComponent(
    `Hello, I would like to order: ${service.name} (${selectedTier.label || selectedTier.quantity}) for ${selectedTier.price}. Please provide payment instructions and delivery details.`
  );

  const whatsappOrderMsg = encodeURIComponent(
    `Hello, I want to purchase: ${service.name} (${selectedTier.label || selectedTier.quantity}) for ${selectedTier.price}. Please share crypto payment address.`
  );

  const structuredProductSchema = {
    '@type': 'Product',
    name: service.name,
    description: service.shortDescription,
    sku: getServiceSKU(service.id),
    brand: {
      '@type': 'Brand',
      name: 'BuyGitHubAccounts.com'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: String(currentTiers[0]?.price || '5').replace(/[^0-9.]/g, '') || '5',
      highPrice: String(currentTiers[currentTiers.length - 1]?.price || '200').replace(/[^0-9.]/g, '') || '200',
      offerCount: currentTiers.length,
      availability: 'https://schema.org/InStock'
    }
  };

  const structuredFaqSchema = {
    '@type': 'FAQPage',
    mainEntity: (service.faqs || []).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={`${categoryPath}/${service.slug}`}
        ogType="product"
        schemaData={[structuredProductSchema, structuredFaqSchema]}
      />

      {/* BREADCRUMB NAVIGATION WITH FADE-IN */}
      <motion.div 
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#F6F8FA] border-b border-[#D0D7DE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: categoryLabel, path: categoryPath },
              { label: service.name }
            ]}
          />
        </div>
      </motion.div>

      {/* 1. TOP ANIMATED HERO SECTION (TWO-COLUMN TECH LAYOUT) */}
      <section className="relative bg-white border-b border-[#D0D7DE] py-10 sm:py-16 overflow-hidden">
        
        {/* Subtle Animated Technical Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#24292F 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Meta, H1, Description, Interactive Price Preview, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category Pill & Live Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#F6F8FA] border border-[#D0D7DE] text-[#24292F] text-xs font-semibold px-3 py-1 rounded-full font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#2DA44E] animate-pulse" />
                  {categoryShortLabel}
                </span>

                <span className="bg-[#E1F0DA] text-[#1A7F37] border border-[#2DA44E]/30 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2DA44E]" />
                  48-Hour Replacement Guarantee
                </span>

                <span className="bg-[#FFF8C5] text-[#9A6700] border border-[#D29922]/30 text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:inline-flex">
                  Full Primary Mailbox Handover
                </span>
              </div>

              {/* H1 with Subtle Upward Motion */}
              <motion.h1 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#24292F] tracking-tight leading-tight"
              >
                {service.name}
              </motion.h1>

              {/* Service-Specific Unique Description */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-base sm:text-lg text-[#57606A] leading-relaxed max-w-2xl"
              >
                {service.shortDescription}
              </motion.p>

              {/* Compact Pricing Preview with Animated Emphasis */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#57606A] font-semibold uppercase tracking-wider block">
                      {currentTiers.length > 1 ? 'Selected Tier Price' : 'Fixed Pricing'}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#1A7F37] tracking-tight">
                        {selectedTier.price}
                      </span>
                      <span className="text-xs text-[#57606A] font-mono">
                        / {selectedTier.unitPrice || service.priceUnit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#57606A] bg-white px-2.5 py-1 rounded border border-[#D0D7DE]">
                      {getServiceSKU(service.id)}
                    </span>
                    <span className="text-[11px] font-bold text-[#1A7F37] bg-[#E1F0DA] px-2.5 py-1 rounded border border-[#2DA44E]/30">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Package Quick Selector if multiple tiers exist */}
                {currentTiers.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-[#D0D7DE]/70">
                    <label className="block text-xs font-bold text-[#24292F] mb-2 uppercase tracking-wider">
                      Select Package Option:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentTiers.map((tier, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTierIndex(idx)}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            selectedTierIndex === idx
                              ? 'bg-white border-[#24292F] ring-2 ring-[#24292F] shadow-xs'
                              : 'bg-white/60 border-[#D0D7DE] hover:bg-white text-[#57606A]'
                          }`}
                        >
                          <div className="text-xs font-bold text-[#24292F] truncate">
                            {tier.label}
                          </div>
                          <div className="font-mono font-bold text-[#1A7F37] text-xs mt-0.5">
                            {tier.price}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* CTAs: Instant Checkout, View Pricing, Telegram, WhatsApp */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigateTo(`/checkout?service=${service.id}&tier=${selectedTierIndex}`)}
                    className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-sm font-bold px-6 py-3.5 rounded-md flex items-center transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span>Instant Checkout ({selectedTier.price})</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>

                  <button
                    onClick={() => scrollToSection('pricing-matrix')}
                    className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-[#24292F] text-xs font-semibold px-4 py-3.5 rounded-md flex items-center transition-all hover:-translate-y-0.5"
                  >
                    <span>View Full Pricing Matrix</span>
                  </button>

                  <button
                    onClick={handleCopyShare}
                    className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-[#57606A] hover:text-[#24292F] text-xs font-semibold p-3.5 rounded-md transition-colors"
                    title="Copy service link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-[#2DA44E]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct Contact Support Row with Subtle Hover Translate */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-[#57606A] font-medium mr-1">Direct Support:</span>
                  <a
                    href={`https://t.me/EgSupport24?text=${telegramOrderMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#F6F8FA] hover:bg-[#0969DA]/10 border border-[#D0D7DE] hover:border-[#0969DA] text-[#24292F] hover:text-[#0969DA] text-xs font-semibold px-3 py-1.5 rounded-md transition-all hover:-translate-y-0.5 shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#0969DA]" />
                    <span>Telegram @EgSupport24</span>
                    <ArrowRight className="w-3 h-3 text-[#8C959F]" />
                  </a>

                  <a
                    href={`https://wa.me/13073939979?text=${whatsappOrderMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#F6F8FA] hover:bg-[#2DA44E]/10 border border-[#D0D7DE] hover:border-[#2DA44E] text-[#24292F] hover:text-[#1A7F37] text-xs font-semibold px-3 py-1.5 rounded-md transition-all hover:-translate-y-0.5 shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#2DA44E]" />
                    <span>WhatsApp (+1 307 393 9979)</span>
                    <ArrowRight className="w-3 h-3 text-[#8C959F]" />
                  </a>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Service-Specific Interactive Technology Visual */}
            <div className="lg:col-span-5">
              <ServiceHeroVisual 
                service={service} 
                selectedTierPrice={String(selectedTier.price)} 
                selectedTierLabel={selectedTier.label} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST / SERVICE SUMMARY BAR (SEQUENTIAL ENTRANCE) */}
      <section className="bg-[#F6F8FA] border-b border-[#D0D7DE] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#D0D7DE] flex items-center justify-center shrink-0 shadow-2xs">
                <Tag className="w-4 h-4 text-[#1A7F37]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#24292F] block">Clear Fixed Pricing</span>
                <span className="text-[11px] text-[#57606A]">Zero hidden fees</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#D0D7DE] flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#2DA44E]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#24292F] block">48-Hour Guarantee</span>
                <span className="text-[11px] text-[#57606A]">Defect replacement</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#D0D7DE] flex items-center justify-center shrink-0 shadow-2xs">
                <Mail className="w-4 h-4 text-[#0969DA]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#24292F] block">Full Mailbox Handover</span>
                <span className="text-[11px] text-[#57606A]">Primary email access</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#D0D7DE] flex items-center justify-center shrink-0 shadow-2xs">
                <Coins className="w-4 h-4 text-[#D29922]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#24292F] block">Crypto Payments</span>
                <span className="text-[11px] text-[#57606A]">USDT, BTC, ETH, SOL</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 col-span-2 md:col-span-1">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#D0D7DE] flex items-center justify-center shrink-0 shadow-2xs">
                <Clock className="w-4 h-4 text-[#8250DF]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#24292F] block">Direct 24/7 Support</span>
                <span className="text-[11px] text-[#57606A]">Telegram &amp; WhatsApp</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAIN SERVICE DETAIL CONTENT & STICKY SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* MAIN ARTICLE / CONTENT AREA (8 COLS) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* A. ABOUT THIS SERVICE */}
            <section id="about-service" className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#2DA44E] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#2DA44E]" />
                Service Overview
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight">
                About {service.name}
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
                {service.overviewContent && service.overviewContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* B. SERVICE FEATURES */}
            <section id="service-features" className="space-y-6 pt-4 border-t border-[#D0D7DE]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#0969DA] uppercase tracking-wider mb-1">
                  <Terminal className="w-4 h-4 text-[#0969DA]" />
                  Technical Specifications
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  Service Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#F6F8FA] border border-[#D0D7DE] p-5 rounded-xl hover:border-[#24292F] transition-all group shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2DA44E] shrink-0" />
                      <span>{feat.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#57606A] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* C. INTERACTIVE PRICING MATRIX */}
            <section id="pricing-matrix" className="space-y-6 pt-4 border-t border-[#D0D7DE]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#1A7F37] uppercase tracking-wider mb-1">
                  <Tag className="w-4 h-4 text-[#1A7F37]" />
                  Transparent Pricing
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  Official Pricing Matrix &amp; Tier Breakdown
                </h2>
                <p className="text-xs sm:text-sm text-[#57606A] mt-1">
                  Published fixed prices with zero hidden handling fees. Instant dispatch via crypto.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#D0D7DE]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
                      <th className="p-3.5 font-semibold text-[#24292F]">Package / Tier</th>
                      <th className="p-3.5 font-semibold text-[#24292F]">Total Price</th>
                      <th className="p-3.5 font-semibold text-[#24292F] hidden sm:table-cell">Unit Equivalent</th>
                      <th className="p-3.5 font-semibold text-[#24292F]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D0D7DE]">
                    {currentTiers.map((tier, idx) => (
                      <tr 
                        key={idx} 
                        className={`transition-colors ${selectedTierIndex === idx ? 'bg-[#E1F0DA]/30' : 'hover:bg-[#F6F8FA]/60'}`}
                      >
                        <td className="p-3.5">
                          <div className="font-bold text-[#24292F]">{tier.label}</div>
                          {tier.notes && <div className="text-[11px] text-[#57606A] mt-0.5">{tier.notes}</div>}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-[#1A7F37] text-sm sm:text-base">
                          {tier.price}
                        </td>
                        <td className="p-3.5 font-mono text-[#57606A] text-xs hidden sm:table-cell">
                          {tier.unitPrice || '—'}
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => {
                              setSelectedTierIndex(idx);
                              navigateTo(`/checkout?service=${service.id}&tier=${idx}`);
                            }}
                            className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
                          >
                            <ShoppingCart className="w-3.5 h-3.5 text-[#2DA44E]" />
                            <span>Select</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* D. WHAT'S INCLUDED CHECKLIST */}
            <section className="space-y-6 pt-4 border-t border-[#D0D7DE]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#8250DF] uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#8250DF]" />
                  Deliverable Scope
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  What&apos;s Included With Your Order
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.whatsIncluded.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#F6F8FA] border border-[#D0D7DE] p-4 rounded-lg flex items-start space-x-3"
                  >
                    <Check className="w-4 h-4 text-[#2DA44E] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#24292F] font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* E. HOW IT WORKS (ANIMATED 4-STEP TIMELINE) */}
            <section className="space-y-6 pt-4 border-t border-[#D0D7DE]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#0969DA] uppercase tracking-wider mb-1">
                  <Activity className="w-4 h-4 text-[#0969DA]" />
                  Order Workflow
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  How It Works: 4-Step Fulfillment
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Select Service', desc: 'Choose your desired account category or promotion tier.' },
                  { step: '02', title: 'Send Details', desc: 'Provide delivery email or target repository via checkout/chat.' },
                  { step: '03', title: 'Confirm & Pay', desc: 'Complete fixed crypto payment (USDT, BTC, ETH, SOL, LTC).' },
                  { step: '04', title: 'Fast Dispatch', desc: 'Receive full credentials & verification report within 15–45 mins.' }
                ].map((st, i) => (
                  <div key={i} className="bg-white border border-[#D0D7DE] p-4 rounded-xl relative space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#24292F] text-white flex items-center justify-center font-mono font-bold text-xs">
                      {st.step}
                    </div>
                    <div className="text-sm font-bold text-[#24292F]">{st.title}</div>
                    <div className="text-xs text-[#57606A] leading-relaxed">{st.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* F. SERVICE CONSIDERATIONS & HONEST PLATFORM NOTES */}
            <section className="space-y-4 pt-4 border-t border-[#D0D7DE]">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#D29922] uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-[#D29922]" />
                Before You Order
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                Important Service Considerations &amp; Honest Notes
              </h2>

              <div className="bg-[#FFF8C5]/30 border border-[#D29922]/40 rounded-xl p-5 space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-[#24292F]">
                  Please review the following operational considerations prior to ordering:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#57606A]">
                  {service.limitationsAndHonestNotes && service.limitationsAndHonestNotes.map((note, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#D29922] font-bold mr-2">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>

                {/* Independent Disclaimer */}
                <div className="pt-3 border-t border-[#D29922]/30 text-[11px] text-[#57606A] italic">
                  <strong>Disclaimer:</strong> BuyGitHubAccounts.com is an independent third-party service provider and is not affiliated with, endorsed by, or sponsored by GitHub, Inc.
                </div>
              </div>
            </section>

            {/* G. WHY CHOOSE THIS SERVICE */}
            <section className="space-y-6 pt-4 border-t border-[#D0D7DE]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#2DA44E] uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4 text-[#2DA44E]" />
                  Value Proposition
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  Why Choose BuyGitHubAccounts.com For {service.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.whyChooseUsPoints && service.whyChooseUsPoints.map((pt, i) => (
                  <div key={i} className="bg-[#F6F8FA] border border-[#D0D7DE] p-4 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-[#2DA44E] uppercase tracking-wider font-mono">
                      {pt.title}
                    </div>
                    <p className="text-xs sm:text-sm text-[#57606A] leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* H. SEO DEEP-DIVE CONTENT */}
            <section className="space-y-6 pt-4 border-t border-[#D0D7DE]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#0969DA] uppercase tracking-wider mb-1">
                  <BookOpen className="w-4 h-4 text-[#0969DA]" />
                  In-Depth Technical Guide
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  Comprehensive Guide to {service.name}
                </h2>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-[#57606A] leading-relaxed">
                <div className="bg-white border border-[#D0D7DE] p-6 rounded-xl space-y-3">
                  <h3 className="text-base font-bold text-[#24292F]">
                    Who Should Consider This Service?
                  </h3>
                  <p>
                    This configuration is engineered specifically for software development teams, individual contributors, and organizations that require ready-to-deploy developer infrastructure without administrative overhead.
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#57606A]">
                    {service.suitabilityList && service.suitabilityList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#D0D7DE] p-6 rounded-xl space-y-3">
                  <h3 className="text-base font-bold text-[#24292F]">
                    Security Best Practices After Delivery
                  </h3>
                  <p>
                    Upon receiving your credential file, we recommend rotating the master password immediately, enabling application-based Two-Factor Authentication (TOTP via Google Authenticator or 1Password), and provisioning custom SSH keys and Personal Access Tokens (PAT) scoped exclusively to your project requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* I. FREQUENTLY ASKED QUESTIONS */}
            <section id="faq-section" className="space-y-6 pt-4 border-t border-[#D0D7DE]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#0969DA] uppercase tracking-wider mb-1">
                  <HelpCircle className="w-4 h-4 text-[#0969DA]" />
                  Common Inquiries
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  Frequently Asked Questions: {service.name}
                </h2>
              </div>

              <div className="space-y-3">
                {(service.faqs || []).map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#D0D7DE] rounded-lg overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-semibold text-xs sm:text-sm text-[#24292F] hover:text-[#0969DA]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-[#57606A] transition-transform duration-200 shrink-0 ml-2 ${
                          activeFaqIndex === idx ? 'transform rotate-180 text-[#0969DA]' : ''
                        }`} 
                      />
                    </button>

                    <AnimatePresence>
                      {activeFaqIndex === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#57606A] leading-relaxed border-t border-[#D0D7DE]/60"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* J. POST-FAQ COMPACT CTA */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 text-center text-white space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">
                Ready to Discuss Your Order?
              </h3>
              <p className="text-xs sm:text-sm text-[#8B949E] max-w-lg mx-auto">
                Reach out directly with your requirements or proceed directly to instant cryptocurrency checkout.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://t.me/EgSupport24?text=${telegramOrderMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0969DA] hover:bg-[#0860CA] text-white text-xs font-bold px-5 py-2.5 rounded-md flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Contact Telegram</span>
                </a>
                <a
                  href={`https://wa.me/13073939979?text=${whatsappOrderMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold px-5 py-2.5 rounded-md flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Support</span>
                </a>
                <button
                  onClick={() => navigateTo(`/checkout?service=${service.id}&tier=${selectedTierIndex}`)}
                  className="bg-white hover:bg-[#F6F8FA] text-[#24292F] text-xs font-bold px-5 py-2.5 rounded-md flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#2DA44E]" />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY ORDER SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 sticky top-20 space-y-6">
            
            <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-2xl p-6 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#D0D7DE]">
                <div>
                  <span className="text-xs text-[#57606A] block">Selected Configuration</span>
                  <div className="text-2xl font-extrabold font-mono text-[#1A7F37] mt-0.5">
                    {selectedTier.price}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] bg-[#E1F0DA] text-[#1A7F37] font-bold px-2 py-1 rounded border border-[#2DA44E]/30">
                    Instant Handover
                  </span>
                  <div className="text-[11px] text-[#57606A] mt-1 font-mono">
                    {selectedTier.unitPrice || service.priceUnit}
                  </div>
                </div>
              </div>

              {/* Tier Selector in Sidebar if Multiple */}
              {currentTiers.length > 1 && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#24292F] uppercase tracking-wider">
                    Choose Package:
                  </label>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {currentTiers.map((tier, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTierIndex(idx)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                          selectedTierIndex === idx
                            ? 'bg-white border-[#24292F] ring-1 ring-[#24292F] shadow-xs'
                            : 'bg-white/60 border-[#D0D7DE] hover:bg-white text-[#57606A]'
                        }`}
                      >
                        <span className="font-bold text-[#24292F]">{tier.label}</span>
                        <span className="font-mono font-bold text-[#1A7F37]">{tier.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Checkout & Support Order Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => navigateTo(`/checkout?service=${service.id}&tier=${selectedTierIndex}`)}
                  className="w-full bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold py-3.5 px-4 rounded-md flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  <span>Instant Checkout ({selectedTier.price})</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`https://t.me/EgSupport24?text=${telegramOrderMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-[#24292F] text-[11px] font-semibold py-2.5 px-3 rounded-md flex items-center justify-center transition-colors truncate"
                  >
                    <Send className="w-3.5 h-3.5 text-[#0969DA] mr-1.5 shrink-0" />
                    <span>Telegram</span>
                  </a>

                  <a
                    href={`https://wa.me/13073939979?text=${whatsappOrderMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-[#24292F] text-[11px] font-semibold py-2.5 px-3 rounded-md flex items-center justify-center transition-colors truncate"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Security & Warranty Notice */}
              <div className="pt-4 border-t border-[#D0D7DE] space-y-2 text-[11px] text-[#57606A]">
                <div className="flex items-center text-[#24292F]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5 shrink-0" />
                  <span>48-Hour Replacement Guarantee</span>
                </div>
                <div className="flex items-center text-[#24292F]">
                  <Lock className="w-3.5 h-3.5 text-[#0969DA] mr-1.5 shrink-0" />
                  <span>Primary email credentials included</span>
                </div>
                <div className="flex items-center text-[#24292F]">
                  <Clock className="w-3.5 h-3.5 text-[#8250DF] mr-1.5 shrink-0" />
                  <span>Turnaround: 15–45 Mins dispatch</span>
                </div>
              </div>

            </div>

            {/* Quick Links Card */}
            <div className="bg-white border border-[#D0D7DE] rounded-xl p-5 space-y-3 text-xs">
              <div className="font-bold text-[#24292F] uppercase tracking-wider text-[11px]">
                Helpful Resources
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigateTo('/payment-methods')}
                  className="w-full text-left flex items-center justify-between text-[#57606A] hover:text-[#0969DA] py-1 border-b border-[#D0D7DE]/40"
                >
                  <span>Accepted Crypto Methods</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigateTo('/faq')}
                  className="w-full text-left flex items-center justify-between text-[#57606A] hover:text-[#0969DA] py-1 border-b border-[#D0D7DE]/40"
                >
                  <span>General FAQs &amp; Policies</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="w-full text-left flex items-center justify-between text-[#57606A] hover:text-[#0969DA] py-1"
                >
                  <span>Direct Escalation Desk</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. YOU MAY ALSO NEED (RELATED SERVICES) */}
      {displayRelated.length > 0 && (
        <section className="py-14 bg-[#F6F8FA] border-t border-[#D0D7DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  You May Also Need
                </h2>
                <p className="text-xs sm:text-sm text-[#57606A] mt-1">
                  Complementary developer configurations and repository growth options.
                </p>
              </div>
              <button
                onClick={() => navigateTo(categoryPath)}
                className="text-xs font-semibold text-[#0969DA] hover:underline flex items-center gap-1"
              >
                <span>View all services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayRelated.map((rel) => {
                const relPath = rel.category === 'accounts' ? `/accounts/${rel.slug}` : `/promotion-services/${rel.slug}`;
                return (
                  <div
                    key={rel.id}
                    className="bg-white border border-[#D0D7DE] rounded-xl p-5 flex flex-col justify-between hover:border-[#24292F] transition-all group shadow-2xs hover:shadow-sm"
                  >
                    <div>
                      <div className="mb-3">
                        <ProductVisual serviceId={rel.id} category={rel.category} size="sm" />
                      </div>

                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#57606A] bg-[#F6F8FA] px-2 py-0.5 rounded border border-[#D0D7DE]">
                          {rel.priceUnit || 'Unit'}
                        </span>
                        <span className="font-mono font-bold text-[#1A7F37]">
                          {rel.basePrice}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                        <button
                          onClick={() => navigateTo(relPath)}
                          className="text-left"
                        >
                          {rel.name}
                        </button>
                      </h3>

                      <p className="text-xs text-[#57606A] mt-2 line-clamp-2 leading-relaxed">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#D0D7DE]/60 flex items-center justify-between text-xs">
                      <button
                        onClick={() => navigateTo(relPath)}
                        className="text-[#0969DA] font-semibold hover:underline"
                      >
                        View Specs &rarr;
                      </button>
                      <button
                        onClick={() => navigateTo(`/checkout?service=${rel.id}`)}
                        className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-[11px] font-semibold px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3 text-[#2DA44E]" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. LEARN MORE (RELATED BLOG POSTS) */}
      {relatedBlogs.length > 0 && (
        <section className="py-14 bg-white border-t border-[#D0D7DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
                  Learn More: Developer Guides &amp; Insights
                </h2>
                <p className="text-xs sm:text-sm text-[#57606A] mt-1">
                  Educational articles regarding GitHub account security, reputation, and repository traction.
                </p>
              </div>
              <button
                onClick={() => navigateTo('/blog')}
                className="text-xs font-semibold text-[#0969DA] hover:underline flex items-center gap-1"
              >
                <span>Read all articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((post) => (
                <div
                  key={post.slug}
                  onClick={() => navigateTo(`/blog/${post.slug}`)}
                  className="bg-white border border-[#D0D7DE] rounded-xl p-5 hover:border-[#24292F] cursor-pointer transition-all group flex flex-col justify-between shadow-2xs hover:shadow-sm"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#0969DA] uppercase tracking-wider block mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#57606A] mt-2 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D0D7DE]/60 text-xs font-semibold text-[#0969DA] flex items-center gap-1">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. MOBILE STICKY BOTTOM CTA BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D0D7DE] p-3.5 shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <div className="text-[10px] text-[#57606A] font-semibold truncate max-w-[140px]">{service.name}</div>
            <div className="text-lg font-extrabold font-mono text-[#1A7F37] leading-none mt-0.5">
              {selectedTier.price}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://t.me/EgSupport24?text=${telegramOrderMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F6F8FA] border border-[#D0D7DE] p-2.5 rounded-md text-[#0969DA]"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigateTo(`/checkout?service=${service.id}&tier=${selectedTierIndex}`)}
              className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold px-4 py-2.5 rounded-md flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Checkout</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
