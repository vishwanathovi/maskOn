# Project 3: Face-Mask-Detector

Monorepo for **training** a face-mask classifier (Keras), **offline** OpenCV demos, and a **browser** app (React + TensorFlow.js + face-api.js).

## Layout

| Path | Role |
|------|------|
| [`training/`](training/) | Python package (`mask_detector_training`), dataset under `training/data/dataset`, Caffe SSD weights under `training/third_party/face_detector` |
| [`artifacts/`](artifacts/) | Default outputs: `mask_detector.model`, `plot.png`, TF.js staging (gitignored except `.gitkeep`) |
| [`apps/web/`](apps/web/) | Express + Vite/React UI; static TF.js + face-api weights in `src/server/static/models/` |

## Pipeline

1. **Train** (writes `artifacts/mask_detector.model`):

   ```bash
   cd training
   python -m venv .venv && source .venv/bin/activate
   pip install -e .
   mask-detector-train
   ```

   Override dataset path: `mask-detector-train -d /path/to/dataset`.

2. **Export for web** (overwrites `apps/web/src/server/static/models/maskModel/`):

   ```bash
   pip install -e ".[export]"
   mask-detector-export-web
   ```

3. **Run web app**:

   ```bash
   cd apps/web
   npm install
   npm run build
   npm start
   ```

   Dev: `npm run dev` (or terminal A `npm run server`, terminal B `npm run client`; Vite on 3000 proxies `/model` to 8080).

4. **Optional** — offline image/webcam (requires `artifacts/mask_detector.model`):

   ```bash
   mask-detector-infer-image -i training/examples/samples/example_01.png
   mask-detector-infer-video
   ```

## Configuration

- **Model URL in the browser:** optional `VITE_MODEL_BASE_URL` at build time (see [`apps/web/.env.example`](apps/web/.env.example)).

## Git and large files

`training/data/dataset`, `artifacts/`, and `node_modules` are ignored by default. Add datasets locally; do not commit secrets.
