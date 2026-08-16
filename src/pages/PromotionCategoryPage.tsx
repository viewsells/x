import { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, ChevronRight, GitFork, Users, Clock, Sparkles, ShoppingCart, Search } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CryptoPaymentSection } from '../components/CryptoPaymentSection';
import { ProductVisual, getServiceSKU, getServiceStockStatus } from '../components/ProductVisual';
import { promotionServices } from '../data/promotionServicesData';
import { navigateTo } from '../utils/router';

interface PromotionCategoryPageProps {
  onOpenOrderModal: (serviceId?: string) => void;
}

export const PromotionCategoryPage = ({ onOpenOrderModal }: PromotionCategoryPageProps) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredServices = promotionServices.filter((s) => {
    return (
      s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.features.some(f => f.title.toLowerCase().includes(filterQuery.toLowerCase()) || f.description.toLowerCase().includes(filterQuery.toLowerCase()))
    );
  });

  const schemaData = {
    '@type': 'ItemList',
    name: 'GitHub Repository Promotion Services',
    description: 'Safe organic GitHub promotion services including stars, forks, followers, watchers, and repositories.',
    numberOfItems: promotionServices.length,
    itemListElement: promotionServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: `https://buygithubaccounts.com/promotion-services/${service.slug}`
    }))
  };

  return (
    <div>
      <SEOHead
        title="GitHub Promotion Services | Buy GitHub Stars, Forks & Followers"
        description="Safe, organic GitHub promotion services. Buy GitHub Stars (25 for $17, 50 for $30, 100 for $50, 200 for $90), forks, followers, watchers, and repositories. Zero passwords required."
        canonicalPath="/promotion-services"
        schemaData={schemaData}
      />

      {/* Breadcrumb Header */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Promotion Services' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <Star className="w-3.5 h-3.5 text-[#E3B341]" />
              <span>Repository &amp; Developer Growth Products</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              GitHub Promotion Catalog
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              Enhance open-source discoverability and showcase community traction with organic, naturally paced engagement packages. We strictly deliver via public repository links—no administrative tokens, SSH keys, or passwords required.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#24292F]">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5" />
                Zero Passwords or Tokens Required
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5" />
                Naturally Paced Organic Delivery
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5" />
                Instant Crypto Checkout (USDT, BTC, ETH, SOL)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-[#F6F8FA] border-b border-[#D0D7DE] py-5 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#57606A]">
              Showing {filteredServices.length} Promotion Products
            </span>
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 text-[#8C959F] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search promotion packages..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-white border border-[#D0D7DE] rounded-md py-1.5 pl-9 pr-3 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid as E-commerce Product Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#D0D7DE] p-5 flex flex-col justify-between hover:border-[#24292F] transition-all hover:shadow-md group relative"
              >
                <div>
                  {/* Product Visual Thumbnail */}
                  <div className="mb-4">
                    <ProductVisual serviceId={service.id} category="promotion" size="md" />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-[#57606A] bg-[#F6F8FA] px-2 py-0.5 rounded border border-[#D0D7DE]">
                      {getServiceSKU(service.id)}
                    </span>
                    <div className="text-right">
                      <span className="text-base font-mono font-extrabold text-[#1A7F37]">
                        {service.basePrice}
                      </span>
                      <span className="text-[10px] text-[#57606A] block font-mono">
                        {service.priceUnit}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-base font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                    <button
                      onClick={() => navigateTo(`/promotion-services/${service.slug}`)}
                      className="text-left"
                    >
                      {service.name}
                    </button>
                  </h2>

                  <p className="text-xs text-[#57606A] mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-[#D0D7DE]/60 space-y-1.5">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="text-[11px] text-[#24292F] flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5 shrink-0" />
                        <span className="line-clamp-1"><strong>{feat.title}:</strong> {feat.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D0D7DE] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigateTo(`/promotion-services/${service.slug}`)}
                      className="flex-1 bg-[#F6F8FA] hover:bg-[#EAEEF2] text-[#24292F] text-xs font-semibold py-2 px-3 rounded border border-[#D0D7DE] text-center transition-colors"
                    >
                      Specs &amp; FAQs
                    </button>

                    <button
                      onClick={() => navigateTo(`/checkout?service=${service.id}`)}
                      className="flex-1 bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold py-2 px-3 rounded text-center transition-colors flex items-center justify-center space-x-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#2DA44E]" />
                      <span>Buy Now ({service.basePrice})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-[#57606A]">No promotion products found matching your search.</p>
              <button
                onClick={() => setFilterQuery('')}
                className="mt-3 text-xs text-[#0969DA] font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Crypto Payment Section */}
      <CryptoPaymentSection />

    </div>
  );
};
