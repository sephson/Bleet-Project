const router = require("express").Router();
const MyConversation = require("../Models/MyConversationModel");

//new conversation

router.post("/", async (req, res) => {
  const newConv = new MyConversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConvo = await newConv.save();
    res.status(200).json(savedConvo);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get conversation of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await MyConversation.find({
      members: { $in: [req.params.userId] }, // find the req.params in the members array
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await MyConversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
