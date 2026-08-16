import { useState, useEffect, useRef } from 'react';
import { Search, X, Terminal, FileText, ArrowRight, Star, Clock } from 'lucide-react';
import { allServices } from '../data/allServices';
import { blogPosts } from '../data/blogData';
import { navigateTo } from '../utils/router';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredServices = allServices.filter(
    (s) =>
      s.name.toLowerCase().includes(normalizedQuery) ||
      s.shortDescription.toLowerCase().includes(normalizedQuery) ||
      s.primaryKeyword.toLowerCase().includes(normalizedQuery)
  );

  const filteredBlogs = blogPosts.filter(
    (b) =>
      b.title.toLowerCase().includes(normalizedQuery) ||
      b.summary.toLowerCase().includes(normalizedQuery) ||
      b.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
  );

  const handleSelectService = (slug: string, category: string) => {
    onClose();
    if (category === 'accounts') {
      navigateTo(`/accounts/${slug}`);
    } else {
      navigateTo(`/promotion-services/${slug}`);
    }
  };

  const handleSelectBlog = (slug: string) => {
    onClose();
    navigateTo(`/blog/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-[#D0D7DE] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#D0D7DE] flex items-center space-x-3 bg-[#F6F8FA]">
          <Search className="w-5 h-5 text-[#57606A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search accounts, stars, forks, or developer guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-sm text-[#24292F] focus:outline-none placeholder-[#8C959F]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search input"
              className="text-xs text-[#57606A] hover:text-[#24292F] p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search modal"
            className="text-[#57606A] hover:text-[#24292F] p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 divide-y divide-[#D0D7DE]/60">
          
          {/* Services Section */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#57606A] mb-2 px-2">
              Services & Accounts ({filteredServices.length})
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-xs text-[#8C959F] italic px-2 py-1">No services found matching &quot;{query}&quot;</div>
            ) : (
              <div className="space-y-1">
                {filteredServices.slice(0, 8).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(service.slug, service.category)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F6F8FA] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded bg-[#24292F] text-white flex items-center justify-center shrink-0">
                        {service.category === 'accounts' ? (
                          <Terminal className="w-3.5 h-3.5" />
                        ) : (
                          <Star className="w-3.5 h-3.5 text-[#E3B341]" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#24292F] group-hover:text-[#0969DA]">
                          {service.name}
                        </div>
                        <div className="text-[11px] text-[#57606A] line-clamp-1">
                          {service.shortDescription}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-[#1A7F37]">
                        {service.basePrice}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8C959F] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Blog Articles Section */}
          <div className="pt-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#57606A] mb-2 px-2">
              Guides & Articles ({filteredBlogs.length})
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="text-xs text-[#8C959F] italic px-2 py-1">No articles found matching &quot;{query}&quot;</div>
            ) : (
              <div className="space-y-1">
                {filteredBlogs.slice(0, 6).map((blog) => (
                  <button
                    key={blog.slug}
                    onClick={() => handleSelectBlog(blog.slug)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F6F8FA] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded bg-[#EAEFEF] text-[#24292F] flex items-center justify-center shrink-0">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#24292F] group-hover:text-[#0969DA]">
                          {blog.title}
                        </div>
                        <div className="text-[11px] text-[#57606A] flex items-center space-x-2">
                          <span>{blog.category}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C959F] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F6F8FA] border-t border-[#D0D7DE] text-[11px] text-[#57606A] flex items-center justify-between">
          <span>Navigate with mouse or click</span>
          <span>Press <kbd className="font-mono bg-white border border-[#D0D7DE] px-1 py-0.5 rounded">ESC</kbd> to close</span>
        </div>

      </div>
    </div>
  );
};
