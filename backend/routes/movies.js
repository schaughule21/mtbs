const router = require("express").Router();
let Movie = require("../models/movies.model");

router.route("/").get((req, res) => {
  Movie.find()
    .then((movies) => res.json(movies))
    .catch((err) => res.status(400).send("Error:" + err));
});

router.route("/:id").get((req, res) => {
  Movie.findById(req.params.id)
    .then((movies) => res.json(movies))
    .catch((err) => res.status(400).send("Error:" + err));
});

router.route("/add").post((req, res) => {
  const movieName = req.body.movieName;
  const posterImg = req.body.posterImg;
  const platinumSeatCost = Number(req.body.platinumSeatCost);
  const goldSeatCost = Number(req.body.goldSeatCost);
  const silverSeatCost = Number(req.body.silverSeatCost);
  const movieDateAndTime = Date.parse(req.body.movieDateAndTime);
  const genre = req.body.genre;
  const category = req.body.category;

  const newMovie = new Movie({
    movieName,
    posterImg,
    platinumSeatCost,
    goldSeatCost,
    silverSeatCost,
    movieDateAndTime,
    genre,
    category,
  });

  newMovie
    .save()
    .then(() => res.send("Movie Added!"))
    .catch((err) => res.status(400).send("Error" + err));
});

router.route("/update/:id").put((req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      movie.movieName = req.body.movieName;
      movie.posterImg = req.body.posterImg;
      movie.platinumSeatCost = Number(req.body.platinumSeatCost);
      movie.goldSeatCost = Number(req.body.goldSeatCost);
      movie.silverSeatCost = Number(req.body.silverSeatCost);
      movie.movieDateAndTime = Date.parse(req.body.movieDateAndTime);
      movie.genre = req.body.genre;
      movie.category = req.body.category;

      movie
        .save()
        .then(() => res.send("Movie Updated!"))
        .catch((err) => res.status(400).send("Error" + err));
    })
    .catch((err) => res.status(400).send("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.send("Movie Deleted!"))
    .catch((err) => res.status(400).send("Error" + err));
});

module.exports = router;
