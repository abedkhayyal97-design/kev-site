# KEV · Khayyal Echo Vision — static site

Before you publish, fill in **`assets/js/config.js`**. That's the only file to edit:
- `email`, `formEndpoint` (optional, for example a Formspree URL), `whatsapp`, `telegram`
- `payment.depositPercent` (payment methods are agreed with each client and sent per order)
- Services and packages: prices, delivery days and revisions. Set `examplePrices: false` once the prices are final.

To change the pages' text, edit `build.py`, then run `python3 build.py`.
There is no backend. Payments are checked by hand using the order reference.
Hosting: any static host works (Cloudflare Pages or GitHub Pages, both free).
