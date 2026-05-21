import fs from 'fs';
import path from 'path';

// Attempt to load the SSR bundle produced by the Vite build
const serverEntryPath = path.resolve(process.cwd(), 'dist', 'server', 'index.js');

let handler;
try {
  if (fs.existsSync(serverEntryPath)) {
    // Dynamically import the built server entry. Vercel's Node runtime uses ESM support
    // but built file might be ESM; use dynamic import.
    const mod = await import(serverEntryPath);
    handler = mod.default || mod.handler || mod;
  } else {
    console.error('SSR server entry not found:', serverEntryPath);
  }
} catch (err) {
  console.error('Error loading SSR server entry:', err);
}

export default async function (req, res) {
  if (!handler) {
    res.statusCode = 500;
    res.end('SSR handler not found on server.');
    return;
  }

  // Adapt Vercel request to the SSR handler expected signature (Cloudflare worker or Node handler)
  try {
    // If handler is a Cloudflare worker default export function expecting a Request, adapt
    if (typeof handler === 'function') {
      // Build a minimal Request-like object
      const url = new URL(req.url, `http://${req.headers.host}`);
      const requestLike = new Request(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req,
      });

      const result = await handler(requestLike);
      // If result is a Response-like object, stream back
      if (result && typeof result.text === 'function') {
        const text = await result.text();
        res.setHeader('content-type', result.headers?.get('content-type') || 'text/html');
        res.statusCode = result.status || 200;
        res.end(text);
        return;
      }

      // Otherwise, attempt JSON
      res.setHeader('content-type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
    }

    // If handler exports `app` or `handle` for Node, try to call it
    if (handler && typeof handler.handle === 'function') {
      await handler.handle(req, res);
      return;
    }

    res.statusCode = 500;
    res.end('Unsupported SSR handler shape.');
  } catch (err) {
    console.error('SSR runtime error', err);
    res.statusCode = 500;
    res.end('SSR runtime error');
  }
}
