import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PantryForm from "./PantryItem";
import Nav from "./Nav.js";
import MainPage from "./MainPage.js";
import RecipeSearch, {UnderscoreLower} from "./RecipeSearch.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm.js";
import { Register} from "./Register.js";
import RecipeDetailPage from "./Recipes/RecipeDetail.js"
import ListRecipes from "./Recipes/Recipes.js";


function App() {
  // const [currentForm, setCurrentForm] = useState("loginForm");
  const [ID, setID] = useState([]);

  useEffect(() => {
    async function getData() {
      const url = `http://localhost:8000/api/recipes`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setID(data.recipes);

      } else {
        console.log("drat! something happened");
      }
    }
    getData();
  }, []);

  const recipeids = []
  for (const x of ID) {
    recipeids.push(x.id)
  }


  // const [ID, setID] = useState([]);

  // async function getId() {
  //   const IDUrl = 'http://localhost:8000/api/recipes';
  //   const response = await fetch(IDUrl)
  //   if (response.ok) {
  //     const json = await response.json();
  //     setID(json)
  //   }
  //   console.log("iiiiiiiiiiiiiiiiiiiii", ID)
  // }

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };


  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <AuthProvider baseUrl="http://localhost:8000">
      <BrowserRouter>
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
              <Route path=":recipeids" element={<RecipeDetailPage />} />
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

// function App() {
//   const [launchInfo, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
//       console.log("fastapi url: ", url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, []);

//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launchInfo} />
//     </div>
//   );
// }

// export default App;
