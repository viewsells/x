import { legalPages } from '../data/legalData';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Clock, ArrowRight, Send, MessageSquare } from 'lucide-react';
import { navigateTo } from '../utils/router';

interface LegalPageProps {
  legalSlug: 'terms' | 'privacy-policy' | 'refund-policy' | 'delivery-policy' | 'disclaimer';
}

export const LegalPage = ({ legalSlug }: LegalPageProps) => {
  const currentLegal = legalPages[legalSlug] || legalPages.terms;

  const legalLinks = [
    { slug: 'terms', label: 'Terms & Conditions' },
    { slug: 'privacy-policy', label: 'Privacy Policy' },
    { slug: 'refund-policy', label: 'Refund Policy (48h Warranty)' },
    { slug: 'delivery-policy', label: 'Delivery Policy' },
    { slug: 'disclaimer', label: 'Disclaimer & Notices' }
  ];

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title={currentLegal.metaTitle}
        description={currentLegal.metaDescription}
        canonicalPath={`/${currentLegal.slug}`}
      />

      {/* Breadcrumb */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: currentLegal.title }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2DA44E]" />
              <span>Legal Policy &amp; Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              {currentLegal.title}
            </h1>
            <p className="mt-3 text-xs text-[#57606A] flex items-center font-mono">
              <Clock className="w-3.5 h-3.5 mr-1" />
              Last Revised: {currentLegal.lastUpdated}
            </p>
            <p className="mt-4 text-sm text-[#57606A] leading-relaxed">
              {currentLegal.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Content Layout with Policy Navigation */}
      <section className="py-14 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Legal Menu */}
            <div className="lg:col-span-4 bg-white border border-[#D0D7DE] rounded-xl p-5 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#57606A] mb-3">
                Legal &amp; Policy Pages
              </h2>
              <ul className="space-y-1.5 text-xs">
                {legalLinks.map((item) => (
                  <li key={item.slug}>
                    <button
                      onClick={() => navigateTo(`/${item.slug}`)}
                      className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                        item.slug === currentLegal.slug
                          ? 'bg-[#24292F] text-white font-semibold'
                          : 'text-[#57606A] hover:bg-[#F6F8FA] hover:text-[#24292F]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-[#D0D7DE] text-xs text-[#57606A] space-y-2">
                <span className="font-semibold text-[#24292F] block">Legal &amp; Support Inquiries:</span>
                <p>Telegram: <strong className="text-[#24292F]">@EgSupport24</strong></p>
                <p>WhatsApp: <strong className="text-[#24292F]">+1 (307) 393-9979</strong></p>
              </div>
            </div>

            {/* Right Column: Clauses */}
            <div className="lg:col-span-8 bg-white border border-[#D0D7DE] rounded-xl p-6 sm:p-8 shadow-xs space-y-8">
              {currentLegal.clauses.map((clause, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-base font-bold text-[#24292F] pb-1 border-b border-[#D0D7DE]/60">
                    {clause.heading}
                  </h2>
                  {clause.body.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-[#57606A] leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
