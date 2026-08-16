import { useState } from 'react';
import { Terminal, FileCode, Check, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { accountServices } from '../data/accountServicesData';
import { promotionServices } from '../data/promotionServicesData';
import { blogPosts } from '../data/blogData';
import { navigateTo } from '../utils/router';

export const SitemapPage = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'xml'>('html');
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://buygithubaccounts.com';

  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Pages -->
  <url><loc>${baseUrl}/</loc><priority>1.0</priority><changefreq>daily</changefreq></url>
  <url><loc>${baseUrl}/accounts/</loc><priority>0.9</priority><changefreq>daily</changefreq></url>
  <url><loc>${baseUrl}/promotion-services/</loc><priority>0.9</priority><changefreq>daily</changefreq></url>
  <url><loc>${baseUrl}/blog/</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>${baseUrl}/faq/</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>${baseUrl}/about/</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  <url><loc>${baseUrl}/contact/</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>${baseUrl}/terms/</loc><priority>0.4</priority><changefreq>yearly</changefreq></url>
  <url><loc>${baseUrl}/privacy-policy/</loc><priority>0.4</priority><changefreq>yearly</changefreq></url>
  <url><loc>${baseUrl}/refund-policy/</loc><priority>0.5</priority><changefreq>yearly</changefreq></url>
  <url><loc>${baseUrl}/delivery-policy/</loc><priority>0.5</priority><changefreq>yearly</changefreq></url>
  <url><loc>${baseUrl}/disclaimer/</loc><priority>0.4</priority><changefreq>yearly</changefreq></url>

  <!-- 15 GitHub Account Services -->
${accountServices.map((s) => `  <url><loc>${baseUrl}/accounts/${s.slug}/</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>`).join('\n')}

  <!-- 6 Promotion Services -->
${promotionServices.map((s) => `  <url><loc>${baseUrl}/promotion-services/${s.slug}/</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>`).join('\n')}

  <!-- 20 Developer Blog Posts -->
${blogPosts.map((b) => `  <url><loc>${baseUrl}/blog/${b.slug}/</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>`).join('\n')}
</urlset>`;

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlSitemap);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title="HTML & XML Sitemap | BuyGitHubAccounts.com"
        description="Comprehensive index of all service pages, account options, promotion packages, developer blog guides, and legal policies on BuyGitHubAccounts.com."
        canonicalPath="/sitemap"
      />

      {/* Breadcrumb */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Sitemap' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <FileCode className="w-3.5 h-3.5 text-[#0969DA]" />
              <span>Full Site Architecture &amp; URL Index</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              Website Index &amp; Sitemap
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              Explore every URL, service page, developer guide, and legal policy on BuyGitHubAccounts.com.
            </p>

            {/* View Mode Tabs */}
            <div className="mt-6 flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('html')}
                className={`text-xs font-semibold px-4 py-2 rounded-md border transition-colors ${
                  activeTab === 'html'
                    ? 'bg-[#24292F] text-white border-[#24292F]'
                    : 'bg-white text-[#57606A] border-[#D0D7DE] hover:text-[#24292F]'
                }`}
              >
                HTML Visual Directory
              </button>
              <button
                onClick={() => setActiveTab('xml')}
                className={`text-xs font-semibold px-4 py-2 rounded-md border transition-colors ${
                  activeTab === 'xml'
                    ? 'bg-[#24292F] text-white border-[#24292F]'
                    : 'bg-white text-[#57606A] border-[#D0D7DE] hover:text-[#24292F]'
                }`}
              >
                XML Machine Format
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sitemap Content */}
      <section className="py-14 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === 'html' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Category 1: Core Navigation */}
              <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#24292F] mb-4 pb-2 border-b border-[#D0D7DE]">
                  Main Navigation
                </h2>
                <ul className="space-y-2 text-xs">
                  <li>
                    <button onClick={() => navigateTo('/')} className="text-[#57606A] hover:text-[#0969DA] font-medium text-left">
                      Home (/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/accounts')} className="text-[#57606A] hover:text-[#0969DA] font-medium text-left">
                      GitHub Accounts (/accounts/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/promotion-services')} className="text-[#57606A] hover:text-[#0969DA] font-medium text-left">
                      Promotion Services (/promotion-services/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/blog')} className="text-[#57606A] hover:text-[#0969DA] font-medium text-left">
                      Blog &amp; Knowledge Base (/blog/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/faq')} className="text-[#57606A] hover:text-[#0969DA] font-medium text-left">
                      Frequently Asked Questions (/faq/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/about')} className="text-[#57606A] hover:text-[#0969DA] font-medium text-left">
                      About Us (/about/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/contact')} className="text-[#57606A] hover:text-[#0969DA] font-medium text-left">
                      Contact Support (/contact/)
                    </button>
                  </li>
                </ul>

                <h3 className="text-xs font-bold uppercase tracking-wider text-[#24292F] mt-8 mb-4 pb-2 border-b border-[#D0D7DE]">
                  Legal &amp; Policies
                </h3>
                <ul className="space-y-2 text-xs">
                  <li>
                    <button onClick={() => navigateTo('/terms')} className="text-[#57606A] hover:text-[#0969DA] text-left">
                      Terms &amp; Conditions (/terms/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/privacy-policy')} className="text-[#57606A] hover:text-[#0969DA] text-left">
                      Privacy Policy (/privacy-policy/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/refund-policy')} className="text-[#57606A] hover:text-[#0969DA] text-left">
                      Refund Policy (/refund-policy/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/delivery-policy')} className="text-[#57606A] hover:text-[#0969DA] text-left">
                      Delivery Policy (/delivery-policy/)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('/disclaimer')} className="text-[#57606A] hover:text-[#0969DA] text-left">
                      Disclaimer (/disclaimer/)
                    </button>
                  </li>
                </ul>
              </div>

              {/* Category 2: 15 Account Services */}
              <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs lg:col-span-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#24292F] mb-4 pb-2 border-b border-[#D0D7DE]">
                  Account Services (15)
                </h2>
                <ul className="space-y-2 text-xs">
                  {accountServices.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => navigateTo(`/accounts/${s.slug}`)}
                        className="text-[#57606A] hover:text-[#0969DA] text-left line-clamp-1"
                      >
                        {s.name} ({s.basePrice})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category 3: 6 Promotion Services */}
              <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#24292F] mb-4 pb-2 border-b border-[#D0D7DE]">
                  Promotion Services (6)
                </h2>
                <ul className="space-y-2 text-xs">
                  {promotionServices.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => navigateTo(`/promotion-services/${s.slug}`)}
                        className="text-[#57606A] hover:text-[#0969DA] text-left line-clamp-1"
                      >
                        {s.name} ({s.basePrice})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category 4: 20 Blog Posts */}
              <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#24292F] mb-4 pb-2 border-b border-[#D0D7DE]">
                  Developer Guides (20)
                </h2>
                <ul className="space-y-2 text-xs max-h-[500px] overflow-y-auto pr-1">
                  {blogPosts.map((b) => (
                    <li key={b.slug}>
                      <button
                        onClick={() => navigateTo(`/blog/${b.slug}`)}
                        className="text-[#57606A] hover:text-[#0969DA] text-left line-clamp-1"
                      >
                        {b.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 text-white font-mono text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#30363D] mb-4">
                <span className="text-[#8B949E] text-xs font-sans font-semibold">
                  Standard XML Protocol Format
                </span>
                <button
                  onClick={handleCopyXml}
                  className="bg-[#21262D] hover:bg-[#30363D] text-white border border-[#30363D] text-xs font-sans font-medium px-3 py-1.5 rounded flex items-center transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2DA44E] mr-1" /> Copied XML
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" /> Copy XML
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto max-h-[600px] text-[#C9D1D9] leading-relaxed">
                {xmlSitemap}
              </pre>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
