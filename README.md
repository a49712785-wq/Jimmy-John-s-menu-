# Jimmy John's Menus (jimmyjohnsmenus.us)

Independent, unofficial static website covering Jimmy John's menu prices, calories,
nutrition, hours, locations, and promo codes. Not affiliated with Jimmy John's
Franchise, LLC.

## Structure

```
/
index.html              Homepage
sandwiches/index.html
wraps/index.html
sides-drinks/index.html
nutrition/index.html
hours/index.html
locations/index.html
promo-code/index.html
about/index.html
contact/index.html
privacy-policy/index.html
terms/index.html
disclaimer/index.html
404.html                 Custom 404 (GitHub Pages requires this exact path)
css/style.css            Shared stylesheet for every page
js/script.js             Shared vanilla JS for every page
images/                  Item photos (see Image Checklist below)
favicon/                 Favicon set (see Image Checklist below)
robots.txt
sitemap.xml
CNAME                    Custom domain for GitHub Pages
```

Static HTML/CSS/JS only. No build step, no server-side code, no dependencies.
Works as-is on GitHub Pages, Cloudflare Pages, or any static host.

## Deploying to GitHub Pages

1. Push this folder's contents to the root of your GitHub repository (see chat
   for exact `git` commands).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**,
   branch `main`, folder `/ (root)`.
4. Under **Custom domain**, enter `jimmyjohnsmenus.us` (the `CNAME` file in
   this repo already sets this, but the Pages UI needs it confirmed once)
   and enable **Enforce HTTPS** once the DNS check passes.
5. At your domain registrar / Cloudflare, point the domain at GitHub Pages:
   - `A` records for the apex domain to GitHub's Pages IPs
     (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), or
   - a `CNAME` record for `www` to `<your-username>.github.io`
   - See GitHub's official docs for the current IP list before setting this up.

## Known gaps before this is fully production-ready

- **Images**: every `<img>` on the site points to `images/<name>.avif` using
  descriptive filenames (e.g. `images/jimmy-johns-turkey-tom.avif`). None of
  these files exist yet — a lightweight JS fallback hides any broken image, so
  the site won't visually break, but no photos will show until you add real
  files at those exact paths.
- **Favicon**: every page links to `favicon/favicon.ico`,
  `favicon/favicon-32x32.png`, `favicon/apple-touch-icon.png`, and
  `favicon/site.webmanifest`. None of these exist yet either — add a real
  favicon set at those paths.
- **Terms & Privacy Policy**: drafted as reasonable generic boilerplate for an
  informational site, not reviewed by a lawyer. Have someone qualified review
  before relying on them, especially if you add real analytics/ads/data
  collection.
- **Nutrition, price, and content mismatches**: content across pages should be
  spot-checked periodically against jimmyjohns.com, since prices and menu
  availability vary by franchise location and change over time.

## Updating the site later

`css/style.css` and `js/script.js` are shared across every page — a change
there affects the whole site. Individual page content lives only in that
page's own `index.html`. Bring the source content for a new or updated page
back to Claude to keep formatting and SEO implementation consistent with the
rest of the site.
