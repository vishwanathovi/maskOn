"""OpenCV DNN face detector (Caffe SSD)."""

from pathlib import Path

import cv2


def load_face_net(face_dir: Path):
    prototxt = face_dir / "deploy.prototxt"
    weights = face_dir / "res10_300x300_ssd_iter_140000.caffemodel"
    if not prototxt.is_file() or not weights.is_file():
        raise FileNotFoundError(
            f"Expected Caffe SSD files under {face_dir} (deploy.prototxt + .caffemodel)."
        )
    return cv2.dnn.readNet(str(prototxt), str(weights))
