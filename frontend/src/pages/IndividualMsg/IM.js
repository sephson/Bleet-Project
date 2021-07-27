import React, { useState, useEffect, useContext, useRef } from "react";
import Leftbar from "../../components/Leftbar/Leftbar";
import Navbar from "../../components/Navbar/Navbar";
import Chat from "../../components/Chat/Chat";
import { AppContext } from "../../context/AppContext";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import TopbarChat from "../../components/TopbarChat/TopbarChat";
import { io } from "socket.io-client";
import { useParams } from "react-router";

const IM = () => {
  const convo = useParams().conversationId;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrMessage, setArrMessage] = useState("");
  const { user } = useContext(AppContext);
  const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef();
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState({});

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

  useEffect(() => {
    arrMessage &&
      conversations.map((conversation) =>
        conversation.members.includes(arrMessage.sender)
      ) &&
      setMessages((prev) => [...prev, arrMessage]);
  }, [arrMessage, conversations]);

  useEffect(() => {
    socket.current = io("https://bleet-project.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(`/api/chat/${convo}`);
      setMessages(data);
    };
    getMessages();
  }, [convo]);
  // console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: convo,
    };

    const xx = conversations.filter((conversation) => {
      return conversation._id === convo ? conversation._id : "";
    });
    const receiverId = xx[0]?.members.find((m) => m !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const { data } = await axios.post(`/api/chat`, message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (e) {}
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const xx = conversations.filter((conversation) => {
    return conversation._id === convo ? conversation._id : "";
  });

  const receiverId = xx[0]?.members.find((m) => m !== user._id);

  console.log(receiverId);

  useEffect(() => {
    const fetchReceiver = async () => {
      const { data } = await axios.get(`/api/user?userId=${receiverId}`);

      setReceiver(data);
    };
    fetchReceiver();
  }, [receiverId]);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="leftbar-chat">
          <Leftbar />
        </div>

        <div className="chat-message">
          <div className="xxx">
            <>
              <TopbarChat receiver={receiver} />

              <div className="">
                {messages.map((message) => {
                  return (
                    <div ref={scrollRef}>
                      <Chat
                        receiver={receiver}
                        message={message}
                        myMessage={message.sender === user._id}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="chatTextandButWrap">
                <div className="chatTextandBut">
                  <input
                    className="chatInput"
                    placeholder="Type Something. . . "
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                  ></input>
                  <SendIcon className="sendIcon" onClick={handleSubmit} />
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default IM;
