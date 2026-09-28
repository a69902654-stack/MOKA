'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { Bell, CheckCircle2, Clock, Package, X, Sparkles } from 'lucide-react';

export function NotificationToast() {
  const { activeToast, dismissToast } = useCoffee();

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto bg-white border border-[#593E2B]/20 text-[#2C1810] rounded-2xl p-4 shadow-xl shadow-[#2C1810]/8 flex items-start gap-3 relative overflow-hidden"
            dir="rtl"
          >
            <div className="w-10 h-10 rounded-xl bg-[#593E2B]/10 flex items-center justify-center shrink-0 text-[#593E2B]">
              {activeToast.type === 'order' && <Package className="w-5 h-5 text-[#593E2B]" />}
              {activeToast.type === 'reservation' && <Clock className="w-5 h-5 text-[#593E2B]" />}
              {activeToast.type === 'inventory' && <Sparkles className="w-5 h-5 text-[#593E2B]" />}
              {activeToast.type === 'info' && <CheckCircle2 className="w-5 h-5 text-[#593E2B]" />}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#2C1810] truncate">{activeToast.title}</h4>
                <button
                  onClick={dismissToast}
                  className="text-stone-400 hover:text-stone-700 p-1 -mr-1 transition-colors"
                  aria-label="بستن اعلان"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {activeToast.message}
              </p>
              <div className="text-[11px] text-stone-400 mt-2 flex items-center gap-1 font-mono">
                <span>{activeToast.timestamp}</span>
              </div>
            </div>

            {/* Subtle bottom progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5.5, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#593E2B]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NotificationDrawer({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { notifications, markAllNotificationsAsRead, markNotificationAsRead } = useCoffee();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" dir="rtl">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/30 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative z-10 w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col border-r border-[#593E2B]/15"
      >
        <div className="p-5 border-b border-[#593E2B]/10 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#593E2B]/10 flex items-center justify-center text-[#593E2B]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#2C1810] text-base">مرکز اعلان‌های موکا</h3>
              <p className="text-xs text-stone-500">وضعیت لحظه‌ای سفارش‌ها و رویدادها</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-2.5 bg-stone-50 border-b border-stone-200/60 flex items-center justify-between text-xs">
          <span className="text-stone-500">{notifications.length} اعلان ثبت شده</span>
          <button
            onClick={markAllNotificationsAsRead}
            className="text-[#593E2B] hover:underline font-medium"
          >
            خواندن همه
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-sm">
              هیچ اعلانی در حال حاضر وجود ندارد.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-white/70 border-stone-200/70 text-stone-600'
                    : 'bg-white border-[#593E2B]/30 shadow-sm text-[#2C1810]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#593E2B] shrink-0" />
                    )}
                    <h5 className="font-semibold text-sm">{item.title}</h5>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {item.message}
                </p>
                {item.relatedId && (
                  <div className="mt-2 text-[11px] font-mono text-[#593E2B] bg-[#593E2B]/5 px-2 py-0.5 rounded inline-block">
                    کد مرجع: {item.relatedId}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
