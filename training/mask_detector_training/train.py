"""Train the mask classifier on a folder dataset (class = parent directory name)."""

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from imutils import paths
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelBinarizer
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
from tensorflow.keras.utils import to_categorical

from mask_detector_training.model import build_mask_model
from mask_detector_training.paths import (
    default_artifacts_dir,
    default_dataset_dir,
    default_keras_model_path,
    default_plot_path,
)


def load_dataset(dataset_dir: Path):
    print("[INFO] loading images...")
    image_paths = list(paths.list_images(str(dataset_dir)))
    data = []
    labels = []
    for image_path in image_paths:
        label = Path(image_path).parent.name
        image = load_img(image_path, target_size=(224, 224))
        image = img_to_array(image)
        image = preprocess_input(image)
        data.append(image)
        labels.append(label)
    data = np.array(data, dtype="float32")
    labels = np.array(labels)
    lb = LabelBinarizer()
    labels = lb.fit_transform(labels)
    labels = to_categorical(labels)
    return data, labels, lb


def run_training(
    dataset_dir: Path,
    model_out: Path,
    plot_out: Path,
    epochs: int = 20,
    batch_size: int = 32,
    init_lr: float = 1e-4,
) -> Model:
    default_artifacts_dir().mkdir(parents=True, exist_ok=True)

    data, labels, lb = load_dataset(dataset_dir)
    (train_x, test_x, train_y, test_y) = train_test_split(
        data, labels, test_size=0.20, stratify=labels, random_state=42
    )

    aug = ImageDataGenerator(
        rotation_range=20,
        zoom_range=0.15,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.15,
        horizontal_flip=True,
        fill_mode="nearest",
    )

    model = build_mask_model()
    opt = Adam(learning_rate=init_lr)
    model.compile(loss="binary_crossentropy", optimizer=opt, metrics=["accuracy"])

    print("[INFO] training head...")
    history = model.fit(
        aug.flow(train_x, train_y, batch_size=batch_size),
        steps_per_epoch=len(train_x) // batch_size,
        validation_data=(test_x, test_y),
        validation_steps=max(1, len(test_x) // batch_size),
        epochs=epochs,
    )

    print("[INFO] evaluating network...")
    pred_idxs = np.argmax(model.predict(test_x, batch_size=batch_size), axis=1)
    print(
        classification_report(
            test_y.argmax(axis=1), pred_idxs, target_names=lb.classes_
        )
    )

    model_out.parent.mkdir(parents=True, exist_ok=True)
    print(f"[INFO] saving mask detector model to {model_out}...")
    model.save(str(model_out), save_format="h5")

    n = epochs
    plt.style.use("ggplot")
    plt.figure()
    plt.plot(np.arange(0, n), history.history["loss"], label="train_loss")
    plt.plot(np.arange(0, n), history.history["val_loss"], label="val_loss")
    plt.plot(np.arange(0, n), history.history["accuracy"], label="train_acc")
    plt.plot(np.arange(0, n), history.history["val_accuracy"], label="val_acc")
    plt.title("Training Loss and Accuracy")
    plt.xlabel("Epoch #")
    plt.ylabel("Loss/Accuracy")
    plt.legend(loc="lower left")
    plot_out.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(str(plot_out))
    print(f"[INFO] saved plot to {plot_out}")
    return model


def main() -> None:
    parser = argparse.ArgumentParser(description="Train face mask classifier.")
    parser.add_argument(
        "-d",
        "--dataset",
        type=Path,
        default=None,
        help="Dataset root with class subfolders (default: monorepo training/data/dataset)",
    )
    parser.add_argument(
        "-p",
        "--plot",
        type=Path,
        default=None,
        help="Output training plot path (default: artifacts/plot.png)",
    )
    parser.add_argument(
        "-m",
        "--model",
        type=Path,
        default=None,
        help="Output Keras model path (default: artifacts/mask_detector.model)",
    )
    parser.add_argument("--epochs", type=int, default=20)
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--lr", type=float, default=1e-4)
    args = parser.parse_args()

    dataset_dir = args.dataset or default_dataset_dir()
    if not dataset_dir.is_dir():
        raise SystemExit(f"Dataset directory not found: {dataset_dir}")

    run_training(
        dataset_dir=dataset_dir,
        model_out=args.model or default_keras_model_path(),
        plot_out=args.plot or default_plot_path(),
        epochs=args.epochs,
        batch_size=args.batch_size,
        init_lr=args.lr,
    )


if __name__ == "__main__":
    main()
