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
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function makeSvg(post) {
  const [c1, c2] = GRAD[post.gradient] || ['#6366f1', '#9333ea'];
  const h = hash(post.slug);
  const n = (i, mod) => ((h >>> (i % 24)) + i * 97) % mod;
  const parts = [];
  for (let i = 0; i < 5; i++) {
    const x = 40 + n(i+1, 980), y = 30 + n(i+4, 480), w = 170 + n(i+7, 260), ht = 90 + n(i+9, 150);
    const rot = n(i+11, 34) - 17;
    parts.push(`<g transform="translate(${x} ${y}) rotate(${rot})" opacity="0.2">
      <rect width="${w}" height="${ht}" rx="22" fill="#fff" fill-opacity="0.14" stroke="#fff" stroke-opacity="0.3"/>
      <rect x="16" y="20" width="${Math.floor(w*0.55)}" height="11" rx="5" fill="#fff" fill-opacity="0.35"/>
      <rect x="16" y="42" width="${Math.floor(w*0.38)}" height="9" rx="4" fill="#fff" fill-opacity="0.2"/>
    </g>`);
  }
  for (let i = 0; i < 10; i++) {
    const x = 30 + n(i+20, 1140), y = 40 + n(i+30, 620), w = 42 + n(i+40, 90);
    parts.push(`<rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="#fff" fill-opacity="${0.08 + n(i,10)/100}" stroke="#fff" stroke-opacity="0.22"/>`);
  }
  const tagW = 120 + post.tag.length * 12;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
      <stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="45%" r="55%"><stop stop-color="#fff" stop-opacity="0.25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <radialGradient id="v2" cx="85%" cy="80%" r="45%"><stop stop-color="#fff" stop-opacity="0.15"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000" flood-opacity="0.25"/>
    </filter>
    <pattern id="g" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#fff" stroke-opacity="0.07"/></pattern>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect width="1280" height="720" fill="url(#v)"/>
  <rect width="1280" height="720" fill="url(#v2)"/>
  ${parts.join('\n')}
  <!-- Large centered icon badge -->
  <g filter="url(#soft)">
    <rect x="500" y="200" width="280" height="280" rx="56" fill="#0f172a" fill-opacity="0.28" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>
    <rect x="520" y="220" width="240" height="240" rx="48" fill="#fff" fill-opacity="0.16"/>
    <text x="640" y="390" text-anchor="middle" font-size="140" dominant-baseline="middle">${esc(post.icon)}</text>
  </g>
  <!-- Tag chip -->
  <rect x="${640 - tagW/2}" y="520" width="${tagW}" height="52" rx="26" fill="#0f172a" fill-opacity="0.32" stroke="#fff" stroke-opacity="0.3"/>
  <text x="640" y="554" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="22" font-weight="700" fill="#fff">${esc(post.tag)}</text>
  <text x="1220" y="670" text-anchor="end" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="28" font-weight="800" fill="#fff" fill-opacity="0.85">Textly</text>
</svg>`;
}

const outDir = path.join('public', 'blog');
fs.mkdirSync(outDir, { recursive: true });

// Clean old formats, write SVG with icon for every post
for (const f of fs.readdirSync(outDir)) {
  if (/\.(png|jpg|jpeg|svg)$/i.test(f)) fs.unlinkSync(path.join(outDir, f));
}

for (const post of posts) {
  fs.writeFileSync(path.join(outDir, post.slug + '.svg'), makeSvg(post), 'utf8');
}

let next = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
for (const post of posts) {
  const img = `/blog/${post.slug}.svg`;
  const slugEsc = post.slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  next = next.replace(new RegExp(`(slug: '${slugEsc}',[\\s\\S]*?gradient: '[^']+')(, image: '[^']+')?`), `$1, image: '${img}'`);
}
fs.writeFileSync('src/data/blog-posts.ts', next, 'utf8');
console.log('covers', posts.length, 'with icons');
console.log('sample', posts[0].slug, posts[0].icon, posts[1].icon);
