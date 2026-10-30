import React from 'react';
import { DishCard } from '../components/DishCard';
import { SmartImage } from '../components/SmartImage';
import { PROMO_DEALS } from '../data/menuData';
import { CategoryId, MenuItem } from '../types';

interface DealsScreenProps {
  menuItems: MenuItem[];
  appliedCoupon: string | null;
  onCopyAndApplyCoupon: (code: string) => void;
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
}

export const DealsScreen: React.FC<DealsScreenProps> = ({
  menuItems,
  appliedCoupon,
  onCopyAndApplyCoupon,
  onSelectDish,
  onQuickAdd,
}) => {
  const comboBundles = menuItems.filter(
    (m) => m.category === CategoryId.MEAL_COMBOS || m.originalPriceUsd || m.isBestSeller
  );

  return (
    <div className="w-full min-h-screen bg-surface pb-space-xl">
      {/* Hero Deals Banner */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-gradient-to-br from-secondary via-primary to-on-primary-fixed-variant text-on-primary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-space-sm max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm uppercase tracking-wider font-bold w-fit">
              <span className="material-symbols-outlined text-[15px]">local_offer</span> Daily
              Hearth Perks
            </div>
            <h1 className="text-display-lg-mobile md:text-headline-xl font-extrabold tracking-tight">
              Sizzling Vouchers &amp; Feast Bundles
            </h1>
            <p className="text-body-lg text-on-primary/90">
              Tap any voucher below to copy and apply it straight to your thermal bag. Valid on
              both delivery and express hub pickup across Lagos.
            </p>
          </div>
          {appliedCoupon && (
            <div className="bg-surface-container-lowest text-on-surface px-space-lg py-3.5 rounded-2xl shadow-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-[24px]">
                check_circle
              </span>
              <div className="flex flex-col">
                <span className="text-label-sm uppercase text-tertiary font-bold">
                  Active in Your Bag
                </span>
                <span className="text-headline-sm font-extrabold">{appliedCoupon}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Active Promo Voucher Cards */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div>
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
              Instant Coupon Vault
            </span>
            <h2 className="text-headline-lg font-bold text-on-surface mt-1">
              One-Tap Checkout Codes
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {PROMO_DEALS.map((deal) => {
              const isApplied = appliedCoupon === deal.code;
              return (
                <div
                  key={deal.code}
                  className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 shadow-[0_4px_16px_-2px_rgba(31,25,22,0.06)] flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden">
                    <SmartImage
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/25 to-transparent" />
                    <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container text-label-sm uppercase tracking-wider font-bold px-3 py-1 rounded-full">
                      {deal.badge}
                    </span>
                    <div className="absolute bottom-3 left-4 right-4 text-on-primary">
                      <h3 className="text-headline-sm font-bold">{deal.title}</h3>
                      <p className="text-body-sm text-secondary-fixed font-semibold">
                        {deal.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
                    <div className="flex flex-col gap-2">
                      <p className="text-body-md text-on-surface-variant">{deal.description}</p>
                      <span className="text-body-sm text-on-surface-variant flex items-center gap-1 tabular-price">
                        <span className="material-symbols-outlined text-[15px]">schedule</span>
                        {deal.expiryText} • Min. ${deal.minOrderUsd}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-dashed border-outline-variant flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-label-sm text-on-surface-variant uppercase">
                          Code
                        </span>
                        <span className="text-headline-sm font-extrabold tracking-wider text-primary">
                          {deal.code}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onCopyAndApplyCoupon(deal.code)}
                        className={`px-4 py-2.5 rounded-xl text-label-md font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                          isApplied
                            ? 'bg-tertiary text-on-tertiary'
                            : 'bg-primary text-on-primary hover:bg-primary-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isApplied ? 'check' : 'content_copy'}
                        </span>
                        <span>{isApplied ? 'Applied to Bag' : 'Copy & Apply'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Meal Combos & Best Sellers */}
      <section className="w-full px-margin-mobile md:px-margin py-space-lg bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg py-space-md">
          <div>
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
              Group &amp; Solo Value
            </span>
            <h2 className="text-headline-lg font-bold text-on-surface mt-1">
              Curated Feast Boxes &amp; Crowd Favorites
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Built for sharing, matchdays, and office team lunches with built-in bundle savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {comboBundles.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onSelectDish={onSelectDish}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
