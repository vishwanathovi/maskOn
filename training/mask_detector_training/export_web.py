"""Export trained Keras model to TensorFlow.js format for apps/web."""

import argparse
import shutil
from pathlib import Path

from tensorflow.keras.models import load_model

from mask_detector_training.paths import (
    default_artifacts_dir,
    default_keras_model_path,
    default_web_mask_model_dir,
)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert Keras mask model to TF.js and copy into the web app static tree."
    )
    parser.add_argument(
        "-m",
        "--model",
        type=Path,
        default=None,
        help="Input Keras model (default: artifacts/mask_detector.model)",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=None,
        help="TF.js output directory (default: apps/web/.../static/models/maskModel)",
    )
    parser.add_argument(
        "--staging",
        type=Path,
        default=None,
        help="Optional staging directory before copy (default: artifacts/tfjs_mask_staging)",
    )
    args = parser.parse_args()

    model_path = args.model or default_keras_model_path()
    if not model_path.is_file():
        raise SystemExit(f"Keras model not found: {model_path}")

    staging = args.staging or (default_artifacts_dir() / "tfjs_mask_staging")
    final_dir = args.output or default_web_mask_model_dir()

    staging.mkdir(parents=True, exist_ok=True)
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir(parents=True, exist_ok=True)

    try:
        import tensorflowjs as tfjs
    except ImportError as e:
        raise SystemExit(
            "Install tensorflowjs: pip install tensorflowjs\n" + str(e)
        ) from e

    model = load_model(str(model_path))
    tfjs.converters.save_keras_model(model, str(staging))
    print(f"[INFO] exported TF.js to {staging}")

    final_dir.parent.mkdir(parents=True, exist_ok=True)
    if final_dir.exists():
        shutil.rmtree(final_dir)
    shutil.copytree(staging, final_dir)
    print(f"[INFO] copied TF.js bundle to {final_dir}")
    print("[INFO] Rebuild the web app: cd apps/web && npm run build")


if __name__ == "__main__":
    main()
