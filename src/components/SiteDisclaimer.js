'use client';

import { usePathname } from 'next/navigation';
import { CHROMELESS_PATHS, PROVIDER_BY_PATH, SITE } from '@/lib/site';

/**
 * Pre-footer legal block. Provider pages append the trademark note for the
 * carrier they name, mirroring the original static pages.
 */
export default function SiteDisclaimer() {
  const pathname = usePathname();
  if (CHROMELESS_PATHS.has(pathname)) return null;

  const provider = PROVIDER_BY_PATH[pathname];

  return (
    <section id="disclaimer" className="site-disclaimer" aria-label="Disclaimer">
      <div className="wrap">
        <h3>Disclaimer:</h3>
        <p>
          {SITE.preFooterDisclaimer}
          {provider ? ` ${SITE.providerTrademarkNote(provider)}` : ''}
        </p>
      </div>
    </section>
  );
}
