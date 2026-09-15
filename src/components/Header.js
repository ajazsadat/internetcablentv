'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CHROMELESS_PATHS,
  NAV,
  PROVIDERS,
  PROVIDER_BY_PATH,
  SITE,
  getPhoneForPath,
} from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [providersOpen, setProvidersOpen] = useState(false);

  // Close the dropdown on an outside click or Escape.
  useEffect(() => {
    if (!providersOpen) return undefined;

    const onClick = (event) => {
      if (!event.target.closest?.('[data-providers-menu]')) setProvidersOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setProvidersOpen(false);
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [providersOpen]);

  // Any navigation should leave both menus closed. The header's own links call
  // closeMenus, but browser back/forward doesn't, so reset on a pathname change
  // during render rather than in an effect (which would cost an extra commit).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setProvidersOpen(false);
  }

  if (CHROMELESS_PATHS.has(pathname)) return null;

  const activeProvider = PROVIDER_BY_PATH[pathname];
  const disclaimer = activeProvider
    ? SITE.providerHeaderDisclaimer(activeProvider)
    : SITE.topDisclaimer;
  const phone = getPhoneForPath(pathname);
  const closeMenus = () => {
    setMenuOpen(false);
    setProvidersOpen(false);
  };
  const isCurrent = (href) => (pathname === href ? 'page' : undefined);

  return (
    <header className="site-header">
      <div className="header-disclaimer" role="note">
        <div className="wrap header-disclaimer-inner">
          <p>
            <strong>{activeProvider ? `Why choose ${SITE.brandFull}?` : 'Disclaimer:'}</strong>{' '}
            {disclaimer}
          </p>
        </div>
      </div>

      <div className="wrap header-row">
        <Link className="brand" href="/" aria-label={`${SITE.brandFull} home`} onClick={closeMenus}>
          <Image src="/assets/images/logo-mark.svg" width={42} height={42} alt="" priority />
          <span className="brand-text">
            <strong>{SITE.brandFull}</strong>
            <small>by {SITE.legalName}</small>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <Link href="/" aria-current={isCurrent('/')}>
            Home
          </Link>

          <div className="nav-menu" data-providers-menu>
            <button
              type="button"
              className={`nav-menu-toggle${activeProvider ? ' is-active' : ''}`}
              aria-expanded={providersOpen}
              onClick={() => setProvidersOpen((open) => !open)}
            >
              Providers
              <svg
                className="nav-menu-caret"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {providersOpen && (
              <div className="nav-menu-panel" role="menu">
                {PROVIDERS.map((provider) => (
                  <Link
                    key={provider.href}
                    href={provider.href}
                    role="menuitem"
                    className="nav-menu-item"
                    aria-current={isCurrent(provider.href)}
                    onClick={closeMenus}
                  >
                    <strong>{provider.name}</strong>
                    <span>{provider.blurb}</span>
                    <em className="nav-menu-tag">{provider.tech}</em>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV.filter((item) => item.href !== '/').map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href)}>
              {item.name === 'Contact Us to Compare' ? 'Compare' : item.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary" href={`tel:${phone.tel}`}>
            Call {phone.display}
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
          </button>
        </div>
      </div>

      <div className={`wrap mobile-nav${menuOpen ? ' open' : ''}`} id="mobile-nav">
        <Link href="/" aria-current={isCurrent('/')} onClick={closeMenus}>
          Home
        </Link>

        <p className="mobile-nav-heading">Providers</p>
        {PROVIDERS.map((provider) => (
          <Link
            key={provider.href}
            href={provider.href}
            className="is-sub"
            aria-current={isCurrent(provider.href)}
            onClick={closeMenus}
          >
            {provider.name}
          </Link>
        ))}

        {NAV.filter((item) => item.href !== '/').map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item.href)}
            onClick={closeMenus}
          >
            {item.name}
          </Link>
        ))}
        <Link href="/live-agent" onClick={closeMenus}>
          Live Agent
        </Link>

        <a className="btn btn-primary" href={`tel:${phone.tel}`}>
          Call {phone.display}
        </a>
      </div>
    </header>
  );
}
