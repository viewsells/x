import { useState, useEffect, useMemo } from 'react';
import { BlogPost } from '../types';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { blogPosts } from '../data/blogData';
import { getServiceById } from '../data/allServices';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Send, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Terminal,
  ExternalLink,
  MessageSquare,
  ListOrdered
} from 'lucide-react';
import { navigateTo } from '../utils/router';

interface BlogDetailPageProps {
  post: BlogPost;
  onOpenOrderModal: (serviceId?: string) => void;
}

export const BlogDetailPage = ({ post, onOpenOrderModal }: BlogDetailPageProps) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);

  // Check if article is saved locally
  useEffect(() => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('bga_saved_blog_slugs') || '[]');
      setIsSaved(saved.includes(post.slug));
    } catch {
      setIsSaved(false);
    }
  }, [post.slug]);

  // Track scroll progress for reading bar and TOC highlight
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check active section
      if (post.contentSections && post.contentSections.length > 0) {
        post.contentSections.forEach((_, idx) => {
          const el = document.getElementById(`section-${idx}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom >= 180) {
              setActiveHeadingIndex(idx);
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.contentSections]);

  const toggleSave = () => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('bga_saved_blog_slugs') || '[]');
      let updated: string[];
      if (saved.includes(post.slug)) {
        updated = saved.filter(s => s !== post.slug);
        setIsSaved(false);
      } else {
        updated = [...saved, post.slug];
        setIsSaved(true);
      }
      localStorage.setItem('bga_saved_blog_slugs', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopyLink = () => {
    const url = `https://buygithubaccounts.com/blog/${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Find currentIndex, prevPost, and nextPost
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Related blog articles
  const relatedArticles = useMemo(() => {
    return blogPosts
      .filter((b) => b.slug !== post.slug && (b.category === post.category || b.tags.some(t => post.tags.includes(t))))
      .slice(0, 3);
  }, [post]);

  // Contextual matching service cards
  const relatedServices = useMemo(() => {
    if (!post.relatedServiceIds || post.relatedServiceIds.length === 0) return [];
    return post.relatedServiceIds
      .map(id => getServiceById(id))
      .filter(Boolean);
  }, [post.relatedServiceIds]);

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'Accounts & History':
        return {
          icon: Terminal,
          badge: 'bg-[#DDF4FF] text-[#0969DA] border-[#54AEFF]/30',
          accent: '#0969DA'
        };
      case 'Promotion & Growth':
        return {
          icon: TrendingUp,
          badge: 'bg-[#FFF8C5] text-[#9A6700] border-[#D29922]/30',
          accent: '#D29922'
        };
      case 'Security & Best Practices':
        return {
          icon: ShieldCheck,
          badge: 'bg-[#E1F0DA] text-[#1A7F37] border-[#2DA44E]/30',
          accent: '#1A7F37'
        };
      default:
        return {
          icon: BookOpen,
          badge: 'bg-[#F2EFFC] text-[#6639BA] border-[#8250DF]/30',
          accent: '#8250DF'
        };
    }
  };

  const theme = getCategoryTheme(post.category);
  const CategoryIcon = theme.icon;

  const structuredArticleSchema = {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'BuyGitHubAccounts.com Technical Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BuyGitHubAccounts.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buygithubaccounts.com/favicon.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://buygithubaccounts.com/blog/${post.slug}`
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen relative">
      <SEOHead
        title={post.metaTitle || `${post.title} | Developer Guide`}
        description={post.metaDescription || post.summary}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        schemaData={structuredArticleSchema}
      />

      {/* Reading Progress Bar (Top) */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-[#E1E4E8]">
        <div 
          className="h-full bg-[#0969DA] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Breadcrumb Header */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Blog', path: '/blog' },
              { label: post.category, path: '/blog' },
              { label: post.title }
            ]}
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Back Link & Quick Actions Bar */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#D0D7DE]">
          <button
            onClick={() => navigateTo('/blog')}
            className="text-xs font-bold text-[#57606A] hover:text-[#0969DA] flex items-center space-x-1.5 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All 20 Guides</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSave}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors flex items-center space-x-1.5 ${
                isSaved
                  ? 'bg-[#DDF4FF] text-[#0969DA] border-[#54AEFF]/40'
                  : 'bg-white text-[#57606A] border-[#D0D7DE] hover:bg-[#F6F8FA] hover:text-[#24292F]'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save article'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Guide'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D0D7DE] bg-white hover:bg-[#F6F8FA] text-[#57606A] hover:text-[#24292F] transition-colors flex items-center space-x-1.5"
              title="Copy shareable link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2DA44E]" />
                  <span className="text-[#2DA44E]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#8C959F]" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://buygithubaccounts.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold p-2 rounded-lg border border-[#D0D7DE] bg-white hover:bg-[#F6F8FA] text-[#57606A] hover:text-[#24292F] transition-colors"
              title="Share on X"
            >
              <Share2 className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Main Article Column (Left 8 Cols) */}
          <main className="lg:col-span-8">
            <article>
              
              {/* Header Meta */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${theme.badge} flex items-center space-x-1.5`}>
                    <CategoryIcon className="w-3.5 h-3.5" />
                    <span>{post.category}</span>
                  </span>

                  <span className="text-xs text-[#57606A] flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-[#8C959F]" />
                    {post.readTime}
                  </span>

                  <span className="text-xs text-[#57606A] flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#8C959F]" />
                    {post.publishedDate}
                  </span>

                  <span className="text-xs text-[#2DA44E] font-semibold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Verified Technical Guide
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight leading-tight">
                  {post.title}
                </h1>

                {/* Author Persona Card */}
                <div className="mt-6 pt-5 border-t border-[#D0D7DE] flex items-center space-x-3 text-xs text-[#57606A]">
                  <div className="w-9 h-9 rounded-full bg-[#24292F] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    BGA
                  </div>
                  <div>
                    <div className="font-bold text-[#24292F]">BuyGitHubAccounts Technical Editorial</div>
                    <div className="text-[11px] text-[#57606A]">Security &amp; DevOps Research Unit • Reviewed for accuracy</div>
                  </div>
                </div>

                {/* Executive Summary Callout */}
                <div className="mt-6 bg-[#F6F8FA] border-l-4 border-[#0969DA] rounded-r-xl p-5 sm:p-6 shadow-2xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0969DA] mb-2 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Summary</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#24292F] leading-relaxed font-normal">
                    {post.summary}
                  </p>
                </div>
              </header>

              {/* Key Technical Takeaways Box */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <section className="mb-10 bg-gradient-to-br from-[#E1F0DA]/40 to-[#E1F0DA]/20 border border-[#2DA44E]/30 rounded-2xl p-5 sm:p-7">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A7F37] mb-3 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2DA44E]" />
                    <span>Key Technical Takeaways</span>
                  </h2>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#24292F]">
                    {post.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#2DA44E] font-bold mr-2.5 text-base leading-none mt-0.5">✓</span>
                        <span className="leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Main Content Sections */}
              <div className="space-y-12 text-[#24292F]">
                {post.contentSections && post.contentSections.map((section, sIdx) => (
                  <section 
                    key={sIdx} 
                    id={`section-${sIdx}`}
                    className="space-y-4 scroll-mt-24"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-[#24292F] pb-2.5 border-b border-[#D0D7DE]/80 tracking-tight flex items-center space-x-2">
                      <span className="text-xs font-mono text-[#0969DA] bg-[#DDF4FF] px-2 py-0.5 rounded font-bold">
                        0{sIdx + 1}
                      </span>
                      <span>{section.heading}</span>
                    </h2>

                    {section.body.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-[#424A53] leading-relaxed font-normal">
                        {paragraph}
                      </p>
                    ))}

                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <div className="mt-4 bg-[#F6F8FA] p-5 sm:p-6 rounded-xl border border-[#D0D7DE] space-y-2.5">
                        <div className="text-xs font-bold text-[#24292F] uppercase tracking-wider">
                          Key Specifications &amp; Parameters:
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-[#24292F]">
                          {section.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx} className="flex items-start">
                              <span className="text-[#0969DA] font-bold mr-2 text-base leading-none">•</span>
                              <span className="leading-relaxed">{bp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.callout && (
                      <div className="mt-4 bg-[#FFF8C5]/40 border border-[#D29922]/50 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#57606A] flex items-start space-x-3 shadow-2xs">
                        <Sparkles className="w-4 h-4 text-[#D29922] shrink-0 mt-0.5" />
                        <div className="leading-relaxed text-[#24292F]">
                          {section.callout}
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Tags Cloud */}
              <div className="mt-12 pt-6 border-t border-[#D0D7DE] flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#57606A] mr-1">Article Tags:</span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#F6F8FA] text-[#57606A] px-2.5 py-1 rounded-md border border-[#D0D7DE] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="mt-10 bg-[#F6F8FA] border border-[#D0D7DE] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-[#24292F] text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-xs">
                  BGA
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-[#24292F]">
                    BuyGitHubAccounts Editorial &amp; DevOps Research Unit
                  </div>
                  <p className="text-xs text-[#57606A] leading-relaxed">
                    Our technical team provides verified solutions for Git authentication, multi-account CI/CD orchestrations, repository security hardening, and developer identity management.
                  </p>
                </div>
              </div>

              {/* Next & Previous Article Cards */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <button
                    onClick={() => navigateTo(`/blog/${prevPost.slug}`)}
                    className="text-left bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-4 sm:p-5 transition-all group hover:border-[#24292F] flex flex-col justify-between"
                  >
                    <div className="text-[11px] font-bold text-[#8C959F] flex items-center space-x-1 mb-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                      <span>Previous Guide</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors line-clamp-2">
                      {prevPost.title}
                    </div>
                  </button>
                ) : <div />}

                {nextPost ? (
                  <button
                    onClick={() => navigateTo(`/blog/${nextPost.slug}`)}
                    className="text-right bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-4 sm:p-5 transition-all group hover:border-[#24292F] flex flex-col justify-between ml-auto w-full"
                  >
                    <div className="text-[11px] font-bold text-[#8C959F] flex items-center justify-end space-x-1 mb-1">
                      <span>Next Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors line-clamp-2">
                      {nextPost.title}
                    </div>
                  </button>
                ) : <div />}
              </div>

            </article>
          </main>

          {/* Sticky Sidebar (Right 4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-20 space-y-6">

              {/* Table of Contents Box */}
              {post.contentSections && post.contentSections.length > 0 && (
                <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-2xl p-5 sm:p-6 shadow-2xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#24292F] mb-3 flex items-center space-x-2">
                    <ListOrdered className="w-4 h-4 text-[#0969DA]" />
                    <span>Table of Contents</span>
                  </div>
                  <nav className="space-y-2">
                    {post.contentSections.map((section, idx) => {
                      const isActive = activeHeadingIndex === idx;
                      return (
                        <a
                          key={idx}
                          href={`#section-${idx}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`block text-xs py-1.5 px-2.5 rounded-lg transition-all ${
                            isActive
                              ? 'bg-white font-bold text-[#0969DA] shadow-2xs border border-[#D0D7DE]'
                              : 'text-[#57606A] hover:text-[#24292F] hover:bg-white/50'
                          }`}
                        >
                          <span className="font-mono text-[10px] text-[#8C959F] mr-1.5">0{idx + 1}.</span>
                          <span>{section.heading}</span>
                        </a>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Contextual Matching Services Card */}
              {relatedServices.length > 0 && (
                <div className="bg-white border border-[#D0D7DE] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#24292F] flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2DA44E]" />
                    <span>Recommended Services</span>
                  </div>

                  <div className="space-y-3">
                    {relatedServices.slice(0, 2).map((srv) => {
                      if (!srv) return null;
                      return (
                        <div 
                          key={srv.id}
                          className="p-3.5 bg-[#F6F8FA] hover:bg-white border border-[#D0D7DE] rounded-xl transition-all hover:border-[#0969DA] group"
                        >
                          <div className="text-xs font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                            {srv.name}
                          </div>
                          <div className="text-[11px] text-[#57606A] mt-1 line-clamp-2">
                            {srv.description}
                          </div>
                          <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#D0D7DE]/60">
                            <span className="text-xs font-bold text-[#2DA44E]">
                              From ${srv.price}
                            </span>
                            <button
                              onClick={() => {
                                if (srv.category === 'accounts') {
                                  navigateTo(`/accounts/${srv.slug}`);
                                } else {
                                  navigateTo(`/promotion/${srv.slug}`);
                                }
                              }}
                              className="text-[11px] font-bold text-[#0969DA] hover:underline flex items-center"
                            >
                              <span>View Details</span>
                              <ChevronRight className="w-3 h-3 ml-0.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => onOpenOrderModal()}
                    className="w-full bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all text-center shadow-xs"
                  >
                    Quick Order Custom Setup
                  </button>
                </div>
              )}

              {/* Direct Telegram Support Box */}
              <div className="bg-[#24292F] text-white rounded-2xl p-5 sm:p-6 border border-[#30363D] space-y-3 shadow-sm">
                <div className="text-[10px] font-mono text-[#2DA44E] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <Send className="w-3 h-3 text-[#2DA44E]" />
                  <span>24/7 DEVELOPER DISPATCH</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Have Technical Questions?
                </h3>
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  Chat with our engineers on Telegram for instant technical verification, custom quotes, and account inquiries.
                </p>
                <a
                  href="https://t.me/EgSupport24"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#30363D] hover:bg-[#484F58] border border-[#484F58] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#2DA44E]" />
                  <span>Telegram @EgSupport24</span>
                </a>
              </div>

            </div>
          </aside>

        </div>

        {/* Related Articles Section (Bottom) */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#D0D7DE]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#57606A] mb-1">
                  Keep Exploring
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#24292F] tracking-tight">
                  Related Technical Guides
                </h2>
              </div>
              <button
                onClick={() => navigateTo('/blog')}
                className="text-xs font-bold text-[#0969DA] hover:underline flex items-center space-x-1"
              >
                <span>View all 20 guides</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const relTheme = getCategoryTheme(rel.category);
                const RelIcon = relTheme.icon;

                return (
                  <article
                    key={rel.slug}
                    onClick={() => navigateTo(`/blog/${rel.slug}`)}
                    className="bg-white border border-[#D0D7DE] rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#24292F] transition-all hover:shadow-sm group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${relTheme.badge} flex items-center space-x-1`}>
                          <RelIcon className="w-3 h-3 mr-1" />
                          <span>{rel.category}</span>
                        </span>
                        <span className="text-[11px] text-[#8C959F]">{rel.readTime}</span>
                      </div>

                      <h3 className="text-sm font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                        {rel.title}
                      </h3>

                      <p className="text-xs text-[#57606A] mt-2 line-clamp-2 leading-relaxed">
                        {rel.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#D0D7DE]/60 flex items-center justify-between text-xs">
                      <span className="text-[#8C959F] text-[11px] font-mono">{rel.publishedDate}</span>
                      <span className="text-[#0969DA] font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                        <span>Read</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

      </div>

    </div>
  );
};
