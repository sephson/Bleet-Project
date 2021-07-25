// import "./Message.css";
import React from "react";

const TopbarChat = ({ receiver }) => {
  return (
    <>
      <div className="chattingWith">
        <h2 style={{ color: "rgb(77, 77, 77)" }}>{receiver.username}</h2>
        <hr className="horizontal-line" />
      </div>
    </>
  );
};

export default TopbarChat;
