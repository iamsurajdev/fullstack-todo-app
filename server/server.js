const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

//import routes
const todoRoutes = require("./routes/todo");

//routes
app.use("/api", todoRoutes);

// Connecting with the DB
mongoose.connect(process.env.DB_CONNECTION_URL);

//create a server object:
app.listen(PORT, () => {
  console.log("starting the server");
});