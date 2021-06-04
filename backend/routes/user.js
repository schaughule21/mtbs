const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

  if (!userName || !email || !password || !contact || !type) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({ userName, email, password, contact, type });

    //Hashing pass
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user.id },
              process.env.jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.userName,
                    email: user.email,
                    contact: user.contact,
                    type: user.type,
                  },
                });
              }
            );
          })
          .catch((err) => res.status(400).send("Error" + err));
      });
    });
  });
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
