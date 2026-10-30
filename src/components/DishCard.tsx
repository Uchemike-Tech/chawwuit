import React, { useState } from 'react';
import { HeatLevel, MenuItem } from '../types';
import { SmartImage } from './SmartImage';

interface DishCardProps {
  dish: MenuItem;
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  currencyMode?: 'dual' | 'usd' | 'ngn';
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onSelectDish,
  onQuickAdd,
  currencyMode = 'dual',
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(dish);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  const getHeatColorClass = (heat: HeatLevel) => {
    switch (heat) {
      case HeatLevel.HOT:
      case HeatLevel.EXTRA_SPICY:
      case HeatLevel.MEDIUM:
        return 'text-error';
      case HeatLevel.MILD:
        return 'text-secondary';
      default:
        return 'text-on-surface-variant';
    }
  };

  return (
    <div
      onClick={() => onSelectDish(dish)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectDish(dish);
        }
      }}
      className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-[0_4px_16px_-2px_rgba(31,25,22,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(174,43,1,0.10)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-primary"
    >
      {/* Dish Media */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
        <SmartImage
          src={dish.image}
          alt={dish.imageAlt}
          fallbackLabel={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-left Dietary & Editorial Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {dish.isChefsPick && (
            <span className="bg-primary text-on-primary text-label-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold whitespace-nowrap">
              Chef&apos;s Choice
            </span>
          )}
          {dish.isBestSeller && !dish.isChefsPick && (
            <span className="bg-secondary-container text-on-secondary-container text-label-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold whitespace-nowrap">
              Best Seller
            </span>
          )}
          {dish.heatLevel === HeatLevel.HOT && !dish.isChefsPick && (
            <span className="bg-error text-on-error text-label-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold flex items-center gap-1 whitespace-nowrap">
              <span className="material-symbols-outlined text-[13px]">whatshot</span> Spicy
            </span>
          )}
          {dish.id === 'suya-glazed-flame-ribs' && (
            <span className="bg-error text-on-error text-label-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold flex items-center gap-1 whitespace-nowrap">
              <span className="material-symbols-outlined text-[13px]">whatshot</span> Spicy
            </span>
          )}
          {dish.isDinerFav && (
            <span className="bg-surface/90 backdrop-blur-md text-tertiary text-label-sm px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold whitespace-nowrap">
              <span className="material-symbols-outlined text-[13px]">favorite</span> Diner Fav
            </span>
          )}
          {dish.isVegan ? (
            <span className="bg-surface/90 backdrop-blur-md text-tertiary text-label-sm px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold whitespace-nowrap">
              <span className="material-symbols-outlined text-[13px]">eco</span> Vegan
            </span>
          ) : (
            dish.isHalal &&
            dish.id === 'smoky-jollof-fiesta-box' && (
              <span className="bg-surface/90 backdrop-blur-md text-tertiary text-label-sm px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold whitespace-nowrap">
                <span className="material-symbols-outlined text-[13px]">eco</span> Halal
              </span>
            )
          )}
        </div>

        {/* Bottom-right Star Rating */}
        <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-label-sm text-on-surface flex items-center gap-1 shadow-sm tabular-price">
          <span className="material-symbols-outlined icon-filled text-secondary-container text-[15px]">
            star
          </span>
          <span className="font-bold">{dish.rating.toFixed(1)}</span>
          <span className="text-on-surface-variant font-medium">({dish.reviewCount}+)</span>
        </div>
      </div>

      {/* Dish Content */}
      <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {dish.prepTime}
            </span>
            <span
              className={`${getHeatColorClass(dish.heatLevel)} font-medium flex items-center gap-1 whitespace-nowrap`}
            >
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              {dish.heatLevel}
            </span>
          </div>
          <h3 className="text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold">
            {dish.name}
          </h3>
          <p className="text-body-sm text-on-surface-variant line-clamp-2">{dish.description}</p>
        </div>

        {/* Price & Quick Add */}
        <div className="flex items-center justify-between pt-space-xs">
          <div className="flex flex-col tabular-price">
            {currencyMode !== 'ngn' && (
              <div className="flex items-baseline gap-1.5">
                <span className="text-price-lg text-on-surface">${dish.priceUsd.toFixed(2)}</span>
                {dish.originalPriceUsd && (
                  <span className="text-body-sm text-on-surface-variant line-through">
                    ${dish.originalPriceUsd.toFixed(2)}
                  </span>
                )}
              </div>
            )}
            {currencyMode === 'dual' && (
              <span className="text-body-sm text-on-surface-variant font-medium">
                ₦{dish.priceNgn.toLocaleString()}
              </span>
            )}
            {currencyMode === 'ngn' && (
              <span className="text-price-lg text-on-surface">
                ₦{dish.priceNgn.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAddClick}
            title={`Add ${dish.name} to bag`}
            aria-label={`Add ${dish.name} to bag`}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer ${
              justAdded
                ? 'bg-tertiary text-on-tertiary scale-105'
                : 'bg-primary text-on-primary shadow-primary/20 hover:bg-primary-container hover:scale-105 active:scale-95'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {justAdded ? 'check' : 'add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
