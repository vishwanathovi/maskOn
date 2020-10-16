import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WebcamCapture from "./WebcamCapture";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  webModeMain: {
    margin: "10px 0px",
  },
}));

const WebcamMode = (props) => {
  const { prediction, detectAllFaces, changeMode } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.webModeMain}>
      <Grid item container spacing={3}>
        <Grid item xs>
          <Button
            xs={4}
            onClick={() => {
              changeMode("main");
            }}
            variant="contained"
            color="primary"
          >
            Go back
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            onClick={() => {
              changeMode("image-mode");
            }}
            variant="contained"
            color="primary"
          >
            Upload picture
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <WebcamCapture predict={detectAllFaces} />
      </Grid>
    </Grid>
  );
};

export default WebcamMode;
