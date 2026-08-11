const fs = require('fs');
const path = require('path');

// Icon paths from Icon.astro (subset + extras)
const ICON_PATHS = {
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
  'sparkles': '<path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/>',
  'flip-vertical': '<path d="M12 3v18"/><path d="m8 7 4-4 4 4"/><path d="m8 17 4 4 4-4"/>',
  'list': '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  'zap': '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  'clipboard': '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/>',
  'pencil': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  'scissors': '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/>',
  'combine': '<path d="M3 7h18"/><path d="M3 12h12"/><path d="M3 17h6"/><path d="M18 12v8"/><path d="M18 12l-3 3"/><path d="M18 12l3 3"/>',
  'quote': '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
  'list-ordered': '<path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-5"/><path d="M4 18c0 0 2-1 2-3"/>',
  'wrap-text': '<path d="M3 6h18"/><path d="M3 12h15a3 3 0 1 1 0 6h-4"/><path d="m15 16-2 2 2 2"/><path d="M3 18h7"/>',
  'gauge': '<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="m12 14 4 4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  'trending-up': '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  'percent': '<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'timer': '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  'key': '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  'dice': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01"/><path d="M16 8h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/><path d="M12 12h.01"/>',
  'binary': '<rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/>',
  'globe': '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'braces': '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
  'terminal': '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  'award': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  'lightbulb': '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  'fingerprint': '<path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M14 13.12c0 2.38 4 3.8 4 8.88"/><path d="M19.13 5.09C18.66 4.6 17.44 4 16 4c-2 0-3 1-3 3 0 1.5-1 2-2 2-.5 0-1-.5-1-1.5"/><path d="M21.82 11.5c-.2 1-.5 2-.5 3.5"/>',
  'delete-sweep': '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  'radio': '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
};

const TOOL_ICONS = {
  'text-to-speech': 'volume-2',
  'speech-to-text': 'mic',
  'text-diff-checker': 'columns',
  'slug-generator': 'link',
  'word-counter': 'file-text',
  'social-media-character-counter': 'smartphone',
  'reading-time-calculator': 'clock',
  'case-converter': 'type',
  'text-reverser': 'reverse',
  'fancy-text-generator': 'sparkles',
  'text-repeater': 'repeat',
  'remove-line-breaks': 'eraser',
  'find-and-replace': 'search',
  'lorem-ipsum-generator': 'scroll',
  'text-sorter': 'sort-desc',
  'remove-duplicate-lines': 'funnel',
  'text-converter': 'binary',
  'text-splitter': 'scissors',
  'text-joiner': 'combine',
  'smart-quotes-converter': 'quote',
  'add-line-numbers': 'list-ordered',
  'text-wrapper': 'wrap-text',
  'prefix-suffix-adder': 'tag',
  'password-generator': 'lock',
  'random-word-generator': 'shuffle',
  'upside-down-text': 'flip-vertical',
  'remove-blank-lines': 'delete-sweep',
  'privacy-policy-scanner': 'shield-check',
  'readability-checker': 'gauge',
  'keyword-density-analyzer': 'percent',
  'word-frequency-counter': 'bar-chart',
  'morse-code-translator': 'radio',
  'email-extractor': 'mail',
};

function pickIcon(slug, title, tag, toolSlug) {
  if (toolSlug && TOOL_ICONS[toolSlug]) return TOOL_ICONS[toolSlug];
  const s = (slug + ' ' + title).toLowerCase();
  if (s.includes('privacy') || s.includes('gdpr') || s.includes('ccpa')) return 'shield-check';
  if (s.includes('password') || s.includes('passphrase') || s.includes('security')) return 'key';
  if (s.includes('word-counter') || s.includes('word count') || s.includes('how-word')) return 'hash';
  if (s.includes('character-counter') || s.includes('character limit')) return 'type';
  if (s.includes('speech') || s.includes('tts') || s.includes('voice') || s.includes('audio')) return 'volume-2';
  if (s.includes('dictation') || s.includes('transcribe') || s.includes('mic')) return 'mic';
  if (s.includes('diff') || s.includes('compare') || s.includes('difference')) return 'columns';
  if (s.includes('slug') || s.includes('url') || s.includes('permalink')) return 'link';
  if (s.includes('twitter') || s.includes('instagram') || s.includes('social')) return 'smartphone';
  if (s.includes('reading') || s.includes('wpm') || s.includes('speaking-time')) return 'clock';
  if (s.includes('case') || s.includes('camel') || s.includes('snake') || s.includes('kebab') || s.includes('title-case')) return 'type';
  if (s.includes('reverse') || s.includes('backwards') || s.includes('mirror')) return 'reverse';
  if (s.includes('fancy') || s.includes('unicode') || s.includes('bold') || s.includes('italic')) return 'sparkles';
  if (s.includes('repeat') || s.includes('duplicate-text') || s.includes('bulk text')) return 'repeat';
  if (s.includes('line-break') || s.includes('whitespace') || s.includes('cleaner') || s.includes('extra-space')) return 'eraser';
  if (s.includes('find-and-replace') || s.includes('regex') || s.includes('search-and-replace') || s.includes('capture')) return 'search';
  if (s.includes('lorem') || s.includes('dummy') || s.includes('placeholder')) return 'scroll';
  if (s.includes('sort') || s.includes('alphabetical')) return 'sort-desc';
  if (s.includes('duplicate') || s.includes('deduplicate') || s.includes('unique')) return 'funnel';
  if (s.includes('binary') || s.includes('base64') || s.includes('ascii') || s.includes('hex')) return 'binary';
  if (s.includes('split') || s.includes('chunk') || s.includes('delimiter')) return 'scissors';
  if (s.includes('join') || s.includes('concat') || s.includes('merge')) return 'combine';
  if (s.includes('quote')) return 'quote';
  if (s.includes('line-number') || s.includes('number-text') || s.includes('numbering')) return 'list-ordered';
  if (s.includes('wrap')) return 'wrap-text';
  if (s.includes('prefix') || s.includes('suffix')) return 'tag';
  if (s.includes('random') || s.includes('vocabulary')) return 'dice';
  if (s.includes('upside') || s.includes('flip')) return 'flip-vertical';
  if (s.includes('blank') || s.includes('empty-line') || s.includes('collapse')) return 'delete-sweep';
  if (s.includes('readability') || s.includes('flesch') || s.includes('grade')) return 'gauge';
  if (s.includes('keyword') || s.includes('density') || s.includes('stuffing')) return 'percent';
  if (s.includes('frequency') || s.includes('cryptograph')) return 'bar-chart';
  if (s.includes('morse')) return 'radio';
  if (s.includes('email')) return 'mail';
  if (s.includes('seo')) return 'trending-up';
  if (s.includes('academic') || s.includes('essay')) return 'award';
  if (tag === 'Technical') return 'settings';
  if (tag === 'Developer') return 'terminal';
  if (tag === 'Privacy') return 'lock';
  if (tag === 'SEO') return 'trending-up';
  if (tag === 'Writing') return 'pencil';
  if (tag === 'Creative') return 'sparkles';
  if (tag === 'Security') return 'key';
  if (tag === 'Tips') return 'lightbulb';
  return 'file-text';
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
  for (let i = 0; i < 4; i++) {
    const x = 50 + n(i+1, 960), y = 40 + n(i+4, 460), w = 180 + n(i+7, 240), ht = 100 + n(i+9, 140);
    const rot = n(i+11, 30) - 15;
    parts.push(`<g transform="translate(${x} ${y}) rotate(${rot})" opacity="0.18">
      <rect width="${w}" height="${ht}" rx="24" fill="#fff" fill-opacity="0.14" stroke="#fff" stroke-opacity="0.28"/>
      <rect x="18" y="24" width="${Math.floor(w*0.5)}" height="12" rx="6" fill="#fff" fill-opacity="0.35"/>
      <rect x="18" y="48" width="${Math.floor(w*0.36)}" height="10" rx="5" fill="#fff" fill-opacity="0.2"/>
    </g>`);
  }
  const iconPaths = ICON_PATHS[post.icon] || ICON_PATHS['file-text'];
  const tagW = 130 + post.tag.length * 12;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
      <stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="40%" r="55%"><stop stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#000" flood-opacity="0.28"/>
    </filter>
    <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity="0.07"/></pattern>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect width="1280" height="720" fill="url(#v)"/>
  ${parts.join('\n')}
  <!-- Premium glass icon badge -->
  <g filter="url(#soft)">
    <rect x="500" y="190" width="280" height="280" rx="56" fill="#ffffff" fill-opacity="0.18" stroke="#ffffff" stroke-opacity="0.45" stroke-width="2"/>
    <rect x="520" y="210" width="240" height="240" rx="48" fill="#0f172a" fill-opacity="0.18"/>
    <g transform="translate(580 270) scale(5)" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      ${iconPaths}
    </g>
  </g>
  <rect x="${640 - tagW/2}" y="510" width="${tagW}" height="52" rx="26" fill="#0f172a" fill-opacity="0.3" stroke="#fff" stroke-opacity="0.3"/>
  <text x="640" y="544" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="22" font-weight="700" fill="#fff">${esc(post.tag)}</text>
  <text x="1220" y="670" text-anchor="end" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="28" font-weight="800" fill="#fff" fill-opacity="0.85">Textly</text>
</svg>`;
}

// Parse posts (keep full objects with toolSlug)
const src = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const posts = [];
const blockRe = /\{\s*slug:\s*'([^']+)'\s*,\s*title:\s*'((?:\\'|[^'])*)'\s*,\s*date:\s*'([^']+)'\s*,\s*readTime:\s*'([^']+)'\s*,\s*tag:\s*'([^']+)'\s*,\s*icon:\s*'([^']*)'\s*,\s*gradient:\s*'([^']+)'([^}]*)\}/g;
let m;
while ((m = blockRe.exec(src))) {
  const rest = m[8] || '';
  const toolM = rest.match(/toolSlug:\s*'([^']+)'/);
  posts.push({
    slug: m[1],
    title: m[2].replace(/\\'/g, "'"),
    date: m[3],
    readTime: m[4],
    tag: m[5],
    gradient: m[7],
    toolSlug: toolM ? toolM[1] : undefined,
  });
}

for (const p of posts) {
  p.icon = pickIcon(p.slug, p.title, p.tag, p.toolSlug);
}

// Rewrite icon fields in blog-posts.ts
let next = src;
for (const p of posts) {
  const slugEsc = p.slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  // replace icon: '...' for this post only - match from slug through icon
  next = next.replace(
    new RegExp(`(slug: '${slugEsc}',[\\s\\S]*?icon: ')([^']*)(')`),
    `$1${p.icon}$3`
  );
}
// ensure image fields point to svg
for (const p of posts) {
  const slugEsc = p.slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  next = next.replace(
    new RegExp(`(slug: '${slugEsc}',[\\s\\S]*?gradient: '[^']+')(, image: '[^']+')?`),
    `$1, image: '/blog/${p.slug}.svg'`
  );
}
fs.writeFileSync('src/data/blog-posts.ts', next, 'utf8');

const outDir = path.join('public', 'blog');
fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) {
  if (/\.(png|jpg|jpeg|svg)$/i.test(f)) fs.unlinkSync(path.join(outDir, f));
}
for (const p of posts) {
  fs.writeFileSync(path.join(outDir, p.slug + '.svg'), makeSvg(p), 'utf8');
}

const unique = [...new Set(posts.map(p => p.icon))];
console.log(JSON.stringify({ posts: posts.length, uniqueIcons: unique.length, sample: posts.slice(0,6).map(p=>({slug:p.slug,icon:p.icon})) }, null, 2));
