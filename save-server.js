const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Allow CORS for local testing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static files from this folder (so you can open http://localhost:3000/web_copy_roblox_vilog.html)
app.use(express.static(path.join(__dirname)));

// Endpoint to save data.json
app.post('/save', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'data.json');

  // Validate basic shape: should be an array
  if(!Array.isArray(data)){
    return res.status(400).json({ ok: false, error: 'Payload must be an array' });
  }

  fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if(err) return res.status(500).json({ ok: false, error: err.message });
    return res.json({ ok: true, message: 'data.json saved' });
  });
});

app.listen(PORT, () => {
  console.log(`Save server running on http://localhost:${PORT}`);
});