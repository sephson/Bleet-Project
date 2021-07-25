// import React, { useContext } from "react";
import React, { useContext } from "react";
import PersonIcon from "@material-ui/icons/Person";
import MessageIcon from "@material-ui/icons/Message";
import SearchIcon from "@material-ui/icons/Search";
// import { AppContext } from "../../context/AppContext";
import { Link, useHistory } from "react-router-dom";
import "./Leftbar.css";
import { AppContext } from "../../context/AppContext";
// import { logout } from "../../context/AppActions";

import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

// #f7fbff    #deebf7    #c6dbef
// #9ecae1    #6baed6    #4292c6
// #2171b5    #08519c    #08306b

const Leftbar = () => {
  const { user } = useContext(AppContext);
  let history = useHistory();
  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };
  return (
    <div className="left-component">
      <ul className="left-menu">
        <Link to={`/profile/${user.username}`}>
          <li className="nav-links">
            <PersonIcon className="Material-icon" /> My Profile
          </li>
        </Link>
        <Link to="/messages">
          <li className="nav-links">
            <MessageIcon className="Material-icon" /> Messages
          </li>
        </Link>
        <Link to="/search">
          <li className="nav-links">
            <SearchIcon className="Material-icon" /> Search
          </li>
        </Link>
        <li onClick={logoutHandler} className="nav-links">
          <ExitToAppOutlinedIcon className="Material-icon" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Leftbar;
