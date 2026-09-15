import Link from 'next/link';
import { PROVIDERS, SITE, getHousePhone } from '@/lib/site';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  const phone = getHousePhone();

  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">404</p>
          <h1>We couldn’t find that page</h1>
          <p>
            The link may be out of date. Try one of the pages below, or call {phone.display} and
            we’ll help you compare plans for your address.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Popular pages</p>
            <h2>Where to next?</h2>
          </div>
          <div className="services-list">
            <article className="service-row">
              <div className="service-tag">Start</div>
              <h3>
                <Link href="/">Home</Link>
              </h3>
              <p>See how {SITE.brandFull} compares plans available at your address.</p>
            </article>
            {PROVIDERS.map((provider) => (
              <article className="service-row" key={provider.href}>
                <div className="service-tag">{provider.tech}</div>
                <h3>
                  <Link href={provider.href}>{provider.name} Plans</Link>
                </h3>
                <p>{provider.blurb}.</p>
              </article>
            ))}
            <article className="service-row">
              <div className="service-tag">Talk</div>
              <h3>
                <Link href="/contact-us-to-compare">Contact Us to Compare</Link>
              </h3>
              <p>Call or message us to review the options at your address.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
