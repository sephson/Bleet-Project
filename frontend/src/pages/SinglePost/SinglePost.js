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
import picture from "../../components/images/bleet.png";
import Comment from "../../components/Comment/Comment";

const SinglePost = () => {
  const { user: currentUser } = useContext(AppContext);
  const [singlePost, setSinglePost] = useState({});
  const [user, setUser] = useState({});
  const [comment, setComment] = useState("");
  const [addedComment, setAddedComment] = useState("");
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

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    const postcomment = {
      userId: currentUser._id,
      username: currentUser.username,
      content: comment,
    };
    try {
      const { data } = await axios.post(
        `/api/comment/${postId}/addcomment`,
        postcomment
      );

      setAddedComment(data);
      setComment("");
    } catch (error) {}
  };
  console.log(addedComment);
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
              <ModeCommentIcon />
            </span>
            <span className="like">
              <FavoriteIcon /> {singlePost.likes?.length}
            </span>
          </div>
          <div className="comment-section">
            <form className="comment-form">
              <textarea
                placeholder={`post a comment! ${currentUser.username}`}
                className="shareInput"
                onChange={handleChange}
                value={comment}
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="commentButton"
              >
                Comment
              </button>
            </form>
          </div>
          <div>
            <Comment postId={postId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
