import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
      <h1> MaskON </h1>
        <div className="upload-main">
        <h3> Upload Your Own Image </h3>
        <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
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
