import { useState, useMemo, MouseEvent } from 'react';
import { 
  Search, 
  Clock, 
  ChevronRight, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  Terminal, 
  Sparkles, 
  Grid, 
  List, 
  Bookmark, 
  Check, 
  X, 
  ArrowRight,
  Send,
  SlidersHorizontal,
  FileCode2,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { blogPosts } from '../data/blogData';
import { navigateTo } from '../utils/router';
import { BlogPost } from '../types';

export const BlogListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'readTime' | 'title'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bga_saved_blog_slugs') || '[]');
    } catch {
      return [];
    }
  });
  const [bookmarkToast, setBookmarkToast] = useState<string | null>(null);

  const categories = [
    'All', 
    'Accounts & History', 
    'Promotion & Growth', 
    'Security & Best Practices', 
    'Developer Guides'
  ];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagMap: Record<string, number> = {};
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });
    return Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    categories.slice(1).forEach(cat => {
      counts[cat] = blogPosts.filter(p => p.category === cat).length;
    });
    return counts;
  }, [categories]);

  const toggleSaveArticle = (slug: string, e: MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (savedArticles.includes(slug)) {
      updated = savedArticles.filter(s => s !== slug);
      setBookmarkToast('Article removed from saved reading list');
    } else {
      updated = [...savedArticles, slug];
      setBookmarkToast('Article saved to reading list');
    }
    setSavedArticles(updated);
    try {
      localStorage.setItem('bga_saved_blog_slugs', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setTimeout(() => setBookmarkToast(null), 2500);
  };

  const filteredPosts = useMemo(() => {
    let result = blogPosts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCat && matchesTag;
    });

    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (sortBy === 'readTime') {
      const getMin = (r: string) => parseInt(r) || 5;
      result.sort((a, b) => getMin(a.readTime) - getMin(b.readTime));
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  // Featured flagship article (first post when no active search/tag filter)
  const featuredPost: BlogPost | null = useMemo(() => {
    if (!searchQuery && selectedCategory === 'All' && !selectedTag && blogPosts.length > 0) {
      return blogPosts[0];
    }
    return null;
  }, [searchQuery, selectedCategory, selectedTag]);

  const remainingPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter(p => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'Accounts & History':
        return {
          icon: Terminal,
          pillClass: 'bg-[#DDF4FF] text-[#0969DA] border-[#54AEFF]/30',
          accentColor: '#0969DA',
          badgeLabel: 'Architecture & Aging'
        };
      case 'Promotion & Growth':
        return {
          icon: TrendingUp,
          pillClass: 'bg-[#FFF8C5] text-[#9A6700] border-[#D29922]/30',
          accentColor: '#D29922',
          badgeLabel: 'Growth & Stars'
        };
      case 'Security & Best Practices':
        return {
          icon: ShieldCheck,
          pillClass: 'bg-[#E1F0DA] text-[#1A7F37] border-[#2DA44E]/30',
          accentColor: '#1A7F37',
          badgeLabel: 'Security & 2FA'
        };
      default:
        return {
          icon: BookOpen,
          pillClass: 'bg-[#F2EFFC] text-[#6639BA] border-[#8250DF]/30',
          accentColor: '#8250DF',
          badgeLabel: 'Developer Guide'
        };
    }
  };

  const structuredSchema = {
    '@type': 'Blog',
    name: 'BuyGitHubAccounts.com Developer Blog & Technical Guides',
    description: '20 comprehensive guides on GitHub accounts management, aged tenure vs new accounts, open-source repository star growth, 2FA security, and Student Developer Pack workflows.',
    url: 'https://buygithubaccounts.com/blog',
    blogPost: blogPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.summary,
      datePublished: p.publishedDate,
      author: {
        '@type': 'Organization',
        name: 'BuyGitHubAccounts.com Technical Editorial Team'
      },
      url: `https://buygithubaccounts.com/blog/${p.slug}`
    }))
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <SEOHead
        title="Developer Blog & Technical Guides | BuyGitHubAccounts.com"
        description="20 in-depth technical guides covering GitHub accounts architecture, aged vs new tenure, CI/CD bot setups, repository star algorithms, 2FA security hardening, and student developer pack workflows."
        canonicalPath="/blog"
        schemaData={structuredSchema}
      />

      {/* Bookmark Toast */}
      {bookmarkToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#24292F] text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-[#30363D] flex items-center space-x-2 animate-fade-in">
          <Bookmark className="w-4 h-4 text-[#2DA44E]" />
          <span>{bookmarkToast}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Developer Blog & Guides' }]} />
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F6F8FA] via-white to-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white border border-[#D0D7DE] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#24292F] shadow-2xs mb-5">
              <span className="w-2 h-2 rounded-full bg-[#2DA44E] animate-pulse"></span>
              <FileCode2 className="w-3.5 h-3.5 text-[#0969DA]" />
              <span className="text-[#57606A]">DevOps &amp; Open Source Research Archive</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24292F] tracking-tight leading-tight">
              Developer Blog &amp; Technical Guides
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#57606A] leading-relaxed">
              Explore 20 in-depth articles on GitHub account management, multi-account CI/CD configurations, aged profile longevity, repository growth algorithms, and security hardening.
            </p>

            {/* Live Metrics Bar */}
            <div className="mt-8 pt-6 border-t border-[#D0D7DE]/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#24292F]">20</div>
                <div className="text-xs text-[#57606A]">Technical Guides</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0969DA]">100%</div>
                <div className="text-xs text-[#57606A]">Open Access</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#1A7F37]">Weekly</div>
                <div className="text-xs text-[#57606A]">Research Updates</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#6639BA]">CLI &amp; API</div>
                <div className="text-xs text-[#57606A]">Production Ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-30 pointer-events-none hidden lg:block">
          <svg className="w-full h-full text-[#0969DA]/10" fill="currentColor" viewBox="0 0 100 100">
            <pattern id="grid-blog" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-blog)" />
          </svg>
        </div>
      </section>

      {/* Search & Topic Tags Filter */}
      <section className="bg-white border-b border-[#D0D7DE] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-[#8C959F] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search across 20 technical guides, tags, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F6F8FA] hover:bg-white focus:bg-white border border-[#D0D7DE] rounded-lg py-2.5 pl-10 pr-10 text-xs sm:text-sm text-[#24292F] focus:outline-none focus:border-[#0969DA] focus:ring-1 focus:ring-[#0969DA] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#8C959F] hover:text-[#24292F]"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center space-x-3 self-end md:self-auto">
              <div className="flex items-center space-x-1.5 text-xs text-[#57606A]">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'readTime' | 'title')}
                  className="bg-white border border-[#D0D7DE] rounded-md px-2.5 py-1.5 text-xs font-semibold text-[#24292F] focus:outline-none focus:border-[#0969DA]"
                >
                  <option value="date">Newest First</option>
                  <option value="readTime">Shortest Read</option>
                  <option value="title">Alphabetical (A-Z)</option>
                </select>
              </div>

              <div className="border-l border-[#D0D7DE] pl-3 flex items-center space-x-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded border transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#24292F] text-white border-[#24292F]'
                      : 'bg-white text-[#57606A] border-[#D0D7DE] hover:text-[#24292F]'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded border transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#24292F] text-white border-[#24292F]'
                      : 'bg-white text-[#57606A] border-[#D0D7DE] hover:text-[#24292F]'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Popular Tag Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs font-semibold text-[#57606A] mr-1">Trending Topics:</span>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-[#0969DA] text-white border-[#0969DA] shadow-2xs'
                      : 'bg-[#F6F8FA] text-[#57606A] border-[#D0D7DE] hover:bg-white hover:text-[#24292F]'
                  }`}
                >
                  #{tag}
                  {isSelected && <span className="ml-1 font-bold">×</span>}
                </button>
              );
            })}
            {(searchQuery || selectedTag || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag(null);
                }}
                className="text-[11px] text-[#CF222E] font-semibold hover:underline ml-2 flex items-center"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Category Tabs Bar */}
      <section className="bg-white/95 backdrop-blur-md border-b border-[#D0D7DE] py-3 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[#24292F] text-white border-[#24292F] shadow-2xs'
                      : 'bg-white text-[#57606A] border-[#D0D7DE] hover:bg-[#F6F8FA] hover:text-[#24292F]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F6F8FA] text-[#57606A] border border-[#D0D7DE]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-10 bg-[#FAFAFA] min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search/Filter Feedback Banner */}
          {(searchQuery || selectedTag || selectedCategory !== 'All') && (
            <div className="mb-8 flex items-center justify-between bg-white border border-[#D0D7DE] rounded-lg px-4 py-3 text-xs text-[#57606A]">
              <div>
                Showing <strong className="text-[#24292F] font-bold">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'} 
                {selectedCategory !== 'All' && <span> in <strong className="text-[#24292F]">{selectedCategory}</strong></span>}
                {selectedTag && <span> tagged with <strong className="text-[#0969DA]">#{selectedTag}</strong></span>}
                {searchQuery && <span> matching &quot;<strong className="text-[#24292F]">{searchQuery}</strong>&quot;</span>}
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag(null);
                }}
                className="text-[#0969DA] font-semibold hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Spotlight Featured Article (Shown when no search/tag is active) */}
          {featuredPost && (
            <div className="mb-10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#57606A] mb-3 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D29922]" />
                <span>Featured Technical Deep-Dive</span>
              </div>

              <div className="bg-white rounded-2xl border-2 border-[#0969DA]/30 shadow-sm hover:border-[#0969DA] transition-all overflow-hidden group">
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#DDF4FF] text-[#0969DA] border border-[#54AEFF]/30 text-xs font-bold px-3 py-0.5 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-[#57606A] flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#8C959F]" />
                        {featuredPost.readTime}
                      </span>
                      <span className="text-xs text-[#57606A] flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#8C959F]" />
                        {featuredPost.publishedDate}
                      </span>
                      <span className="text-xs font-medium text-[#2DA44E] flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Verified Editorial
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-tight">
                      <button
                        onClick={() => navigateTo(`/blog/${featuredPost.slug}`)}
                        className="text-left"
                      >
                        {featuredPost.title}
                      </button>
                    </h2>

                    <p className="text-sm sm:text-base text-[#57606A] leading-relaxed line-clamp-3">
                      {featuredPost.summary}
                    </p>

                    {featuredPost.keyTakeaways && featuredPost.keyTakeaways.length > 0 && (
                      <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-4 mt-4">
                        <div className="text-xs font-bold text-[#24292F] uppercase tracking-wider mb-2">
                          Key Architecture Insights:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57606A]">
                          {featuredPost.keyTakeaways.slice(0, 2).map((k, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#0969DA] font-bold mr-1.5">•</span>
                              <span>{k}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {featuredPost.tags.map((t, idx) => (
                        <span key={idx} className="text-xs bg-[#F6F8FA] text-[#57606A] px-2 py-0.5 rounded border border-[#D0D7DE]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-72 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#D0D7DE] pt-6 lg:pt-0 lg:pl-8">
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-[#57606A]">Published by:</div>
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#24292F] text-white flex items-center justify-center text-xs font-bold">
                          BGA
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#24292F]">Technical Staff</div>
                          <div className="text-[10px] text-[#57606A]">DevOps &amp; Security Lab</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => navigateTo(`/blog/${featuredPost.slug}`)}
                        className="w-full bg-[#24292F] hover:bg-[#0969DA] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xs group-hover:bg-[#0969DA]"
                      >
                        <span>Read Flagship Guide</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid View of Remaining / Filtered Posts */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => {
                const catMeta = getCategoryMeta(post.category);
                const IconComponent = catMeta.icon;
                const isSaved = savedArticles.includes(post.slug);

                return (
                  <article
                    key={post.slug}
                    onClick={() => navigateTo(`/blog/${post.slug}`)}
                    className="bg-white rounded-xl border border-[#D0D7DE] p-6 flex flex-col justify-between hover:border-[#24292F] transition-all hover:shadow-md group cursor-pointer relative"
                  >
                    <div>
                      {/* Top Category & Bookmark Bar */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${catMeta.pillClass} flex items-center space-x-1`}>
                            <IconComponent className="w-3 h-3 mr-1" />
                            <span>{post.category}</span>
                          </span>
                        </div>

                        <button
                          onClick={(e) => toggleSaveArticle(post.slug, e)}
                          className={`p-1.5 rounded-md hover:bg-[#F6F8FA] transition-colors ${
                            isSaved ? 'text-[#0969DA]' : 'text-[#8C959F] hover:text-[#24292F]'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save article'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Title */}
                      <h2 className="text-base font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-xs text-[#57606A] mt-2.5 line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 pt-3 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#F6F8FA] text-[#57606A] px-2 py-0.5 rounded border border-[#D0D7DE]/70 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-[10px] text-[#8C959F] self-center">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Meta */}
                    <div className="mt-6 pt-4 border-t border-[#D0D7DE] flex items-center justify-between text-xs text-[#57606A]">
                      <div className="flex items-center space-x-3 text-[11px]">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-[#8C959F]" />
                          {post.readTime}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-[#8C959F]">
                          {post.publishedDate}
                        </span>
                      </div>

                      <div className="text-[#0969DA] font-bold text-xs flex items-center group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {remainingPosts.map((post) => {
                const catMeta = getCategoryMeta(post.category);
                const IconComponent = catMeta.icon;
                const isSaved = savedArticles.includes(post.slug);

                return (
                  <article
                    key={post.slug}
                    onClick={() => navigateTo(`/blog/${post.slug}`)}
                    className="bg-white rounded-xl border border-[#D0D7DE] p-5 sm:p-6 hover:border-[#24292F] transition-all hover:shadow-xs group cursor-pointer flex flex-col sm:flex-row items-start justify-between gap-6"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${catMeta.pillClass} flex items-center space-x-1`}>
                          <IconComponent className="w-3 h-3 mr-1" />
                          <span>{post.category}</span>
                        </span>
                        <span className="text-[#8C959F]">•</span>
                        <span className="text-xs text-[#57606A] flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-[#8C959F]" />
                          {post.readTime}
                        </span>
                        <span className="text-[#8C959F]">•</span>
                        <span className="font-mono text-xs text-[#8C959F]">
                          {post.publishedDate}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-[#24292F] group-hover:text-[#0969DA] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#57606A] leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#F6F8FA] text-[#57606A] px-2 py-0.5 rounded border border-[#D0D7DE]/70 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#D0D7DE]">
                      <button
                        onClick={(e) => toggleSaveArticle(post.slug, e)}
                        className={`p-1.5 rounded-md hover:bg-[#F6F8FA] transition-colors mb-2 ${
                          isSaved ? 'text-[#0969DA]' : 'text-[#8C959F] hover:text-[#24292F]'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save article'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      <div className="text-[#0969DA] font-bold text-xs flex items-center group-hover:translate-x-1 transition-transform">
                        <span>Read Guide</span>
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Zero Results State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#D0D7DE] p-8 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#F6F8FA] border border-[#D0D7DE] flex items-center justify-center mx-auto mb-4 text-[#57606A]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#24292F]">No matching articles found</h3>
              <p className="text-xs text-[#57606A] mt-2 leading-relaxed">
                We couldn&apos;t find any articles matching your search query &quot;{searchQuery}&quot;. Try exploring other categories or clearing your filters.
              </p>
              <button
                onClick={() => { 
                  setSearchQuery(''); 
                  setSelectedCategory('All'); 
                  setSelectedTag(null); 
                }}
                className="mt-5 bg-[#24292F] hover:bg-[#0969DA] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Telegram / Direct Newsletter Box */}
          <div className="mt-16 bg-gradient-to-r from-[#24292F] to-[#161B22] text-white rounded-2xl p-6 sm:p-10 border border-[#30363D] flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-[#2DA44E] bg-[#2DA44E]/10 px-2.5 py-1 rounded">
                <Send className="w-3.5 h-3.5 text-[#2DA44E]" />
                <span>DIRECT DEVELOPER DISPATCH</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Need Fast Support or Custom Account Provisioning?
              </h3>
              <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed">
                Connect directly with our 24/7 technical team on Telegram. Get immediate answers to GitHub security questions, custom repository quotes, or instant order handovers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://t.me/EgSupport24"
                target="_blank"
                rel="noreferrer"
                className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all text-center flex items-center justify-center space-x-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Join Telegram @EgSupport24</span>
              </a>
              <button
                onClick={() => navigateTo('/accounts')}
                className="bg-[#30363D] hover:bg-[#484F58] border border-[#484F58] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all text-center"
              >
                Explore All Services
              </button>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};
