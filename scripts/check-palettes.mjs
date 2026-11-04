#!/usr/bin/env node
// Checks every palette in css/palettes/ against the template: each slot the
// template names must be set, and nothing the template does not name may be
// set (so palettes stay interchangeable). Run: npm run check
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../css/palettes');
const slotsIn = (css) => [...css.matchAll(/--([a-z0-9-]+)\s*:/g)].map((m) => m[1]);
const required = new Set(slotsIn(readFileSync(join(dir, '_template.css'), 'utf8')));

let failed = false;
for (const file of readdirSync(dir).filter((f) => f.endsWith('.css') && !f.startsWith('_'))) {
  const css = readFileSync(join(dir, file), 'utf8');
  const found = new Set(slotsIn(css));
  const missing = [...required].filter((s) => !found.has(s));
  const extra = [...found].filter((s) => !required.has(s));
  const empty = [...css.matchAll(/--([a-z0-9-]+)\s*:\s*;/g)].map((m) => m[1]);
  const ok = !missing.length && !extra.length && !empty.length;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${file}: ${found.size} slots`);
  if (missing.length) console.log(`     missing: ${missing.join(', ')}`);
  if (extra.length) console.log(`     not in template: ${extra.join(', ')}`);
  if (empty.length) console.log(`     empty: ${empty.join(', ')}`);
  failed ||= !ok;
}
process.exit(failed ? 1 : 0);
