import React, { Component } from "react";
import "./app.css";

import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import ImageMode from "./ImageMode";
import WebcamMode from "./WebcamMode";
import Header from "./Header";
import HomePage from "./HomePage";
// import DetailsSection from "./DetailsSection";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#0160d2",
    },
  },
});

const useStyles = (theme) => ({
  containerMain: {
    padding: "15px",
  },
});

class App extends Component {
  state = {
    model: null,
    mode: "main",
  };

  componentDidMount() {
    this.loadModel();
  }

  loadModel = async () => {
    // let url = "https://mask-on-dl.herokuapp.com/";
    let url = "http://localhost:8080/";

    if (process.env.NODE_ENV === "production") {
      url = "https://mask-on-dl.herokuapp.com/";
    }

    let model = await tf.loadLayersModel(
      url + "data/maskModel/model.json" // TODO:: Define server URL as a constant
    );

    console.log("Info:: Mask model loaded successfully");

    await faceapi.nets.tinyFaceDetector.load(
      url +
        "data/faceDetectionModel/tiny_face_detector_model-weights_manifest.json"
    );

    console.log("Info:: Face model loaded successfully");

    this.setState({ model });
  };

  /*
  Detects all the faces from the Image/Webcam and calls predictImage and drawMaskDetections

  Inputs:
    mode: image/webcam

  Returns:
    None
*/
  detectAllFaces = async () => {
    let { mode } = this.state;
    let input;
    if (mode == "webcam-mode") {
      input = document.getElementById("display-web-img");
    } else {
      input = document.getElementById("display-img");
    }

    if (!input) return;

    const displaySize = { width: input.width, height: input.height };
    const detections = await faceapi.detectAllFaces(
      input,
      new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.3 })
    );
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    let canvases = await faceapi.extractFaces(input, resizedDetections);

    let predictions = await this.predictImage(canvases);

    this.drawMaskDetections(predictions, resizedDetections);
  };

  /*
    Draws the predictions on the Image/WebCam

    Input:
      predictions: details on the mask prediction

    Output:
      None
  */

  drawMaskDetections = (predictions, resizedDetections) => {
    if (!predictions || !resizedDetections) return;

    let { mode } = this.state;
    var input;
    var camCanvas;
    if (mode == "webcam-mode") {
      input = document.getElementById("display-web-img");
      camCanvas = document.getElementById("webCamCanvas");
    } else {
      input = document.getElementById("display-img");
      camCanvas = document.getElementById("imgCanvas");
    }

    if (!input || !camCanvas) return;

    const displaySize = { width: input.width, height: input.height };

    const context = camCanvas.getContext("2d"); // Clearing the canvas
    context.clearRect(0, 0, camCanvas.width, camCanvas.height);

    for (let i = 0; i < predictions.length; i++) {
      let maskFlag = predictions[i] > 0.5 ? "Without Mask" : "With Mask";

      let box = resizedDetections[i]._box;
      let drawOptions = {
        label: maskFlag,
      };

      const drawBox = new faceapi.draw.DrawBox(box, drawOptions);
      drawBox.draw(camCanvas);
    }
  };

  /*
    Predicts the mask presence and sends out updated canvases

    Input:
      canvases: List of canvases having face images

    Output:
      predictions: List of mask prediction data for each element in the canvases

  */
  predictImage = async (canvases) => {
    if (!canvases) return;

    const { model, mode } = this.state;

    var img;
    var predictions = [];
    var confidenceValue;

    for (let i = 0; i < canvases.length; i++) {
      img = canvases[i];
      let tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([150, 150])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();

      await model
        .predict(tensor)
        .data()
        .then((confidence) => {
          predictions.push(confidence[0]);
        });

      tf.dispose(tensor);
    }
    return predictions;
  };

  changeMode = (mode) => {
    this.setState({
      mode,
    });
  };

  changeView = () => {
    const { mode } = this.state;
    switch (mode) {
      case "main":
        return <HomePage changeMode={this.changeMode} />;
      case "image-mode":
        return (
          <ImageMode
            changeMode={this.changeMode}
            detectAllFaces={this.detectAllFaces}
          />
        );
      case "webcam-mode":
        return (
          <WebcamMode
            changeMode={this.changeMode}
            detectAllFaces={this.detectAllFaces}
          />
        );
        break;
      default:
    }
  };

  render() {
    const {
      username,
      photoURL,
      imgSrc,
      prediction,
      mode,
      testSrc,
    } = this.state;
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={THEME}>
        <Header />
        <Container className={classes.containerMain}>
          <Grid container spacing={5} height="25%" alignItems="center">
            {this.changeView(mode)}
          </Grid>
          {/* <DetailsSection /> */}
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(App);
