import React, { useMemo, useState } from 'react';
import { DishCard } from '../components/DishCard';
import { SmartImage } from '../components/SmartImage';
import { CATEGORIES_META } from '../data/menuData';
import { CategoryId, HeatLevel, MenuItem } from '../types';

interface ShopCatalogueScreenProps {
  menuItems: MenuItem[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
}

type SortBy = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const ShopCatalogueScreen: React.FC<ShopCatalogueScreenProps> = ({
  menuItems,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectDish,
  onQuickAdd,
}) => {
  const [dietFilter, setDietFilter] = useState<'all' | 'vegan' | 'spicy' | 'chefs'>('all');
  const [sortBy, setSortBy] = useState<SortBy>('popular');
  const [currencyMode, setCurrencyMode] = useState<'dual' | 'usd' | 'ngn'>('dual');

  const filteredDishes = useMemo(() => {
    return menuItems
      .filter((dish) => {
        if (selectedCategory !== CategoryId.ALL && dish.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesText =
            dish.name.toLowerCase().includes(q) ||
            dish.description.toLowerCase().includes(q) ||
            dish.longDescription.toLowerCase().includes(q);
          if (!matchesText) return false;
        }
        if (dietFilter === 'vegan' && !dish.isVegan) return false;
        if (
          dietFilter === 'spicy' &&
          dish.heatLevel !== HeatLevel.HOT &&
          dish.heatLevel !== HeatLevel.EXTRA_SPICY
        ) {
          return false;
        }
        if (dietFilter === 'chefs' && !dish.isChefsPick) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
        if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }, [menuItems, selectedCategory, searchQuery, dietFilter, sortBy]);

  return (
    <div className="w-full min-h-screen bg-surface pb-space-xl">
      {/* Storefront Header Banner */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/25 px-margin-mobile md:px-margin py-space-lg">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
                Chawwit Live Menu
              </span>
              <h1 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface mt-1">
                Artisan Hearth Catalogue
              </h1>
              <p className="text-body-md text-on-surface-variant">
                Every dish is flame-seared to order over seasoned Nigerian hardwood coals and
                packed in vented eco-thermal boxes.
              </p>
            </div>

            {/* Currency Display Segmented Control */}
            <div className="flex items-center gap-1 bg-surface-container-highest p-1 rounded-xl w-fit">
              {(
                [
                  { id: 'dual', label: 'Dual ($ / ₦)' },
                  { id: 'usd', label: 'USD ($)' },
                  { id: 'ngn', label: 'NGN (₦)' },
                ] as const
              ).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCurrencyMode(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-label-sm transition-colors cursor-pointer whitespace-nowrap ${
                    currencyMode === c.id
                      ? 'bg-surface-container-lowest text-on-surface shadow-2xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Visual Strip */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar pt-1">
            <button
              type="button"
              onClick={() => onSelectCategory(CategoryId.ALL)}
              className={`px-4 py-2.5 rounded-full text-label-md whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                selectedCategory === CategoryId.ALL
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface border border-outline-variant/35 hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
              <span>All Categories ({menuItems.length})</span>
            </button>

            {CATEGORIES_META.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`pl-1.5 pr-4 py-1.5 rounded-full text-label-md whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface border border-outline-variant/35 hover:bg-surface-container-high'
                  }`}
                >
                  <SmartImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter & Sort Toolbar */}
      <section className="w-full px-margin-mobile md:px-margin pt-space-lg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b border-outline-variant/25">
          {/* Dietary & Spice Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {(
              [
                { id: 'all', label: 'All Dishes', icon: 'apps' },
                { id: 'chefs', label: "Chef's Choice", icon: 'grade' },
                { id: 'spicy', label: 'Spicy & Fiery', icon: 'local_fire_department' },
                { id: 'vegan', label: '100% Plant-Based', icon: 'eco' },
              ] as const
            ).map((chip) => {
              const active = dietFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setDietFilter(chip.id)}
                  className={`px-3.5 py-2 rounded-full text-label-md flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-on-surface text-on-primary font-bold'
                      : 'bg-surface-container-lowest border border-outline-variant/40 text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Refinement & Sort */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by ingredient..."
                className="w-full bg-surface-container-lowest border border-outline-variant/45 rounded-xl pl-9 pr-8 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-body-sm text-on-surface-variant">Sort:</span>
              <select
                aria-label="Sort menu items"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="bg-surface-container-lowest border border-outline-variant/45 rounded-xl px-3 py-2 text-label-md text-on-surface focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="popular">Most Ordered</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Product Grid */}
      <section className="w-full px-margin-mobile md:px-margin pt-space-lg">
        <div className="max-w-7xl mx-auto">
          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
              {filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onSelectDish={onSelectDish}
                  onQuickAdd={onQuickAdd}
                  currencyMode={currencyMode}
                />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-3xl p-space-xl text-center flex flex-col items-center gap-space-md max-w-lg mx-auto my-8">
              <span className="material-symbols-outlined text-primary text-[40px]">
                search_off
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-headline-md font-bold text-on-surface">
                  No matching cravings found
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Try clearing your active category or dietary filters to explore our full charcoal
                  hearth menu.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory(CategoryId.ALL);
                  setDietFilter('all');
                  onSearchChange('');
                }}
                className="bg-primary text-on-primary px-space-lg py-2.5 rounded-xl text-label-md font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
