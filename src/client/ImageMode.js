import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imgMain: { position: "relative" },
  img: {
    position: "absolute",
  },
  canvas: {
    position: "absolute",
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

    // this.predictImage(img);
  };

  const callPredictImage = () => {
    let canvas = document.getElementById("imgCanvas");
    let img = document.getElementById("display-img");

    canvas.width = img.width;
    canvas.height = img.height;

    detectAllFaces("image");
  };

  return (
    <Grid container className="image-mode">
      <Grid item container spacing={3}>
        <Grid item xs>
          <Button
            onClick={() => {
              changeMode("main");
            }}
            xs={4}
          >
            Go back
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" color="primary">
            Upload picture
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            onClick={() => {
              changeMode("webcam-mode");
            }}
          >
            Use webcam
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div>
          <input type="file" onChange={onFileChange} />
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
      <Grid item xs={12}>
        {prediction && <p>Prediction: {prediction}</p>}
      </Grid>
    </Grid>
  );
};

export default ImageMode;

// add a canvas above the image
// draw image on top of it
