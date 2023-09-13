import scrumdiddly from "./CSS/Images/scrumdiddly.png";
import React, { useState, useEffect } from "react";
import Search from "./Components/Search";

function MainPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const fetchUserData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data !== null) {
        setUsername(data.account.username);
        setLoggedIn(true);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="center page-wrap">
      <div className="bg-img">
        <img src={scrumdiddly} className="logo" alt="a nice logo" />
        <h1
          className="lead mb-4"
          style={{
            fontSize: "25px",
            padding: "10px",
            color: "rgba(249, 248, 245, 0.8)",
            display: "inline-block",
          }}
        >
          The premiere solution for making dinner at home easier!
        </h1>
        {!loggedIn && (
          <h1
            style={{
              padding: "10px",
              color: "rgba(247, 244, 236, 0.8)",
              display: "inline-block",
            }}
          >
            Welcome To Scrumdiddly!
          </h1>
        )}
        {loggedIn && (
          <h1
            style={{
              padding: "10px",
              color: "rgba(247, 244, 236, 0.8)",
              display: "inline-block",
            }}
          >
            Hello, {username}! Welcome To Scrumdiddly!
          </h1>
        )}
        <Search />
      </div>
    </div>
  );
}

export default MainPage;
