const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/UserRoute");
const postRoute = require("./Routes/PostRoute");
const chatRoute = require("./Routes/ChatRoute");
const myConversationRoute = require("./Routes/MyConversationRoute");

const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("database connected");
  }
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);
app.use("/api/conversation", myConversationRoute);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
