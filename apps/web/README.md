# Face mask web app

React (Vite) client and Express server for in-browser mask detection (TensorFlow.js + face-api.js).

## TensorFlow.js and face-api.js

This app uses **`@tensorflow/tfjs@1.7.0`** so it shares **`@tensorflow/tfjs-core@1.7.0`** with **face-api.js**. Using TF.js 2.x alongside face-api caused WebGL errors (for example `fill` kernel) because two incompatible TF runtimes were loaded. Do not upgrade `@tensorflow/tfjs` without replacing or upgrading face-api.

## Develop

1. Install dependencies: `npm install`
2. Run both processes: `npm run dev`  
   - **Express** serves models and the API on port **8080** (`npm run server` via nodemon)  
   - **Vite** serves the UI on port **3000** and proxies `/model` to **8080**

Or run `npm run server` and `npm run client` in two terminals.

Optional: copy `.env.example` to `.env` and set `VITE_MODEL_BASE_URL` if models are loaded from another origin during dev.

For a production build with models on another host:

```bash
VITE_MODEL_BASE_URL=https://your-site.example npm run build
```

## Production

```bash
npm run start
```

Builds the Vite app into `src/server/build/`, then Express serves the SPA and `/model/*` from `src/server/static/models/` on port **8080** (or `PORT`).

See the [repository root README](../../README.md) for training, export, and the full pipeline.
