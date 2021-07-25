import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ChatIcon from "@material-ui/icons/Chat";
import "./DM.css";

const DM = ({ currentId }) => {
  const [chat, setChat] = useState(null);
  const [newConvo, setNewConvo] = useState(null);
  const [convo, setConvo] = useState(null);
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user?username=${username}`);
      setUser(data);
    };

    fetchUser();
  }, [username]);
  console.log(currentId, user._id);

  useEffect(() => {
    const fetchConvos = async () => {
      const { data } = await axios.get(
        `/api/conversation/find/${currentId._id}/${user._id}`
      );
      setConvo(data);
    };
    fetchConvos();
  }, [currentId, user._id]);

  console.log(currentId);

  const handleMessage = async () => {
    try {
      const { data } = await axios.get(`/api/chat/${convo._id}`);
      setChat(data);
    } catch (err) {}

    setChat(chat);
  };

  const handleNewMessage = async () => {
    const member = {
      senderId: currentId._id,
      receiverId: user._id,
    };
    try {
      const { data } = await axios.post(`/api/conversation`, member);
      setNewConvo(data);
    } catch (err) {}
  };

  console.log(newConvo);
  console.log(chat);

  return (
    <>
      <div className="chatIcon">
        <span onClick={convo ? handleMessage : handleNewMessage}>
          {convo ? (
            <Link to={`/direct-message/${convo?._id}`}>
              <ChatIcon className="x" />
            </Link>
          ) : (
            <Link to={`/messages`}>
              <ChatIcon className="x" />
            </Link>
          )}
        </span>
      </div>
    </>
  );
};

export default DM;
