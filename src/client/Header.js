import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  headerMain: {
    backgroundColor: "#0160d2",
    color: "white",
  },
  headerGrid: {
    height: "80px",
  },
  headerGridItem: {
    height: "100%",
  },
  logoImage: {
    height: "100%",
  },
  headerText: {
    fontWeight: "200",
    fontStyle: "Italic",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.headerMain}>
      <Container>
        <Grid
          className={classes.headerGrid}
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.headerGridItem}>
            <img className={classes.logoImage} src={Logo} alt="Main Logo" />
          </Grid>
          <Grid item className={classes.headerGridItem}>
            <h2 className={classes.headerText}>
              {" "}
              A Deep Learning Based Mask Detection System
            </h2>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
