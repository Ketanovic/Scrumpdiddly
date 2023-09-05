import React from "react";
import { NavLink } from "react-router-dom";
import './App.css'
import scrump from './scrump.png'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function Nav() {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    // need to check if the user is logged in using authentication:
    useEffect (()=> {
      // Check the state of the user's login status
    fetch("/api/user/is-logged-in")
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.isLoggedIn);
        if(data.isLoggedIn) {
          setUsername(data.username);
        }
      });
  }, []);

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
            {!loggedIn ? (
              <span>Hey you! You should sign in! ➡️ </span>
            ) : (
              <span>Welcome! You are signed in!</span>
            )}
            &nbsp;&nbsp;
          {!loggedIn &&
          <button className="btn btn-outline-success" type="submit" onClick={() => { setLoggedIn(true); navigate("/login"); }}>
            Sign In
          </button>
          }
          {" "}
          &nbsp;&nbsp;
          {loggedIn &&
          <button className="btn btn-outline-success" type="button" onClick={() => setLoggedIn(false)}>
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
