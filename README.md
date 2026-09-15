# Internet Cable N TV

Marketing site for **Internet Cable N TV**, operated by **Fico Tech LLC**.

Next.js (App Router, JavaScript) — deploys to Vercel with zero config.

## Brand

- Organization: Fico Tech LLC
- Address: 1309 Coffeen Avenue STE 1200, Sheridan, WY 82801, US
- Email: info@internetcablentv.com
- Phone: (888) 238-0951
- Colors: navy `#0B1F2A`, teal `#1AA6A0`, ember `#E85D04`
- Logo / favicon: `public/assets/images/logo-mark.svg`, `public/assets/icons/`

## Routes

- `/` — homepage (hero → process → services list → why choose us → quote → about → FAQ)
- `/spectrum-plans`, `/xfinity-plans` — provider comparison pages (hero → plan tiers →
  services at a glance → side-by-side table → FAQ → lead form)
- `/contact-us-to-compare` — call-or-message landing page, linked from the main nav
  (**no header/footer**)
- `/compare-internet-options` — the same landing page, linked from the provider pages
  (**no header/footer**)
- `/contact`
- Legal: privacy, terms, refunds, disclaimer, TCPA, do-not-sell, cookies, reseller disclosure
- `/sitemap.xml` and `/robots.txt` are generated from `src/lib/site.js`

Pages that render their own chrome are listed in `CHROMELESS_PATHS` (`src/lib/site.js`);
`Header`, `Footer`, and `SiteDisclaimer` each return `null` for those paths.

## Where content lives

Copy is data, not markup, so a page's text can be edited without touching JSX:

- `src/lib/site.js` — brand, address, phone, nav, providers dropdown, legal links, disclaimers
- `src/lib/providerContent.js` — per-provider plans, FAQs, and the shared comparison table
- `src/lib/legalContent.js` — the eight legal pages

Adding a provider means adding an entry to `PROVIDERS` + `PROVIDER_BY_PATH` in `site.js`,
an entry in `PROVIDER_CONTENT`, and a two-line route that renders `<ProviderPage>`. The
dropdown, footer, and sitemap pick it up automatically.

## Styling

`src/app/globals.css` is the original hand-written design system (no Tailwind). Fonts are
loaded via `next/font/google` and exposed as `--font-display` and `--font-body`.

The two compare landing pages (`.lac-*`) are the one exception to the navy/teal/ember
palette: their layout and colour are both carried over from the reference site, because the
four raster assets in `public/assets/images/support/` ship in that purple and are used
as-is. Their palette lives in the `--lac-*` custom properties on `.lac-page`.

## Contact form

Both form variants POST JSON to `/api/contact` (`src/app/api/contact/route.js`), which
validates, appends the lead to a log, then sends mail with nodemailer.

SMTP is read from the environment — copy `.env.local.example` to `.env.local` for local dev,
and set the same keys in Vercel under **Project → Settings → Environment Variables**:

```
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
```

Leads are appended to `.leads/leads.jsonl` *before* delivery is attempted, so a submission
survives an SMTP outage. Vercel's filesystem is read-only outside `/tmp`, so in production
the log falls back to stderr and lands in the function logs.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
