"""Repository layout: monorepo root relative to this package."""

from pathlib import Path

_PKG_DIR = Path(__file__).resolve().parent
_TRAINING_DIR = _PKG_DIR.parent
REPO_ROOT = _TRAINING_DIR.parent


def default_dataset_dir() -> Path:
    return REPO_ROOT / "training" / "data" / "dataset"


def default_face_detector_dir() -> Path:
    return REPO_ROOT / "training" / "third_party" / "face_detector"


def default_artifacts_dir() -> Path:
    return REPO_ROOT / "artifacts"


def default_keras_model_path() -> Path:
    return default_artifacts_dir() / "mask_detector.model"


def default_plot_path() -> Path:
    return default_artifacts_dir() / "plot.png"


def default_web_mask_model_dir() -> Path:
    return (
        REPO_ROOT
        / "apps"
        / "web"
        / "src"
        / "server"
        / "static"
        / "models"
        / "maskModel"
    )
