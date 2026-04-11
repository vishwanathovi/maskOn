# Training and offline inference

Install (from this `training/` directory):

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e .
pip install -e ".[export]"    # only if you run mask-detector-export-web
```

Commands (after install):

| Command | Purpose |
|---------|---------|
| `mask-detector-train` | Train on `../training/data/dataset` → writes `../artifacts/mask_detector.model` |
| `mask-detector-infer-image -i path/to.jpg` | Single-image demo |
| `mask-detector-infer-video` | Webcam demo (press `q` to quit) |
| `mask-detector-export-web` | Keras → TF.js into `apps/web/.../static/models/maskModel` |

Override defaults with `-d` / `-m` / `-f` flags; see `--help` on each command.
