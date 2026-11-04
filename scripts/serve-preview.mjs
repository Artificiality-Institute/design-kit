#!/usr/bin/env node
// Serves the kit folder so preview/index.html can load /css/ and /fonts/.
// Run: npm run preview, then open http://localhost:4173/preview/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html', '.css': 'text/css', '.ttf': 'font/ttf', '.png': 'image/png', '.txt': 'text/plain', '.mjs': 'text/javascript', '.js': 'text/javascript' };
const port = Number(process.env.PORT ?? 4173);

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(port, () => console.log(`kit preview: http://localhost:${port}/preview/`));
