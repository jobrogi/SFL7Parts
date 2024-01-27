const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/loser", (req, res) => {
  res.send("still a loser");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server Up in Port ${port}`);
});
