import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WebcamCapture from "./WebcamCapture";

const WebcamMode = (props) => {
  const { prediction, predictImage, changeMode } = props;

  return (
    <Grid container className="image-mode">
      <Grid item container spacing={3}>
        <Grid item xs>
          <Button
            xs={4}
            onClick={() => {
              changeMode("main");
            }}
          >
            Go back
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            onClick={() => {
              changeMode("image-mode");
            }}
          >
            Upload picture
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <WebcamCapture predict={predictImage} />
      </Grid>
      <Grid item xs>
        {prediction && <p>Prediction: {prediction}</p>}
      </Grid>
    </Grid>
  );
};

export default WebcamMode;
