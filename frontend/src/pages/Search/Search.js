import React, { useState, useEffect } from "react";
import "./Search.css";
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import SearchUser from "../../components/SearchUser/SearchUser";
import axios from "axios";

const Search = () => {
  const [input, setInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  console.log(input);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get(`/api/user/allusers`);

        setAllUsers(data);
      } catch (err) {}
    };
    fetchAllUsers();
  }, []);

  //   console.log(allUsers);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <Leftbar />
        <>
          <div className="search-middle-wrap">
            <div className="search-input-wrap">
              <input
                className="search-input"
                placeholder="Search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <>
              {allUsers
                .filter((value) => {
                  if (input === "") return value;
                  else if (value.username.includes(input)) {
                    return value;
                  }
                })
                .map((all) => {
                  return <SearchUser allUsers={all} />;
                })}
            </>
          </div>
        </>
      </div>
    </>
  );
};

export default Search;
