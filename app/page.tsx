'use client';

import React, { useState, useEffect } from 'react';
import { CoffeeProvider, useCoffee } from '@/lib/context';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CoffeeShop } from '@/components/CoffeeShop';
import { CafeMenu } from '@/components/CafeMenu';
import { TableReservation } from '@/components/TableReservation';
import { OrderTracking } from '@/components/OrderTracking';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { PaymentGatewayModal } from '@/components/PaymentGatewayModal';
import { AdminPanel } from '@/components/AdminPanel';
import { NotificationToast } from '@/components/NotificationToast';
import { ShoppingBag, Calendar, SlidersHorizontal, ArrowUp } from 'lucide-react';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { cart, setIsCartOpen, setIsAdminOpen } = useCoffee();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      const yOffset = -90; // offset for sticky curved header
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['shop', 'menu', 'reservation', 'tracking', 'reviews'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectOrderForTracking = (trackingCode: string) => {
    scrollToSection('tracking');
    // Scroll and set search input inside OrderTracking if found
    setTimeout(() => {
      const trackingInput = document.querySelector('input[placeholder*="کد پیگیری"]') as HTMLInputElement | null;
      if (trackingInput) {
        trackingInput.value = trackingCode;
        // Dispatch synthetic submit
        const submitBtn = trackingInput.form?.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        if (submitBtn) submitBtn.click();
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-[#593E2B] selection:text-white">
      {/* Curved Header */}
      <Header
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreShop={() => scrollToSection('shop')}
          onExploreReservation={() => scrollToSection('reservation')}
        />

        <CoffeeShop />

        <CafeMenu />

        <TableReservation />

        <OrderTracking />

        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Global Interactive Overlays */}
      <CartDrawer />

      <PaymentGatewayModal onSelectOrderForTracking={handleSelectOrderForTracking} />

      <AdminPanel />

      <NotificationToast />

      {/* Mobile Sticky Quick Action Bar (Bottom Floating Pill) */}
      <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden flex items-center justify-between gap-2 p-2 bg-[#2C1810]/95 backdrop-blur-md text-white rounded-2xl shadow-xl border border-white/10" dir="rtl">
        <button
          onClick={() => scrollToSection('reservation')}
          className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-200" />
          <span>رزرو میز</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2 px-3 rounded-xl bg-[#C99264] text-[#2C1810] text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>سبد خرید</span>
          {totalCartCount > 0 && (
            <span className="font-mono bg-[#2C1810] text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {totalCartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs transition-colors"
          title="پنل مدیریت"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll to Top Button (Desktop) */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hidden sm:flex fixed bottom-6 right-6 z-30 w-11 h-11 rounded-2xl bg-white border border-[#593E2B]/20 text-[#2C1810] items-center justify-center shadow-lg hover:bg-stone-50 transition-all hover:-translate-y-1"
          aria-label="بازگشت به ابتدای صفحه"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <CoffeeProvider>
      <MainAppContent />
    </CoffeeProvider>
  );
}
