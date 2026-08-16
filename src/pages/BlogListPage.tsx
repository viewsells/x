import { useState } from 'react';
import { FileText, Search, Clock, ChevronRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { blogPosts } from '../data/blogData';
import { navigateTo } from '../utils/router';

export const BlogListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Accounts & History', 'Promotion & Growth', 'Security & Best Practices', 'Developer Guides'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && post.category === selectedCategory;
  });

  const structuredSchema = {
    '@type': 'Blog',
    name: 'BuyGitHubAccounts.com Developer Blog',
    description: 'Technical guides, open-source repository optimization strategies, and GitHub developer account management tutorials.',
    blogPost: blogPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.summary,
      datePublished: p.publishedDate,
      author: {
        '@type': 'Organization',
        name: 'BuyGitHubAccounts.com Editorial Team'
      },
      url: `https://buygithubaccounts.com/blog/${p.slug}`
    }))
  };

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title="Developer Blog & Technical Guides | BuyGitHubAccounts.com"
        description="20 comprehensive guides on GitHub accounts management, aged tenure vs new accounts, open-source repository star growth, 2FA security, and Student Developer Pack workflows."
        canonicalPath="/blog"
        schemaData={structuredSchema}
      />

      {/* Breadcrumbs */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Blog & Developer Guides' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <FileText className="w-3.5 h-3.5 text-[#0969DA]" />
              <span>Knowledge Base &amp; Technical Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              Developer Blog &amp; Best Practices
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              Explore 20 comprehensive technical articles covering GitHub account maintenance, security hardening, multi-account CI/CD configurations, repository visibility optimization, and open-source growth metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Category Pills and Search */}
      <section className="bg-[#F6F8FA] border-b border-[#D0D7DE] py-6 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#24292F] text-white border-[#24292F]'
                      : 'bg-white text-[#57606A] border-[#D0D7DE] hover:text-[#24292F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#8C959F] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search articles and topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#D0D7DE] rounded-md py-1.5 pl-9 pr-3 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl border border-[#D0D7DE] p-6 flex flex-col justify-between hover:border-[#24292F] transition-all hover:shadow-xs group"
              >
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-[#57606A] mb-3">
                    <span className="bg-[#F6F8FA] px-2 py-0.5 rounded border border-[#D0D7DE] font-semibold text-[#24292F]">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                    <button
                      onClick={() => navigateTo(`/blog/${post.slug}`)}
                      className="text-left"
                    >
                      {post.title}
                    </button>
                  </h2>

                  <p className="text-xs text-[#57606A] mt-2.5 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="mt-4 pt-3 flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[#F6F8FA] text-[#57606A] px-1.5 py-0.5 rounded border border-[#D0D7DE]/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D0D7DE] flex items-center justify-between text-xs">
                  <div className="text-[#8C959F] font-mono text-[11px]">
                    {post.publishedDate}
                  </div>

                  <button
                    onClick={() => navigateTo(`/blog/${post.slug}`)}
                    className="text-[#0969DA] font-semibold hover:underline flex items-center"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-[#57606A]">No articles found matching &quot;{searchQuery}&quot;.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs text-[#0969DA] font-semibold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
