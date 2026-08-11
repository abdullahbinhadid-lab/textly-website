const fs = require('fs');
const path = require('path');

// Internal links pool
const internalLinks = [
  { url: '/tools/word-counter', keywords: ['word counter', 'word count', 'character count', 'count words'] },
  { url: '/tools/text-to-speech', keywords: ['text to speech', 'text-to-speech', 'speech synthesis', 'voice generator', 'read text aloud'] },
  { url: '/tools/speech-to-text', keywords: ['speech to text', 'speech-to-text', 'voice dictation', 'speech recognition'] },
  { url: '/tools/text-diff-checker', keywords: ['text diff', 'diff checker', 'compare text', 'text comparison'] },
  { url: '/tools/slug-generator', keywords: ['slug generator', 'URL slug', 'SEO-friendly URL', 'permalink'] },
  { url: '/tools/case-converter', keywords: ['case converter', 'UPPERCASE', 'lowercase', 'Title Case', 'camelCase', 'snake_case', 'kebab-case'] },
  { url: '/tools/text-reverser', keywords: ['text reverser', 'reverse text', 'mirror text', 'backwards text'] },
  { url: '/tools/fancy-text-generator', keywords: ['fancy text', 'Unicode text', 'bold text', 'italic text', 'script text'] },
  { url: '/tools/text-repeater', keywords: ['text repeater', 'repeat text', 'duplicate text'] },
  { url: '/tools/remove-line-breaks', keywords: ['remove line breaks', 'extra spaces', 'clean text', 'trim whitespace'] },
  { url: '/tools/find-and-replace', keywords: ['find and replace', 'search and replace', 'regex replace', 'text replace'] },
  { url: '/tools/lorem-ipsum-generator', keywords: ['Lorem Ipsum', 'placeholder text', 'dummy text'] },
  { url: '/tools/text-sorter', keywords: ['text sorter', 'sort lines', 'alphabetical sort', 'sort text'] },
  { url: '/tools/remove-duplicate-lines', keywords: ['remove duplicate lines', 'deduplicate', 'remove duplicates', 'unique lines'] },
  { url: '/tools/text-converter', keywords: ['text to hex', 'text to binary', 'Base64', 'ASCII converter', 'text encoding'] },
  { url: '/tools/text-splitter', keywords: ['text splitter', 'split text', 'text separator', 'break text into chunks'] },
  { url: '/tools/text-joiner', keywords: ['text joiner', 'join text', 'combine lines', 'merge text', 'concatenate text'] },
  { url: '/tools/smart-quotes-converter', keywords: ['smart quotes', 'curly quotes', 'typographic quotes', 'straight quotes'] },
  { url: '/tools/add-line-numbers', keywords: ['add line numbers', 'number lines', 'line numbering', 'number text lines'] },
  { url: '/tools/text-wrapper', keywords: ['text wrapper', 'wrap text', 'word wrap', 'text width'] },
  { url: '/tools/prefix-suffix-adder', keywords: ['prefix suffix', 'add prefix', 'add suffix', 'prepend text', 'append text'] },
  { url: '/tools/password-generator', keywords: ['password generator', 'strong password', 'secure password', 'random password', 'passphrase'] },
  { url: '/tools/random-word-generator', keywords: ['random word generator', 'random words', 'word generator'] },
  { url: '/tools/upside-down-text', keywords: ['upside down text', 'flip text', 'Unicode flip'] },
  { url: '/tools/remove-blank-lines', keywords: ['remove blank lines', 'remove empty lines', 'delete blank lines', 'strip empty lines'] },
  { url: '/tools/privacy-policy-scanner', keywords: ['privacy policy scanner', 'GDPR compliance', 'CCPA compliance', 'COPPA compliance', 'compliance score'] },
  { url: '/tools/readability-checker', keywords: ['readability checker', 'Flesch-Kincaid', 'Gunning Fog', 'SMOG Index', 'readability score'] },
  { url: '/tools/keyword-density-analyzer', keywords: ['keyword density', 'keyword analyzer', 'keyword frequency'] },
  { url: '/tools/word-frequency-counter', keywords: ['word frequency', 'frequency counter', 'word distribution', 'character frequency'] },
  { url: '/tools/morse-code-translator', keywords: ['Morse code translator', 'Morse code', 'text to Morse'] },
  { url: '/tools/email-extractor', keywords: ['email extractor', 'extract emails', 'find email addresses', 'email parser'] },
  { url: '/tools/social-media-character-counter', keywords: ['social media character counter', 'character limits', 'Twitter limit', 'Instagram limit'] },
  { url: '/tools/reading-time-calculator', keywords: ['reading time calculator', 'reading time', 'speaking time', 'words per minute', 'reading speed'] },
  { url: '/blog', keywords: ['our blog', 'more articles', 'related guide'] },
];

// External links pool
const externalLinks = [
  { url: 'https://wordcounter.io/', keywords: ['word counter', 'word count', 'count words'] },
  { url: 'https://www.naturalreaders.com/', keywords: ['text to speech', 'natural speech', 'voice generator', 'read text aloud'] },
  { url: 'https://otter.ai/', keywords: ['speech to text', 'voice dictation', 'transcribe', 'speech recognition'] },
  { url: 'https://www.diffchecker.com/', keywords: ['diff checker', 'compare text', 'text comparison'] },
  { url: 'https://lipsum.com/', keywords: ['Lorem Ipsum', 'placeholder text', 'dummy text'] },
  { url: 'https://www.lastpass.com/password-generator', keywords: ['password generator', 'strong password', 'secure password'] },
  { url: 'https://www.hemingwayapp.com/', keywords: ['readability', 'readability score', 'clear writing'] },
  { url: 'https://www.convertcase.net/', keywords: ['case converter', 'UPPERCASE', 'lowercase', 'Title Case'] },
  { url: 'https://www.browserling.com/tools/word-wrap', keywords: ['word wrap', 'text wrapper', 'wrap text'] },
  { url: 'https://www.browserling.com/tools/sort-text', keywords: ['sort text', 'text sorter', 'sort lines'] },
  { url: 'https://www.browserling.com/tools/remove-duplicate-lines', keywords: ['remove duplicate lines', 'deduplicate', 'remove duplicates'] },
  { url: 'https://www.browserling.com/tools/find-and-replace', keywords: ['find and replace', 'search and replace', 'text replace'] },
  { url: 'https://www.browserling.com/tools/number-lines', keywords: ['line numbers', 'number lines', 'line numbering'] },
  { url: 'https://www.browserling.com/tools/prefix-suffix-lines', keywords: ['prefix', 'suffix', 'prepend', 'append'] },
  { url: 'https://www.base64encode.org/', keywords: ['Base64', 'Base64 encoder', 'Base64 encoding'] },
  { url: 'https://www.binaryhexconverter.com/', keywords: ['binary', 'hexadecimal', 'hex converter'] },
  { url: 'https://morsecode.world/international/translator.html', keywords: ['Morse code', 'Morse code translator', 'text to Morse'] },
  { url: 'https://dictation.io/', keywords: ['voice dictation', 'speech to text', 'dictate', 'speech recognition'] },
  { url: 'https://www.slugify.net/', keywords: ['slug', 'URL slug', 'slugify', 'SEO-friendly URL'] },
  { url: 'https://readable.com/', keywords: ['readability', 'readability score', 'readability checker'] },
  { url: 'https://smallseotools.com/keyword-density-checker/', keywords: ['keyword density', 'keyword analyzer'] },
  { url: 'https://lingojam.com/FancyTextGenerator', keywords: ['fancy text', 'Unicode text', 'fancy text generator'] },
  { url: 'https://www.upsidedowntext.com/', keywords: ['upside down text', 'flip text'] },
  { url: 'https://www.textfixer.com/tools/remove-line-breaks.php', keywords: ['remove line breaks', 'line breaks'] },
  { url: 'https://www.textreverse.com/', keywords: ['reverse text', 'text reverser', 'mirror text', 'backwards text'] },
  { url: 'https://charactercounttool.com/', keywords: ['character count', 'character counter', 'count characters'] },
  { url: 'https://ttsmp3.com/', keywords: ['text to speech', 'TTS', 'speech synthesis'] },
  { url: 'https://www.textcompare.org/', keywords: ['text comparison', 'compare text', 'diff checker'] },
  { url: 'https://www.iubenda.com/en/scan/', keywords: ['privacy policy', 'GDPR compliance', 'compliance'] },
  { url: 'https://wordstotime.com/', keywords: ['reading time', 'words per minute', 'reading speed'] },
];

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findAndInsertLinks(rawContent, slug) {
  // Content uses literal \n for newlines - split by that
  const parts = rawContent.split('\\n');
  
  const usedUrls = new Set();
  let internalCount = 0;
  let externalCount = 0;
  
  for (let i = 0; i < parts.length; i++) {
    // Skip headings, list items, numbered lists, empty lines
    if (parts[i].startsWith('## ') || parts[i].startsWith('- ') || parts[i].match(/^\d+\./) || parts[i].trim() === '') {
      continue;
    }
    
    // Try internal links
    for (const link of internalLinks) {
      if (internalCount >= 3) break;
      if (usedUrls.has(link.url)) continue;
      
      // Don't link to the same tool the blog is about
      const toolSlug = link.url.replace('/tools/', '');
      if (toolSlug !== 'blog' && slug.includes(toolSlug)) continue;
      
      for (const kw of link.keywords) {
        if (internalCount >= 3) break;
        
        const escapedKw = escapeRegex(kw);
        // Skip if keyword already inside a markdown link on this line
        const linkPattern = new RegExp('\\[[^\\]]*' + escapedKw + '[^\\]]*\\]\\(', 'i');
        if (linkPattern.test(parts[i])) continue;
        
        const regex = new RegExp('\\b' + escapedKw + '\\b', 'i');
        const match = parts[i].match(regex);
        if (match) {
          const matchText = match[0];
          const matchIndex = match.index;
          
          // Check it's not at a ** boundary
          const before = parts[i].substring(Math.max(0, matchIndex - 3), matchIndex);
          const after = parts[i].substring(matchIndex + matchText.length, matchIndex + matchText.length + 3);
          if (before.endsWith('**') || after.startsWith('**')) {
            // Try second occurrence
            const remaining = parts[i].substring(matchIndex + matchText.length);
            const match2 = remaining.match(regex);
            if (match2) {
              const matchText2 = match2[0];
              const matchIndex2 = matchIndex + matchText.length + match2.index;
              const before2 = parts[i].substring(Math.max(0, matchIndex2 - 3), matchIndex2);
              const after2 = parts[i].substring(matchIndex2 + matchText2.length, matchIndex2 + matchText2.length + 3);
              if (before2.endsWith('**') || after2.startsWith('**')) continue;
              
              const replacement = `[${matchText2}](${link.url})`;
              parts[i] = parts[i].substring(0, matchIndex2) + replacement + parts[i].substring(matchIndex2 + matchText2.length);
              usedUrls.add(link.url);
              internalCount++;
              break;
            }
            continue;
          }
          
          const replacement = `[${matchText}](${link.url})`;
          parts[i] = parts[i].substring(0, matchIndex) + replacement + parts[i].substring(matchIndex + matchText.length);
          usedUrls.add(link.url);
          internalCount++;
          break;
        }
      }
    }
    
    // Try external links
    for (const link of externalLinks) {
      if (externalCount >= 2) break;
      if (usedUrls.has(link.url)) continue;
      
      for (const kw of link.keywords) {
        if (externalCount >= 2) break;
        
        const escapedKw = escapeRegex(kw);
        const linkPattern = new RegExp('\\[[^\\]]*' + escapedKw + '[^\\]]*\\]\\(', 'i');
        if (linkPattern.test(parts[i])) continue;
        
        const regex = new RegExp('\\b' + escapedKw + '\\b', 'i');
        const match = parts[i].match(regex);
        if (match) {
          const matchText = match[0];
          const matchIndex = match.index;
          
          const before = parts[i].substring(Math.max(0, matchIndex - 3), matchIndex);
          const after = parts[i].substring(matchIndex + matchText.length, matchIndex + matchText.length + 3);
          if (before.endsWith('**') || after.startsWith('**')) {
            const remaining = parts[i].substring(matchIndex + matchText.length);
            const match2 = remaining.match(regex);
            if (match2) {
              const matchText2 = match2[0];
              const matchIndex2 = matchIndex + matchText.length + match2.index;
              const before2 = parts[i].substring(Math.max(0, matchIndex2 - 3), matchIndex2);
              const after2 = parts[i].substring(matchIndex2 + matchText2.length, matchIndex2 + matchText2.length + 3);
              if (before2.endsWith('**') || after2.startsWith('**')) continue;
              
              const replacement = `[${matchText2}](${link.url})`;
              parts[i] = parts[i].substring(0, matchIndex2) + replacement + parts[i].substring(matchIndex2 + matchText2.length);
              usedUrls.add(link.url);
              externalCount++;
              break;
            }
            continue;
          }
          
          const replacement = `[${matchText}](${link.url})`;
          parts[i] = parts[i].substring(0, matchIndex) + replacement + parts[i].substring(matchIndex + matchText.length);
          usedUrls.add(link.url);
          externalCount++;
          break;
        }
      }
    }
    
    if (internalCount >= 3 && externalCount >= 2) break;
  }
  
  return parts.join('\\n');
}

// Read the file
const filePath = path.join(__dirname, '..', 'src', 'data', 'blog-content.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');
const updatedLines = [];
let stats = { total: 0, withLinks: 0 };

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Match lines like:  "slug": "content...",
  const match = line.match(/^(\s*)"([^"]+)":\s*"(.*)"(,?)$/);
  if (match) {
    const indent = match[1];
    const slug = match[2];
    let content = match[3];
    const trailing = match[4] || '';
    
    stats.total++;
    
    // Check if already has enough links
    const existingInternalLinks = (content.match(/\]\(\/[^)]+\)/g) || []).length;
    const existingExternalLinks = (content.match(/\]\(https?:\/\/[^)]+\)/g) || []).length;
    if (existingInternalLinks >= 3 && existingExternalLinks >= 2) {
      updatedLines.push(line);
      continue;
    }
    
    const updated = findAndInsertLinks(content, slug);
    
    if (updated !== content) {
      stats.withLinks++;
    }
    
    updatedLines.push(`${indent}"${slug}": "${updated}"${trailing}`);
  } else {
    updatedLines.push(line);
  }
}

fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
console.log(`Done! Processed ${stats.total} blog posts, injected links into ${stats.withLinks} posts.`);
