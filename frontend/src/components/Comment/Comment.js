import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";

const Comment = ({ postId }) => {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const getComment = async () => {
      const { data } = await axios.get(`/api/comment/${postId}/getcomment`);
      setComment(data);
    };

    getComment();
  }, [postId]);

  return (
    <>
      <div className="comment-itself">
        {comment.map((comm) => {
          return (
            <>
              <main className="mainWrap">
                <Link to={`/profile/${comm.username}`}>
                  <img className="postImg" src={pf + "person/a.png"} alt="" />
                </Link>
                <div className="userTimeWrap">
                  <h3 style={{ "font-size": "1.2rem" }} className="postUser">
                    {comm.username}
                  </h3>
                  <span className="postTime">{format(comm.createdAt)}</span>
                </div>
              </main>
              <p className="postcomment">{comm.content}</p>
              <hr />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Comment;
