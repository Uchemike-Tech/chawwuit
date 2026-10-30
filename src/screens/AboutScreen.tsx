import React from 'react';
import { SmartImage } from '../components/SmartImage';
import { BRAND_IMAGES, DELIVERY_ZONES } from '../data/menuData';
import { DeliveryZone, ScreenRoute } from '../types';

interface AboutScreenProps {
  onNavigate: (screen: ScreenRoute) => void;
  onSelectZoneAndShop: (zone: DeliveryZone) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onNavigate,
  onSelectZoneAndShop,
}) => {
  return (
    <div className="w-full min-h-screen bg-surface pb-space-xl">
      {/* Editorial Story Hero */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low border-b border-outline-variant/25">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
              Our Kitchen &amp; Source Manifesto
            </span>
            <h1 className="text-display-lg-mobile md:text-headline-xl font-extrabold text-on-surface [text-wrap:balance]">
              Born Around Lagos Street Hearths. Engineered for Steaming-Hot Delivery.
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Chawwit started with a simple frustration: why did the best firewood jollof and
              charcoal-seared suya lose their magic the moment they went into a plastic takeout
              container? We rebuilt the modern cloud hearth from scratch—combining traditional
              Nigerian hardwood grilling with culinary temperature gates and breathable eco-thermal
              packs.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-2">
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.SHOP)}
                className="bg-primary text-on-primary px-space-xl py-3.5 rounded-xl text-label-lg font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer"
              >
                Taste the Hearth Menu
              </button>
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.CONTACT)}
                className="bg-surface-container-lowest text-on-surface border border-outline-variant/45 px-space-lg py-3.5 rounded-xl text-label-lg font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
              >
                Book Event Catering
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video">
              <SmartImage
                src={BRAND_IMAGES.kitchenChefGrill}
                alt="Chawwit master chef basting flame-grilled chicken wings over open embers."
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-on-primary flex items-end justify-between">
                <div>
                  <span className="text-label-sm uppercase tracking-wider text-secondary-fixed">
                    Zero Heat-Lamp Policy
                  </span>
                  <p className="text-headline-sm font-bold">
                    Every skewer &amp; bowl seared live on order
                  </p>
                </div>
                <span className="bg-tertiary text-on-tertiary text-label-sm px-3 py-1 rounded-full font-bold">
                  ISO Hygiene Grade A
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Culinary Standards */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="max-w-2xl">
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
              Craftsmanship Pillars
            </span>
            <h2 className="text-headline-lg font-bold text-on-surface mt-1">
              Four Non-Negotiable Kitchen Gates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {[
              {
                num: '01',
                icon: 'pestle',
                title: '6:00 AM Spice Mill',
                desc: 'We roast kuli-kuli peanuts, ginger root, cloves, and dried ata-rodo chilies fresh every dawn. Zero MSG packets or synthetic liquid smoke.',
              },
              {
                num: '02',
                icon: 'local_fire_department',
                title: 'Seasoned Hardwood Coals',
                desc: 'Our custom indoor-vented charcoal hearths impart authentic party-jollof smokiness and crisp caramelized char on every cut.',
              },
              {
                num: '03',
                icon: 'verified_user',
                title: '100% Audited Halal Farms',
                desc: 'All beef sirloin, short ribs, and free-range poultry arrive daily from certified Halal partner ranches in Ogun and Oyo states.',
              },
              {
                num: '04',
                icon: 'takeout_dining',
                title: '68°C Vented Eco-Boxes',
                desc: 'Micro-vented foil-lined kraft boxes keep fried plantains and wings crisp while locking in steam for up to 45 minutes in transit.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/30 shadow-2xs flex flex-col gap-space-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <span className="text-price-lg font-extrabold text-outline-variant/60 tabular-price">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-headline-sm font-bold text-on-surface">{item.title}</h3>
                <p className="text-body-md text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Lagos Hearth Hubs */}
      <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
                Neighborhood Kitchens
              </span>
              <h2 className="text-headline-lg font-bold text-on-surface mt-1">
                Our Live Lagos Hearth Hubs
              </h2>
            </div>
            <p className="text-body-md text-on-surface-variant">
              Strategically positioned within 4km of major Island and Mainland neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {DELIVERY_ZONES.slice(0, 3).map((zone) => (
              <div
                key={zone.id}
                className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/30 flex flex-col justify-between gap-space-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm uppercase text-tertiary bg-tertiary/10 px-2.5 py-1 rounded-full font-bold">
                      {zone.kitchenStatus}
                    </span>
                    <span className="text-label-md font-bold text-on-surface tabular-price">
                      ~{zone.avgMinutes} mins
                    </span>
                  </div>
                  <h3 className="text-headline-sm font-bold text-on-surface mt-1">{zone.hub}</h3>
                  <p className="text-body-sm text-on-surface-variant">
                    Serving {zone.name} &amp; surrounding streets • Open 10:30 AM – 11:30 PM daily.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectZoneAndShop(zone)}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-label-md font-bold transition-colors cursor-pointer"
                >
                  Order From {zone.name.split(',')[0]} Hub
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
