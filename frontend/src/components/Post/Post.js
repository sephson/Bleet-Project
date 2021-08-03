import React, { useState, useEffect, useContext } from "react";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import "./Post.css";
import { AppContext } from "../../context/AppContext";
import { GoKebabVertical } from "react-icons/go";
import PopUp from "../PopUp/PopUp";
import picture from "../images/bleet.png";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const getComment = async () => {
      const { data } = await axios.get(`/api/comment/${post._id}/getcomment`);
      setComment(data);
    };

    getComment();
  }, [post._id]);

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/post/${post._id}/delete`, {
        userId: post.UserId,
        currUserId: user._id,
      });
    } catch (e) {}
    window.location.reload();
  };

  // console.log(post);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/user?userId=${post.userId}`);
      setUser(data);
    };

    fetchUsers();
  }, [post]);
  // console.log(currentUser);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put(`/api/post/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="post-container">
        <div classname="post-top">
          <main className="mainWrap">
            <Link to={`/profile/${user.username}`}>
              <img className="postImg" src={picture} alt="" />
            </Link>

            <div className="userTimeWrap">
              <h3 className="postUser">{user.username}</h3>
              <span className="postTime">{format(post.createdAt)}</span>
            </div>
            {/* {console.log} */}
            {currentUser._id === post.userId && (
              <span onClick={togglePopUp} className="react-icon">
                <GoKebabVertical />
                {isOpen && (
                  <PopUp
                    className="popUpPost"
                    content={
                      <div className="delete-pop">
                        <p>Do you wanna delete this post?</p>
                        <button
                          style={{ "background-color": "rgb(182, 0, 0)" }}
                          className="commentButton"
                          onClick={deleteHandler}
                        >
                          Delete
                        </button>
                      </div>
                    }
                    handleClose={togglePopUp}
                  />
                )}
              </span>
            )}
          </main>
        </div>
        <Link to={`/single/${post._id}`}>
          <p className="postContent">{post.content}</p>
        </Link>

        <div className="postInteractions">
          <Link to={`/single/${post._id}`}>
            <span className="comments">
              <ModeCommentIcon />
              <p className="commentIcon">
                {comment.length > 1
                  ? `${comment.length}Comments`
                  : `${comment.length}Comment`}
              </p>
            </span>
          </Link>

          <span onClick={likeHandler} className="like">
            <FavoriteIcon /> <p className="commentIcon">{like}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Post;
