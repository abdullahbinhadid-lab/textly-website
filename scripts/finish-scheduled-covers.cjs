const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'src', 'scheduled', 'posts.json');
const outDir = path.join(__dirname, '..', 'public', 'blog');

fs.mkdirSync(outDir, { recursive: true });

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const GRAD = {
  'from-indigo-500 to-purple-600': ['#6366f1', '#9333ea'],
  'from-emerald-500 to-teal-600': ['#10b981', '#0d9488'],
  'from-fuchsia-500 to-pink-600': ['#d946ef', '#db2777'],
  'from-blue-500 to-cyan-600': ['#3b82f6', '#0891b2'],
  'from-violet-500 to-purple-600': ['#8b5cf6', '#9333ea'],
  'from-sky-500 to-blue-600': ['#0ea5e9', '#2563eb'],
  'from-rose-500 to-red-600': ['#f43f5e', '#dc2626'],
  'from-amber-500 to-orange-600': ['#f59e0b', '#ea580c'],
};

const ICONS = {
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  'type': '<path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/><path d="M12 5v15"/>',
  'reverse': '<path d="M3 8h14l-3-3"/><path d="M3 8l3 3"/><path d="M21 16H7l3 3"/><path d="M21 16l-3-3"/>',
  'repeat': '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  'eraser': '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
  'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'scroll': '<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11"/><path d="M19 17a2 2 0 0 0 2 2"/><path d="M9 5h8"/><path d="M9 9h8"/>',
  'volume-2': '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  'mic': '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
  'columns': '<rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/>',
  'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  'sort-desc': '<path d="M3 6h18"/><path d="M3 12h12"/><path d="M3 18h6"/>',
  'funnel': '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  'hash': '<path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="M16 3l-2 18"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  'book-open': '<path d="M12 7v14"/><path d="M3 5v13a2 2 0 0 0 2 2h5V7a2 2 0 0 0-2-2H3z"/><path d="M21 5v13a2 2 0 0 1-2 2h-5V7a2 2 0 0 1 2-2h5z"/>',
  'smartphone': '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  'tag': '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/>',
  'clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  'bar-chart': '<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-3"/>',
  'mail': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
  'lock': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'shuffle': '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>',
  'signal': '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V4"/>',
  'sparkles': '<path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/>',
  'flip-vertical': '<path d="M12 3v18"/><path d="m8 7 4-4 4 4"/><path d="m8 17 4 4 4-4"/>',
  'list': '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  'zap': '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  'gauge': '<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="m12 14 4 4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  'percent': '<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-10 10.01-3-3"/>',
  'scissors': '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/>',
  'combine': '<path d="M3 7h18"/><path d="M3 12h12"/><path d="M3 17h6"/><path d="M18 12v8"/><path d="M18 12l-3 3"/><path d="M18 12l3 3"/>',
  'quote': '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
  'list-ordered': '<path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-5"/><path d="M4 18c0 0 2-1 2-3"/>',
  'wrap-text': '<path d="M3 6h18"/><path d="M3 12h15a3 3 0 1 1 0 6h-4"/><path d="m15 16-2 2 2 2"/><path d="M3 18h7"/>',
  'binary': '<rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/>',
  'radio': '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
  'edit': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  'code': '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="M8.12 3.12 16.24 21.76"/>',
};

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function iconPath(name) {
  return ICONS[name] || ICONS['file-text'];
}

function makeSvg(post) {
  const [c1, c2] = GRAD[post.gradient] || ['#6366f1', '#9333ea'];
  const h = hash(post.slug);
  const n = (i, mod) => ((h >>> (i % 24)) + i * 97) % mod;
  const parts = [];
  for (let i = 0; i < 5; i++) {
    const x = 40 + n(i + 1, 980), y = 30 + n(i + 4, 480), w = 170 + n(i + 7, 260), ht = 90 + n(i + 9, 150);
    const rot = n(i + 11, 34) - 17;
    parts.push(`<g transform="translate(${x} ${y}) rotate(${rot})" opacity="0.2">\n      <rect width="${w}" height="${ht}" rx="22" fill="#fff" fill-opacity="0.14" stroke="#fff" stroke-opacity="0.3"/>\n      <rect x="16" y="20" width="${Math.floor(w * 0.55)}" height="11" rx="5" fill="#fff" fill-opacity="0.35"/>\n      <rect x="16" y="42" width="${Math.floor(w * 0.38)}" height="9" rx="4" fill="#fff" fill-opacity="0.2"/>\n    </g>`);
  }
  for (let i = 0; i < 10; i++) {
    const x = 30 + n(i + 20, 1140), y = 40 + n(i + 30, 620), w = 42 + n(i + 40, 90);
    parts.push(`<rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="#fff" fill-opacity="${0.08 + n(i, 10) / 100}" stroke="#fff" stroke-opacity="0.22"/>`);
  }
  const tagW = 120 + post.tag.length * 12;
  const ip = iconPath(post.icon);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n  <defs>\n    <linearGradient id="bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">\n      <stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>\n    </linearGradient>\n    <radialGradient id="v" cx="50%" cy="45%" r="55%"><stop stop-color="#fff" stop-opacity="0.25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>\n    <radialGradient id="v2" cx="85%" cy="80%" r="45%"><stop stop-color="#fff" stop-opacity="0.15"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>\n    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">\n      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000" flood-opacity="0.25"/>\n    </filter>\n    <pattern id="g" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#fff" stroke-opacity="0.07"/></pattern>\n  </defs>\n  <rect width="1280" height="720" fill="url(#bg)"/>\n  <rect width="1280" height="720" fill="url(#g)"/>\n  <rect width="1280" height="720" fill="url(#v)"/>\n  <rect width="1280" height="720" fill="url(#v2)"/>\n  ${parts.join('\n')}\n  <!-- Large centered icon badge -->\n  <g filter="url(#soft)">\n    <rect x="500" y="200" width="280" height="280" rx="56" fill="#0f172a" fill-opacity="0.28" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>\n    <rect x="520" y="220" width="240" height="240" rx="48" fill="#fff" fill-opacity="0.16"/>\n    <g transform="translate(640 340)" text-anchor="middle" fill="none" stroke="#fff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" transform-origin="center">\n      <g transform="translate(-96 -96) scale(8)">\n        ${ip}\n      </g>\n    </g>\n  </g>\n  <!-- Tag chip -->\n  <rect x="${640 - tagW / 2}" y="520" width="${tagW}" height="52" rx="26" fill="#0f172a" fill-opacity="0.32" stroke="#fff" stroke-opacity="0.3"/>\n  <text x="640" y="554" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="22" font-weight="700" fill="#fff">${esc(post.tag)}</text>\n  <text x="1220" y="670" text-anchor="end" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="28" font-weight="800" fill="#fff" fill-opacity="0.85">Textly</text>\n</svg>`;
}

let updated = 0;
let skipped = 0;
for (const post of posts) {
  if (post.image && fs.existsSync(path.join(outDir, post.image.replace('/blog/', '')))) {
    skipped++;
    continue;
  }
  const svgPath = path.join(outDir, post.slug + '.svg');
  fs.writeFileSync(svgPath, makeSvg(post), 'utf8');
  post.image = `/blog/${post.slug}.svg`;
  updated++;
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf8');
console.log(`Updated ${updated} scheduled post covers; skipped ${skipped}.`);
