const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    userId = { type: String, required: true },
    movieName = { type: String, required: true },
    movieDate = { type: Date, required: true },
    movieTime = { type: Date, required: true },
    ticketCost = { type: Number, required: true },
    totalSeats = { type: Number, required: true },
  },{
    timestamps: true,
  })

const History = mongoose.model("History", historySchema);

module.exports = History;