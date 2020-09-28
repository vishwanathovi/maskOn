import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";

import axios from "axios";
import * as tf from "@tensorflow/tfjs";

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => this.setState({ username: user.username }));
  }

  loadModel = async () => {
    const model = await tf.loadLayersModel(
      "http://localhost:8080/data/model.json" // Define server URL as a constant
    );
    console.log("model loaded successfully");
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
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
    const { username } = this.state;
    return (
      <div>
        <h1> MaskON </h1>
        <button onClick={this.loadModel}> Load model </button>
        <div className="upload-main">
          <h3> Upload Your Own Image </h3>
          <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div>
          {this.fileData()}
        </div>
        <div className="webcam-main">
          <h3> Start Webcam </h3>
        </div>
        <div className="default-images-main">
          <h3> Choose from a default list of Images </h3>
        </div>
      </div>
    );
  }
}
