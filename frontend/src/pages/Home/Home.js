import React from "react";
import Leftbar from "../../components/Leftbar/Leftbar";

import Center from "../../components/Center/Center";
import Navbar from "../../components/Navbar/Navbar";
// import propic from "../../image/a.png";

import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar  />
      <div className="home-container">
        <Leftbar />
        <Center />
      </div>
    </>
  );
};

export default Home;
