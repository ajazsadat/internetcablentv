import Image from 'next/image';
import Link from 'next/link';
import { LEGAL_LINKS, SITE, getHousePhone } from '@/lib/site';

function PhoneIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" className="lac-action-icon">
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" className="lac-action-icon">
      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
    </svg>
  );
}

/**
 * Standalone "how would you like to connect" landing page.
 *
 * Shared by the two compare routes — /contact-us-to-compare (linked from the
 * main nav) and /compare-internet-options (linked from the provider pages).
 * Both are listed in CHROMELESS_PATHS, so the site header, footer, and
 * pre-footer disclaimer all sit this one out and the page owns the full screen.
 */
export default function LiveAgentConnect({ disclosure }) {
  const phone = getHousePhone();

  return (
    <main id="main" className="lac-page">
      <div className="lac-inner">
        <div className="lac-head">
          <h1 className="lac-heading">
            How would you like to connect for <span>Internet and TV Services?</span>
          </h1>
          <Image
            src="/assets/images/support/underline.png"
            alt=""
            width={113}
            height={9}
            className="lac-underline"
          />
        </div>

        <div className="lac-cards">
          <div className="lac-card lac-card-dark">
            <Image
              src="/assets/images/support/human-agent-icon.png"
              alt=""
              width={218}
              height={216}
              className="lac-card-icon"
              priority
            />
            <h2 className="lac-card-heading">Speak With A Human Agent</h2>
            <span className="lac-card-rule" />
            <a href={`tel:${phone.tel}`} className="lac-action">
              <PhoneIcon />
              <span className="lac-action-text">{phone.display}</span>
            </a>
          </div>

          <div className="lac-card lac-card-light">
            <Image
              src="/assets/images/support/automated-icon.png"
              alt=""
              width={119}
              height={119}
              className="lac-card-icon"
            />
            <h2 className="lac-card-heading">Send a message</h2>
            <span className="lac-card-rule" />
            <Link href="/contact" className="lac-action">
              <EnvelopeIcon />
              <span className="lac-action-text">Contact Form</span>
            </Link>
          </div>
        </div>

        <div className="lac-brand">
          <Link href="/" aria-label={`${SITE.brandFull} home`}>
            <Image
              src="/assets/images/logo-mark.svg"
              alt=""
              width={44}
              height={44}
              className="lac-brand-mark"
            />
            <span className="lac-brand-text">
              <strong>{SITE.brandFull}</strong>
              <small>by {SITE.legalName}</small>
            </span>
          </Link>
        </div>

        <div className="lac-foot">
          <p className="lac-disclosure">{disclosure}</p>

          {/*
            Kept in the markup but visually hidden, mirroring the reference
            site's landing pages. The `hidden` attribute is intentional — don't
            "fix" it by making these visible.
          */}
          <nav aria-label="Legal" hidden>
            <ul>
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="lac-address">{SITE.addressOneLine}</p>
        </div>
      </div>
    </main>
  );
}
