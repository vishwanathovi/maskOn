import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Logo from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  headerMain: {
    backgroundColor: "#0160d2",
    color: "white",
  },
  headerGrid: {
    height: "80px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  headerGridItem: {
    height: "100%",
  },
  headerGridItem2: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
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
          <Grid
            item
            className={`${classes.headerGridItem} ${classes.headerGridItem2}`}
          >
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
