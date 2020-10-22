import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import BackIcon from "./back.svg";
import WebCamIcon from "./web-cam.svg";

const useStyles = makeStyles((theme) => ({
  imgModeMain: {
    margin: "20px 0px",
  },
  imgMain: { position: "relative" },
  img: {
    position: "absolute",
    transform: "translate(-50%, 0%)",
    maxWidth: "90vw",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
  },
  canvas: {
    position: "absolute",
    transform: "translate(-50%, 0%)",
    padding: "10px",
  },
  icon: {
    height: "30px",
    marginRight: "10px",
    filter: "grayscale(100%)",
  },
  uploadButtonContainer: {
    marginTop: "10px",
  },
}));

const ImageMode = (props) => {
  const { detectAllFaces } = props;
  const [imgSrc, setImgSrc] = React.useState(null);
  const classes = useStyles();

  const { prediction, changeMode, predictImage } = props;

  const onFileChange = (event) => {
    var photo = event.target.files[0];
    const photoURL = URL.createObjectURL(photo);

    setImgSrc(photoURL);
  };

  const callPredictImage = () => {
    let canvas = document.getElementById("imgCanvas");
    let img = document.getElementById("display-img");

    canvas.width = img.width;
    canvas.height = img.height;

    detectAllFaces("image");
  };

  return (
    <Grid container className={classes.imgModeMain}>
      <Grid item container spacing={3}>
        <Grid item xs>
          <Button
            className={classes.secondaryButton}
            onClick={() => {
              changeMode("main");
            }}
            xs={4}
            variant="contained"
            color="primary"
          >
            <img className={classes.icon} src={BackIcon} alt="BackIcon" /> Go
            back
          </Button>
        </Grid>

        <Grid item xs>
          <Button
            onClick={() => {
              changeMode("webcam-mode");
            }}
            variant="contained"
            color="primary"
          >
            <img className={classes.icon} src={WebCamIcon} alt="webCamIcon" />{" "}
            Use webcam
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.uploadButtonContainer}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        {imgSrc && (
          <div className={classes.imgMain}>
            <img
              className={classes.img}
              id="display-img"
              onLoad={callPredictImage}
              src={imgSrc}
            />
            <canvas id="imgCanvas" className={classes.canvas}></canvas>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ImageMode;

// add a canvas above the image
// draw image on top of it
