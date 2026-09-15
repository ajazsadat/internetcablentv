export const SITE = {
  brand: 'Internet Cable N TV',
  brandFull: 'Internet Cable N TV',
  legalName: 'Fico Tech LLC',
  domain: 'internetcablentv.com',
  phoneDisplay: '(888) 238-0951',
  phoneTel: '8882380951',
  email: 'info@internetcablentv.com',
  addressLine1: '1309 Coffeen Avenue STE 1200',
  addressLine2: 'Sheridan, WY 82801, US',

  get addressOneLine() {
    return `${this.addressLine1}, ${this.addressLine2}`;
  },
  get operatedByLabel() {
    return `${this.brandFull} (operated by ${this.legalName})`;
  },

  topDisclaimer: `Internet Cable N TV is operated by Fico Tech LLC, an independent reseller. We do not provide, install, or bill for internet or TV services. All services are fulfilled and billed by licensed third-party providers.`,

  whyChooseIntro:
    'We help you compare internet and TV plans from leading and trusted providers available in your area.',

  /**
   * Google Ads misrepresentation policy: provider pages may never imply an
   * official relationship, and must state that account support stays with the
   * carrier.
   */
  providerStatusDisclaimer(providerName) {
    return `Internet Cable N TV is an independent comparison service operated by ${this.legalName}. We do not provide ${providerName} customer service or manage ${providerName} accounts. All service support is handled directly by ${providerName}.`;
  },
  providerHeaderDisclaimer(providerName) {
    return `${this.whyChooseIntro} ${this.providerStatusDisclaimer(providerName)}`;
  },
  providerTrademarkNote(providerName) {
    return `${providerName} and related marks are trademarks of their respective owners and are used here for identification and comparison only.`;
  },

  preFooterDisclaimer: `Internet Cable N TV is operated by Fico Tech LLC, an independent marketing company that helps consumers explore internet, TV, and wireless service options. We do not own, operate, or provide telecommunications, internet, or TV services. All services advertised here are provided, installed, billed, and supported by licensed third-party providers, not by Fico Tech LLC. Our role is limited to marketing and helping consumers identify available options.`,

  footerBlurb: `Internet Cable N TV is operated by Fico Tech LLC, an independent reseller helping households compare internet, TV, and bundle options. We do not own or operate any network.`,

  comparePageDisclosure: `Internet Cable N TV (operated by Fico Tech LLC) is an independent comparison and referral service. We compare internet and TV plans available in your area. We do not sell or manage carrier accounts directly. We are not owned, operated, or controlled by any internet service provider (ISP) or carrier. For billing or existing account support, please contact your provider directly.`,

  connectPageDisclosure: `Internet Cable N TV (operated by Fico Tech LLC) is an independent comparison and referral service. We do not own or operate any internet network and do not provide carrier account support. For billing, outages, or technical issues with an existing service, contact your provider through their official channels.`,

  consentCopy: `By checking this box, I agree to receive calls, texts, and emails — including by autodialer or prerecorded message — about service options from Internet Cable N TV (operated by Fico Tech LLC), providers, and marketing partners. Consent is not required to purchase. Message and data rates may apply. Reply STOP to opt out at any time.`,
};

/** Powers the Providers dropdown, the footer, and the sitemap. */
export const PROVIDERS = [
  {
    name: 'Spectrum',
    href: '/spectrum-plans',
    blurb: 'Wide cable coverage with simple plan tiers',
    tech: 'Cable',
  },
  {
    name: 'Xfinity',
    href: '/xfinity-plans',
    blurb: 'Cable and fiber-powered speeds up to 2 Gbps',
    tech: 'Cable + fiber',
  },
];

/** Primary navigation, mirroring the reference site's shape. */
export const NAV = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Why Choose Us', href: '/#choose-us' },
  { name: 'Contact Us to Compare', href: '/contact-us-to-compare' },
  { name: 'Contact', href: '/contact' },
];

export const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Billing & Refunds', href: '/refund-policy' },
  { name: 'Disclaimer', href: '/disclaimer' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
  { name: 'Reseller Disclosure', href: '/reseller-disclosure' },
  { name: 'TCPA Consent', href: '/tcpa-consent' },
  { name: 'Do Not Sell', href: '/do-not-sell-my-info' },
];

export const FOOTER_EXPLORE = [
  { name: 'Home', href: '/' },
  ...PROVIDERS.map((p) => ({ name: `${p.name} Plans`, href: p.href })),
  { name: 'Contact Us to Compare', href: '/contact-us-to-compare' },
  { name: 'Compare Internet Options', href: '/compare-internet-options' },
  { name: 'How it works', href: '/#how-it-works' },
  { name: 'Services', href: '/#services' },
  { name: 'Why choose us', href: '/#choose-us' },
  { name: 'Contact', href: '/contact' },
  { name: 'Get a quote', href: '/#quote' },
];

/**
 * The two compare landing pages. They render their own chrome, so the shared
 * header, footer, and pre-footer disclaimer all opt out.
 *
 * /contact-us-to-compare is the one linked from the main nav;
 * /compare-internet-options is the one the provider pages link to.
 */
export const CHROMELESS_PATHS = new Set([
  '/contact-us-to-compare',
  '/compare-internet-options',
]);

/** Provider pages swap the header strip for the carrier-specific disclaimer. */
export const PROVIDER_BY_PATH = {
  '/spectrum-plans': 'Spectrum',
  '/xfinity-plans': 'Xfinity',
};

export function getHousePhone() {
  return { display: SITE.phoneDisplay, tel: SITE.phoneTel };
}

/**
 * Per-provider tracking numbers would go here; everything not listed falls back
 * to the house line so the two lookups below can't drift apart.
 */
const PHONE_BY_PROVIDER = {};

export function getPhoneForProvider(providerName) {
  return PHONE_BY_PROVIDER[providerName] || getHousePhone();
}

export function getPhoneForPath(pathname) {
  const provider = PROVIDER_BY_PATH[pathname || ''];
  return provider ? getPhoneForProvider(provider) : getHousePhone();
}
