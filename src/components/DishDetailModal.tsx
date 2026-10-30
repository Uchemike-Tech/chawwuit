import React, { useState } from 'react';
import { DishAddon, HeatLevel, MenuItem } from '../types';
import { SmartImage } from './SmartImage';

interface DishDetailModalProps {
  dish: MenuItem | null;
  defaultHeat: HeatLevel;
  onClose: () => void;
  onAddToCart: (
    dish: MenuItem,
    quantity: number,
    selectedHeat: HeatLevel,
    selectedProtein: string | undefined,
    selectedAddons: DishAddon[],
    kitchenNotes: string
  ) => void;
}

const HEAT_OPTIONS: HeatLevel[] = [
  HeatLevel.MILD,
  HeatLevel.MEDIUM,
  HeatLevel.HOT,
  HeatLevel.EXTRA_SPICY,
];

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  defaultHeat,
  onClose,
  onAddToCart,
}) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedHeat, setSelectedHeat] = useState<HeatLevel>(dish.heatLevel || defaultHeat);
  const [selectedProtein, setSelectedProtein] = useState<string | undefined>(
    dish.proteinOptions?.[0]
  );
  const [selectedAddons, setSelectedAddons] = useState<DishAddon[]>([]);
  const [kitchenNotes, setKitchenNotes] = useState('');

  const toggleAddon = (addon: DishAddon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  // Parse optional protein surcharge like "(+$2.00)"
  const getProteinExtraUsd = (protein?: string) => {
    if (!protein) return 0;
    const match = protein.match(/\+\$(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const addonsTotalUsd = selectedAddons.reduce((sum, a) => sum + a.priceUsd, 0);
  const proteinExtraUsd = getProteinExtraUsd(selectedProtein);
  const unitPriceUsd = dish.priceUsd + addonsTotalUsd + proteinExtraUsd;
  const lineTotalUsd = unitPriceUsd * quantity;
  const lineTotalNgn = Math.round(lineTotalUsd * 500);

  const handleConfirm = () => {
    onAddToCart(
      dish,
      quantity,
      selectedHeat,
      selectedProtein,
      selectedAddons,
      kitchenNotes.trim()
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-on-surface/55 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-container-lowest w-full max-w-4xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_-8px_rgba(31,25,22,0.22)] border border-outline-variant/30 grid grid-cols-1 md:grid-cols-12 max-h-[92vh]"
      >
        {/* Left: Sticky Dish Gallery */}
        <div className="md:col-span-5 relative bg-surface-container flex flex-col justify-between min-h-[240px] md:min-h-full">
          <SmartImage
            src={dish.image}
            alt={dish.imageAlt}
            fallbackLabel={dish.name}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-on-surface/20 pointer-events-none" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dish customization"
            className="md:hidden absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md text-on-surface flex items-center justify-center shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-on-primary flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {dish.isHalal && (
                <span className="bg-tertiary text-on-tertiary text-label-sm px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">verified</span> 100% Halal
                </span>
              )}
              {dish.isVegan && (
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-label-sm px-2.5 py-0.5 rounded-full">
                  Plant-Based
                </span>
              )}
              <span className="bg-surface/90 text-on-surface text-label-sm px-2.5 py-0.5 rounded-full tabular-price">
                {dish.calories} kcal • {dish.prepTime}
              </span>
            </div>
            <div className="flex items-center gap-1 text-body-sm text-on-primary/90">
              <span className="material-symbols-outlined icon-filled text-secondary-container text-[16px]">
                star
              </span>
              <strong className="font-bold">{dish.rating.toFixed(1)}</strong>
              <span>({dish.reviewCount}+ verified Lagos diners)</span>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase & Customization Module */}
        <div className="md:col-span-7 flex flex-col max-h-[65vh] md:max-h-[88vh]">
          {/* Header */}
          <div className="p-space-lg border-b border-outline-variant/25 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-headline-md font-bold text-on-surface">{dish.name}</h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                {dish.longDescription}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="hidden md:flex w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Scrollable Customizations */}
          <div className="p-space-lg overflow-y-auto flex-1 flex flex-col gap-space-lg">
            {/* Heat Level Selector */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="text-label-lg font-bold text-on-surface">
                  Customize Heat Level
                </span>
                <span className="text-label-sm text-primary uppercase tracking-wider">Required</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HEAT_OPTIONS.map((heat) => {
                  const active = selectedHeat === heat;
                  return (
                    <button
                      key={heat}
                      type="button"
                      onClick={() => setSelectedHeat(heat)}
                      className={`px-3 py-2.5 rounded-xl text-label-md border transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-primary text-on-primary border-primary font-bold shadow-xs'
                          : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        local_fire_department
                      </span>
                      <span>{heat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Protein / Style Options */}
            {dish.proteinOptions && dish.proteinOptions.length > 0 && (
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-label-lg font-bold text-on-surface">
                    Select Grill Protein / Glaze
                  </span>
                  <span className="text-label-sm text-primary uppercase tracking-wider">
                    Pick 1
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {dish.proteinOptions.map((option) => {
                    const active = selectedProtein === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedProtein(option)}
                        className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? 'bg-primary/8 border-primary text-on-surface font-semibold'
                            : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface hover:bg-surface-container-low'
                        }`}
                      >
                        <span className="text-body-md font-medium">{option}</span>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            active
                              ? 'border-primary bg-primary text-on-primary'
                              : 'border-outline'
                          }`}
                        >
                          {active && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Artisanal Add-ons */}
            {dish.availableAddons.length > 0 && (
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-label-lg font-bold text-on-surface">
                    Pair With Sides &amp; Dips
                  </span>
                  <span className="text-body-sm text-on-surface-variant">Optional</span>
                </div>
                <div className="flex flex-col gap-2">
                  {dish.availableAddons.map((addon) => {
                    const checked = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon)}
                        className={`px-4 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          checked
                            ? 'bg-secondary-fixed/35 border-secondary text-on-surface'
                            : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              checked
                                ? 'bg-primary border-primary text-on-primary'
                                : 'border-outline'
                            }`}
                          >
                            {checked && (
                              <span className="material-symbols-outlined text-[14px]">check</span>
                            )}
                          </span>
                          <span className="text-body-md font-medium">{addon.name}</span>
                        </div>
                        <span className="text-label-md text-primary font-bold tabular-price">
                          +${addon.priceUsd.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Kitchen Notes */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="kitchen-notes"
                className="text-label-md font-bold text-on-surface"
              >
                Hearth Kitchen Note (Optional)
              </label>
              <input
                id="kitchen-notes"
                type="text"
                value={kitchenNotes}
                onChange={(e) => setKitchenNotes(e.target.value)}
                placeholder="e.g., Extra red onions on suya, sauce on the side..."
                className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Sticky Purchase Bar */}
          <div className="p-space-md md:p-space-lg bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap sm:flex-nowrap items-center justify-between gap-space-md">
            {/* Pill Quantity Stepper */}
            <div className="flex items-center bg-surface-container-lowest border border-outline-variant/40 rounded-full p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="w-9 text-center text-label-lg font-bold text-on-surface tabular-price">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {/* Primary Add CTA */}
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 bg-primary text-on-primary hover:bg-primary-container py-3.5 px-space-lg rounded-xl text-label-lg font-bold shadow-lg shadow-primary/20 flex items-center justify-between gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer tabular-price"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Add to Bag</span>
              </span>
              <span className="whitespace-nowrap">
                ${lineTotalUsd.toFixed(2)}{' '}
                <span className="text-body-sm font-normal opacity-85">
                  (₦{lineTotalNgn.toLocaleString()})
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
