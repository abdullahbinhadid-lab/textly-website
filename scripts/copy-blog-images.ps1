$src = "D:\Ai Agent\All Tools Websites\all websites Data and reasearch\All Images\Images"
$dst = "D:\Ai Agent\All Tools Websites\Textly website\public\blog"

# Mapping: blog-slug => source image filename
$mapping = @{
    # Pillar posts (3)
    "how-word-counter-works" = "05-calculator-character.webp"
    "privacy-first-text-tools" = "56-woman-protective-dome-storm.webp"
    "text-to-speech-guide" = "118-robo-advisor-ai-assistant.webp"
    # Text to Speech (3)
    "free-text-to-speech-online-50-languages" = "HumanAI-05.jpg"
    "how-text-to-speech-works-web-speech-api" = "HumanAI-06.jpg"
    "best-ai-voice-generator-text-to-speech" = "HumanAI-07.jpg"
    # Speech to Text (3)
    "speech-to-text-online-free-dictation" = "HumanAI-08.jpg"
    "voice-dictation-browser-speech-recognition" = "HumanAI-09.jpg"
    "transcribe-voice-to-text-guide" = "HumanAI-10.jpg"
    # Text Diff Checker (3)
    "text-diff-checker-compare-text-online" = "DevKit-01.jpg"
    "compare-text-online-guide" = "DevKit-02.jpg"
    "find-differences-between-two-texts" = "DevKit-03.jpg"
    # Slug Generator (3)
    "url-slug-generator-seo-friendly-urls" = "08-upward-arrow-growth.webp"
    "seo-friendly-url-slugs-best-practices" = "14-graph-line-chart.webp"
    "slug-generator-guide-clean-urls-ctr" = "17-rocket-coins-growth.webp"
    # Word Counter (3)
    "free-word-counter-online-real-time" = "09-wallet-coins.webp"
    "character-counter-seo-meta-social-media" = "12-smartphone-dashboard.webp"
    "word-count-for-academic-writing" = "61-woman-library-finance-book.webp"
    # Social Media Character Counter (3)
    "social-media-character-limits-2026" = "07-woman-phone-financial-app.webp"
    "twitter-character-counter-280-characters" = "117-finance-app-phone-dashboard.webp"
    "instagram-caption-length-guide" = "126-social-media-monetization-studio.webp"
    # Reading Time Calculator (3)
    "reading-time-calculator-guide" = "19-clock-time-value.webp"
    "words-per-minute-reading-speed" = "52-hourglass-coins-museum.webp"
    "speaking-time-calculator-presentations" = "65-podcast-studio-finance.webp"
    # Case Converter (3)
    "case-converter-online-instant" = "DevKit-04.jpg"
    "camelcase-vs-snake-case-vs-kebab-case" = "DevKit-05.jpg"
    "title-case-converter-headlines" = "DevKit-06.jpg"
    # Text Reverser (3)
    "text-reverser-reverse-mirror-flip" = "DevKit-07.jpg"
    "backwards-text-generator-social-media" = "DevKit-08.jpg"
    "reverse-text-online-12-ways" = "DevKit-09.jpg"
    # Fancy Text Generator (3)
    "fancy-text-generator-unicode-styles" = "DevKit-10.jpg"
    "how-unicode-fancy-text-works" = "DevKit-11.jpg"
    "bold-italic-text-generator-copy-paste" = "DevKit-12.jpg"
    # Text Repeater (3)
    "text-repeater-duplicate-text-10000-times" = "DevKit-13.jpg"
    "repeat-text-online-test-data-patterns" = "DevKit-14.jpg"
    "text-repeater-guide-separators-numbering" = "DevKit-15.jpg"
    # Remove Line Breaks (3)
    "remove-line-breaks-online-clean-text" = "DevKit-16.jpg"
    "remove-extra-spaces-whitespace" = "DevKit-17.jpg"
    "text-cleaner-guide-strip-formatting" = "DevKit-18.jpg"
    # Find and Replace (3)
    "find-and-replace-text-online-guide" = "DevKit-19.jpg"
    "regex-find-and-replace-guide" = "DevKit-20.jpg"
    "search-and-replace-capture-groups" = "DevKit-21.jpg"
    # Lorem Ipsum Generator (3)
    "lorem-ipsum-generator-placeholder-text" = "DevKit-22.jpg"
    "what-is-lorem-ipsum-history" = "DevKit-23.jpg"
    "dummy-text-generator-web-design" = "DevKit-24.jpg"
    # Text Sorter (3)
    "text-sorter-sort-lines-alphabetically" = "DevKit-25.jpg"
    "sort-text-online-alphabetical-numerical" = "DevKit-26.jpg"
    "alphabetical-sort-natural-vs-lexical" = "DevKit-27.jpg"
    # Remove Duplicate Lines (3)
    "remove-duplicate-lines-online" = "DevKit-28.jpg"
    "remove-duplicates-keep-unique-lines" = "DevKit-29.jpg"
    "deduplicate-text-emails-urls-keywords" = "DevKit-30.jpg"
    # Text Converter (3)
    "text-to-binary-hex-base64-converter" = "DevKit-31.jpg"
    "base64-encoder-decoder-guide" = "DevKit-32.jpg"
    "ascii-converter-text-hex-binary" = "DevKit-33.jpg"
    # Text Splitter (3)
    "text-splitter-break-text-into-chunks" = "DevKit-34.jpg"
    "split-text-online-delimiters" = "DevKit-35.jpg"
    "break-text-into-chunks-guide" = "DevKit-36.jpg"
    # Text Joiner (3)
    "text-joiner-merge-lines-online" = "DevKit-37.jpg"
    "join-text-online-custom-separators" = "DevKit-38.jpg"
    "concatenate-text-guide-developers" = "DevKit-39.jpg"
    # Smart Quotes Converter (3)
    "smart-quotes-converter-guide" = "DevKit-40.jpg"
    "curly-quotes-vs-straight-quotes" = "DevKit-41.jpg"
    "typographic-quotes-for-publishing" = "DevKit-42.jpg"
    # Add Line Numbers (3)
    "add-line-numbers-to-text-online" = "DevKit-43.jpg"
    "line-numbering-guide-formatting" = "DevKit-44.jpg"
    "number-text-lines-reference" = "DevKit-45.jpg"
    # Text Wrapper (3)
    "text-wrapper-word-wrap-online" = "DevKit-46.jpg"
    "word-wrap-vs-character-wrap" = "DevKit-47.jpg"
    "wrap-text-for-emails-readme" = "DevKit-48.jpg"
    # Prefix & Suffix Adder (3)
    "prefix-suffix-adder-guide" = "DevKit-49.jpg"
    "add-prefix-to-lines-bulk" = "DevKit-50.jpg"
    "add-suffix-to-lines-batch" = "DevKit-blog-01.jpg"
    # Password Generator (3)
    "password-generator-strong-secure" = "57-bank-security-fingerprint-room.webp"
    "strong-password-best-practices-2026" = "60-watchdog-coins-warehouse.webp"
    "passphrase-vs-password-security" = "120-crypto-wallet-vault-guardian-3d.webp"
    # Random Word Generator (3)
    "random-word-generator-online-free" = "HumanAI-11.jpg"
    "random-word-generator-creative-writing" = "HumanAI-12.jpg"
    "generate-random-words-vocabulary-games" = "HumanAI-13.jpg"
    # Upside Down Text (3)
    "upside-down-text-generator-guide" = "HumanAI-14.jpg"
    "flip-text-upside-down-social-media" = "HumanAI-15.jpg"
    "unicode-flip-text-how-it-works" = "HumanAI-16.jpg"
    # Remove Blank Lines (3)
    "remove-blank-lines-online-guide" = "HumanAI-17.jpg"
    "remove-empty-lines-text-cleanup" = "HumanAI-18.jpg"
    "collapse-blank-lines-guide" = "HumanAI-19.jpg"
    # Privacy Policy Scanner (3)
    "privacy-policy-scanner-gdpr-guide" = "06-shield-protecting-coins.webp"
    "gdpr-ccpa-coppa-compliance-checklist" = "144-insurance-shield-family-dome.webp"
    "privacy-policy-compliance-score" = "199-subscription-audit-magnifier.webp"
    # Readability Checker (3)
    "readability-checker-guide" = "81-financial-literacy-open-book-coins.webp"
    "flesch-kincaid-grade-level-explained" = "82-money-basics-classroom.webp"
    "improve-readability-score-tips" = "63-classroom-compound-interest.webp"
    # Keyword Density Analyzer (3)
    "keyword-density-analyzer-seo-guide" = "138-digital-marketing-analytics-3d.webp"
    "ideal-keyword-density-seo-2026" = "27-woman-rooftop-holographic-chart.webp"
    "avoid-keyword-stuffing-penalties" = "62-character-research-desk-magnifying.webp"
    # Word Frequency Counter (3)
    "word-frequency-counter-guide" = "142-credit-score-gauge-dashboard.webp"
    "word-frequency-analysis-content-optimization" = "64-woman-investment-options-table.webp"
    "character-frequency-analysis-cryptography" = "29-man-trading-floor-screens.webp"
    # Morse Code Translator (3)
    "morse-code-translator-guide" = "HumanAI-20.jpg"
    "learn-morse-code-online-audio" = "HumanAI-21.jpg"
    "morse-code-history-and-uses" = "HumanAI-22.jpg"
    # Email Extractor (3)
    "email-extractor-online-free" = "HumanAI-23.jpg"
    "extract-emails-from-text-regex" = "HumanAI-24.jpg"
    "email-extractor-lead-generation-guide" = "HumanAI-25.jpg"
}

$copied = 0
$failed = 0

foreach ($slug in $mapping.Keys) {
    $srcFile = Join-Path $src $mapping[$slug]
    $ext = [System.IO.Path]::GetExtension($mapping[$slug])
    $dstFile = Join-Path $dst "$slug$ext"
    if (Test-Path $srcFile) {
        Copy-Item $srcFile $dstFile -Force
        $copied++
        Write-Host "Copied: $slug$ext"
    } else {
        $failed++
        Write-Host "MISSING: $srcFile" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Copied: $copied, Failed: $failed"
