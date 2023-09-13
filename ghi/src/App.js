import "./CSS/App.css";
import Nav from "./Nav.js";
import { Outlet } from "react-router-dom";

// import { BrowserRouter, Routes, Route} from "react-router-dom";
// import React from "react";
// import PantryForm from "./Pantry/PantryItems";
// import MainPage from "./MainPage.js";
// import RecipeSearch from "./Pantry/RecipeSearch";
// import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
// import LoginForm from "./Login-Register/LoginForm.js";
// import { Register } from "./Login-Register/Register.js";
// import RecipeDetailPage from "./Recipes/RecipeDetail.js";
// import ListRecipes from "./Recipes/Recipes.js";

const App = () => (
  <div className="container">
    <Nav />
    <div className="mt-5">
      <Outlet />
    </div>
  </div>
);

export default App;
