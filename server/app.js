const http = require("http");
const express = require("express");
const cors = require('cors')

const schoolRouter = require('./routes/school')

const { json, urlencoded } = express;
const connectDB = require("./db");

connectDB();
const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(json());
app.use(urlencoded({ extended: false }));

//define routes
app.use("/school", schoolRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});


module.exports = { app, server };