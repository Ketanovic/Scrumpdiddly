import { NavLink } from "react-router-dom";
import "./CSS/App.css";
import scrump from "./CSS/Images/scrump.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Nav() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const { logout } = useToken();

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

  const handleLogout = async () => {
    logout();
    localStorage.clear();
    setLoggedIn(false);
    //this location replace was needed for the page to register a sign out ask Riley or Dario

    setTimeout(function () {
      window.location.replace("/");
    }, 1000);
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  return (
    <nav className="navbar navbar-expand-lg position-fixed">
      <div className="container-fluid">
        <NavLink className="navbar-brand link" to="/">
          <img src={scrump} alt="another pretty logo" />
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
          <img
            src={require("./CSS/Images/menu.png")}
            className="navbar-toggle-icon toggle-button"
            alt="the blurred background"
          />
        </button>
        <div
          className="collapse navbar-collapse nav-dropdown"
          id="navbarSupportedContent"
        >
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
          <button className="btn btn-outline-success" type="button">Sign In</button> &nbsp;&nbsp;
          <button className="btn btn-outline-success" type="button">Sign Out</button> &nbsp;&nbsp;
          <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
          </form>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search Recipe!</button>
          {!loggedIn && (
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </button>
          )}
          {loggedIn && (
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
