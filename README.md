<p align="center">
  <strong>MaskOn</strong> — browser and offline demos for mask vs. no-mask classification
</p>

<p align="center">
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.9%2B-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python 3.9+"></a>
  <a href="https://www.tensorflow.org/"><img src="https://img.shields.io/badge/TensorFlow-Keras-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" alt="TensorFlow / Keras"></a>
  <a href="https://opencv.org/"><img src="https://img.shields.io/badge/OpenCV-4.x-5C3EE8?style=flat-square&logo=opencv&logoColor=white" alt="OpenCV"></a>
  <a href="https://scikit-learn.org/"><img src="https://img.shields.io/badge/scikit--learn-1.x-F7931E?style=flat-square&logo=scikitlearn&logoColor=white" alt="scikit-learn"></a>
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://mui.com/"><img src="https://img.shields.io/badge/MUI-v5-007FFF?style=flat-square&logo=mui&logoColor=white" alt="MUI v5"></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express"></a>
  <a href="https://www.tensorflow.org/js"><img src="https://img.shields.io/badge/TensorFlow.js-1.7-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" alt="TensorFlow.js 1.7"></a>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/ISC"><img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" alt="License ISC"></a>
  <a href="https://github.com/vishwanathovi/maskOn"><img src="https://img.shields.io/github/stars/vishwanathovi/maskOn?style=flat-square&logo=github&label=Stars" alt="GitHub stars"></a>
</p>

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Data and artifacts](#data-and-artifacts)
- [Documentation](#documentation)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Overview

This monorepo implements an end-to-end **computer vision** workflow: train a binary **mask / no-mask** classifier in Python, run optional **OpenCV** tooling on images or webcam, **export** the model to **TensorFlow.js**, and serve a **React** web app where inference runs in the browser (image upload and live webcam) after models load.

The web client uses **face-api.js** (TinyFaceDetector) for face localization and the exported Keras weights for mask classification. **TensorFlow.js is pinned to 1.7.x** to match face-api.js; see [`apps/web/README.md`](apps/web/README.md).

## Features

- **Training** — Keras/TensorFlow pipeline with MobileNetV2-based head, augmentations, metrics, and artifacts under `artifacts/`.
- **Export** — CLI to convert the trained model to TF.js format consumed by the web app.
- **Web application** — React 18, Vite, MUI v5, Express static + model routes; client-side inference with TF.js and face-api.js.
- **Offline inference** — Python CLIs for single-image and webcam paths using the same trained weights.

## Architecture

Training and export live under **`training/`**; the production web bundle and static weights live under **`apps/web/`** (Express serves the SPA and `/model/*`). A concise diagram and feature matrix are in [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md).

## Tech stack

| Layer | Technologies |
|-------|----------------|
| **ML / CV** | Python 3.9+, TensorFlow/Keras, OpenCV, NumPy, scikit-learn, tensorflowjs (export) |
| **Web** | React 18, Vite 5, MUI v5, Emotion, Express, TensorFlow.js 1.7, face-api.js |

## Repository layout

| Path | Description |
|------|-------------|
| [`training/`](training/) | Installable package `mask_detector_training`, dataset path `training/data/dataset`, Caffe SSD assets in `training/third_party/face_detector` |
| [`artifacts/`](artifacts/) | Default training outputs (`mask_detector.model`, plots); TF.js staging (mostly gitignored) |
| [`apps/web/`](apps/web/) | Vite/React client, Express server, TF.js + face-api weights in `src/server/static/models/` |

## Prerequisites

- **Python** ≥ 3.9 and `pip`
- **Node.js** and **npm** (for `apps/web`)

## Getting started

### 1. Train a model

Writes `artifacts/mask_detector.model`:

```bash
cd training
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e .
mask-detector-train
```

Custom dataset directory:

```bash
mask-detector-train -d /path/to/dataset
```

### 2. Export weights for the web

Updates `apps/web/src/server/static/models/maskModel/`:

```bash
pip install -e ".[export]"
mask-detector-export-web
```

### 3. Run the web application

```bash
cd apps/web
npm install
npm run build
npm start
```

Serves the built app and models (default **8080**, or `PORT`).

**Development** (hot client + API):

```bash
npm run dev
```

Express on **8080**, Vite on **3000** with `/model` proxied to the API. See [`apps/web/README.md`](apps/web/README.md).

### 4. Optional: Python image / webcam inference

Requires `artifacts/mask_detector.model` and an activated `training` venv with the package installed:

```bash
mask-detector-infer-image -i training/examples/samples/example_01.png
mask-detector-infer-video
```

## Configuration

| Variable | Scope | Description |
|----------|--------|-------------|
| `VITE_MODEL_BASE_URL` | Web build | Optional origin for loading `model.json` and weights (omit to use the current host). See [`apps/web/.env.example`](apps/web/.env.example). |

## Data and artifacts

`training/data/dataset`, `artifacts/`, and `node_modules/` are not committed by default. Add datasets locally; do not commit secrets or large binaries you do not intend to share.

## Documentation

| Document | Content |
|----------|---------|
| [`training/README.md`](training/README.md) | Python environment, training, and CLIs |
| [`apps/web/README.md`](apps/web/README.md) | Web dev/prod, TF.js + face-api constraints |
| [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) | Overview table, mermaid diagram, version-control note |

## Acknowledgments

- [face-api.js](https://github.com/justadudewhohacks/face-api.js) for in-browser face detection  
- [TensorFlow](https://www.tensorflow.org/) and [TensorFlow.js](https://www.tensorflow.org/js) for training and client-side inference  

## License

The web application is licensed under [ISC](https://opensource.org/licenses/ISC) as declared in [`apps/web/package.json`](apps/web/package.json). Add a root-level `LICENSE` if you want an explicit monorepo-wide statement.
