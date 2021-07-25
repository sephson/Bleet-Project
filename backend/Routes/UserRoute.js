const router = require("express").Router();
const bcrypt = require("bcrypt");
const Auth = require("../Models/AuthModel");

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await Auth.findById(userId)
      : await Auth.findOne({ username: username });

    //this line of code gives the object without the password etc
    const { password, ...other } = user._doc; //user._doc refers to the user object
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/allusers", async (req, res) => {
  // const username = req.query.username;

  try {
    const user = await Auth.find({});

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user
router.put("/:id/update", async (req, res) => {
  try {
    const user = Auth.findById(req.params.id);
    if (user) {
      await user.updateOne({ $set: { bio: req.body.bio } });
      res.status(200).json("Bio updated");
    } else res.status(404).json("not found");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    //if both user are same you cant follow

    try {
      const user = await Auth.findById(req.params.id);
      const currentUser = await Auth.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await Auth.findById(req.params.id);
      const currentUser = await Auth.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        //you can only unfollow when you follow each other already
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("unfollowed");
      } else {
        res.status(403).json("you cannot unfollow who you do not follow");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you cant unfollow yourself");
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await Auth.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return Auth.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
