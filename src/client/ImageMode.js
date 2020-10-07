import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const ImageMode = (props) => {
  const [imgSrc, setImgSrc] = React.useState(null);

  const { prediction, changeMode, predictImage } = props;

  const onFileChange = (event) => {
    // Update the state
    var photo = event.target.files[0];
    const photoURL = URL.createObjectURL(photo);

    setImgSrc(photoURL);

    // this.predictImage(img);
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
        {imgSrc && <img id="display-img" onLoad={predictImage} src={imgSrc} />}
      </Grid>
      <Grid item xs={12}>
        {prediction && <p>Prediction: {prediction}</p>}
      </Grid>
    </Grid>
  );
};

export default ImageMode;