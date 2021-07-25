const router = require("express").Router();
const bcrypt = require("bcrypt");
const Auth = require("../Models/AuthModel");

router.post("/register", async (req, res) => {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new Auth({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Username or Email Already exist");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
  } catch (err) {
    res.status(300).json(err);
  }
});

module.exports = router;
