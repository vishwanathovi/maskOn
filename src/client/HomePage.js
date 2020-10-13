import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  cardMain: {
    padding: "50px 0",
    boxShadow: "-1px 15px 30px -12px black",
    background:
      "linear-gradient(90deg, rgba(1,96,210,1) 0%, rgba(255,255,255,1) 66%)",
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { changeMode } = props;

  return (
    <>
      <Grid item xs={6} className="upload-main">
        <Card>
          <CardActionArea
            className={classes.cardMain}
            onClick={() => {
              changeMode("image-mode");
            }}
          >
            <PhotoSizeSelectActualOutlinedIcon fontSize="large" />
            <Typography variant="h4"> Upload Own Image </Typography>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={6} className="webcam-main">
        <Card>
          <CardActionArea
            className={classes.cardMain}
            onClick={() => {
              changeMode("webcam-mode");
            }}
          >
            <PhotoCameraOutlinedIcon fontSize="large" />
            <Typography variant="h4"> Use Webcam </Typography>
            {/*<WebcamCapture predict={this.predictImage} />*/}
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default HomePage;
