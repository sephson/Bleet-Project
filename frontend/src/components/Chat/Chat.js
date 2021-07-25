import "./Chat.css";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Chat = ({ myMessage, message, receiver }) => {
  const { user } = useContext(AppContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <div className={myMessage ? "message own" : "message"}>
        <div className="messageTop">
          <Link to={`/profile/${receiver?.username}`}>
            <img
              className={myMessage ? "messageImgNotMine" : "messageImg"}
              src={
                user.profilePicture
                  ? pf + user.profilePicture
                  : pf + "person/a.png"
              }
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
