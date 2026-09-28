'use client';

import React, { useState } from 'react';
import { useCoffee } from '@/lib/context';
import { 
  ShoppingBag, 
  Bell, 
  SlidersHorizontal, 
  Menu, 
  X, 
  Coffee, 
  Compass, 
  CalendarClock, 
  SearchCheck, 
  MessageSquare
} from 'lucide-react';
import { NotificationDrawer } from './NotificationToast';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export function Header({ onNavigate, activeSection }: HeaderProps) {
  const { cart, notifications, setIsCartOpen, setIsAdminOpen } = useCoffee();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'shop', label: 'فروشگاه قهوه', icon: Coffee },
    { id: 'menu', label: 'منوی کافه', icon: Compass },
    { id: 'reservation', label: 'رزرو میز', icon: CalendarClock },
    { id: 'tracking', label: 'پیگیری سفارش', icon: SearchCheck },
    { id: 'reviews', label: 'نظرات مشتریان', icon: MessageSquare },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-2 pb-1" dir="rtl">
        {/* Curved Header Container with Elegant Border */}
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border-b-2 border-x border-t border-[#593E2B]/20 rounded-b-[28px] md:rounded-b-[36px] shadow-sm shadow-[#2C1810]/5 px-4 md:px-7 py-3 transition-all duration-300">
          <div className="flex items-center justify-between gap-4">
            
            {/* Zone 1: Brand Wordmark (Right in RTL) */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleLinkClick('hero')}
                className="group text-right flex items-center gap-2.5 transition-transform active:scale-95 text-stone-900"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#2C1810] text-amber-50 flex items-center justify-center shadow-xs group-hover:bg-[#593E2B] transition-colors">
                  <span className="font-serif font-black text-xl tracking-tighter">M</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg md:text-xl font-black text-[#2C1810] tracking-tight">کافه و رُستری موکا</span>
                  </div>
                  <span className="text-[10px] md:text-[11px] font-sans text-stone-500 tracking-wider">MOKHA ARTISANAL COFFEE</span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-2 text-xs md:text-sm font-medium rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'text-[#2C1810] bg-[#593E2B]/10 font-bold'
                        : 'text-stone-600 hover:text-[#2C1810] hover:bg-stone-100/70'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Interactive Actions (Left in RTL) */}
            <div className="flex items-center gap-2 md:gap-2.5">
              {/* Admin Panel Button */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#593E2B] bg-[#593E2B]/8 hover:bg-[#593E2B]/15 border border-[#593E2B]/20 px-3 py-2 rounded-xl transition-all active:scale-95"
                title="پنل مدیریت فروشگاه و رزروها"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#593E2B]" />
                <span>پنل مدیریت</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2.5 rounded-xl border border-stone-200 hover:border-[#593E2B]/40 hover:bg-stone-50 text-stone-700 transition-colors"
                aria-label="اعلان‌ها"
                title="اعلان‌ها"
              >
                <Bell className="w-4 h-4 text-[#2C1810]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A06A42] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 bg-[#2C1810] hover:bg-[#3D2317] text-white px-3.5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all shadow-xs active:scale-95"
                aria-label="سبد خرید"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">سبد خرید</span>
                {totalCartCount > 0 && (
                  <span className="w-5 h-5 bg-[#C99264] text-[#2C1810] text-[11px] font-bold rounded-full flex items-center justify-center font-mono">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="منو"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden pt-4 pb-2 mt-3 border-t border-stone-100 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-right px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2.5 ${
                      isActive 
                        ? 'bg-[#593E2B]/10 text-[#2C1810] font-bold' 
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-[#593E2B]" />
                    <span>{link.label}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-stone-100 mt-1 flex items-center justify-between px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-[#593E2B] bg-[#593E2B]/10 px-3 py-2 rounded-lg w-full justify-center"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>ورود به پنل مدیریت فروشگاه</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* Notification Drawer Modal */}
      <NotificationDrawer 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />
    </>
  );
}
