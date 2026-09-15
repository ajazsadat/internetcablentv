import Link from 'next/link';
import { LEGAL_LINKS, SITE, getHousePhone } from '@/lib/site';

const PHONE_PATH =
  'M6.6 2.8c.4-.4 1-.5 1.5-.3l2.2 1c.5.2.8.7.8 1.2v2.3c0 .4-.2.8-.5 1L9.3 9.3c.8 1.7 2.1 3.1 3.8 4l1.3-1.2c.3-.3.7-.5 1.1-.5h2.3c.5 0 1 .3 1.2.8l1 2.2c.2.5.1 1.1-.3 1.5l-1.4 1.4c-.4.4-1 .6-1.6.5C10.5 17.2 6.8 13.5 5.1 7.3c-.1-.6.1-1.2.5-1.6L6.6 2.8Z';

const CHAT_PATH =
  'M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-3.2 2.6c-.5.4-1.3 0-1.3-.7V6.5Z';

/** Which legal links the compare page surfaces, in display order. */
const FOOTER_LEGAL = [
  '/terms-and-conditions',
  '/privacy-policy',
  '/reseller-disclosure',
  '/cookie-policy',
  '/tcpa-consent',
];

function Glyph({ path, size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d={path} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Chromeless "how would you like to connect" landing page, shared by
 * /live-agent and /contact-us-to-compare. Both are listed in CHROMELESS_PATHS
 * so the site header, footer, and pre-footer disclaimer sit this one out.
 */
export default function LiveAgentConnect({
  headingLead,
  headingAccent,
  callTitle,
  callSub,
  showFooter = false,
}) {
  const phone = getHousePhone();
  const legal = FOOTER_LEGAL.map((href) => LEGAL_LINKS.find((item) => item.href === href)).filter(
    Boolean,
  );

  return (
    <main id="main" className="site-main-bare">
      <section className="la-page">
        <div className="la-decor" aria-hidden="true" />
        <div className="la-content">
          <h1 className="la-heading">
            <span>{headingLead}</span>
            <span className="la-heading-accent">{headingAccent}</span>
          </h1>

          <div className="la-grid">
            <article className="la-card">
              <div className="la-icon" aria-hidden="true">
                <Glyph path={PHONE_PATH} size={28} />
              </div>
              <h2>{callTitle}</h2>
              <p className="la-sub">{callSub}</p>
              <div className="la-rule" />
              <a className="la-call-btn" href={`tel:${phone.tel}`}>
                <span className="la-call-icon" aria-hidden="true">
                  <Glyph path={PHONE_PATH} size={18} />
                </span>
                <span className="la-call-text">
                  <strong>Call Now</strong>
                  <em>{phone.display}</em>
                </span>
              </a>
            </article>

            <article className="la-card">
              <div className="la-icon" aria-hidden="true">
                <Glyph path={CHAT_PATH} size={28} />
              </div>
              <h2>Send Us a Message</h2>
              <p className="la-sub">
                Prefer not to call? Fill out our contact form and we&apos;ll follow up.
              </p>
              <div className="la-rule" />
              <Link className="la-chat-btn" href="/contact">
                Contact Form
              </Link>
            </article>
          </div>

          <div className="la-brand">
            <span className="la-brand-mark" aria-hidden="true" />
            <div>
              <strong>{SITE.brandFull.toUpperCase()}</strong>
              <small>BY {SITE.legalName.toUpperCase()}</small>
            </div>
          </div>

          {showFooter && (
            <div className="la-footer">
              <p className="la-disclosure">{SITE.comparePageDisclosure}</p>
              <ul className="la-legal">
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
              <p className="la-address">{SITE.addressOneLine}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
