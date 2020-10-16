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
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { predict, classes } = this.props;

    return (
      <div className={classes.webcamMain}>
        <Webcam
          id="webcam-video"
          className={classes.webcam}
          audio={false}
          ref={this.webcamRef}
          screenshotFormat="image/jpeg"
        />
        <canvas
          id="webCamCanvas"
          className={classes.canvas}
          width="640"
          height="480"
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
