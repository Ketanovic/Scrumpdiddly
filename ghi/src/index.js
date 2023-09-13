import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

import "./CSS/index.css";
import App from "./App";
import ErrorNotification from "./ErrorNotification";
import LoginForm from "./Login-Register/LoginForm";
import ListRecipes from "./Recipes/Recipes";
import MainPage from "./MainPage";
import PantryForm from "./Pantry/PantryItems";
import RecipeSearch from "./Pantry/RecipeSearch";
import RecipeDetailPage from "./Recipes/RecipeDetail";
import Register from "./Login-Register/Register";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorNotification />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/pantry",
        element: <PantryForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/recipes",
        element: <ListRecipes />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
