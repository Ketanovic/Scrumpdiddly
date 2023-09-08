import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React from "react";
import PantryForm from "./PantryItems";
import Nav from "./Nav.js";
import MainPage from "./MainPage.js";
import RecipeSearch, {UnderscoreLower} from "./RecipeSearch.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm.js";
import { Register} from "./Register.js";
import RecipeDetailPage from "./Recipes/RecipeDetail.js"
import ListRecipes from "./Recipes/Recipes.js";


function App() {
  return (
    <AuthProvider baseUrl= {process.env.REACT_APP_API_HOST}>
      <BrowserRouter >
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<MainPage />} />
            </Route>

            <Route path="/pantry">
              <Route index element={<PantryForm />} />
            </Route>

            <Route path="/login">
              <Route index element={<LoginForm />} />
            </Route>

            <Route path="/recipes">
              <Route index element={<ListRecipes />} />
              <Route path="search" element={<RecipeSearch />} />
              <Route path=":recipeid" element={<RecipeDetailPage />} />
            </Route>
            <Route path="/register">
              <Route index element={<Register />} />
            </Route>
            <Route></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
