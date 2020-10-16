import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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

let markdownText =
  "# Implementation Details\n**Todo: Add Implementation flow diagram**\n# Tech Stack Used\n## Application(Frontend, Backend, Tools)\n* React\n* CSS\n* face-api.js - A JS extension used for easy implementation of face detection and display of detections\n* Webpack\n## Deployement\n* Heroku\n* Github\n## Data science\n* Python - (Numpy, Pandas, MatPlotLib etc)\n* Jupyter Notebook\n* Tensorflow\n* OpenCV\n* Google Colab - (Platform for training)\n# Future Improvements\n* **Improved face detection for the cases of masked faces**\nCurrent implementation of the face detection model was trained with face images with no masks present. Hence the current face detection model fails to identify faces that are half covered with the mask. This reports some false negatives.\n* **Reduce mask detection model size**\nCurrently, a simple CNN architecture is used but it is not optimized. Instead of using totally custom model, it will be better to use models that are already optimized. Like - mobilenet, tinyyolo etc\n# Learnings from the project\n* **Jupyter-notebook to An actual app**\n";

const DetailsSection = (props) => {
  return (
    <>
      <ReactMarkdown source={markdownText} />
    </>
  );
};

export default DetailsSection;
