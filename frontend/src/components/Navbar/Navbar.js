import React, { useState, useContext } from "react";
import "./Navbar.css";

import PersonIcon from "@material-ui/icons/Person";
import MessageIcon from "@material-ui/icons/Message";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import picture from "../../images/a.png";

const Navbar = () => {
  const { user } = useContext(AppContext);

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  let history = useHistory();
  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };
  return (
    <>
      <nav className="navbarItems">
        {/* <input
          className="navbarSearch"
          type="text"
          placeholder="Search Users"
        /> */}

        <div className="left-side-nav">
          <Link to="/">
            <h1 className="navbarLogo">BLEET</h1>
          </Link>
        </div>

        <div className="right-side-nav">
          <img src={picture} className="userProfilePicture" alt="profilepic" />
        </div>

        <div className="hamburger-menu">
          <div
            onClick={handleClick}
            className={click ? "line line-1 change " : "line line-1"}
          ></div>
          <div
            onClick={handleClick}
            className={click ? " line line-2 change" : "line line-2"}
          ></div>
          <div
            onClick={handleClick}
            className={click ? "line line-3 change" : "line line-3"}
          ></div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <Link to={`/profile/${user.username}`}>
            <li className="nav-links" onClick={closeMobileMenu}>
              <PersonIcon className="Material-icon" /> My Profile
            </li>
          </Link>
          <Link to="/messages">
            <li className="nav-links" onClick={closeMobileMenu}>
              <MessageIcon className="Material-icon" /> Messages
            </li>
          </Link>
          <Link to="/search">
            <li className="nav-links" onClick={closeMobileMenu}>
              <SearchIcon className="Material-icon" /> Search
            </li>
          </Link>
          <li onClick={logoutHandler} className="nav-links">
            <ExitToAppOutlinedIcon className="Material-icon" /> Logout
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
