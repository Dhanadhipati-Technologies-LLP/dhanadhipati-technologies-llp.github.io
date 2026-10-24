# www.ludowordo.com

Website for **Ludo Wordo**, the Ludo word game by Dhanadhipati Technologies LLP.
Static HTML/CSS/JS hosted on GitHub Pages. No build step: edit a file, commit, and it is live in a minute or two.

## Do not rename or delete
These URLs are used by Google Play, AdMob, Google sign-in and the app itself.

| File | Used by |
|---|---|
| `CNAME` | GitHub custom domain (www.ludowordo.com) |
| `app-ads.txt` | AdMob verification – edit only when AdMob asks you to |
| `privacy-policy.html` | Play Console, Google OAuth branding, Meta, in-app link |
| `terms-of-service.html` | Google OAuth branding, in-app terms |
| `account-deletion.html` | Play Console delete-account URL |
| `refer.html?code=XXXX` | Referral links shared from the app |
| `index.html` | Must show the name "Ludo Wordo" and a Privacy Policy link (Google brand verification) |

## Common edits
- **Videos:** in `index.html`, search for `data-id=`. Each video is one `<a class="yt">` block; change the YouTube ID, `data-title` and the `yt-label` text.
- **Screenshots:** images are in `assets/img/screens/` (WebP, about 1100 px tall). To add one, upload the file there and copy a `<figure class="shot">` line in the Screenshots section of `index.html`, changing the file name, alt text and caption.
- **Logos:** `assets/img/logo-360.webp` / `logo-600.webp` (dice + wordmark), `assets/img/dice-*.webp` (dice only), `assets/img/logo.png` (for Google and social sharing).
- **Analytics:** the GA4 measurement ID is at the top of `assets/js/site.js` (`GA_ID`). Set it to `""` to switch tracking off.
- **iPhone app:** when it is live, put its App Store ID in `iosAppId` near the top of `refer.html`.
- **Colours and fonts:** `assets/css/site.css`, at the top (`:root`).

## Structure
```
index.html              Home page
ludo-wordo.html         Full game guide
contact.html            Contact and support
privacy-policy.html     Privacy Policy
terms-of-service.html   Terms of Service
account-deletion.html   Account deletion
refer.html              Referral redirect
404.html                Not-found page
assets/css/site.css     All styles
assets/js/site.js       Analytics, video player, screenshots
assets/img/             Icons, share image, screenshots
sitemap.xml, robots.txt, site.webmanifest, favicon.ico
```
