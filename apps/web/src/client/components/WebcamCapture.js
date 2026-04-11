import React, { Component } from "react";
import Webcam from "react-webcam";

import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  webcamMain: { position: "relative" },
  webcam: {
    position: "absolute",
    transform: "translate(-50%, 0%)",
    padding: "10px",
  },
  canvas: {
    position: "absolute",
    transform: "translate(-50%, 0%)",
    padding: "10px",
  },
});

class WebcamCapture extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef(null);

    this.state = {
      imgSrc: "",
      interval: "",
    };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      const imgSrc = this.webcamRef.current.getScreenshot();
      this.setState({
        imgSrc,
      });
    }, 1000);

    this.setState({
      interval,
    });
    if (window.innerWidth < 640) {
      this.setState({
        camWidth: 320,
        camHeight: 240,
      });
    } else {
      this.setState({
        camWidth: 640,
        camHeight: 480,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { predict, classes } = this.props;
    const { camWidth, camHeight } = this.state;

    return (
      <div className={classes.webcamMain}>
        <Webcam
          id="webcam-video"
          className={classes.webcam}
          audio={false}
          ref={this.webcamRef}
          screenshotFormat="image/jpeg"
          width={camWidth}
          height={camHeight}
        />
        <canvas
          id="webCamCanvas"
          className={classes.canvas}
          width={camWidth}
          height={camHeight}
        ></canvas>
        <img
          id="display-web-img"
          onLoad={predict}
          src={this.state.imgSrc}
          style={{ display: "none" }}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(WebcamCapture);
