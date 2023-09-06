import React from "react";
import { NavLink } from "react-router-dom";
import './App.css'
import scrump from './scrump.png'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";


function Nav() {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    //const { token } = useAuthContext();
    const { logout, token } = useToken();


  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/token", {
      credentials: "include",
    });
    if (response.body != null) {
      const data = await response.json();
      console.log("+++++++++++++++", data)
      setUsername(data.account.username);
      setLoggedIn(true)
      console.log(data.account.username);
      console.log(username)
    }
  };

  const handleLogout = async () => {
    logout(); {
      localStorage.clear();
      setLoggedIn(false)
    }
  // const url = `http://localhost:8000/token`;
  // const fetchConfig = {
  //   method: "delete",
  //   // headers: {"Content-Type": "application/json"}
  // };
  // const response = await fetch(url, {fetchConfig, credentials: "include"});

  // if (response.ok) {
  //   localStorage.removeItem('token-info');
  //   setLoggedIn(null)
  //   console.log("$$$$$$$$$$$$$$$$$", response)
  //}
};

  useEffect(() => {
  fetchUserData();
      }, [username]);

  return (
    <nav className="navbar navbar-expand-lg position-fixed">
      <div className="container-fluid">
        <NavLink className="navbar-brand link" to="/">
          <img src={scrump} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link link" to="/">
                Home
              </NavLink>
            </li>

            {loggedIn && (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link link dropdown-toggle"
                  to="#"
                  id="pantryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pantry
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="pantryDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/pantry">
                      Pantry Item
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            <li className="nav-item dropdown">
              <NavLink
                className="nav-link link dropdown-toggle"
                to="#"
                id="recipesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recipes
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="recipesDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/recipes">
                    List Recipes
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
            &nbsp;&nbsp;
          {!loggedIn &&
          <button className="btn btn-outline-success" type="submit" onClick={() => { navigate("/login"); }}>
            Sign In
          </button>
          }
          {" "}
          &nbsp;&nbsp;
          {loggedIn &&
          <button className="btn btn-outline-success" type="button" onClick={(handleLogout)}>
            Sign Out
          </button>
          }
          {" "}
          &nbsp;&nbsp;
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
          </form>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search Recipe!
          </button>
        </div>
      </div>
    </nav>
  );
}


export default Nav;
