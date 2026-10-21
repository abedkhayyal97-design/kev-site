# KEV · Khayyal Echo Vision — static site

Before you publish, fill in **`assets/js/config.js`**. That's the only file to edit:
- `email`, `formEndpoint` (optional, for example a Formspree URL), `whatsapp`, `telegram`
- `payment.binancePayId`, `payment.usdtTrc20`, `payment.usdtBep20`, `payment.depositPercent`
- Replace the QR images in `assets/pay/` (qr-binance.png, qr-trc20.png, qr-bep20.png) with your real QR codes.
- Services and packages: prices, delivery days and revisions. Set `examplePrices: false` once the prices are final.

To change the pages' text, edit `build.py`, then run `python3 build.py`.
There is no backend. Payments are checked by hand using the order reference and TxID.
Hosting: any static host works (Cloudflare Pages or GitHub Pages, both free).
