import React, { Component } from "react";
import "./app.css";

import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import ImageMode from "./ImageMode";
import WebcamMode from "./WebcamMode";
import Header from "./Header";
import HomePage from "./HomePage";

const useStyles = (theme) => ({
  containerMain: {
    padding: "15px",
  },
});

class App extends Component {
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
    const { model, mode } = this.state;
    var img;
    if (mode == "image-mode") {
      img = document.getElementById("display-img");
    } else {
      img = document.getElementById("display-web-img");
    }

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

  changeView = () => {
    const { username, photoURL, imgSrc, prediction, mode } = this.state;
    switch (mode) {
      case "main":
        return <HomePage changeMode={this.changeMode} />;
      case "image-mode":
        return (
          <ImageMode
            changeMode={this.changeMode}
            prediction={prediction}
            predictImage={this.predictImage}
          />
        );
      case "webcam-mode":
        return (
          <WebcamMode
            changeMode={this.changeMode}
            prediction={prediction}
            predictImage={this.predictImage}
          />
        );
        break;
      default:
    }
  };

  render() {
    const { username, photoURL, imgSrc, prediction, mode } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Header />
        <Container className={classes.containerMain}>
          <Grid container spacing={5} height="25%" alignItems="center">
            {this.changeView(mode)}
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(App);
