'use client';

import { useEffect, useRef } from 'react';

/**
 * Reveals its children once they scroll into view.
 *
 * The transition lives in globals.css against `[data-reveal]`; this only flips
 * `data-visible` on the node rather than holding React state, so a page full of
 * these costs no re-renders. Elements stay revealed after the first
 * intersection so scrolling back up doesn't replay the animation.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reveal = () => {
      node.dataset.visible = 'true';
    };

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible="false"
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
