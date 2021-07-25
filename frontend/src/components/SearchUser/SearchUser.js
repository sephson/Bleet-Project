import React from "react";
import { Link } from "react-router-dom";

const SearchUser = ({ allUsers }) => {
  return (
    <Link to={`/profile/${allUsers.username}`}>
      <div className="search-res">
        <h3>{allUsers.username}</h3>
        <em>{allUsers.bio}</em>
        <div className="follow-un">
          <p>Followers: {allUsers.followers.length}</p>
          <p>Following: {allUsers.following.length} </p>
        </div>
        <hr className="horizontal-line" />
      </div>
    </Link>
  );
};

export default SearchUser;
