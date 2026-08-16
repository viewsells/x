import { useState } from 'react';
import { HelpCircle, Search, Terminal, ChevronDown, ChevronUp, ShieldCheck, Send, MessageSquare } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CryptoPaymentSection } from '../components/CryptoPaymentSection';
import { faqCategories } from '../data/faqData';
import { navigateTo } from '../utils/router';

export const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
    '2-0': true
  });

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = faqCategories.map((cat, catIdx) => {
    const matchingItems = cat.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      catIdx,
      items: matchingItems
    };
  }).filter((cat) => cat.items.length > 0);

  const allFaqsFlat = faqCategories.flatMap((c) => c.items);
  const structuredFaqSchema = {
    '@type': 'FAQPage',
    mainEntity: allFaqsFlat.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | BuyGitHubAccounts.com"
        description="Find clear answers regarding account credentials, email access, crypto payments, delivery times, 48h replacement warranty, and repository promotion safety."
        canonicalPath="/faq"
        schemaData={structuredFaqSchema}
      />

      {/* Breadcrumb Header */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'FAQ' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-[#2DA44E]" />
              <span>Help Center &amp; Common Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              Find transparent, technical answers regarding our developer account provisioning, mailbox ownership handovers, cryptocurrency transactions, and repository promotion standards.
            </p>

            {/* Live Search Input */}
            <div className="mt-8 relative max-w-xl">
              <Search className="w-4 h-4 text-[#8C959F] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search any question (e.g., 'email', 'price', 'warranty', 'crypto')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F6F8FA] border border-[#D0D7DE] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[#24292F] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2DA44E]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion List by Categories */}
      <section className="py-12 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-[#D0D7DE] p-6 sm:p-8 shadow-xs">
              <div className="border-b border-[#D0D7DE] pb-4 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#24292F]">
                  {category.title}
                </h2>
                <p className="text-xs text-[#57606A] mt-1">
                  {category.description}
                </p>
              </div>

              <div className="space-y-3">
                {category.items.map((item, itemIdx) => {
                  const key = `${category.catIdx}-${itemIdx}`;
                  const isOpen = openItems[key] || searchQuery.length > 0;

                  return (
                    <div
                      key={itemIdx}
                      className="border border-[#D0D7DE] rounded-lg overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(category.catIdx, itemIdx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-semibold text-xs sm:text-sm text-[#24292F] hover:text-[#0969DA] bg-[#F6F8FA]"
                      >
                        <span className="pr-4">{item.question}</span>
                        <span className="text-base font-mono text-[#57606A] shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 py-4 text-xs sm:text-sm text-[#57606A] leading-relaxed border-t border-[#D0D7DE]/60 bg-white">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-[#D0D7DE] p-8">
              <p className="text-sm text-[#57606A]">No questions matched your search query &quot;{searchQuery}&quot;.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs text-[#0969DA] font-semibold hover:underline"
              >
                Clear Search Filter
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-14 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
            Still have questions not listed here?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#57606A] max-w-md mx-auto">
            Our technical support operators are active 7 days a week on Telegram and WhatsApp to provide personalized answers.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold py-2.5 px-5 rounded-md flex items-center justify-center transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#58A6FF] mr-2" />
              Ask on Telegram (@EgSupport24)
            </a>
            <a
              href="https://wa.me/13073939979"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-semibold py-2.5 px-5 rounded-md flex items-center justify-center transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-2" />
              Ask on WhatsApp (+1 307 393 9979)
            </a>
          </div>
        </div>
      </section>

      {/* Crypto Payment Section */}
      <CryptoPaymentSection />

    </div>
  );
};
