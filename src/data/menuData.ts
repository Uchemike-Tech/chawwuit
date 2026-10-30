import {
  CategoryId,
  DeliveryZone,
  DishAddon,
  HeatLevel,
  MenuItem,
  OrderRecord,
  OrderStatusStep,
  PromoDeal,
  UserProfileData,
} from '../types';

export const BRAND_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1VU4QhZEf4uOUW0Im545D4HF7EATZfptIyne6adszJJeBzpNxwvQYTUO27YhXZ91y_NlD2OmmEF3SAdVmw_jl0AowPmSafC7KiS1jRf4-ZyhVHm2K9eA4o_gt5w-4kx-FSFihljlPya4JSJIQqJwAK5DEBKVgaNemIve3eVLo6dYEkEoq6INKKOgJRlHbTsclHzuGCS1lC2PqCM8tc2cL7eNmisYCldfukZvaDircyXZvSoeVwJBQcKjoI',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgd8ySP9uy22a8afvM3iR-gIfh9_UKw_v54VPYDaMpz96bdG3Z-IPih5SGj1sAgSYgUAwssre2FjQrwautnzAyWh9FLgSLYI9W_0yE0Bb79cGIqk7mOaZ2fr9ICS5wO18wRo4OUfdb6pisEwukoCnsEC7k59X0U1N8H7gSOCFrzxJm3c8By43G5iCNpLY6IBwMgnZ2cJwD1nm_G0EjkvPDIY2vOlZ95z2t-5JCL7snlUj66rjHU1Gh',
  heroSignaturePlatter:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgpQdNfNFWpar4EHgkXXp2LbQXq_fvPHhug1QdxZuVSTz0Jei0jeJCnzrUQVy9r7-tlo6KNwi2STxf7u10uvSlD0fIdrVza1MCYiYlKsh7UBq7SoAXo_Yp_wMKcIr6Ww8Ni5CgfkEpODoOM3kLZmePuYOOFsyq7N-Vp5E7GAbW9Mm3Y5uMM6uQ1wFDfl3mxrmLMVPGXmLe8KUSPFL5IKQ0i1pneeQbXZVsGNnljec7fmq-5av-tga7',
  heroHotWings:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAph8RjtfGTaE2zk6RTOrYr7CZi7kRQ5k3lbtAGOOFJOT7EoiDPyyU73FK-FKUNmg9sRG8QK25RmY0JbKVMasbnViFj4JBbOWneUeHqRT8i9_rqKH_aShmSIykZOvh-rcc0BoecX1KwmRzw1eOUbrbPABth3oxqyGiJNke5k5nCxaLmGRvS8qCmUCSjuXtbd7p75JfY7fAScRsb3g0RLTjWmQYkuZ_evbe4-oX8wnQCK9Zfl8tQvrWT',
  catFlameGrills:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA5eZ-0ziZZmbgRxSZiedv2kIsGO4K0I9zMgNJ86d8WUM5eZkGH8rbuwba00ZiTfeeK0RbBJJvg9SdchtAw2GHUJj7kEFLNWA9McUWhL3tbqv5BHtKPKq0AorhxvDTyM9vaXKq8vtbB43yqx9VnsjPwTNnp0cAoRUQ2mAYUjyOWCa4h9B01xzpAp8IYiUEaV6FmTJ85dsbIC_peOVO0eIGIcl5TL9W4ZSJc8Ngad1cqt_Tzn-6gAnAW',
  catSignatureBowls:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnffcqZg20uyjfQrD9OIqKjF_AAN_h-46nxCPKunKTGRI63-FThT-OQ1BFiw9BdRyXAYKaEaISUDYYYyl8do-VRJIVjR_QaMU4Eqytjm6Y_3PDK44hGeHj6NeLSiVTvyfo4HN_RL62p-pEf_MIs4PF3Mx6Bn3refZQ-cEzFbdwEQV4IAw3NYnvOIrnYvMLIxJiin7LykW2xvl7zEWq6ORjRQN9m64lYmsiEUE_uMjwofRRd4gfLEtU',
  catStreetBites:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDp-ZwI1TuH10fHTSxC3ntGzYIKf-Fo-6QJXSJT9r5PKCNtk4Vgf48-TiCNdSmMvF3Pw2wn9x_UiYV7hdP8igJNQxYGD7F2_NqVxAO8-iSelzgI4dL0bNrWfmjYKUYYyQ6KAPRQxJPNkA1fLR69bAJ-r7upBCRGbztyEhgMvjGvi2VL-Dtp6e5u6MRuR7nQnRRcpmmezoYRADx_kyZjiiFvF9e8PPhW2NKd42cqp98h68IgehvE0JgF',
  catMealCombos:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCymBFm-vfVzbevXqbKLmJGtQQV54C7Os4MwjxETVg0gmFPlQH1kt3cTyRGER5PCwi_exh1hlCEe1SC0w811ca6rb0owsDLDr81mXYZWh3NisguVyWry5djcL7exYg_EXVK_u0qHwc-M1mk7HsGuMtUdcNSjNcvVNFcQkX0zjtAubMem0mz8uAC1s6opccGs9gy_EfFzOR_ziRXVz987cEU-FASmxLtjZ_JeBuSWMzj_MLuO6W5Y5o5',
  catSidesDrinks:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB__jsDJtUE-iKA0Uuri3cf9tVcHnP1G8UWshNmq2e-j6xfo9qKiNNgS3rV-pGy9HvzE8MnuNJBEWFau1hOYYzCFgeSCt0EOiAmmgbEHul6iTrYICaLNGsBMe666oejSDOmt3UB2vc6P76G8L3k3DCfCio28GA0jQdKA-UOB4E75JI717LaF8cN2WUDDVMc0Mp_DpgmWtz96ENSACof53TshEuedoLd42C8yBmWSXvhpjgYHJGollyo',
  catSweetTreats:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCazdh7UQnbeSTtpKmfb06f5KvXp34Rta9dvWNqIxvExQFHjgb4vDQ1SCNKpok15AbzFTAbTQInLYe8FRpIpqcfm5WL2EfFBqQ-LZQzxa9ZXMHwzgQ0MAgR-688OZ0KSAj1BHUcYxmo5xp8otG1uF-es8c94dt2njGWQhXziAETFStAD5DvydQT2YpEawYCJ6vUBV5SvlfehpRYKseW-3puR51umfbtW8WdnoyVRApQam_lEff-4W9b',
  dishJollofFiesta:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDa1AIL97DUHfd4_mw2vcRMaKL5Oh0zGX0Bhl3xGmhbmPwuFhE-F4f8R_KH72HbmtEo8lDCGwg5t1KYYdAGbLN9Dvpf0KoYHCe5-WsFObSw9yLpsi1qFRAbSs0PKlogjFMT-5gq-hkzyCGAzaK03nSmj0PNopx2YycHWPFuoVBbYsgTJ5vtN_VKFjwGXmUefelVA2YClErPPW7RMzdrKBBDa9hJCn9YspzNCtwabPLrrbfDtLHh3hmk',
  dishSuyaRibs:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD6dlkxZS1_uGcDQBUZ5gL8Voc2xDIAlZz-Uh9gN3YwHIcvKvf3S7lQMnpWzt-v-fqMKXwxNO0jeQP1dL5PU-INpCsYPeIwtgcOZchC8zepMPMN8PT2ZM-Yz1jxAULHt335oovTITuLoRWggkQ24R7DXLNzbzsSfQTscWBi8MKSrLolDnoIknGhNtBv6JXQ_XUcZ0i6yDDQOJJt2Ju2iBYWLXO3eGNt8B1zHxb_BhvZrj62WjGqYsAM',
  dishGoldenWings:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa4Yp1rJ1KKWREIewZdYO0nvu9IUoH-6Aw44uJsLMF2-tTxOGZZtJ6FoMtuayvWTZiGthJJg8hU0UZto1aZphQ7TUCi-erQ29GdDSuMKL7RgQ6ccHDAmDKziME9uY66yiY47UK8odYwqSiYHuOC1_7-jmkHtosXOPxWCYh4fSCB8Chb2q8engwbD410p4Ou24Tkuew5fXHss7XA-cCFkJcaxFuOmM4GvsvqJsGyubnv7fpYBEHFtN',
  dishPlantainPoutine:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCwlFDyM_icLoGe6jFu9YbSsksZ-WO-Tt7HAMKZBs6oihxqtfi9dsW288jZe5r0rVCLAWu6z9ZErHEbF6GY4EPUcpJdhgmVtY4WWgCev6HrF_xPjE3y4eHyzGOEOCSQuwY18hFQs9vRrh4R3qRPTJW_hXc3uipf6HW6ix8hv__U-7o_gvVaMrICZQQfSgAcWPdcvAfrjsVV2MdowPhMrJfyQ8WEkCxUR5hgqD88zcrnNzwpTuLxL_4L',
  promoPlantainBackdrop:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuABEmMmrAN0-v300bFXfeNLEV2Cr_kmEDNo22nOFZ-HkVQ4dU0hN6YJQ6SQucQR1ewgfk5_Yux_im1tI1sq2lLEwkYc25xi3ICJmnHGZeyNsEu7VP_j-rmkbV0PHR9ZxncfssUe3ULfoNRf_Oeb0aYStX6qtKqGnv-myOapF67LO4ewxvY2cD67OuIl5GIZ9zIzN_25WYojVOY0da5Xzx97qpPCtz9P2lFmrSELk6DNLoVNnoMkMlQ_',
  kitchenChefGrill:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDIqr3aDfN9iBhK8O0Wd8hf0BdTGkaGcc8nt-6wo765hi0Fwskdhp2u8Q4PBrup8Mjs9iInHUsbR50wrrim5DCwwKJvd6vSUZfcpamIIDq3O46SmdCV-H1lPUY9vY2pAd-RR3gy-WB2HeFvIJBYn7lmRMtX-T3Edp5EEYp3tCsbK1QJmh86g_wFtTw5uMmLKuFj7lgbvOQtMuHCQj7ueY5w_XhA-GIh-cMObJXZd7pJEY10o_LOMtjW',
};

export const COMMON_ADDONS: Record<string, DishAddon> = {
  dodo: { id: 'addon-dodo', name: 'Caramelized Sweet Dodo', priceUsd: 2.5, priceNgn: 1250 },
  yajiDip: { id: 'addon-yaji', name: 'Extra Spicy Yaji Pepper Pot', priceUsd: 1.0, priceNgn: 500 },
  slaw: { id: 'addon-slaw', name: 'Chawwit Crunchy House Slaw', priceUsd: 1.75, priceNgn: 900 },
  zobo: { id: 'addon-zobo', name: 'Chilled Mint Hibiscus Zobo', priceUsd: 3.5, priceNgn: 1750 },
  cheese: { id: 'addon-cheese', name: 'Molten Cheese Curd Drizzle', priceUsd: 2.0, priceNgn: 1000 },
  puff: { id: 'addon-puff', name: '3pc Warm Cinnamon Puff-Puff', priceUsd: 3.0, priceNgn: 1500 },
};

export const CATEGORIES_META = [
  {
    id: CategoryId.FLAME_GRILLS,
    name: 'Flame Grills',
    countLabel: '14 Dishes',
    image: BRAND_IMAGES.catFlameGrills,
    alt: 'Charred flame grilled beef suya skewers sprinkled with roasted peanut spice on a dark background warm fiery colors.',
  },
  {
    id: CategoryId.SIGNATURE_BOWLS,
    name: 'Signature Bowls',
    countLabel: '9 Dishes',
    image: BRAND_IMAGES.catSignatureBowls,
    alt: 'Rich savory jollof rice bowl topped with grilled pulled beef, dodo fried plantains, and pickled red onions.',
  },
  {
    id: CategoryId.STREET_BITES,
    name: 'Street Bites',
    countLabel: '12 Dishes',
    image: BRAND_IMAGES.catStreetBites,
    alt: 'Crispy golden meat pies, puff puff pastries, and spicy peppered gizzard appetizers on parchment paper.',
  },
  {
    id: CategoryId.MEAL_COMBOS,
    name: 'Meal Combos',
    countLabel: '8 Bundles',
    image: BRAND_IMAGES.catMealCombos,
    alt: 'Extravagant family combo feast box featuring mixed BBQ ribs, spiced rice, crispy fries, drinks, and assorted dipping sauces.',
  },
  {
    id: CategoryId.SIDES_DRINKS,
    name: 'Sides & Drinks',
    countLabel: '16 Items',
    image: BRAND_IMAGES.catSidesDrinks,
    alt: 'Chilled hibiscus zobo iced drink with fresh mint and citrus alongside seasoned hand cut plantain chips.',
  },
  {
    id: CategoryId.SWEET_TREATS,
    name: 'Sweet Treats',
    countLabel: '6 Desserts',
    image: BRAND_IMAGES.catSweetTreats,
    alt: 'Warm cinnamon sugar puff puff dusted with powdered sugar and caramel glaze dip in artisanal presentation.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Featured 4 Specials from HTML
  {
    id: 'smoky-jollof-fiesta-box',
    name: 'Smoky Jollof Fiesta Box',
    description:
      'Firewood basmati rice, tender grilled pepper chicken, sweet fried dodo, and Chawwit house slaw.',
    longDescription:
      'Long-grain basmati simmered in roasted plum tomato, red bell pepper, and scotch bonnet reduction over seasoned Nigerian hardwood coals. Served steaming hot with char-grilled quarter chicken, golden sweet dodo plantains, and crisp house slaw.',
    category: CategoryId.SIGNATURE_BOWLS,
    priceUsd: 12.99,
    priceNgn: 6500,
    image: BRAND_IMAGES.dishJollofFiesta,
    imageAlt:
      'Nigerian firewood smokey party jollof rice served with grilled chicken, sweet golden plantains, and tossed market salad in a warm modern artisanal bowl.',
    prepTime: '15-20 min',
    heatLevel: HeatLevel.MEDIUM,
    rating: 4.9,
    reviewCount: 428,
    isHalal: true,
    isChefsPick: true,
    isFeaturedSpecial: true,
    calories: 780,
    proteinOptions: ['Grilled Pepper Chicken', 'Charred Beef Suya Strips (+$2.00)', 'Smoked Tofu & Mushroom (Vegan)'],
    availableAddons: [COMMON_ADDONS.dodo, COMMON_ADDONS.yajiDip, COMMON_ADDONS.zobo],
  },
  {
    id: 'suya-glazed-flame-ribs',
    name: 'Suya Glazed Flame Ribs',
    description:
      'Slow-cooked prime short ribs rubbed in northern yaji spice and finished over roaring open flame embers.',
    longDescription:
      'Fall-off-the-bone Halal beef short ribs brined for 12 hours, generously crusted in house-roasted kuli-kuli peanut yaji spice, and seared over live charcoal embers with red onion rings and fresh lime.',
    category: CategoryId.FLAME_GRILLS,
    priceUsd: 16.5,
    priceNgn: 8200,
    image: BRAND_IMAGES.dishSuyaRibs,
    imageAlt:
      'Succulent sticky flame-seared beef ribs coated with peanut suya dry rub and chili glaze, served with red onion rings and lime wedges on dark slate.',
    prepTime: '20-25 min',
    heatLevel: HeatLevel.HOT,
    rating: 5.0,
    reviewCount: 314,
    isHalal: true,
    isChefsPick: true,
    isFeaturedSpecial: true,
    calories: 860,
    proteinOptions: ['Prime Beef Short Ribs', 'Lamb Rack Cutlets (+$3.50)'],
    availableAddons: [COMMON_ADDONS.yajiDip, COMMON_ADDONS.dodo, COMMON_ADDONS.zobo],
  },
  {
    id: 'crispy-golden-wings-platter',
    name: 'Crispy Golden Wings Platter',
    description:
      '8-piece jumbo wings tossed in your choice of Sweet Mango Habanero or Smoky Herb Garlic Butter.',
    longDescription:
      'Double-crisped Halal jumbo chicken wings glazed to order in glossy Sweet Mango Scotch Bonnet or Savory Herb Garlic Butter. Served with spiced potato wedges and roasted garlic dip.',
    category: CategoryId.FLAME_GRILLS,
    priceUsd: 10.99,
    priceNgn: 5400,
    image: BRAND_IMAGES.dishGoldenWings,
    imageAlt:
      'Platter of golden crisp double fried chicken wings tossed in fiery sweet mango scotch bonnet glaze, with seasoned potato wedges and garlic dip.',
    prepTime: '15-18 min',
    heatLevel: HeatLevel.MILD,
    rating: 4.8,
    reviewCount: 586,
    isHalal: true,
    isBestSeller: true,
    isFeaturedSpecial: true,
    calories: 710,
    proteinOptions: ['Sweet Mango Habanero Glaze', 'Smoky Herb Garlic Butter', 'Dry Northern Yaji Rub'],
    availableAddons: [COMMON_ADDONS.dodo, COMMON_ADDONS.slaw, COMMON_ADDONS.zobo],
  },
  {
    id: 'loaded-plantain-beef-poutine',
    name: 'Loaded Plantain & Beef Poutine',
    description:
      'Caramelized dodo cubes topped with braised pulled brisket, molten cheese curd sauce, and fresh herbs.',
    longDescription:
      'Golden ripe plantain cubes layered with 8-hour pepper-braised pulled beef brisket, artisanal molten cheese curds, rich ata-dindin pepper gravy, and spring scallions.',
    category: CategoryId.STREET_BITES,
    priceUsd: 11.5,
    priceNgn: 5800,
    image: BRAND_IMAGES.dishPlantainPoutine,
    imageAlt:
      'Gourmet loaded dish with sweet fried ripe plantain cubes, shredded spiced pulled beef brisket, melted artisanal cheese curds, and rich pepper gravy.',
    prepTime: '15-20 min',
    heatLevel: HeatLevel.SAVORY,
    rating: 4.9,
    reviewCount: 298,
    isHalal: true,
    isDinerFav: true,
    isFeaturedSpecial: true,
    calories: 820,
    proteinOptions: ['Braised Pulled Brisket', 'Spiced Grilled Chicken', 'Jackfruit & Pepper Gravy (Vegan)'],
    availableAddons: [COMMON_ADDONS.cheese, COMMON_ADDONS.yajiDip, COMMON_ADDONS.zobo],
  },

  // Hero Signature Items & Catalogue Expansions
  {
    id: 'smokey-firewood-jollof-suya-platter',
    name: 'Smokey Firewood Jollof & Suya Platter',
    description:
      'Kitchen Signature platter with charcoal hearthbeef suya skewers, firewood party jollof, sweet dodo, and roasted chilies.',
    longDescription:
      'Our flagship hearth feast: aromatic firewood jollof rice paired with two flame-kissed sirloin suya skewers, caramelized sweet plantains, blistered chilies, scallions, and house yaji pepper pot.',
    category: CategoryId.MEAL_COMBOS,
    priceUsd: 17.5,
    priceNgn: 8750,
    originalPriceUsd: 21.0,
    image: BRAND_IMAGES.heroSignaturePlatter,
    imageAlt:
      'Close up gourmet aerial view of Nigerian smoky jollof rice feast served with charred flame-grilled suya skewers, golden fried sweet plantains, roasted chili peppers, and fresh scallions.',
    prepTime: '18-22 min',
    heatLevel: HeatLevel.HOT,
    rating: 5.0,
    reviewCount: 642,
    isHalal: true,
    isChefsPick: true,
    isBestSeller: true,
    calories: 980,
    proteinOptions: ['Sirloin Beef Suya Skewers', 'Ram Suya Special (+$2.50)', 'Chicken Suya Skewers'],
    availableAddons: [COMMON_ADDONS.yajiDip, COMMON_ADDONS.zobo, COMMON_ADDONS.puff],
  },
  {
    id: 'crispy-hot-honey-wings',
    name: 'Crispy Hot Wings (6pc)',
    description:
      'Trending sizzling chicken wings drizzled with glossy spicy honey glaze and toasted sesame seeds.',
    longDescription:
      'Crisp-fried Halal wingettes lacquered in warm scotch-bonnet wildflower honey glaze and finished with toasted white sesame seeds and fresh chives.',
    category: CategoryId.STREET_BITES,
    priceUsd: 8.5,
    priceNgn: 4200,
    image: BRAND_IMAGES.heroHotWings,
    imageAlt:
      'Crispy sizzling golden chicken wings drizzled with glossy spicy honey glaze and toasted sesame seeds in a warm vibrant food photography style.',
    prepTime: '12-15 min',
    heatLevel: HeatLevel.MEDIUM,
    rating: 4.9,
    reviewCount: 410,
    isHalal: true,
    isBestSeller: true,
    calories: 540,
    availableAddons: [COMMON_ADDONS.yajiDip, COMMON_ADDONS.dodo, COMMON_ADDONS.zobo],
  },
  {
    id: 'northern-beef-suya-skewers',
    name: 'Charcoal Beef Suya Skewers',
    description:
      'Three flame-licked sirloin skewers crusted in freshly ground roasted peanut kuli-kuli yaji spice.',
    longDescription:
      'Authentic street-style suya crafted with prime grass-fed beef sirloin, basted in groundnut oil, dusted with fragrant ginger-garlic yaji, and served with crisp cabbage, red onions, and tomatoes.',
    category: CategoryId.FLAME_GRILLS,
    priceUsd: 9.99,
    priceNgn: 5000,
    image: BRAND_IMAGES.catFlameGrills,
    imageAlt:
      'Charred flame grilled beef suya skewers sprinkled with roasted peanut spice on a dark background.',
    prepTime: '14-18 min',
    heatLevel: HeatLevel.EXTRA_SPICY,
    rating: 4.9,
    reviewCount: 375,
    isHalal: true,
    isChefsPick: true,
    calories: 520,
    proteinOptions: ['Prime Beef Sirloin', 'Spiced Chicken Breast', 'King Oyster Mushroom Suya (Vegan)'],
    availableAddons: [COMMON_ADDONS.yajiDip, COMMON_ADDONS.dodo, COMMON_ADDONS.zobo],
  },
  {
    id: 'pulled-brisket-jollof-bowl',
    name: 'Pulled Beef & Dodo Jollof Bowl',
    description:
      'Savory firewood jollof rice bowl crowned with slow-braised pulled beef, sweet dodo, and pickled red onions.',
    longDescription:
      'Built for hearty lunchtime cravings: smoky firewood jollof rice topped with tender pulled Halal brisket, sweet fried plantain coins, tangy house-pickled red onions, and herb oil.',
    category: CategoryId.SIGNATURE_BOWLS,
    priceUsd: 13.5,
    priceNgn: 6800,
    image: BRAND_IMAGES.catSignatureBowls,
    imageAlt:
      'Rich savory jollof rice bowl topped with grilled pulled beef, dodo fried plantains, and pickled red onions.',
    prepTime: '15-18 min',
    heatLevel: HeatLevel.MEDIUM,
    rating: 4.8,
    reviewCount: 249,
    isHalal: true,
    isDinerFav: true,
    calories: 810,
    availableAddons: [COMMON_ADDONS.slaw, COMMON_ADDONS.dodo, COMMON_ADDONS.zobo],
  },
  {
    id: 'vegan-firewood-plantain-bowl',
    name: 'Plant-Based Harvest Jollof Bowl',
    description:
      '100% vegan smoky jollof bowl with charred yaji mushrooms, caramelized plantains, avocado, and market greens.',
    longDescription:
      'Crafted in dedicated plant-based cookware: hardwood-smoked tomato basmati rice paired with flame-seared oyster mushrooms, sweet dodo, ripe avocado slices, and citrus-dressed greens.',
    category: CategoryId.SIGNATURE_BOWLS,
    priceUsd: 11.99,
    priceNgn: 6000,
    image: BRAND_IMAGES.dishJollofFiesta,
    imageAlt: 'Plant-based smoky jollof rice bowl with sweet plantains and fresh market salad.',
    prepTime: '14-18 min',
    heatLevel: HeatLevel.MILD,
    rating: 4.9,
    reviewCount: 192,
    isHalal: true,
    isVegan: true,
    isFeaturedSpecial: true,
    calories: 640,
    availableAddons: [COMMON_ADDONS.dodo, COMMON_ADDONS.yajiDip, COMMON_ADDONS.zobo],
  },
  {
    id: 'lagos-street-bites-trio',
    name: 'Lagos Street Sampler Box',
    description:
      'Flaky artisan beef meat pies, golden puff-puff pastries, and fiery peppered gizzard skewers.',
    longDescription:
      'The ultimate small-chops trio: two butter-crust spiced minced beef pies, six airy golden puff-puff balls, and a generous portion of scotch-bonnet peppered turkey gizzards.',
    category: CategoryId.STREET_BITES,
    priceUsd: 10.5,
    priceNgn: 5250,
    image: BRAND_IMAGES.catStreetBites,
    imageAlt:
      'Crispy golden meat pies, puff puff pastries, and spicy peppered gizzard appetizers on parchment paper.',
    prepTime: '12-16 min',
    heatLevel: HeatLevel.HOT,
    rating: 4.8,
    reviewCount: 334,
    isHalal: true,
    calories: 690,
    availableAddons: [COMMON_ADDONS.yajiDip, COMMON_ADDONS.zobo, COMMON_ADDONS.puff],
  },
  {
    id: 'family-hearth-feast-combo',
    name: 'Chaw Squad Feast Box (Serves 4)',
    description:
      'Mixed Suya ribs, 2 large smoky jollof trays, 12 crispy wings, double sweet dodo, 4 chilled zobos & dips.',
    longDescription:
      'Designed for office lunches, matchdays, and family tables: full rack of suya-glazed ribs, 12 mango-habanero & garlic wings, double tray of firewood jollof, sweet plantains, house slaw, and 4 bottles of mint hibiscus zobo.',
    category: CategoryId.MEAL_COMBOS,
    priceUsd: 44.99,
    priceNgn: 22500,
    originalPriceUsd: 56.0,
    image: BRAND_IMAGES.catMealCombos,
    imageAlt:
      'Extravagant family combo feast box featuring mixed BBQ ribs, spiced rice, crispy fries, drinks, and assorted dipping sauces.',
    prepTime: '22-28 min',
    heatLevel: HeatLevel.MEDIUM,
    rating: 5.0,
    reviewCount: 215,
    isHalal: true,
    isChefsPick: true,
    calories: 3240,
    availableAddons: [COMMON_ADDONS.puff, COMMON_ADDONS.yajiDip, COMMON_ADDONS.dodo],
  },
  {
    id: 'hibiscus-zobo-plantain-chips',
    name: 'Chilled Mint Zobo & Plantain Crisps',
    description:
      'Cold-brewed hibiscus flower refresher infused with ginger, pineapple, and mint alongside sea-salt plantain chips.',
    longDescription:
      'Steeped daily with dried hibiscus calyces, crushed fresh ginger root, ripe pineapple peel, and cooling spearmint. Paired with crunch-kettle green & ripe plantain crisps.',
    category: CategoryId.SIDES_DRINKS,
    priceUsd: 5.5,
    priceNgn: 2750,
    image: BRAND_IMAGES.catSidesDrinks,
    imageAlt:
      'Chilled hibiscus zobo iced drink with fresh mint and citrus alongside seasoned hand cut plantain chips.',
    prepTime: '5-8 min',
    heatLevel: HeatLevel.MILD,
    rating: 4.9,
    reviewCount: 490,
    isHalal: true,
    isVegan: true,
    calories: 260,
    availableAddons: [COMMON_ADDONS.dodo],
  },
  {
    id: 'spiced-scotch-bonnet-dodo',
    name: 'Artisan Peppered Dodo Bites',
    description:
      'Golden caramelized ripe plantains tossed in glossy scotch bonnet pepper glaze and sea salt flakes.',
    longDescription:
      'Hand-cut ripe plantains fried to ruby-gold sweetness and wok-tossed with roasted red bell pepper, aromatic onions, scotch bonnet glaze, and flaky sea salt.',
    category: CategoryId.SIDES_DRINKS,
    priceUsd: 5.99,
    priceNgn: 3000,
    image: BRAND_IMAGES.promoPlantainBackdrop,
    imageAlt:
      'Freshly made golden fried plantains tossed with spicy scotch bonnet pepper sauce and sea salt flakes.',
    prepTime: '10-12 min',
    heatLevel: HeatLevel.HOT,
    rating: 4.9,
    reviewCount: 318,
    isHalal: true,
    isVegan: true,
    calories: 340,
    availableAddons: [COMMON_ADDONS.yajiDip, COMMON_ADDONS.zobo],
  },
  {
    id: 'cinnamon-puff-puff-caramel',
    name: 'Warm Cinnamon Puff-Puff & Caramel',
    description:
      '8 pillowy West African spiced dough spheres dusted in cinnamon sugar with warm salted caramel dip.',
    longDescription:
      'Made to order so they arrive cloud-soft and warm: nutmeg-kissed artisan puff-puff rolled in Ceylon cinnamon sugar and paired with velvety salted palm-caramel dipping sauce.',
    category: CategoryId.SWEET_TREATS,
    priceUsd: 6.5,
    priceNgn: 3250,
    image: BRAND_IMAGES.catSweetTreats,
    imageAlt:
      'Warm cinnamon sugar puff puff dusted with powdered sugar and caramel glaze dip in artisanal presentation.',
    prepTime: '10-14 min',
    heatLevel: HeatLevel.MILD,
    rating: 5.0,
    reviewCount: 402,
    isHalal: true,
    isDinerFav: true,
    calories: 480,
    availableAddons: [COMMON_ADDONS.zobo],
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'vi-lagos',
    name: 'Victoria Island, Lagos',
    hub: 'VI Adeola Odeku Hearth Hub',
    avgMinutes: 24,
    deliveryFeeUsd: 2.5,
    deliveryFeeNgn: 1200,
    kitchenStatus: 'Open & Sizzling',
  },
  {
    id: 'lekki-1',
    name: 'Lekki Phase 1, Lagos',
    hub: 'Admiralty Way Flame Kitchen',
    avgMinutes: 23,
    deliveryFeeUsd: 2.5,
    deliveryFeeNgn: 1200,
    kitchenStatus: 'Open & Sizzling',
  },
  {
    id: 'ikeja-gra',
    name: 'Ikeja GRA, Lagos',
    hub: 'Isaac John Charcoal Hub',
    avgMinutes: 25,
    deliveryFeeUsd: 2.0,
    deliveryFeeNgn: 1000,
    kitchenStatus: 'Open & Sizzling',
  },
  {
    id: 'ikoyi',
    name: 'Ikoyi, Lagos',
    hub: 'Awolowo Rd Express Hearth',
    avgMinutes: 22,
    deliveryFeeUsd: 2.5,
    deliveryFeeNgn: 1200,
    kitchenStatus: 'Open & Sizzling',
  },
  {
    id: 'yaba',
    name: 'Yaba Tech District, Lagos',
    hub: 'Mainland Express Grill',
    avgMinutes: 27,
    deliveryFeeUsd: 1.75,
    deliveryFeeNgn: 900,
    kitchenStatus: 'High Demand • Fast Dispatch',
  },
];

export const PROMO_DEALS: PromoDeal[] = [
  {
    code: 'CHAWWIT35',
    title: 'Midweek Munchies Special',
    subtitle: 'Free Artisan Peppered Plantain Bites',
    description:
      'Get a complimentary portion of artisan caramelized plantain bites ($5.99 value) + $4.00 off with every food order over $35. Fresh, hot, and seasoned to perfection.',
    badge: 'Limited Promo',
    minOrderUsd: 35,
    flatDiscountUsd: 4.0,
    freeItemBonus: 'Free Artisan Caramelized Plantain Bites',
    expiryText: 'Valid daily until 11:30 PM WAT',
    image: BRAND_IMAGES.promoPlantainBackdrop,
  },
  {
    code: 'FLAME20',
    title: "Today's Hot Deals — Save 20%",
    subtitle: '20% Off All Flame Grills & Combos',
    description:
      'Enjoy 20% instant savings when your basket reaches $20 or more. Valid across our Suya Glazed Ribs, Firewood Jollof Platters, and Squad Combos.',
    badge: 'Save 20%',
    minOrderUsd: 20,
    discountPercent: 20,
    expiryText: 'Active today in Victoria Island & Ikeja',
    image: BRAND_IMAGES.heroSignaturePlatter,
  },
  {
    code: 'FIRSTCHAW',
    title: 'Welcome to the Hearth Perk',
    subtitle: '$5.00 Off + Free Priority Thermal Dispatch',
    description:
      'First time ordering on Chawwit Web? Knock $5.00 off any order above $25 with guaranteed 25-minute thermal eco-box delivery.',
    badge: 'New Foodie',
    minOrderUsd: 25,
    flatDiscountUsd: 5.0,
    expiryText: 'No-expiry welcome reward',
    image: BRAND_IMAGES.dishSuyaRibs,
  },
];

// Initial 3 items totaling exact $42.50 ($17.50 + $16.50 + $8.50 = $42.50) to match header "3 items • $42.50"
export const INITIAL_CART_ITEMS = [
  {
    cartItemId: 'init-1',
    dish: MENU_ITEMS.find((i) => i.id === 'smokey-firewood-jollof-suya-platter')!,
    quantity: 1,
    selectedHeat: HeatLevel.HOT,
    selectedProtein: 'Sirloin Beef Suya Skewers',
    selectedAddons: [],
  },
  {
    cartItemId: 'init-2',
    dish: MENU_ITEMS.find((i) => i.id === 'suya-glazed-flame-ribs')!,
    quantity: 1,
    selectedHeat: HeatLevel.HOT,
    selectedProtein: 'Prime Beef Short Ribs',
    selectedAddons: [],
  },
  {
    cartItemId: 'init-3',
    dish: MENU_ITEMS.find((i) => i.id === 'crispy-hot-honey-wings')!,
    quantity: 1,
    selectedHeat: HeatLevel.MEDIUM,
    selectedAddons: [],
  },
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'CHW-8492',
    placedAt: 'Today, 12:42 PM',
    estimatedMinutes: 19,
    deliveryMode: 'delivery',
    addressLabel: '14B Adeola Odeku St, Victoria Island, Lagos',
    paymentMethod: 'Paystack',
    items: [
      {
        cartItemId: 'ord-item-1',
        dish: MENU_ITEMS[0],
        quantity: 2,
        selectedHeat: HeatLevel.MEDIUM,
        selectedProtein: 'Grilled Pepper Chicken',
        selectedAddons: [COMMON_ADDONS.zobo],
      },
      {
        cartItemId: 'ord-item-2',
        dish: MENU_ITEMS[1],
        quantity: 1,
        selectedHeat: HeatLevel.HOT,
        selectedProtein: 'Prime Beef Short Ribs',
        selectedAddons: [],
      },
    ],
    subtotalUsd: 49.48,
    discountUsd: 4.0,
    deliveryFeeUsd: 2.5,
    totalUsd: 47.98,
    totalNgn: 23990,
    appliedCoupon: 'CHAWWIT35',
    freeBonusItem: 'Free Artisan Caramelized Plantain Bites',
    statusStep: OrderStatusStep.GRILLING,
    courierName: 'Musa Ibrahim',
    courierBikeId: 'Thermal Bike #VI-104',
    courierPhone: '+234 803 555 0194',
  },
];

export const INITIAL_USER_PROFILE: UserProfileData = {
  fullName: 'Tunde Oladipo',
  email: 'tunde.oladipo@lagostech.ng',
  phone: '+234 809 412 8830',
  avatar: BRAND_IMAGES.avatar,
  preferredHeat: HeatLevel.HOT,
  flamePoints: 1420,
  ordersCount: 14,
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Office • Victoria Island',
      street: '14B Adeola Odeku Street, Floor 4, Victoria Island',
      zoneId: 'vi-lagos',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Home • Lekki Phase 1',
      street: '22B Fola Osibo Rd, Lekki Phase 1',
      zoneId: 'lekki-1',
      isDefault: false,
    },
    {
      id: 'addr-3',
      label: 'Studio • Ikeja GRA',
      street: '8 Isaac John Street, Ikeja GRA',
      zoneId: 'ikeja-gra',
      isDefault: false,
    },
  ],
};
