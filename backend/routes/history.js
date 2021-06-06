const router = require("express").Router();
let History = require("../models/history.model");

router.route("/").get((req, res) => {
  History.find()
    .then((history) => res.json(history))
    .catch((err) => res.status(400).send("Error:" + err));
});

router.route("/:id").get((req, res) => {
  History.findById(req.params.id)
    .then((history) => res.json(history))
    .catch((err) => res.status(400).send("Error:" + err));
});

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const movieName = req.body.movieName;
  const movieDateAndTime = Date.parse(req.body.movieDateAndTime);
  const totalSeats = Number(req.body.totalSeats);
  const ticketCost = Number(req.body.ticketCost);

  const newHistoryData = new History({
    userId,
    movieName,
    movieDateAndTime,
    totalSeats,
    ticketCost,
  });

  newHistoryData
    .save()
    .then(() => res.send("History stored successfully!"))
    .catch((err) => res.status(400).send("Error" + err));
});

module.exports = router;
