const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'src', 'scheduled', 'posts.json');
const publicDir = path.join(__dirname, '..', 'public', 'blog');
const sourceDir = 'D:\\Ai Agent\\All Tools Websites\\all websites Data and reasearch\\All Images';

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const allImages = walk(sourceDir);

// Skip UI icon assets, random hashes, and duplicate _1 files
const skipBase = /^\d+$|^[a-z0-9]{4,8}$|^toolbarbutton|^treeitem|^cursor|^website\s*logo$/i;
const skipName = /_(1|2|3|4|5|6|7|8|9|10)\.[a-z0-9]+$/i;
const candidates = allImages
  .filter(f => !skipName.test(path.basename(f)))
  .filter(f => {
    const base = path.basename(f).replace(/\.[a-z0-9]+$/i, '');
    return !skipBase.test(base);
  });

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/_\d+$/, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .split(/[^a-z0-9]+/)
    .filter(w => w.length > 2 && !['the','and','for','are','but','not','you','all','can','had','her','was','one','our','out','day','get','has','him','his','how','its','may','new','now','old','see','two','who','boy','did','she','use','her','way','will'].includes(w));
}

function tokenize(s) {
  return Array.from(new Set(normalize(s)));
}

function score(slug, filePath) {
  const slugWords = tokenize(slug);
  const base = path.basename(filePath).replace(/\.[a-z0-9]+$/i, '');
  const baseWords = tokenize(base);
  if (!slugWords.length || !baseWords.length) return 0;

  // Exact or starts-with match is a strong signal
  const slugNoExt = slug;
  const baseNoExt = base;
  if (baseNoExt === slugNoExt) return 100;

  const common = slugWords.filter(w => baseWords.includes(w));
  let s = common.length;

  // Boost for adjacent word pairs (bigrams)
  const slugBi = [];
  for (let i = 0; i < slugWords.length - 1; i++) slugBi.push(`${slugWords[i]}-${slugWords[i + 1]}`);
  const baseBi = [];
  for (let i = 0; i < baseWords.length - 1; i++) baseBi.push(`${baseWords[i]}-${baseWords[i + 1]}`);
  const commonBi = slugBi.filter(b => baseBi.includes(b));
  s += commonBi.length * 2;

  // Slight bonus if file is in the Images subfolder (blog cover set)
  if (filePath.includes('\\Images\\')) s += 0.5;

  return s;
}

function pickExt(filesForBase) {
  const order = ['.webp', '.jpg', '.jpeg', '.png', '.svg'];
  for (const ext of order) {
    const f = filesForBase.find(f => path.extname(f).toLowerCase() === ext);
    if (f) return f;
  }
  return filesForBase[0];
}

// Group candidates by base name so we can pick best extension
const byBase = new Map();
for (const f of candidates) {
  const ext = path.extname(f).toLowerCase();
  const base = path.basename(f, ext).replace(/_\d+$/, '');
  if (!byBase.has(base)) byBase.set(base, []);
  byBase.get(base).push(f);
}

const bestCandidates = [];
for (const [base, files] of byBase) {
  bestCandidates.push(pickExt(files));
}

let assigned = 0;
let kept = 0;

for (const post of posts) {
  let best = null;
  let bestScore = 0;

  for (const file of bestCandidates) {
    const sc = score(post.slug, file);
    if (sc > bestScore) {
      bestScore = sc;
      best = file;
    }
  }

  const threshold = 2;
  if (best && bestScore >= threshold) {
    const ext = path.extname(best).toLowerCase();
    const targetName = post.slug + ext;
    const targetPath = path.join(publicDir, targetName);

    // Remove any previously generated cover for this slug to avoid stale files
    const existing = fs.readdirSync(publicDir).filter(f => path.basename(f, path.extname(f)) === post.slug);
    for (const f of existing) fs.unlinkSync(path.join(publicDir, f));

    fs.copyFileSync(best, targetPath);
    post.image = `/blog/${targetName}`;
    assigned++;
  } else {
    kept++;
  }
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf8');
console.log(`Assigned ${assigned} scheduled post images from source folder; kept ${kept} existing/generated.`);
