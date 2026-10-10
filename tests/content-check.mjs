// Content-preservation check: every text fragment of the original pages must be
// findable in the built site after normalisation (case, spacing, punctuation and
// unit formatting). Anything not found is printed for manual review and must be
// listed in docs/content-inventory.md as an intentional, logged edit.
//   node tests/content-check.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sources = ['source-original/original-homepage-download.html', 'source-original/original-services-live.html'];

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const stripTags = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' '));

// Normalise for comparison: unit spacing/case, typography, punctuation and whitespace.
const norm = (s) =>
  s.toLowerCase()
    .replace(/[“”"‘’'`]/g, '')
    .replace(/[–—-]/g, ' ')
    .replace(/\bupto\b/g, 'up to')
    .replace(/(\d)\s*(kv|v|a|va|kva|hz)\b/g, '$1$2')
    .replace(/[^a-z0-9&/+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Fragments: text of each leaf block element in the source.
function fragments(html) {
  const out = [];
  const re = /<(h[1-6]|p|li|td|th|a)\b[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html))) {
    if (/<(p|li|div|ul)\b/.test(m[2])) continue; // only leaf blocks
    const text = stripTags(m[2]).replace(/\s+/g, ' ').trim();
    if (text.length > 1) out.push(text);
  }
  return [...new Set(out)];
}

function builtText() {
  const files = [];
  const walk = (d) => readdirSync(d).forEach((f) => {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) files.push(p);
  });
  walk(path.join(root, 'dist'));
  return norm(files.map((f) => stripTags(readFileSync(f, 'utf8'))).join(' \n '));
}

const site = builtText();
let total = 0;
const missing = [];
for (const src of sources) {
  for (const frag of fragments(readFileSync(path.join(root, src), 'utf8'))) {
    total++;
    if (!site.includes(norm(frag))) missing.push({ src: path.basename(src), frag });
  }
}
console.log(`${total} original text fragments checked, ${total - missing.length} found verbatim (normalised).`);
if (missing.length) {
  console.log(`\n${missing.length} fragment(s) not found verbatim — each must be a logged edit in docs/content-inventory.md:\n`);
  missing.forEach((m) => console.log(`  [${m.src}] ${m.frag}`));
}
