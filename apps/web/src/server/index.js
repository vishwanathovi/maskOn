const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.options("*", cors());

const buildDir = path.join(__dirname, "build");
const modelsPath = path.join(__dirname, "static", "models");

app.use("/model", express.static(modelsPath));
app.use(express.static(buildDir));

app.get("/*", (req, res) => {
  res.sendFile(path.join(buildDir, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  console.log(`Models served from ${modelsPath}`);
});
