const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

// Firebase client config injected from server env vars
const firebaseConfig = {
  apiKey:            process.env.FIREBASE_API_KEY            || process.env.VITE_FIREBASE_API_KEY            || '',
  authDomain:        process.env.FIREBASE_AUTH_DOMAIN        || process.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
  projectId:         process.env.FIREBASE_PROJECT_ID         || process.env.VITE_FIREBASE_PROJECT_ID         || '',
  storageBucket:     process.env.FIREBASE_STORAGE_BUCKET     || process.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID|| process.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| '',
  appId:             process.env.FIREBASE_APP_ID             || process.env.VITE_FIREBASE_APP_ID             || '',
};

const firebaseConfigJS = `window.__FIREBASE_CONFIG__ = ${JSON.stringify(firebaseConfig)};`;

const server = http.createServer((req, res) => {
  // Serve Firebase config dynamically
  if (req.url === '/firebase-config.js' || req.url.startsWith('/firebase-config.js?')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-store' });
    res.end(firebaseConfigJS);
    return;
  }

  // Strip query strings for file lookup
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(__dirname, urlPath);
  const ext      = path.extname(filePath);
  const mime     = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Montra server running on http://0.0.0.0:${PORT}`);
});
