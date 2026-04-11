# Face mask web app

React + Webpack client and Express server for in-browser mask detection (TensorFlow.js + face-api.js).

## Develop

1. Install dependencies: `npm install`
2. Terminal A — API + static models: `npm run server` (port **8080**)
3. Terminal B — webpack dev server: `npm run client` (port **3000**, proxies `/model` to 8080)

Optional: set `MODEL_BASE_URL` when building if models are hosted on another origin (e.g. Netlify):

```bash
MODEL_BASE_URL=https://your-site.netlify.app npm run build
```

## Production

```bash
npm run start
```

Serves the built SPA and `/model/*` from `src/server/static/models/` on port 8080 (or `PORT`).

See the [repository root README](../../README.md) for training, export, and the full pipeline.
