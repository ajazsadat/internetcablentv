import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import StickyCallBar from '@/components/StickyCallBar';
import { COMPARISON_COLUMNS, COMPARISON_FEATURES } from '@/lib/providerContent';
import { SITE, getPhoneForProvider } from '@/lib/site';

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Icons for the "services at a glance" grid, keyed by the `icon` field. */
const GLANCE_ICONS = {
  internet: 'M8.288 15.038a5.25 5.25 0 017.424 0M5.136 11.886a9.75 9.75 0 0113.728 0M2 8.75a14.25 14.25 0 0120 0M12 18.75h.008v.008H12v-.008z',
  tv: 'M3.75 5.25h16.5v10.5H3.75V5.25zM8.25 19.5h7.5M12 15.75v3.75',
  phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 001.5-1.5v-2.1a1.5 1.5 0 00-1.15-1.46l-3.05-.76a1.5 1.5 0 00-1.55.58l-.72 1.01a11.28 11.28 0 01-5.3-5.3l1.01-.72a1.5 1.5 0 00.58-1.55l-.76-3.05A1.5 1.5 0 007.85 4.5H5.75a1.5 1.5 0 00-1.5 1.5v.75z',
  mobile: 'M9 3.75h6A1.5 1.5 0 0116.5 5.25v13.5a1.5 1.5 0 01-1.5 1.5H9a1.5 1.5 0 01-1.5-1.5V5.25A1.5 1.5 0 019 3.75zM12 17.25h.008v.008H12v-.008z',
  shield: 'M12 3l7.5 3v5.25c0 4.28-3.1 8.1-7.5 9.25-4.4-1.15-7.5-4.97-7.5-9.25V6L12 3z',
};

function GlanceIcon({ name }) {
  return (
    <span className="prov-glance-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path
          d={GLANCE_ICONS[name] || GLANCE_ICONS.internet}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ProviderPage({ content }) {
  const { name } = content;
  const phone = getPhoneForProvider(name);

  return (
    <>
      <main id="main">
        <section className="prov-hero" aria-label={`${name} overview`}>
          <div className="wrap prov-hero-inner">
            <p className="eyebrow">{SITE.brandFull}</p>
            <h1>{content.heroTitle}</h1>
            <p className="prov-hero-tagline">{content.tagline}</p>
            <dl className="prov-stats">
              {content.heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="prov-strip" aria-label="Get help comparing">
          <div className="wrap prov-strip-inner">
            <Link className="btn btn-primary" href="/compare-internet-options">
              Contact us to compare
            </Link>
            <a className="btn btn-ghost" href={`tel:${phone.tel}`}>
              Call to compare — {phone.display}
            </a>
          </div>
        </section>

        <section className="prov-notice" aria-label="Independence notice">
          <div className="wrap prov-notice-inner">
            <h2>Why choose {SITE.brandFull}?</h2>
            <p>{SITE.whyChooseIntro}</p>
            <p>{SITE.providerStatusDisclaimer(name)}</p>
          </div>
        </section>

        <nav className="prov-tabs" aria-label={`${name} topics`}>
          <div className="wrap prov-tabs-inner">
            {content.topicTabs.map((tab, index) => (
              <a key={tab.href} href={tab.href} aria-current={index === 0 ? 'true' : undefined}>
                {tab.label}
              </a>
            ))}
          </div>
        </nav>

        <section className="section" id="overview">
          <div className="wrap prov-overview">
            <Reveal variant="right">
              <p className="eyebrow">Overview</p>
              <h2 className="prov-overview-title">{content.introTitle}</h2>
              <p>
                {SITE.operatedByLabel} is an independent comparison platform. Call to compare
                providers — we help you review {name} options alongside other providers at your
                address so you can choose what fits, then enroll directly with the provider.
              </p>
            </Reveal>

            <Reveal as="ul" variant="left" className="prov-benefits">
              {content.benefits.map((benefit) => (
                <li key={benefit}>
                  <CheckIcon />
                  {benefit}
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section prov-plans" id="internet">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Plan tiers</p>
              <h2>{name} tiers to compare</h2>
              <p className="prov-plans-note">
                *Pricing may vary by ZIP code and is subject to change. Details shown are based on
                publicly available {name} information and may not reflect current offers. Taxes,
                fees, and equipment costs are extra.
              </p>
            </div>

            <div className="prov-plan-list">
              {content.plans.map((plan, index) => (
                <Reveal
                  as="article"
                  key={plan.name}
                  className="prov-plan"
                  delay={Math.min(index, 3) * 70}
                >
                  <div>
                    <h3>{plan.name}</h3>
                    <p className="prov-plan-speed">{plan.speed}</p>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="prov-plan-price">
                    <p>From</p>
                    <p className="prov-plan-price-amount">
                      ${plan.price}
                      <span>/mo*</span>
                    </p>
                  </div>
                  <a className="btn btn-secondary" href={`tel:${phone.tel}`}>
                    Check availability
                  </a>
                </Reveal>
              ))}
            </div>

            <details className="prov-terms">
              <summary>Offer &amp; pricing terms for {name}</summary>
              <div className="prov-terms-body">
                {content.offerTerms.map((term) => (
                  <p key={term.title}>
                    <strong>{term.title}.</strong> {term.body}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section className="section" id="tv">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">What to know</p>
              <h2>{content.sectionsTitle}</h2>
            </div>
            <div className="prov-editorial">
              {content.contentSections.map((section, index) => (
                <Reveal
                  as="article"
                  key={section.title}
                  className="prov-editorial-row"
                  delay={Math.min(index, 3) * 60}
                >
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section prov-glance">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">At a glance</p>
              <h2>{content.glance.title}</h2>
              <p>{content.glance.intro}</p>
            </div>

            <div className="prov-glance-grid">
              {content.glance.items.map((item, index) => (
                <Reveal
                  as="article"
                  key={item.title}
                  className="prov-glance-item"
                  delay={Math.min(index, 3) * 70}
                >
                  <GlanceIcon name={item.icon} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="compare">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Side by side</p>
              <h2>Provider comparison: how the top internet services stack up</h2>
              <p className="prov-compare-intro">
                The information below reflects {SITE.brandFull}’s independent research and
                observations, based on publicly available data and performance trends. It is for
                informational purposes only and is not affiliated with or endorsed by any provider
                listed. Pricing, speeds, and features vary by address and change over time — confirm
                details with the provider before you enroll.
              </p>
            </div>

            <div className="prov-table-wrap">
              <table className="prov-table">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    {COMPARISON_COLUMNS.map((column) => (
                      <th
                        key={column.name}
                        scope="col"
                        className={
                          column.name === content.comparisonHighlight ? 'is-highlight' : undefined
                        }
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature, rowIndex) => (
                    <tr key={feature}>
                      <th scope="row">{feature}</th>
                      {COMPARISON_COLUMNS.map((column) => (
                        <td
                          key={column.name}
                          className={
                            column.name === content.comparisonHighlight ? 'is-highlight' : undefined
                          }
                        >
                          {column.values[rowIndex]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">FAQ</p>
              <h2>{name} — frequently asked questions</h2>
            </div>
            <div className="faq-list">
              {content.faqs.map((faq, index) => (
                <details className="faq-item" key={faq.q} open={index === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="prov-contact" id="quote">
          <div className="wrap section prov-contact-grid">
            <div className="prov-contact-copy">
              <h2>Why choose {SITE.brandFull}?</h2>
              <p>
                Comparing {name} internet and TV is easier with {SITE.brandFull}. Call to weigh
                providers side by side, understand features and pricing, and select the option that
                works best for your home or business. Our team guides you every step of the way —
                clear, reliable, and hassle-free.
              </p>

              <p>
                <a className="btn btn-primary" href={`tel:${phone.tel}`}>
                  Call to compare providers
                </a>
              </p>

              <ul className="prov-contact-list">
                <li>
                  <span className="prov-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                  <a href={`tel:${phone.tel}`}>{phone.display}</a>
                </li>
                <li>
                  <span className="prov-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li className="is-address">
                  <span className="prov-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>
                    {SITE.addressLine1}
                    <br />
                    {SITE.addressLine2}
                  </span>
                </li>
              </ul>

              <p className="prov-contact-fine">*{SITE.providerStatusDisclaimer(name)}</p>
              <p className="prov-contact-fine">
                Pricing, availability, and included services vary by location and plan. Promotions
                may require AutoPay. Equipment and streaming services subject to terms and change.
              </p>
            </div>

            <div className="prov-contact-card">
              <h3>Get started</h3>
              <p>
                Share a few details and we’ll help you compare {name} against the other providers
                serving your address.
              </p>
              <ContactForm
                variant="simple"
                idPrefix={content.slug}
                source={content.slug}
                providerLabel="Interested in"
                providerOptions={content.interestOptions}
              />
            </div>
          </div>
        </section>
      </main>

      <StickyCallBar
        phone={phone}
        label="Call now"
        secondaryHref="/compare-internet-options"
        secondaryLabel={`Compare ${name}`}
      />
    </>
  );
}
