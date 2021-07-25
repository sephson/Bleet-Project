const mongoose = require("mongoose");


const MyConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MyConversation", MyConversationSchema);
