import React, { useRef } from "react";
import "./Share.css";
import axios from "axios";

const Share = ({ user }) => {
  const content = useRef();
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const submitHandler = async () => {
    try {
      await axios.post(`/api/post`, {
        userId: user._id,
        content: content.current.value,
      });
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={submitHandler}>
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? pf + user.profilePicture
                  : pf + "person/a.png"
              }
              alt=""
            />
            <textarea
              placeholder={`Hi ${user.username}! What are your thoughts?`}
              className="shareInput"
              ref={content}
            />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions"></div>
            <button type="submit" className="shareButton">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
