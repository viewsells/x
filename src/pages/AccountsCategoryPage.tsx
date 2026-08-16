import { useState } from 'react';
import { Terminal, ShieldCheck, Search, ArrowRight, CheckCircle2, ChevronRight, Sparkles, ShoppingCart, Zap, Star } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CryptoPaymentSection } from '../components/CryptoPaymentSection';
import { ProductVisual, getServiceSKU, getServiceStockStatus } from '../components/ProductVisual';
import { accountServices } from '../data/accountServicesData';
import { navigateTo } from '../utils/router';

interface AccountsCategoryPageProps {
  onOpenOrderModal: (serviceId?: string) => void;
}

export const AccountsCategoryPage = ({ onOpenOrderModal }: AccountsCategoryPageProps) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredServices = accountServices.filter((s) => {
    const matchesQuery = 
      s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.features.some(f => f.title.toLowerCase().includes(filterQuery.toLowerCase()) || f.description.toLowerCase().includes(filterQuery.toLowerCase()));
    
    if (selectedTag === 'all') return matchesQuery;
    if (selectedTag === 'new') return matchesQuery && (s.id.includes('new') || s.id.includes('fresh'));
    if (selectedTag === 'aged') return matchesQuery && s.id.includes('aged');
    if (selectedTag === 'student') return matchesQuery && s.id.includes('student');
    if (selectedTag === 'history') return matchesQuery && (s.id.includes('stars') || s.id.includes('forks') || s.id.includes('commits') || s.id.includes('badges') || s.id.includes('followers'));
    if (selectedTag === 'bulk') return matchesQuery && s.id.includes('bulk');
    return matchesQuery;
  });

  const schemaData = {
    '@type': 'ItemList',
    name: 'GitHub Developer Accounts',
    description: 'Verified new, aged, student, bulk, and history-based GitHub developer accounts with full email access.',
    numberOfItems: accountServices.length,
    itemListElement: accountServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: `https://buygithubaccounts.com/accounts/${service.slug}`
    }))
  };

  return (
    <div>
      <SEOHead
        title="Buy GitHub Accounts | New, Aged, Student & Bulk Accounts ($5-$200)"
        description="Browse all 15 verified GitHub developer account types. New accounts ($5), aged accounts ($35), student developer pack ($55), and bulk 100-pack ($200). 100% full email access and 48h warranty."
        canonicalPath="/accounts"
        schemaData={schemaData}
      />

      {/* Breadcrumb Header */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'GitHub Accounts' }]} />
        </div>
      </div>

      {/* Category Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#2DA44E]" />
              <span>Verified Developer Account Products</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              GitHub Accounts Catalog
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              Explore 15 specialized developer account products including fresh registrations ($5), aged tenure accounts ($35), student pack approvals ($55), established commit history accounts, and bulk volume bundles ($200/100). Every product includes complete primary email mailbox access and our 48-hour replacement warranty.
            </p>

            {/* Quick Guarantees */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#24292F]">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5" />
                100% Primary Mailbox Handover
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5" />
                48-Hour Replacement Warranty
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5" />
                Instant Crypto Checkout (USDT, BTC, ETH, SOL)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-[#F6F8FA] border-b border-[#D0D7DE] py-6 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All 15 Products' },
                { id: 'new', label: 'New / Fresh ($5)' },
                { id: 'aged', label: 'Aged / Tenure ($35)' },
                { id: 'student', label: 'Student Pack ($55)' },
                { id: 'history', label: 'With History / Metrics' },
                { id: 'bulk', label: 'Bulk Packs ($200)' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedTag(pill.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                    selectedTag === pill.id
                      ? 'bg-[#24292F] text-white border-[#24292F]'
                      : 'bg-white text-[#57606A] border-[#D0D7DE] hover:text-[#24292F]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#8C959F] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search account products..."
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
                    <ProductVisual serviceId={service.id} size="md" />
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
                      onClick={() => navigateTo(`/accounts/${service.slug}`)}
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
                      onClick={() => navigateTo(`/accounts/${service.slug}`)}
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
              <p className="text-sm text-[#57606A]">No account products found matching your filter criteria.</p>
              <button
                onClick={() => { setFilterQuery(''); setSelectedTag('all'); }}
                className="mt-3 text-xs text-[#0969DA] font-semibold hover:underline"
              >
                Reset Search Filters
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
