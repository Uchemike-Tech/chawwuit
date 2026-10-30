import React, { useState } from 'react';
import { DishCard } from '../components/DishCard';
import { SmartImage } from '../components/SmartImage';
import { BRAND_IMAGES, CATEGORIES_META } from '../data/menuData';
import { CategoryId, DeliveryZone, HeatLevel, MenuItem, ScreenRoute } from '../types';

interface HomeScreenProps {
  menuItems: MenuItem[];
  selectedZone: DeliveryZone;
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  onNavigate: (screen: ScreenRoute) => void;
  onSelectCategoryInShop: (category: CategoryId) => void;
  onCopyAndApplyCoupon: (code: string) => void;
}

type SpecialFilter = 'all' | 'spicy' | 'vegan-halal' | 'chefs-pick';

export const HomeScreen: React.FC<HomeScreenProps> = ({
  menuItems,
  selectedZone,
  onSelectDish,
  onQuickAdd,
  onNavigate,
  onSelectCategoryInShop,
  onCopyAndApplyCoupon,
}) => {
  const [activeCategoryChip, setActiveCategoryChip] = useState<CategoryId>(CategoryId.FLAME_GRILLS);
  const [specialFilter, setSpecialFilter] = useState<SpecialFilter>('all');

  const heroSignatureDish =
    menuItems.find((i) => i.id === 'smokey-firewood-jollof-suya-platter') || menuItems[0];
  const heroWingsDish =
    menuItems.find((i) => i.id === 'crispy-hot-honey-wings') || menuItems[2];

  // Primary 4 specials from HTML, or filtered dynamically when user clicks filter pills
  const baseSpecials = menuItems.filter((item) => item.isFeaturedSpecial);
  const filteredSpecials = (specialFilter === 'all' ? baseSpecials.slice(0, 4) : menuItems.filter((item) => {
    if (specialFilter === 'spicy') {
      return item.heatLevel === HeatLevel.HOT || item.heatLevel === HeatLevel.EXTRA_SPICY;
    }
    if (specialFilter === 'vegan-halal') {
      return item.isVegan || item.isHalal;
    }
    if (specialFilter === 'chefs-pick') {
      return item.isChefsPick;
    }
    return true;
  }).slice(0, 4));

  return (
    <div className="flex flex-col w-full">
      {/* Top Announce / Micro Tracker Strip */}
      <section className="w-full bg-secondary text-on-secondary px-margin-mobile md:px-margin py-space-xs flex items-center justify-between text-body-sm">
        <div className="flex items-center gap-space-sm mx-auto md:mx-0">
          <span className="material-symbols-outlined text-[16px] text-secondary-fixed">bolt</span>
          <span>
            Live Kitchen Status: <strong>{selectedZone.kitchenStatus}</strong> in{' '}
            {selectedZone.name.replace(', Lagos', '')} &amp; Ikeja
          </span>
          <span className="hidden md:inline text-secondary-fixed">•</span>
          <span className="hidden md:inline text-secondary-fixed tabular-price">
            Average delivery time right now: <strong>{selectedZone.avgMinutes} mins</strong>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-space-md text-label-sm uppercase tracking-wider text-secondary-fixed tabular-price">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>{' '}
            1,248 Orders Delivered Today
          </span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full px-margin-mobile md:px-margin pt-space-xl pb-space-xl overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface">
        {/* Subtle warm glow circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg z-10">
            {/* Delivery Guarantee Pill */}
            <div className="inline-flex items-center gap-space-xs bg-surface-container-highest px-space-md py-1.5 rounded-full w-fit shadow-2xs">
              <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
              <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
              <span className="text-label-sm text-on-surface uppercase tracking-wider">
                30 Mins or It&apos;s Free
              </span>
              <span className="text-on-surface-variant">•</span>
              <span className="text-body-sm text-on-surface-variant font-medium">
                Contactless Hot Delivery
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-tight font-extrabold [text-wrap:balance]">
                Craving Fresh, <span className="text-primary italic">Fire-Crafted</span> Flavor
                Delivered Fast
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-xl">
                Sizzling flame-licked suya, fragrant firewood jollof, and succulent artisan street
                platters prepared fresh by master grillers and delivered straight to your door
                steaming hot.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.SHOP)}
                className="flex items-center justify-center gap-space-sm bg-primary text-on-primary px-space-xl py-3.5 rounded-xl text-label-lg font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>Explore Menu / Order Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.DEALS)}
                className="flex items-center justify-center gap-space-sm bg-surface-container-lowest text-on-surface px-space-lg py-3.5 rounded-xl text-label-lg font-semibold border border-outline-variant/40 shadow-2xs hover:bg-surface-container-high transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="material-symbols-outlined icon-filled text-secondary text-[20px]">
                  local_offer
                </span>
                <span>Today&apos;s Hot Deals (Save 20%)</span>
              </button>
            </div>

            {/* Trust Metrics Bento Strip */}
            <div className="grid grid-cols-3 gap-space-sm md:gap-space-md pt-space-md tabular-price">
              <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/25 shadow-2xs">
                <span className="text-price-lg font-extrabold text-primary">4.9 / 5</span>
                <div className="flex items-center text-secondary-container mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined icon-filled text-[16px]"
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-body-sm text-on-surface-variant mt-1">18,500+ foodies</span>
              </div>

              <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/25 shadow-2xs">
                <span className="text-price-lg font-extrabold text-secondary">
                  {selectedZone.avgMinutes} Mins
                </span>
                <span className="text-label-md text-on-surface mt-0.5">Average Transit</span>
                <span className="text-body-sm text-on-surface-variant mt-1">
                  Thermal bag packed
                </span>
              </div>

              <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/25 shadow-2xs">
                <span className="text-price-lg font-extrabold text-tertiary">100% Halal</span>
                <span className="text-label-md text-on-surface mt-0.5">Farm Sourced</span>
                <span className="text-body-sm text-on-surface-variant mt-1">
                  Daily fresh marinades
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual Right (Editorial Collage with Interactive Overlaps) */}
          <div className="lg:col-span-5 relative flex flex-col items-center mt-4 lg:mt-0">
            <div
              onClick={() => onSelectDish(heroSignatureDish)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectDish(heroSignatureDish);
              }}
              className="group relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            >
              <SmartImage
                src={BRAND_IMAGES.heroSignaturePlatter}
                alt="Close up gourmet aerial view of Nigerian smoky jollof rice feast served with charred flame-grilled suya skewers, golden fried sweet plantains, roasted chili peppers, and fresh scallions."
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              <div className="absolute bottom-space-lg left-space-lg right-space-lg text-on-primary">
                <div className="inline-flex items-center gap-1.5 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-label-sm uppercase tracking-wider mb-2">
                  <span className="material-symbols-outlined text-[14px]">whatshot</span> Kitchen
                  Signature
                </div>
                <p className="text-headline-md text-on-primary font-bold">
                  Smokey Firewood Jollof &amp; Suya Platter
                </p>
                <p className="text-body-sm text-on-primary/85">
                  Fresh off the charcoal hearth grill with spicy yaji pepper sauce • Tap to order
                </p>
              </div>
            </div>

            {/* Floating Appetizer Overlap Card */}
            <button
              type="button"
              onClick={() => onSelectDish(heroWingsDish)}
              className="absolute -bottom-5 left-2 md:-left-6 bg-surface-container-lowest p-space-md rounded-2xl shadow-xl border border-outline-variant/30 flex items-center gap-space-md z-20 max-w-xs animate-bounce-slow text-left hover:border-primary transition-colors cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                <SmartImage
                  src={BRAND_IMAGES.heroHotWings}
                  alt="Crispy sizzling golden chicken wings drizzled with glossy spicy honey glaze and toasted sesame seeds."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined icon-filled text-secondary-container text-[16px]">
                    star
                  </span>
                  <span className="text-label-sm font-bold text-on-surface">Trending Now</span>
                </div>
                <span className="text-headline-sm text-on-surface font-semibold text-sm">
                  Crispy Hot Wings
                </span>
                <span className="text-price-md font-bold text-primary tabular-price">
                  $8.50{' '}
                  <span className="text-body-sm text-on-surface-variant font-normal">
                    / ₦4,200
                  </span>
                </span>
              </div>
            </button>

            {/* Overlapping Quick Time Counter Top Right */}
            <div className="absolute -top-4 right-2 md:-right-4 bg-surface-container-lowest px-4 py-3 rounded-2xl shadow-lg border border-outline-variant/25 flex items-center gap-3 z-20 tabular-price">
              <div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">moped</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-sm text-on-surface-variant">Live Cook Time</span>
                <span className="text-label-lg font-bold text-on-surface">18 - 22 mins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick-Chips Navigator */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
                Fast Category Search
              </span>
              <h2 className="text-headline-xl-mobile md:text-headline-xl text-on-surface mt-1 font-bold">
                What are you feasting on today?
              </h2>
            </div>
            <p className="text-body-md text-on-surface-variant">
              Click any category to browse curated chef selections made right to order.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-md">
            {CATEGORIES_META.map((cat) => {
              const isSelected = activeCategoryChip === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryChip(cat.id);
                    onSelectCategoryInShop(cat.id);
                  }}
                  className={`group flex flex-col items-center p-space-md rounded-2xl transition-all hover:scale-103 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-lowest text-on-surface border border-outline-variant/25 shadow-2xs hover:shadow-md'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full overflow-hidden mb-space-sm p-0.5 ${
                      isSelected ? 'bg-primary-container' : 'bg-surface-container'
                    }`}
                  >
                    <SmartImage
                      src={cat.image}
                      alt={cat.alt}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="text-label-lg text-center font-bold whitespace-nowrap">
                    {cat.name}
                  </span>
                  <span
                    className={`text-label-sm mt-1 ${
                      isSelected ? 'opacity-90' : 'text-on-surface-variant'
                    }`}
                  >
                    {cat.countLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Dishes / Today's Specials Grid */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl" id="featured-menu">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          {/* Section Header with Interactive Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined icon-filled text-primary text-[20px]">
                  restaurant_menu
                </span>
                <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
                  Kitchen Favorites
                </span>
              </div>
              <h2 className="text-headline-xl-mobile md:text-headline-xl text-on-surface mt-1 font-bold">
                Today&apos;s Hot Specials
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Crafted directly on flame grills, sealed fresh, and dispatched instantly.
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {(
                [
                  { id: 'all', label: 'All Specials', icon: null },
                  { id: 'spicy', label: 'Extra Spicy', icon: 'local_fire_department' },
                  { id: 'vegan-halal', label: 'Vegan / Halal', icon: 'eco' },
                  { id: 'chefs-pick', label: "Chef's Pick", icon: 'grade' },
                ] as const
              ).map((tab) => {
                const active = specialFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSpecialFilter(tab.id)}
                    className={`px-space-md py-2 rounded-full text-label-md whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      active
                        ? 'bg-on-surface text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    {tab.icon && (
                      <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Food Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filteredSpecials.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onSelectDish={onSelectDish}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>

          {/* Quick View Bottom Link */}
          <div className="flex items-center justify-center pt-space-sm">
            <button
              type="button"
              onClick={() => onNavigate(ScreenRoute.SHOP)}
              className="inline-flex items-center gap-2 text-primary text-label-lg font-semibold hover:underline group cursor-pointer"
            >
              <span>View entire artisan catalogue ({menuItems.length} signature dishes)</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                trending_flat
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Midweek Munchies Promo Banner */}
      <section className="w-full px-margin-mobile md:px-margin py-space-lg" id="promos">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative shadow-xl bg-gradient-to-r from-secondary to-primary text-on-primary">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none overflow-hidden">
            <SmartImage
              src={BRAND_IMAGES.promoPlantainBackdrop}
              alt="Festive backdrop of freshly made golden fried plantains tossed with spicy scotch bonnet pepper sauce and sea salt flakes."
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 p-space-lg md:p-space-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
            <div className="flex flex-col gap-space-xs max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider w-fit">
                <span className="material-symbols-outlined text-[15px]">campaign</span> Limited
                Promo
              </div>
              <h3 className="text-headline-xl-mobile md:text-headline-xl font-bold tracking-tight">
                Midweek Munchies Special
              </h3>
              <p className="text-body-lg text-on-primary/90">
                Get a complimentary portion of artisan caramelized plantain bites + $4.00 off with
                every food order over $35. Fresh, hot, and seasoned to perfection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-space-sm bg-surface-container-lowest/15 backdrop-blur-md p-space-sm rounded-2xl">
              <div className="flex flex-col px-space-md py-1 text-center sm:text-left">
                <span className="text-label-sm text-on-primary/75 uppercase tracking-wider">
                  Coupon Code
                </span>
                <span className="text-headline-md font-extrabold tracking-widest text-secondary-fixed">
                  CHAWWIT35
                </span>
              </div>
              <button
                type="button"
                onClick={() => onCopyAndApplyCoupon('CHAWWIT35')}
                className="bg-surface-container-lowest text-primary px-space-lg py-3 rounded-xl text-label-md font-bold hover:bg-surface-container-high transition-all shadow-md active:scale-95 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                <span>Copy &amp; Apply</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How Chawwit Works: 3-Step Visual Experience */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-space-xs">
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
              Fast &amp; Frictionless
            </span>
            <h2 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface">
              How Your Feast Arrives
            </h2>
            <p className="text-body-md text-on-surface-variant">
              From live hearth-grill sizzle to your doorstep in three seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter relative">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/25 shadow-2xs flex flex-col gap-space-md relative hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px]">touch_app</span>
              </div>
              <div className="absolute top-6 right-6 text-price-lg font-extrabold text-outline-variant/60 tabular-price">
                01
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="text-headline-sm text-on-surface font-bold">Pick Your Craving</h3>
                <p className="text-body-md text-on-surface-variant">
                  Explore mouthwatering firewood jollof, succulent suya, crispy wraps, and artisan
                  treats. Customize your heat levels with one tap.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.SHOP)}
                className="mt-auto pt-space-xs flex items-center gap-2 text-primary text-label-md font-bold cursor-pointer w-fit"
              >
                <span>Instant checkout</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/25 shadow-2xs flex flex-col gap-space-md relative hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px]">outdoor_grill</span>
              </div>
              <div className="absolute top-6 right-6 text-price-lg font-extrabold text-outline-variant/60 tabular-price">
                02
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="text-headline-sm text-on-surface font-bold">
                  We Craft It Fresh &amp; Hot
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  No pre-made heat-lamp trays. Our grill masters sear your protein and assemble
                  your bowls live the minute your order triggers our kitchen bell.
                </p>
              </div>
              <div className="mt-auto pt-space-xs flex items-center gap-2 text-secondary text-label-md font-semibold">
                <span>Sealed in thermal eco-boxes</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/25 shadow-2xs flex flex-col gap-space-md relative hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px]">local_shipping</span>
              </div>
              <div className="absolute top-6 right-6 text-price-lg font-extrabold text-outline-variant/60 tabular-price">
                03
              </div>
              <div className="flex flex-col gap-space-xs">
                <h3 className="text-headline-sm text-on-surface font-bold">
                  Fast Contactless Delivery
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Dispatched with GPS route optimization. Your food arrives piping hot within 30
                  minutes, or you receive an instant refund voucher.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.TRACKING)}
                className="mt-auto pt-space-xs flex items-center gap-2 text-tertiary text-label-md font-bold cursor-pointer w-fit"
              >
                <span>Guaranteed 30-min window</span>
                <span className="material-symbols-outlined text-[16px]">verified</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dietary & Kitchen Highlights */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Visual Split Left */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg">
              <SmartImage
                src={BRAND_IMAGES.kitchenChefGrill}
                alt="Chawwit professional chef basting seasoned chicken wings on an open flaming culinary grill inside a spotless modern restaurant kitchen in warm amber lighting."
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/75 via-transparent to-transparent" />
              <div className="absolute bottom-space-md left-space-md text-on-primary">
                <span className="text-label-sm uppercase tracking-wider text-secondary-fixed">
                  Master Chefs At Work
                </span>
                <p className="text-headline-sm font-bold">Open Hearth Cooking Standard</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-md">
              <div className="p-space-md bg-surface-container-low rounded-2xl flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[28px]">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="text-label-md font-bold text-on-surface">
                    100% Halal Certified
                  </span>
                  <span className="text-body-sm text-on-surface-variant">
                    Audited supplier network
                  </span>
                </div>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-2xl flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  recycling
                </span>
                <div className="flex flex-col">
                  <span className="text-label-md font-bold text-on-surface">
                    Eco-Insulated Packs
                  </span>
                  <span className="text-body-sm text-on-surface-variant">
                    Holds warmth 45+ mins
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
              The Chawwit Promise
            </span>
            <h2 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface [text-wrap:balance]">
              Artisanal Street Taste Meets Ultra-Modern Precision
            </h2>
            <p className="text-body-md text-on-surface-variant">
              We refused to accept lukewarm soggy takeout. Every batch of our smoked meats,
              aromatic sauces, and hand-cut plantains follows strict kitchen temperature gates
              before being handed off to our insulated delivery couriers.
            </p>

            <div className="flex flex-col gap-space-sm pt-space-xs">
              <div className="flex items-start gap-space-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 shrink-0">
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
                <div>
                  <strong className="text-label-md text-on-surface">
                    Real Woodsmoke &amp; Charcoal Flavors:
                  </strong>
                  <span className="text-body-sm text-on-surface-variant">
                    {' '}
                    No artificial smoke flavorings. We cook over seasoned Nigerian hardwood coals
                    for genuine street-cart soul.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 shrink-0">
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
                <div>
                  <strong className="text-label-md text-on-surface">
                    Zero Preservative Marinades:
                  </strong>
                  <span className="text-body-sm text-on-surface-variant">
                    {' '}
                    Fresh crushed ginger, fermented scotch bonnets, native yaji, and garlic ground
                    daily by 6:00 AM.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 shrink-0">
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
                <div>
                  <strong className="text-label-md text-on-surface">Live Prep Tracking:</strong>
                  <span className="text-body-sm text-on-surface-variant">
                    {' '}
                    Watch your order transition from flame grill to bag to driver with real-time
                    milestone updates.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-space-sm">
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.ABOUT)}
                className="inline-flex items-center gap-space-xs bg-surface-container-highest px-space-lg py-3 rounded-xl text-label-md font-semibold text-on-surface hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                <span>Read our kitchen hygiene and source manifesto</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Social Proof */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
                Community Love
              </span>
              <h2 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface mt-1">
                Loved by Over 18,500 Happy Foodies
              </h2>
            </div>

            <div className="flex items-center gap-space-md bg-surface-container-lowest px-space-lg py-2.5 rounded-2xl border border-outline-variant/25 shadow-2xs w-fit tabular-price">
              <div className="flex items-center text-secondary-container">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined icon-filled text-[20px]">
                    star
                  </span>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-label-md font-bold text-on-surface">
                  4.9 / 5 Overall Score
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  Google &amp; App Reviews
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              {
                initials: 'TO',
                badgeBg: 'bg-primary/15 text-primary',
                name: 'Tunde Oladipo',
                meta: 'Verified Buyer • Ordered 14 times',
                time: 'Yesterday',
                quote:
                  '"The Smokey Jollof Fiesta Box is hands-down the best takeaway rice I’ve had in Lagos. It actually smells like legit party firewood jollof, not synthetic flavor. Delivered in 23 minutes straight to Lekki Phase 1."',
              },
              {
                initials: 'AM',
                badgeBg: 'bg-secondary/15 text-secondary',
                name: 'Amina Mohammed',
                meta: 'Verified Diner • Victoria Island',
                time: '3 days ago',
                quote:
                  '"Their Suya Glazed Flame Ribs are phenomenal. Meat falling right off the bone with that addictive spicy dry rub crunch. The food was so hot the foil box was steaming when I unzipped the delivery bag."',
              },
              {
                initials: 'EK',
                badgeBg: 'bg-tertiary/15 text-tertiary',
                name: 'Emeka Kenneth',
                meta: 'Corporate Catering • Ikeja GRA',
                time: '5 days ago',
                quote:
                  '"We ordered the Combos for our 12-person product launch team dinner. The packaging was immaculate, zero grease leaks, and everyone raved about the spicy mango wings and loaded dodo poutine!"',
              },
            ].map((rev) => (
              <div
                key={rev.name}
                className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/25 shadow-2xs flex flex-col justify-between gap-space-md"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-secondary-container">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className="material-symbols-outlined icon-filled text-[16px]"
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-body-sm text-on-surface-variant">{rev.time}</span>
                  </div>
                  <p className="text-body-md text-on-surface italic">{rev.quote}</p>
                </div>

                <div className="flex items-center gap-space-sm pt-space-xs">
                  <div
                    className={`w-10 h-10 rounded-full ${rev.badgeBg} font-bold flex items-center justify-center text-label-md shrink-0`}
                  >
                    {rev.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md font-bold text-on-surface">{rev.name}</span>
                    <span className="text-body-sm text-on-surface-variant">{rev.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Press Mentions Strip */}
          <div className="pt-space-md flex flex-wrap items-center justify-center gap-space-xl opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-headline-sm tracking-tight text-on-surface font-extrabold">
              EAT.NG
            </span>
            <span className="text-headline-sm tracking-tight text-on-surface font-extrabold">
              LAGOS CULINARY TIMES
            </span>
            <span className="text-headline-sm tracking-tight text-on-surface font-extrabold">
              STREET FOOD DIGEST
            </span>
            <span className="text-headline-sm tracking-tight text-on-surface font-extrabold">
              TECHCABAL TASTE
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Final Call to Order */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto bg-surface-container-highest rounded-3xl p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg relative overflow-hidden">
          <div className="flex flex-col gap-space-xs max-w-lg">
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
              Your Table is Waiting
            </span>
            <h2 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface">
              Ready to Chaw? Order In Seconds.
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Browse our interactive menu, customize heat levels, and enjoy the quickest gourmet
              flame delivery in town.
            </p>
          </div>
          <div className="flex items-center gap-space-md">
            <button
              type="button"
              onClick={() => onNavigate(ScreenRoute.SHOP)}
              className="bg-primary text-on-primary px-space-xl py-3.5 rounded-xl text-label-lg font-semibold shadow-md hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Start Instant Order</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
