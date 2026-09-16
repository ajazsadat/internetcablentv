import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { SITE, getHousePhone } from '@/lib/site';

export const metadata = {
  alternates: { canonical: '/' },
};

const STEPS = [
  {
    num: '01 / CALL',
    title: 'Tell us how you connect',
    body: 'Share what matters: streaming, work-from-home, wireless only, or a TV bundle.',
  },
  {
    num: '02 / MATCH',
    title: 'We check your address',
    body: 'Availability is local. We confirm what can actually be installed where you live.',
  },
  {
    num: '03 / CONNECT',
    title: 'Hand off to the provider',
    body: 'You enroll with the provider you choose. They handle install, billing, and support.',
  },
];

const SERVICES = [
  {
    tag: 'Home',
    title: 'Home Internet',
    body: 'Steady connections for everyday streaming, browsing, and working from home.',
  },
  {
    tag: 'Wireless',
    title: 'Wireless Internet',
    body: 'When cable lines aren’t an option, compare fixed wireless plans built for homes.',
  },
  {
    tag: 'Speed',
    title: 'Fiber Internet',
    body: 'Higher bandwidth for multi-device homes, uploads, and heavy streaming.',
  },
  {
    tag: 'Business',
    title: 'Business Internet',
    body: 'Plans sized for storefronts, offices, and teams that can’t afford downtime.',
  },
  {
    tag: 'Bundle',
    title: 'TV Bundles',
    body: 'Pair internet and TV to simplify the monthly statement when it makes sense.',
  },
  {
    tag: 'Voice',
    title: 'Home Phone',
    body: 'Add dependable phone service alongside your internet in one conversation.',
  },
];

const PILLARS = [
  {
    title: 'Nationwide comparison',
    body: 'From metro high-rises to rural routes, we compare what the major providers can actually install at your address — and keep the conversation human.',
  },
  {
    title: 'Current offers only',
    body: 'Promotions change constantly. We check pricing and availability at the time of your call, so you aren’t quoted a plan that expired last month.',
  },
  {
    title: 'No pretending to be the carrier',
    body: `${SITE.brandFull} is an independent reseller. We tell you up front who bills you, who installs, and who supports the line once you enroll.`,
  },
];

const FAQS = [
  {
    q: 'What happens after I submit the form?',
    a: 'We review your details and follow up with plan options available for your address and selected service.',
  },
  {
    q: 'Are you an internet provider?',
    a: `No. ${SITE.brandFull} is operated by ${SITE.legalName}, an independent reseller. Your chosen provider handles installation, billing, and support.`,
  },
  {
    q: 'Can I request more than one service?',
    a: 'Yes. Note internet and TV (or other combos) in your message and we’ll include them in the request.',
  },
  {
    q: 'Is the ZIP code required?',
    a: 'Yes. ZIP codes help confirm which plans and providers are actually available at your address.',
  },
  {
    q: 'Can I opt out after submitting?',
    a: 'Yes. Reply STOP to texts or contact us anytime. Opting out won’t affect existing service with a provider.',
  },
];

export default function HomePage() {
  const phone = getHousePhone();

  return (
    <main id="main">
      <section className="hero" aria-label="Hero">
        <div className="hero-media" aria-hidden="true">
          <Image src="/assets/images/hero-home.jpg" alt="" width={1920} height={1080} priority />
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-brand">
            <Image src="/assets/images/logo-mark.svg" width={48} height={48} alt="" priority />
            <span>{SITE.brandFull}</span>
          </div>
          <h1>Find a plan that fits your street — not a national average.</h1>
          <p>
            We compare internet, TV, and bundles available at your address, then connect you with
            the provider that matches.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={`tel:${phone.tel}`}>
              Call {phone.display}
            </a>
            <Link className="btn btn-ghost" href="/contact-us-to-compare">
              Contact us to compare
            </Link>
          </div>
        </div>
      </section>

      <section className="section process" id="how-it-works">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>Three steps. One clearer choice.</h2>
            <p>No dashboard clutter — just a straight path from your address to an available plan.</p>
          </div>
          <div className="process-track">
            {STEPS.map((step, index) => (
              <Reveal as="article" key={step.num} className="process-item" delay={index * 90}>
                <div className="process-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Services</p>
            <h2>What we help you compare</h2>
            <p>Browse the options we routinely match — then call to see what shows up for your ZIP.</p>
          </div>
          <div className="services-list">
            {SERVICES.map((service, index) => (
              <Reveal
                as="article"
                key={service.title}
                className="service-row"
                delay={Math.min(index, 3) * 70}
              >
                <div className="service-tag">{service.tag}</div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="choose-us">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Why choose us</p>
            <h2>Why customers choose us</h2>
            <p>
              One call, an honest read on what’s available, and a clean hand-off to the provider you
              pick.
            </p>
          </div>
          <div className="pillars">
            {PILLARS.map((pillar, index) => (
              <Reveal as="article" key={pillar.title} className="pillar" delay={index * 90}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote" id="quote">
        <div className="wrap quote-grid">
          <div className="quote-aside">
            <div className="section-head">
              <p className="eyebrow">Get a quote</p>
              <h2>Get A Quote</h2>
              <p>
                Share a few details and we’ll follow up with options available near you. Prefer to
                talk now? Call {phone.display} or{' '}
                <Link href="/contact-us-to-compare">contact us to compare</Link>.
              </p>
            </div>
            <ul className="quote-points">
              <li>Free, no-obligation consultation</li>
              <li>Availability checked by address or ZIP</li>
              <li>Help comparing plans and promotions</li>
            </ul>
          </div>
          <div>
            <ContactForm idPrefix="home" source="home-quote" onDark />
          </div>
        </div>
      </section>

      <section className="about-band" id="about">
        <div className="about-media">
          <Image
            src="/assets/images/about-fiber.jpg"
            alt="Fiber optic connectivity"
            width={1600}
            height={900}
          />
        </div>
        <div className="about-copy">
          <div className="about-copy-inner">
            <p className="eyebrow">About us</p>
            <h2>Independent comparison — not the provider.</h2>
            <p>
              {SITE.brandFull} is operated by {SITE.legalName}. We help households and businesses
              compare internet, TV, and bundle plans from leading providers.
            </p>
            <p>
              We don’t own or operate any network. Your chosen provider handles installation,
              billing, and support. Our job is to cut the runaround before you enroll.
            </p>
            <Link className="btn btn-secondary" href="/reseller-disclosure">
              Read reseller disclosure
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Straight answers before you call</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, index) => (
              <details className="faq-item" key={faq.q} open={index === 0}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
