import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const ImageMode = (props) => {
  const [imgSrc, setImgSrc] = React.useState(null);

  const { prediction, changeMode } = props;

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
      <Grid item xs>
        {imgSrc && <img src={imgSrc} />}
      </Grid>
      <Grid item xs>
        {prediction && <p>Prediction: {prediction}</p>}
      </Grid>
    </Grid>
  );
};

export default ImageMode;
