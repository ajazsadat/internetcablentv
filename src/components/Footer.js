'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CHROMELESS_PATHS, FOOTER_EXPLORE, LEGAL_LINKS, SITE, getPhoneForPath } from '@/lib/site';

export default function Footer() {
  const pathname = usePathname();
  if (CHROMELESS_PATHS.has(pathname)) return null;

  const phone = getPhoneForPath(pathname);

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/" aria-label={`${SITE.brandFull} home`}>
            <Image src="/assets/images/logo-mark.svg" width={42} height={42} alt="" />
            <span className="brand-text">
              <strong>{SITE.brandFull}</strong>
              <small>by {SITE.legalName}</small>
            </span>
          </Link>
          <p>{SITE.footerBlurb}</p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            {FOOTER_EXPLORE.map((item) => (
              <li key={`${item.name}-${item.href}`}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Legal</h3>
          <ul>
            {LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li>{SITE.addressLine1}</li>
            <li>{SITE.addressLine2}</li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={`tel:${phone.tel}`}>{phone.display}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} {SITE.brandFull} · Operated by {SITE.legalName}
        </span>
        <span>Independent reseller · Not a network provider</span>
      </div>
    </footer>
  );
}
