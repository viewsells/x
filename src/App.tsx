/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { useAppRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Eagerly loaded critical landing page
import { HomePage } from './pages/HomePage';

// Lazy-loaded secondary pages for optimal initial bundle performance
const AccountsCategoryPage = lazy(() => import('./pages/AccountsCategoryPage').then(m => ({ default: m.AccountsCategoryPage })));
const PromotionCategoryPage = lazy(() => import('./pages/PromotionCategoryPage').then(m => ({ default: m.PromotionCategoryPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const BlogListPage = lazy(() => import('./pages/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const PaymentMethodsPage = lazy(() => import('./pages/PaymentMethodsPage').then(m => ({ default: m.PaymentMethodsPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));
const SitemapPage = lazy(() => import('./pages/SitemapPage').then(m => ({ default: m.SitemapPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Lazy-loaded modal to avoid loading modal code and confetti in the critical initial path
const QuickOrderModal = lazy(() => import('./components/QuickOrderModal').then(m => ({ default: m.QuickOrderModal })));

// Data Lookups
import { getServiceBySlug } from './data/allServices';
import { getBlogBySlug } from './data/blogData';

// Lightweight fallback placeholder for secondary route navigation
const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#2DA44E] border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  const { route, pathname } = useAppRouter();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedServiceForOrder, setSelectedServiceForOrder] = useState<string | undefined>(undefined);

  const handleOpenOrderModal = (serviceId?: string) => {
    setSelectedServiceForOrder(serviceId);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedServiceForOrder(undefined);
  };

  const renderCurrentPage = () => {
    switch (route.page) {
      case 'home':
        return <HomePage onOpenOrderModal={handleOpenOrderModal} />;

      case 'accounts':
        return (
          <Suspense fallback={<PageFallback />}>
            <AccountsCategoryPage onOpenOrderModal={handleOpenOrderModal} />
          </Suspense>
        );

      case 'account-detail': {
        const service = getServiceBySlug(route.slug);
        if (!service) return <Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense>;
        return (
          <Suspense fallback={<PageFallback />}>
            <ServiceDetailPage service={service} onOpenOrderModal={handleOpenOrderModal} />
          </Suspense>
        );
      }

      case 'promotion':
        return (
          <Suspense fallback={<PageFallback />}>
            <PromotionCategoryPage onOpenOrderModal={handleOpenOrderModal} />
          </Suspense>
        );

      case 'promotion-detail': {
        const service = getServiceBySlug(route.slug);
        if (!service) return <Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense>;
        return (
          <Suspense fallback={<PageFallback />}>
            <ServiceDetailPage service={service} onOpenOrderModal={handleOpenOrderModal} />
          </Suspense>
        );
      }

      case 'blog':
        return (
          <Suspense fallback={<PageFallback />}>
            <BlogListPage />
          </Suspense>
        );

      case 'blog-detail': {
        const post = getBlogBySlug(route.slug);
        if (!post) return <Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense>;
        return (
          <Suspense fallback={<PageFallback />}>
            <BlogDetailPage post={post} onOpenOrderModal={handleOpenOrderModal} />
          </Suspense>
        );
      }

      case 'faq':
        return (
          <Suspense fallback={<PageFallback />}>
            <FaqPage />
          </Suspense>
        );

      case 'about':
        return (
          <Suspense fallback={<PageFallback />}>
            <AboutPage />
          </Suspense>
        );

      case 'contact':
        return (
          <Suspense fallback={<PageFallback />}>
            <ContactPage />
          </Suspense>
        );

      case 'checkout':
        return (
          <Suspense fallback={<PageFallback />}>
            <CheckoutPage initialServiceId={route.serviceId} />
          </Suspense>
        );

      case 'payment-methods':
        return (
          <Suspense fallback={<PageFallback />}>
            <PaymentMethodsPage onOpenOrderModal={handleOpenOrderModal} />
          </Suspense>
        );

      case 'legal':
        return (
          <Suspense fallback={<PageFallback />}>
            <LegalPage legalSlug={route.legalSlug} />
          </Suspense>
        );

      case 'sitemap':
        return (
          <Suspense fallback={<PageFallback />}>
            <SitemapPage />
          </Suspense>
        );

      case 'not-found':
      default:
        return (
          <Suspense fallback={<PageFallback />}>
            <NotFoundPage />
          </Suspense>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#24292F] font-sans antialiased selection:bg-[#2DA44E] selection:text-white">
      {/* Global Header */}
      <Header
        currentPath={pathname}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Quick Order / Checkout Modal (loaded only when triggered) */}
      {isOrderModalOpen && (
        <Suspense fallback={null}>
          <QuickOrderModal
            isOpen={isOrderModalOpen}
            onClose={handleCloseOrderModal}
            preselectedServiceId={selectedServiceForOrder}
          />
        </Suspense>
      )}
    </div>
  );
}
