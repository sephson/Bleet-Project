import "./MyConversations.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import TopbarChat from "../../components/TopbarChat/TopbarChat";
import picture from "../images/bleet.png";
const MyConversations = ({ conversation, currentUser }) => {
  //to get friend data
  const [user, setUser] = useState({});

  console.log(conversation);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id); //this finds the person you're having a conversation with
    console.log(friendId);

    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/user?userId=${friendId}`);
        setUser(data);

        // console.log(res);
      } catch (err) {}
    };

    getUser();
  }, [currentUser, conversation]);
  console.log(conversation._id);

  // const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="conversation">
      <Link to={`/direct-message/${conversation._id}`}>
        <div className="convoWrap">
          <img className="conversationImg" src={picture} alt="" />
          <h3 className="conversationName">{user.username}</h3>
          <p className="convoBio">{user.bio}</p>
          <hr className="horizontal-line" />
        </div>
      </Link>
    </div>
  );
};

export default MyConversations;
