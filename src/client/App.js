import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";

import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import CardActionArea from "@material-ui/core/CardActionArea";

import ImageMode from "./ImageMode";
import WebcamMode from "./WebcamMode";

export default class App extends Component {
  state = { username: null, model: null };

  componentDidMount() {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) =>
        this.setState({
          username: user.username,
          photoURL: "",
          imgSrc: "",
          prediction: "",
          mode: "main",
        })
      );

    this.loadModel();
  }

  loadModel = async () => {
    let model = await tf.loadLayersModel(
      "http://localhost:8080/data/model.json" // Define server URL as a constant
    );

    this.setState({ model });
    console.log("model loaded successfully");
  };

  predictImage = async () => {
    const { model } = this.state;
    const img = document.getElementById("display-img");
    let maskFlag;
    let maxPixel = tf.scalar(255);
    let tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([150, 150])
      .toFloat()
      .div(maxPixel)
      .expandDims();

    model
      .predict(tensor)
      .data()
      .then((predictions) => {
        if (predictions < 0.5) {
          maskFlag = "With Mask";
        } else {
          maskFlag = "Without Mask";
        }

        console.log(maskFlag);
        this.setState({
          prediction: maskFlag,
        });
      });

    tf.dispose(tensor);
  };

  changeMode = (mode) => {
    this.setState({
      mode,
    });
  };

  render() {
    const { username, photoURL, imgSrc, prediction, mode } = this.state;
    return (
      <Container>
        <h1> MaskON </h1>
        <h2> A Deep learning based mask detection system</h2>
        <Grid container spacing={5} height="25%" alignItems="center">
          {mode == "main" && (
            <>
              <Grid item xs={6} className="upload-main">
                <Card>
                  <CardActionArea
                    onClick={() => {
                      this.changeMode("image-mode");
                    }}
                  >
                    <PhotoSizeSelectActualOutlinedIcon fontSize="large" />
                    <Typography variant="h4">
                      {" "}
                      Upload Your Own Image{" "}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6} className="webcam-main">
                <Card>
                  <CardActionArea
                    onClick={() => {
                      this.changeMode("webcam-mode");
                    }}
                  >
                    <PhotoCameraOutlinedIcon fontSize="large" />
                    <Typography variant="h4"> Use Webcam </Typography>
                    {/*<WebcamCapture predict={this.predictImage} />*/}
                  </CardActionArea>
                </Card>
              </Grid>
            </>
          )}
          {mode == "image-mode" && (
            <ImageMode
              changeMode={this.changeMode}
              prediction={prediction}
              predictImage={this.predictImage}
            />
          )}
          {mode == "webcam-mode" && (
            <WebcamMode
              changeMode={this.changeMode}
              prediction={prediction}
              predictImage={this.predictImage}
            />
          )}
        </Grid>
      </Container>
    );
  }
}
