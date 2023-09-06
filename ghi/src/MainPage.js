import { useNavigate } from "react-router-dom";
import scrumdiddly from './scrumdiddly.png'
import React, { useState, useEffect } from "react";

function MainPage() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/token", {
      credentials: "include",
    });
    if (response.ok && response != null) {
      const data = await response.json();
      if (data !== null) {
      setUsername(data.account.username);
      setLoggedIn(true)
      }
    }
  };

  useEffect(() => {
  fetchUserData();
      }, []);

return (
  <div className='center page-wrap'>
    <div className='bg-img'>
      <img src={scrumdiddly} className='logo' />
      <p className="lead mb-4">
        The premiere solution for making dinner at home easier!
      </p>
      {!loggedIn &&
        <h1>Hello! Welcome To Scrumdiddly!</h1>}
      {loggedIn &&
       <h1>Hello, {username}! Welcome To Scrumdiddly!</h1>}
    </div>
  </div>
);
}

export default MainPage;
