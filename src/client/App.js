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

import WebcamCapture from "./WebcamCapture";

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
          prediction: "with_mask",
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

    // console.log(img);
    let maxPixel = tf.scalar(255);
    let tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([150, 150])
      .toFloat()
      .div(maxPixel)
      .expandDims();

    // console.log("tensor: ", tensor.toString());

    model
      .predict(tensor)
      .data()
      .then((predictions) => {
        let maskFlag = "";
        if (predictions < 0.5) {
          maskFlag = "With Mask";
        } else {
          maskFlag = "Without Mask";
        }
        console.log(maskFlag);
      });

    tf.dispose(tensor);
  };

  onFileChange = (event) => {
    // Update the state
    var photo = event.target.files[0];
    const photoURL = URL.createObjectURL(photo);

    this.setState({ photoURL, photo }, () => {
      // this.predictImage();
    });

    // this.predictImage(img);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    const { username, photoURL, imgSrc, prediction } = this.state;
    return (
      <Container>
        <h1> MaskON </h1>
        <h2> A Deep learning based mask detection system</h2>
        <Grid container spacing={5} height="25%" alignItems="center">
          <Grid item xs={6} className="upload-main">
            <Card>
              <CardActionArea>
                <PhotoSizeSelectActualOutlinedIcon fontSize="large" />
                <Typography variant="h4"> Upload Your Own Image </Typography>
                {/*<div>
                  <input type="file" onChange={this.onFileChange} />
                </div>*/}
                <div>
                  {/* <img
              id="display-img"
              ref={(ref) => {
                this.photoref = ref;
              }}
              src={photoURL}
              width="500px"
              height="500px"
              onLoad={this.predictImage}
            /> */}
                </div>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} className="webcam-main">
            <Card>
              <CardActionArea>
                <PhotoCameraOutlinedIcon fontSize="large" />
                <Typography variant="h4"> Use Webcam </Typography>
                {/*<WebcamCapture predict={this.predictImage} />*/}
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container className="image-mode">
          <Grid item container spacing={3}>
            <Grid item xs>
              <Button xs={4}>Go back</Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained" color="primary">
                Upload picture
              </Button>
            </Grid>
            <Grid item xs>
              <Button>Use webcam</Button>
            </Grid>
          </Grid>
          <Grid item xs>
            {imgSrc && <img src={imgSrc} />}
          </Grid>
          <Grid item xs>
            {prediction && <p>Prediction: {prediction}</p>}
          </Grid>
        </Grid>
      </Container>
    );
  }
}
