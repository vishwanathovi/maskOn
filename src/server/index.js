const express = require("express");
const os = require("os");
const cors = require("cors");
var path = require("path");

const app = express();

app.use(cors());
app.options("*", cors());

// app.use(express.static("dist"));

// console.log("Test::Vishwa ", __dirname)
var assetsPath = path.join(__dirname, "./model");
app.use("/model", express.static(assetsPath));
app.use(express.static(path.join(__dirname, "./build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
