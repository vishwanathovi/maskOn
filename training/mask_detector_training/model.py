"""Keras model graph (MobileNetV2 + classification head)."""

from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import AveragePooling2D, Dense, Dropout, Flatten, Input
from tensorflow.keras.models import Model


def build_mask_model() -> Model:
    base_model = MobileNetV2(
        weights="imagenet",
        include_top=False,
        input_tensor=Input(shape=(224, 224, 3)),
    )
    head = base_model.output
    head = AveragePooling2D(pool_size=(7, 7))(head)
    head = Flatten(name="flatten")(head)
    head = Dense(128, activation="relu")(head)
    head = Dropout(0.5)(head)
    head = Dense(2, activation="softmax")(head)
    model = Model(inputs=base_model.input, outputs=head)
    for layer in base_model.layers:
        layer.trainable = False
    return model
