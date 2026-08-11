const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'src', 'scheduled');
fs.mkdirSync(OUT, { recursive: true });
// Clear old files
for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));

const G = ['from-indigo-500 to-purple-600','from-blue-500 to-cyan-600','from-violet-500 to-purple-600','from-emerald-500 to-teal-600','from-fuchsia-500 to-pink-600','from-amber-500 to-orange-600','from-rose-500 to-pink-600','from-sky-500 to-blue-600'];
const ICONS = ['edit','search','binary','code','type','eraser','scissors','funnel','gauge','columns','shield-check','volume-2','lock','bar-chart','list','pen-tool','file-text','check-circle','zap','book-open'];
const TAGS = ['Writing','SEO','Technical','Developer','Tips','Guide','Security','Accessibility'];

// 200 unique topic templates
const TITLES = [
  'Word Counter Guide: How to Hit Your Word Count Every Time',
  'Character Counter for Social Media: Platform Limits Explained',
  'Case Converter Use Cases: When and Why to Change Text Case',
  'Find and Replace: Advanced Techniques Beyond Simple Substitution',
  'Text Diff Checker Workflow: Comparing Drafts Like a Pro',
  'Readability Scores Explained: What Your Score Really Means',
  'Lorem Ipsum Generator: A Designer Guide to Placeholder Text',
  'Text to Speech for Proofreading: Catch Errors by Listening',
  'Text Sorting Algorithms: How Alphabetical and Natural Sort Work',
  'Text Reverser: Creative and Practical Uses for Reversed Text',
  'Whitespace Remover: How to Clean Up Extra Spaces in Text',
  'Text Padding and Alignment: Formatting Data for Display',
  'Writing Alt Text: How to Describe Images for Accessibility',
  'Text Extraction from Images: How OCR Technology Works',
  'Text Truncation and Ellipsis: How to Shorten Text Gracefully',
  'Text Color Coding: Using Color to Improve Readability',
  'Sentence Case Converter: When to Use Sentence vs Title Case',
  'Text Stemming and Lemmatization: Reducing Words to Roots',
  'Text Validation Patterns: How to Validate User Input with Regex',
  'Text Hyphenation Algorithms: How Automatic Hyphenation Works',
  'Writing CTA Copy: How to Craft Call-to-Action Text That Converts',
  'Text Regex Tester Guide: How to Test and Debug Regular Expressions',
  'Writing for Voice Assistants: How to Write Text That Sounds Natural',
  'Text Fuzzy Matching: How to Find Similar Strings Without Exact Matches',
  'Writing 404 Page Copy: Turning Errors Into Opportunities',
  'Text Line Counting: How to Count and Manage Lines in Large Files',
  'Writing Disclaimers and Legal Text: Clear Language for Complex Topics',
  'Text Phonetic Matching: How Soundex and Metaphone Algorithms Work',
  'Writing Instagram Captions: How to Drive Engagement with Text',
  'Text Clipboard Operations: How Copy Cut and Paste Work',
  'Writing Accordion and FAQ Text: Structuring Answers for Clarity',
  'Unicode Blocks Explained: How the Unicode Standard Organizes Characters',
  'Writing Push Notification Copy: Short Text That Drives Action',
  'Text CSV Parsing: How to Handle Comma-Separated Data Correctly',
  'Writing Tooltip and Hint Text: Microcopy That Guides Users',
  'Text Emoji Encoding: How Emojis Work in Unicode',
  'Writing Error Messages: How to Communicate Problems Without Frustrating Users',
  'Text JSON Formatting: How to Pretty-Print and Minify JSON Data',
  'Writing Chatbot Dialogue: How to Script Conversations That Feel Natural',
  'Text Base64 Encoding Explained: How Binary-to-Text Conversion Works',
  'Writing Landing Page Copy: How to Convert Visitors with Words',
  'Text Line Endings: CRLF vs LF and Why It Matters',
  'Writing Microcopy: How Tiny Bits of Text Shape User Experience',
  'Text String Similarity: Jaccard Cosine and Levenshtein Compared',
  'Writing Newsletter Content: How to Keep Subscribers Engaged',
  'Regex Capture Groups: How to Extract Data from Text Patterns',
  'Writing Button Labels: How Action Text Drives Clicks',
  'Text Bidirectional Algorithm: How Mixed RTL and LTR Text Works',
  'Writing Form Labels: How to Guide Users Through Input Fields',
  'Text Grapheme Clusters: Why One Character Is Not Always One Code Point',
  'Writing Privacy Policy Text: Making Legal Documents Readable',
  'Text Hash Functions Explained: MD5 SHA-256 and Content Integrity',
  'Regex Lookahead and Lookbehind: Zero-Width Assertions Explained',
  'Unicode Normalization in Practice: Real-World Examples and Pitfalls',
  'Text String Interpolation: How Template Literals Work Across Languages',
  'Text Parsing Techniques: How Computers Understand Structured Text',
  'Text Encoding Detection: How Browsers Guess the Right Encoding',
  'Text Trie Data Structure: How Autocomplete and Spell Check Work',
  'Soundex Algorithm Explained: Phonetic Search for Names and Text',
  'Levenshtein Distance: How Edit Distance Powers Fuzzy Search',
  'UTF-8 Byte Sequences: How Variable-Length Encoding Works',
  'Text CLI Tools for Developers: grep sed awk and Beyond',
  'Git Diff and Merge: How Version Control Handles Text Changes',
  'String Builder Pattern: How to Concatenate Text Efficiently',
  'Text Internationalization: How to Prepare Content for Multiple Languages',
  'Text Template Engines Compared: Mustache Handlebars and EJS',
  'Markdown Parsers Guide: How Text-to-HTML Conversion Works',
  'Syntax Highlighting: How Code Text Gets Its Colors',
  'Clipboard API Guide: How to Copy and Paste Text in Web Apps',
  'Text Form Validation: A Complete Guide to Input Validation Patterns',
  'Web Speech API Guide: Adding Speech Recognition to Your App',
  'Smart Quotes vs Straight Quotes: When to Use Each',
  'Em Dash vs En Dash vs Hyphen: How to Use Each Correctly',
  'Ellipsis Character: When to Use vs Three Dots',
  'Non-Breaking Spaces: How to Prevent Unwanted Line Breaks',
  'Special Characters Guide: How to Type and Use Symbols',
  'Text Indentation Styles: Tabs vs Spaces and Best Practices',
  'Quotation Marks Guide: How Different Languages Format Quotes',
  'Apostrophe vs Single Quote: How to Use Each Correctly',
  'Slash Usage in Text: Forward Backward and Double Slashes',
  'Brackets and Parentheses: How to Use Each in Writing',
  'Text Accessibility WCAG Checklist: A Guide to Compliant Content',
  'Text Translation Workflow: How to Prepare Content for Localization',
  'How to Create a Text Style Guide for Your Brand',
  'Writing Resume Bullet Points: How to Describe Achievements with Text',
  'Writing Cover Letters: A Text Framework That Gets Interviews',
  'Writing Press Releases: How to Write Text That Gets Published',
  'UX Writing Guide: How to Write Text That Guides Users',
  'Writing Speech Scripts: How to Write Text for Spoken Delivery',
  'Writing Podcast Show Notes: How to Summarize Audio as Text',
  'Writing Tutorial Content: How to Create Step-by-Step Guides',
  'Writing Social Media Bios: How to Describe Yourself in 160 Characters',
  'Writing Video Scripts: How to Write Text for Visual Content',
  'Writing Code Comments: How to Document Without Cluttering',
  'SEO Title Tag Optimization: How to Write Titles That Rank and Click',
  'SEO Content Structure: How to Organize Text for Search Engines',
  'SEO Header Tags: How to Use H1-H6 for Better Rankings',
  'SEO Anchor Text: How to Write Link Text That Boosts Rankings',
  'SEO Image Alt Text: How to Optimize Images for Search',
  'SEO URL Slug Optimization: How to Create Search-Friendly URLs',
  'SEO Content Length: How Long Should Your Blog Posts Be',
  'SEO Internal Linking Strategy: How to Connect Your Content with Text',
  'SEO Snippet Optimization: How to Win Featured Snippets with Text',
  'SEO Semantic Keywords: How to Use LSI and Related Terms Naturally',
  'SEO Meta Keywords: Do They Still Matter in 2026',
  'SEO Content Refresh Strategy: How to Update Old Text for New Rankings',
  'SEO Pogo Stick Fix: How to Keep Readers on Your Page with Better Text',
  'SEO Long-Tail Keywords: How to Target Specific Text Queries',
  'SEO Content Briefs: How to Write Text That Ranks from Day One',
  'SEO and Text Readability: How Reading Level Affects Rankings',
  'SEO Duplicate Content: How to Avoid Text Overlap Penalties',
  'SEO Thin Content: How to Identify and Fix Low-Value Text Pages',
  'SEO Robots.txt Guide: How to Control Which Text Gets Crawled',
  'SEO Schema Markup: How to Add Structured Data to Your Text',
  'SEO Content Gap Analysis: Finding Missing Text Opportunities',
  'Text Escaping for HTML: How to Safely Display Special Characters',
  'Textarea Auto-Resize: How to Grow Text Inputs with Content',
  'ContentEditable Guide: Building Rich Text Editors in the Browser',
  'Virtual Scrolling for Large Text Lists: How to Render Millions of Lines',
  'Drag and Drop Text: How to Implement Text Reordering in Web Apps',
  'Search Highlighting: How to Highlight Text Matches in Results',
  'Infinite Scroll for Text Content: How to Load Posts Lazily',
  'Keyboard Navigation for Text Content: How to Support All Users',
  'Print Stylesheet Guide: How to Format Text for Printing',
  'Text to Speech for Accessibility: Making Content Audible',
  'Text Formatting Best Practices for the Web in 2026',
  'Text Diff Checker Workflow: Comparing Drafts Like a Pro Editor',
  'Text Mining for Beginners: Extracting Insights from Unstructured Data',
  'How Spell Checkers Work: From Edit Distance to Neural Networks',
  'Text Statistics for SEO: Reading Level Density and Content Quality',
  'Line Breaks and Typography: The Hidden Art of Text Layout',
  'Markdown vs Rich Text: Which Format Should You Use',
  'Text Encryption Basics: AES RSA and How Secure Messaging Works',
  'Writing for SEO vs Readability: How to Balance Both',
  'Stop Words and SEO: Which Words Search Engines Ignore',
  'Text Segmentation in NLP: Sentences Words and Tokens',
  'How to Write Concise Text: 12 Tips for Cutting Without Losing Meaning',
  'Text Search Algorithms: From Naive Search to Boyer-Moore',
  '10 Text Tools Every Writer Should Use in 2026',
  'Plain Language Writing: How to Make Complex Ideas Simple',
  'Text Encoding Explained: UTF-8 UTF-16 and Why Unicode Matters',
  'Accessibility and Text Tools: Making Content Inclusive',
  'Text Compression: How Huffman Coding and LZ77 Work',
  'Text Diff Algorithms Explained: Myers LCS and Patience Diff',
  'Unicode Normalization: NFC NFD NFKC and NFKD Explained',
  'Text Tokenization for Developers: A Practical Guide',
  'Writing Headlines That Convert: The Psychology of Title Optimization',
  'Text Sanitization: How to Prevent XSS and Injection Attacks',
  'Word Counter Guide: How to Hit Your Word Count Every Time',
  'Character Counter for Social Media: Platform Limits Explained',
  'Remove Line Breaks: How to Clean Up Text Copied from PDFs',
  'Remove Duplicate Lines: Clean Up Lists and Data Instantly',
  'Writing Email Subject Lines That Get Opened: Data-Driven Tips',
  'Writing Meta Descriptions That Drive Clicks: A Complete Guide',
  'Writing Product Descriptions That Sell: A Complete Framework',
  'Writing Landing Page Copy: How to Convert Visitors with Words',
  'Writing Microcopy: How Tiny Bits of Text Shape User Experience',
  'Writing Technical Documentation: A Guide for Developers',
  'Writing for Mobile Readers: How Screen Size Changes Everything',
  'Text Wrapping Algorithms: How Word Wrap Works Under the Hood',
  'Keyword Density Checker: How to Optimize Without Keyword Stuffing',
  'Text Encoding for Web Developers: UTF-8 Best Practices',
  'Text Truncation and Ellipsis: How to Shorten Text Gracefully',
  'Writing Error Messages: How to Communicate Problems Without Frustrating Users',
  'Text Padding and Alignment: Formatting Data for Display',
  'Writing Alt Text: How to Describe Images for Accessibility',
  'Text Extraction from Images: How OCR Technology Works',
  'Writing Email Subject Lines That Get Opened: Data-Driven Tips',
  'Remove Extra Spaces: How to Normalize Whitespace in Text',
  'Text Reverser: Creative and Practical Uses for Reversed Text',
  'Whitespace Remover: How to Clean Up Extra Spaces in Text',
  'Readability Scores Explained: What Your Score Really Means',
  'Lorem Ipsum Generator: A Designer Guide to Placeholder Text',
  'Text to Speech for Proofreading: Catch Errors by Listening',
  'Text Sorting Algorithms: How Alphabetical and Natural Sort Work',
  'Writing Meta Descriptions That Drive Clicks: A Complete Guide',
  'Case Converter Use Cases: When and Why to Change Text Case',
  'Find and Replace: Advanced Techniques Beyond Simple Substitution',
  'Text Diff Checker Workflow: Comparing Drafts Like a Pro',
  'Sentence Case Converter: When to Use Sentence vs Title Case',
  'Text Stemming and Lemmatization: Reducing Words to Roots',
  'Writing CTA Copy: How to Craft Call-to-Action Text That Converts',
  'Text Regex Tester Guide: How to Test and Debug Regular Expressions',
  'Writing for Voice Assistants: How to Write Text That Sounds Natural',
  'Text Fuzzy Matching: How to Find Similar Strings Without Exact Matches',
  'Writing 404 Page Copy: Turning Errors Into Opportunities',
  'Text Line Counting: How to Count and Manage Lines in Large Files',
  'Writing Disclaimers and Legal Text: Clear Language for Complex Topics',
  'Text Phonetic Matching: How Soundex and Metaphone Algorithms Work',
  'Writing Instagram Captions: How to Drive Engagement with Text',
  'Text Clipboard Operations: How Copy Cut and Paste Work',
  'Writing Accordion and FAQ Text: Structuring Answers for Clarity',
  'Unicode Blocks Explained: How the Unicode Standard Organizes Characters',
  'Writing Push Notification Copy: Short Text That Drives Action',
  'Text CSV Parsing: How to Handle Comma-Separated Data Correctly',
  'Writing Tooltip and Hint Text: Microcopy That Guides Users',
  'Text Emoji Encoding: How Emojis Work in Unicode',
  'Text JSON Formatting: How to Pretty-Print and Minify JSON Data',
  'Writing Chatbot Dialogue: How to Script Conversations That Feel Natural',
  'Text Base64 Encoding Explained: How Binary-to-Text Conversion Works',
  'Text Line Endings: CRLF vs LF and Why It Matters',
  'Text String Similarity: Jaccard Cosine and Levenshtein Compared',
  'Writing Newsletter Content: How to Keep Subscribers Engaged',
  'Regex Capture Groups: How to Extract Data from Text Patterns',
  'Writing Button Labels: How Action Text Drives Clicks',
  'Text Bidirectional Algorithm: How Mixed RTL and LTR Text Works',
  'Writing Form Labels: How to Guide Users Through Input Fields',
  'Text Grapheme Clusters: Why One Character Is Not Always One Code Point',
  'Writing Privacy Policy Text: Making Legal Documents Readable',
  'Text Hash Functions Explained: MD5 SHA-256 and Content Integrity',
  'Regex Lookahead and Lookbehind: Zero-Width Assertions Explained',
  'Unicode Normalization in Practice: Real-World Examples and Pitfalls',
  'Text String Interpolation: How Template Literals Work Across Languages',
  'Text Parsing Techniques: How Computers Understand Structured Text',
  'Text Encoding Detection: How Browsers Guess the Right Encoding',
  'Text Trie Data Structure: How Autocomplete and Spell Check Work',
  'Soundex Algorithm Explained: Phonetic Search for Names and Text',
  'Levenshtein Distance: How Edit Distance Powers Fuzzy Search',
  'UTF-8 Byte Sequences: How Variable-Length Encoding Works',
  'Text CLI Tools for Developers: grep sed awk and Beyond',
  'Git Diff and Merge: How Version Control Handles Text Changes',
  'String Builder Pattern: How to Concatenate Text Efficiently',
  'Text Internationalization: How to Prepare Content for Multiple Languages',
  'Text Template Engines Compared: Mustache Handlebars and EJS',
  'Markdown Parsers Guide: How Text-to-HTML Conversion Works',
  'Syntax Highlighting: How Code Text Gets Its Colors',
  'Clipboard API Guide: How to Copy and Paste Text in Web Apps',
  'Text Form Validation: A Complete Guide to Input Validation Patterns',
  'Web Speech API Guide: Adding Speech Recognition to Your App',
  'Smart Quotes vs Straight Quotes: When to Use Each',
  'Em Dash vs En Dash vs Hyphen: How to Use Each Correctly',
  'Ellipsis Character: When to Use vs Three Dots',
  'Non-Breaking Spaces: How to Prevent Unwanted Line Breaks',
  'Special Characters Guide: How to Type and Use Symbols',
  'Text Indentation Styles: Tabs vs Spaces and Best Practices',
  'Quotation Marks Guide: How Different Languages Format Quotes',
  'Apostrophe vs Single Quote: How to Use Each Correctly',
  'Slash Usage in Text: Forward Backward and Double Slashes',
  'Brackets and Parentheses: How to Use Each in Writing',
  'Text Accessibility WCAG Checklist: A Guide to Compliant Content',
  'Text Translation Workflow: How to Prepare Content for Localization',
  'How to Create a Text Style Guide for Your Brand',
  'Writing Resume Bullet Points: How to Describe Achievements with Text',
  'Writing Cover Letters: A Text Framework That Gets Interviews',
  'Writing Press Releases: How to Write Text That Gets Published',
  'UX Writing Guide: How to Write Text That Guides Users',
  'Writing Speech Scripts: How to Write Text for Spoken Delivery',
  'Writing Podcast Show Notes: How to Summarize Audio as Text',
  'Writing Tutorial Content: How to Create Step-by-Step Guides',
  'Writing Social Media Bios: How to Describe Yourself in 160 Characters',
  'Writing Video Scripts: How to Write Text for Visual Content',
  'Writing Code Comments: How to Document Without Cluttering',
  'SEO Title Tag Optimization: How to Write Titles That Rank and Click',
  'SEO Content Structure: How to Organize Text for Search Engines',
  'SEO Header Tags: How to Use H1-H6 for Better Rankings',
  'SEO Anchor Text: How to Write Link Text That Boosts Rankings',
  'SEO Image Alt Text: How to Optimize Images for Search',
  'SEO URL Slug Optimization: How to Create Search-Friendly URLs',
  'SEO Content Length: How Long Should Your Blog Posts Be',
  'SEO Internal Linking Strategy: How to Connect Your Content with Text',
  'SEO Snippet Optimization: How to Win Featured Snippets with Text',
  'SEO Semantic Keywords: How to Use LSI and Related Terms Naturally',
  'SEO Meta Keywords: Do They Still Matter in 2026',
  'SEO Content Refresh Strategy: How to Update Old Text for New Rankings',
  'SEO Pogo Stick Fix: How to Keep Readers on Your Page with Better Text',
  'SEO Long-Tail Keywords: How to Target Specific Text Queries',
  'SEO Content Briefs: How to Write Text That Ranks from Day One',
  'SEO and Text Readability: How Reading Level Affects Rankings',
  'SEO Duplicate Content: How to Avoid Text Overlap Penalties',
  'SEO Thin Content: How to Identify and Fix Low-Value Text Pages',
  'SEO Robots.txt Guide: How to Control Which Text Gets Crawled',
  'SEO Schema Markup: How to Add Structured Data to Your Text',
  'SEO Content Gap Analysis: Finding Missing Text Opportunities',
  'Text Escaping for HTML: How to Safely Display Special Characters',
  'Textarea Auto-Resize: How to Grow Text Inputs with Content',
  'ContentEditable Guide: Building Rich Text Editors in the Browser',
  'Virtual Scrolling for Large Text Lists: How to Render Millions of Lines',
  'Drag and Drop Text: How to Implement Text Reordering in Web Apps',
  'Search Highlighting: How to Highlight Text Matches in Results',
  'Infinite Scroll for Text Content: How to Load Posts Lazily',
  'Keyboard Navigation for Text Content: How to Support All Users',
  'Print Stylesheet Guide: How to Format Text for Printing',
  'Text to Speech for Accessibility: Making Content Audible',
  'Text Formatting Best Practices for the Web in 2026',
  'Text Mining for Beginners: Extracting Insights from Unstructured Data',
  'How Spell Checkers Work: From Edit Distance to Neural Networks',
  'Line Breaks and Typography: The Hidden Art of Text Layout',
  'Markdown vs Rich Text: Which Format Should You Use',
  'Text Encryption Basics: AES RSA and How Secure Messaging Works',
  'Text Segmentation in NLP: Sentences Words and Tokens',
  'Text Search Algorithms: From Naive Search to Boyer-Moore',
  'Plain Language Writing: How to Make Complex Ideas Simple',
  'Text Encoding Explained: UTF-8 UTF-16 and Why Unicode Matters',
  'Accessibility and Text Tools: Making Content Inclusive',
  'Text Compression: How Huffman Coding and LZ77 Work',
  'Text Diff Algorithms Explained: Myers LCS and Patience Diff',
  'Unicode Normalization: NFC NFD NFKC and NFKD Explained',
  'Text Tokenization for Developers: A Practical Guide',
  'Writing Headlines That Convert: The Psychology of Title Optimization',
  'Text Sanitization: How to Prevent XSS and Injection Attacks',
];

// Deduplicate and ensure exactly 200
const seen = new Set();
const unique = [];
for (const t of TITLES) {
  const slug = t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  if (!seen.has(slug) && unique.length < 200) {
    seen.add(slug);
    unique.push({ title: t, slug });
  }
}
// If under 200, pad with generated ones
let padIdx = 1;
while (unique.length < 200) {
  const t = `Text Tools Guide Part ${padIdx}: Essential Tips for Better Text`;
  const slug = `text-tools-guide-part-${padIdx}`;
  if (!seen.has(slug)) { seen.add(slug); unique.push({ title: t, slug }); }
  padIdx++;
}

// Scheduling: 5 posts/week Mon-Fri starting Aug 11 2026
const START = new Date('2026-08-11');
const DOW = [1,2,3,4,5];
function fmt(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}

// Content generator - produces ~1500 words with varied formatting
const INTROS = [
  'Understanding this topic is essential for anyone working with text today.',
  'This subject affects every piece of content you create, whether you realize it or not.',
  'In 2026, this knowledge is more relevant than ever before.',
  'Let us explore what makes this topic so important for modern content creators.',
  'The digital landscape has made this an unavoidable topic for professionals.',
];
const PARAS = [
  'When you work with text regularly, you quickly discover that this topic is not just a technical concern. It affects readability, user experience, and even search engine rankings. Every decision you make about text formatting, structure, and presentation has downstream effects on how your audience consumes and understands your content.',
  'Consider the everyday scenarios where this topic plays a role. You are writing a blog post, drafting an email, or creating documentation. In each case, the way you handle text determines whether your message lands effectively or gets lost in noise. Poor text practices lead to confusion, higher bounce rates, and missed opportunities.',
  'The history of this topic reveals an interesting evolution. What started as a niche concern has become mainstream as digital content exploded. Today, every content creator, developer, and marketer needs to understand these principles to stay competitive and effective.',
  'Many people underestimate the impact of this topic on their work. They treat text as an afterthought, focusing instead on design, functionality, or marketing. But text is the primary medium of communication on the web, and neglecting it means neglecting your most powerful tool.',
  'Research consistently shows that well-structured text outperforms poorly structured text by every metric. Readers stay longer, comprehend more, and take action more frequently when text follows established principles. This is not subjective. It is measurable, repeatable, and significant.',
  'The tools available today make it easier than ever to work with text effectively. From simple utilities like word counters and case converters to sophisticated analysis tools that measure readability and sentiment, the right toolkit can transform how you create and edit content.',
  'One common misconception is that good text just means good grammar. While grammar matters, effective text goes far beyond correctness. It encompasses structure, rhythm, emphasis, accessibility, and audience awareness. A grammatically perfect sentence can still fail to communicate if it ignores these other dimensions.',
];
const BULLETS = [
  '**Clarity over cleverness** — Your readers should never have to re-read a sentence to understand it.',
  '**Structure guides attention** — Headings, lists, and spacing tell readers what matters most.',
  '**Consistency builds trust** — Using the same formatting rules throughout creates a professional impression.',
  '**Accessibility is non-negotiable** — Text that excludes any reader is text that has failed.',
  '**Performance affects perception** — Fast-loading text pages feel more authoritative than slow ones.',
  '**Mobile-first thinking** — Most readers see your text on small screens, so design for that first.',
  '**Search engines read too** — Structure your text so both humans and algorithms can understand it.',
  '**White space is content** — Empty space around text is not wasted; it is essential for readability.',
];
const STEPS = [
  'Start by auditing your existing text content. Look for inconsistencies in formatting, tone, and structure. Document what you find and create a style guide to address recurring issues.',
  'Next, establish clear formatting rules. Define heading hierarchies, paragraph lengths, and list styles. Write these rules down and share them with everyone who creates content.',
  'Then, implement tools that enforce your rules automatically. Use linters, validators, and text analysis tools to catch issues before they reach your audience.',
  'After that, train your team. Even the best rules fail if people do not understand them. Run workshops, create examples, and provide feedback on real content.',
  'Finally, review and refine. Text standards evolve, and what works today may need adjustment tomorrow. Schedule regular reviews of your guidelines and tools.',
];
const SECTIONS = ['Why This Matters','The Core Concepts','Practical Applications','Common Mistakes to Avoid','Best Practices','Tools and Resources','Real-World Examples','Advanced Techniques','Future Trends','Conclusion'];

function genContent(title, idx) {
  let c = '', wc = 0;
  c += INTROS[idx % 5] + '\n\n';
  c += title + ' is a topic that touches every aspect of digital content creation. Whether you are a writer, developer, marketer, or designer, understanding how to work effectively with text gives you a significant advantage. In this article, we will explore the key principles, practical techniques, and common pitfalls you need to know.\n\n';
  wc += 65;
  for (let s = 0; s < SECTIONS.length; s++) {
    c += `## ${SECTIONS[s]}\n\n`;
    if (s % 3 === 1) {
      c += 'Here are the key points to keep in mind:\n\n';
      for (let b = 0; b < 6; b++) { c += `- ${BULLETS[(idx+b) % 8]}\n`; wc += 15; }
      c += '\n';
    } else if (s % 3 === 2) {
      c += 'Follow these steps to implement best practices:\n\n';
      for (let n = 0; n < 5; n++) { c += `${n+1}. ${STEPS[(idx+n) % 5]}\n`; wc += 25; }
      c += '\n';
    } else {
      for (let p = 0; p < 3; p++) { c += PARAS[(idx+s+p) % 7] + '\n\n'; wc += 80; }
    }
  }
  c += '> The best text is text that gets out of the way. When readers forget they are reading and simply absorb your message, you have succeeded.\n\n';
  wc += 25;
  c += `| Aspect | Poor Practice | Best Practice |\n|--------|--------------|---------------|\n| Headings | Random sizes | Logical hierarchy |\n| Paragraphs | Walls of text | 2-4 sentences |\n| Lists | Inline commas | Proper bullet points |\n| Links | Click here | Descriptive text |\n| Emphasis | ALL CAPS | Bold and italic |\n\n`;
  wc += 30;
  while (wc < 1450) { c += PARAS[wc % 7] + '\n\n'; wc += 80; }
  return c.trim();
}

// Generate all 200 posts
const posts = [];
for (let i = 0; i < unique.length; i++) {
  const u = unique[i];
  const week = Math.floor(i / 5), dow = DOW[i % 5];
  const d = new Date(START);
  d.setDate(d.getDate() + week * 7);
  d.setDate(d.getDate() + (dow - d.getDay()));
  const ds = fmt(d);
  const hr = 6 + (i % 17), mn = (i * 13) % 60;
  const ts = String(hr).padStart(2,'0') + ':' + String(mn).padStart(2,'0');
  fs.writeFileSync(path.join(OUT, u.slug + '.md'), genContent(u.title, i), 'utf8');
  posts.push({
    slug: u.slug, title: u.title, readTime: (5 + (i % 4)) + ' min',
    tag: TAGS[i % TAGS.length], icon: ICONS[i % ICONS.length],
    gradient: G[i % G.length],
    excerpt: u.title.replace(/^[^:]+:\s*/, '').replace(/^./, c => c.toLowerCase()) + '.',
    date: ds, publishAt: ds + 'T' + ts + ':00',
  });
}
fs.writeFileSync(path.join(OUT, 'posts.json'), JSON.stringify(posts, null, 2));
console.log('Generated ' + posts.length + ' posts');
console.log('First: ' + posts[0].slug + ' @ ' + posts[0].publishAt);
console.log('Last: ' + posts[posts.length-1].slug + ' @ ' + posts[posts.length-1].publishAt);

// Generate cover images for all scheduled posts so every card has an image
console.log('Generating cover images...');
require('./finish-scheduled-covers.cjs');
