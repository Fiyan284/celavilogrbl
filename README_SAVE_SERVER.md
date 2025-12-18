Local save server (optional)

This folder contains `save-server.js` — a minimal Express server that serves the static site and exposes a POST /save endpoint which writes `data.json` in this folder.

Install and run locally:

```bash
cd /path/to/RobloxVilog
npm install
npm start
```

Then open http://localhost:3000/web_copy_roblox_vilog.html in your browser. Edits made through the UI will automatically POST to http://localhost:3000/save and the server will overwrite `data.json` in this folder.

Notes:
- If you deploy the static site to Netlify or similar, the save endpoint won't work there without a server. For production you'd need a small server (DigitalOcean, Heroku, or Netlify Functions) and configure CORS/authorization.
- The server runs locally and writes files in this repository folder.
