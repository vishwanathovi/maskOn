import React, { Component } from "react";
import Webcam from "react-webcam";

// const WebcamCapture = () => {
//   const webcamRef = React.useRef(null);
//   const [imgSrc, setImgSrc] = React.useState(null);
//
//   const capture = React.useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImgSrc(imageSrc);
//   }, [webcamRef, setImgSrc]);
//
//   return (
//     <>
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//       <button onClick={capture}>Capture photo</button>
//       {imgSrc && <img src={imgSrc} />}
//     </>
//   );
// };
//
// export default WebcamCapture;

export default class WebcamCapture extends Component {
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
    }, 500);

    this.setState({
      interval,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { predict } = this.props;

    return (
      <>
        <Webcam
          audio={false}
          ref={this.webcamRef}
          screenshotFormat="image/jpeg"
        />
        <img
          id="display-web-img"
          onLoad={predict}
          src={this.state.imgSrc}
          style={{ display: "none" }}
        />
      </>
    );
  }
}
