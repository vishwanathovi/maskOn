import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";

import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

export default class App extends Component {
  state = { username: null, model: null };

  componentDidMount() {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => this.setState({ username: user.username, photoURL: "" }));
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
    const { username, photoURL } = this.state;
    return (
      <div>
        <h1> MaskON </h1>
        <button onClick={this.loadModel}> Load model </button>
        <div className="upload-main">
          <h3> Upload Your Own Image </h3>
          <div>
            <input type="file" onChange={this.onFileChange} />
          </div>
          {this.fileData()}
          <div>
            <img
              id="display-img"
              ref={(ref) => {
                this.photoref = ref;
              }}
              src={photoURL}
              width="500px"
              height="500px"
              onLoad={this.predictImage}
            />
          </div>
        </div>
        <div className="webcam-main">
          <h3> Start Webcam </h3>
          <Webcam />
        </div>
        <div className="default-images-main">
          <h3> Choose from a default list of Images </h3>
        </div>
      </div>
    );
  }
}
