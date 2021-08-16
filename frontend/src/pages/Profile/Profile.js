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
  const [load, setLoad] = useState({});
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user._id)
  );
  //for imagee upload
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [view, setView] = useState();
  const fileInputRef = useRef();

  const username = useParams().username;
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  // console.log(currentUser);
  // console.log(user);
  const bio = useRef();

  // const [currentChat, setCurrentChat] = useState(null);

  const addPhotoHandler = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (view) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(view);
    } else setPreview(null);
  }, [view]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/api/user?username=${username}`);
      setUser(res.data);
      setLoad(res.request);
    };

    fetchUsers();
  }, [username]);
  // console.log(user);
  // console.log(currentUser._id);

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

  const dateJoined = new Date(user.createdAt);

  const updateHandler = async () => {
    try {
      await axios.put(`/api/user/${user._id}/update`, {
        profilePicture: image,
        bio: bio.current.value,
      });
    } catch (err) {}
  };

  const imageInputHandler = async (e) => {
    const file = e.target.files[0];
    file ? setImage(file) : setImage(null);
    file ? setView(file) : setView(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put("/api/upload", formData, config);
      setImage(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(image);
  console.log(user.profilePicture);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <Leftbar />
        <div>
          <div className="profile">
            <div className="msg-wrap">
              <img
                className="postImg"
                src={user.profilePicture ? user.profilePicture : picture}
                alt=""
              />
              {/* {console.log(username)} */}
              {currentUser.username === username || (
                <DM currentId={currentUser} />
              )}
            </div>
            <h2 className="username">
              {load.onload !== null ? "loading..." : user?.username}
            </h2>
            <p className="bio">{user.bio}</p>
            <p className="bio">
              Date Joined:
              {load.onload !== null
                ? "loading..."
                : date.format(dateJoined, "ddd, MMM DD YYYY")}
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
                  <input
                    style={{ display: "none" }}
                    type="file"
                    classname="img"
                    name="img"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={imageInputHandler}
                  />
                  <div className="image-prev">
                    {preview ? (
                      <img
                        src={preview}
                        alt="imag-prev"
                        className="preview-image"
                        onClick={() => setImage(null)}
                      />
                    ) : (
                      <button
                        onClick={addPhotoHandler}
                        className="commentButton"
                      >
                        Upload Image
                      </button>
                    )}
                  </div>
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
