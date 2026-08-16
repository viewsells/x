import { useState, useEffect } from 'react';

export type RouteType =
  | { page: 'home' }
  | { page: 'accounts' }
  | { page: 'account-detail'; slug: string }
  | { page: 'promotion' }
  | { page: 'promotion-detail'; slug: string }
  | { page: 'blog' }
  | { page: 'blog-detail'; slug: string }
  | { page: 'faq' }
  | { page: 'about' }
  | { page: 'contact' }
  | { page: 'checkout'; serviceId?: string }
  | { page: 'payment-methods' }
  | { page: 'legal'; legalSlug: 'terms' | 'privacy-policy' | 'refund-policy' | 'delivery-policy' | 'disclaimer' }
  | { page: 'sitemap' }
  | { page: 'not-found' };

export const parsePath = (pathname: string): RouteType => {
  // Check if there's a SPA query redirect (e.g. from GitHub Pages 404.html redirect)
  let activePath = pathname;
  if (typeof window !== 'undefined' && window.location.search) {
    const search = window.location.search;
    if (search.startsWith('?/')) {
      activePath = search.slice(1);
    } else if (search.startsWith('?') && !search.includes('=')) {
      activePath = '/' + search.slice(1);
    }
  }

  // Normalize path by stripping leading/trailing slashes and lowercasing
  let cleanPath = activePath.replace(/^\/+|\/+$/g, '').toLowerCase();

  // If deployed under a GitHub Pages repo subfolder (e.g., /x/ or /x/accounts)
  if (cleanPath === 'x') {
    cleanPath = '';
  } else if (cleanPath.startsWith('x/')) {
    cleanPath = cleanPath.slice(2);
  }

  if (!cleanPath || cleanPath === '') {
    return { page: 'home' };
  }

  const parts = cleanPath.split('/');

  // /checkout, /order, /buy
  if (parts[0] === 'checkout' || parts[0] === 'order' || parts[0] === 'buy') {
    return { page: 'checkout', serviceId: parts[1] };
  }

  // /payment-methods or /payment or /wallets or /crypto -> route to checkout
  if (parts[0] === 'payment-methods' || parts[0] === 'payment' || parts[0] === 'wallets' || parts[0] === 'crypto') {
    return { page: 'checkout' };
  }

  // /accounts or /accounts/...
  if (parts[0] === 'accounts') {
    if (parts.length === 1) {
      return { page: 'accounts' };
    }
    return { page: 'account-detail', slug: parts[1] };
  }

  // /promotion-services or /promotion-services/...
  if (parts[0] === 'promotion-services' || parts[0] === 'promotion') {
    if (parts.length === 1) {
      return { page: 'promotion' };
    }
    return { page: 'promotion-detail', slug: parts[1] };
  }

  // /blog or /blog/...
  if (parts[0] === 'blog') {
    if (parts.length === 1) {
      return { page: 'blog' };
    }
    return { page: 'blog-detail', slug: parts[1] };
  }

  // /faq
  if (parts[0] === 'faq') {
    return { page: 'faq' };
  }

  // /about or /about-us
  if (parts[0] === 'about' || parts[0] === 'about-us') {
    return { page: 'about' };
  }

  // /contact or /contact-us
  if (parts[0] === 'contact' || parts[0] === 'contact-us') {
    return { page: 'contact' };
  }

  // Legal routes
  if (parts[0] === 'terms' || parts[0] === 'terms-and-conditions' || parts[0] === 'terms-of-service') {
    return { page: 'legal', legalSlug: 'terms' };
  }
  if (parts[0] === 'privacy' || parts[0] === 'privacy-policy') {
    return { page: 'legal', legalSlug: 'privacy-policy' };
  }
  if (parts[0] === 'refund-policy' || parts[0] === 'refunds') {
    return { page: 'legal', legalSlug: 'refund-policy' };
  }
  if (parts[0] === 'delivery-policy' || parts[0] === 'delivery') {
    return { page: 'legal', legalSlug: 'delivery-policy' };
  }
  if (parts[0] === 'disclaimer') {
    return { page: 'legal', legalSlug: 'disclaimer' };
  }

  // Sitemap
  if (parts[0] === 'sitemap' || parts[0] === 'sitemap.xml') {
    return { page: 'sitemap' };
  }

  return { page: 'not-found' };
};

export const getBasePrefix = () => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/x')) {
    return '/x';
  }
  return '';
};

export const navigateTo = (path: string) => {
  const base = getBasePrefix();
  const rawPath = path.startsWith('/') ? path : `/${path}`;
  const fullPath = base ? `${base}${rawPath}` : rawPath;
  if (window.location.pathname !== fullPath) {
    window.history.pushState({}, '', fullPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const useAppRouter = () => {
  const [currentPath, setCurrentPath] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    // If redirected via query string from 404.html, clean up URL into proper path
    if (window.location.search && window.location.search.startsWith('?/')) {
      const redirectedPath = window.location.search.slice(1);
      const base = getBasePrefix();
      const cleanUrl = base + redirectedPath;
      window.history.replaceState({}, '', cleanUrl);
      setCurrentPath(cleanUrl);
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = parsePath(currentPath);

  return {
    route,
    pathname: currentPath,
    navigate: navigateTo
  };
};
