// start express server
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//use env
require("dotenv/config");
// const config = require("./config/database");

mongoose.connect(
  //use env
  process.env.MONGODB_URI
   , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// on connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + "mongodb://localhost:27017");
});

// on error
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

// cors middleware
app.use(cors());

// app.use(bodyParser.json());
app.use(express.json());

// Import routes
const profileRoute = require("./routes/profile");
const collectionRoute = require("./routes/collection");
const nftRoutes = require("./routes/nfts");
const { sendEmail } = require("./controllers/emailController");

//home
app.get("/", (req, res) => {
  res.send("Home");
});

// Middleware
app.use("/api/profiles", profileRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/nfts", nftRoutes);

// route for sending email
app.post('/api/sendmail', sendEmail);


//start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
