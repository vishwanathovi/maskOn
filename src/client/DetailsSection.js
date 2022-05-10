import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

// things to be added in the below section

// flow diagram showing the flow of the app photo/video -> face detection -> mask detection -> displaying the results

// Tech stack used
// React, Node, Css, face-api.js,
// Heroku, GitHub
// Python, Jupyter notebook, tensorflow, DL libraries(panda, numpy, matplotlib etc)

// Improvements that can be done
// Better face detection for masked faces
// Reduce mask detection model size

// Learnings from the project
// Integration of Neural network flow to frontend
// Experience of building overall flow from scratch

const useStyles = makeStyles((theme) => ({
  markdownContainer: {
    // padding: "50px 0",
    // boxShadow: "-1px 15px 30px -12px black",
    // background:
    // "linear-gradient(90deg, rgba(1,96,210,1) 0%, rgba(255,255,255,1) 66%)",
    padding: "20px",
    backgroundColor: "white",
    marginTop: "30px",
    textAlign: "left",
    paddingLeft: "30px",
  },
}));

const DetailsSection = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.markdownContainer}>
      <Typography variant="h4">What is MaskOn and Why is it built?</Typography>
      <Typography variant="body1">
        MaskOn is a simple online app that detects if a person is wearing mask
        or not. The purpose of building this is Educational. Just to build some
        application where deep learning is utilized.
      </Typography>
      <Typography variant="h4">How MaskOn Works?</Typography>
      <CardMedia component="img" image={require("./flow-diagram.png")} />
      <ul>
        <li>
          <Typography variant="body1">
            Face Detection: Model used - Tiny Face Detector, CVPR 2017
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Mask Detection: Model used - Custom CNN (6 Convolution layers + 2
            Dense layers)
          </Typography>
        </li>
      </ul>
      <Typography variant="h4">Tech stack used: </Typography>
      <Typography variant="h5">App Development: </Typography>
      <ul>
        <li>
          <Typography variant="body1">ReactJS, NodeJS</Typography>
        </li>
        <li>
          <Typography variant="body1">
            face-api.js - (React plugin for face detection and drawing
            predictions)
          </Typography>
        </li>
        <li>
          <Typography variant="body1">CSS</Typography>
        </li>
        <li>
          <Typography variant="body1">Tools: Webpack, Babel, Git</Typography>
        </li>
        <li>
          <Typography variant="body1">Deployment: Netlify</Typography>
        </li>
      </ul>
      <Typography variant="h5">Data Science: </Typography>
      <ul>
        <li>
          <Typography variant="body1">Tensorflow</Typography>
        </li>
        <li>
          <Typography variant="body1">OpenCV</Typography>
        </li>
        <li>
          <Typography variant="body1">
            Python: Numpy, Pandas, Matplotlib
          </Typography>
        </li>
        <li>
          <Typography variant="body1">Jupyter Notebook</Typography>
        </li>
      </ul>
      <Typography variant="h4">Future Improvements</Typography>
      <ul>
        <li>
          <Typography variant="body1">
            {" "}
            Improved face detection for the cases of masked faces{" "}
          </Typography>
        </li>
      </ul>
      <Typography variant="body1">
        {" "}
        Current implementation of the face detection model was trained with face
        images with no masks present. Hence the current face detection model
        fails to identify faces that are half covered with the mask. This
        reports some false negatives.{" "}
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            {" "}
            Reduce mask detection model size{" "}
          </Typography>
        </li>
      </ul>
      <Typography variant="body1">
        {" "}
        Currently, a simple CNN architecture is used but it is not optimized.
        Instead of using totally custom model, it will be better to use models
        that are already optimized. Like - mobilenet, tinyyolo etc{" "}
      </Typography>
      <Typography variant="h4">Learnings from the project: </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            Real life obstacles: Most of the time, data science projects are
            carried on past data that is structured in some ways or they don't
            completely cover the different scenarios that might arise during
            real world usage.
          </Typography>
        </li>
      </ul>
    </Card>
  );
};

export default DetailsSection;
