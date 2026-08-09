# Internet Cable N TV

Marketing site for **Internet Cable N TV**, operated by **Zaz International Inc**.

## Business details

- Organization: Zaz International Inc
- Address: 3011 E Cedar Sun Trail Katy, TX 77449-4650, US
- Email: info@internetcablentv.com
- Phone: `888-811-2026` (**placeholder — replace with your real business number site-wide**; search for `888-811-2026`)
- Domain: internetcablentv.com

## Pages

Base & legal pages (layout/content modeled on [internetnearsme.com](https://internetnearsme.com/)):

- `/` Home
- `/contact` Contact
- `/privacy-policy`
- `/terms-and-conditions`
- `/refund-policy`
- `/disclaimer`
- `/tcpa-consent`
- `/do-not-sell-my-info`
- `/cookie-policy`
- `/reseller-disclosure`

Live agent (exact layout from [pcinternetcable.com/live-agent](https://www.pcinternetcable.com/live-agent), **no header/footer**):

- `/live-agent`

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Deploy

Static HTML/CSS/JS — upload the repo contents to Hostinger (or any Apache host). `.htaccess` enables extensionless URLs.
