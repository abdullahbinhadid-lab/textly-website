$file = "D:\Ai Agent\All Tools Websites\Textly website\src\data\blog-posts.ts"
$content = Get-Content $file -Raw

# Slugs that get .webp extension
$webpSlugs = @(
    "how-word-counter-works",
    "privacy-first-text-tools",
    "text-to-speech-guide",
    "url-slug-generator-seo-friendly-urls",
    "seo-friendly-url-slugs-best-practices",
    "slug-generator-guide-clean-urls-ctr",
    "free-word-counter-online-real-time",
    "character-counter-seo-meta-social-media",
    "word-count-for-academic-writing",
    "social-media-character-limits-2026",
    "twitter-character-counter-280-characters",
    "instagram-caption-length-guide",
    "reading-time-calculator-guide",
    "words-per-minute-reading-speed",
    "speaking-time-calculator-presentations",
    "password-generator-strong-secure",
    "strong-password-best-practices-2026",
    "passphrase-vs-password-security",
    "privacy-policy-scanner-gdpr-guide",
    "gdpr-ccpa-coppa-compliance-checklist",
    "privacy-policy-compliance-score",
    "readability-checker-guide",
    "flesch-kincaid-grade-level-explained",
    "improve-readability-score-tips",
    "keyword-density-analyzer-seo-guide",
    "ideal-keyword-density-seo-2026",
    "avoid-keyword-stuffing-penalties",
    "word-frequency-counter-guide",
    "word-frequency-analysis-content-optimization",
    "character-frequency-analysis-cryptography"
)

# Slugs that get .jpg extension
$jpgSlugs = @(
    "free-text-to-speech-online-50-languages",
    "how-text-to-speech-works-web-speech-api",
    "best-ai-voice-generator-text-to-speech",
    "speech-to-text-online-free-dictation",
    "voice-dictation-browser-speech-recognition",
    "transcribe-voice-to-text-guide",
    "text-diff-checker-compare-text-online",
    "compare-text-online-guide",
    "find-differences-between-two-texts",
    "case-converter-online-instant",
    "camelcase-vs-snake-case-vs-kebab-case",
    "title-case-converter-headlines",
    "text-reverser-reverse-mirror-flip",
    "backwards-text-generator-social-media",
    "reverse-text-online-12-ways",
    "fancy-text-generator-unicode-styles",
    "how-unicode-fancy-text-works",
    "bold-italic-text-generator-copy-paste",
    "text-repeater-duplicate-text-10000-times",
    "repeat-text-online-test-data-patterns",
    "text-repeater-guide-separators-numbering",
    "remove-line-breaks-online-clean-text",
    "remove-extra-spaces-whitespace",
    "text-cleaner-guide-strip-formatting",
    "find-and-replace-text-online-guide",
    "regex-find-and-replace-guide",
    "search-and-replace-capture-groups",
    "lorem-ipsum-generator-placeholder-text",
    "what-is-lorem-ipsum-history",
    "dummy-text-generator-web-design",
    "text-sorter-sort-lines-alphabetically",
    "sort-text-online-alphabetical-numerical",
    "alphabetical-sort-natural-vs-lexical",
    "remove-duplicate-lines-online",
    "remove-duplicates-keep-unique-lines",
    "deduplicate-text-emails-urls-keywords",
    "text-to-binary-hex-base64-converter",
    "base64-encoder-decoder-guide",
    "ascii-converter-text-hex-binary",
    "text-splitter-break-text-into-chunks",
    "split-text-online-delimiters",
    "break-text-into-chunks-guide",
    "text-joiner-merge-lines-online",
    "join-text-online-custom-separators",
    "concatenate-text-guide-developers",
    "smart-quotes-converter-guide",
    "curly-quotes-vs-straight-quotes",
    "typographic-quotes-for-publishing",
    "add-line-numbers-to-text-online",
    "line-numbering-guide-formatting",
    "number-text-lines-reference",
    "text-wrapper-word-wrap-online",
    "word-wrap-vs-character-wrap",
    "wrap-text-for-emails-readme",
    "prefix-suffix-adder-guide",
    "add-prefix-to-lines-bulk",
    "add-suffix-to-lines-batch",
    "random-word-generator-online-free",
    "random-word-generator-creative-writing",
    "generate-random-words-vocabulary-games",
    "upside-down-text-generator-guide",
    "flip-text-upside-down-social-media",
    "unicode-flip-text-how-it-works",
    "remove-blank-lines-online-guide",
    "remove-empty-lines-text-cleanup",
    "collapse-blank-lines-guide",
    "morse-code-translator-guide",
    "learn-morse-code-online-audio",
    "morse-code-history-and-uses",
    "email-extractor-online-free",
    "extract-emails-from-text-regex",
    "email-extractor-lead-generation-guide"
)

$replaced = 0
foreach ($slug in $webpSlugs) {
    $old = "/blog/$slug.svg"
    $new = "/blog/$slug.webp"
    if ($content -match [regex]::Escape($old)) {
        $content = $content.Replace($old, $new)
        $replaced++
    }
}

foreach ($slug in $jpgSlugs) {
    $old = "/blog/$slug.svg"
    $new = "/blog/$slug.jpg"
    if ($content -match [regex]::Escape($old)) {
        $content = $content.Replace($old, $new)
        $replaced++
    }
}

Set-Content $file -Value $content -NoNewline
Write-Host "Replaced $replaced image paths"
