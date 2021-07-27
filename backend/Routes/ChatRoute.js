const router = require("express").Router();
const Chat = require("../Models/ChatModel");

//add message

router.post("/", async (req, res) => {
  const newChat = new Chat(req.body);
  try {
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const conversationbyId = await Chat.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(conversationbyId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
