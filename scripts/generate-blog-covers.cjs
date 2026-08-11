const fs = require('fs');
const path = require('path');

const src = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const posts = [];
const re = /\{\s*slug:\s*'([^']+)'\s*,\s*title:\s*'((?:\\'|[^'])*)'\s*,\s*date:\s*'[^']+'\s*,\s*readTime:\s*'[^']+'\s*,\s*tag:\s*'([^']+)'\s*,\s*icon:\s*'([^']*)'\s*,\s*gradient:\s*'([^']+)'/g;
let m;
while ((m = re.exec(src))) {
  posts.push({ slug: m[1], title: m[2].replace(/\\'/g, "'"), tag: m[3], icon: m[4], gradient: m[5] });
}

const GRAD = {
  'from-indigo-500 to-purple-600': ['#6366f1', '#9333ea'],
  'from-emerald-500 to-teal-600': ['#10b981', '#0d9488'],
  'from-fuchsia-500 to-pink-600': ['#d946ef', '#db2777'],
  'from-blue-500 to-cyan-600': ['#3b82f6', '#0891b2'],
  'from-violet-500 to-purple-600': ['#8b5cf6', '#9333ea'],
  'from-sky-500 to-blue-600': ['#0ea5e9', '#2563eb'],
  'from-rose-500 to-red-600': ['#f43f5e', '#dc2626'],
};

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeSvg(post) {
  const [c1, c2] = GRAD[post.gradient] || ['#6366f1', '#9333ea'];
  const h = hash(post.slug);
  const n = (i, mod) => (h >> (i * 3)) % mod;
  const shapes = [];

  // floating glass cards
  for (let i = 0; i < 4; i++) {
    const x = 80 + n(i + 1, 900);
    const y = 40 + n(i + 4, 420);
    const w = 180 + n(i + 7, 220);
    const ht = 100 + n(i + 9, 140);
    const rot = n(i + 11, 36) - 18;
    const op = 0.1 + (n(i + 13, 18) / 100);
    shapes.push(`<g transform="translate(${x} ${y}) rotate(${rot})" opacity="${op + 0.15}">
      <rect width="${w}" height="${ht}" rx="24" fill="#fff" fill-opacity="0.14" stroke="#fff" stroke-opacity="0.28"/>
      <rect x="18" y="22" width="${Math.floor(w * 0.55)}" height="12" rx="6" fill="#fff" fill-opacity="0.35"/>
      <rect x="18" y="46" width="${Math.floor(w * 0.4)}" height="10" rx="5" fill="#fff" fill-opacity="0.2"/>
      <rect x="18" y="68" width="${Math.floor(w * 0.48)}" height="10" rx="5" fill="#fff" fill-opacity="0.16"/>
    </g>`);
  }

  // abstract tokens / chips
  for (let i = 0; i < 8; i++) {
    const x = 60 + n(i + 20, 1100);
    const y = 60 + n(i + 30, 560);
    const w = 48 + n(i + 40, 70);
    shapes.push(`<rect x="${x}" y="${y}" width="${w}" height="28" rx="14" fill="#fff" fill-opacity="${0.12 + n(i, 12) / 100}" stroke="#fff" stroke-opacity="0.25"/>`);
  }

  // ring accents
  for (let i = 0; i < 3; i++) {
    const cx = 200 + n(i + 50, 900);
    const cy = 150 + n(i + 55, 400);
    const r = 50 + n(i + 60, 90);
    shapes.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="2"/>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
      <stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="v" cx="30%" cy="20%" r="70%">
      <stop stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="v2" cx="80%" cy="75%" r="55%">
      <stop stop-color="#fff" stop-opacity="0.18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity="0.07"/>
    </pattern>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect width="1280" height="720" fill="url(#v)"/>
  <rect width="1280" height="720" fill="url(#v2)"/>
  ${shapes.join('\n')}
  <g>
    <circle cx="180" cy="360" r="92" fill="#0f172a" fill-opacity="0.2" stroke="#fff" stroke-opacity="0.25"/>
    <circle cx="180" cy="360" r="72" fill="#fff" fill-opacity="0.14"/>
    <text x="180" y="378" text-anchor="middle" font-size="56">${esc(post.icon)}</text>
  </g>
  <rect x="300" y="318" width="auto" height="1" fill="none"/>
  <g>
    <rect x="300" y="322" width="${120 + post.tag.length * 12}" height="44" rx="22" fill="#0f172a" fill-opacity="0.25" stroke="#fff" stroke-opacity="0.25"/>
    <text x="324" y="351" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="20" font-weight="700" fill="#fff" fill-opacity="0.95">${esc(post.tag)}</text>
  </g>
  <text x="1220" y="670" text-anchor="end" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="26" font-weight="800" fill="#fff" fill-opacity="0.8">Textly</text>
</svg>`;
}

const outDir = path.join('public', 'blog');
fs.mkdirSync(outDir, { recursive: true });
let n = 0;
for (const post of posts) {
  const jpg = path.join(outDir, post.slug + '.jpg');
  if (fs.existsSync(jpg)) continue;
  fs.writeFileSync(path.join(outDir, post.slug + '.svg'), makeSvg(post), 'utf8');
  n++;
}
console.log('regenerated', n);

// ensure image fields
let next = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
for (const post of posts) {
  const hasJpg = fs.existsSync(path.join(outDir, post.slug + '.jpg'));
  const img = hasJpg ? `/blog/${post.slug}.jpg` : `/blog/${post.slug}.svg`;
  const slugEsc = post.slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const slugRe = new RegExp(`(slug: '${slugEsc}',[\\s\\S]*?gradient: '[^']+')(, image: '[^']+')?`);
  next = next.replace(slugRe, `$1, image: '${img}'`);
}
fs.writeFileSync('src/data/blog-posts.ts', next, 'utf8');
console.log('done');
