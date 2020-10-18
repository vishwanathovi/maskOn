import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  cardMain: {
    // padding: "50px 0",
    // boxShadow: "-1px 15px 30px -12px black",
    // background:
    // "linear-gradient(90deg, rgba(1,96,210,1) 0%, rgba(255,255,255,1) 66%)",
    width: "100%",
  },
  imgContainer: {
    width: "100%",
  },
  img: {
    minWidth: "100%",
    minHeight: "100%",
  },
  cardText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { changeMode } = props;

  return (
    <>
      <Grid item sm={12} md={6} className="upload-main">
        <Card className="card">
          <CardContent
            className={classes.cardMain}
            onClick={() => {
              changeMode("image-mode");
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={7}>
                <Typography variant="h4" className={classes.cardText}>
                  {" "}
                  Upload Own Image{" "}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.imgContainer}>
                  <CardMedia
                    component="img"
                    image={require("./image-photo.jpg")}
                    className={classes.img}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={6} className="webcam-main">
        <Card className="card">
          <CardContent
            className={classes.cardMain}
            onClick={() => {
              changeMode("webcam-mode");
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={7}>
                <Typography variant="h4" className={classes.cardText}>
                  {" "}
                  Use Webcam{" "}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.imgContainer}>
                  <CardMedia
                    component="img"
                    image={require("./webcam-photo.jpg")}
                    className={classes.img}
                  />
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
