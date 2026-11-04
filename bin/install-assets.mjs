#!/usr/bin/env node
// Copies the kit's fonts and logos into a project's static folder so the
// /fonts/ and /assets/ paths in the CSS resolve on the web, in headless
// rendering and offline. Run from the project root after installing the kit:
//   npx design-kit-install            # writes static/fonts and static/assets
//   npx design-kit-install site/static  # another static folder
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const kit = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(process.argv[2] ?? 'static');

for (const dir of ['fonts', 'assets']) {
  const from = join(kit, dir);
  const to = join(target, dir);
  if (!existsSync(from)) continue;
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log(`copied ${dir}/ -> ${to}`);
}
