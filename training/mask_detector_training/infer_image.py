"""Run mask detection on a single image (OpenCV window)."""

import argparse
from pathlib import Path

import cv2
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

from mask_detector_training.face_ssd import load_face_net
from mask_detector_training.paths import (
    default_face_detector_dir,
    default_keras_model_path,
)


def main() -> None:
    parser = argparse.ArgumentParser(description="Detect masks in one image.")
    parser.add_argument("-i", "--image", type=Path, required=True, help="Input image path")
    parser.add_argument(
        "-f",
        "--face",
        type=Path,
        default=None,
        help="Face detector directory (default: training/third_party/face_detector)",
    )
    parser.add_argument(
        "-m",
        "--model",
        type=Path,
        default=None,
        help="Keras mask model (default: artifacts/mask_detector.model)",
    )
    parser.add_argument("-c", "--confidence", type=float, default=0.5)
    args = parser.parse_args()

    face_dir = args.face or default_face_detector_dir()
    model_path = args.model or default_keras_model_path()
    if not model_path.is_file():
        raise SystemExit(f"Mask model not found: {model_path}. Train or copy weights first.")

    face_net = load_face_net(face_dir)
    model = load_model(str(model_path))

    image = cv2.imread(str(args.image))
    if image is None:
        raise SystemExit(f"Could not read image: {args.image}")
    (h, w) = image.shape[:2]

    blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300), (104.0, 177.0, 123.0))
    face_net.setInput(blob)
    detections = face_net.forward()

    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > args.confidence:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (start_x, start_y, end_x, end_y) = box.astype("int")
            start_x, start_y = max(0, start_x), max(0, start_y)
            end_x, end_y = min(w - 1, end_x), min(h - 1, end_y)
            face = image[start_y:end_y, start_x:end_x]
            if face.size == 0:
                continue
            face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
            face = cv2.resize(face, (224, 224))
            face = img_to_array(face)
            face = preprocess_input(face)
            face = np.expand_dims(face, axis=0)
            (mask, without_mask) = model.predict(face)[0]
            label = "Mask" if mask > without_mask else "No Mask"
            color = (0, 255, 0) if label == "Mask" else (0, 0, 255)
            label = f"{label}: {max(mask, without_mask) * 100:.2f}%"
            cv2.putText(
                image, label, (start_x, start_y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2
            )
            cv2.rectangle(image, (start_x, start_y), (end_x, end_y), color, 2)

    cv2.imshow("Output", image)
    cv2.waitKey(0)


if __name__ == "__main__":
    main()
