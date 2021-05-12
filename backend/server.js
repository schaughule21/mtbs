const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const usersRouter = require("./routes/user");
const moviesRouter = require("./routes/movies");
const historyRouter = require("./routes/history");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/history", historyRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
