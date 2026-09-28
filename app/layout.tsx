import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'کافه و رستری موکا | Mokha Specialty Coffee',
  description: 'فروشگاه آنلاین دانه‌های قهوه تخصصی، منوی باریستا، درگاه امن پرداخت، پیگیری لحظه‌ای سفارشات و رزرو آنلاین میز با استایل مینیمالیستی سفید و قهوه‌ای',
  openGraph: {
    title: 'کافه و رستری موکا | Mokha Specialty Coffee',
    description: 'فروشگاه آنلاین دانه‌های قهوه تخصصی، منوی باریستا، درگاه امن پرداخت، پیگیری لحظه‌ای سفارشات و رزرو آنلاین میز با استایل مینیمالیستی سفید و قهوه‌ای',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'کافه و رستری موکا | Mokha Specialty Coffee',
    description: 'فروشگاه آنلاین دانه‌های قهوه تخصصی، منوی باریستا، درگاه امن پرداخت، پیگیری لحظه‌ای سفارشات و رزرو آنلاین میز با استایل مینیمالیستی سفید و قهوه‌ای',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-[#FAF9F5] text-stone-900 antialiased selection:bg-[#593E2B] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
