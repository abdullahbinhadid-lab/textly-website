# How to Setup Google AdSense on Textly (text.toolly.site)

## Overview

This guide adds Google AdSense ads to **all pages except the landing page and tool pages**.

Publisher ID: `ca-pub-6202805099839491`
Root domain: `toolly.site` (already approved by AdSense)

---

## Step 1: Add `ads.txt` to `public/`

Create `public/ads.txt` with:

```
google.com, pub-6202805099839491, DIRECT, f08c47fec0942fa0
```

---

## Step 2: Add the AdSense script to your Layout

Open `src/layouts/BaseLayout.astro`.

Add `showAds?: boolean;` to the Props interface.

Add `showAds = true` to the destructured props.

Add this inside `<head>`, just before `</head>`:

```astro
{showAds && (
  <script is:inline async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6202805099839491"
    crossorigin="anonymous"></script>
)}
```

Also check `src/layouts/ToolLayout.astro` — if tool pages use this layout, add `showAds` prop there with default `false`:

```astro
const { ..., showAds = false } = Astro.props;
```

### CRITICAL: `is:inline` is required

Without `is:inline`, Astro's build pipeline strips third-party scripts. Always use `is:inline` for external scripts.

---

## Step 3: Disable ads on the landing page

Open `src/pages/index.astro` and pass `showAds={false}`.

---

## Step 4: Disable ads on tool pages

If tool pages use `ToolLayout.astro`, they already have `showAds = false` from Step 2.

If tool pages use `BaseLayout.astro`, pass `showAds={false}` on each tool page.

---

## Step 5: Enable Auto-ads in AdSense

1. Go to https://adsense.google.com/
2. Click **Ads** → **By site** → select `toolly.site`
3. Turn on **Auto ads**

---

## Step 6: Build and deploy

```bash
npm run build
```

Upload `dist/` to Hostinger under the `text` subdomain directory.

### Verify

```bash
curl -s https://text.toolly.site/ | grep ca-pub-6202805099839491
```

---

## Summary

| Page type | Ads? |
|-----------|------|
| Landing page (`/`) | NO |
| Tool pages | NO |
| All other pages | YES |
