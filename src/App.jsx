import { useState } from 'react';
import './App.css';
import {
  Coffee, MapPin, Clock, Phone, Star, Globe,
  Menu as MenuIcon, X, Plus, CalendarDays, Leaf,
  Camera, MessageCircle, Share2, ExternalLink,
  Flame, ShoppingBag,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ═══════════════════ TRANSLATIONS ═══════════════════ */
const T = {
  en: {
    logo: 'Oasis Brew', logoSub: 'ARTISAN ROASTERS',
    nav: ['Menu', 'Our Story', 'Location & Hours'],
    langLabel: 'العربية', langCode: 'AR', orderBtn: 'Order Online',

    heroBadge: 'Specialty Coffee & Eastern Botanicals',
    heroTitle: 'Where Tradition Meets the Perfect Brew',
    heroDesc: 'Rooted in Arabian coffee heritage, elevated with contemporary artisanal brewing methods. Savor authentic cardamom whispers, rich Yemen single-origin beans, and freshly baked date infused pastries in our serene desert-toned sanctuary.',
    cta1: 'Explore Menu', cta2: 'Reserve a Table',
    rating: 'Rated 4.9/5 by 1,200+ Coffee Aficionados',
    pills: ['Single Origin Beans', 'Cardamom & Saffron Infusions', 'Artisan Bakery'],
    openBadge: 'Open Now Until 11 PM',
    floatTitle: 'FRESH ROAST', floatSub: 'Yemeni Mokha Matari',

    menuBadge: 'CURATED FLAVORS', menuTitle: 'Our Signature Bestsellers',
    menuSub: 'Handcrafted cups harmonizing Middle Eastern warmth with modern espresso craft.',
    filterAll: 'All', filterCoffee: 'Craft Coffee', filterSweets: 'Pastries & Sweets',
    items: [
      { cat: 'coffee', badge: 'Signature', title: 'Royal Cardamom Spiced...', desc: 'Double shot of rich espresso infused with freshly crushed green Guatemalan cardamom, velvety steamed oat milk, and', price: '25 ﷼' },
      { cat: 'coffee', badge: 'Single Origin', title: 'Saffron Cloud Chemex...', desc: 'Single-origin Yemeni Mokha Matari slow-brewed through filtered Chemex, gently kissed with rare Persian saffron threads...', price: '32 ﷼' },
      { cat: 'pastry', badge: "Chef's Special", title: 'Orange Blossom & ...', desc: 'Delicate almond sponge cake steeped in fresh Lebanese orange blossom water syrup, layered with ground roasted...', price: '27 ﷼' },
      { cat: 'coffee', badge: 'Popular', title: 'Medjool Date Caramel...', desc: '18-hour cold brew steeped with roasted chicory, crowned with luscious sweet date caramel cold foam and smoked salt...', price: '26 ﷼' },
    ],
    addBtn: 'Add to Order',

    aboutBadge: 'CRAFT & HERITAGE',
    aboutTitle: 'Honoring Centuries of Coffee Hospitality',
    aboutP1: 'In ancient Arabian traditions, preparing Qahwa was a sacred ritual of generosity, poetry, and kinship. At Oasis Brew, we weave this soulful hospitality into the highest tier of third-wave coffee science.',
    aboutP2: 'Every morning, our beans are micro-roasted in-house from ethical cooperatives in Yemen, Ethiopia, and Colombia. Paired with hand-ground spices and organic dairy, each sip invites you into a tranquil haven away from the bustling city.',
    quote: '"Coffee is the quiet sanctuary where stories begin."',
    quoteAuthor: 'OASIS HERITAGE',
    stats: [
      { val: '100%', label: 'Fair Trade Ethical Beans' },
      { val: '16+', label: 'Artisanal Brew Methods' },
      { val: '350+', label: 'Daily Fresh Cups Served' },
    ],

    locBadge: 'PLAN YOUR VISIT', locTitle: 'Location & Opening Hours',
    locSub: 'Nestled in the historic district courtyard with shaded outdoor terrace seating and tranquil water fountains.',
    sanctuary: 'Our Sanctuary', sanctuaryAddr: '428 Palm Oasis Boulevard, The Cultural District',
    openMaps: 'Open in Google Maps',
    hours: 'Brewing Hours', hoursMon: 'Mon – Fri: 7:00 AM – 11:00 PM', hoursSat: 'Sat – Sun: 8:00 AM – Midnight',
    contact: 'Get In Touch', phone: '+966 50 123 4567', email: 'salam@oasisbrewcafe.com',
    resTitle: 'Table Reservation',
    resDesc: 'Special seating for coffee tasting ceremonies, quiet remote work, or weekend family gatherings.',
    resBtn: 'Reserve Seats Online',
    mapLabel: 'Oasis Brew', mapSub: 'Oasis District • Terrace Seating',

    footerDesc: 'A contemporary coffee sanctuary celebrating Arabian hospitality, specialty micro-roasts, and refined botanicals.',
    quickNav: 'QUICK NAVIGATION', quickLinks: ['Menu', 'Our Story', 'Location & Hours'],
    exp: 'EXPERIENCE', expLinks: ['Private Tastings', 'Whole Bean Retail', 'Private Catering'],
    langCol: 'LANGUAGE / اللغة', langDesc: 'Toggle between English and Arabic seamlessly.',
    copyright: '© 2025 Oasis Brew Cafe Ltd. All rights reserved. Crafted with passion.',
    privacy: 'Privacy Policy', terms: 'Terms of Service',
  },
  ar: {
    logo: 'مقهى الواحة', logoSub: 'محمصة حرفية',
    nav: ['قائمة المشروبات', 'قصتنا', 'الموقع والساعات'],
    langLabel: 'English', langCode: 'EN', orderBtn: 'اطلب أونلاين',

    heroBadge: 'قهوة مختصة وأعشاب شرقية',
    heroTitle: 'حيث يلتقي التراث بالقهوة المثالية',
    heroDesc: 'متجذرون في تراث القهوة العربية، مع لمسات حرفية معاصرة. استمتع بهمسات الهيل الأصيلة، وحبوب اليمن الفاخرة، والمعجنات الطازجة بالتمر في محمصتنا الهادئة.',
    cta1: 'استكشف القائمة', cta2: 'احجز طاولة',
    rating: 'تقييم 4.9/5 من أكثر من 1,200 عاشق للقهوة',
    pills: ['حبوب أحادية المصدر', 'هيل وزعفران', 'مخبز حرفي'],
    openBadge: 'مفتوح الآن حتى 11 م',
    floatTitle: 'تحميص طازج', floatSub: 'يمني مخا مطري',

    menuBadge: 'نكهات مختارة', menuTitle: 'مشروباتنا الأكثر طلباً',
    menuSub: 'أكواب مصنوعة يدوياً تمزج بين الدفء الشرقي وحرفية الإسبريسو.',
    filterAll: 'الكل', filterCoffee: 'قهوة مختصة', filterSweets: 'حلويات ومعجنات',
    items: [
      { cat: 'coffee', badge: 'مميز', title: 'لاتيه الهيل الملكي...', desc: 'إسبريسو ناعم ممزوج مع الهيل الطازج، مع حليب مبخر ورشة قرفة.', price: '25 ﷼' },
      { cat: 'coffee', badge: 'أصل واحد', title: 'كيمكس سحابة الزعفران...', desc: 'تقطير يدوي مع حبوب إثيوبية يرغاتشيف، مع لمسة من خيوط الزعفران الذهبية.', price: '32 ﷼' },
      { cat: 'pastry', badge: 'خاص الشيف', title: 'كيكة ماء الزهر و...', desc: 'كيكة إسفنجية بماء الزهر مع كريمة الفستق وبتلات الورد.', price: '27 ﷼' },
      { cat: 'coffee', badge: 'الأكثر طلباً', title: 'تمر كراميل ماكياتو...', desc: 'إسبريسو غني مع شراب كراميل التمر المصنوع منزلياً وفن الرغوة.', price: '27 ﷼' },
    ],
    addBtn: 'أضف للطلب',

    aboutBadge: 'حرفة وتراث',
    aboutTitle: 'نحتفي بقرون من كرم الضيافة وأصول القهوة',
    aboutP1: 'في التقاليد العربية القديمة، كان إعداد القهوة طقساً مقدساً من الكرم والشعر والمودة. في مقهى الواحة، ننسج هذه الضيافة العريقة في أعلى مستويات علم القهوة المعاصر.',
    aboutP2: 'كل صباح، يتم تحميص حبوبنا من تعاونيات أخلاقية في اليمن وإثيوبيا وكولومبيا. مع التوابل المطحونة يدوياً، كل رشفة تدعوك إلى واحة هادئة بعيداً عن صخب المدينة.',
    quote: '"القهوة هي الملاذ الهادئ حيث تبدأ القصص."',
    quoteAuthor: 'تراث الواحة',
    stats: [
      { val: '100%', label: 'حبوب بن عادلة ومسؤولة' },
      { val: '+16', label: 'طريقة تحضير حرفية' },
      { val: '+350', label: 'فنجان طازج يومياً' },
    ],

    locBadge: 'خطط لزيارتك', locTitle: 'الموقع وساعات الاستقبال',
    locSub: 'يقع في فناء الحي التاريخي مع جلسات خارجية مظللة ونوافير مائية هادئة.',
    sanctuary: 'واحتنا', sanctuaryAddr: '428 شارع واحة النخيل، الحي الثقافي',
    openMaps: 'افتح في خرائط جوجل',
    hours: 'ساعات التحضير', hoursMon: 'الإثنين – الجمعة: 7:00 ص – 11:00 م', hoursSat: 'السبت – الأحد: 8:00 ص – منتصف الليل',
    contact: 'تواصل معنا', phone: '+966 50 123 4567', email: 'salam@oasisbrewcafe.com',
    resTitle: 'حجز طاولة',
    resDesc: 'جلسات خاصة لتذوق القهوة، العمل الهادئ عن بُعد، أو تجمعات العائلة.',
    resBtn: 'احجز مقاعدك أونلاين',
    mapLabel: 'مقهى الواحة', mapSub: 'حي الواحة • جلسة شرفة',

    footerDesc: 'تجربة قهوة معاصرة تحتفي بالضيافة العربية والتحميص الحرفي والنباتات الراقية.',
    quickNav: 'روابط سريعة', quickLinks: ['قائمة المشروبات', 'قصتنا', 'الموقع والساعات'],
    exp: 'التجربة', expLinks: ['تذوق خاص', 'بيع حبوب بالتجزئة', 'تموين خاص'],
    langCol: 'LANGUAGE / اللغة', langDesc: 'التبديل بين الإنجليزية والعربية بسهولة.',
    copyright: '© 2025 مقهى الواحة. جميع الحقوق محفوظة. صُنع بشغف.',
    privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة',
  },
};

const NAV_IDS = ['menu', 'about', 'location'];

/* ═══════════════════ COMPONENT ═══════════════════ */
export default function App() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const t = T[lang];
  const isRTL = lang === 'ar';
  const toggle = () => { setLang(l => l === 'en' ? 'ar' : 'en'); setMenuOpen(false); setFilter('all'); };

  const filteredItems = filter === 'all'
    ? t.items
    : t.items.filter(item => item.cat === filter);

  return (
    <div className="app" dir={isRTL ? 'rtl' : 'ltr'}
      style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>

      {/* ════════ HEADER ════════ */}
      <header className="header">
        <div className="container">
          <div className="header__logo">
            <div className="header__logo-icon"><Coffee size={20} /></div>
            <div className="header__logo-text">
              <span className="header__logo-name">{t.logo}<span className="dot dot--yellow" style={{marginInlineStart:4}} /></span>
              <span className="header__logo-sub">{t.logoSub}</span>
            </div>
          </div>

          <nav className="header__nav">
            {t.nav.map((n,i) => <a key={i} href={`#${NAV_IDS[i]}`}>{n}</a>)}
          </nav>

          <div className="header__actions">
            <button className="btn-lang" onClick={toggle}>
              <Globe size={16} style={{opacity:.45}} />
              {t.langLabel}
              <span className="btn-lang__code">{t.langCode}</span>
            </button>
            <button className="btn-order">
              <ShoppingBag size={16} />
              {t.orderBtn}
            </button>
          </div>

          <button className="header__mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        <div className={`header__mobile-nav ${menuOpen ? 'is-open' : ''}`}>
          <div className="container">
            {t.nav.map((n,i) => <a key={i} href={`#${NAV_IDS[i]}`} onClick={() => setMenuOpen(false)}>{n}</a>)}
            <div className="header__mobile-actions">
              <button className="btn-lang" onClick={toggle}><Globe size={16} /> {t.langLabel}</button>
              <button className="btn-order"><ShoppingBag size={16} /> {t.orderBtn}</button>
            </div>
          </div>
        </div>
      </header>

      {/* ════════ HERO ════════ */}
      <section className="hero">
        <div className="container">
          <div className="hero__text">
            <div className="hero__badge">
              <span className="pill"><span className="dot dot--red" />{t.heroBadge}</span>
            </div>
            <h1 className="hero__title">{t.heroTitle}</h1>
            <p className="hero__desc">{t.heroDesc}</p>

            <div className="hero__ctas">
              <button className="btn-primary"><Coffee size={18} />{t.cta1}</button>
              <button className="btn-secondary"><CalendarDays size={18} />{t.cta2}</button>
            </div>

            <div className="hero__rating">
              <div className="hero__stars">
                {[...Array(5)].map((_,i) => <Star key={i} size={18} />)}
              </div>
              <span className="hero__rating-text">{t.rating}</span>
            </div>

            <div className="hero__features">
              {t.pills.map((p,i) => (
                <span key={i} className="feature-pill"><Leaf size={14} />{p}</span>
              ))}
            </div>
          </div>

          <div className="hero__image-wrap">
            <div className="hero__image placeholder" />
            <div className="hero__open-badge">
              <span className="dot dot--green" />
              {t.openBadge}
            </div>
            <div className="hero__float-card">
              <div className="hero__float-icon icon-box"><Flame size={24} /></div>
              <div>
                <div className="hero__float-title">{t.floatTitle}</div>
                <div className="hero__float-sub">{t.floatSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ MENU ════════ */}
      <section id="menu" className="menu-section">
        <div className="container">
          <div className="menu__header">
            <div>
              <span className="menu__badge">{t.menuBadge}</span>
              <h2 className="menu__title">{t.menuTitle}</h2>
              <p className="menu__subtitle">{t.menuSub}</p>
            </div>
            <div className="menu__filters">
              <button className={`filter-pill${filter === 'all' ? ' filter-pill--active' : ''}`} onClick={() => setFilter('all')}>{t.filterAll}</button>
              <button className={`filter-pill${filter === 'coffee' ? ' filter-pill--active' : ''}`} onClick={() => setFilter('coffee')}>{t.filterCoffee}</button>
              <button className={`filter-pill${filter === 'pastry' ? ' filter-pill--active' : ''}`} onClick={() => setFilter('pastry')}>{t.filterSweets}</button>
            </div>
          </div>

          <div className="menu__grid">
            {filteredItems.map((item,i) => (
              <div key={`${filter}-${i}`} className="menu-card">
                <div className="menu-card__image placeholder">
                  <span className="menu-card__badge">{item.badge}</span>
                </div>
                <div className="menu-card__body">
                  <h3 className="menu-card__title">{item.title}</h3>
                  <p className="menu-card__desc">{item.desc}</p>
                  <div className="menu-card__footer">
                    <span className="menu-card__price">{item.price}</span>
                    <button className="btn-add"><Plus size={14} />{t.addBtn}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section id="about" className="about">
        <div className="container">
          <div className="about__image-wrap">
            <div className="about__image placeholder" />
            <div className="about__quote-card">
              <div className="about__quote-icon">❝</div>
              <p className="about__quote-text">{t.quote}</p>
              <div className="about__quote-author">
                <span className="dot dot--red" />
                {t.quoteAuthor}
              </div>
            </div>
          </div>

          <div className="about__text">
            <div className="about__badge-row">
              <span className="about__badge-bar" />
              <span className="about__badge-text">{t.aboutBadge}</span>
            </div>
            <h2 className="about__title">{t.aboutTitle}</h2>
            <p className="about__para">{t.aboutP1}</p>
            <p className="about__para">{t.aboutP2}</p>

            <div className="about__stats">
              {t.stats.map((s,i) => (
                <div key={i}>
                  <div className="stat__value">{s.val}</div>
                  <div className="stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LOCATION ════════ */}
      <section id="location" className="location">
        <div className="container">
          <div className="location__header">
            <span className="location__badge">{t.locBadge}</span>
            <h2 className="location__title">{t.locTitle}</h2>
            <p className="location__subtitle">{t.locSub}</p>
          </div>

          <div className="location__grid">
            <div className="location__cards">
              <div className="info-card">
                <div className="info-card__icon icon-box"><MapPin size={20} /></div>
                <div>
                  <h3 className="info-card__title">{t.sanctuary}</h3>
                  <p className="info-card__text">{t.sanctuaryAddr}</p>
                  <a href="#" className="info-card__link">{t.openMaps}<ExternalLink size={14} /></a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card__icon icon-box"><Clock size={20} /></div>
                <div>
                  <h3 className="info-card__title">{t.hours}</h3>
                  <p className="info-card__text">{t.hoursMon}</p>
                  <p className="info-card__text">{t.hoursSat}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card__icon icon-box"><Phone size={20} /></div>
                <div>
                  <h3 className="info-card__title">{t.contact}</h3>
                  <p className="info-card__text">{t.phone}</p>
                  <p className="info-card__text">{t.email}</p>
                </div>
              </div>
            </div>

            <div className="location__map-area">
              <div style={{ position: 'relative', width: '100%', height: '340px' }}>
                <MapContainer center={[24.7136, 46.6753]} zoom={13} className="location__map" style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-lg)', zIndex: 1 }}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">Carto</a>'
                  />
                  <Marker 
                    position={[24.7136, 46.6753]} 
                    icon={new L.DivIcon({
                      className: 'custom-map-marker',
                      html: `
                        <div class="map__center-label" style="position: relative; inset: auto; transform: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; white-space: nowrap;">
                          <div style="width: 28px; height: 28px; background: rgba(223,122,96,0.2); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-inline-end: 8px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF7A60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path><path d="M6 2v2"></path></svg>
                          </div>
                          ${t.mapLabel}
                        </div>
                      `,
                      iconSize: [140, 44],
                      iconAnchor: [70, 44],
                    })} 
                  />
                </MapContainer>
                <div className="map__bottom-label" style={{ zIndex: 10 }}>{t.mapSub}</div>
              </div>
              <div className="reservation-card">
                <div className="reservation-card__text">
                  <h3 className="reservation-card__title">{t.resTitle}</h3>
                  <p className="reservation-card__desc">{t.resDesc}</p>
                </div>
                <button className="btn-reserve">{t.resBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="footer">
        <div className="footer__main">
          <div className="container">
            <div className="footer__grid">
              <div>
                <div className="footer__brand-logo">
                  <div className="footer__brand-icon"><Coffee size={20} /></div>
                  <span className="footer__brand-name">{t.logo}</span>
                </div>
                <p className="footer__brand-desc">{t.footerDesc}</p>
                <div className="footer__socials">
                  {[Camera, MessageCircle, Share2].map((Icon,i) => (
                    <a key={i} href="#" className="footer__social-circle"><Icon size={18} /></a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="footer__col-title">{t.quickNav}</h4>
                <ul className="footer__col-list">
                  {t.quickLinks.map((l,i) => <li key={i}><a href={`#${NAV_IDS[i]}`}>{l}</a></li>)}
                </ul>
              </div>

              <div>
                <h4 className="footer__col-title">{t.exp}</h4>
                <ul className="footer__col-list">
                  {t.expLinks.map((l,i) => <li key={i}><a href="#">{l}</a></li>)}
                </ul>
              </div>

              <div>
                <h4 className="footer__col-title">{t.langCol}</h4>
                <p className="footer__lang-desc">{t.langDesc}</p>
                <button className="btn-lang-footer" onClick={toggle}>
                  <Globe size={16} />{t.langLabel}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="container">
            <span className="footer__copyright">{t.copyright}</span>
            <div className="footer__legal">
              <a href="#">{t.privacy}</a>
              <a href="#">{t.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
