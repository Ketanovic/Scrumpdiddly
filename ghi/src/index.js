import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";



import reportWebVitals from './reportWebVitals';

import App from "./App";
import MainPage from './MainPage';
import PantryForm from './PantryItem';
// import Search from "./Search";
import Construct from './Construct';
import { store } from "./app/store";
import "./index.css";
import ListRecipes from './Recipes/Recipes';
import RecipeDetails from './Recipes/RecipeDetails';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Construct />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path:'/pantry',
        element: <PantryForm />
      },
      {
        path: '/recipes',
        element: <ListRecipes />
      },
      {
        path: '/recipes/:name',
        element: <RecipeDetails />
      },
    ]
  }
    ])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
        <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
