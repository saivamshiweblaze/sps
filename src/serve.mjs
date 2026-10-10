// Minimal static server for dist/ (local preview only).
// Mirrors common static-host behaviour: /services -> /services/ redirect, 404.html fallback.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

async function isFile(p) {
  try { return (await stat(p)).isFile(); } catch { return false; }
}
async function isDir(p) {
  try { return (await stat(p)).isDirectory(); } catch { return false; }
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const rel = decodeURIComponent(url.pathname);
    const file = path.normalize(path.join(dist, rel));
    if (!file.startsWith(dist)) { res.writeHead(400).end(); return; }

    let target = file;
    if (await isDir(file)) {
      if (!rel.endsWith('/')) { res.writeHead(301, { Location: `${rel}/${url.search}` }).end(); return; }
      target = path.join(file, 'index.html');
    }
    if (await isFile(target)) {
      res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
      res.end(await readFile(target));
      return;
    }
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(await readFile(path.join(dist, '404.html')));
  } catch (err) {
    console.error(err);
    res.writeHead(500).end('Server error');
  }
}).listen(port, () => console.log(`SPS site running at http://localhost:${port}/`));
