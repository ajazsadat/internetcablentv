import { SITE } from '@/lib/site';

/** Feature rows for the side-by-side table, in display order. */
export const COMPARISON_FEATURES = [
  'Network type',
  'Speed (max)',
  'Upload speeds',
  'Starting price',
  'Price guarantee',
  'Contracts',
  'Data caps',
  'Coverage',
  'Bundles / discounts',
  'Best for',
];

/** Column order is fixed; `name` is matched against `highlight` to tint a column. */
export const COMPARISON_COLUMNS = [
  {
    name: 'AT&T Fiber',
    values: [
      'Fiber to the home',
      'Up to 5 Gbps (select areas)',
      'Symmetrical on many fiber plans',
      'From about $55/mo where available',
      'Often fewer increases; no annual contract on many plans',
      'No contracts on many fiber plans',
      'No data caps on many fiber plans',
      'Only where fiber has been built out',
      'Wireless bundle discounts on some offers',
      'Performance and heavy uploads',
    ],
  },
  {
    name: 'Verizon Fios',
    values: [
      '100% fiber-optic',
      'Up to 2 Gbps (select areas)',
      'Symmetrical on most tiers',
      'From about $50/mo where available',
      'Multi-year price guarantees on many offers',
      'No annual contract on many plans',
      'No data caps',
      'Northeast and Mid-Atlantic footprint',
      'Verizon mobile bundle discounts',
      'Upload-heavy work and gaming',
    ],
  },
  {
    name: 'Xfinity (Comcast)',
    values: [
      'Cable, fiber in select areas',
      'Up to 2 Gbps (select areas)',
      'Lower than download on cable',
      'From about $30/mo where available',
      'Some plans offer multi-year price locks',
      'No annual contracts on many newer offers',
      'Caps on many plans unless unlimited add-on',
      'Strong in many cable markets',
      'Strong internet + mobile/TV bundling',
      'Coverage plus bundling deals',
    ],
  },
  {
    name: 'Spectrum (Charter)',
    values: [
      'Cable',
      'Up to 1 Gbps (select areas)',
      'Lower than download on cable',
      'From about $30/mo where available',
      'Fewer long-term price locks',
      'No contracts on many plans',
      'No data caps on many plans',
      'Good coverage in many cable markets',
      'Fewer bundle advantages than peers',
      'Budget and simple plans',
    ],
  },
  {
    name: 'Cox',
    values: [
      'Cable, fiber in select areas',
      'Up to 2 Gbps (select areas)',
      'Lower than download on cable',
      'From about $40/mo where available',
      'Promo pricing, limited long-term locks',
      'Term and no-term options by market',
      'Monthly allowance on many plans; unlimited add-on',
      'About 18 states',
      'Internet, TV, phone and security bundles',
      'Bundled households in Cox markets',
    ],
  },
];

/** Generic editorial rows shared by every provider page. */
function baseSections(name) {
  return [
    {
      title: 'Built for everyday household use',
      body: `Speeds and features vary by address. Compare ${name} options for streaming, remote work, and multi-device homes — then confirm availability before you enroll.`,
    },
    {
      title: `What to know about ${name}`,
      body: `${SITE.brandFull} helps you review ${name} plan types side by side with other providers. Network performance, installation, and billing remain with ${name}.`,
    },
    {
      title: 'Compare before you commit',
      body: 'We’ll walk through typical pricing ranges, promo windows, and equipment notes so you understand the full picture — then you complete signup directly with the provider.',
    },
  ];
}

const SPECTRUM = {
  name: 'Spectrum',
  slug: 'spectrum-plans',
  metaTitle: 'Spectrum Internet & Cable Plans',
  metaDescription: `Compare Spectrum internet and cable plans with ${SITE.brandFull} — an independent comparison and referral service. Call ${SITE.phoneDisplay} to review options for your address.`,
  heroTitle: 'Compare Spectrum internet and cable plans',
  tagline:
    'Widely available cable internet with straightforward plan tiers — compared independently against every other provider serving your address.',
  heroStats: [
    { label: 'Network', value: 'Cable' },
    { label: 'Top speed', value: 'Up to 1 Gbps' },
    { label: 'Starting at', value: '$30/mo*' },
  ],
  introTitle: 'Compare Spectrum internet packages — independent comparison',
  comparisonHighlight: 'Spectrum (Charter)',
  topicTabs: [
    { label: 'About Spectrum', href: '#overview' },
    { label: 'Internet', href: '#internet' },
    { label: 'TV', href: '#tv' },
    { label: 'Side by side', href: '#compare' },
    { label: 'FAQ', href: '#faq' },
  ],
  benefits: [
    'Wide availability across many markets',
    'No data caps on many plans',
    'Often no long-term contract required',
    'Modem included on featured packages',
    'Simple, easy-to-compare plan tiers',
  ],
  interestOptions: ['Spectrum Internet', 'Spectrum TV bundle', 'Compare all providers'],
  plans: [
    {
      name: 'Spectrum Advantage',
      price: '30',
      speed: 'Up to 100 Mbps download, 10 Mbps upload',
      features: ['Entry-level for browsing and email', 'No term contract required', 'Modem included'],
    },
    {
      name: 'Spectrum Premier',
      price: '50',
      speed: 'Up to 500 Mbps download, 20 Mbps upload',
      features: ['HD streaming and moderate gaming', 'No term contract required', 'Modem included'],
    },
    {
      name: 'Spectrum Gig',
      price: '70',
      speed: 'Up to 1,000 Mbps download, around 35 Mbps upload',
      features: ['Heavy users and 4K streaming', 'No term contract required', 'Modem included'],
    },
  ],
  sectionsTitle: 'Spectrum in context',
  contentSections: [
    ...baseSections('Spectrum'),
    {
      title: 'Cable coverage that reaches more homes',
      body: `Spectrum’s cable footprint covers many neighborhoods where fiber hasn’t arrived yet. ${SITE.brandFull} helps you compare Spectrum speeds and promotions against other providers at your ZIP code.`,
    },
  ],
  glance: {
    title: 'Spectrum services at a glance',
    intro:
      'Spectrum offers a range of services to meet everyday household needs. Here are the four key areas we highlight.',
    items: [
      {
        title: 'High-speed internet',
        icon: 'internet',
        body: 'Reliable internet with speeds starting around 100 Mbps, capable of supporting streaming, gaming, smart-home devices, and remote work. Higher tiers are available in select areas for heavier households.',
      },
      {
        title: 'Cable TV',
        icon: 'tv',
        body: 'A wide selection of channels, on-demand shows, and entertainment packages. Flexible bundles let viewers pick content that matches their lifestyle.',
      },
      {
        title: 'Home phone',
        icon: 'phone',
        body: 'Nationwide calling, voicemail, and dependable connections make Spectrum’s phone service a practical option for households that prefer a traditional home line.',
      },
      {
        title: 'Spectrum Mobile',
        icon: 'mobile',
        body: 'Spectrum Mobile runs on advanced wireless infrastructure to deliver 5G connectivity. Introductory promotions may add savings for new customers in select areas.',
      },
    ],
  },
  offerTerms: [
    {
      title: 'Offer & pricing details',
      body: 'Promotional pricing may apply for a limited time and is subject to change. After the promotional period, standard rates may apply.',
    },
    {
      title: 'Eligibility',
      body: 'Offers may be available to new residential customers only and may not be available in all areas. Certain multi-dwelling units may not qualify.',
    },
    {
      title: 'Fees & taxes',
      body: 'Installation fees, equipment charges, and applicable taxes may apply. Pricing excludes taxes and surcharges unless otherwise stated.',
    },
    {
      title: 'Speeds & performance',
      body: 'Speeds shown are maximum wired download speeds and are not guaranteed. Actual speeds vary by address, equipment, and network conditions.',
    },
    {
      title: 'Trademarks',
      body: SITE.providerTrademarkNote('Spectrum'),
    },
  ],
  faqs: [
    {
      q: 'Do you sell Spectrum service?',
      a: `No. ${SITE.brandFull} does not sell Spectrum packages or manage Spectrum accounts. We’re an independent comparison and referral service — our role is to help you explore options and understand what may be available in your area.`,
    },
    {
      q: `What makes ${SITE.brandFull} different?`,
      a: 'We’re an independent comparison platform. We look across multiple providers — including Spectrum — based on coverage, plan types, and overall fit for your household, instead of pushing a single carrier.',
    },
    {
      q: 'Can you help me compare providers in my area?',
      a: `Yes. Our team can walk you through internet, TV, and phone options that may be available near you, including Spectrum and other major providers. Call ${SITE.phoneDisplay} and we’ll help you compare what’s realistic for your address.`,
    },
    {
      q: 'Do you provide pricing or promotions for Spectrum?',
      a: 'We don’t sell Spectrum service or publish official Spectrum pricing. Any starting prices or promotions mentioned on this site are for general reference only and can change by location and offer period.',
    },
    {
      q: 'Does Spectrum require a contract?',
      a: 'Many Spectrum internet plans are offered without an annual term contract. Terms differ by offer and market, so confirm the current contract requirements with Spectrum before you enroll.',
    },
  ],
};

const XFINITY = {
  name: 'Xfinity',
  slug: 'xfinity-plans',
  metaTitle: 'Xfinity Internet & Cable Plans',
  metaDescription: `Compare Xfinity internet and cable plans with ${SITE.brandFull} — an independent comparison and referral service. Call ${SITE.phoneDisplay} to review options for your address.`,
  heroTitle: 'Compare Xfinity internet and cable plans',
  tagline:
    'Independent comparison of Xfinity internet packages for streaming, work, and gaming — reviewed alongside every other provider at your address.',
  heroStats: [
    { label: 'Network', value: 'Cable + fiber' },
    { label: 'Top speed', value: 'Up to 2 Gbps' },
    { label: 'Starting at', value: '$35/mo*' },
  ],
  introTitle: 'Compare Xfinity internet packages — independent comparison',
  comparisonHighlight: 'Xfinity (Comcast)',
  topicTabs: [
    { label: 'About Xfinity', href: '#overview' },
    { label: 'Internet', href: '#internet' },
    { label: 'TV & bundles', href: '#tv' },
    { label: 'Side by side', href: '#compare' },
    { label: 'FAQ', href: '#faq' },
  ],
  benefits: [
    'Speed tiers for streaming, gaming and work',
    'Wide availability in many U.S. markets',
    'Frequent promotional pricing for new customers',
    'Advanced WiFi coverage and equipment options',
    'Internet, TV, mobile and security on one bill',
  ],
  interestOptions: [
    'Xfinity Internet',
    'Xfinity TV bundle',
    'Xfinity Mobile',
    'Compare all providers',
  ],
  plans: [
    {
      name: '50 Mbps*',
      price: '35',
      speed: 'Up to 50 Mbps download — browsing, email and video calls',
      features: ['Small households, up to 4 devices', 'Stream, video conference and download'],
    },
    {
      name: '300 Mbps*',
      price: '50',
      speed: 'Up to 300 Mbps download — everyday streaming and browsing',
      features: ['Supports around 5 devices', 'Everyday streaming and downloads'],
    },
    {
      name: '500 Mbps*',
      price: '60',
      speed: 'Up to 500 Mbps download — multi-device homes',
      features: ['Connect up to 8 devices', 'Streaming plus video conferencing'],
    },
    {
      name: '1000 Mbps*',
      price: '70',
      speed: 'Up to 1000 Mbps download — heavy downloads',
      features: ['Supports 12+ devices', 'Fast large-file downloads'],
    },
    {
      name: '1200 Mbps*',
      price: '80',
      speed: 'Up to 1200 Mbps download — 15+ devices',
      features: ['HD on multiple screens at once', 'Headroom for smart-home devices'],
    },
    {
      name: '2000 Mbps*',
      price: '100',
      speed: 'Up to 2000 Mbps download — heaviest use',
      features: ['Multi-gig tier in select markets', 'Streaming and gaming without contention'],
    },
  ],
  sectionsTitle: 'Xfinity in context',
  contentSections: [
    ...baseSections('Xfinity'),
    {
      title: 'Cable plus fiber in select neighborhoods',
      body: 'Xfinity runs primarily on cable, with fiber-powered tiers in some areas. That mix means the plans offered at your street can differ from the ones advertised city-wide — worth confirming before you commit.',
    },
  ],
  glance: {
    title: 'Xfinity services at a glance',
    intro:
      'Xfinity bundles several household services onto one account. These are the four areas we help you weigh most often.',
    items: [
      {
        title: 'High-speed internet',
        icon: 'internet',
        body: 'Cable tiers spanning entry-level speeds through multi-gig in select markets, with fiber-powered options in some neighborhoods. Suitable for streaming, gaming, and multi-device households.',
      },
      {
        title: 'Cable TV & streaming',
        icon: 'tv',
        body: 'Channel packages, on-demand libraries, and the X1 platform with DVR options. Streaming apps are integrated into the box on many packages.',
      },
      {
        title: 'Xfinity Mobile',
        icon: 'mobile',
        body: 'Mobile lines that can attach to an existing internet account, often with per-line discounts for internet customers. Availability and pricing depend on the current offer.',
      },
      {
        title: 'Home security',
        icon: 'shield',
        body: 'Professionally monitored packages with cameras, sensors, and app control. Equipment costs and monitoring terms vary by package.',
      },
    ],
  },
  offerTerms: [
    {
      title: 'Offer & pricing details',
      body: 'Promotional pricing may apply for a limited time and is subject to change. After the promotional period, standard rates may apply.',
    },
    {
      title: 'Eligibility',
      body: 'Offers may be available to new residential customers only and may not be available in all areas. Certain multi-dwelling units may not qualify.',
    },
    {
      title: 'AutoPay & paperless billing',
      body: 'Monthly discounts may apply when enrolled in AutoPay and paperless billing. Discount amounts may vary depending on payment method.',
    },
    {
      title: 'Fees & taxes',
      body: 'Installation fees, equipment charges, and applicable taxes may apply. Pricing excludes taxes and surcharges unless otherwise stated.',
    },
    {
      title: 'Speeds & performance',
      body: 'Speeds shown are maximum wired download speeds and are not guaranteed. Actual speeds vary by address, equipment, and network conditions.',
    },
    {
      title: 'Trademarks',
      body: SITE.providerTrademarkNote('Xfinity, Comcast,'),
    },
  ],
  faqs: [
    {
      q: 'What is Xfinity Internet?',
      a: 'Xfinity provides internet, TV, phone, mobile, and home security options across many U.S. markets. Plan types, speeds, and pricing vary by location. Our team can help you understand which options may be available near you.',
    },
    {
      q: 'Is Xfinity different from Comcast?',
      a: 'Comcast uses Xfinity as its consumer brand for services such as internet, TV, mobile, and home security. When people say “Xfinity” or “Comcast” for home internet, they’re usually referring to the same provider family.',
    },
    {
      q: 'How do I sign up for Xfinity?',
      a: `You can start online, through Xfinity’s own tools, or with help from our team. Call ${SITE.phoneDisplay} and we’ll walk you through comparing plans and checking availability. Signup and installation are completed with Xfinity — not managed as an account by ${SITE.brandFull}.`,
    },
    {
      q: 'Are there any Xfinity deals for new customers?',
      a: 'Xfinity periodically runs promotions on internet, TV, and bundles. Offers change by market and may require AutoPay or other terms. Confirm eligibility and final pricing directly with Xfinity.',
    },
    {
      q: 'Can I combine Xfinity services in a bundle?',
      a: 'Yes. Internet can often be combined with TV, phone, and/or mobile, which may simplify billing and unlock package pricing. Bundle mix depends on what’s offered at your address.',
    },
    {
      q: 'Do Xfinity plans include equipment and apps?',
      a: 'Many Xfinity plans include or rent gateway/modem equipment, and TV packages may include set-top boxes or streaming apps depending on the offer. Exact inclusions vary by plan and location.',
    },
  ],
};

export const PROVIDER_CONTENT = {
  'spectrum-plans': SPECTRUM,
  'xfinity-plans': XFINITY,
};

export function getProviderContent(slug) {
  return PROVIDER_CONTENT[slug];
}
