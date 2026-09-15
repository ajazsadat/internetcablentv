'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/**
 * Mobile-only action bar.
 *
 * `body.has-call-bar` is what globals.css keys the extra footer padding off, so
 * the bar can never cover footer content. It's toggled here rather than set on
 * the layout's <body> so only the pages that render a bar pay for the padding.
 */
export default function StickyCallBar({ phone, label, secondaryHref, secondaryLabel }) {
  useEffect(() => {
    document.body.classList.add('has-call-bar');
    return () => document.body.classList.remove('has-call-bar');
  }, []);

  return (
    <div className="sticky-call-bar">
      {secondaryHref ? (
        <Link className="btn btn-ghost" href={secondaryHref}>
          {secondaryLabel}
        </Link>
      ) : null}
      <a className="btn btn-primary" href={`tel:${phone.tel}`}>
        {label || `Call ${phone.display}`}
      </a>
    </div>
  );
}
