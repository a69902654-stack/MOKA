'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Coffee 
} from 'lucide-react';

export function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    setIsPaymentOpen 
  } = useCoffee();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 700000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const deliveryFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 45000);
  const grandTotal = subtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative z-10 w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col border-r border-[#593E2B]/15"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#593E2B]/10 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#2C1810] text-amber-100 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#2C1810] text-base">سبد خرید شما</h3>
              <p className="text-xs text-stone-500 font-mono">{cart.length} محصول انتخاب شده</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-700 px-2 py-1 rounded hover:bg-rose-50 transition-colors"
              >
                خالی کردن
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free shipping progress bar */}
        {cart.length > 0 && (
          <div className="px-5 py-3 bg-[#FAF6F0] border-b border-[#593E2B]/10">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <Truck className="w-3.5 h-3.5 text-[#593E2B]" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold">تبریک! ارسال این سفارش رایگان شد.</span>
                ) : (
                  <span>
                    تنها <b className="font-mono text-[#593E2B]">{remainingForFree.toLocaleString('fa-IR')}</b> تومان تا ارسال رایگان
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-stone-400">
                {Math.round(progressPercent)}٪
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#593E2B] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-300 flex items-center justify-center mb-3">
                <Coffee className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-sm text-stone-700">سبد خرید شما خالی است</h4>
              <p className="text-xs text-stone-400 mt-1 max-w-[220px]">
                دانه‌های تازه برشته‌شده ما را بررسی کرده و به سبد اضافه کنید.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-5 py-2 bg-[#2C1810] text-white rounded-xl text-xs font-semibold hover:bg-[#3D2317]"
              >
                مشاهده محصولات فروشگاه
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-[#593E2B]/10 shadow-xs flex gap-3 relative"
              >
                {/* Thumb */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative border border-stone-200">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h5 className="font-bold text-xs text-[#2C1810] truncate max-w-[170px]">
                      {item.product.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-stone-300 hover:text-rose-500 p-1 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-stone-500 mt-0.5 space-x-1 space-x-reverse">
                    <span>{item.selectedWeight} گرم</span>
                    <span>·</span>
                    <span>{item.selectedGrind}</span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="font-mono font-bold text-xs text-[#2C1810]">
                      {(item.unitPrice * item.quantity).toLocaleString('fa-IR')} <span className="text-[10px] font-normal text-stone-500">تومان</span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200">
                      <button
                        onClick={() => updateCartQuantity(idx, item.quantity - 1)}
                        className="text-stone-600 hover:text-stone-900 p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-stone-800 min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(idx, item.quantity + 1)}
                        className="text-stone-600 hover:text-stone-900 p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#593E2B]/10 bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-500">
                <span>مجموع اقلام:</span>
                <span className="font-mono font-semibold text-stone-800">
                  {subtotal.toLocaleString('fa-IR')} تومان
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-500">
                <span>هزینه بسته‌بندی و ارسال:</span>
                <span className="font-mono font-semibold text-stone-800">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700">رایگان</span>
                  ) : (
                    `${deliveryFee.toLocaleString('fa-IR')} تومان`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-sm font-bold text-[#2C1810]">
                <span>مبلغ قابل پرداخت:</span>
                <span className="font-mono text-base text-[#593E2B]">
                  {grandTotal.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#2C1810] hover:bg-[#3D2317] text-white rounded-xl text-xs font-bold shadow-md shadow-[#2C1810]/15 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>تسویه حساب و پرداخت آنلاین</span>
              <ArrowLeft className="w-4 h-4 text-amber-200" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>پرداخت تحت شبکه امن شاپرک با پروتکل رمزنگاری SSL</span>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
