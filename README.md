# Internet Cable N TV

Original marketing site for **Internet Cable N TV**, operated by **Zaz International Inc**.

## Brand

- Organization: Zaz International Inc
- Address: 3011 E Cedar Sun Trail, Katy, TX 77449-4650, US
- Email: info@internetcablentv.com
- Phone: 888-811-2026 (placeholder until a final number is provided)
- Colors: navy `#0B1F2A`, teal `#1AA6A0`, ember `#E85D04`
- Logo / favicon: `assets/images/logo-mark.svg`, `assets/icons/`

## Pages

- `/` — custom homepage (hero → process → services list → quote → about → FAQ)
- `/live-agent/` — layout matched to pcinternetcable live-agent (**no header/footer**)
- `/contact/`
- Legal: privacy, terms, refunds, disclaimer, TCPA, do-not-sell, cookies, reseller disclosure

## Contact form / SMTP

Home quote + contact forms POST JSON to `api/contact.php`, which sends mail via:

- Host: `mail.careernhustle.com:465` (SSL)
- From: `Internet Cable N TV <shah@careernhustle.com>`
- To: `info@internetcablentv.com`

Config lives in `api/config.php`. Requires PHP with OpenSSL on the host (Hostinger-compatible).

## Preview

Static pages:

```bash
python3 -m http.server 8080
```

For form email locally, serve with PHP instead:

```bash
php -S 127.0.0.1:8080
```

Open `http://localhost:8080/` and `http://localhost:8080/live-agent/`.
