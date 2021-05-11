const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    movieName = { type: String, required: true },
    posterImg = { type: String, required: true },
    platinumSeatCost = { type: Number, required: true },
    goldSeatCost = { type: Number, required: true },
    silverSeatCost = { type: Number, required: true },
    movieDate = { type: Date, required: true },
    movieTime = { type: Date, required: true },
    genre = { type: String, required: true },
    category = { type: String, required: true },
  },
  {
    timestamps: true,
  })

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;