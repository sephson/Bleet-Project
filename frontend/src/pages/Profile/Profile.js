import React, { useState, useEffect, useContext, useRef } from "react";
import Leftbar from "../../components/Leftbar/Leftbar";
import Navbar from "../../components/Navbar/Navbar";
import date from "date-and-time";
import picture from "../../components/images/bleet.png";
import Center from "../../components/Center/Center";
import PopUp from "../../components/PopUp/PopUp";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import { Follow, Unfollow } from "../../context/AppActions";
import DM from "../../components/DirectMessage/DM";

const Profile = () => {
  const { user: currentUser, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user._id)
  );

  const username = useParams().username;
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  console.log(currentUser);
  console.log(user);
  const bio = useRef();

  // const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/user?username=${username}`);
      setUser(data);
    };

    fetchUsers();
  }, [username]);
  console.log(user);
  console.log(currentUser._id);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user._id));
    // setFollowed(user.followers.includes(user._id));
  }, [user._id, currentUser._id, currentUser.following, user.followers]);

  // useEffect(() => {
  //   setIsLiked(post.likes.includes(currentUser._id));
  // }, [currentUser._id, post.likes]);

  const followHandler = async () => {
    try {
      await axios.put(`/api/user/${user._id}/follow`, {
        userId: currentUser._id,
      });
      Follow(dispatch({ type: "FOLLOW", payload: user._id }));
    } catch (err) {}
    setFollowed(!followed);
  };

  const unFollowHandler = async () => {
    try {
      await axios.put(`/api/user/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      Unfollow(dispatch({ type: "UNFOLLOW", payload: user._id }));
    } catch (err) {}

    setFollowed(followed);
  };

  const updateHandler = async () => {
    try {
      await axios.put(`/api/user/${user._id}/update`, {
        bio: bio.current.value,
      });
    } catch (err) {}
  };

  const dateJoined = new Date(user.createdAt);
  console.log(currentUser);
  console.log(user);
  console.log(currentUser.following.includes(user._id));
  console.log(followed);
  console.log(currentUser.following);
  console.log(user.followers);
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <Leftbar />
        <div>
          <div className="profile">
            <div className="msg-wrap">
              <img className="postImg" src={picture} alt="" />
              {/* {console.log(username)} */}
              {currentUser.username === username || (
                <DM currentId={currentUser} />
              )}
            </div>
            <h2 className="username">{user.username}</h2>
            <p className="bio">{user.bio}</p>
            <p className="bio">
              Date Joined: {date.format(dateJoined, "ddd, MMM DD YYYY")}
            </p>

            {/* {console.log(user)}
            {console.log(currentUser)}
            {console.log(followed)}
            {console.log(currentUser.following)}
            {console.log(user.followers)} */}
            {currentUser.username === user.username ? (
              <button onClick={togglePopup} className="commentButton">
                Edit Profile
              </button>
            ) : (
              <>
                {followed ? (
                  <button onClick={unFollowHandler} className="commentButton">
                    Unfollow
                  </button>
                ) : (
                  <button onClick={followHandler} className="commentButton">
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
          {isOpen && (
            <PopUp
              content={
                <form onSubmit={updateHandler}>
                  <textarea
                    maxLength={50}
                    className="shareInput"
                    type="text"
                    placeholder="Update bio"
                    ref={bio}
                  />
                  <button
                    style={{ "background-color": "rgb(182, 0, 0)" }}
                    className="commentButton"
                    type="submit"
                    // onClick={refresHandler}
                  >
                    Update Profile
                  </button>
                </form>
              }
              handleClose={togglePopup}
            />
          )}
          <Center username={username} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
