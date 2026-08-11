const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ---- Minimal PNG encoder (RGBA) ----
function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crcBuf = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcBuf));
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const compressed = zlib.deflateSync(raw, { level: 6 });
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  const sig = Buffer.from([137,80,78,71,13,10,26,10]);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))]);
}

// ---- Parse posts ----
const src = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const posts = [];
const re = /\{\s*slug:\s*'([^']+)'\s*,\s*title:\s*'((?:\\'|[^'])*)'\s*,\s*date:\s*'[^']+'\s*,\s*readTime:\s*'[^']+'\s*,\s*tag:\s*'([^']+)'\s*,\s*icon:\s*'([^']*)'\s*,\s*gradient:\s*'([^']+)'/g;
let m;
while ((m = re.exec(src))) {
  posts.push({ slug: m[1], title: m[2].replace(/\\'/g, "'"), tag: m[3], icon: m[4], gradient: m[5] });
}

const GRAD = {
  'from-indigo-500 to-purple-600': [[99,102,241],[147,51,234]],
  'from-emerald-500 to-teal-600': [[16,185,129],[13,148,136]],
  'from-fuchsia-500 to-pink-600': [[217,70,239],[219,39,119]],
  'from-blue-500 to-cyan-600': [[59,130,246],[8,145,178]],
  'from-violet-500 to-purple-600': [[139,92,246],[147,51,234]],
  'from-sky-500 to-blue-600': [[14,165,233],[37,99,235]],
  'from-rose-500 to-red-600': [[244,63,94],[220,38,38]],
};

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function mix(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}

function makeCover(post, W = 1280, H = 720) {
  const [c1, c2] = GRAD[post.gradient] || GRAD['from-indigo-500 to-purple-600'];
  const h = hash(post.slug);
  const rgba = Buffer.alloc(W * H * 4);

  // Soft blobs unique per post
  const blobs = [
    { x: 0.15 + (h % 40) / 100, y: 0.2 + ((h >> 4) % 30) / 100, r: 0.35 + ((h >> 8) % 20) / 100, s: 0.35 },
    { x: 0.75 + ((h >> 2) % 20) / 100, y: 0.65 + ((h >> 6) % 25) / 100, r: 0.28 + ((h >> 10) % 15) / 100, s: 0.25 },
    { x: 0.55 + ((h >> 3) % 30) / 100, y: 0.15 + ((h >> 7) % 40) / 100, r: 0.22, s: 0.2 },
  ];

  // Floating card rects (unique layout)
  const cards = [];
  for (let i = 0; i < 4; i++) {
    const seed = (h >> (i * 4)) & 0xffff;
    cards.push({
      x: Math.floor(80 + (seed % 900)),
      y: Math.floor(40 + ((seed >> 3) % 420)),
      w: 160 + (seed % 220),
      ht: 90 + ((seed >> 5) % 130),
      rot: ((seed % 30) - 15) * Math.PI / 180,
      a: 0.12 + (seed % 12) / 100,
    });
  }

  // Chips
  const chips = [];
  for (let i = 0; i < 10; i++) {
    const seed = (h * (i + 3) + i * 9973) >>> 0;
    chips.push({
      x: 40 + (seed % 1100),
      y: 40 + ((seed >> 4) % 620),
      w: 40 + (seed % 80),
      h: 22,
      a: 0.1 + (seed % 15) / 100,
    });
  }

  // Rings
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const seed = (h ^ (i * 12345)) >>> 0;
    rings.push({
      cx: 150 + (seed % 980),
      cy: 120 + ((seed >> 5) % 480),
      r: 40 + (seed % 90),
    });
  }

  const iconCx = 180, iconCy = 360, iconR = 78;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = (x / (W - 1) * 0.65 + y / (H - 1) * 0.35);
      let [r, g, b] = mix(c1, c2, t);

      // radial lights
      for (const bl of blobs) {
        const dx = x / W - bl.x;
        const dy = y / H - bl.y;
        const d = Math.sqrt(dx * dx + dy * dy) / bl.r;
        if (d < 1) {
          const k = (1 - d) * (1 - d) * bl.s;
          r = Math.min(255, r + (255 - r) * k);
          g = Math.min(255, g + (255 - g) * k);
          b = Math.min(255, b + (255 - b) * k);
        }
      }

      // subtle grid
      if (x % 48 === 0 || y % 48 === 0) {
        r = Math.min(255, r + 8);
        g = Math.min(255, g + 8);
        b = Math.min(255, b + 8);
      }

      // glass cards
      for (const card of cards) {
        // approximate without rotation for speed (axis-aligned with slight offset)
        const ox = x - card.x;
        const oy = y - card.y;
        if (ox >= 0 && oy >= 0 && ox < card.w && oy < card.ht) {
          const edge = ox < 2 || oy < 2 || ox > card.w - 3 || oy > card.ht - 3;
          const a = edge ? card.a + 0.12 : card.a;
          r = Math.round(r * (1 - a) + 255 * a);
          g = Math.round(g * (1 - a) + 255 * a);
          b = Math.round(b * (1 - a) + 255 * a);
          // fake content lines
          if (oy > 22 && oy < 34 && ox > 16 && ox < card.w * 0.55) {
            r = Math.min(255, r + 40); g = Math.min(255, g + 40); b = Math.min(255, b + 40);
          }
          if (oy > 44 && oy < 52 && ox > 16 && ox < card.w * 0.4) {
            r = Math.min(255, r + 25); g = Math.min(255, g + 25); b = Math.min(255, b + 25);
          }
        }
      }

      // chips
      for (const ch of chips) {
        if (x >= ch.x && x < ch.x + ch.w && y >= ch.y && y < ch.y + ch.h) {
          // rounded-ish via corner skip
          const lx = x - ch.x, ly = y - ch.y;
          const corner = (lx < 4 && ly < 4) || (lx > ch.w - 5 && ly < 4) || (lx < 4 && ly > ch.h - 5) || (lx > ch.w - 5 && ly > ch.h - 5);
          if (!corner) {
            const a = ch.a;
            r = Math.round(r * (1 - a) + 255 * a);
            g = Math.round(g * (1 - a) + 255 * a);
            b = Math.round(b * (1 - a) + 255 * a);
          }
        }
      }

      // rings
      for (const ring of rings) {
        const dx = x - ring.cx, dy = y - ring.cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(d - ring.r) < 2) {
          r = Math.min(255, r + 30);
          g = Math.min(255, g + 30);
          b = Math.min(255, b + 30);
        }
      }

      // icon circle
      {
        const dx = x - iconCx, dy = y - iconCy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < iconR + 14 && d > iconR + 10) {
          r = Math.min(255, r + 40); g = Math.min(255, g + 40); b = Math.min(255, b + 40);
        }
        if (d < iconR) {
          const a = 0.22;
          r = Math.round(r * (1 - a) + 15 * a);
          g = Math.round(g * (1 - a) + 23 * a);
          b = Math.round(b * (1 - a) + 42 * a);
          if (d < iconR - 12) {
            const a2 = 0.18;
            r = Math.round(r * (1 - a2) + 255 * a2);
            g = Math.round(g * (1 - a2) + 255 * a2);
            b = Math.round(b * (1 - a2) + 255 * a2);
          }
        }
      }

      // tag pill
      const tagW = 120 + post.tag.length * 10;
      if (x >= 300 && x < 300 + tagW && y >= 330 && y < 374) {
        const a = 0.28;
        r = Math.round(r * (1 - a) + 15 * a);
        g = Math.round(g * (1 - a) + 23 * a);
        b = Math.round(b * (1 - a) + 42 * a);
      }

      // brand bar bottom right soft
      if (x > W - 180 && y > H - 60) {
        r = Math.min(255, r + 10);
        g = Math.min(255, g + 10);
        b = Math.min(255, b + 10);
      }

      const i = (y * W + x) * 4;
      rgba[i] = r; rgba[i + 1] = g; rgba[i + 2] = b; rgba[i + 3] = 255;
    }
  }

  return encodePNG(W, H, rgba);
}

const outDir = path.join('public', 'blog');
fs.mkdirSync(outDir, { recursive: true });

// Remove old SVGs so only PNGs remain (except keep nothing conflicting)
const existing = fs.readdirSync(outDir);
for (const f of existing) {
  if (f.endsWith('.svg')) fs.unlinkSync(path.join(outDir, f));
}

console.log('Generating', posts.length, 'PNG covers...');
const t0 = Date.now();
for (let i = 0; i < posts.length; i++) {
  const post = posts[i];
  // Always regenerate unique PNG for every post (overwrite jpg too for consistency)
  const buf = makeCover(post);
  fs.writeFileSync(path.join(outDir, post.slug + '.png'), buf);
  if ((i + 1) % 10 === 0 || i === posts.length - 1) {
    console.log(`  ${i + 1}/${posts.length}`);
  }
}
console.log('PNG done in', ((Date.now() - t0) / 1000).toFixed(1), 's');

// Update blog-posts.ts image fields to .png
let next = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
for (const post of posts) {
  const slugEsc = post.slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const img = `/blog/${post.slug}.png`;
  const slugRe = new RegExp(`(slug: '${slugEsc}',[\\s\\S]*?gradient: '[^']+')(, image: '[^']+')?`);
  next = next.replace(slugRe, `$1, image: '${img}'`);
}
fs.writeFileSync('src/data/blog-posts.ts', next, 'utf8');
console.log('blog-posts.ts updated');
