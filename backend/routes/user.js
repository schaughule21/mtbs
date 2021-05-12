const router = require("express").Router();
let User = require("../models/user.model");

//609ab64dcc828e0890444f5e

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).send("Error:" + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).send("Error:" + err));
});

router.route("/add").post((req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const contact = req.body.contact;
  const type = req.body.type;

  const newUser = new User({ userName, email, password, contact, type });

  newUser
    .save()
    .then(() => res.send("User Added!"))
    .catch((err) => res.status(400).send("Error" + err));
});

router.route("/update/:id").put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.contact = req.body.contact;
      user.type = req.body.type;

      user
        .save()
        .then(() => res.send("User Updated!"))
        .catch((err) => res.status(400).send("Error" + err));
    })
    .catch((err) => res.status(400).send("Error" + err));
});

module.exports = router;
