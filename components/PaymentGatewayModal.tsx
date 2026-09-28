'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  Timer, 
  Building2, 
  Send 
} from 'lucide-react';
import { Order } from '@/lib/types';

export function PaymentGatewayModal({
  onSelectOrderForTracking
}: {
  onSelectOrderForTracking: (trackingCode: string) => void;
}) {
  const { 
    cart, 
    isPaymentOpen, 
    setIsPaymentOpen, 
    createOrder 
  } = useCoffee();

  // Wizard step: 'shipping' | 'gateway' | 'success'
  const [step, setStep] = useState<'shipping' | 'gateway' | 'success'>('shipping');

  // Shipping Form State
  const [customerName, setCustomerName] = useState('سهراب امینی');
  const [phone, setPhone] = useState('09123456789');
  const [address, setAddress] = useState('تهران، خیابان ولیعصر، بالاتر از ظفر، کوچه بهار، پلاک ۱۵، واحد ۴');
  const [postalCode, setPostalCode] = useState('1968745210');

  // Gateway State
  const [cardNumber, setCardNumber] = useState('6037-9975-4421-8850');
  const [cvv2, setCvv2] = useState('482');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('8471');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Created Order Result
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Subtotal & Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 700000 ? 0 : 45000;
  const total = subtotal + deliveryFee;

  // Countdown timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  if (!isPaymentOpen) return null;

  const handleRequestOtp = () => {
    setOtpTimer(120);
    setOtpSent(true);
    // Simulate auto-filling realistic OTP for smooth UX after 1.5s
    setTimeout(() => {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
    }, 1500);
  };

  const handleProceedToGateway = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !postalCode) {
      alert('لطفاً کلیه فیلدهای فرم ارسال را تکمیل فرمایید.');
      return;
    }
    setStep('gateway');
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (cardNumber.replace(/\D/g, '').length < 16) {
      setPaymentError('شماره کارت ۱۶ رقمی معتبر نیست.');
      return;
    }
    if (!cvv2 || cvv2.length < 3) {
      setPaymentError('کد CVV2 صحیح نیست.');
      return;
    }
    if (!otp || otp.length < 5) {
      setPaymentError('لطفاً رمز دوم یکبار مصرف (رمز پویا) را دریافت و وارد نمایید.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = createOrder({
        customerName,
        phone,
        address,
        postalCode
      });
      setCompletedOrder(newOrder);
      setStep('success');
    }, 1800);
  };

  const handleClose = () => {
    setIsPaymentOpen(false);
    setStep('shipping');
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5] rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2C1810] text-amber-200 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#2C1810] text-sm sm:text-base">
                {step === 'shipping' && 'تکمیل اطلاعات آدرس و گیرنده'}
                {step === 'gateway' && 'درگاه پرداخت امن الکترونیک (شاپرک)'}
                {step === 'success' && 'رسید پرداخت و فاکتور نهایی'}
              </h3>
              <p className="text-[11px] text-stone-500">
                مبلغ قابل پرداخت: <span className="font-mono font-bold text-[#593E2B]">{total.toLocaleString('fa-IR')} تومان</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body based on step */}
        <div className="p-5 sm:p-6 flex-1">
          
          {/* STEP 1: SHIPPING FORM */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToGateway} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-amber-900 text-[11px] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>کلیه بسته‌ها با عایق دوجداره جهت جلوگیری از نفوذ هوا و رطوبت ارسال می‌شوند.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">نام و نام خانوادگی تحویل‌گیرنده:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 focus:bg-white focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">شماره تلفن همراه (جهت پیامک رهگیری):</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 font-mono focus:bg-white focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">آدرس دقیق پستی جهت تحویل سفارش:</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 focus:bg-white focus:outline-hidden focus:border-[#593E2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">کد پستی ۱۰ رقمی:</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 font-mono focus:bg-white focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-center">
                  <div className="text-stone-500">هزینه ارسال:</div>
                  <div className="font-bold font-mono text-stone-900 mt-0.5">
                    {deliveryFee === 0 ? 'رایگان (طرح ویژه خرید بالای ۷۰۰ ت)' : `${deliveryFee.toLocaleString('fa-IR')} تومان`}
                  </div>
                </div>
              </div>

              {/* Order items preview */}
              <div className="pt-2 border-t border-stone-100">
                <div className="font-bold text-stone-700 mb-2">خلاصه اقلام انتخابی:</div>
                <div className="max-h-32 overflow-y-auto space-y-1.5 p-2 bg-stone-50 rounded-xl border border-stone-100">
                  {cart.map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px] text-stone-600">
                      <span>{c.product.name} ({c.selectedWeight} گرم · {c.quantity} عدد)</span>
                      <span className="font-mono font-bold">{(c.unitPrice * c.quantity).toLocaleString('fa-IR')} ت</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2C1810] hover:bg-[#3D2317] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <span>ورود به درگاه پرداخت شاپرک</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: REALISTIC SECURE BANK GATEWAY */}
          {step === 'gateway' && (
            <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
              
              {/* Bank Gateway Bar */}
              <div className="bg-[#FAF9F5] border border-[#593E2B]/15 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-[#593E2B]" />
                  <div>
                    <div className="font-bold text-stone-800 text-xs">پذیرنده: فروشگاه کافه موکا</div>
                    <div className="text-[10px] text-stone-400 font-mono">ترمینال: ۹۴۸۲۱۰۳۴ · کد رهگیری شاپرک: ۷۲۹۴۰۱</div>
                  </div>
                </div>

                <div className="text-left font-mono">
                  <div className="font-black text-sm text-[#2C1810]">{total.toLocaleString('fa-IR')} تومان</div>
                  <div className="text-[10px] text-stone-400">{(total * 10).toLocaleString('fa-IR')} ریال</div>
                </div>
              </div>

              {paymentError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Card Number */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">شماره کارت ۱۶ رقمی:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    required
                    className="w-full border border-stone-200 rounded-xl p-2.5 pl-10 bg-white font-mono text-center tracking-widest text-sm text-stone-900 focus:outline-hidden focus:border-[#593E2B]"
                  />
                  <CreditCard className="w-5 h-5 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* CVV2 and Expiry */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">کد شناسایی دوم (CVV2):</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value)}
                    placeholder="۳ یا ۴ رقم"
                    required
                    className="w-full border border-stone-200 rounded-xl p-2.5 bg-white font-mono text-center tracking-wider text-stone-900 focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">تاریخ انقضای کارت (ماه / سال):</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={2}
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value)}
                      placeholder="ماه"
                      className="w-1/2 border border-stone-200 rounded-xl p-2.5 bg-white font-mono text-center text-stone-900 focus:outline-hidden focus:border-[#593E2B]"
                    />
                    <span className="self-center text-stone-400 font-bold">/</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value)}
                      placeholder="سال"
                      className="w-1/2 border border-stone-200 rounded-xl p-2.5 bg-white font-mono text-center text-stone-900 focus:outline-hidden focus:border-[#593E2B]"
                    />
                  </div>
                </div>
              </div>

              {/* OTP (Dynamic Password) */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">رمز پویا (یکبار مصرف پیامکی):</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="کد ۶ رقمی دریافتی"
                    required
                    className="flex-1 border border-stone-200 rounded-xl p-2.5 bg-white font-mono text-center tracking-widest text-stone-900 focus:outline-hidden focus:border-[#593E2B]"
                  />
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={otpTimer > 0}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      otpTimer > 0
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-[#593E2B] text-white hover:bg-[#6F4E37]'
                    }`}
                  >
                    {otpTimer > 0 ? (
                      <>
                        <Timer className="w-3.5 h-3.5 animate-spin" />
                        <span className="font-mono">{otpTimer} ثانیه</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>درخواست رمز پویا</span>
                      </>
                    )}
                  </button>
                </div>
                {otpSent && (
                  <p className="text-[10px] text-emerald-600 mt-1">
                    رمز پویا به شماره همراه شما ارسال و به صورت خودکار درج گردید.
                  </p>
                )}
              </div>

              {/* Captcha */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1">
                  <label className="font-bold text-stone-700 block mb-1">کد امنیتی داخل تصویر:</label>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                    className="w-full border border-stone-200 rounded-xl p-2 bg-white font-mono text-center text-stone-900 focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>
                <div className="mt-4 px-4 py-2 bg-stone-200 rounded-xl font-mono font-bold tracking-widest text-stone-700 select-none text-base border border-stone-300">
                  8471
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-3 border border-stone-200 text-stone-600 rounded-xl font-semibold hover:bg-stone-50 transition-colors"
                >
                  بازگشت
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>در حال تایید تراکنش بانکی...</span>
                    </div>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>پرداخت نهایی {total.toLocaleString('fa-IR')} تومان</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[10px] text-stone-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>اتصال امن به درگاه شاپرک با گواهی معتبر SSL SHA-256</span>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS RECEIPT */}
          {step === 'success' && completedOrder && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#2C1810]">تراکنش با موفقیت انجام شد!</h3>
                <p className="text-xs text-stone-500 mt-1">
                  سفارش شما با موفقیت ثبت شد و پیامک تایید با کد رهگیری ارسال گردید.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="bg-[#FAF9F5] border border-[#593E2B]/15 rounded-2xl p-5 text-right space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2.5 border-b border-stone-200">
                  <span className="text-stone-500">کد رهگیری مرسوله:</span>
                  <span className="font-mono font-black text-sm text-[#593E2B] tracking-wider">
                    {completedOrder.trackingCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">شماره مرجع پرداخت شاپرک:</span>
                  <span className="font-mono text-stone-800">{completedOrder.paymentRefId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">تحویل‌گیرنده:</span>
                  <span className="text-stone-800 font-semibold">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">زمان تخمینی تحویل:</span>
                  <span className="text-stone-800 font-semibold">{completedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-[#2C1810]">
                  <span>مبلغ پرداخت شده:</span>
                  <span className="font-mono text-[#593E2B]">
                    {completedOrder.total.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    onSelectOrderForTracking(completedOrder.trackingCode);
                  }}
                  className="flex-1 py-3 bg-[#2C1810] hover:bg-[#3D2317] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  رهگیری زنده این سفارش
                </button>
                <button
                  onClick={handleClose}
                  className="px-5 py-3 border border-stone-200 text-stone-600 rounded-xl text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  بستن
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
