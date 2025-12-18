const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// GANTI KEY INI
const ADMIN_KEY = process.env.ADMIN_KEY || 'RAHASIA123';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS (optional)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/* =========================
   ROUTE PUBLIK
========================= */

// HALAMAN PUBLIK
app.get('/status', (req, res) => {
  res.sendFile(path.join(__dirname, 'status.html'));
});

/* =========================
   ROUTE ADMIN (TERKUNCI)
========================= */

// HALAMAN ADMIN (index.html)
app.get('/admin', (req, res) => {
  const key = req.query.key;

  if (key !== ADMIN_KEY) {
    return res.status(403).send('403 Forbidden');
  }

  res.sendFile(path.join(__dirname, 'index.html'));
});

// SAVE DATA (ADMIN ONLY)
app.post('/save', (req, res) => {
  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ ok: false, error: 'Forbidden' });
  }

  const data = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({ ok: false, error: 'Payload must be an array' });
  }

  fs.writeFile(
    path.join(__dirname, 'data.json'),
    JSON.stringify(data, null, 2),
    'utf8',
    (err) => {
      if (err) return res.status(500).json({ ok: false, error: err.message });
      res.json({ ok: true, message: 'data.json saved' });
    }
  );
});

/* =========================
   BLOCK FILE LANGSUNG
========================= */

// BLOK AKSES LANGSUNG KE FILE HTML
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
