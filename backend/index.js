const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/UserRoute");
const postRoute = require("./Routes/PostRoute");
const chatRoute = require("./Routes/ChatRoute");
const commentRoute = require("./Routes/CommentRoute");
const myConversationRoute = require("./Routes/MyConversationRoute");
const uploadRoute = require("./Routes/UploadRoute");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://vibrant-murdock-08426b.netlify.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

dotenv.config({ path: "./config.env" });
mongoose.connect(
  process.env.MONGO_URI,
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

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);
app.use("/api/conversation", myConversationRoute);
app.use("/api/comment", commentRoute);
app.use("/api/upload", uploadRoute);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

io.on("connection", (socket) => {
  console.log("A User Connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("someone disconnnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server running on port 5000`);
});
