import React, { useEffect, useState, useContext } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Center.css";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

// #f7fbff    #deebf7    #c6dbef
// #9ecae1    #6baed6    #4292c6
// #2171b5    #08519c    #08306b
const Center = ({ username }) => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  console.log(username);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = username
        ? await axios.get(`/api/post/profile/${username}`)
        : await axios.get(`/api/post/timeline/${user._id}`);
      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user._id, username]);

  // console.log(user._id);

  return (
    <div className="center-component">
      {username === undefined && <Share user={user} />}

      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
};

export default Center;
