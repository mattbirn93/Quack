const mongoose = require("mongoose");
require("dotenv").config();
// const bcrypt = require("bcryptjs");

// MONGO URI
const URI = process.env.MONGO_URI;

// Mongo connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "QuackAppSchema1",
  })
  .then(() => console.log("Connected to QuackApp Database."))
  .catch((err) => console.log(err));

// Sacred Curse Schema
const { Schema } = mongoose;

// Sacred Curse Schema
const QuackSchema = new Schema({});

const State = mongoose.model("State", StateSchema);

module.exports = State;
