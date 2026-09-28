import { Product, MenuItem, Review, Order, Reservation, AppNotification } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-ethiopia',
    name: 'اتیوپی یرگاچف گوتیتی',
    englishName: 'Ethiopia Yirgacheffe Goteiti',
    origin: 'اتیوپی، منطقه گیدئو',
    altitude: '۲۱۰۰ متر از سطح دریا',
    process: 'تخمیری شسته (Washed)',
    roastLevel: 'لایت',
    flavorNotes: ['شکوفه یاس', 'ترنج تازه', 'عسل وحشی', 'هلو زعفرانی'],
    description: 'دانه‌ای کمیاب و پرآوازه با اسیدیته شفاف و مرکباتی و عطر مسحورکننده گل‌های بهاری. برشته‌شده به شیوه لایت تا خلوص نت‌های خاستگاه حفظ شود.',
    pricePer250g: 485000,
    stock: 18,
    image: '/images/coffee_beans.jpg',
    badge: 'تک‌خاستگاه منتخب',
    category: 'single-origin'
  },
  {
    id: 'prod-colombia',
    name: 'کلمبیا سوپریمو هویلا',
    englishName: 'Colombia Supremo Huila',
    origin: 'کلمبیا، مزارع کوهستانی هویلا',
    altitude: '۱۷۵۰ متر از سطح دریا',
    process: 'شسته کلاسیک (Washed)',
    roastLevel: 'مدیوم',
    flavorNotes: ['کارامل نمکی', 'فندق تست شده', 'شکلات شیری', 'مرکبات نرم'],
    description: 'تعادل بی‌نقص میان بادی کرمی، شیرینی کاراملی و اسیدیته ملایم. انتخابی ایده‌آل برای مصرف روزانه به صورت دمی یا اسپرسو.',
    pricePer250g: 420000,
    stock: 24,
    image: '/images/coffee_beans.jpg',
    badge: 'پرفروش‌ترین',
    category: 'single-origin'
  },
  {
    id: 'prod-brazil',
    name: 'برزیل موجیانا فاین‌کاپ',
    englishName: 'Brazil Mogiana Fine Cup',
    origin: 'برزیل، منطقه سائوپائولو',
    altitude: '۱۲۰۰ متر از سطح دریا',
    process: 'طبیعی خشک (Natural)',
    roastLevel: 'مدیوم',
    flavorNotes: ['شکلات تیره', 'کره بادام زمینی', 'تافی شیرین', 'اسیدیته کم'],
    description: 'بادی سنگین و غنی با اسیدیته بسیار پایین و طعم‌یاد فندقی-شکلاتی عمیق. پایه اصلی یک اسپرسوی غلیظ با کرمای طلایی و پایدار.',
    pricePer250g: 375000,
    stock: 35,
    image: '/images/coffee_beans.jpg',
    badge: 'مناسب اسپرسو',
    category: 'single-origin'
  },
  {
    id: 'prod-guatemala',
    name: 'گواتمالا آنتیگوا لوس ولکانس',
    englishName: 'Guatemala Antigua Los Volcanes',
    origin: 'گواتمالا، خاک آتشفشانی آنتیگوا',
    altitude: '۱۸۰۰ متر از سطح دریا',
    process: 'شسته ویژه',
    roastLevel: 'مدیوم',
    flavorNotes: ['سیب سرخ', 'کاکائوی دارک', 'وانیل ماداگاسکار', 'تمشک'],
    description: 'پرورش‌یافته در دامنه‌های غنی آتشفشانی با بادی ابریشمی و رایحه پیچیده چوبی و میوه‌ای. مناسب علاقه‌مندان به قهوه‌های غنی و باوقار.',
    pricePer250g: 460000,
    stock: 14,
    image: '/images/coffee_beans.jpg',
    badge: 'محصول فصلی',
    category: 'single-origin'
  },
  {
    id: 'prod-dark-blend',
    name: 'بلند اسپرسو دارک رُست موکا',
    englishName: 'Mokha Signature Dark Blend',
    origin: 'ترکیب تخصصی ۷۰٪ برزیل و ۳۰٪ گواتمالا',
    altitude: '۱۴۰۰ - ۱۷۰۰ متر',
    process: 'ترکیبی (Natural & Washed)',
    roastLevel: 'دارک',
    flavorNotes: ['شکلات تلخ ۸۵٪', 'تنباکوی ملایم', 'شکر قهوه‌ای', 'کرمای غلیظ'],
    description: 'طراحی شده برای عاشقان طعم‌های پرکشش و تلخی اصیل قهوه. بدون تلخی زننده و گزنده، همراه با طعم‌پایدار طولانی و ماندگار.',
    pricePer250g: 390000,
    stock: 29,
    image: '/images/coffee_beans.jpg',
    badge: 'امضای موکا',
    category: 'blend'
  },
  {
    id: 'prod-house-blend',
    name: 'بلند خانگی موکا (House Mild)',
    englishName: 'Mokha House Mild Blend',
    origin: 'ترکیب ۵۰٪ کلمبیا و ۵۰٪ اتیوپی',
    altitude: '۱۶۰۰ - ۱۹۰۰ متر',
    process: 'شسته دوبل',
    roastLevel: 'مدیوم',
    flavorNotes: ['شهد افرا', 'بادام هندی', 'پوست پرتقال شکری', 'کاکائو'],
    description: 'یک بلند همه‌پسند و متوازن که چه با شیر و چه به صورت قهوه سیاه دمی، حسی مخملی و آرامش‌بخش برای هر ساعت از شبانه‌روز می‌آفریند.',
    pricePer250g: 410000,
    stock: 20,
    image: '/images/coffee_beans.jpg',
    badge: 'پیشنهاد باریستا',
    category: 'blend'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu-espresso',
    name: 'اسپرسو دوپیو سینگل اوریجین',
    englishName: 'Single Origin Double Espresso',
    category: 'espresso',
    price: 95000,
    description: 'دو شات عصاره‌گیری شده از دانه کلمبیا هویلا با بافت مخملی و کرمای فندقی ضخیم',
    volume: '۶۰ میلی‌لیتر',
    isPopular: true
  },
  {
    id: 'menu-flatwhite',
    name: 'فلت وایت دست‌ساز',
    englishName: 'Craft Flat White',
    category: 'espresso',
    price: 135000,
    description: 'دو شات ریسترتو با شیر ابریشمی مخملی و میکروفوم نازک به سبک ملبورن',
    volume: '۱۸۰ میلی‌لیتر',
    isPopular: true
  },
  {
    id: 'menu-cortado',
    name: 'کورتادو سنتی',
    englishName: 'Cortado Tradicional',
    category: 'espresso',
    price: 120000,
    description: 'نسبت برابر اسپرسو و شیر گرم برای کاهش اسیدیته بدون پنهان کردن طعم قهوه',
    volume: '۱۲۰ میلی‌لیتر'
  },
  {
    id: 'menu-caramel-latte',
    name: 'وانیل کارامل لاته',
    englishName: 'Vanilla Caramel Latte',
    category: 'espresso',
    price: 155000,
    description: 'اسپرسو غنی با سس کارامل دست‌ساز کافه و عصاره خالص وانیل ماداگاسکار',
    volume: '۲۵۰ میلی‌لیتر'
  },
  {
    id: 'menu-v60',
    name: 'دمی تخصصی V60 (اتیوپی)',
    englishName: 'Pour Over V60 Special',
    category: 'filter',
    price: 165000,
    description: 'عصاره‌گیری دستی قطره‌ای ۳ دقیقه‌ای برای استخراج ناب‌ترین نت‌های گلی و ترنجی',
    volume: '۲۲۰ میلی‌لیتر',
    isPopular: true
  },
  {
    id: 'menu-chemex',
    name: 'کمکس سه نفره دمی',
    englishName: 'Chemex Brewer for 2-3',
    category: 'filter',
    price: 240000,
    description: 'فیلتر ضخیم مخصوص برای فنجانی زلال، سبک و فوق‌العاده معطر برای به اشتراک‌گذاری',
    volume: '۵۰۰ میلی‌لیتر'
  },
  {
    id: 'menu-coldbrew',
    name: 'آیس کلد برو ۲۴ ساعته',
    englishName: '24H Slow Cold Brew',
    category: 'cold',
    price: 145000,
    description: 'عصاره‌گیری سرد قطره‌ای با آب یخ در ۲۴ ساعت؛ اسیدیته صفر، طعم شکلاتی شیرین و طبیعی',
    volume: '۲۵۰ میلی‌لیتر',
    isPopular: true
  },
  {
    id: 'menu-pistachio-latte',
    name: 'آیس لاته کرم پسته قزوین',
    englishName: 'Iced Pistachio Cream Latte',
    category: 'cold',
    price: 185000,
    description: 'پایه اسپرسوی سرد و شیر جو دوسر پوشانده شده با کرم فوم پسته دست‌ساز خانگی',
    volume: '۳۰۰ میلی‌لیتر'
  },
  {
    id: 'menu-san-sebastian',
    name: 'چیزکیک سن سباستین باریکتا',
    englishName: 'Burnt San Sebastian Cheesecake',
    category: 'pastry',
    price: 195000,
    description: 'بافت خامه‌ای در مرکز، رویه کاراملیزه شده طلایی با سس میوه‌های جنگلی تازه',
    ingredients: 'پنیر ماسکارپونه، خامه ترش طبیعی، وانیل خالص',
    isPopular: true
  },
  {
    id: 'menu-croissant',
    name: 'کروسان کره فرانسوی تازه',
    englishName: 'Pure Butter French Croissant',
    category: 'pastry',
    price: 125000,
    description: 'پخته شده هر روز صبح در کافه، لایه‌لایه با کره ۸۲٪ بدون چربی گیاهی',
    ingredients: 'آرد ارگانیک، کره حیوانی فرانسوی'
  },
  {
    id: 'menu-carrot-cake',
    name: 'کیک هویج گردو با دارچین سیلان',
    englishName: 'Spiced Carrot Walnut Cake',
    category: 'pastry',
    price: 140000,
    description: 'کیک اسفنجی نمناک با مغز گردوی تویسرکان و فراستینگ سبک پنیر خامه‌ای لیمویی',
    volume: 'یک اسلایس بزرگ'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'سارا امینی',
    rating: 5,
    date: '۲ روز پیش',
    productOrDrink: 'اتیوپی یرگاچف گوتیتی',
    comment: 'عطر و طعم این قهوه فوق‌العاده بود! نت‌های یاس و ترنج دقیقاً در عصاره‌گیری V60 حس میشن. تاریخ برشته‌کاری روی بسته فقط ۳ روز قبل از دریافت بود که نشانه تازگی واقعیه.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    authorName: 'محمدرضا کاظمی',
    rating: 5,
    date: 'هفته گذشته',
    productOrDrink: 'بلند اسپرسو دارک',
    comment: 'برای دستگاه اسپرسوساز خانگی سفارش دادم. کرمای فوق‌العاده ضخیم و بدون تلخی زننده. بسته‌بندی زیپ‌کیپ و سوپاپ‌دار هم کیفیت عالی داره.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    authorName: 'نیلوفر رضایی',
    rating: 5,
    date: '۱۰ روز پیش',
    productOrDrink: 'رزرو میز و فلت وایت',
    comment: 'محیط کافه فوق‌العاده آرامش‌بخش، تمیز و با سلیقه‌ست. رزرو میز کنار پنجره از طریق سایت در چند ثانیه انجام شد و وقتی رسیدیم میز آماده بود.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    authorName: 'پویان درخشانی',
    rating: 4,
    date: 'دو هفته پیش',
    productOrDrink: 'کلمبیا سوپریمو هویلا',
    comment: 'یک قهوه همه‌کاره با طعم کاراملی خیلی دلنشین. سرعت ارسال و نحوه پیگیری سفارش هم بسیار دقیق و شفاف بود. حتما مجددا سفارش میدم.',
    verifiedPurchase: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    trackingCode: 'MKH-74921',
    customerName: 'فرهاد بهرامی',
    phone: '09121112233',
    address: 'تهران، سعادت‌آباد، خیابان سرو غربی، کوچه ارغوان، پلاک ۱۲، زنگ ۴',
    postalCode: '1998765432',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        selectedWeight: 250,
        selectedGrind: 'آسیاب دمی / V60',
        unitPrice: 485000
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedWeight: 500,
        selectedGrind: 'دانه کامل (آسیاب‌نشده)',
        unitPrice: 800000
      }
    ],
    subtotal: 1770000,
    deliveryFee: 0,
    total: 1770000,
    status: 'تحویل به سفیر و ارسال',
    createdAt: '۱۴۰۳/۰۷/۰۶ - ساعت ۱۰:۳۰',
    estimatedDelivery: 'امروز عصر بین ساعت ۱۶ تا ۱۹',
    paymentRefId: 'SHP-99482103'
  },
  {
    id: 'ord-1002',
    trackingCode: 'MKH-88302',
    customerName: 'مریم احمدی',
    phone: '09359876543',
    address: 'تهران، میرداماد، میدان مادر، خیابان وزیری‌پور، پلاک ۲۸',
    postalCode: '1548712390',
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        quantity: 1,
        selectedWeight: 250,
        selectedGrind: 'آسیاب اسپرسو',
        unitPrice: 390000
      }
    ],
    subtotal: 390000,
    deliveryFee: 45000,
    total: 435000,
    status: 'در حال رُست و بسته‌بندی',
    createdAt: '۱۴۰۳/۰۷/۰۶ - ساعت ۱۱:۱۵',
    estimatedDelivery: 'فردا پیش از ظهر',
    paymentRefId: 'SHP-99483250'
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    code: 'RSV-5521',
    customerName: 'الناز صبوری',
    phone: '09124455667',
    guestsCount: 2,
    date: 'امروز',
    time: '۱۸:۳۰',
    tableLocation: 'کنار پنجره',
    notes: 'میز آرام برای جلسه کاری کوتاه',
    status: 'تایید شده',
    createdAt: 'امروز صبح'
  },
  {
    id: 'res-2',
    code: 'RSV-6704',
    customerName: 'امیرحسین پارسا',
    phone: '09198765432',
    guestsCount: 4,
    date: 'فردا',
    time: '۲۰:۰۰',
    tableLocation: 'تراس و فضای باز',
    notes: 'دورهمی دوستانه',
    status: 'در انتظار',
    createdAt: '۲ ساعت پیش'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'سفارش در راه است 🚴‍♂️',
    message: 'سفارش شماره MKH-74921 تحویل سفیر موکا شد و به سمت آدرس شما حرکت کرد.',
    timestamp: '۱۰ دقیقه پیش',
    type: 'order',
    read: false,
    relatedId: 'MKH-74921'
  },
  {
    id: 'notif-2',
    title: 'رزرو میز تایید شد ✨',
    message: 'میز دونفره شما کنار پنجره برای ساعت ۱۸:۳۰ با موفقیت قطعی گردید.',
    timestamp: '۴۵ دقیقه پیش',
    type: 'reservation',
    read: true,
    relatedId: 'RSV-5521'
  },
  {
    id: 'notif-3',
    title: 'برشته‌کاری بچ جدید دانه اتیوپی',
    message: 'بچ تازه از دانه اتیوپی یرگاچف امروز در روستری آماده و بارگذاری شد.',
    timestamp: 'امروز صبح',
    type: 'info',
    read: true
  }
];
