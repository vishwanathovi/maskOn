"""Webcam / video stream mask detection."""

import argparse
import time
from pathlib import Path

import cv2
import imutils
from imutils.video import VideoStream
from tensorflow.keras.models import load_model

from mask_detector_training.face_ssd import load_face_net
from mask_detector_training.paths import (
    default_face_detector_dir,
    default_keras_model_path,
)
from mask_detector_training.pipeline import detect_and_predict_mask


def main() -> None:
    parser = argparse.ArgumentParser(description="Detect masks from webcam.")
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
    parser.add_argument("--src", type=int, default=0, help="Video device index")
    args = parser.parse_args()

    face_dir = args.face or default_face_detector_dir()
    model_path = args.model or default_keras_model_path()
    if not model_path.is_file():
        raise SystemExit(f"Mask model not found: {model_path}")

    face_net = load_face_net(face_dir)
    mask_net = load_model(str(model_path))

    print("[INFO] starting video stream...")
    vs = VideoStream(src=args.src).start()
    time.sleep(2.0)

    while True:
        frame = vs.read()
        frame = imutils.resize(frame, width=400)
        locs, preds = detect_and_predict_mask(
            frame, face_net, mask_net, args.confidence
        )
        if preds.size == 0:
            pass
        else:
            for box, pred in zip(locs, preds):
                (start_x, start_y, end_x, end_y) = box
                (mask, without_mask) = pred
                label = "Mask" if mask > without_mask else "No Mask"
                color = (0, 255, 0) if label == "Mask" else (0, 0, 255)
                label = f"{label}: {max(mask, without_mask) * 100:.2f}%"
                cv2.putText(
                    frame,
                    label,
                    (start_x, start_y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.45,
                    color,
                    2,
                )
                cv2.rectangle(frame, (start_x, start_y), (end_x, end_y), color, 2)

        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break

    cv2.destroyAllWindows()
    vs.stop()


if __name__ == "__main__":
    main()
