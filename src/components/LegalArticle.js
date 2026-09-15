import Link from 'next/link';
import { SITE } from '@/lib/site';
import { LEGAL_PAGES } from '@/lib/legalContent';

/**
 * Renders one of the legal pages from src/lib/legalContent.js.
 *
 * `body` is first-party copy authored in this repo (headings and paragraphs
 * only, no scripts or attributes) — never user input — so injecting it keeps the
 * original markup byte-for-byte without hand-converting every page to JSX.
 */
export default function LegalArticle({ slug }) {
  const page = LEGAL_PAGES[slug];
  if (!page) return null;

  return (
    <main id="main" className="legal-main">
      <section className="page-hero">
        <div className="wrap">
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">{page.title}</li>
          </ul>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </section>

      <div className="legal-content">
        <div dangerouslySetInnerHTML={{ __html: page.body }} />

        <div className="legal-contact">
          <h2>Contact Us</h2>
          <p>
            <strong>{SITE.legalName}</strong>
            <br />
            {SITE.addressLine1}
            <br />
            {SITE.addressLine2}
          </p>
          <p>
            Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            Phone: <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
          </p>
        </div>
      </div>
    </main>
  );
}

/** Metadata helper so each legal route stays a one-liner. */
export function legalMetadata(slug) {
  const page = LEGAL_PAGES[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/${slug}` },
  };
}
