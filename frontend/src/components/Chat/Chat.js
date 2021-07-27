import "./Chat.css";
import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import picture from "../images/bleet.png";
const Chat = ({ myMessage, message, receiver }) => {
  return (
    <div>
      <div className={myMessage ? "message own" : "message"}>
        <div className="messageTop">
          <Link to={`/profile/${receiver?.username}`}>
            <img
              className={myMessage ? "messageImgNotMine" : "messageImg"}
              src={picture}
              alt=""
            />
          </Link>

          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
    </div>
  );
};

export default Chat;
