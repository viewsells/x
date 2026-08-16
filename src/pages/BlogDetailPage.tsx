import { BlogPost } from '../types';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { blogPosts } from '../data/blogData';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Send, 
  MessageSquare,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { navigateTo } from '../utils/router';

interface BlogDetailPageProps {
  post: BlogPost;
  onOpenOrderModal: (serviceId?: string) => void;
}

export const BlogDetailPage = ({ post, onOpenOrderModal }: BlogDetailPageProps) => {
  // Related blog articles
  const relatedArticles = blogPosts
    .filter((b) => b.slug !== post.slug && (b.category === post.category || b.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  const structuredArticleSchema = {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'BuyGitHubAccounts.com Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BuyGitHubAccounts.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://buygithubaccounts.com/blog/${post.slug}`
    }
  };

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title={post.metaTitle || `${post.title} | Developer Guide`}
        description={post.metaDescription || post.summary}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        schemaData={structuredArticleSchema}
      />

      {/* Breadcrumb Header */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Blog', path: '/blog' },
              { label: post.title }
            ]}
          />
        </div>
      </div>

      {/* Article Content Container */}
      <article className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-[#D0D7DE]">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#57606A] mb-3">
              <span className="bg-[#F6F8FA] border border-[#D0D7DE] text-[#24292F] px-2.5 py-0.5 rounded">
                {post.category}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Date Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#57606A] pt-2">
              <span className="flex items-center font-mono">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#57606A]" />
                Published: {post.publishedDate}
              </span>
              <span>•</span>
              <span className="text-[#2DA44E] font-medium">Verified Technical Guide</span>
            </div>

            {/* Executive Summary Callout Box */}
            <div className="mt-6 bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#24292F] mb-1.5">
                Executive Summary:
              </div>
              <p className="text-xs sm:text-sm text-[#57606A] leading-relaxed">
                {post.summary}
              </p>
            </div>
          </header>

          {/* Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="mb-10 bg-[#E1F0DA]/30 border border-[#2DA44E]/30 rounded-xl p-5 sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A7F37] mb-3 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-[#2DA44E]" />
                Key Technical Takeaways
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#24292F]">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#2DA44E] font-bold mr-2">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Content Sections */}
          <div className="space-y-10 text-[#24292F]">
            {post.contentSections && post.contentSections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="text-lg sm:text-2xl font-bold text-[#24292F] pb-2 border-b border-[#D0D7DE]/60">
                  {section.heading}
                </h2>

                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-base text-[#57606A] leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#24292F] bg-[#F6F8FA] p-4 sm:p-5 rounded-lg border border-[#D0D7DE]">
                    {section.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="flex items-start">
                        <span className="text-[#0969DA] font-bold mr-2">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <div className="bg-[#FFF8C5]/30 border border-[#D29922]/40 rounded-lg p-4 text-xs sm:text-sm text-[#57606A] flex items-start">
                    <Bookmark className="w-4 h-4 text-[#D29922] mr-2 shrink-0 mt-0.5" />
                    <span>{section.callout}</span>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-[#D0D7DE] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#57606A] mr-1">Tags:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#F6F8FA] text-[#57606A] px-2.5 py-1 rounded border border-[#D0D7DE]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* In-Article Promotion CTA Banner */}
          <div className="mt-10 bg-[#24292F] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#2DA44E] font-semibold">
                Provisioning &amp; Promotion Solutions
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                Need Verified GitHub Accounts or Repository Promotion?
              </h3>
              <p className="text-xs text-[#8B949E] mt-1 max-w-md">
                Browse our verified accounts ($5 - $200) or boost public repository social proof. Includes 48h warranty.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                onClick={() => navigateTo('/accounts')}
                className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold px-4 py-2.5 rounded transition-colors text-center"
              >
                Browse Accounts
              </button>
              <button
                onClick={() => onOpenOrderModal()}
                className="bg-[#161B22] hover:bg-[#30363D] border border-[#30363D] text-white text-xs font-semibold px-4 py-2.5 rounded transition-colors text-center"
              >
                Quick Order
              </button>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="mt-14 pt-10 border-t border-[#D0D7DE]">
            <h2 className="text-lg sm:text-xl font-bold text-[#24292F] mb-6">
              Related Developer Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-5 flex flex-col justify-between hover:border-[#24292F] transition-colors group"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-[#57606A] uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] mt-1.5 leading-snug">
                      <button
                        onClick={() => navigateTo(`/blog/${rel.slug}`)}
                        className="text-left"
                      >
                        {rel.title}
                      </button>
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D0D7DE]/60 flex items-center justify-between text-xs">
                    <span className="text-[#8C959F] text-[11px]">{rel.readTime}</span>
                    <button
                      onClick={() => navigateTo(`/blog/${rel.slug}`)}
                      className="text-[#0969DA] font-semibold hover:underline flex items-center"
                    >
                      <span>Read</span>
                      <ChevronRight className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </article>

    </div>
  );
};
