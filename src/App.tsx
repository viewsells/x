/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAppRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickOrderModal } from './components/QuickOrderModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AccountsCategoryPage } from './pages/AccountsCategoryPage';
import { PromotionCategoryPage } from './pages/PromotionCategoryPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentMethodsPage } from './pages/PaymentMethodsPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Data Lookups
import { getServiceBySlug } from './data/allServices';
import { getBlogBySlug } from './data/blogData';

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
        return <AccountsCategoryPage onOpenOrderModal={handleOpenOrderModal} />;

      case 'account-detail': {
        const service = getServiceBySlug(route.slug);
        if (!service) return <NotFoundPage />;
        return <ServiceDetailPage service={service} onOpenOrderModal={handleOpenOrderModal} />;
      }

      case 'promotion':
        return <PromotionCategoryPage onOpenOrderModal={handleOpenOrderModal} />;

      case 'promotion-detail': {
        const service = getServiceBySlug(route.slug);
        if (!service) return <NotFoundPage />;
        return <ServiceDetailPage service={service} onOpenOrderModal={handleOpenOrderModal} />;
      }

      case 'blog':
        return <BlogListPage />;

      case 'blog-detail': {
        const post = getBlogBySlug(route.slug);
        if (!post) return <NotFoundPage />;
        return <BlogDetailPage post={post} onOpenOrderModal={handleOpenOrderModal} />;
      }

      case 'faq':
        return <FaqPage />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'checkout':
        return <CheckoutPage initialServiceId={route.serviceId} />;

      case 'payment-methods':
        return <PaymentMethodsPage onOpenOrderModal={handleOpenOrderModal} />;

      case 'legal':
        return <LegalPage legalSlug={route.legalSlug} />;

      case 'sitemap':
        return <SitemapPage />;

      case 'not-found':
      default:
        return <NotFoundPage />;
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

      {/* Global Quick Order / Checkout Modal */}
      <QuickOrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        preselectedServiceId={selectedServiceForOrder}
      />
    </div>
  );
}
