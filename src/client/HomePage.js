import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  cardMain: {
    // padding: "50px 0",
    // boxShadow: "-1px 15px 30px -12px black",
    // background:
    // "linear-gradient(90deg, rgba(1,96,210,1) 0%, rgba(255,255,255,1) 66%)",
  },
  imgContainer: {},
  img: {
    minWidth: "100%",
    minHeight: "100%",
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { changeMode } = props;

  return (
    <>
      <Grid item xs={6} className="upload-main">
        <Card className="card">
          <CardContent
            className={classes.cardMain}
            onClick={() => {
              changeMode("image-mode");
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={7}>
                <Typography variant="h4"> Upload Own Image </Typography>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.imgContainer}>
                  <img
                    className={classes.img}
                    src={require("./image-photo.jpg")}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} className="webcam-main">
        <Card className="card">
          <CardContent
            className={classes.cardMain}
            onClick={() => {
              changeMode("webcam-mode");
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={7}>
                <Typography variant="h4"> Use Webcam </Typography>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.imgContainer}>
                  <img src={require("./webcam-photo.jpg")} />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default HomePage;
