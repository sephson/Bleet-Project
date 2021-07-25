import React, { useState, useEffect, useContext } from "react";
import Leftbar from "../../components/Leftbar/Leftbar";
import Navbar from "../../components/Navbar/Navbar";
import "./Messages.css";
import MyConversations from "../../components/MyConversations/MyConversations";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const Messages = () => {
  const { user } = useContext(AppContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await axios.get(`/api/conversation/${user._id}`);
        setConversations(data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  console.log(conversations);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="leftbar-chat">
          <Leftbar />
        </div>
        <div>
          {conversations.map((conversation) => {
            return (
              <div>
                <MyConversations
                  currentUser={user}
                  conversation={conversation}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Messages;
