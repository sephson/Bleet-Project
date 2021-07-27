import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams } from "react-router";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { format } from "timeago.js";
import "./SinglePost.css";
import { Link } from "react-router-dom";
import picture from "../../components/images/bleet.jpg";

const SinglePost = () => {
  const { user: currentUser } = useContext(AppContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const [singlePost, setSinglePost] = useState({});
  const [user, setUser] = useState({});
  const postId = useParams().postId;

  useEffect(() => {
    const fetchSinglePost = async () => {
      const { data } = await axios.get(`/api/post/single/${postId}`);
      setSinglePost(data);
    };
    fetchSinglePost();
  }, [postId]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user?userId=${singlePost.userId}`);
      setUser(data);
    };
    fetchUser();
  }, [singlePost.userId]);

  console.log(singlePost);
  // console.log(user);
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <Leftbar />

        <div className="post-container">
          <main className="mainWrap">
            <Link to={`/profile/${user.username}`}>
              <img className="postImg" src={picture} alt="" />
            </Link>
            <div className="userTimeWrap">
              <h3 className="postUser">{user.username}</h3>
              <span className="postTime">{format(singlePost.createdAt)}</span>
            </div>
          </main>
          <p className="postContent">{singlePost.content}</p>
          <div className="postInteractions">
            <span className="comments">
              <ModeCommentIcon /> {singlePost.comments?.length}
            </span>
            <span className="like">
              <FavoriteIcon /> {singlePost.likes?.length}
            </span>
          </div>
          <div className="comment-section">
            <form className="comment-form">
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
                placeholder={`This feature is comming soon! ${currentUser.username}`}
                className="shareInput"
              />
              <button type="submit" className="commentButton">
                Comment
              </button>
            </form>
          </div>
          {/* <div className="comment-itself">
            <main className="mainWrap">
              <img className="postImg" src={postImg} alt="" />
              <div className="userTimeWrap">
                <h3 style={{ "font-size": "1.2rem" }} className="postUser">
                  Disu
                </h3>
                <span className="postTime">5 min ago</span>
              </div>
            </main>
            <p className="postcomment">This is great. Keep it up</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
