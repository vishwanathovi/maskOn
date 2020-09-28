const express = require("express");
const os = require("os");
const cors = require("cors");
var path = require("path");

const app = express();

app.use(cors());
app.options("*", cors());

// app.use(express.static("dist"));
var assetsPath = path.join(__dirname, "./model");
app.use("/data", express.static(assetsPath));

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
